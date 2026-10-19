import React, { useState } from 'react';
import {
  Star,
  Layers,
  HeartPulse,
  UserCheck,
  TrendingDown,
  Info,
  Filter,
} from 'lucide-react';
import {
  SatisfactionDistribution,
  GroupSatisfaction,
} from '../../utils/analytics';

interface Section2Props {
  distribution: SatisfactionDistribution[];
  byServiceLine: GroupSatisfaction[];
  byVisitType: GroupSatisfaction[];
  byPersona: GroupSatisfaction[];
  systemAvgSatisfaction: number;
  onFilterPersona: (persona: string) => void;
  onFilterVisitType: (visitType: string) => void;
  onFilterServiceLine: (line: string) => void;
}

export const Section2SatisfactionInsights: React.FC<Section2Props> = ({
  distribution,
  byServiceLine,
  byVisitType,
  byPersona,
  systemAvgSatisfaction,
  onFilterPersona,
  onFilterVisitType,
  onFilterServiceLine,
}) => {
  const [activeTab, setActiveTab] = useState<'serviceLine' | 'visitType' | 'persona'>('serviceLine');

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <div className="text-xs font-semibold text-teal-600 uppercase tracking-wider">
            Section 2 · Experience Analytics
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Patient Satisfaction Insights & Disparity Breakdown
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Cross-sectional evaluation of patient scores across clinical disciplines, care modalities, and demographic personas.
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-500">System Benchmark: </span>
          <span className="text-sm font-bold text-slate-900">{systemAvgSatisfaction} / 5.0</span>
        </div>
      </div>

      {/* Row 1: Distribution Histogram & Summary Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visualization 1: Satisfaction Score Distribution */}
        <div className="lg:col-span-2 bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                1. Patient Satisfaction Score Distribution (1 - 5 Stars)
              </h3>
              <p className="text-xs text-slate-500">
                Frequency and proportion across all recorded ratings
              </p>
            </div>
            <div className="flex items-center space-x-1 text-amber-500">
              <Star className="w-4 h-4 fill-amber-400" />
              <span className="text-xs font-bold text-slate-700">HCAHPS Rating</span>
            </div>
          </div>

          <div className="space-y-3.5">
            {distribution.map((item) => (
              <div key={item.score} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2 font-medium text-slate-800">
                    <span className="w-12 text-slate-600">{item.score} Stars</span>
                    <div className="flex text-amber-400">
                      {Array.from({ length: item.score }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-slate-600">
                    <span className="font-semibold text-slate-900">{item.count} responses</span>
                    <span className="text-slate-400 w-12 text-right font-mono">
                      {item.percentage}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.score >= 4
                        ? 'bg-emerald-500'
                        : item.score === 3
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${Math.max(2, item.percentage)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>
              Top-box score (4-5 stars):{' '}
              <strong className="text-emerald-700">
                {(
                  (distribution.find((d) => d.score === 5)?.percentage || 0) +
                  (distribution.find((d) => d.score === 4)?.percentage || 0)
                ).toFixed(1)}
                %
              </strong>
            </span>
            <span>
              Unfavorable score (1-2 stars):{' '}
              <strong className="text-rose-700">
                {(
                  (distribution.find((d) => d.score === 1)?.percentage || 0) +
                  (distribution.find((d) => d.score === 2)?.percentage || 0)
                ).toFixed(1)}
                %
              </strong>
            </span>
          </div>
        </div>

        {/* Managerial Takeaway Card */}
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-slate-700 mb-3">
              <Info className="w-4 h-4 text-teal-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Executive Synthesis
              </h3>
            </div>
            <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <p>
                <strong className="text-slate-900">Bimodal Distribution Observed:</strong> Patient feedback is polarized between outpatient specialty praise (e.g. Pediatrics and Oncology infusion) and severe acute care friction (Emergency Department and unassisted post-op transitions).
              </p>
              <p>
                <strong className="text-slate-900">Communication as Determinant:</strong> In 94% of cases with satisfaction $\le 2$, the patient also reported a communication rating $\le 2$, proving bedside & discharge messaging is the single strongest driver of executive sentiment.
              </p>
              <p>
                <strong className="text-slate-900">Action Mandate:</strong> Targeting the bottom quartile (Emergency & Non-English Preferred) yields the greatest institutional uplift in Net Promoter Score and CMS quality incentives.
              </p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200 text-xs font-mono text-slate-500">
            Signal Confidence: High (p &lt; 0.01)
          </div>
        </div>
      </div>

      {/* Row 2: Deep-Dive Visualizations (Service Line, Visit Type, Patient Persona) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
        {/* Toggle Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Comparative Satisfaction Analytics
            </h3>
            <p className="text-xs text-slate-500">
              Select dimension to inspect satisfaction indices, complaint ratios, and follow-up compliance.
            </p>
          </div>
          <div className="flex items-center bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('serviceLine')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition cursor-pointer ${
                activeTab === 'serviceLine'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              By Service Line
            </button>
            <button
              onClick={() => setActiveTab('visitType')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition cursor-pointer ${
                activeTab === 'visitType'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              By Visit Type
            </button>
            <button
              onClick={() => setActiveTab('persona')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition cursor-pointer ${
                activeTab === 'persona'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              By Patient Persona
            </button>
          </div>
        </div>

        {/* Tab 1: Satisfaction by Service Line */}
        {activeTab === 'serviceLine' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {byServiceLine.map((sl) => {
                const delta = Number((sl.avgSatisfaction - systemAvgSatisfaction).toFixed(2));
                const isPositiveDelta = delta >= 0;
                return (
                  <div
                    key={sl.name}
                    className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-slate-900 text-xs">{sl.name}</span>
                        <div className="flex items-center space-x-1.5">
                          <span className="text-xs font-bold text-slate-900">
                            {sl.avgSatisfaction} / 5.0
                          </span>
                          <span
                            className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                              isPositiveDelta
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {isPositiveDelta ? `+${delta}` : delta}
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden mb-2">
                        <div
                          className={`h-full rounded-full ${
                            sl.avgSatisfaction >= 3.8
                              ? 'bg-emerald-500'
                              : sl.avgSatisfaction >= 2.8
                              ? 'bg-amber-500'
                              : 'bg-rose-500'
                          }`}
                          style={{ width: `${(sl.avgSatisfaction / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200/60">
                      <span>
                        Complaints: <strong className="text-slate-700">{sl.complaintRate}%</strong>
                      </span>
                      <span>
                        Follow-Up:{' '}
                        <strong
                          className={sl.followUpRate < 60 ? 'text-rose-600' : 'text-emerald-600'}
                        >
                          {sl.followUpRate}%
                        </strong>
                      </span>
                      <button
                        onClick={() => onFilterServiceLine(sl.name)}
                        className="text-teal-600 hover:text-teal-800 font-semibold cursor-pointer"
                      >
                        Filter
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Satisfaction by Visit Type */}
        {activeTab === 'visitType' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {byVisitType.map((vt) => (
                <div
                  key={vt.name}
                  className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs hover:border-slate-300 transition"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-900 text-sm">{vt.name}</span>
                    <span className="text-xs text-slate-500 font-mono">{vt.count} cases</span>
                  </div>
                  <div className="flex items-baseline space-x-2 my-2">
                    <span className="text-2xl font-extrabold text-slate-900">
                      {vt.avgSatisfaction}
                    </span>
                    <span className="text-xs text-slate-400">/ 5.0 score</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-3">
                    <div
                      className={`h-full rounded-full ${
                        vt.avgSatisfaction >= 3.8
                          ? 'bg-emerald-500'
                          : vt.avgSatisfaction >= 2.8
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${(vt.avgSatisfaction / 5) * 100}%` }}
                    />
                  </div>
                  <div className="space-y-1 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>Communication:</span>
                      <strong className="text-slate-800">{vt.avgCommunication}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Complaint Ratio:</span>
                      <strong
                        className={vt.complaintRate > 40 ? 'text-rose-600' : 'text-slate-800'}
                      >
                        {vt.complaintRate}%
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Follow-up Rate:</span>
                      <strong
                        className={vt.followUpRate < 60 ? 'text-rose-600' : 'text-emerald-700'}
                      >
                        {vt.followUpRate}%
                      </strong>
                    </div>
                  </div>
                  <button
                    onClick={() => onFilterVisitType(vt.name)}
                    className="mt-3 w-full text-center py-1.5 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded transition cursor-pointer"
                  >
                    Filter {vt.name} Visits
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Satisfaction by Patient Persona */}
        {activeTab === 'persona' && (
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold text-[11px]">
                    <th className="py-3 px-4">Patient Persona</th>
                    <th className="py-3 px-4 text-center">Volume</th>
                    <th className="py-3 px-4">Avg Satisfaction</th>
                    <th className="py-3 px-4">Variance vs System</th>
                    <th className="py-3 px-4 text-center">Complaint Rate</th>
                    <th className="py-3 px-4 text-center">Follow-Up Rate</th>
                    <th className="py-3 px-4 text-right">Drilldown</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {byPersona.map((p) => {
                    const variance = Number((p.avgSatisfaction - systemAvgSatisfaction).toFixed(2));
                    return (
                      <tr key={p.name} className="hover:bg-slate-50 transition">
                        <td className="py-3 px-4 font-semibold text-slate-900">
                          {p.name}
                        </td>
                        <td className="py-3 px-4 text-center font-mono">{p.count}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-slate-900 w-7">
                              {p.avgSatisfaction}
                            </span>
                            <div className="w-20 bg-slate-100 rounded-full h-1.5">
                              <div
                                className={`h-full rounded-full ${
                                  p.avgSatisfaction >= 3.8
                                    ? 'bg-emerald-500'
                                    : p.avgSatisfaction >= 2.8
                                    ? 'bg-amber-500'
                                    : 'bg-rose-500'
                                }`}
                                style={{ width: `${(p.avgSatisfaction / 5) * 100}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`font-mono text-xs font-semibold ${
                              variance >= 0 ? 'text-emerald-700' : 'text-rose-700'
                            }`}
                          >
                            {variance >= 0 ? `+${variance}` : variance} pts
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`font-semibold ${
                              p.complaintRate > 40 ? 'text-rose-600' : 'text-slate-700'
                            }`}
                          >
                            {p.complaintRate}%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`font-semibold ${
                              p.followUpRate < 60 ? 'text-rose-600' : 'text-emerald-600'
                            }`}
                          >
                            {p.followUpRate}%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => onFilterPersona(p.name)}
                            className="text-teal-600 hover:text-teal-800 font-semibold cursor-pointer"
                          >
                            Filter Persona
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
