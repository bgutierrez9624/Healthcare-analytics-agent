import React, { useState } from 'react';
import {
  Compass,
  CheckCircle2,
  Clock,
  Zap,
  Target,
  FileText,
  User,
  ArrowRight,
  Printer,
  Copy,
  Check,
} from 'lucide-react';
import {
  EXECUTIVE_TOP_5_PRIORITIES,
  QUICK_WINS_3_MONTHS,
  LONG_TERM_AI_ROADMAP_6_12_MONTHS,
} from '../../data/strategicRecommendations';
import { ExecutivePriority } from '../../types';

interface Section9Props {
  onOpenLiveAgentWithPrompt: (prompt: string) => void;
}

export const Section9ExecutiveRecommendations: React.FC<Section9Props> = ({
  onOpenLiveAgentWithPrompt,
}) => {
  const [priorities, setPriorities] = useState<ExecutivePriority[]>(EXECUTIVE_TOP_5_PRIORITIES);
  const [copiedMemo, setCopiedMemo] = useState(false);

  const toggleStatus = (id: string) => {
    setPriorities((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextStatus =
            p.status === 'Planning'
              ? 'In Progress'
              : p.status === 'In Progress'
              ? 'On Track'
              : p.status === 'On Track'
              ? 'Under Review'
              : 'Planning';
          return { ...p, status: nextStatus };
        }
        return p;
      })
    );
  };

  const copyExecutiveMemo = () => {
    const memoText = `EXECUTIVE MEMORANDUM — HOSPITAL QUALITY & STRATEGY COMMITTEE
SUBJECT: Patient Feedback Intelligence & AI Modernization Roadmap

TOP 5 ORGANIZATIONAL PRIORITIES:
1. ${priorities[0].title}
   - Owner: ${priorities[0].owner} | Timeline: ${priorities[0].timeline}
   - Target Metric: ${priorities[0].targetMetric}
2. ${priorities[1].title}
   - Owner: ${priorities[1].owner} | Timeline: ${priorities[1].timeline}
   - Target Metric: ${priorities[1].targetMetric}
3. ${priorities[2].title}
   - Owner: ${priorities[2].owner} | Timeline: ${priorities[2].timeline}
   - Target Metric: ${priorities[2].targetMetric}
4. ${priorities[3].title}
   - Owner: ${priorities[3].owner} | Timeline: ${priorities[3].timeline}
   - Target Metric: ${priorities[3].targetMetric}
5. ${priorities[4].title}
   - Owner: ${priorities[4].owner} | Timeline: ${priorities[4].timeline}
   - Target Metric: ${priorities[4].targetMetric}

QUICK WINS (WITHIN 3 MONTHS):
- Mandate 14pt minimum font and dual-language discharge packets
- Deploy dedicated iPad triage translation stands in ED
- Deactivate faulty SMS auto-cancellation rule
- Configure EHR Friday night malignant lab release delay
- Repair entrance handicap buttons & wheelchair access

LONG-TERM AI ROADMAP (6 - 12 MONTHS):
- Autonomous Ambulatory Referral & Capacity Orchestrator (Months 6-8)
- AI Discharge Companion & Multilingual Care Navigator (Months 8-10)
- Enterprise Clinical AI Safety & Hallucination Sentinel (Months 10-12)`;

    navigator.clipboard.writeText(memoText);
    setCopiedMemo(true);
    setTimeout(() => setCopiedMemo(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <div className="text-xs font-semibold text-teal-600 uppercase tracking-wider">
            Section 9 · Executive Governance
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Executive Recommendations & Action Roadmap
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Operational mandates, 90-day quick wins, and multi-quarter AI transformation roadmap for board leadership.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={copyExecutiveMemo}
            className="text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition cursor-pointer"
          >
            {copiedMemo ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Memo Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copy Board Memo</span>
              </>
            )}
          </button>
          <button
            onClick={() =>
              onOpenLiveAgentWithPrompt(
                'Generate a comprehensive Board of Directors 1-page briefing memo summarizing our top 5 priorities, quick wins, and AI agent roadmap based on the current feedback dataset.'
              )
            }
            className="text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-teal-400" />
            <span>Generate Full Board Brief</span>
          </button>
        </div>
      </div>

      {/* Part 1: Top 5 Organizational Priorities (Required by prompt) */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-teal-600" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                1. Top 5 Organizational Priorities
              </h3>
              <p className="text-xs text-slate-500">
                Ranked executive mandates based on empirical clinical safety risk and volume impact.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-slate-400">Click status to toggle</span>
        </div>

        <div className="space-y-4">
          {priorities.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-3">
                  <span className="w-7 h-7 rounded-lg bg-slate-900 text-teal-400 font-extrabold text-xs flex items-center justify-center font-mono">
                    #{item.rank}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                </div>

                <div className="flex items-center space-x-3 text-xs">
                  <span className="text-slate-500 font-medium flex items-center space-x-1">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.owner}</span>
                  </span>
                  <button
                    onClick={() => toggleStatus(item.id)}
                    className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold transition cursor-pointer ${
                      item.status === 'On Track'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.status === 'In Progress'
                        ? 'bg-blue-100 text-blue-800'
                        : item.status === 'Planning'
                        ? 'bg-slate-200 text-slate-700'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.status}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                  <div className="text-[10px] uppercase font-bold text-slate-500 mb-0.5">
                    Target Metric
                  </div>
                  <div className="font-semibold text-slate-800">{item.targetMetric}</div>
                </div>

                <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                  <div className="text-[10px] uppercase font-bold text-slate-500 mb-0.5">
                    Implementation Timeline
                  </div>
                  <div className="font-semibold text-teal-700">{item.timeline}</div>
                </div>

                <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                  <div className="text-[10px] uppercase font-bold text-slate-500 mb-0.5">
                    Data Rationale
                  </div>
                  <div className="text-slate-600 line-clamp-2">{item.rationale}</div>
                </div>
              </div>

              <div className="text-xs text-slate-700 bg-white p-3 rounded-lg border border-slate-200">
                <strong className="text-slate-900">Action Plan: </strong>
                {item.actionSummary}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Part 2: Quick Wins within 3 Months & Part 3: Long-Term AI Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Wins (within 3 months) */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Zap className="w-5 h-5 text-amber-500" />
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  2. Quick Wins (Within 3 Months)
                </h3>
                <p className="text-xs text-slate-500">
                  Immediate, low-cost interventions with rapid return on patient trust and safety.
                </p>
              </div>
            </div>

            <div className="space-y-3 mt-4">
              {QUICK_WINS_3_MONTHS.map((qw, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg border border-slate-200 bg-slate-50/60 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span className="flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{qw.title}</span>
                    </span>
                    <span className="font-mono text-teal-700 shrink-0">{qw.timeframe}</span>
                  </div>
                  <p className="text-slate-600">{qw.impact}</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-200/60">
                    <span>Dept: {qw.department}</span>
                    <span className="font-semibold text-slate-700">{qw.cost}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
            Total Quick-Win Implementation Budget: &lt; $50,000
          </div>
        </div>

        {/* Long-Term AI Opportunities (6-12 Months) */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Compass className="w-5 h-5 text-indigo-600" />
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  3. Long-Term AI Roadmap (6 – 12 Months)
                </h3>
                <p className="text-xs text-slate-500">
                  Multi-phase health system transformation powered by autonomous AI agents.
                </p>
              </div>
            </div>

            <div className="space-y-3 mt-4">
              {LONG_TERM_AI_ROADMAP_6_12_MONTHS.map((phase, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/60 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-indigo-900 font-mono text-[11px]">
                      {phase.phase}
                    </span>
                    <span className="font-mono font-bold text-emerald-700">
                      ROI: {phase.projectedRoi}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs">{phase.title}</h4>
                  <p className="text-slate-600 leading-relaxed">{phase.description}</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-200/60">
                    <span>Est. Investment: {phase.estimatedBudget}</span>
                    <span className="text-indigo-600 font-semibold">Governance: Board Oversight</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
            Projected Enterprise Impact: $5.8M+ annual savings & 1,400+ RN hours reclaimed
          </div>
        </div>
      </div>
    </div>
  );
};
