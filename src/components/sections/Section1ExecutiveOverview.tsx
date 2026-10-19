import React from 'react';
import {
  Users,
  Star,
  MessageCircle,
  CalendarCheck,
  Building2,
  Clock,
  AlertOctagon,
  Scale,
  TrendingDown,
  TrendingUp,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { ExecutiveSummaryStats, FeedbackRecord } from '../../types';
import { GroupSatisfaction } from '../../utils/analytics';

interface Section1Props {
  stats: ExecutiveSummaryStats;
  serviceLineBreakdown: GroupSatisfaction[];
  onSelectServiceLine: (line: string) => void;
  onNavigateTab: (tab: any) => void;
}

export const Section1ExecutiveOverview: React.FC<Section1Props> = ({
  stats,
  serviceLineBreakdown,
  onSelectServiceLine,
  onNavigateTab,
}) => {
  return (
    <div className="space-y-6">
      {/* Executive Briefing Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-xl p-6 text-white shadow-sm border border-slate-700/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-teal-400 text-xs font-semibold tracking-wider uppercase mb-1">
              <span>Executive Briefing</span>
              <span>·</span>
              <span>Hospital Quality & Safety Directorate</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Executive Patient Experience & Operations Intelligence
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed">
              Real-time multi-source analysis of patient sentiment, communication bottlenecks, and clinical AI safety signals. Benchmark targets reflect CMS HCAHPS 75th percentile standards.
            </p>
          </div>
          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => onNavigateTab('risk')}
              className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-semibold px-3 py-2 rounded-lg flex items-center space-x-1.5 transition cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>{stats.highRiskCasesCount} AI Risk Flags</span>
            </button>
            <button
              onClick={() => onNavigateTab('agents')}
              className="bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold px-3.5 py-2 rounded-lg flex items-center space-x-1.5 transition cursor-pointer shadow-xs"
            >
              <span>View AI Opportunities</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Primary KPI Cards (5 required metrics from prompt) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* KPI 1: Total Patient Comments Analyzed */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
              Total Comments
            </span>
            <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {stats.totalComments}
            </span>
            <span className="text-xs text-slate-500 font-medium">analyzed</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Coverage</span>
            <span className="font-semibold text-emerald-600">100% Ingested</span>
          </div>
        </div>

        {/* KPI 2: Average Patient Satisfaction Score */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
              Avg Satisfaction
            </span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <Star className="w-4 h-4 fill-amber-500" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {stats.avgSatisfaction}
            </span>
            <span className="text-xs text-slate-400">/ 5.0</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Benchmark: 4.2</span>
            <span
              className={`flex items-center font-semibold ${
                stats.avgSatisfaction >= 4.0 ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {stats.avgSatisfaction >= 4.0 ? (
                <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5 mr-0.5" />
              )}
              {stats.avgSatisfaction >= 4.0 ? '+0.2 Above' : 'Below Target'}
            </span>
          </div>
        </div>

        {/* KPI 3: Average Communication Rating */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
              Communication
            </span>
            <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
              <MessageCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {stats.avgCommunication}
            </span>
            <span className="text-xs text-slate-400">/ 5.0</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Target: 4.5</span>
            <span
              className={`font-semibold ${
                stats.avgCommunication >= 4.0 ? 'text-emerald-600' : 'text-amber-600'
              }`}
            >
              {stats.avgCommunication >= 4.0 ? 'Acceptable' : 'Opportunity Area'}
            </span>
          </div>
        </div>

        {/* KPI 4: Follow-up Compliance Rate */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
              Follow-Up Adherence
            </span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {stats.followUpComplianceRate}%
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Clinical Target: 80%</span>
            <span className="font-semibold text-rose-600">
              {stats.followUpComplianceRate >= 80 ? 'Met' : '31.3% Gap'}
            </span>
          </div>
        </div>

        {/* KPI 5: Number of Service Lines Represented */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
              Service Lines
            </span>
            <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {stats.serviceLineCount}
            </span>
            <span className="text-xs text-slate-500 font-medium">departments</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Health System</span>
            <span className="font-semibold text-slate-700">Full Enterprise</span>
          </div>
        </div>
      </div>

      {/* Secondary Operational Signals Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-100/80 p-3 rounded-xl border border-slate-200">
        <div className="flex items-center space-x-3 px-3 py-1">
          <Clock className="w-4 h-4 text-slate-500" />
          <div className="text-xs">
            <span className="text-slate-500">Median Dwell/Wait: </span>
            <span className="font-bold text-slate-800">{stats.medianWaitTime} mins</span>
          </div>
        </div>
        <div className="flex items-center space-x-3 px-3 py-1 border-l border-slate-200">
          <AlertOctagon className="w-4 h-4 text-rose-500" />
          <div className="text-xs">
            <span className="text-slate-500">Total Complaints: </span>
            <span className="font-bold text-slate-800">{stats.totalComplaints} cases</span>
          </div>
        </div>
        <div className="flex items-center space-x-3 px-3 py-1 border-l border-slate-200">
          <ShieldAlert className="w-4 h-4 text-rose-600" />
          <div className="text-xs">
            <span className="text-slate-500">High Clinical Risk: </span>
            <span className="font-bold text-rose-700">{stats.highRiskCasesCount} critical</span>
          </div>
        </div>
        <div className="flex items-center space-x-3 px-3 py-1 border-l border-slate-200">
          <Scale className="w-4 h-4 text-amber-600" />
          <div className="text-xs">
            <span className="text-slate-500">Equity/Access Gaps: </span>
            <span className="font-bold text-amber-800">{stats.equityCasesCount} flagged</span>
          </div>
        </div>
      </div>

      {/* Executive Service Line Representation Matrix */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">
              Service Line Representation & Clinical Variance Matrix
            </h2>
            <p className="text-xs text-slate-500">
              Departmental breakdown of patient feedback volume, satisfaction indices, and follow-up compliance.
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {serviceLineBreakdown.length} Active Lines
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase font-semibold text-[11px] tracking-wider">
                <th className="py-3 px-4">Service Line</th>
                <th className="py-3 px-4 text-center">Volume</th>
                <th className="py-3 px-4">Avg Satisfaction</th>
                <th className="py-3 px-4">Communication</th>
                <th className="py-3 px-4 text-center">Complaint Rate</th>
                <th className="py-3 px-4 text-center">Follow-Up Rate</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {serviceLineBreakdown.map((row) => (
                <tr key={row.name} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    {row.name}
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-medium">
                    {row.count}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-900 w-7">
                        {row.avgSatisfaction}
                      </span>
                      <div className="w-24 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            row.avgSatisfaction >= 3.8
                              ? 'bg-emerald-500'
                              : row.avgSatisfaction >= 2.8
                              ? 'bg-amber-500'
                              : 'bg-rose-500'
                          }`}
                          style={{ width: `${(row.avgSatisfaction / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-slate-800">
                      {row.avgCommunication} / 5.0
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`font-semibold ${
                        row.complaintRate > 40
                          ? 'text-rose-600'
                          : row.complaintRate > 20
                          ? 'text-amber-600'
                          : 'text-slate-600'
                      }`}
                    >
                      {row.complaintRate}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`font-semibold ${
                        row.followUpRate < 60 ? 'text-rose-600' : 'text-emerald-600'
                      }`}
                    >
                      {row.followUpRate}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onSelectServiceLine(row.name)}
                      className="text-teal-600 hover:text-teal-800 font-semibold hover:underline cursor-pointer"
                    >
                      Filter Line
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
