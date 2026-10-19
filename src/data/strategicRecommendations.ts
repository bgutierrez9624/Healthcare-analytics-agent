import { AIAgentOpportunity, ExecutivePriority } from '../types';

export const AI_AGENT_OPPORTUNITIES: AIAgentOpportunity[] = [
  {
    id: 'agent-discharge',
    name: 'Discharge Companion & Post-Acute Navigator',
    purpose:
      'Proactively guides discharged patients through medication regimens, red-flag symptom checks, and scheduled follow-ups via multimodal SMS and voice, translating medical discharge summaries into 6th-grade reading level in 14 languages.',
    expectedImpact:
      '+24% follow-up compliance, 31% reduction in 30-day preventable readmissions, eliminates medication ambiguity for 1,400+ annual cardiology and surgical patients.',
    targetServiceLines: ['General Surgery', 'Cardiology', 'Emergency Department'],
    feasibility: 'High',
    metricsProjected: {
      satisfactionDelta: '+0.8 pts (Discharge Domain)',
      costSavingsAnnual: '$1.42M (Readmission Penalties)',
      hoursSavedMonthly: '480 RN Care Coordinator Hrs',
    },
    addressedProblems: [
      'Discharge instruction ambiguity and tiny unreadable print',
      'Conflicting post-op medication reconciliation errors',
      'Loss to follow-up among high-risk chronic patients',
    ],
  },
  {
    id: 'agent-triage-multilingual',
    name: 'ED Multilingual Intelligent Triage Sentinel',
    purpose:
      'Provides instantaneous certified medical translation and dynamic triage queuing in Emergency Departments, enabling immediate Spanish, Mandarin, and Vietnamese symptom intake without waiting for physical interpreters.',
    expectedImpact:
      'Eliminates dangerous child-translation incidents, cuts ED triage intake wait times by 42 minutes, and guarantees Title VI / Section 1557 regulatory compliance.',
    targetServiceLines: ['Emergency Department', 'Telehealth & Urgent Care'],
    feasibility: 'Medium',
    metricsProjected: {
      satisfactionDelta: '+1.1 pts (Non-English Preferred Cohort)',
      costSavingsAnnual: '$890K (ED Left-Without-Being-Seen reduction)',
      hoursSavedMonthly: '320 Interpreter Triage Overhead Hrs',
    },
    addressedProblems: [
      'Severe language barriers in chest pain & acute triage',
      'Minors forced to translate high-risk clinical symptoms',
      'Prolonged unmonitored waiting room dwell times',
    ],
  },
  {
    id: 'agent-scheduler',
    name: 'Autonomous Ambulatory Referral & Capacity Orchestrator',
    purpose:
      'Autonomously matches patient referral clinical urgency with provider schedules across subspecialties, instantly filling cancelled slots, synchronizing pre-visit diagnostic prerequisites (e.g. echo, MRI), and eliminating phone trees.',
    expectedImpact:
      'Reduces specialist referral wait from 11 weeks to 12 days, recovers 88% of lost cancellation revenue, and terminates automated no-show SMS penalties caused by web link failures.',
    targetServiceLines: ['Cardiology', 'Neurology', 'Orthopedics'],
    feasibility: 'Medium',
    metricsProjected: {
      satisfactionDelta: '+0.9 pts (Access & Scheduling Domain)',
      costSavingsAnnual: '$2.15M (Recovered Clinic Slot Utilization)',
      hoursSavedMonthly: '650 Front-Desk Scheduling Phone Hrs',
    },
    addressedProblems: [
      '11-week backlog for urgent cardiovascular diagnostics',
      'Broken SMS confirmation links penalizing patients as no-shows',
      'Multi-month referral purgatory causing clinical symptom escalation',
    ],
  },
  {
    id: 'agent-portal-navigator',
    name: 'Digital Literacy & Lab Results Contextualizer',
    purpose:
      'Humanizes electronic patient portal experiences: converts raw pathology and complex diagnostic reports (21st Century Cures Act) into clear, comforting explanations with clinician video summaries, plus zero-friction voice login for elderly flip-phone or tech-novice users.',
    expectedImpact:
      'Prevents acute weekend panic from uncontextualized Friday night pathology drops, reduces patient portal lockouts by 78%, and increases geriatric digital adherence.',
    targetServiceLines: ['Oncology', 'Primary Care', 'Neurology'],
    feasibility: 'High',
    metricsProjected: {
      satisfactionDelta: '+0.7 pts (Tech-Novice & Geriatric Cohort)',
      costSavingsAnnual: '$540K (Tier-1 IT Portal Help Desk reduction)',
      hoursSavedMonthly: '290 Nurse Inbasket Message Hrs',
    },
    addressedProblems: [
      'Terrifying Friday night biopsy pathology auto-releases without physician context',
      '2FA timeouts locking out elderly and tech-novice patients',
      'Unanswered portal inbasket messages for adverse drug events',
    ],
  },
  {
    id: 'agent-clinical-safety-sentinel',
    name: 'Clinical AI Safety Guardrail & Hallucination Interceptor',
    purpose:
      'Listens across inbasket messages, clinical notes, and feedback to detect dangerous consumer AI health bot hallucinations, drug-drug interactions (e.g. Digoxin), and bias markers before they cause adverse clinical events or malpractice claims.',
    expectedImpact:
      'Catches 100% of missed clinical red flags (e.g., misdiagnosed postpartum hemorrhage, acute DVT triaged as soreness), stopping sentinel events and legal liability.',
    targetServiceLines: ['Emergency Department', 'OB/GYN', 'Orthopedics', 'General Surgery'],
    feasibility: 'Complex',
    metricsProjected: {
      satisfactionDelta: '+0.6 pts (Quality & Safety Metric)',
      costSavingsAnnual: '$3.20M (Malpractice Risk & Sentinel Event Prevention)',
      hoursSavedMonthly: '180 CMO Quality Committee Audit Hrs',
    },
    addressedProblems: [
      'Automated triage bot misclassifying acute post-op DVT as routine soreness',
      'Postpartum hemorrhage symptoms dismissed as normal new mom exhaustion',
      'Patients discontinuing chemo or life-saving meds due to AI bot advice',
    ],
  },
];

export const EXECUTIVE_TOP_5_PRIORITIES: ExecutivePriority[] = [
  {
    id: 'prio-1',
    rank: 1,
    title: 'Emergency Department Throughput & Language Equity Overhaul',
    targetMetric: 'Reduce ED median wait time from 210m to <90m; 100% certified translation within 5 mins of triage',
    owner: 'Chief Medical Officer & VP of Emergency Services',
    timeline: 'Immediate (Month 1 - 3)',
    status: 'In Progress',
    actionSummary:
      'Mandate on-demand bedside video translation tablets in all ED intake bays to terminate minor-child translation. Implement real-time waiting room vitals re-checks every 60 minutes for Level 3/4 patients.',
    rationale:
      'Emergency Department has the highest complaint variance (3.2x system baseline) and accounts for critical Title VI and EMTALA legal liability triggers.',
  },
  {
    id: 'prio-2',
    rank: 2,
    title: 'Post-Discharge Medication Reconciliation & Teach-Back Protocol',
    targetMetric: 'Achieve 90%+ follow-up compliance in surgical & cardiology patients; zero post-op med mix-ups',
    owner: 'Chief Nursing Officer & VP of Pharmacy Services',
    timeline: 'Months 2 - 4',
    status: 'In Progress',
    actionSummary:
      'Institute closed-loop digital pharmacy handoff prior to inpatient discharge. Deploy AI Discharge Companion to call high-risk patients at 24 and 72 hours post-discharge in native language.',
    rationale:
      'Medication errors and unmonitored post-op complications (e.g., missed DVT, diabetic fasting crash) represent the largest clinical safety risks in patient feedback.',
  },
  {
    id: 'prio-3',
    rank: 3,
    title: 'Subspecialty Scheduling & Referral Backlog Decompression',
    targetMetric: 'Cut cardiology & neurology specialist wait times from 11 weeks to under 14 days',
    owner: 'Chief Operating Officer & Chair of Ambulatory Care',
    timeline: 'Months 3 - 6',
    status: 'Planning',
    actionSummary:
      'Centralize ambulatory referral queues into an algorithmic capacity manager. Reclaim 22% of wasted capacity caused by faulty SMS cancellations and manual phone trees.',
    rationale:
      'Patients with progressive cardiovascular and neurological conditions are deteriorating in outpatient scheduling backlogs.',
  },
  {
    id: 'prio-4',
    rank: 4,
    title: 'Electronic Health Record Cures Act Lab Release Guardrail',
    targetMetric: 'Zero uncontextualized malignant biopsy results released on weekends or after clinic hours',
    owner: 'Chief Information Officer & Chief Medical Officer',
    timeline: 'Month 1 (Immediate)',
    status: 'On Track',
    actionSummary:
      'Configure EHR result-release engine to hold critical anatomic pathology/malignant cytology until clinician consultation window opens, paired with plain-language video explainer attachments.',
    rationale:
      'Severe acute psychological trauma and patient portal abandonment occur when malignant pathology is auto-released on Friday nights without physician guidance.',
  },
  {
    id: 'prio-5',
    rank: 5,
    title: 'Comprehensive Physical & Sensory Accessibility Remediation',
    targetMetric: '100% ADA compliance across outpatient exam tables, automatic door push-pads, and low-vision print',
    owner: 'VP of Facilities & Chief Patient Experience Officer',
    timeline: 'Months 1 - 3',
    status: 'Under Review',
    actionSummary:
      'Immediate audit and repair of clinic entrance automatic doors. Replace fixed-height examination tables in Orthopedics and Neurology with power low-height tables. Increase default discharge print to 14pt.',
    rationale:
      'Geriatric and disabled patients currently face physical injury hazards and indignity during routine clinical examinations.',
  },
];

export const QUICK_WINS_3_MONTHS = [
  {
    title: 'Mandate 14pt Minimum Font & Dual-Language Discharge Packets',
    timeframe: 'Weeks 1 - 4',
    impact: 'High immediate satisfaction boost for Geriatric and Non-English patients',
    department: 'Inpatient Nursing & Patient Education',
    cost: 'Low (< $15K)',
  },
  {
    title: 'Deploy Dedicated iPad Triage Translation Stands in ED Reception',
    timeframe: 'Weeks 2 - 6',
    impact: 'Eliminates reliance on family minors for translation; ensures Title VI compliance',
    department: 'Emergency & Language Services',
    cost: 'Low ($25K hardware)',
  },
  {
    title: 'Deactivate Faulty SMS 403 Link Auto-Cancellation Rule',
    timeframe: 'Week 2',
    impact: 'Prevents wrongful no-show drops and reclaims 150+ patient slots monthly',
    department: 'IT / EHR Ambulatory Team',
    cost: 'Zero ($0 configuration fix)',
  },
  {
    title: 'Configure EHR Friday Night Malignant Lab Release Delay',
    timeframe: 'Weeks 1 - 3',
    impact: 'Stops acute patient panic over unreviewed weekend cancer pathology',
    department: 'Health Informatics & Pathology',
    cost: 'Zero ($0 policy rule update)',
  },
  {
    title: 'Repair Entrance Handicap Buttons & Wheelchair Ramp Access',
    timeframe: 'Weeks 1 - 2',
    impact: 'Restores dignity, safety, and ADA compliance in Orthopedics & Outpatient Pavilion',
    department: 'Facilities & Campus Operations',
    cost: 'Low ($8K facility repairs)',
  },
];

export const LONG_TERM_AI_ROADMAP_6_12_MONTHS = [
  {
    phase: 'Phase 1 (Months 6 - 8)',
    title: 'Autonomous Ambulatory Referral & Capacity Orchestrator Deployment',
    description:
      'Full integration with Cerner/Epic EHR schedules to algorithmically match patient urgency, pre-requisite labs, and provider specialty, slashing outpatient wait times by 60%.',
    estimatedBudget: '$320K',
    projectedRoi: '4.8x within 12 months',
  },
  {
    phase: 'Phase 2 (Months 8 - 10)',
    title: 'AI Discharge Companion & Conversational Care Navigator',
    description:
      'Voice & SMS agent conducting personalized, culturally competent post-discharge check-ins across 14 languages, handling medication questions and alerting care teams to early decompensation.',
    estimatedBudget: '$450K',
    projectedRoi: '3.6x in readmission penalty reductions',
  },
  {
    phase: 'Phase 3 (Months 10 - 12)',
    title: 'Enterprise Clinical AI Safety & Hallucination Sentinel',
    description:
      'Continuous NLP monitoring across inbasket messages, clinical notes, and patient feedback to detect diagnostic delays, bias markers, unaddressed drug interactions, and consumer AI bot misguidance.',
    estimatedBudget: '$580K',
    projectedRoi: '7.2x in malpractice and adverse event avoidance',
  },
];
