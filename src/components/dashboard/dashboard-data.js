export const sidebarLinks = [
  { name: "Overview", badge: "Live" },
  { name: "Policy Graph" },
  { name: "Risk Monitor", badge: "8" },
  { name: "Audits" },
  { name: "Evidence Vault" },
  { name: "Settings" },
];

export const kpis = [
  {
    title: "Total Policies",
    value: "1,284",
    change: "+3.1%",
    status: "positive",
  },
  {
    title: "Compliance Score (%)",
    value: "96.4%",
    change: "+1.8%",
    status: "positive",
  },
  {
    title: "Active Risks",
    value: "14",
    change: "+5.4%",
    status: "negative",
  },
  {
    title: "Last Scan Time",
    value: "07:32 UTC",
    change: "12m ago",
    status: "neutral",
  },
];

export const alerts = [
  {
    type: "high",
    title: "Critical Policy Conflict",
    description: "Data retention clause in Vendor Policy v3 conflicts with GDPR archival requirements.",
    timestamp: "2 min ago",
  },
  {
    type: "warning",
    title: "Regulation Update Pending Review",
    description: "New SEC disclosure guidance detected but not yet mapped to internal controls.",
    timestamp: "9 min ago",
  },
  {
    type: "info",
    title: "Policy Revision Submitted",
    description: "Updated procurement compliance policy has been submitted for legal approval.",
    timestamp: "16 min ago",
  },
  {
    type: "warning",
    title: "Jurisdiction Mapping Ambiguity",
    description: "One control set is currently mapped to both UK-GDPR and US-CA requirements.",
    timestamp: "24 min ago",
  },
  {
    type: "high",
    title: "High Risk: Missing Evidence",
    description: "Control C-191 lacks supporting documentation for latest external compliance audit.",
    timestamp: "31 min ago",
  },
];

export const activityTimeline = [
  {
    title: "Scan completed for Global Employee Handbook",
    description: "128 clauses parsed into 346 graph nodes.",
    actor: "Compliance Engine",
    time: "Today, 07:32",
  },
  {
    title: "Risk escalation sent to Legal Ops",
    description: "Critical retention rule discrepancy highlighted.",
    actor: "Risk Monitor",
    time: "Today, 07:18",
  },
  {
    title: "New SOC2 control mappings synced",
    description: "42 controls linked to existing policy graph edges.",
    actor: "GraphRAG Sync",
    time: "Today, 06:54",
  },
  {
    title: "Policy pack imported from SharePoint",
    description: "Quarterly procurement compliance bundle ingested.",
    actor: "Integration Worker",
    time: "Today, 06:20",
  },
  {
    title: "Human approval recorded",
    description: "General counsel approved two remediation drafts.",
    actor: "Approval Workflow",
    time: "Today, 05:47",
  },
];