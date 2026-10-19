import React from 'react';
import {
  Activity,
  FileSpreadsheet,
  Download,
  Bot,
  RefreshCw,
  SlidersHorizontal,
} from 'lucide-react';
import { FeedbackRecord } from '../types';

interface HeaderProps {
  totalRecords: number;
  filteredCount: number;
  onOpenLiveAgent: () => void;
  onOpenDataManager: () => void;
  onExportCSV: () => void;
  onResetFilters: () => void;
  isFiltered: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  totalRecords,
  filteredCount,
  onOpenLiveAgent,
  onOpenDataManager,
  onExportCSV,
  onResetFilters,
  isFiltered,
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & System Title */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-base font-bold tracking-tight text-white">
                  METROHEALTH SYSTEM
                </span>
                <span className="text-xs font-mono text-teal-400 bg-teal-950/80 px-2 py-0.5 rounded border border-teal-800/50">
                  EXECUTIVE SUITE
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Healthcare Analytics Agent · Patient Experience & Safety Intelligence
              </p>
            </div>
          </div>

          {/* Quick Metrics & Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-3 text-xs text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <div>
                <span className="text-slate-400">Sample: </span>
                <span className="font-semibold text-white">{filteredCount}</span>
                {isFiltered && (
                  <span className="text-slate-400"> of {totalRecords}</span>
                )}
              </div>
              <span className="text-slate-600">|</span>
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-emerald-400 font-medium">Dataset Active</span>
              </div>
            </div>

            {isFiltered && (
              <button
                onClick={onResetFilters}
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center space-x-1 px-2.5 py-1.5 rounded bg-amber-950/40 border border-amber-800/40 hover:bg-amber-950/60 transition cursor-pointer"
                title="Reset all active filters"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}

            <button
              onClick={onOpenDataManager}
              className="text-xs text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center space-x-1.5 transition cursor-pointer font-medium"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-slate-300" />
              <span>Data & Upload</span>
            </button>

            <button
              onClick={onExportCSV}
              className="hidden sm:flex text-xs text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 items-center space-x-1.5 transition cursor-pointer font-medium"
            >
              <Download className="w-3.5 h-3.5 text-slate-300" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={onOpenLiveAgent}
              className="text-xs bg-teal-600 hover:bg-teal-500 text-white font-semibold px-3.5 py-1.5 rounded-lg flex items-center space-x-1.5 shadow-sm transition cursor-pointer"
            >
              <Bot className="w-4 h-4 text-white" />
              <span>Ask AI Agent</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
