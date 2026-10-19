import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Upload,
  Download,
  PlusCircle,
  X,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
} from 'lucide-react';
import { FeedbackRecord, ServiceLine, VisitType, PatientPersona } from '../types';

interface DatasetManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  records: FeedbackRecord[];
  onUploadRecords: (records: FeedbackRecord[]) => void;
  onResetToDefault: () => void;
  onAddRecord: (record: FeedbackRecord) => void;
}

export const DatasetManagerModal: React.FC<DatasetManagerModalProps> = ({
  isOpen,
  onClose,
  records,
  onUploadRecords,
  onResetToDefault,
  onAddRecord,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'add' | 'export'>('upload');
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  // New Record Form State
  const [newComment, setNewComment] = useState('');
  const [newServiceLine, setNewServiceLine] = useState<ServiceLine>('Emergency Department');
  const [newVisitType, setNewVisitType] = useState<VisitType>('Emergency');
  const [newPersona, setNewPersona] = useState<PatientPersona>('Working Parent');
  const [newScore, setNewScore] = useState<number>(3);
  const [newComm, setNewComm] = useState<number>(3);
  const [newWait, setNewWait] = useState<number>(45);
  const [newFollowUp, setNewFollowUp] = useState<boolean>(true);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        if (file.name.endsWith('.json')) {
          const parsed = JSON.parse(text);
          if (Array.isArray(parsed) && parsed.length > 0) {
            onUploadRecords(parsed);
            setUploadStatus(`Successfully loaded ${parsed.length} patient records from JSON.`);
          } else {
            setUploadStatus('Invalid JSON: Must be an array of feedback records.');
          }
        } else if (file.name.endsWith('.csv')) {
          // Parse CSV lines
          const lines = text.split('\n').filter((l) => l.trim().length > 0);
          const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());
          const parsedRecords: FeedbackRecord[] = [];

          for (let i = 1; i < lines.length; i++) {
            const cols = lines[i].split(',');
            if (cols.length >= 4) {
              const score = Number(cols[3]) || 3;
              parsedRecords.push({
                id: cols[0] || `CSV-${i}`,
                patientId: cols[1] || `PT-${1000 + i}`,
                date: new Date().toISOString().split('T')[0],
                serviceLine: (cols[2] as ServiceLine) || 'Primary Care',
                visitType: 'Outpatient',
                patientPersona: 'Working Parent',
                satisfactionScore: score,
                communicationRating: score,
                followUpCompliant: score >= 3,
                waitTimeMinutes: 30,
                comment: cols[4] || 'No comment text provided',
                themes: ['Patient Experience'],
                keywords: ['visit', 'care'],
                sentiment: score >= 4 ? 'positive' : score === 3 ? 'neutral' : 'negative',
                complaintCategory: score <= 2 ? 'Communication Bottleneck' : 'None',
                equity: {
                  hasAccessibilityConcern: false,
                  hasLanguageBarrier: false,
                  hasDigitalLiteracyIssue: false,
                },
                aiRisk: {
                  isHallucinationTrap: false,
                  isBiasRelated: false,
                  requiresHumanReview: score <= 1,
                  severity: score <= 1 ? 'Medium' : 'None',
                },
              });
            }
          }

          if (parsedRecords.length > 0) {
            onUploadRecords(parsedRecords);
            setUploadStatus(`Successfully ingested ${parsedRecords.length} records from CSV.`);
          } else {
            setUploadStatus('Could not parse valid records from CSV file.');
          }
        }
      } catch (err: any) {
        setUploadStatus(`Parsing error: ${err.message}`);
      }
    };
    reader.readAsText(file);
  };

  const handleCreateRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const record: FeedbackRecord = {
      id: `USR-${Date.now().toString().slice(-4)}`,
      patientId: `PT-${Math.floor(10000 + Math.random() * 89999)}`,
      date: new Date().toISOString().split('T')[0],
      serviceLine: newServiceLine,
      visitType: newVisitType,
      patientPersona: newPersona,
      satisfactionScore: newScore,
      communicationRating: newComm,
      followUpCompliant: newFollowUp,
      waitTimeMinutes: newWait,
      comment: newComment.trim(),
      themes: ['Patient Experience', 'Real-time Submission'],
      keywords: newComment.split(' ').slice(0, 4),
      sentiment: newScore >= 4 ? 'positive' : newScore === 3 ? 'neutral' : 'negative',
      complaintCategory: newScore <= 2 ? 'Communication Bottleneck' : 'None',
      equity: {
        hasAccessibilityConcern: false,
        hasLanguageBarrier: false,
        hasDigitalLiteracyIssue: false,
      },
      aiRisk: {
        isHallucinationTrap: false,
        isBiasRelated: false,
        requiresHumanReview: newScore <= 1,
        severity: newScore <= 1 ? 'High' : 'None',
        riskReason: newScore <= 1 ? 'Live user submitted critical low score' : undefined,
      },
    };

    onAddRecord(record);
    setNewComment('');
    setUploadStatus('New record added to dataset! Dashboard metrics updated.');
  };

  const downloadSampleCSV = () => {
    const csvContent = `id,patientId,serviceLine,satisfactionScore,comment\nFB-9001,PT-11223,Emergency Department,1,"Waited 3 hours in the hallway and doctor was rushed."\nFB-9002,PT-44556,Cardiology,5,"Dr. Kelly explained my medication regimen with complete patience."\nFB-9003,PT-77889,Oncology,4,"Infusion center nurses were compassionate and attentive."`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sample_hospital_feedback_template.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <FileSpreadsheet className="w-5 h-5 text-teal-400" />
            <div>
              <h3 className="text-sm font-bold text-white">
                Patient Feedback Dataset Manager
              </h3>
              <p className="text-xs text-slate-400">
                Active dataset: {records.length} records ingested
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-semibold px-4 pt-2">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2 border-b-2 transition cursor-pointer ${
              activeTab === 'upload'
                ? 'border-teal-600 text-teal-800 bg-white rounded-t'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Upload CSV / JSON
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`px-4 py-2 border-b-2 transition cursor-pointer ${
              activeTab === 'add'
                ? 'border-teal-600 text-teal-800 bg-white rounded-t'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Add Single Patient Record
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`px-4 py-2 border-b-2 transition cursor-pointer ${
              activeTab === 'export'
                ? 'border-teal-600 text-teal-800 bg-white rounded-t'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Download Sample / Reset
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          {uploadStatus && (
            <div className="p-3 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
              <span>{uploadStatus}</span>
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="space-y-4">
              <p className="text-slate-600 leading-relaxed">
                You can upload custom hospital feedback datasets in CSV or JSON format. The analytics agent will immediately recalculate all satisfaction scores, NLP word clouds, hidden bottlenecks, and AI risk monitors.
              </p>

              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-teal-500 transition cursor-pointer bg-slate-50/50">
                <Upload className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                <div className="text-sm font-bold text-slate-800">
                  Click or drag hospital dataset file here
                </div>
                <p className="text-slate-500 text-xs mt-1">Supports .csv and .json</p>
                <input
                  type="file"
                  accept=".csv,.json"
                  onChange={handleFileUpload}
                  className="mt-3 text-xs text-slate-600 mx-auto"
                />
              </div>
            </div>
          )}

          {activeTab === 'add' && (
            <form onSubmit={handleCreateRecord} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700">Service Line</label>
                  <select
                    value={newServiceLine}
                    onChange={(e) => setNewServiceLine(e.target.value as ServiceLine)}
                    className="w-full mt-1 border border-slate-300 rounded p-1.5 bg-slate-50 text-xs"
                  >
                    <option value="Emergency Department">Emergency Department</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Oncology">Oncology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Neurology">Neurology</option>
                    <option value="OB/GYN">OB/GYN</option>
                    <option value="Primary Care">Primary Care</option>
                    <option value="Telehealth & Urgent Care">Telehealth & Urgent Care</option>
                    <option value="General Surgery">General Surgery</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700">Visit Type</label>
                  <select
                    value={newVisitType}
                    onChange={(e) => setNewVisitType(e.target.value as VisitType)}
                    className="w-full mt-1 border border-slate-300 rounded p-1.5 bg-slate-50 text-xs"
                  >
                    <option value="Emergency">Emergency</option>
                    <option value="Inpatient">Inpatient</option>
                    <option value="Outpatient">Outpatient</option>
                    <option value="Telehealth">Telehealth</option>
                    <option value="Surgical">Surgical</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700">Satisfaction (1-5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={newScore}
                    onChange={(e) => setNewScore(Number(e.target.value))}
                    className="w-full mt-1 border border-slate-300 rounded p-1.5 bg-slate-50 text-xs"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Communication (1-5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={newComm}
                    onChange={(e) => setNewComm(Number(e.target.value))}
                    className="w-full mt-1 border border-slate-300 rounded p-1.5 bg-slate-50 text-xs"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Wait (mins)</label>
                  <input
                    type="number"
                    min="0"
                    max="600"
                    value={newWait}
                    onChange={(e) => setNewWait(Number(e.target.value))}
                    className="w-full mt-1 border border-slate-300 rounded p-1.5 bg-slate-50 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700">Patient Comment / Quote</label>
                <textarea
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Enter verbatim patient feedback..."
                  className="w-full mt-1 border border-slate-300 rounded p-2 text-xs focus:ring-1 focus:ring-teal-500 focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                disabled={!newComment.trim()}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-semibold rounded-lg text-xs cursor-pointer transition"
              >
                Submit Comment to Real-Time Dashboard
              </button>
            </form>
          )}

          {activeTab === 'export' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">Download CSV Sample Template</div>
                  <p className="text-slate-500 text-xs">
                    Get a pre-formatted template with sample columns for easy bulk import.
                  </p>
                </div>
                <button
                  onClick={downloadSampleCSV}
                  className="px-3.5 py-1.5 bg-white hover:bg-slate-100 text-slate-800 font-semibold border border-slate-300 rounded-lg flex items-center space-x-1.5 cursor-pointer text-xs"
                >
                  <Download className="w-4 h-4 text-slate-600" />
                  <span>Download Sample</span>
                </button>
              </div>

              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-amber-950">Reset to Standard Health System Dataset</div>
                  <p className="text-amber-800 text-xs">
                    Restore the pre-loaded 110+ comprehensive clinical records.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onResetToDefault();
                    setUploadStatus('Reset to default comprehensive dataset.');
                  }}
                  className="px-3.5 py-1.5 bg-amber-900 hover:bg-amber-950 text-white font-semibold rounded-lg flex items-center space-x-1.5 cursor-pointer text-xs"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Restore Standard</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
