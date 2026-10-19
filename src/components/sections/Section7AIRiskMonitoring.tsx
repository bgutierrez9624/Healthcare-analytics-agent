import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  Bot,
  UserCheck,
  CheckCircle2,
  FileWarning,
  Eye,
  Filter,
  Flame,
  ArrowUpRight,
} from 'lucide-react';
import { AIRiskAnalysis } from '../../utils/analytics';
import { FeedbackRecord } from '../../types';

interface Section7Props {
  riskAnalysis: AIRiskAnalysis;
  onReviewRecord: (recordId: string) => void;
  onEscalateRecord: (record: FeedbackRecord) => void;
}

export const Section7AIRiskMonitoring: React.FC<Section7Props> = ({
  riskAnalysis,
  onReviewRecord,
  onEscalateRecord,
}) => {
  const [filterMode, setFilterMode] = useState<
    'all' | 'hallucinations' | 'bias' | 'critical'
  >('all');
  const [selectedCase, setSelectedCase] = useState<FeedbackRecord | null>(null);

  const displayedCases = riskAnalysis.casesRequiringHumanReview.filter((r) => {
    if (filterMode === 'hallucinations') return r.aiRisk.isHallucinationTrap;
    if (filterMode === 'bias') return r.aiRisk.isBiasRelated;
    if (filterMode === 'critical') return r.aiRisk.severity === 'Critical';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <div className="text-xs font-semibold text-rose-600 uppercase tracking-wider">
            Section 7 · Clinical Safety Guardrails
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            AI Risk Monitoring & Clinical Safety Oversight
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Surveillance of consumer AI bot hallucinations, discriminatory bias markers, and sentinel event near-misses requiring executive clinical escalation.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <span className="font-mono bg-rose-100 text-rose-800 px-2.5 py-1 rounded font-bold border border-rose-300">
            {riskAnalysis.unreviewedCriticalCount} Pending CMO Actions
          </span>
        </div>
      </div>

      {/* 3 Core Surveillance Pillars (From prompt) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Pillar 1: Hallucination Trap Comments */}
        <div
          onClick={() => setFilterMode('hallucinations')}
          className={`p-5 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
            filterMode === 'hallucinations'
              ? 'bg-purple-50/60 border-purple-400 ring-2 ring-purple-300'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div>
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-900">
                1. Hallucination Traps
              </span>
              <Bot className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold text-slate-900">
                {riskAnalysis.hallucinationTraps.length}
              </span>
              <span className="text-xs text-slate-500">cases identified</span>
            </div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Patients influenced by consumer chatbots advocating unapproved cancer cures, or automated triage bots mistaking DVTs for soreness.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-purple-700">
            Click to inspect hallucination logs →
          </div>
        </div>

        {/* Pillar 2: Bias-Related Comments */}
        <div
          onClick={() => setFilterMode('bias')}
          className={`p-5 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
            filterMode === 'bias'
              ? 'bg-amber-50/60 border-amber-400 ring-2 ring-amber-300'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div>
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                2. Bias-Related Comments
              </span>
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold text-slate-900">
                {riskAnalysis.biasRelatedComments.length}
              </span>
              <span className="text-xs text-slate-500">bias markers</span>
            </div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Documented provider dismissal based on age, Medicaid status, language accent, or maternal symptoms (e.g. postpartum hemorrhage brushed off).
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-amber-800">
            Click to inspect bias incidents →
          </div>
        </div>

        {/* Pillar 3: Cases Requiring Human Review */}
        <div
          onClick={() => setFilterMode('critical')}
          className={`p-5 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
            filterMode === 'critical'
              ? 'bg-rose-50/60 border-rose-400 ring-2 ring-rose-300'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div>
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-900">
                3. Mandatory Human Review
              </span>
              <ShieldAlert className="w-5 h-5 text-rose-600" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold text-rose-700">
                {riskAnalysis.casesRequiringHumanReview.length}
              </span>
              <span className="text-xs text-slate-500">review triggers</span>
            </div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Critical clinical deterioration, EMTALA deposit inquiries, medication disruptions, and sentinel event near-misses.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-rose-700">
            {riskAnalysis.severityBreakdown.Critical} Critical ·{' '}
            {riskAnalysis.severityBreakdown.High} High Severity
          </div>
        </div>
      </div>

      {/* Human Review Triage Queue */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/60">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Executive Clinical Risk Triage Queue ({displayedCases.length} Cases)
            </h3>
            <p className="text-xs text-slate-500">
              CMO & Quality Committee Action Log. Escalated records trigger immediate clinical review workflows.
            </p>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1 font-semibold rounded cursor-pointer ${
                filterMode === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              All Triggers ({riskAnalysis.casesRequiringHumanReview.length})
            </button>
            <button
              onClick={() => setFilterMode('critical')}
              className={`px-3 py-1 font-semibold rounded cursor-pointer ${
                filterMode === 'critical'
                  ? 'bg-rose-700 text-white'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Critical Only ({riskAnalysis.severityBreakdown.Critical})
            </button>
            <button
              onClick={() => setFilterMode('hallucinations')}
              className={`px-3 py-1 font-semibold rounded cursor-pointer ${
                filterMode === 'hallucinations'
                  ? 'bg-purple-700 text-white'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              AI Traps ({riskAnalysis.hallucinationTraps.length})
            </button>
            <button
              onClick={() => setFilterMode('bias')}
              className={`px-3 py-1 font-semibold rounded cursor-pointer ${
                filterMode === 'bias'
                  ? 'bg-amber-800 text-white'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Bias Flags ({riskAnalysis.biasRelatedComments.length})
            </button>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {displayedCases.map((r) => {
            const isCritical = r.aiRisk.severity === 'Critical';
            const isHigh = r.aiRisk.severity === 'High';

            return (
              <div
                key={r.id}
                className="p-4 sm:p-5 hover:bg-slate-50/80 transition flex flex-col md:flex-row md:items-start justify-between gap-4"
              >
                <div className="space-y-2 max-w-4xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-bold text-slate-900 text-xs">
                      {r.id}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {r.serviceLine} · {r.visitType}
                    </span>
                    <span className="text-slate-300">|</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        isCritical
                          ? 'bg-rose-100 text-rose-800 border border-rose-300'
                          : isHigh
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {r.aiRisk.severity} Risk
                    </span>
                    {r.aiRisk.isHallucinationTrap && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800 border border-purple-200">
                        AI Hallucination Trap
                      </span>
                    )}
                    {r.aiRisk.isBiasRelated && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                        Bias Marker
                      </span>
                    )}
                    {r.aiRisk.reviewed ? (
                      <span className="text-[10px] font-medium text-emerald-700 flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Reviewed</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium text-rose-600 font-mono">
                        ● Pending Action
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                    "{r.comment}"
                  </p>

                  {r.aiRisk.riskReason && (
                    <div className="text-xs bg-slate-100 border border-slate-200 rounded p-2 text-slate-700">
                      <strong className="text-slate-900">Clinical Safety Hazard: </strong>
                      {r.aiRisk.riskReason}
                    </div>
                  )}

                  <div className="text-[11px] text-slate-500 flex items-center space-x-3">
                    <span>Persona: {r.patientPersona}</span>
                    <span>·</span>
                    <span>Wait: {r.waitTimeMinutes} mins</span>
                    <span>·</span>
                    <span>Date: {r.date}</span>
                  </div>
                </div>

                <div className="flex md:flex-col items-center gap-2 shrink-0">
                  {!r.aiRisk.reviewed ? (
                    <button
                      onClick={() => onReviewRecord(r.id)}
                      className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-3 py-1.5 rounded transition cursor-pointer flex items-center space-x-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Mark Reviewed</span>
                    </button>
                  ) : (
                    <span className="text-xs text-slate-400 font-medium">Audit Closed</span>
                  )}

                  <button
                    onClick={() => onEscalateRecord(r)}
                    className="text-xs bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-semibold px-3 py-1.5 rounded transition cursor-pointer flex items-center space-x-1"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>Escalate CMO</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
