/**
 * Central mock data store for fail-safe fallbacks.
 * Used when backend APIs are unavailable.
 */

export const MOCK_USER = {
  user_id: "demo_user_001",
  email: "demo@lexisgraph.ai",
  name: "Demo User",
  role: "admin",
  org_id: "demo_org_001",
};

export const MOCK_ORG = {
  _id: "demo_org_001",
  name: "Demo Organization",
  org_code: "DEMO1234",
  created_at: new Date().toISOString(),
};

export const MOCK_DOCUMENTS = [
  {
    _id: "doc_001",
    file_name: "Employee Conduct Policy 2026.pdf",
    type: "Policy",
    status: "Processed",
    created_at: "2026-04-23T10:00:00Z",
    pages: 24,
    size: "2.4 MB",
  },
  {
    _id: "doc_002",
    file_name: "Vendor Data Handling Standard.pdf",
    type: "Policy",
    status: "Processing",
    created_at: "2026-04-22T14:30:00Z",
    pages: 18,
    size: "1.8 MB",
  },
  {
    _id: "doc_003",
    file_name: "GDPR Article 5 Guidance.pdf",
    type: "Regulation",
    status: "Processed",
    created_at: "2026-04-20T09:00:00Z",
    pages: 12,
    size: "980 KB",
  },
  {
    _id: "doc_004",
    file_name: "SOC2 Change Notice Q2.pdf",
    type: "Regulation",
    status: "Pending",
    created_at: "2026-04-19T16:00:00Z",
    pages: 8,
    size: "640 KB",
  },
];

export const MOCK_ALERTS = [
  {
    _id: "alert_001",
    type: "high",
    title: "GDPR compliance gap detected",
    description: "Data retention clause missing from employee privacy policy. Requires immediate attention to meet Article 5 requirements.",
    timestamp: "2 min ago",
    created_at: new Date(Date.now() - 2 * 60000).toISOString(),
  },
  {
    _id: "alert_002",
    type: "high",
    title: "Policy missing data retention clause",
    description: "Vendor Data Handling Standard v3 does not specify data retention periods, conflicting with GDPR archival requirements.",
    timestamp: "8 min ago",
    created_at: new Date(Date.now() - 8 * 60000).toISOString(),
  },
  {
    _id: "alert_003",
    type: "warning",
    title: "Regulation update pending review",
    description: "New SEC disclosure guidance detected but not yet mapped to internal controls. Review required within 30 days.",
    timestamp: "15 min ago",
    created_at: new Date(Date.now() - 15 * 60000).toISOString(),
  },
  {
    _id: "alert_004",
    type: "info",
    title: "Policy revision submitted",
    description: "Updated procurement compliance policy has been submitted for legal approval by the compliance team.",
    timestamp: "22 min ago",
    created_at: new Date(Date.now() - 22 * 60000).toISOString(),
  },
  {
    _id: "alert_005",
    type: "warning",
    title: "Cross-border data transfer risk",
    description: "One control set is currently mapped to both UK-GDPR and US-CA requirements. Jurisdiction mapping needs clarification.",
    timestamp: "35 min ago",
    created_at: new Date(Date.now() - 35 * 60000).toISOString(),
  },
];

export const MOCK_TEAM = [
  {
    _id: "user_001",
    name: "Shrimant Marathe",
    email: "shrimant@lexisgraph.ai",
    role: "admin",
    status: "active",
    avatar: "SM",
    joined: "Apr 10, 2026",
  },
  {
    _id: "user_002",
    name: "Priya Sharma",
    email: "priya@lexisgraph.ai",
    role: "analyst",
    status: "active",
    avatar: "PS",
    joined: "Apr 12, 2026",
  },
  {
    _id: "user_003",
    name: "Arjun Patel",
    email: "arjun@lexisgraph.ai",
    role: "viewer",
    status: "active",
    avatar: "AP",
    joined: "Apr 15, 2026",
  },
  {
    _id: "user_004",
    name: "Neha Gupta",
    email: "neha@lexisgraph.ai",
    role: "analyst",
    status: "invited",
    avatar: "NG",
    joined: "Apr 20, 2026",
  },
];

export const MOCK_PIPELINE_STEPS = [
  {
    id: "parse",
    label: "Document Parsed (spaCy)",
    description: "NLP extraction of entities, clauses, and obligations",
    status: "complete",
    duration: "2.4s",
  },
  {
    id: "graph",
    label: "Knowledge Graph Generated (Neo4j)",
    description: "Nodes and relationships mapped to compliance ontology",
    status: "complete",
    duration: "5.1s",
  },
  {
    id: "gap",
    label: "Gap Analysis Completed",
    description: "Cross-referenced against regulatory requirements database",
    status: "complete",
    duration: "3.8s",
  },
];

export const MOCK_CHAT_RESPONSES = [
  "Based on analysis, your policy may have compliance gaps in data protection. Specifically, the employee data retention clause does not align with GDPR Article 5 requirements for storage limitation.",
  "I've identified 3 potential issues with your vendor risk assessment. The third-party data handling procedures lack explicit mention of cross-border transfer controls required under Schrems II guidance.",
  "Your HR policy is generally compliant, but I recommend updating the termination notice timeline section. The current 14-day notice period may conflict with EU Employment Directive 2019/1152 requirements.",
  "The knowledge graph analysis shows strong compliance coverage for SOC2 controls, with 42 out of 45 controls properly mapped. Missing mappings are in the access management and incident response categories.",
];

export const MOCK_PROCESSING_STATUS = {
  status: "processing",
  message: "Analysis in progress (demo mode)",
  progress: 67,
};

export const MOCK_POLICIES = [
  {
    _id: "pol_001",
    name: "Employee Conduct Policy",
    version: "3.2",
    status: "Active",
    lastReviewed: "Apr 15, 2026",
    owner: "HR Department",
    complianceScore: 94,
  },
  {
    _id: "pol_002",
    name: "Data Privacy Policy",
    version: "2.1",
    status: "Under Review",
    lastReviewed: "Mar 28, 2026",
    owner: "Legal",
    complianceScore: 78,
  },
  {
    _id: "pol_003",
    name: "Vendor Risk Assessment",
    version: "1.4",
    status: "Active",
    lastReviewed: "Apr 10, 2026",
    owner: "Compliance",
    complianceScore: 88,
  },
  {
    _id: "pol_004",
    name: "Information Security Policy",
    version: "4.0",
    status: "Draft",
    lastReviewed: "Apr 22, 2026",
    owner: "IT Security",
    complianceScore: 65,
  },
  {
    _id: "pol_005",
    name: "Anti-Bribery & Corruption",
    version: "2.0",
    status: "Active",
    lastReviewed: "Feb 18, 2026",
    owner: "Legal",
    complianceScore: 91,
  },
];

export const MOCK_DASHBOARD_SUMMARY = {
  total_documents: MOCK_DOCUMENTS.length,
  alerts_count: MOCK_ALERTS.length,
  compliance_score: 86,
};
