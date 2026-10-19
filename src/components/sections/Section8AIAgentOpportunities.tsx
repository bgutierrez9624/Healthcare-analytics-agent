import React, { useState } from 'react';
import {
  Bot,
  Sparkles,
  Zap,
  TrendingUp,
  DollarSign,
  Clock,
  HeartPulse,
  Sliders,
  CheckCircle2,
  Building,
  Users,
} from 'lucide-react';
import { AIAgentOpportunity } from '../../types';
import { AI_AGENT_OPPORTUNITIES } from '../../data/strategicRecommendations';

interface Section8Props {
  onDeploySimulatedAgent?: (agentName: string) => void;
}

export const Section8AIAgentOpportunities: React.FC<Section8Props> = () => {
  // Interactive Hospital Capacity & ROI Simulator State
  const [bedCount, setBedCount] = useState<number>(350);
  const [annualVisits, setAnnualVisits] = useState<number>(45000);

  // Dynamic calculations based on hospital size
  const estimatedAnnualSavings = ((bedCount * 4200) + (annualVisits * 28)).toLocaleString('en-US', {
    maximumFractionDigits: 0,
  });
  const reclaimedNurseHours = Math.round((bedCount * 14.5) + (annualVisits * 0.08)).toLocaleString(
    'en-US'
  );
  const preventedReadmissions = Math.round((bedCount * 0.72) + (annualVisits * 0.0035));
  const estimatedNpsUplift = (0.7 + (bedCount > 300 ? 0.3 : 0.1)).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <div className="text-xs font-semibold text-teal-600 uppercase tracking-wider">
            Section 8 · Artificial Intelligence Strategy
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Targeted Healthcare AI Agent Opportunities
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Agentic workflows custom-engineered to dismantle empirical bottlenecks discovered in patient comments.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <span className="font-mono bg-teal-50 text-teal-800 px-2.5 py-1 rounded font-bold border border-teal-200">
            5 Validated Agent Architectures
          </span>
        </div>
      </div>

      {/* Interactive Hospital ROI & Capacity Simulator Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl p-6 text-white border border-slate-700 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center space-x-2 text-teal-400 text-xs font-semibold uppercase tracking-wider">
              <Sliders className="w-4 h-4" />
              <span>Interactive Enterprise ROI & Capacity Simulator</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
              Simulate AI Agent Impact for Your Facility Scale
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              Adjust hospital bed count and annual outpatient/ED visits to calculate projected financial ROI, nursing hours reclaimed, and readmission penalty mitigation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Licensed Beds:</span>
                  <span className="font-mono font-bold text-teal-400">{bedCount} Beds</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1000"
                  step="25"
                  value={bedCount}
                  onChange={(e) => setBedCount(Number(e.target.value))}
                  className="w-full accent-teal-400 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Annual Patient Visits:</span>
                  <span className="font-mono font-bold text-teal-400">
                    {annualVisits.toLocaleString()} Visits
                  </span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="150000"
                  step="5000"
                  value={annualVisits}
                  onChange={(e) => setAnnualVisits(Number(e.target.value))}
                  className="w-full accent-teal-400 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Dynamic Simulator Results Box */}
          <div className="grid grid-cols-2 gap-3 shrink-0 bg-slate-800/90 border border-slate-700 p-4 rounded-xl min-w-[280px]">
            <div className="space-y-0.5">
              <div className="flex items-center space-x-1 text-slate-400 text-[11px]">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                <span>Annual Savings</span>
              </div>
              <div className="text-xl font-extrabold text-emerald-400 tracking-tight">
                ${estimatedAnnualSavings}
              </div>
              <span className="text-[10px] text-slate-400">Readmissions & no-shows</span>
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center space-x-1 text-slate-400 text-[11px]">
                <Clock className="w-3.5 h-3.5 text-teal-400" />
                <span>RN Hours Reclaimed</span>
              </div>
              <div className="text-xl font-extrabold text-teal-300 tracking-tight">
                {reclaimedNurseHours} hrs
              </div>
              <span className="text-[10px] text-slate-400">Inbasket & triage time</span>
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center space-x-1 text-slate-400 text-[11px]">
                <HeartPulse className="w-3.5 h-3.5 text-rose-400" />
                <span>Prevented Readmits</span>
              </div>
              <div className="text-xl font-extrabold text-white tracking-tight">
                {preventedReadmissions} pts
              </div>
              <span className="text-[10px] text-slate-400">Post-discharge events</span>
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center space-x-1 text-slate-400 text-[11px]">
                <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                <span>HCAHPS Uplift</span>
              </div>
              <div className="text-xl font-extrabold text-amber-300 tracking-tight">
                +{estimatedNpsUplift} pts
              </div>
              <span className="text-[10px] text-slate-400">Discharge & comm domain</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Recommendations Grid (5 Core Agents) */}
      <div className="space-y-4">
        {AI_AGENT_OPPORTUNITIES.map((agent, index) => (
          <div
            key={agent.id}
            className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs hover:border-slate-300 transition"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
              <div className="space-y-2.5 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-xs font-mono">
                    #{index + 1}
                  </span>
                  <h3 className="text-base font-bold text-slate-900">
                    {agent.name}
                  </h3>
                  <span className="text-slate-300">·</span>
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded font-mono ${
                      agent.feasibility === 'High'
                        ? 'bg-emerald-50 text-emerald-800'
                        : agent.feasibility === 'Medium'
                        ? 'bg-blue-50 text-blue-800'
                        : 'bg-purple-50 text-purple-800'
                    }`}
                  >
                    Feasibility: {agent.feasibility}
                  </span>
                </div>

                {/* Purpose (Required by prompt) */}
                <div>
                  <div className="text-[11px] uppercase tracking-wider font-bold text-slate-500 mb-0.5">
                    Purpose
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {agent.purpose}
                  </p>
                </div>

                {/* Expected Organizational Impact (Required by prompt) */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="text-[11px] uppercase tracking-wider font-bold text-teal-700 mb-0.5">
                    Expected Organizational Impact
                  </div>
                  <p className="text-xs text-slate-800 font-semibold leading-relaxed">
                    {agent.expectedImpact}
                  </p>
                </div>

                {/* Addressed Empirical Problems */}
                <div>
                  <div className="text-[11px] uppercase tracking-wider font-bold text-slate-500 mb-1">
                    Directly Addresses Identified Patient Friction:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {agent.addressedProblems.map((prob, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] text-slate-600 bg-slate-100 px-2.5 py-1 rounded flex items-center space-x-1"
                      >
                        <CheckCircle2 className="w-3 h-3 text-teal-600 shrink-0" />
                        <span>{prob}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Target Service Lines & Projected Metrics Box */}
              <div className="lg:w-72 bg-slate-50 border border-slate-200 rounded-xl p-4 shrink-0 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Target Service Lines
                </div>
                <div className="flex flex-wrap gap-1">
                  {agent.targetServiceLines.map((sl) => (
                    <span
                      key={sl}
                      className="text-[10px] font-semibold bg-white border border-slate-300 text-slate-800 px-2 py-0.5 rounded"
                    >
                      {sl}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Satisfaction Delta:</span>
                    <strong className="text-emerald-700">
                      {agent.metricsProjected.satisfactionDelta}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Annual Value:</span>
                    <strong className="text-slate-900">
                      {agent.metricsProjected.costSavingsAnnual}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Monthly Nurse Rec:</span>
                    <strong className="text-teal-700">
                      {agent.metricsProjected.hoursSavedMonthly}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
