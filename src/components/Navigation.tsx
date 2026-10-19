import React from 'react';
import {
  LayoutDashboard,
  HeartPulse,
  MessageSquareText,
  AlertTriangle,
  Scale,
  ShieldAlert,
  Bot,
  Compass,
} from 'lucide-react';

export type SectionTab =
  | 'overview'
  | 'satisfaction'
  | 'nlp'
  | 'problems'
  | 'equity'
  | 'risk'
  | 'agents'
  | 'recommendations';

interface NavigationProps {
  activeTab: SectionTab;
  onTabChange: (tab: SectionTab) => void;
  riskCount: number;
  equityCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onTabChange,
  riskCount,
  equityCount,
}) => {
  const tabs = [
    {
      id: 'overview' as SectionTab,
      label: '1. Executive Overview',
      shortLabel: 'Overview',
      icon: LayoutDashboard,
    },
    {
      id: 'satisfaction' as SectionTab,
      label: '2. Patient Satisfaction',
      shortLabel: 'Satisfaction',
      icon: HeartPulse,
    },
    {
      id: 'nlp' as SectionTab,
      label: '3. NLP & Themes',
      shortLabel: 'NLP',
      icon: MessageSquareText,
    },
    {
      id: 'problems' as SectionTab,
      label: '4. Hidden Problems',
      shortLabel: 'Bottlenecks',
      icon: AlertTriangle,
    },
    {
      id: 'equity' as SectionTab,
      label: '6. Equity & Access',
      shortLabel: 'Equity',
      icon: Scale,
      badge: equityCount > 0 ? `${equityCount}` : undefined,
    },
    {
      id: 'risk' as SectionTab,
      label: '7. AI Risk Monitoring',
      shortLabel: 'Risk',
      icon: ShieldAlert,
      badge: riskCount > 0 ? `${riskCount}` : undefined,
      alert: riskCount > 0,
    },
    {
      id: 'agents' as SectionTab,
      label: '8. AI Opportunities',
      shortLabel: 'AI Agents',
      icon: Bot,
    },
    {
      id: 'recommendations' as SectionTab,
      label: '9. Recommendations',
      shortLabel: 'Actions',
      icon: Compass,
    },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-16 z-20 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto space-x-1 py-2 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center space-x-2 px-3 py-2 text-xs font-semibold whitespace-nowrap rounded-lg transition cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded text-[10px] font-mono ${
                      isActive
                        ? 'bg-teal-500/20 text-teal-300'
                        : tab.alert
                        ? 'bg-rose-100 text-rose-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
