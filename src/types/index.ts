export type ServiceLine =
  | 'Emergency Department'
  | 'Cardiology'
  | 'Oncology'
  | 'Orthopedics'
  | 'Pediatrics'
  | 'Neurology'
  | 'OB/GYN'
  | 'Primary Care'
  | 'Telehealth & Urgent Care'
  | 'General Surgery';

export type VisitType =
  | 'Inpatient'
  | 'Outpatient'
  | 'Emergency'
  | 'Telehealth'
  | 'Surgical';

export type PatientPersona =
  | 'Geriatric (65+)'
  | 'Chronic Care (Multimorbid)'
  | 'Working Parent'
  | 'Non-English Preferred'
  | 'Tech-Novice'
  | 'Underinsured / Self-Pay'
  | 'Young Adult';

export type Sentiment = 'positive' | 'neutral' | 'negative';

export type ComplaintCategory =
  | 'None'
  | 'Communication Bottleneck'
  | 'Technology & Portal'
  | 'Scheduling & Referrals'
  | 'Wait-Time & Delays'
  | 'Billing & Transparency'
  | 'Care Transition / Discharge'
  | 'Facility & Accessibility';

export interface EquityData {
  hasAccessibilityConcern: boolean;
  hasLanguageBarrier: boolean;
  hasDigitalLiteracyIssue: boolean;
  notes?: string;
}

export interface AIRiskFlags {
  isHallucinationTrap: boolean;
  isBiasRelated: boolean;
  requiresHumanReview: boolean;
  severity: 'None' | 'Low' | 'Medium' | 'High' | 'Critical';
  riskReason?: string;
  reviewed?: boolean;
}

export interface FeedbackRecord {
  id: string;
  patientId: string;
  date: string; // YYYY-MM-DD
  serviceLine: ServiceLine;
  visitType: VisitType;
  patientPersona: PatientPersona;
  satisfactionScore: number; // 1 - 5
  communicationRating: number; // 1 - 5
  followUpCompliant: boolean;
  waitTimeMinutes: number;
  comment: string;
  themes: string[];
  keywords: string[];
  sentiment: Sentiment;
  complaintCategory: ComplaintCategory;
  equity: EquityData;
  aiRisk: AIRiskFlags;
}

export interface FilterState {
  serviceLine: string; // 'All' or specific
  visitType: string; // 'All' or specific
  patientPersona: string; // 'All' or specific
  sentiment: string; // 'All' or specific
  searchQuery: string;
  onlyRisks: boolean;
  onlyEquityIssues: boolean;
}

export interface ExecutiveSummaryStats {
  totalComments: number;
  avgSatisfaction: number;
  avgCommunication: number;
  followUpComplianceRate: number;
  serviceLineCount: number;
  medianWaitTime: number;
  totalComplaints: number;
  highRiskCasesCount: number;
  equityCasesCount: number;
}

export interface AIAgentOpportunity {
  id: string;
  name: string;
  purpose: string;
  expectedImpact: string;
  targetServiceLines: ServiceLine[];
  feasibility: 'High' | 'Medium' | 'Complex';
  metricsProjected: {
    satisfactionDelta: string;
    costSavingsAnnual: string;
    hoursSavedMonthly: string;
  };
  addressedProblems: string[];
}

export interface ExecutivePriority {
  id: string;
  rank: number;
  title: string;
  targetMetric: string;
  owner: string;
  timeline: string;
  status: 'Planning' | 'In Progress' | 'On Track' | 'Under Review';
  actionSummary: string;
  rationale: string;
}
