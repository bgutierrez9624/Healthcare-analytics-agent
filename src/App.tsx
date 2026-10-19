import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { Navigation, SectionTab } from './components/Navigation';
import { Section1ExecutiveOverview } from './components/sections/Section1ExecutiveOverview';
import { Section2SatisfactionInsights } from './components/sections/Section2SatisfactionInsights';
import { Section3NLPAnalysis } from './components/sections/Section3NLPAnalysis';
import { Section4OrganizationalProblems } from './components/sections/Section4OrganizationalProblems';
import { Section6EquityAccessibility } from './components/sections/Section6EquityAccessibility';
import { Section7AIRiskMonitoring } from './components/sections/Section7AIRiskMonitoring';
import { Section8AIAgentOpportunities } from './components/sections/Section8AIAgentOpportunities';
import { Section9ExecutiveRecommendations } from './components/sections/Section9ExecutiveRecommendations';
import { LiveAgentDrawer } from './components/LiveAgentDrawer';
import { DatasetManagerModal } from './components/DatasetManagerModal';
import { INITIAL_PATIENT_FEEDBACK_DATASET } from './data/patientFeedbackDataset';
import {
  FeedbackRecord,
  FilterState,
  ServiceLine,
  VisitType,
  PatientPersona,
} from './types';
import {
  calculateExecutiveStats,
  getSatisfactionDistribution,
  getSatisfactionByServiceLine,
  getSatisfactionByVisitType,
  getSatisfactionByPersona,
  getTopThemes,
  getTopKeywords,
  analyzeOrganizationalProblems,
  analyzeEquityAndAccessibility,
  analyzeAIRisks,
} from './utils/analytics';

export default function App() {
  // Primary Dataset State
  const [records, setRecords] = useState<FeedbackRecord[]>(INITIAL_PATIENT_FEEDBACK_DATASET);

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState<SectionTab>('overview');

  // Filter State
  const [filters, setFilters] = useState<FilterState>({
    serviceLine: 'All',
    visitType: 'All',
    patientPersona: 'All',
    sentiment: 'All',
    searchQuery: '',
    onlyRisks: false,
    onlyEquityIssues: false,
  });

  // Modal / Drawer states
  const [isLiveAgentOpen, setIsLiveAgentOpen] = useState(false);
  const [liveAgentPrompt, setLiveAgentPrompt] = useState<string>('');
  const [isDataManagerOpen, setIsDataManagerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filter Options Available in Current Corpus
  const uniqueServiceLines = useMemo(() => {
    return Array.from(new Set(records.map((r) => r.serviceLine))).sort();
  }, [records]);

  const uniqueVisitTypes = useMemo(() => {
    return Array.from(new Set(records.map((r) => r.visitType))).sort();
  }, [records]);

  const uniquePersonas = useMemo(() => {
    return Array.from(new Set(records.map((r) => r.patientPersona))).sort();
  }, [records]);

  // Filtered Dataset Computation
  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      if (filters.serviceLine !== 'All' && r.serviceLine !== filters.serviceLine) {
        return false;
      }
      if (filters.visitType !== 'All' && r.visitType !== filters.visitType) {
        return false;
      }
      if (filters.patientPersona !== 'All' && r.patientPersona !== filters.patientPersona) {
        return false;
      }
      if (filters.sentiment !== 'All' && r.sentiment !== filters.sentiment) {
        return false;
      }
      if (filters.onlyRisks) {
        if (r.aiRisk.severity !== 'High' && r.aiRisk.severity !== 'Critical') {
          return false;
        }
      }
      if (filters.onlyEquityIssues) {
        if (
          !r.equity.hasAccessibilityConcern &&
          !r.equity.hasLanguageBarrier &&
          !r.equity.hasDigitalLiteracyIssue
        ) {
          return false;
        }
      }
      if (filters.searchQuery.trim() !== '') {
        const q = filters.searchQuery.toLowerCase();
        const matchesComment = r.comment.toLowerCase().includes(q);
        const matchesTheme = r.themes.some((t) => t.toLowerCase().includes(q));
        const matchesKeyword = r.keywords.some((k) => k.toLowerCase().includes(q));
        const matchesId = r.id.toLowerCase().includes(q);
        if (!matchesComment && !matchesTheme && !matchesKeyword && !matchesId) {
          return false;
        }
      }
      return true;
    });
  }, [records, filters]);

  // Analytics Computation
  const stats = useMemo(() => calculateExecutiveStats(filteredRecords), [filteredRecords]);
  const distribution = useMemo(
    () => getSatisfactionDistribution(filteredRecords),
    [filteredRecords]
  );
  const byServiceLine = useMemo(
    () => getSatisfactionByServiceLine(filteredRecords),
    [filteredRecords]
  );
  const byVisitType = useMemo(
    () => getSatisfactionByVisitType(filteredRecords),
    [filteredRecords]
  );
  const byPersona = useMemo(
    () => getSatisfactionByPersona(filteredRecords),
    [filteredRecords]
  );
  const themes = useMemo(() => getTopThemes(filteredRecords), [filteredRecords]);
  const keywords = useMemo(() => getTopKeywords(filteredRecords), [filteredRecords]);
  const problems = useMemo(
    () => analyzeOrganizationalProblems(filteredRecords),
    [filteredRecords]
  );
  const equityAnalysis = useMemo(
    () => analyzeEquityAndAccessibility(filteredRecords),
    [filteredRecords]
  );
  const riskAnalysis = useMemo(() => analyzeAIRisks(filteredRecords), [filteredRecords]);

  // Handlers
  const handleResetFilters = () => {
    setFilters({
      serviceLine: 'All',
      visitType: 'All',
      patientPersona: 'All',
      sentiment: 'All',
      searchQuery: '',
      onlyRisks: false,
      onlyEquityIssues: false,
    });
    showToast('Filters cleared to show full hospital dataset.');
  };

  const handleReviewRecord = (recordId: string) => {
    setRecords((prev) =>
      prev.map((r) => (r.id === recordId ? { ...r, aiRisk: { ...r.aiRisk, reviewed: true } } : r))
    );
    showToast(`Case ${recordId} marked as clinically reviewed.`);
  };

  const handleEscalateRecord = (record: FeedbackRecord) => {
    showToast(`Case ${record.id} escalated directly to Chief Medical Officer triage queue.`);
    setLiveAgentPrompt(
      `URGENT CMO CLINICAL ESCALATION FOR CASE ${record.id}:
Service Line: ${record.serviceLine}
Patient Persona: ${record.patientPersona}
Comment: "${record.comment}"
Risk: ${record.aiRisk.severity} - ${record.aiRisk.riskReason || 'Clinical hazard'}

Draft an immediate CMO Incident Memorandum and recommended clinical guardrails.`
    );
    setIsLiveAgentOpen(true);
  };

  const handleExportCSV = () => {
    const headers = 'id,patientId,date,serviceLine,visitType,persona,satisfaction,communication,waitTime,sentiment,comment\n';
    const rows = filteredRecords
      .map(
        (r) =>
          `"${r.id}","${r.patientId}","${r.date}","${r.serviceLine}","${r.visitType}","${r.patientPersona}",${r.satisfactionScore},${r.communicationRating},${r.waitTimeMinutes},"${r.sentiment}","${r.comment.replace(/"/g, '""')}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `hospital_patient_feedback_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    showToast(`Exported ${filteredRecords.length} records to CSV.`);
  };

  const isFiltered =
    filters.serviceLine !== 'All' ||
    filters.visitType !== 'All' ||
    filters.patientPersona !== 'All' ||
    filters.sentiment !== 'All' ||
    filters.searchQuery.trim() !== '' ||
    filters.onlyRisks ||
    filters.onlyEquityIssues;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-lg shadow-xl border border-slate-700 animate-fade-in flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-teal-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hospital Executive Header */}
      <Header
        totalRecords={records.length}
        filteredCount={filteredRecords.length}
        onOpenLiveAgent={() => {
          setLiveAgentPrompt('');
          setIsLiveAgentOpen(true);
        }}
        onOpenDataManager={() => setIsDataManagerOpen(true)}
        onExportCSV={handleExportCSV}
        onResetFilters={handleResetFilters}
        isFiltered={isFiltered}
      />

      {/* Navigation Bar */}
      <Navigation
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        riskCount={riskAnalysis.unreviewedCriticalCount}
        equityCount={equityAnalysis.accessibilityIssues.count + equityAnalysis.languageBarriers.count}
      />

      {/* Filter Bar */}
      <FilterBar
        filters={filters}
        onFilterChange={setFilters}
        serviceLines={uniqueServiceLines}
        visitTypes={uniqueVisitTypes}
        personas={uniquePersonas}
        totalFiltered={filteredRecords.length}
        totalAvailable={records.length}
      />

      {/* Main Dashboard Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'overview' && (
          <Section1ExecutiveOverview
            stats={stats}
            serviceLineBreakdown={byServiceLine}
            onSelectServiceLine={(line) => {
              setFilters((prev) => ({ ...prev, serviceLine: line }));
              setActiveTab('satisfaction');
            }}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'satisfaction' && (
          <Section2SatisfactionInsights
            distribution={distribution}
            byServiceLine={byServiceLine}
            byVisitType={byVisitType}
            byPersona={byPersona}
            systemAvgSatisfaction={stats.avgSatisfaction}
            onFilterPersona={(p) => setFilters((prev) => ({ ...prev, patientPersona: p }))}
            onFilterVisitType={(vt) => setFilters((prev) => ({ ...prev, visitType: vt }))}
            onFilterServiceLine={(sl) => setFilters((prev) => ({ ...prev, serviceLine: sl }))}
          />
        )}

        {activeTab === 'nlp' && (
          <Section3NLPAnalysis
            themes={themes}
            keywords={keywords}
            allRecords={filteredRecords}
          />
        )}

        {activeTab === 'problems' && (
          <Section4OrganizationalProblems
            problems={problems}
            allRecords={filteredRecords}
            onFilterServiceLine={(sl) => setFilters((prev) => ({ ...prev, serviceLine: sl }))}
          />
        )}

        {activeTab === 'equity' && (
          <Section6EquityAccessibility
            equity={equityAnalysis}
            onFilterPersona={(p) => setFilters((prev) => ({ ...prev, patientPersona: p }))}
          />
        )}

        {activeTab === 'risk' && (
          <Section7AIRiskMonitoring
            riskAnalysis={riskAnalysis}
            onReviewRecord={handleReviewRecord}
            onEscalateRecord={handleEscalateRecord}
          />
        )}

        {activeTab === 'agents' && <Section8AIAgentOpportunities />}

        {activeTab === 'recommendations' && (
          <Section9ExecutiveRecommendations
            onOpenLiveAgentWithPrompt={(prompt) => {
              setLiveAgentPrompt(prompt);
              setIsLiveAgentOpen(true);
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Healthcare Analytics Agent · Hospital Executive Intelligence System
          </span>
          <span className="font-mono text-slate-400">
            HCAHPS Quality Aligned · HIPAA Shielded · CMS Tier 1
          </span>
        </div>
      </footer>

      {/* Live AI Agent Drawer */}
      <LiveAgentDrawer
        isOpen={isLiveAgentOpen}
        onClose={() => setIsLiveAgentOpen(false)}
        records={filteredRecords}
        stats={stats}
        initialPrompt={liveAgentPrompt}
      />

      {/* Dataset Manager Modal */}
      <DatasetManagerModal
        isOpen={isDataManagerOpen}
        onClose={() => setIsDataManagerOpen(false)}
        records={records}
        onUploadRecords={(newRecords) => {
          setRecords(newRecords);
          showToast(`Ingested ${newRecords.length} records into dashboard.`);
        }}
        onResetToDefault={() => {
          setRecords(INITIAL_PATIENT_FEEDBACK_DATASET);
          showToast('Reset to standard comprehensive dataset.');
        }}
        onAddRecord={(newRecord) => {
          setRecords((prev) => [newRecord, ...prev]);
          showToast(`Added comment ${newRecord.id} to dataset.`);
        }}
      />
    </div>
  );
}
