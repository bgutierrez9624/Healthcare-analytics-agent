import React, { useState } from 'react';
import {
  AlertTriangle,
  Clock,
  Smartphone,
  CalendarX,
  MessageSquareOff,
  Flame,
  ChevronRight,
  TrendingDown,
  Info,
} from 'lucide-react';
import { OrganizationalProblemsSummary } from '../../utils/analytics';
import { FeedbackRecord } from '../../types';

interface Section4Props {
  problems: OrganizationalProblemsSummary;
  allRecords: FeedbackRecord[];
  onFilterServiceLine: (line: string) => void;
}

export const Section4OrganizationalProblems: React.FC<Section4Props> = ({
  problems,
  allRecords,
  onFilterServiceLine,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'communication' | 'technology' | 'scheduling' | 'wait'
  >('all');

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <div className="text-xs font-semibold text-rose-600 uppercase tracking-wider">
            Section 4 · Root Cause Diagnostics
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Hidden Organizational Problems & System Bottlenecks
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Empirical detection of non-obvious operational friction points across throughput, digital channels, and patient transitions.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
          <span className="font-semibold text-rose-700">Operational Risk Triggers Active</span>
        </div>
      </div>

      {/* Subsection 1: Service Lines with Unusually High Complaint Rates */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Flame className="w-5 h-5 text-rose-600" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                1. Service Lines with Unusually High Complaint Rates
              </h3>
              <p className="text-xs text-slate-500">
                Service lines exceeding the institutional complaint benchmark (Hospital Avg:{' '}
                {problems.highComplaintServiceLines[0]?.benchmarkRate || 22}%)
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-rose-700 bg-rose-50 px-2.5 py-1 rounded border border-rose-200">
            Anomaly Threshold &gt; 1.0x Baseline
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.highComplaintServiceLines.map((item) => (
            <div
              key={item.serviceLine}
              className="p-4 rounded-xl border border-rose-200 bg-rose-50/20 hover:bg-rose-50/40 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-900 text-sm">
                    {item.serviceLine}
                  </span>
                  <span className="text-xs font-mono font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                    {item.varianceRatio}x Baseline
                  </span>
                </div>
                <div className="flex items-baseline space-x-2 my-2">
                  <span className="text-2xl font-extrabold text-rose-700">
                    {item.complaintRate}%
                  </span>
                  <span className="text-xs text-slate-500">complaint frequency</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden mb-3">
                  <div
                    className="h-full bg-rose-600 rounded-full"
                    style={{ width: `${Math.min(100, item.complaintRate * 1.5)}%` }}
                  />
                </div>
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="font-semibold text-slate-700">Top Root Causes:</div>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                    {item.primaryIssues.map((issue, idx) => (
                      <li key={idx} className="truncate">
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => onFilterServiceLine(item.serviceLine)}
                className="mt-4 w-full py-1.5 text-xs font-semibold text-rose-700 bg-rose-100/80 hover:bg-rose-200 rounded transition cursor-pointer"
              >
                Inspect {item.serviceLine} Feedback →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Subsections 2 & 3: Communication Bottlenecks & Technology-Related Issues */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subsection 2: Communication Bottlenecks */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <MessageSquareOff className="w-5 h-5 text-amber-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  2. Communication Bottlenecks
                </h3>
              </div>
              <span className="text-xs font-mono text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-semibold">
                {problems.communicationBottlenecks.count} Incidents (
                {problems.communicationBottlenecks.percentage}%)
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Breakdown in provider-patient comprehension, handoffs, and transition instructions.
            </p>

            <div className="space-y-3">
              {problems.communicationBottlenecks.subtypes.map((sub, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg border border-slate-200 bg-slate-50/60 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>{sub.name}</span>
                    <span className="font-mono text-amber-700">{sub.count} mentions</span>
                  </div>
                  <p className="text-slate-600 italic">"{sub.example}"</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span>Primary driver of preventable readmissions</span>
            <span className="font-semibold text-slate-700">Root Cause: Nursing Overload</span>
          </div>
        </div>

        {/* Subsection 3: Technology-Related Issues */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Smartphone className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  3. Technology & Patient Portal Friction
                </h3>
              </div>
              <span className="text-xs font-mono text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-semibold">
                {problems.technologyIssues.count} Incidents (
                {problems.technologyIssues.percentage}%)
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Digital portal lockouts, unfiltered Cures Act lab releases, and telehealth audio drops.
            </p>

            <div className="space-y-3">
              {problems.technologyIssues.subtypes.map((sub, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg border border-slate-200 bg-slate-50/60 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>{sub.name}</span>
                    <span className="font-mono text-blue-700">{sub.count} mentions</span>
                  </div>
                  <p className="text-slate-600 italic">"{sub.example}"</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span>Severe impact on geriatric & tech-novice cohorts</span>
            <span className="font-semibold text-slate-700">IT Remediation Required</span>
          </div>
        </div>
      </div>

      {/* Subsections 4 & 5: Scheduling Issues & Wait-Time Complaints */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subsection 4: Scheduling-Related Issues */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <CalendarX className="w-5 h-5 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  4. Scheduling & Referral Bottlenecks
                </h3>
              </div>
              <span className="text-xs font-mono text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 font-semibold">
                {problems.schedulingIssues.count} Incidents (
                {problems.schedulingIssues.percentage}%)
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Multi-month diagnostic lead times, rigid infusion hours, and broken SMS confirmation links.
            </p>

            <div className="space-y-3">
              {problems.schedulingIssues.subtypes.map((sub, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg border border-slate-200 bg-slate-50/60 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>{sub.name}</span>
                    <span className="font-mono text-indigo-700">{sub.count} mentions</span>
                  </div>
                  <p className="text-slate-600 italic">"{sub.example}"</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span>Leads to clinical deterioration while waiting</span>
            <span className="font-semibold text-indigo-700">Capacity Orchestration Opportunity</span>
          </div>
        </div>

        {/* Subsection 5: Wait-Time Complaints & Distribution */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-rose-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  5. Wait-Time Analysis & Dwell Curve
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-semibold">
                Median Wait: {problems.waitTimeAnalysis.medianWait} mins
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Patient wait time distribution buckets and corresponding average satisfaction score.
            </p>

            <div className="space-y-2.5">
              {problems.waitTimeAnalysis.waitBuckets.map((bucket) => {
                const totalInSample = allRecords.length || 1;
                const pct = ((bucket.count / totalInSample) * 100).toFixed(0);
                return (
                  <div key={bucket.range} className="space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800">{bucket.range}</span>
                      <div className="flex items-center space-x-3">
                        <span className="text-slate-500">{bucket.count} patients ({pct}%)</span>
                        <span
                          className={`font-bold ${
                            bucket.avgSat >= 3.8
                              ? 'text-emerald-700'
                              : bucket.avgSat <= 2.2
                              ? 'text-rose-700'
                              : 'text-amber-700'
                          }`}
                        >
                          ★ {bucket.avgSat} / 5
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          bucket.avgSat >= 3.8
                            ? 'bg-emerald-500'
                            : bucket.avgSat <= 2.2
                            ? 'bg-rose-500'
                            : 'bg-amber-500'
                        }`}
                        style={{ width: `${Math.max(4, Number(pct))}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 flex items-center justify-between">
            <span className="text-rose-600 font-semibold">
              {problems.waitTimeAnalysis.extremeWaitCasesCount} cases exceeded 120 minutes
            </span>
            <span className="text-slate-400">Direct inverse correlation to NPS</span>
          </div>
        </div>
      </div>
    </div>
  );
};
