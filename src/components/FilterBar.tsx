import React from 'react';
import { Search, Filter, AlertCircle, Scale, X } from 'lucide-react';
import { FilterState } from '../types';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  serviceLines: string[];
  visitTypes: string[];
  personas: string[];
  totalFiltered: number;
  totalAvailable: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  serviceLines,
  visitTypes,
  personas,
  totalFiltered,
  totalAvailable,
}) => {
  const update = (partial: Partial<FilterState>) => {
    onFilterChange({ ...filters, ...partial });
  };

  const hasActiveFilters =
    filters.serviceLine !== 'All' ||
    filters.visitType !== 'All' ||
    filters.patientPersona !== 'All' ||
    filters.sentiment !== 'All' ||
    filters.searchQuery.trim() !== '' ||
    filters.onlyRisks ||
    filters.onlyEquityIssues;

  return (
    <div className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Dropdowns & Selects */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Service Line */}
          <div className="flex items-center space-x-1.5 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">Service Line:</span>
            <select
              value={filters.serviceLine}
              onChange={(e) => update({ serviceLine: e.target.value })}
              className="bg-slate-50 border border-slate-300 rounded px-2.5 py-1 text-xs text-slate-800 font-medium focus:ring-1 focus:ring-teal-500 focus:outline-hidden"
            >
              <option value="All">All Service Lines</option>
              {serviceLines.map((sl) => (
                <option key={sl} value={sl}>
                  {sl}
                </option>
              ))}
            </select>
          </div>

          {/* Visit Type */}
          <div className="flex items-center space-x-1.5 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">Visit Type:</span>
            <select
              value={filters.visitType}
              onChange={(e) => update({ visitType: e.target.value })}
              className="bg-slate-50 border border-slate-300 rounded px-2.5 py-1 text-xs text-slate-800 font-medium focus:ring-1 focus:ring-teal-500 focus:outline-hidden"
            >
              <option value="All">All Visit Types</option>
              {visitTypes.map((vt) => (
                <option key={vt} value={vt}>
                  {vt}
                </option>
              ))}
            </select>
          </div>

          {/* Persona */}
          <div className="flex items-center space-x-1.5 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">Persona:</span>
            <select
              value={filters.patientPersona}
              onChange={(e) => update({ patientPersona: e.target.value })}
              className="bg-slate-50 border border-slate-300 rounded px-2.5 py-1 text-xs text-slate-800 font-medium focus:ring-1 focus:ring-teal-500 focus:outline-hidden"
            >
              <option value="All">All Personas</option>
              {personas.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Sentiment */}
          <div className="flex items-center space-x-1.5 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">Sentiment:</span>
            <select
              value={filters.sentiment}
              onChange={(e) => update({ sentiment: e.target.value })}
              className="bg-slate-50 border border-slate-300 rounded px-2.5 py-1 text-xs text-slate-800 font-medium focus:ring-1 focus:ring-teal-500 focus:outline-hidden"
            >
              <option value="All">All Sentiments</option>
              <option value="positive">Positive Only</option>
              <option value="neutral">Neutral Only</option>
              <option value="negative">Negative Only</option>
            </select>
          </div>

          {/* Quick Toggles */}
          <button
            onClick={() => update({ onlyRisks: !filters.onlyRisks })}
            className={`flex items-center space-x-1 px-2.5 py-1 text-xs font-medium rounded border transition cursor-pointer ${
              filters.onlyRisks
                ? 'bg-rose-50 text-rose-700 border-rose-300'
                : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
            <span>AI Risk Only</span>
          </button>

          <button
            onClick={() => update({ onlyEquityIssues: !filters.onlyEquityIssues })}
            className={`flex items-center space-x-1 px-2.5 py-1 text-xs font-medium rounded border transition cursor-pointer ${
              filters.onlyEquityIssues
                ? 'bg-amber-50 text-amber-800 border-amber-300'
                : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-amber-600" />
            <span>Equity Flags Only</span>
          </button>
        </div>

        {/* Free text search & Active count */}
        <div className="flex items-center space-x-3">
          <div className="relative w-full sm:w-60">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search comments, themes..."
              value={filters.searchQuery}
              onChange={(e) => update({ searchQuery: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded pl-8 pr-7 py-1 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-1 focus:ring-teal-500 focus:outline-hidden"
            />
            {filters.searchQuery && (
              <button
                onClick={() => update({ searchQuery: '' })}
                className="absolute right-2 top-2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {hasActiveFilters && (
            <button
              onClick={() =>
                onFilterChange({
                  serviceLine: 'All',
                  visitType: 'All',
                  patientPersona: 'All',
                  sentiment: 'All',
                  searchQuery: '',
                  onlyRisks: false,
                  onlyEquityIssues: false,
                })
              }
              className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer whitespace-nowrap"
            >
              Clear All
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
