"use client";

import React, { useState } from "react";
import { OverlapItem } from "../lib/data";
import {
  Sparkles,
  RefreshCw,
  Scale,
  Sliders,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ShieldAlert,
  ArrowRight,
  GitCompare,
  Cpu,
  FileCheck,
  ChevronDown,
  ChevronUp,
  Building2,
  Share2,
  UserCheck,
} from "lucide-react";

interface OverlapEngineProps {
  overlaps: OverlapItem[];
  onConfirmOverlap: (overlap: OverlapItem) => void;
  onRejectOverlap: (overlapId: string) => void;
  onRequestMoreInfo: (overlapId: string) => void;
  currentRole: string;
}

// Visual Relationship Topology Diagram Component
function VisualRelationshipDiagram({ overlap }: { overlap: OverlapItem }) {
  const isConfirmed = overlap.reviewStatus === "confirmed";
  const isRejected = overlap.reviewStatus === "rejected";

  return (
      <div className="p-5 bg-white border border-[#E8EAF0] rounded-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-[#6246EA]" />
              <h4 className="text-[12px] font-semibold text-[#171923] uppercase tracking-wide">
                Conflict Relationship & Resolution Topology
              </h4>
          </div>
              <div className="flex items-center gap-2 text-[11px] font-mono">
                <span className="px-2 py-0.5 rounded-md bg-[#F3F0FF] text-[#6246EA] border border-[#E8EAF0] font-medium">
                  AI INFERENCE
                </span>
                <span className="text-[#98A2B3]">→</span>
                  <span className="px-2 py-0.5 rounded-md bg-[#F7F8FA] text-[#171923] border border-[#E8EAF0] font-medium">
                    HUMAN RESOLUTION
                  </span>
              </div>
          </div>

          {/* Structured Topology Diagram Flow */}
            <div className="space-y-3 pt-1">
              {/* Stage 1: Institution Root */}
              <div className="flex justify-center">
                    <div className="px-4 py-2.5 rounded-lg border border-[#E8EAF0] bg-[#F7F8FA] text-center max-w-md w-full shadow-2xs">
                      <div className="text-[10px] font-mono font-medium text-[#667085] uppercase tracking-wider">
                        Single Window Subject Institution
                      </div>
                        <div className="text-[13px] font-medium text-[#171923] mt-0.5 flex items-center justify-center gap-2">
                          <Building2 className="w-4 h-4 text-[#6246EA]" />
                          <span>{overlap.institutionName}</span>
                        </div>
                      </div>
                    </div>

                    {/* Hairline Branch Connectors */}
                    <div className="relative flex justify-center h-4">
                      <div className="w-[60%] border-t border-x border-[#E8EAF0] h-full" />
                    </div>

                    {/* Stage 2: Diverging Directives & Involved Bureaus */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Directive A */}
                            <div className="p-3.5 rounded-lg border border-[#E8EAF0] bg-white space-y-1.5 relative">
                              <div className="flex items-center justify-between text-[11px]">
                                <span className="font-medium text-[#6246EA] bg-[#F3F0FF] px-2 py-0.5 rounded-md border border-[#E8EAF0]">
                                  Bureau A • {overlap.bureauA}
                                </span>
                                <span className="font-mono text-[#667085]">{overlap.caseANumber}</span>
                              </div>
                                <div className="text-[13px] font-medium text-[#171923] pt-0.5">
                                  Directive A: {overlap.subjectA}
                                </div>
                                  <div className="text-[11px] text-[#98A2B3] font-mono">
                                    Action: Standard Regulatory Processing
                                  </div>
                                </div>

                                {/* Directive B */}
                                      <div className="p-3.5 rounded-lg border border-[#E8EAF0] bg-white space-y-1.5 relative">
                                        <div className="flex items-center justify-between text-[11px]">
                                          <span className="font-medium text-[#3478C9] bg-[#EBF3FC] px-2 py-0.5 rounded-md border border-[#D5E6F8]">
                                            Bureau B • {overlap.bureauB}
                                          </span>
                                          <span className="font-mono text-[#667085]">{overlap.caseBNumber}</span>
                                        </div>
                                          <div className="text-[13px] font-medium text-[#171923] pt-0.5">
                                            Directive B: {overlap.subjectB}
                                          </div>
                                            <div className="text-[11px] text-[#98A2B3] font-mono">
                                              Action: Restrictive / Contradictory Sanction
                                            </div>
                                          </div>
                                        </div>

                                        {/* Convergence Connector */}
                                        <div className="relative flex justify-center h-4">
                                          <div className="w-[60%] border-b border-x border-[#E8EAF0] h-full" />
                                        </div>

                                        {/* Stage 3: AI Overlap Engine Detection */}
                                          <div className="p-3.5 rounded-lg border border-[#E8EAF0] bg-[#F7F8FA] space-y-2">
                                            <div className="flex items-center justify-between">
                                              <div className="flex items-center gap-2">
                                                  <Cpu className="w-4 h-4 text-[#6246EA]" />
                                                  <span className="text-[13px] font-medium text-[#171923]">
                                                    AI Semantic Collision Detection
                                                  </span>
                                                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-[#FDF2F4] text-[#D93649] border border-[#FAD2D8]">
                                                      {overlap.conflictType}
                                                    </span>
                                                  </div>
                                                    <span className="font-mono text-[13px] font-semibold text-[#D93649] tabular-nums">
                                                      {overlap.overallScore}% Composite Confidence
                                                    </span>
                                                  </div>

                                                    <div className="text-[12px] text-[#667085] leading-relaxed bg-white p-2.5 rounded-md border border-[#E8EAF0]">
                                                      <span className="font-medium text-[#171923]">Conflict Evidence: </span>
                                                      {overlap.evidence[0]} • {overlap.evidence[2] || overlap.evidence[1]}
                                                    </div>
                                                  </div>

                                                  {/* Down Arrow */}
                                                  <div className="flex justify-center text-[#98A2B3]">
                                                    <span className="font-mono text-[11px]">↓ Mandated Regulatory Pipeline</span>
                                                  </div>

                                                  {/* Stage 4: Human Review & Resolution */}
                                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                      <div className="p-3 rounded-lg border border-[#E8EAF0] bg-white flex items-center justify-between">
                                                        <div>
                                                          <div className="text-[10px] font-mono uppercase text-[#98A2B3]">
                                                            Step 1: Human-In-The-Loop Review
                                                          </div>
                                                            <div className="text-[13px] font-medium text-[#171923] flex items-center gap-1.5 mt-0.5">
                                                              <UserCheck className="w-4 h-4 text-[#6246EA]" />
                                                              <span>{overlap.reviewerName || "Central Regulatory Review Desk"}</span>
                                                            </div>
                                                          </div>
                                                          <span
                                                            className={`px-2 py-0.5 rounded-md text-[11px] font-medium font-mono ${
                                                              isConfirmed
                                                                ? "bg-[#E8F8F2] text-[#078B68] border border-[#D1F0E4]"
                                                                : isRejected
                                                                    ? "bg-[#F7F8FA] text-[#667085] border border-[#E8EAF0]"
                                                                    : "bg-[#FCF8E8] text-[#C88918] border border-[#F6E8B6]"
                                                            }`}
                                                          >
              {overlap.reviewStatus.toUpperCase()}
            </span>
          </div>

          <div className="p-3 rounded-lg border border-[#E8EAF0] bg-white flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase text-[#98A2B3]">
                Step 2: Formalized Inter-Bureau Order
              </div>
              <div className="text-[13px] font-medium text-[#171923] flex items-center gap-1.5 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-[#078B68]" />
                <span>
                  {isConfirmed
                    ? "Harmonized Joint Order Issued"
                    : isRejected
                    ? "Recorded as Autonomous Directive"
                    : "Awaiting Conciliation Session"}
                </span>
              </div>
            </div>
            <span className="font-mono text-[11px] text-[#667085]">
              {isConfirmed ? "Harmonized" : "Pending"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OverlapEngine({
  overlaps,
  onConfirmOverlap,
  onRejectOverlap,
  onRequestMoreInfo,
  currentRole,
}: OverlapEngineProps) {
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState<string>("");
  const [threshold, setThreshold] = useState<number>(70);
  const [expandedTopology, setExpandedTopology] = useState<Record<string, boolean>>({
    "ov-001": true,
  });

  const toggleTopology = (id: string) => {
    setExpandedTopology((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredOverlaps = overlaps.filter((ov) => {
    const matchesStatus =
      filterStatus === "ALL" || ov.reviewStatus === filterStatus;
    const matchesThreshold = ov.overallScore >= threshold;
    return matchesStatus && matchesThreshold;
  });

  const handleRunScan = () => {
    setIsScanning(true);
    setScanStep("Normalizing multi-bureau institution aliases...");
    setTimeout(() => {
      setScanStep(
        "Running NLP semantic embedding comparison across case texts..."
      );
      setTimeout(() => {
        setScanStep(
          "Evaluating contradictory regulatory directives & freeze orders..."
        );
        setTimeout(() => {
          setIsScanning(false);
          setScanStep("");
        }, 800);
      }, 900);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Workspace Header & Live Scanner Control */}
      <div className="bg-white border border-[#E8EAF0] rounded-xl card-shadow p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-[26px] font-medium text-[#171923] tracking-tight leading-tight">
              AI Overlap & Collision Surveillance Engine
            </h1>
            <span className="text-[11px] font-mono font-medium text-[#078B68] bg-[#E8F8F2] px-2 py-0.5 rounded-md border border-[#D1F0E4]">
              Bi-Encoder + Symbolic Engine
            </span>
          </div>
          <p className="text-[13px] text-[#667085] max-w-2xl leading-relaxed">
            Automated inter-bureau intelligence detecting contradictory directives, duplicate representations,
            and enforcement collisions prior to statutory issuance.
          </p>
        </div>

        <button
          onClick={handleRunScan}
          disabled={isScanning}
                                                            className = {`h-9 px-4 rounded-lg text-[13px] font-medium text-white transition-colors flex items-center gap-2 shrink-0 shadow-xs ${isScanning
                                                                ? "bg-[#6246EA]/75 cursor-wait"
                                                                : "bg-[#6246EA] hover:bg-[#5338D6]"
                                                              }`}
        >
                                                          <RefreshCw
                                                            className={`w-3.5 h-3.5 ${isScanning ? "animate-spin" : ""}`}
                                                          />
                                                          <span>{isScanning ? "Scanning Pairs..." : "Execute Real-Time Scan"}</span>
                                                        </button>
                                                      </div>

                                                      {/* Scanning status banner */}
                                                      {isScanning && (
                                                          <div className="p-3.5 bg-[#F3F0FF] border border-[#E8EAF0] rounded-xl text-[13px] text-[#6246EA] flex items-center justify-between animate-in fade-in">
                                                            <span className="flex items-center gap-2 font-medium">
                                                              <span className="w-2 h-2 rounded-full bg-[#6246EA] animate-ping" />
                                                              {scanStep}
                                                            </span>
                                                              <span className="font-mono text-[12px] text-[#667085]">
                                                                Active pairs evaluated: 3,428
                                                              </span>
                                                          </div>
      )}

                                                          {/* Filter and Sensitivity Toolbar */}
                                                              <div className="bg-white border border-[#E8EAF0] rounded-xl card-shadow p-3.5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                                                                <div className="flex flex-wrap items-center gap-1.5">
                                                                  {[
                                                                    { id: "ALL", label: "All Overlaps" },
                                                                    { id: "pending", label: "Pending Review" },
                                                                    { id: "confirmed", label: "Confirmed Overlaps" },
                                                                    { id: "more_info", label: "Needs Clarification" },
                                                                    { id: "rejected", label: "Dismissed" },
                                                                  ].map((f) => (
                                                                    <button
                                                                      key={f.id}
                                                                      onClick={() => setFilterStatus(f.id)}
                                                                      className={`px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors ${
                                                                        filterStatus === f.id
                                                                          ? "bg-[#F3F0FF] text-[#6246EA]"
                                                                          : "text-[#667085] hover:text-[#171923] hover:bg-[#F7F8FA]"
                                                                      }`}
                                                                    >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2.5 text-[13px] bg-[#F7F8FA] border border-[#E8EAF0] px-3.5 py-1.5 rounded-lg">
          <span className="text-[#667085]">Confidence Cutoff:</span>
          <input
            type="range"
            min="50"
            max="95"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="w-24 accent-[#6246EA] cursor-pointer"
          />
          <span className="font-mono font-medium text-[#6246EA] tabular-nums">{threshold}%</span>
        </div>
      </div>

      {/* Analytical Overlap Dossiers */}
      <div className="space-y-4">
        {filteredOverlaps.length === 0 ? (
          <div className="bg-white border border-[#E8EAF0] rounded-xl card-shadow p-12 text-center text-[#667085] text-[13px]">
            No overlaps matching the selected criteria.
          </div>
        ) : (
          filteredOverlaps.map((ov) => {
            const isConfirmed = ov.reviewStatus === "confirmed";
            const isRejected = ov.reviewStatus === "rejected";
            const isTopologyOpen = !!expandedTopology[ov.id];

            return (
              <div
                key={ov.id}
                className="bg-white border border-[#E8EAF0] rounded-xl card-shadow overflow-hidden"
              >
                {/* Header Strip */}
                <div className="p-5 border-b border-[#E8EAF0] flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-medium font-mono bg-[#FDF2F4] text-[#D93649] border border-[#FAD2D8]">
                        {ov.conflictType}
                      </span>
                      <span className="text-[14px] font-medium text-[#171923]">
                        {ov.institutionName}
                      </span>
                      <span className="text-[12px] text-[#98A2B3] font-mono tabular-nums">
                        (Detected: {ov.detectionTimestamp})
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleTopology(ov.id)}
                      className="h-8 px-3 rounded-lg border border-[#E8EAF0] hover:bg-[#F7F8FA] text-[12px] font-medium text-[#6246EA] flex items-center gap-1.5 transition-colors"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>{isTopologyOpen ? "Hide Topology Graph" : "View Topology Graph"}</span>
                      {isTopologyOpen ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <div className="text-right">
                      <span className="text-[10px] uppercase font-medium text-[#98A2B3] block">
                        Composite Score
                      </span>
                      <span className="text-[20px] font-semibold text-[#D93649] font-mono tabular-nums leading-none">
                        {ov.overallScore}%
                      </span>
                    </div>

                    <div className="pl-3 border-l border-[#E8EAF0]">
                      <span
                                                                    className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-medium ${isConfirmed
                                                                          ? "bg-[#E8F8F2] text-[#078B68] border border-[#D1F0E4]"
                                                                          : isRejected
                                                                              ? "bg-[#F7F8FA] text-[#667085] border border-[#E8EAF0]"
                                                                              : "bg-[#FDF2F4] text-[#D93649] border border-[#FAD2D8]"
                        }`
                                                                  }
                                                                  >
                                                                  { ov.reviewStatus.toUpperCase() }
                      </span>
                                                              </div>
                                                            </div>
                                                          </div>

                                                          {/* Visual Relationship Topology Diagram */}
                                                          {isTopologyOpen && (
                                                              <div className="p-5 bg-[#F7F8FA] border-b border-[#E8EAF0]">
                                                                <VisualRelationshipDiagram overlap={ov} />
                                                              </div>
                )}

                                                              {/* Side-by-Side Directive Comparison Panel */}
                                                                      <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#F7F8FA]/50">
                                                                        <div className="p-4 bg-white border border-[#E8EAF0] rounded-lg space-y-1.5">
                                                                          <div className="flex items-center justify-between mb-1">
                                                                            <span className="text-[11px] font-medium text-[#6246EA] bg-[#F3F0FF] px-2 py-0.5 rounded-md border border-[#E8EAF0]">
                                                                              {ov.bureauA}
                                                                            </span>
                                                                              <span className="font-mono text-[12px] text-[#171923] font-medium">
                                                                                {ov.caseANumber}
                                                                              </span>
                                                                          </div>
                                                                            <p className="text-[13px] font-medium text-[#171923]">
                                                                              {ov.subjectA}
                                                                            </p>
                                                                        </div>

                                                                              <div className="p-4 bg-white border border-[#E8EAF0] rounded-lg space-y-1.5">
                                                                                <div className="flex items-center justify-between mb-1">
                                                                                  <span className="text-[11px] font-medium text-[#3478C9] bg-[#EBF3FC] px-2 py-0.5 rounded-md border border-[#D5E6F8]">
                                                                                    {ov.bureauB}
                                                                                  </span>
                                                                                    <span className="font-mono text-[12px] text-[#171923] font-medium">
                                                                                      {ov.caseBNumber}
                                                                                    </span>
                                                                                </div>
                                                                                  <p className="text-[13px] font-medium text-[#171923]">
                                                                                    {ov.subjectB}
                                                                                  </p>
                                                                              </div>
                                                                          </div>

                                                                          {/* Multi-Factor Score Breakdown */}
                                                                            <div className="px-5 py-4 border-y border-[#E8EAF0] grid grid-cols-1 sm:grid-cols-3 gap-5 text-[12px] bg-white">
                                                                              <div>
                                                                                  <div className="flex justify-between text-[#667085] mb-1.5 font-medium">
                                                                                    <span>1. Institutional Match</span>
                                                                                    <span className="font-mono font-medium text-[#171923] tabular-nums">{ov.institutionScore}%</span>
                                                                                  </div>
                                                                                  <div className="w-full bg-[#E8EAF0] h-1.5 rounded-full overflow-hidden">
                                                                                    <div className="bg-[#6246EA] h-full" style={{ width: `${ov.institutionScore}%` }} />
                                                                                  </div>
                                                                                  <span className="text-[11px] text-[#98A2B3] mt-1 block">Deterministic AISHE Graph</span>
                                                                                </div>

                                                                                <div>
                                                                                    <div className="flex justify-between text-[#667085] mb-1.5 font-medium">
                                                                                      <span>2. Semantic / Complaint Overlap</span>
                                                                                      <span className="font-mono font-medium text-[#171923] tabular-nums">{ov.complaintScore}%</span>
                                                                                    </div>
                                                                                    <div className="w-full bg-[#E8EAF0] h-1.5 rounded-full overflow-hidden">
                                                                                      <div className="bg-[#3478C9] h-full" style={{ width: `${ov.complaintScore}%` }} />
                                                                                    </div>
                                                                                    <span className="text-[11px] text-[#98A2B3] mt-1 block">NLP Bi-Encoder Embedding</span>
                                                                                  </div>

                                                                                  <div>
                                                                                      <div className="flex justify-between text-[#667085] mb-1.5 font-medium">
                                                                                        <span>3. Regulatory Action Conflict</span>
                                                                                        <span className="font-mono font-medium text-[#D93649] tabular-nums">{ov.actionConflictScore}%</span>
                                                                                      </div>
                                                                                      <div className="w-full bg-[#E8EAF0] h-1.5 rounded-full overflow-hidden">
                                                                                        <div className="bg-[#D93649] h-full" style={{ width: `${ov.actionConflictScore}%` }} />
                                                                                      </div>
                                                                                      <span className="text-[11px] text-[#98A2B3] mt-1 block">Symbolic Logic Collision</span>
                                                                                    </div>
                                                                                  </div>

                                                                                  {/* Evidence Trail */}
                                                                                      <div className="p-5 bg-[#F7F8FA] space-y-2">
                                                                                        <h4 className="text-[13px] font-medium text-[#171923] flex items-center gap-2">
                                                                                          <Scale className="w-4 h-4 text-[#6246EA]" />
                                                                                          Explainable AI Inference Trail:
                                                                                        </h4>
                                                                                          <ul className="space-y-1.5 text-[13px] text-[#667085]">
                                                                                            {ov.evidence.map((ev, idx) => (
                                                                                                <li key={idx} className="flex items-start gap-2">
                                                                                                  <span className="text-[#6246EA] font-semibold">•</span>
                                                                                                  <span>{ev}</span>
                                                                                                </li>
                    ))}
                                                                                              </ul>
                  {
                                                                                                ov.reviewNotes && (
                                                                                                    <div className="mt-2.5 pt-2.5 border-t border-[#E8EAF0] text-[12px] text-[#C88918] font-medium">
                                                                                                      <strong>Review Note:</strong> {ov.reviewNotes}
                                                                                                    </div>
                  )}
                                                                                                  </div>

                {/* Verification Workflow Actions */ }
                                                                                                <div className="p-4 border-t border-[#E8EAF0] bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[13px]">
                                                                                                  <span className="text-[#667085] text-[12px]">
                                                                                                    Current Role: <strong className="text-[#171923] font-medium">{currentRole}</strong> (Regulatory Action)
                                                                                                  </span>

                                                                                                  <div className="flex items-center gap-2">
                                                                                                    <button
                                                                                                      onClick={() => onRejectOverlap(ov.id)}
                                                                                                      disabled={isRejected}
                                                                                                      className="h-9 px-3.5 rounded-lg bg-[#F7F8FA] hover:bg-[#F0F1F4] text-[#667085] hover:text-[#171923] border border-[#E8EAF0] font-medium transition-colors disabled:opacity-50 text-[13px]"
                                                                                                    >
                                                                                                      Dismiss (False Positive)
                                                                                                    </button>

                                                                                                    <button
                                                                                                      onClick={() => onRequestMoreInfo(ov.id)}
                                                                                                      className="h-9 px-3.5 rounded-lg bg-[#FCF8E8] hover:bg-[#F6E8B6] text-[#C88918] border border-[#F6E8B6] font-medium transition-colors text-[13px]"
                                                                                                    >
                                                                                                      Request Evidence
                                                                                                    </button>

                                                                                                    <button
                                                                                                      onClick={() => onConfirmOverlap(ov)}
                                                                                                      disabled={isConfirmed}
                                                                                                      className="h-9 px-4 rounded-lg bg-[#6246EA] hover:bg-[#5338D6] text-white font-medium transition-colors disabled:opacity-50 text-[13px] shadow-xs"
                                                                                                    >
                                                                                                      {isConfirmed ? "Confirmed & Coordinated" : "Confirm Overlap & Launch Consultation"}
                                                                                                    </button>
                                                                                                  </div>
                                                                                                </div>
                                                                                              </div>
                                                                                            );
          })
        )}
                                                                                          </div>
                                                                                      </div>
                                                                                      );
}
