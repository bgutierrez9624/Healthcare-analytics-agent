import React, { useState } from 'react';
import {
  Scale,
  Languages,
  Accessibility,
  Laptop,
  AlertTriangle,
  HeartCrack,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import { EquityAnalysis } from '../../utils/analytics';
import { FeedbackRecord } from '../../types';

interface Section6Props {
  equity: EquityAnalysis;
  onFilterPersona: (persona: string) => void;
}

export const Section6EquityAccessibility: React.FC<Section6Props> = ({
  equity,
  onFilterPersona,
}) => {
  const [selectedSubTab, setSelectedSubTab] = useState<
    'personas' | 'accessibility' | 'language' | 'digital'
  >('personas');

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
            Section 6 · Health Equity & Access Mandate
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Healthcare Equity, Accessibility & Disparities
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Systemic monitoring of disparate outcomes across language access, physical accessibility, and digital health literacy.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <span className="font-mono px-2 py-1 rounded bg-amber-50 text-amber-900 border border-amber-200 font-semibold">
            Title VI & ADA Compliance Watch
          </span>
        </div>
      </div>

      {/* KPI Overview Cards for 4 Equity Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pillar 1: Persona Disparity */}
        <div
          onClick={() => setSelectedSubTab('personas')}
          className={`p-4 rounded-xl border transition cursor-pointer ${
            selectedSubTab === 'personas'
              ? 'bg-amber-50/50 border-amber-400 shadow-xs'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase text-slate-600">Persona Disparity</span>
            <Scale className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">
            {equity.personaDisparities.length} Personas
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Max disparity gap: <strong className="text-rose-600">1.8 pts</strong>
          </p>
        </div>

        {/* Pillar 2: Physical & Sensory Accessibility */}
        <div
          onClick={() => setSelectedSubTab('accessibility')}
          className={`p-4 rounded-xl border transition cursor-pointer ${
            selectedSubTab === 'accessibility'
              ? 'bg-amber-50/50 border-amber-400 shadow-xs'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase text-slate-600">Accessibility</span>
            <Accessibility className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">
            {equity.accessibilityIssues.count}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {equity.accessibilityIssues.percentage}% of patient cohort
          </p>
        </div>

        {/* Pillar 3: Language Barriers */}
        <div
          onClick={() => setSelectedSubTab('language')}
          className={`p-4 rounded-xl border transition cursor-pointer ${
            selectedSubTab === 'language'
              ? 'bg-amber-50/50 border-amber-400 shadow-xs'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase text-slate-600">Language Barriers</span>
            <Languages className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">
            {equity.languageBarriers.count}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            <strong className="text-rose-600">Critical:</strong> Minor child translation cases
          </p>
        </div>

        {/* Pillar 4: Digital Literacy Challenges */}
        <div
          onClick={() => setSelectedSubTab('digital')}
          className={`p-4 rounded-xl border transition cursor-pointer ${
            selectedSubTab === 'digital'
              ? 'bg-amber-50/50 border-amber-400 shadow-xs'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase text-slate-600">Digital Literacy</span>
            <Laptop className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">
            {equity.digitalLiteracyChallenges.count}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Portal lockouts & 2FA drops
          </p>
        </div>
      </div>

      {/* Detailed Drilldown Container */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        {/* Navigation within Equity Section */}
        <div className="flex border-b border-slate-200 space-x-6 pb-3 mb-5 text-xs font-bold">
          <button
            onClick={() => setSelectedSubTab('personas')}
            className={`pb-2 border-b-2 transition cursor-pointer ${
              selectedSubTab === 'personas'
                ? 'border-amber-600 text-amber-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            1. Differences Across Patient Personas
          </button>
          <button
            onClick={() => setSelectedSubTab('accessibility')}
            className={`pb-2 border-b-2 transition cursor-pointer ${
              selectedSubTab === 'accessibility'
                ? 'border-amber-600 text-amber-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            2. Accessibility Concerns ({equity.accessibilityIssues.count})
          </button>
          <button
            onClick={() => setSelectedSubTab('language')}
            className={`pb-2 border-b-2 transition cursor-pointer ${
              selectedSubTab === 'language'
                ? 'border-amber-600 text-amber-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            3. Language Barriers ({equity.languageBarriers.count})
          </button>
          <button
            onClick={() => setSelectedSubTab('digital')}
            className={`pb-2 border-b-2 transition cursor-pointer ${
              selectedSubTab === 'digital'
                ? 'border-amber-600 text-amber-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            4. Digital Literacy Challenges ({equity.digitalLiteracyChallenges.count})
          </button>
        </div>

        {/* View 1: Differences Across Patient Personas */}
        {selectedSubTab === 'personas' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-600">
              Examining equity outcomes across distinct patient demographics reveals severe disparities. Patients with language preferences other than English and tech-novice geriatric patients experience statistically significant drops in satisfaction and follow-up compliance.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold text-[11px]">
                    <th className="py-3 px-4">Demographic Persona</th>
                    <th className="py-3 px-4 text-center">Volume</th>
                    <th className="py-3 px-4">Avg Satisfaction</th>
                    <th className="py-3 px-4">Variance vs System Avg</th>
                    <th className="py-3 px-4 text-center">Complaint Rate</th>
                    <th className="py-3 px-4 text-center">Follow-up Adherence</th>
                    <th className="py-3 px-4 text-right">Filter</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {equity.personaDisparities.map((item) => (
                    <tr key={item.persona} className="hover:bg-slate-50 transition">
                      <td className="py-3 px-4 font-bold text-slate-900">{item.persona}</td>
                      <td className="py-3 px-4 text-center font-mono">{item.count}</td>
                      <td className="py-3 px-4">
                        <span className="font-extrabold text-slate-900">
                          {item.avgSatisfaction} / 5.0
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`font-mono font-semibold ${
                            item.satisfactionDeltaVsSystem >= 0
                              ? 'text-emerald-700'
                              : 'text-rose-700'
                          }`}
                        >
                          {item.satisfactionDeltaVsSystem >= 0
                            ? `+${item.satisfactionDeltaVsSystem}`
                            : item.satisfactionDeltaVsSystem}{' '}
                          pts
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`font-semibold ${
                            item.complaintRate > 40 ? 'text-rose-600' : 'text-slate-700'
                          }`}
                        >
                          {item.complaintRate}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`font-semibold ${
                            item.followUpCompliance < 50
                              ? 'text-rose-600'
                              : item.followUpCompliance < 70
                              ? 'text-amber-600'
                              : 'text-emerald-700'
                          }`}
                        >
                          {item.followUpCompliance}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => onFilterPersona(item.persona)}
                          className="text-teal-600 hover:text-teal-800 font-semibold cursor-pointer"
                        >
                          Filter
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* View 2: Accessibility Concerns */}
        {selectedSubTab === 'accessibility' && (
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900 flex items-start space-x-2">
              <Accessibility className="w-4 h-4 text-blue-700 mt-0.5 shrink-0" />
              <div>
                <strong>Physical & ADA Compliance Audit:</strong> Identified recurring architectural barriers including broken handicap automatic door buttons at outpatient entrances, fixed-height examination tables requiring medical assistants to hoist patients with mobility impairments, and sub-10pt unreadable discharge print.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {equity.accessibilityIssues.cases.map((r) => (
                <div
                  key={r.id}
                  className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/60 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-800">{r.id}</span>
                    <span className="text-slate-500">{r.serviceLine}</span>
                    <span className="text-blue-700 font-semibold">Accessibility Flag</span>
                  </div>
                  <p className="text-slate-700 italic">"{r.comment}"</p>
                  {r.equity.notes && (
                    <div className="text-[11px] text-blue-800 bg-blue-100/60 p-2 rounded">
                      <strong>Clinical Context: </strong> {r.equity.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View 3: Language Barriers */}
        {selectedSubTab === 'language' && (
          <div className="space-y-4">
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-900 flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 text-rose-700 mt-0.5 shrink-0" />
              <div>
                <strong>Critical Title VI / Section 1557 Regulatory Hazard:</strong> Patient comments document minor children being forced to translate high-acuity chest pain symptoms, lack of translated pre-op diabetic fasting guides resulting in acute hypoglycemia (42 mg/dL), and staff advising non-English patients to use uncertified commercial phone apps.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {equity.languageBarriers.cases.map((r) => (
                <div
                  key={r.id}
                  className="p-3.5 rounded-lg border border-rose-200 bg-rose-50/20 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-800">{r.id}</span>
                    <span className="text-slate-500">{r.serviceLine}</span>
                    <span className="text-rose-700 font-bold">Language Access Gap</span>
                  </div>
                  <p className="text-slate-800 italic">"{r.comment}"</p>
                  {r.equity.notes && (
                    <div className="text-[11px] text-rose-800 bg-rose-100/80 p-2 rounded">
                      <strong>Risk Note: </strong> {r.equity.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View 4: Digital Literacy Challenges */}
        {selectedSubTab === 'digital' && (
          <div className="space-y-4">
            <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-xs text-indigo-900 flex items-start space-x-2">
              <Laptop className="w-4 h-4 text-indigo-700 mt-0.5 shrink-0" />
              <div>
                <strong>Digital Divide & Portal Equity:</strong> Transitioning vitals reporting, lab disclosures, and telehealth exclusively to smartphones and complex web portals disenfranchises elderly, flip-phone users, and cognitive care patients, triggering wrongful no-show penalties and cancelled appointments.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {equity.digitalLiteracyChallenges.cases.map((r) => (
                <div
                  key={r.id}
                  className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/60 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-800">{r.id}</span>
                    <span className="text-slate-500">{r.serviceLine}</span>
                    <span className="text-indigo-700 font-semibold">Digital Literacy</span>
                  </div>
                  <p className="text-slate-700 italic">"{r.comment}"</p>
                  {r.equity.notes && (
                    <div className="text-[11px] text-indigo-800 bg-indigo-100/60 p-2 rounded">
                      <strong>Barrier: </strong> {r.equity.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
