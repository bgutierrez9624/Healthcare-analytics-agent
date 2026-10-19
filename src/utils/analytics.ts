import {
  FeedbackRecord,
  ExecutiveSummaryStats,
  ServiceLine,
  VisitType,
  PatientPersona,
  Sentiment,
} from '../types';

export function calculateExecutiveStats(records: FeedbackRecord[]): ExecutiveSummaryStats {
  if (records.length === 0) {
    return {
      totalComments: 0,
      avgSatisfaction: 0,
      avgCommunication: 0,
      followUpComplianceRate: 0,
      serviceLineCount: 0,
      medianWaitTime: 0,
      totalComplaints: 0,
      highRiskCasesCount: 0,
      equityCasesCount: 0,
    };
  }

  const totalComments = records.length;
  const totalSatisfaction = records.reduce((sum, r) => sum + r.satisfactionScore, 0);
  const totalCommunication = records.reduce((sum, r) => sum + r.communicationRating, 0);
  const compliantCount = records.filter((r) => r.followUpCompliant).length;
  const uniqueServiceLines = new Set(records.map((r) => r.serviceLine)).size;

  const waitTimes = records.map((r) => r.waitTimeMinutes).sort((a, b) => a - b);
  const medianWaitTime = waitTimes.length % 2 === 0
    ? Math.round((waitTimes[waitTimes.length / 2 - 1] + waitTimes[waitTimes.length / 2]) / 2)
    : waitTimes[Math.floor(waitTimes.length / 2)];

  const totalComplaints = records.filter((r) => r.complaintCategory !== 'None').length;
  const highRiskCasesCount = records.filter(
    (r) => r.aiRisk.severity === 'High' || r.aiRisk.severity === 'Critical'
  ).length;

  const equityCasesCount = records.filter(
    (r) =>
      r.equity.hasAccessibilityConcern ||
      r.equity.hasLanguageBarrier ||
      r.equity.hasDigitalLiteracyIssue
  ).length;

  return {
    totalComments,
    avgSatisfaction: Number((totalSatisfaction / totalComments).toFixed(2)),
    avgCommunication: Number((totalCommunication / totalComments).toFixed(2)),
    followUpComplianceRate: Number(((compliantCount / totalComments) * 100).toFixed(1)),
    serviceLineCount: uniqueServiceLines,
    medianWaitTime,
    totalComplaints,
    highRiskCasesCount,
    equityCasesCount,
  };
}

export interface SatisfactionDistribution {
  score: number;
  count: number;
  percentage: number;
}

export function getSatisfactionDistribution(records: FeedbackRecord[]): SatisfactionDistribution[] {
  const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  records.forEach((r) => {
    if (counts[r.satisfactionScore] !== undefined) {
      counts[r.satisfactionScore]++;
    }
  });

  const total = records.length || 1;
  return [5, 4, 3, 2, 1].map((score) => ({
    score,
    count: counts[score],
    percentage: Number(((counts[score] / total) * 100).toFixed(1)),
  }));
}

export interface GroupSatisfaction {
  name: string;
  count: number;
  avgSatisfaction: number;
  avgCommunication: number;
  complaintRate: number;
  followUpRate: number;
}

export function getSatisfactionByServiceLine(records: FeedbackRecord[]): GroupSatisfaction[] {
  const grouped: Record<string, FeedbackRecord[]> = {};
  records.forEach((r) => {
    if (!grouped[r.serviceLine]) grouped[r.serviceLine] = [];
    grouped[r.serviceLine].push(r);
  });

  return Object.entries(grouped)
    .map(([name, group]) => {
      const avgSat = group.reduce((s, r) => s + r.satisfactionScore, 0) / group.length;
      const avgComm = group.reduce((s, r) => s + r.communicationRating, 0) / group.length;
      const complaints = group.filter((r) => r.complaintCategory !== 'None').length;
      const followUp = group.filter((r) => r.followUpCompliant).length;
      return {
        name,
        count: group.length,
        avgSatisfaction: Number(avgSat.toFixed(2)),
        avgCommunication: Number(avgComm.toFixed(2)),
        complaintRate: Number(((complaints / group.length) * 100).toFixed(1)),
        followUpRate: Number(((followUp / group.length) * 100).toFixed(1)),
      };
    })
    .sort((a, b) => b.avgSatisfaction - a.avgSatisfaction);
}

export function getSatisfactionByVisitType(records: FeedbackRecord[]): GroupSatisfaction[] {
  const grouped: Record<string, FeedbackRecord[]> = {};
  records.forEach((r) => {
    if (!grouped[r.visitType]) grouped[r.visitType] = [];
    grouped[r.visitType].push(r);
  });

  return Object.entries(grouped)
    .map(([name, group]) => {
      const avgSat = group.reduce((s, r) => s + r.satisfactionScore, 0) / group.length;
      const avgComm = group.reduce((s, r) => s + r.communicationRating, 0) / group.length;
      const complaints = group.filter((r) => r.complaintCategory !== 'None').length;
      const followUp = group.filter((r) => r.followUpCompliant).length;
      return {
        name,
        count: group.length,
        avgSatisfaction: Number(avgSat.toFixed(2)),
        avgCommunication: Number(avgComm.toFixed(2)),
        complaintRate: Number(((complaints / group.length) * 100).toFixed(1)),
        followUpRate: Number(((followUp / group.length) * 100).toFixed(1)),
      };
    })
    .sort((a, b) => b.avgSatisfaction - a.avgSatisfaction);
}

export function getSatisfactionByPersona(records: FeedbackRecord[]): GroupSatisfaction[] {
  const grouped: Record<string, FeedbackRecord[]> = {};
  records.forEach((r) => {
    if (!grouped[r.patientPersona]) grouped[r.patientPersona] = [];
    grouped[r.patientPersona].push(r);
  });

  return Object.entries(grouped)
    .map(([name, group]) => {
      const avgSat = group.reduce((s, r) => s + r.satisfactionScore, 0) / group.length;
      const avgComm = group.reduce((s, r) => s + r.communicationRating, 0) / group.length;
      const complaints = group.filter((r) => r.complaintCategory !== 'None').length;
      const followUp = group.filter((r) => r.followUpCompliant).length;
      return {
        name,
        count: group.length,
        avgSatisfaction: Number(avgSat.toFixed(2)),
        avgCommunication: Number(avgComm.toFixed(2)),
        complaintRate: Number(((complaints / group.length) * 100).toFixed(1)),
        followUpRate: Number(((followUp / group.length) * 100).toFixed(1)),
      };
    })
    .sort((a, b) => b.avgSatisfaction - a.avgSatisfaction);
}

// NLP & THEMES
export interface ThemeStats {
  theme: string;
  count: number;
  percentage: number;
  positive: number;
  neutral: number;
  negative: number;
  avgSatisfaction: number;
}

export function getTopThemes(records: FeedbackRecord[]): ThemeStats[] {
  const map: Record<
    string,
    { count: number; pos: number; neu: number; neg: number; totalSat: number }
  > = {};

  records.forEach((r) => {
    r.themes.forEach((theme) => {
      if (!map[theme]) {
        map[theme] = { count: 0, pos: 0, neu: 0, neg: 0, totalSat: 0 };
      }
      map[theme].count++;
      map[theme].totalSat += r.satisfactionScore;
      if (r.sentiment === 'positive') map[theme].pos++;
      else if (r.sentiment === 'neutral') map[theme].neu++;
      else map[theme].neg++;
    });
  });

  const total = records.length || 1;
  return Object.entries(map)
    .map(([theme, data]) => ({
      theme,
      count: data.count,
      percentage: Number(((data.count / total) * 100).toFixed(1)),
      positive: data.pos,
      neutral: data.neu,
      negative: data.neg,
      avgSatisfaction: Number((data.totalSat / data.count).toFixed(2)),
    }))
    .sort((a, b) => b.count - a.count);
}

export interface KeywordStats {
  word: string;
  frequency: number;
  sentimentBias: 'positive' | 'neutral' | 'negative';
  sentimentRatio: number; // 0 to 1 positive ratio
}

export function getTopKeywords(records: FeedbackRecord[]): KeywordStats[] {
  const map: Record<string, { count: number; pos: number; neg: number }> = {};

  records.forEach((r) => {
    r.keywords.forEach((kw) => {
      const clean = kw.trim();
      if (!clean) return;
      if (!map[clean]) map[clean] = { count: 0, pos: 0, neg: 0 };
      map[clean].count++;
      if (r.sentiment === 'positive') map[clean].pos++;
      else if (r.sentiment === 'negative') map[clean].neg++;
    });
  });

  return Object.entries(map)
    .map(([word, d]) => {
      const posRatio = d.count > 0 ? d.pos / d.count : 0.5;
      let sentimentBias: 'positive' | 'neutral' | 'negative' = 'neutral';
      if (posRatio > 0.6) sentimentBias = 'positive';
      else if (posRatio < 0.35) sentimentBias = 'negative';

      return {
        word,
        frequency: d.count,
        sentimentBias,
        sentimentRatio: Number(posRatio.toFixed(2)),
      };
    })
    .sort((a, b) => b.frequency - a.frequency);
}

// SECTION 4: HIDDEN ORGANIZATIONAL PROBLEMS
export interface OrganizationalProblemsSummary {
  highComplaintServiceLines: {
    serviceLine: string;
    complaintCount: number;
    complaintRate: number;
    benchmarkRate: number;
    varianceRatio: number; // e.g. 1.8x
    primaryIssues: string[];
  }[];
  communicationBottlenecks: {
    count: number;
    percentage: number;
    subtypes: { name: string; count: number; example: string }[];
  };
  technologyIssues: {
    count: number;
    percentage: number;
    subtypes: { name: string; count: number; example: string }[];
  };
  schedulingIssues: {
    count: number;
    percentage: number;
    subtypes: { name: string; count: number; example: string }[];
  };
  waitTimeAnalysis: {
    medianWait: number;
    waitBuckets: { range: string; count: number; avgSat: number }[];
    extremeWaitCasesCount: number; // > 120 mins
  };
}

export function analyzeOrganizationalProblems(records: FeedbackRecord[]): OrganizationalProblemsSummary {
  const total = records.length || 1;
  const overallComplaints = records.filter((r) => r.complaintCategory !== 'None').length;
  const overallComplaintRate = (overallComplaints / total) * 100;

  // Group by service line
  const slMap: Record<string, { total: number; complaints: number; issues: Record<string, number> }> = {};
  records.forEach((r) => {
    if (!slMap[r.serviceLine]) slMap[r.serviceLine] = { total: 0, complaints: 0, issues: {} };
    slMap[r.serviceLine].total++;
    if (r.complaintCategory !== 'None') {
      slMap[r.serviceLine].complaints++;
      slMap[r.serviceLine].issues[r.complaintCategory] =
        (slMap[r.serviceLine].issues[r.complaintCategory] || 0) + 1;
    }
  });

  const highComplaintServiceLines = Object.entries(slMap)
    .map(([serviceLine, d]) => {
      const complaintRate = (d.complaints / d.total) * 100;
      const varianceRatio = overallComplaintRate > 0 ? complaintRate / overallComplaintRate : 1;
      const topIssues = Object.entries(d.issues)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([k, count]) => `${k} (${count})`);

      return {
        serviceLine,
        complaintCount: d.complaints,
        complaintRate: Number(complaintRate.toFixed(1)),
        benchmarkRate: Number(overallComplaintRate.toFixed(1)),
        varianceRatio: Number(varianceRatio.toFixed(2)),
        primaryIssues: topIssues,
      };
    })
    .filter((s) => s.complaintRate >= overallComplaintRate * 0.9)
    .sort((a, b) => b.complaintRate - a.complaintRate);

  // Communication Bottlenecks
  const commRecords = records.filter((r) => r.complaintCategory === 'Communication Bottleneck');
  const communicationBottlenecks = {
    count: commRecords.length,
    percentage: Number(((commRecords.length / total) * 100).toFixed(1)),
    subtypes: [
      {
        name: 'Discharge Instruction Ambiguity',
        count: records.filter((r) => r.themes.includes('Discharge Clarity')).length,
        example: 'Discharge paperwork handed off without medication reconciliation or verbal teach-back.',
      },
      {
        name: 'Clinical Jargon & Rushed Explanations',
        count: records.filter((r) => r.themes.includes('Communication Bottleneck')).length,
        example: 'Provider typing on computer screen; patient left confused about diagnosis & next steps.',
      },
      {
        name: 'Inter-departmental Hand-off Gaps',
        count: records.filter((r) => r.comment.toLowerCase().includes('phone') || r.comment.toLowerCase().includes('coordinator')).length,
        example: 'Specialty pharmacy vs clinic finger-pointing resulting in treatment delays.',
      },
    ],
  };

  // Technology Issues
  const techRecords = records.filter(
    (r) => r.complaintCategory === 'Technology & Portal' || r.equity.hasDigitalLiteracyIssue
  );
  const technologyIssues = {
    count: techRecords.length,
    percentage: Number(((techRecords.length / total) * 100).toFixed(1)),
    subtypes: [
      {
        name: 'Patient Portal 2FA & Login Failures',
        count: techRecords.filter((r) => r.comment.toLowerCase().includes('2fa') || r.comment.toLowerCase().includes('login') || r.comment.toLowerCase().includes('phone')).length,
        example: 'Timed-out SMS verification codes leading to missed telehealth visits.',
      },
      {
        name: 'Unfiltered Pathology/Lab Auto-Releases',
        count: techRecords.filter((r) => r.comment.toLowerCase().includes('biopsy') || r.comment.toLowerCase().includes('pathology') || r.comment.toLowerCase().includes('lab')).length,
        example: 'Critical oncology results auto-released on Friday nights causing acute patient panic.',
      },
      {
        name: 'Virtual Interpreter Screen Freezes',
        count: techRecords.filter((r) => r.comment.toLowerCase().includes('freeze') || r.comment.toLowerCase().includes('video')).length,
        example: 'Remote interpreter app disconnects forcing premature session cancellation.',
      },
    ],
  };

  // Scheduling Issues
  const schedRecords = records.filter((r) => r.complaintCategory === 'Scheduling & Referrals');
  const schedulingIssues = {
    count: schedRecords.length,
    percentage: Number(((schedRecords.length / total) * 100).toFixed(1)),
    subtypes: [
      {
        name: 'Specialist Referral Delays (11+ weeks)',
        count: schedRecords.filter((r) => r.comment.toLowerCase().includes('week') || r.comment.toLowerCase().includes('month')).length,
        example: 'Urgent cardiology echo backlog exceeding 10 weeks despite worsening dyspnea.',
      },
      {
        name: 'Inflexible Infusion & Treatment Hours',
        count: schedRecords.filter((r) => r.comment.toLowerCase().includes('work') || r.comment.toLowerCase().includes('leave') || r.comment.toLowerCase().includes('hours')).length,
        example: 'No weekend or evening chemotherapy slots forcing working parents to take unpaid leave.',
      },
      {
        name: 'Automated SMS No-Show Penalties',
        count: schedRecords.filter((r) => r.comment.toLowerCase().includes('cancel') || r.comment.toLowerCase().includes('no-show')).length,
        example: 'Broken verification link triggers auto-cancellation as patient no-show.',
      },
    ],
  };

  // Wait Time Analysis
  const waitBuckets = [
    { range: '< 30 mins', min: 0, max: 30, count: 0, totalSat: 0 },
    { range: '31 - 60 mins', min: 31, max: 60, count: 0, totalSat: 0 },
    { range: '61 - 120 mins', min: 61, max: 120, count: 0, totalSat: 0 },
    { range: '121 - 180 mins', min: 121, max: 180, count: 0, totalSat: 0 },
    { range: '180+ mins', min: 181, max: 9999, count: 0, totalSat: 0 },
  ];

  records.forEach((r) => {
    const bucket = waitBuckets.find((b) => r.waitTimeMinutes >= b.min && r.waitTimeMinutes <= b.max);
    if (bucket) {
      bucket.count++;
      bucket.totalSat += r.satisfactionScore;
    }
  });

  const waitTimes = records.map((r) => r.waitTimeMinutes).sort((a, b) => a - b);
  const medianWait = waitTimes.length > 0 ? waitTimes[Math.floor(waitTimes.length / 2)] : 0;
  const extremeWaitCasesCount = records.filter((r) => r.waitTimeMinutes > 120).length;

  return {
    highComplaintServiceLines,
    communicationBottlenecks,
    technologyIssues,
    schedulingIssues,
    waitTimeAnalysis: {
      medianWait,
      waitBuckets: waitBuckets.map((b) => ({
        range: b.range,
        count: b.count,
        avgSat: b.count > 0 ? Number((b.totalSat / b.count).toFixed(2)) : 0,
      })),
      extremeWaitCasesCount,
    },
  };
}

// SECTION 6: HEALTHCARE EQUITY & ACCESSIBILITY
export interface EquityAnalysis {
  personaDisparities: {
    persona: string;
    count: number;
    avgSatisfaction: number;
    satisfactionDeltaVsSystem: number;
    complaintRate: number;
    followUpCompliance: number;
  }[];
  accessibilityIssues: {
    count: number;
    percentage: number;
    cases: FeedbackRecord[];
  };
  languageBarriers: {
    count: number;
    percentage: number;
    cases: FeedbackRecord[];
  };
  digitalLiteracyChallenges: {
    count: number;
    percentage: number;
    cases: FeedbackRecord[];
  };
}

export function analyzeEquityAndAccessibility(records: FeedbackRecord[]): EquityAnalysis {
  const total = records.length || 1;
  const systemAvgSat = records.reduce((s, r) => s + r.satisfactionScore, 0) / total;

  const personaMap: Record<string, FeedbackRecord[]> = {};
  records.forEach((r) => {
    if (!personaMap[r.patientPersona]) personaMap[r.patientPersona] = [];
    personaMap[r.patientPersona].push(r);
  });

  const personaDisparities = Object.entries(personaMap)
    .map(([persona, list]) => {
      const avgSat = list.reduce((s, r) => s + r.satisfactionScore, 0) / list.length;
      const complaints = list.filter((r) => r.complaintCategory !== 'None').length;
      const compliant = list.filter((r) => r.followUpCompliant).length;
      return {
        persona,
        count: list.length,
        avgSatisfaction: Number(avgSat.toFixed(2)),
        satisfactionDeltaVsSystem: Number((avgSat - systemAvgSat).toFixed(2)),
        complaintRate: Number(((complaints / list.length) * 100).toFixed(1)),
        followUpCompliance: Number(((compliant / list.length) * 100).toFixed(1)),
      };
    })
    .sort((a, b) => a.avgSatisfaction - b.avgSatisfaction);

  const accessibilityCases = records.filter((r) => r.equity.hasAccessibilityConcern);
  const languageCases = records.filter((r) => r.equity.hasLanguageBarrier);
  const digitalLiteracyCases = records.filter((r) => r.equity.hasDigitalLiteracyIssue);

  return {
    personaDisparities,
    accessibilityIssues: {
      count: accessibilityCases.length,
      percentage: Number(((accessibilityCases.length / total) * 100).toFixed(1)),
      cases: accessibilityCases,
    },
    languageBarriers: {
      count: languageCases.length,
      percentage: Number(((languageCases.length / total) * 100).toFixed(1)),
      cases: languageCases,
    },
    digitalLiteracyChallenges: {
      count: digitalLiteracyCases.length,
      percentage: Number(((digitalLiteracyCases.length / total) * 100).toFixed(1)),
      cases: digitalLiteracyCases,
    },
  };
}

// SECTION 7: AI RISK MONITORING
export interface AIRiskAnalysis {
  hallucinationTraps: FeedbackRecord[];
  biasRelatedComments: FeedbackRecord[];
  casesRequiringHumanReview: FeedbackRecord[];
  severityBreakdown: {
    Critical: number;
    High: number;
    Medium: number;
    Low: number;
  };
  unreviewedCriticalCount: number;
}

export function analyzeAIRisks(records: FeedbackRecord[]): AIRiskAnalysis {
  const hallucinationTraps = records.filter((r) => r.aiRisk.isHallucinationTrap);
  const biasRelatedComments = records.filter((r) => r.aiRisk.isBiasRelated);
  const casesRequiringHumanReview = records.filter((r) => r.aiRisk.requiresHumanReview);

  const severityBreakdown = {
    Critical: 0,
    High: 0,
    Medium: 0,
    Low: 0,
  };

  records.forEach((r) => {
    if (r.aiRisk.severity in severityBreakdown) {
      severityBreakdown[r.aiRisk.severity as keyof typeof severityBreakdown]++;
    }
  });

  const unreviewedCriticalCount = records.filter(
    (r) => (r.aiRisk.severity === 'Critical' || r.aiRisk.severity === 'High') && !r.aiRisk.reviewed
  ).length;

  return {
    hallucinationTraps,
    biasRelatedComments,
    casesRequiringHumanReview,
    severityBreakdown,
    unreviewedCriticalCount,
  };
}
