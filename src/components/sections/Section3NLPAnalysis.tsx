import React, { useState } from 'react';
import {
  MessageSquareText,
  Cloud,
  Tag,
  Search,
  Sparkles,
  Smile,
  Meh,
  Frown,
  X,
  ExternalLink,
} from 'lucide-react';
import { ThemeStats, KeywordStats } from '../../utils/analytics';
import { FeedbackRecord } from '../../types';

interface Section3Props {
  themes: ThemeStats[];
  keywords: KeywordStats[];
  allRecords: FeedbackRecord[];
}

export const Section3NLPAnalysis: React.FC<Section3Props> = ({
  themes,
  keywords,
  allRecords,
}) => {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  // Filter matching comments when an executive clicks a keyword or theme
  const matchingRecords = allRecords.filter((r) => {
    if (selectedWord) {
      const w = selectedWord.toLowerCase();
      return (
        r.keywords.some((k) => k.toLowerCase().includes(w)) ||
        r.comment.toLowerCase().includes(w)
      );
    }
    if (selectedTheme) {
      return r.themes.includes(selectedTheme);
    }
    return false;
  });

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <div className="text-xs font-semibold text-teal-600 uppercase tracking-wider">
            Section 3 · Natural Language Processing
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            NLP Semantic Analysis, Themes & Word Cloud
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated entity extraction, semantic sentiment classification, and lexical recurrence across unstructured clinical comments.
          </p>
        </div>
        <div className="text-right text-xs text-slate-500">
          <span>Themes Extracted: </span>
          <span className="font-bold text-slate-900">{themes.length}</span>
          <span className="mx-2">·</span>
          <span>Keywords Indexed: </span>
          <span className="font-bold text-slate-900">{keywords.length}</span>
        </div>
      </div>

      {/* Row 1: Interactive Word Cloud (Required by prompt) */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center space-x-2">
            <Cloud className="w-5 h-5 text-teal-600" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Interactive Patient Voice Word Cloud
              </h3>
              <p className="text-xs text-slate-500">
                Font scale indicates mention frequency. Click any term to drill down into authentic patient comments.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-slate-600">Positive Sentiment</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span className="text-slate-600">Neutral</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              <span className="text-slate-600">Negative / Bottleneck</span>
            </div>
          </div>
        </div>

        {/* Word Cloud Visual Canvas */}
        <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-6 min-h-[220px] flex flex-wrap items-center justify-center gap-x-4 gap-y-3 select-none">
          {keywords.slice(0, 36).map((kw, i) => {
            // Sizing between 12px and 30px
            const maxFreq = keywords[0]?.frequency || 1;
            const sizePercent = kw.frequency / maxFreq;
            const fontSize = Math.max(12, Math.min(28, Math.round(12 + sizePercent * 16)));
            const isSelected = selectedWord === kw.word;

            let colorClass = 'text-slate-700 hover:text-slate-900';
            if (kw.sentimentBias === 'positive') {
              colorClass = 'text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50';
            } else if (kw.sentimentBias === 'negative') {
              colorClass = 'text-rose-700 hover:text-rose-900 hover:bg-rose-50';
            } else {
              colorClass = 'text-amber-800 hover:text-amber-950 hover:bg-amber-50';
            }

            return (
              <button
                key={kw.word}
                onClick={() => {
                  setSelectedWord(isSelected ? null : kw.word);
                  setSelectedTheme(null);
                }}
                style={{ fontSize: `${fontSize}px` }}
                className={`font-semibold px-2 py-0.5 rounded transition cursor-pointer ${colorClass} ${
                  isSelected ? 'ring-2 ring-teal-500 bg-white shadow-xs' : ''
                }`}
                title={`Keyword: "${kw.word}" | Frequency: ${kw.frequency} mentions | Sentiment: ${kw.sentimentBias}`}
              >
                {kw.word}
                <span className="text-[10px] font-mono text-slate-400 font-normal ml-1">
                  ({kw.frequency})
                </span>
              </button>
            );
          })}
        </div>

        {selectedWord && (
          <div className="mt-3 flex items-center justify-between bg-teal-50 border border-teal-200 rounded-lg px-3 py-2 text-xs text-teal-800">
            <span>
              Drilling down on keyword: <strong>"{selectedWord}"</strong> ({matchingRecords.length} comments found)
            </span>
            <button
              onClick={() => setSelectedWord(null)}
              className="font-semibold text-teal-700 hover:text-teal-900 flex items-center space-x-1"
            >
              <span>Clear Drilldown</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Row 2: Top Themes Identified & Frequency Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visualization 2: Top Themes Distribution */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Top Themes Identified from Comments
              </h3>
              <p className="text-xs text-slate-500">
                Frequency, proportion, and sentiment breakdown per semantic theme
              </p>
            </div>
            <span className="text-xs text-slate-400 font-mono">Ranked by Volume</span>
          </div>

          <div className="space-y-3.5">
            {themes.map((t) => {
              const isSelected = selectedTheme === t.theme;
              const posPercent = t.count > 0 ? (t.positive / t.count) * 100 : 0;
              const neuPercent = t.count > 0 ? (t.neutral / t.count) * 100 : 0;
              const negPercent = t.count > 0 ? (t.negative / t.count) * 100 : 0;

              return (
                <div
                  key={t.theme}
                  onClick={() => {
                    setSelectedTheme(isSelected ? null : t.theme);
                    setSelectedWord(null);
                  }}
                  className={`p-3 rounded-lg border transition cursor-pointer ${
                    isSelected
                      ? 'border-teal-500 bg-teal-50/40'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5 text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-900">{t.theme}</span>
                      <span className="text-slate-400 font-mono">
                        {t.count} mentions ({t.percentage}%)
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-slate-500">
                        Avg Sat:{' '}
                        <strong
                          className={
                            t.avgSatisfaction >= 3.8
                              ? 'text-emerald-700'
                              : t.avgSatisfaction <= 2.5
                              ? 'text-rose-700'
                              : 'text-amber-700'
                          }
                        >
                          {t.avgSatisfaction}
                        </strong>
                      </span>
                    </div>
                  </div>

                  {/* Multi-segment Sentiment Bar */}
                  <div className="w-full bg-slate-100 rounded-full h-2 flex overflow-hidden">
                    <div
                      style={{ width: `${posPercent}%` }}
                      className="bg-emerald-500"
                      title={`Positive: ${t.positive} (${posPercent.toFixed(0)}%)`}
                    />
                    <div
                      style={{ width: `${neuPercent}%` }}
                      className="bg-amber-400"
                      title={`Neutral: ${t.neutral} (${neuPercent.toFixed(0)}%)`}
                    />
                    <div
                      style={{ width: `${negPercent}%` }}
                      className="bg-rose-500"
                      title={`Negative: ${t.negative} (${negPercent.toFixed(0)}%)`}
                    />
                  </div>

                  <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center space-x-2">
                      <span className="text-emerald-700 font-medium">Pos: {t.positive}</span>
                      <span>·</span>
                      <span className="text-amber-700 font-medium">Neu: {t.neutral}</span>
                      <span>·</span>
                      <span className="text-rose-700 font-medium">Neg: {t.negative}</span>
                    </span>
                    <span className="text-teal-600 font-semibold hover:underline">
                      {isSelected ? 'Clear selection' : 'Filter quotes →'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Most Frequent Keywords Table */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">Top Recurrent Keywords</h3>
              <Tag className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Frequency ranking across feedback corpus
            </p>

            <div className="overflow-y-auto max-h-[380px] divide-y divide-slate-100 text-xs">
              {keywords.slice(0, 15).map((kw, i) => (
                <div
                  key={kw.word}
                  onClick={() => {
                    setSelectedWord(kw.word);
                    setSelectedTheme(null);
                  }}
                  className="py-2 flex items-center justify-between hover:bg-slate-50 px-2 rounded cursor-pointer transition"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-400 font-mono w-5">#{i + 1}</span>
                    <span className="font-semibold text-slate-800">{kw.word}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-slate-600">{kw.frequency}x</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                        kw.sentimentBias === 'positive'
                          ? 'bg-emerald-50 text-emerald-700'
                          : kw.sentimentBias === 'negative'
                          ? 'bg-rose-50 text-rose-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {kw.sentimentBias}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
            N-gram extraction tokenized with Lemmatization
          </div>
        </div>
      </div>

      {/* Drilldown Evidence Drawer if selected */}
      {(selectedWord || selectedTheme) && (
        <div className="bg-white rounded-xl border-2 border-teal-500/40 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-teal-700 uppercase tracking-wider">
                Corpus Evidence Drilldown
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Patient Feedback Mentions ({matchingRecords.length} Records)
              </h3>
            </div>
            <button
              onClick={() => {
                setSelectedWord(null);
                setSelectedTheme(null);
              }}
              className="text-slate-400 hover:text-slate-600 p-1 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[320px] overflow-y-auto">
            {matchingRecords.map((r) => (
              <div
                key={r.id}
                className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/60 text-xs space-y-2"
              >
                <div className="flex items-center justify-between text-slate-500">
                  <span className="font-mono font-bold text-slate-800">{r.id}</span>
                  <span className="text-slate-600">{r.serviceLine} · {r.visitType}</span>
                  <span
                    className={`font-semibold ${
                      r.satisfactionScore >= 4
                        ? 'text-emerald-700'
                        : r.satisfactionScore <= 2
                        ? 'text-rose-700'
                        : 'text-amber-700'
                    }`}
                  >
                    ★ {r.satisfactionScore} / 5
                  </span>
                </div>
                <p className="text-slate-800 italic leading-relaxed">
                  "{r.comment}"
                </p>
                <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[11px] text-slate-500">
                  <span>Persona: {r.patientPersona}</span>
                  <span className="font-mono">{r.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
