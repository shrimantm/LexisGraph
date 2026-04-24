"use client";

import { useAuth as useClerkAuth, useUser as useClerkUser, useClerk as useClerkInstance } from "@clerk/nextjs";

/**
 * Safely check if Clerk is available (valid keys configured).
 */
const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "";
export const isClerkEnabled =
  clerkKey.startsWith("pk_") && !clerkKey.includes("REPLACE");

/**
 * Safe wrapper around Clerk's useAuth().
 * Returns { isSignedIn: false } when Clerk isn't configured,
 * so the app doesn't crash in dev without keys.
 */
export function useAuth() {
  if (!isClerkEnabled) {
    return { isSignedIn: false, isLoaded: true, userId: null };
  }
  try {
    return useClerkAuth();
  } catch {
    return { isSignedIn: false, isLoaded: true, userId: null };
  }
}

/**
 * Safe wrapper around Clerk's useUser().
 */
export function useUser() {
  if (!isClerkEnabled) {
    return { isSignedIn: false, isLoaded: true, user: null };
  }
  try {
    return useClerkUser();
  } catch {
    return { isSignedIn: false, isLoaded: true, user: null };
  }
}

/**
 * Safe wrapper around Clerk's useClerk().
 */
export function useClerk() {
  if (!isClerkEnabled) {
    return { signOut: (cb) => cb?.() };
  }
  try {
    return useClerkInstance();
  } catch {
    return { signOut: (cb) => cb?.() };
  }
}
