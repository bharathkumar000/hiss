"use client";

import React, { useState } from "react";
import { CoordinationItem } from "../lib/data";
import {
  Users,
  ArrowRight,
  Clock,
  Plus,
  FileCheck2,
  Calendar,
  CheckCircle2,
  History,
  MessageSquare,
  Shield,
  Layers,
  X,
} from "lucide-react";

interface CoordinationHubProps {
  coordinations: CoordinationItem[];
  onOpenNewCoordModal: () => void;
  onUpdateCoordination: (
    coordId: string,
    status: CoordinationItem["status"],
    decisionNotes?: string
  ) => void;
  currentRole: string;
}

export default function CoordinationHub({
  coordinations,
  onOpenNewCoordModal,
  onUpdateCoordination,
  currentRole,
}: CoordinationHubProps) {
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [selectedCoord, setSelectedCoord] = useState<CoordinationItem | null>(
    null
  );
  const [decisionNotes, setDecisionNotes] = useState("");

  const filtered = coordinations.filter((c) =>
    filterStatus === "ALL" ? true : c.status === filterStatus
  );

  const handleResolve = (coordId: string) => {
    onUpdateCoordination(
      coordId,
      "completed",
      decisionNotes || "Joint resolution formalized between concerned bureaus."
    );
    setSelectedCoord(null);
    setDecisionNotes("");
  };

  return (
    <div className="space-y-6">
      {/* Workflow Header */}
          <div className="bg-white border border-[#E8EAF0] rounded-xl card-shadow p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-[26px] font-medium text-[#171923] tracking-tight leading-tight">
                    Inter-Bureau Coordination Hub
                  </h1>
                    <span className="font-mono text-[11px] text-[#6246EA] bg-[#F3F0FF] px-2 py-0.5 rounded-md border border-[#E8EAF0] font-medium">
                      Conciliation Desk
                    </span>
                  </div>
                    <p className="text-[13px] text-[#667085] leading-relaxed">
                      Operational interdepartmental collaboration workspace, statutory conciliation hearings, and binding reconciled directives.
                    </p>
                  </div>

                  <button
                    onClick={onOpenNewCoordModal}
                    className="h-9 px-4 rounded-lg text-[13px] font-medium bg-[#6246EA] hover:bg-[#5338D6] text-white transition-colors flex items-center gap-2 shrink-0 shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Launch Consultation</span>
                  </button>
              </div>

              {/* Filter and Workflow Stages Bar */}
                  <div className="bg-white border border-[#E8EAF0] rounded-xl card-shadow p-3.5 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {[
                        { id: "ALL", label: `All Consultations (${coordinations.length})` },
                        { id: "awaiting_response", label: "Awaiting Response" },
                        { id: "submitted", label: "Submitted Proposals" },
                        { id: "completed", label: "Resolved Directives" },
                      ].map((st) => (
                        <button
                          key={st.id}
                          onClick={() => setFilterStatus(st.id)}
                          className={`px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors ${
                            filterStatus === st.id
                              ? "bg-[#F3F0FF] text-[#6246EA]"
                              : "text-[#667085] hover:text-[#171923] hover:bg-[#F7F8FA]"
                          }`}
                        >
              {st.label}
            </button>
          ))}
        </div>

        <span className="text-[11px] text-[#98A2B3] px-2 font-mono">
          Statutory SLA: 7 Days Max Turnaround
        </span>
      </div>

      {/* Consultation Operational Records (Structured List Rows) */}
      <div className="space-y-3">
        {filtered.map((item) => {
          const isCompleted = item.status === "completed";
          const isUrgent =
            item.urgency === "Emergency" || item.urgency === "Urgent";

          return (
            <div
              key={item.id}
              onClick={() => setSelectedCoord(item)}
              className="bg-white border border-[#E8EAF0] hover:border-[#6246EA] rounded-xl card-shadow p-5 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[13px] font-medium text-[#6246EA]">
                      {item.coordNumber}
                    </span>
                    <span className="text-[11px] text-[#98A2B3] font-mono">
                      • Created {item.createdAt}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isUrgent && (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#FDF2F4] text-[#D93649] border border-[#FAD2D8] font-mono">
                        {item.urgency}
                      </span>
                    )}
                    <span
                        className = {`text-[10px] font-medium px-2 py-0.5 rounded-md border font-mono ${isCompleted
                              ? "bg-[#E8F8F2] text-[#078B68] border-[#D1F0E4]"
                              : "bg-[#FCF8E8] text-[#C88918] border-[#F6E8B6]"
                          }`}
                    >
                      {item.status.replace("_", " ").toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Bureau Routing Banner */}
                    <div className="flex items-center justify-between p-3 bg-[#F7F8FA] border border-[#E8EAF0] rounded-lg text-[13px] mb-3">
                      <span className="font-medium text-[#6246EA]">
                        {item.requestingBureau}
                      </span>
                        <ArrowRight className="w-4 h-4 text-[#98A2B3] mx-2" />
                        <span className="font-medium text-[#3478C9]">
                          {item.receivingBureau}
                        </span>
                    </div>

                      <p className="text-[13px] font-medium text-[#171923] line-clamp-2 mb-2.5 group-hover:text-[#6246EA] transition-colors leading-snug">
                        {item.purpose}
                      </p>

                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {item.caseIds.map((cid) => (
                            <span
                              key={cid}
                              className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[#F7F8FA] text-[#667085] border border-[#E8EAF0]"
                            >
                              {cid}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Footer row */}
                          <div className="pt-3 border-t border-[#E8EAF0] text-[12px] text-[#667085] flex items-center justify-between">
                            <span>Coordinator: <strong className="font-medium text-[#171923]">{item.coordinatorName}</strong></span>
                            <span className="flex items-center gap-1.5 text-[#C88918] font-medium font-mono">
                              <Clock className="w-3.5 h-3.5 text-[#98A2B3]" />
                              Due {item.deadline}
                            </span>
                          </div>
                      </div>
                      );
        })}
                    </div>

                    {/* Detail / Action Modal */}
                    {selectedCoord && (
                      <div className="fixed inset-0 bg-black/40 backdrop-blur-2xs z-50 flex items-center justify-center p-4">
                            <div className="bg-white border border-[#E8EAF0] rounded-xl max-w-xl w-full p-6 modal-shadow space-y-4 animate-in fade-in zoom-in-95">
                              <div className="flex items-start justify-between pb-3.5 border-b border-[#E8EAF0]">
                                <div>
                                    <span className="font-mono text-[13px] font-medium text-[#6246EA]">
                                      {selectedCoord.coordNumber}
                                    </span>
                                      <h3 className="text-[16px] font-medium text-[#171923] mt-1">
                                        Inter-Bureau Consultation Docket
                                      </h3>
                                    </div>
                                    <button
                                      onClick={() => setSelectedCoord(null)}
                                      className="p-1 text-[#98A2B3] hover:text-[#171923] rounded-md transition-colors"
                                    >
                                      <X className="w-4 h-4" />
                                    </button>
                                </div>

                                  <div className="p-3.5 bg-[#F7F8FA] rounded-lg border border-[#E8EAF0] flex items-center justify-between text-[13px]">
                                    <div>
                                        <span className="text-[10px] text-[#98A2B3] uppercase font-medium font-mono">
                                          Requesting Bureau
                                        </span>
                                          <p className="font-medium text-[#6246EA] mt-0.5">
                                            {selectedCoord.requestingBureau}
                                          </p>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-[#98A2B3]" />
                                        <div className="text-right">
                                            <span className="text-[10px] text-[#98A2B3] uppercase font-medium font-mono">
                                              Responding Bureau
                                            </span>
                                              <p className="font-medium text-[#3478C9] mt-0.5">
                                                {selectedCoord.receivingBureau}
                                              </p>
                                            </div>
                                        </div>

                                            <div className="text-[13px] space-y-1">
                                              <span className="font-medium text-[#171923]">
                                                Consultation Purpose:
                                              </span>
                                                <p className="font-normal text-[#171923] p-3 bg-[#F7F8FA] rounded-lg border border-[#E8EAF0] leading-relaxed">
                                                  {selectedCoord.purpose}
                                                </p>
                                            </div>

                                                <div className="text-[13px] space-y-1">
                                                  <span className="font-medium text-[#171923]">Docket Evidence References:</span>
                                                  <ul className="space-y-1">
                                                    {selectedCoord.evidence.map((e, idx) => (
                                                      <li
                                                        key={idx}
                                                        className="p-2.5 bg-[#F7F8FA] rounded-lg border border-[#E8EAF0] text-[#171923] flex items-center gap-2"
                                                      >
                                                        <span className="w-1.5 h-1.5 rounded-full bg-[#6246EA]" />
                                                        <span>{e}</span>
                                                      </li>
                                                    ))}
                                                  </ul>
                                                </div>

                                                {selectedCoord.decision && (
                                                      <div className="p-3.5 bg-[#E8F8F2] border border-[#D1F0E4] rounded-lg text-[13px]">
                                                        <p className="font-medium text-[#078B68]">
                                                          Formal Harmonized Decision: {selectedCoord.decision}
                                                        </p>
                                                        <p className="text-[#667085] mt-1">{selectedCoord.decisionNotes}</p>
                                                      </div>
            )}

                                                      {selectedCoord.status !== "completed" && (
                                                        <div className="space-y-1.5 pt-2 border-t border-[#E8EAF0]">
                                                            <label className="text-[13px] font-medium text-[#171923]">
                                                              Formalize Joint Resolution / Reconciled Directive:
                                                            </label>
                                                            <textarea
                                                              value={decisionNotes}
                                                              onChange={(e) => setDecisionNotes(e.target.value)}
                                                              placeholder="Enter hearing minutes, conciliation terms, or reconciled instruction..."
                                                              rows={3}
                                                              className="w-full p-3 bg-[#F7F8FA] border border-[#E8EAF0] rounded-lg text-[13px] text-[#171923] focus:outline-none focus:border-[#6246EA] focus:bg-white transition-colors"
                                                            />
                                                        </div>
                                                      )}

                                                        <div className="flex items-center justify-end gap-2.5 pt-3.5 border-t border-[#E8EAF0] text-[13px]">
                                                          <button
                                                            onClick={() => setSelectedCoord(null)}
                                                            className="h-9 px-4 rounded-lg font-medium bg-[#F7F8FA] text-[#667085] hover:text-[#171923] border border-[#E8EAF0] transition-colors"
                                                          >
                                                            Close
                                                          </button>
                                                          {selectedCoord.status !== "completed" && (
                                                            <button
                                                              onClick={() => handleResolve(selectedCoord.id)}
                                                              className="h-9 px-4 rounded-lg font-medium bg-[#6246EA] hover:bg-[#5338D6] text-white flex items-center gap-2 shadow-xs transition-colors"
                                                            >
                                                              <FileCheck2 className="w-4 h-4" />
                                                              <span>Seal Joint Resolution</span>
                                                            </button>
                                                          )}
                                                        </div>
                                                      </div>
                                                  </div>
                                                )}
                                            </div>
                                            );
}
