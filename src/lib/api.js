export const API_URL = "http://localhost:8000";
const API_PREFIX = "/api/v1";

function normalizePath(path) {
  if (!path) return "/";
  return path.startsWith("/") ? path : `/${path}`;
}

function buildApiUrl(path) {
  const normalized = normalizePath(path);
  if (normalized.startsWith("/api/")) {
    return `${API_URL}${normalized}`;
  }
  return `${API_URL}${API_PREFIX}${normalized}`;
}

function parseJsonBody(body) {
  if (!body) return null;
  if (typeof body === "string") {
    try {
      return JSON.parse(body);
    } catch {
      return null;
    }
  }
  if (typeof body === "object" && !(body instanceof FormData)) {
    return body;
  }
  return null;
}

function withIdentity(payload, user) {
  if (!user) return payload;
  return {
    ...payload,
    user_id: payload.user_id || user.user_id,
    org_id: payload.org_id || user.org_id,
  };
}

function withIdentityInUrl(rawUrl, user) {
  if (!user) return rawUrl;
  const url = new URL(rawUrl);
  if (user.user_id && !url.searchParams.get("user_id")) {
    url.searchParams.set("user_id", user.user_id);
  }
  if (user.org_id && !url.searchParams.get("org_id")) {
    url.searchParams.set("org_id", user.org_id);
  }
  return url.toString();
}

// ── Core fetch with auth headers ──
export async function fetchWithAuth(path, options = {}) {
  const method = (options.method || "GET").toUpperCase();
  const headers = { ...(options.headers || {}) };
  const user = getLocalUser();

  if (user?.user_id) headers["X-User-ID"] = user.user_id;
  if (user?.org_id) headers["X-Org-ID"] = user.org_id;

  let body = options.body;
  if (body instanceof FormData) {
    if (user?.user_id && !body.get("user_id")) body.append("user_id", user.user_id);
    if (user?.org_id && !body.get("org_id")) body.append("org_id", user.org_id);
  } else if (body !== undefined) {
    const parsed = parseJsonBody(body);
    if (parsed) {
      body = JSON.stringify(withIdentity(parsed, user));
      if (!headers["Content-Type"]) {
        headers["Content-Type"] = "application/json";
      }
    }
  } else if (method !== "GET" && method !== "HEAD" && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  let url = buildApiUrl(path);
  url = withIdentityInUrl(url, user);
  console.log("API CALL:", url);

  const response = await fetch(url, {
    ...options,
    method,
    body,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "An error occurred" }));
    throw new Error(error.detail || response.statusText);
  }

  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return response.json();
  }
  return response.text();
}

/**
 * Fail-safe API call wrapper.
 * Tries the real API; if it fails, returns fallback data.
 * NEVER throws — always returns something renderable.
 */
export async function safeFetch(url, options = {}, fallbackData = null) {
  try {
    const data = await fetchWithAuth(url, options);
    return { data, isDemo: false, error: null };
  } catch (err) {
    console.log("API failed, using fallback");
    return {
      data: fallbackData,
      isDemo: true,
      error: err.message,
    };
  }
}

/**
 * Fail-safe file upload wrapper.
 */
export async function safeUpload(url, formData, fallbackData = null) {
  try {
    const data = await fetchWithAuth(url, {
      method: "POST",
      body: formData,
    });
    return { data, isDemo: false, error: null };
  } catch (err) {
    console.log("API failed, using fallback");
    return {
      data: fallbackData,
      isDemo: true,
      error: err.message,
    };
  }
}

export async function get(url, fallbackData = null) {
  return safeFetch(url, { method: "GET" }, fallbackData);
}

export async function post(url, body = {}, fallbackData = null) {
  return safeFetch(
    url,
    {
      method: "POST",
      body: JSON.stringify(body),
    },
    fallbackData
  );
}

export async function upload(file, fallbackData = null, endpoint = "/upload") {
  const formData = new FormData();
  formData.append("file", file);
  return safeUpload(endpoint, formData, fallbackData);
}

// ── Local storage helpers ──
export function getLocalUser() {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem("lexis_user");
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function setLocalUser(user) {
  localStorage.setItem("lexis_user", JSON.stringify(user));
}

export function clearLocalUser() {
  localStorage.removeItem("lexis_user");
}
