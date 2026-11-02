"use client";

import React, { useState } from "react";
import { CaseItem } from "../lib/data";
import {
  Search,
  Plus,
  Clock,
  Sparkles,
  ArrowUpDown,
  Filter,
  Layers,
  ChevronDown,
  Building2,
  Calendar,
  User,
  ShieldAlert,
  X,
} from "lucide-react";

interface CaseRegistryProps {
  cases: CaseItem[];
  onOpenNewCaseModal: () => void;
  onOpenOverlapForCase: (caseItem: CaseItem) => void;
}

export default function CaseRegistry({
  cases,
  onOpenNewCaseModal,
  onOpenOverlapForCase,
}: CaseRegistryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBureau, setSelectedBureau] = useState("ALL");
  const [selectedPriority, setSelectedPriority] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null);
  const [sortField, setSortField] = useState<"caseNumber" | "dueDate" | "priority">("caseNumber");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const bureaus = [
    "ALL",
    "Admissions",
    "Approval Bureau",
    "Examinations",
    "Vigilance Bureau",
    "Grievance Cell",
    "Research & Grants",
  ];

  // Summary Metrics
  const totalCount = cases.length;
  const activeCount = cases.filter((c) => c.status === "open" || c.status === "new").length;
  const criticalCount = cases.filter((c) => c.priority === "critical").length;
  const pendingCount = cases.filter((c) => c.status === "pending").length;

  const handleSort = (field: "caseNumber" | "dueDate" | "priority") => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const filteredCases = cases
    .filter((c) => {
      const matchesSearch =
        c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.institutionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.ownerName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesBureau =
        selectedBureau === "ALL" || c.bureau === selectedBureau;
      const matchesPriority =
        selectedPriority === "ALL" || c.priority === selectedPriority;
      const matchesStatus =
        selectedStatus === "ALL" || c.status === selectedStatus;

      return matchesSearch && matchesBureau && matchesPriority && matchesStatus;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortField === "caseNumber") {
        comparison = a.caseNumber.localeCompare(b.caseNumber);
      } else if (sortField === "dueDate") {
        comparison = a.dueDate.localeCompare(b.dueDate);
      } else if (sortField === "priority") {
        const pOrder: Record<string, number> = { critical: 4, high: 3, medium: 2, low: 1 };
        comparison = (pOrder[b.priority] || 0) - (pOrder[a.priority] || 0);
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

  return (
          <div className="space-y-6">
            {/* Top Banner */}
            <div className="bg-white border border-[#E8EAF0] rounded-xl card-shadow p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-[26px] font-medium text-[#171923] tracking-tight leading-tight">
                      Cross-Bureau Case Registry
                    </h1>
                      <span className="font-mono text-[11px] text-[#6246EA] bg-[#F3F0FF] px-2 py-0.5 rounded-md border border-[#E8EAF0] font-medium">
                        Statutory Docket
                      </span>
                    </div>
                      <p className="text-[13px] text-[#667085] leading-relaxed">
                        Centralized intake docket across 7 AICTE bureaus with automated SLA timers and conflict surveillance.
                      </p>
                    </div>

                    <button
                      onClick={onOpenNewCaseModal}
                      className="h-9 px-4 rounded-lg text-[13px] font-medium bg-[#6246EA] hover:bg-[#5338D6] text-white transition-colors flex items-center gap-2 shrink-0 shadow-xs"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Register New Case</span>
                    </button>
                </div>

                    {/* Case Metrics Strip */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="bg-white border border-[#E8EAF0] rounded-xl card-shadow p-4 flex justify-between items-center">
                        <div>
                          <span className="text-[11px] font-medium uppercase text-[#667085] tracking-wide">Total Cases</span>
                          <div className="text-[24px] font-semibold text-[#171923] font-mono tabular-nums mt-0.5">{totalCount}</div>
                        </div>
                        <div className="w-8 h-8 rounded-lg bg-[#F7F8FA] border border-[#E8EAF0] flex items-center justify-center text-[#667085]">
                          <Layers className="w-4 h-4" />
                        </div>
                      </div>

                        <div className="bg-white border border-[#E8EAF0] rounded-xl card-shadow p-4 flex justify-between items-center">
                          <div>
                            <span className="text-[11px] font-medium uppercase text-[#667085] tracking-wide">Active Cases</span>
                            <div className="text-[24px] font-semibold text-[#078B68] font-mono tabular-nums mt-0.5">{activeCount}</div>
                          </div>
                          <div className="w-8 h-8 rounded-lg bg-[#E8F8F2] border border-[#D1F0E4] flex items-center justify-center text-[#078B68]">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#078B68]" />
                          </div>
                        </div>

                          <div className="bg-white border border-[#E8EAF0] rounded-xl card-shadow p-4 flex justify-between items-center">
                            <div>
                              <span className="text-[11px] font-medium uppercase text-[#667085] tracking-wide">Critical SLA</span>
                              <div className="text-[24px] font-semibold text-[#D93649] font-mono tabular-nums mt-0.5">{criticalCount}</div>
                            </div>
                            <div className="w-8 h-8 rounded-lg bg-[#FDF2F4] border border-[#FAD2D8] flex items-center justify-center text-[#D93649]">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#D93649]" />
                            </div>
                          </div>

                            <div className="bg-white border border-[#E8EAF0] rounded-xl card-shadow p-4 flex justify-between items-center">
                              <div>
                                <span className="text-[11px] font-medium uppercase text-[#667085] tracking-wide">Pending Review</span>
                                <div className="text-[24px] font-semibold text-[#C88918] font-mono tabular-nums mt-0.5">{pendingCount}</div>
                              </div>
                              <div className="w-8 h-8 rounded-lg bg-[#FCF8E8] border border-[#F6E8B6] flex items-center justify-center text-[#C88918]">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#C88918]" />
                              </div>
                            </div>
                          </div>

                          {/* Filter and Search Bar */}
                              <div className="bg-white border border-[#E8EAF0] rounded-xl card-shadow p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
                                <div className="relative flex-1 max-w-sm">
                                  <Search className="w-4 h-4 text-[#98A2B3] absolute left-3 top-2.5" />
                                  <input
                                    type="text"
                                    placeholder="Search by ID, institution, subject, officer..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-9 pr-3 h-9 bg-[#F7F8FA] border border-[#E8EAF0] rounded-lg text-[13px] text-[#171923] placeholder-[#98A2B3] focus:outline-none focus:border-[#6246EA] focus:bg-white transition-colors"
                                  />
                                </div>

                                <div className="flex flex-wrap items-center gap-2">
                                  <select
                                    value={selectedBureau}
                                    onChange={(e) => setSelectedBureau(e.target.value)}
                                    className="h-9 bg-[#F7F8FA] border border-[#E8EAF0] rounded-lg px-3 text-[13px] text-[#171923] focus:outline-none focus:border-[#6246EA] transition-colors"
                                  >
                                    {bureaus.map((b) => (
                                      <option key={b} value={b}>
                                        {b === "ALL" ? "All Bureaus" : b}
                                      </option>
                                    ))}
                                  </select>

                                  <select
                                    value={selectedPriority}
                                    onChange={(e) => setSelectedPriority(e.target.value)}
                                    className="h-9 bg-[#F7F8FA] border border-[#E8EAF0] rounded-lg px-3 text-[13px] text-[#171923] focus:outline-none focus:border-[#6246EA] transition-colors"
                                  >
                                    <option value="ALL">All Priorities</option>
                                    <option value="critical">Critical</option>
                                    <option value="high">High</option>
                                    <option value="medium">Medium</option>
                                    <option value="low">Low</option>
                                  </select>

                                  <select
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    className="h-9 bg-[#F7F8FA] border border-[#E8EAF0] rounded-lg px-3 text-[13px] text-[#171923] focus:outline-none focus:border-[#6246EA] transition-colors"
                                  >
                                    <option value="ALL">All Statuses</option>
                                    <option value="new">New</option>
                                    <option value="open">Open</option>
                                    <option value="pending">Pending</option>
                                    <option value="resolved">Resolved</option>
                                  </select>

                                    <span className="text-[12px] font-mono text-[#667085] px-2 tabular-nums">
                                      {filteredCases.length} records
                                    </span>
                                </div>
                              </div>

                                {/* Main Table */}
                                <div className="bg-white border border-[#E8EAF0] rounded-xl card-shadow overflow-hidden">
                                  <div className="overflow-x-auto">
                                        <table className="w-full text-left text-[13px]">
                                          <thead className="bg-[#F7F8FA] border-b border-[#E8EAF0] text-[11px] font-medium text-[#667085] uppercase tracking-wider">
                                            <tr>
                                              <th
                                                onClick={() => handleSort("caseNumber")}
                                                className="py-3 px-4 cursor-pointer hover:text-[#171923] select-none font-medium"
                                              >
                                                  <div className="flex items-center gap-1.5">
                                                    <span>Case ID</span>
                                                    <ArrowUpDown className="w-3.5 h-3.5 text-[#98A2B3]" />
                                                  </div>
                                              </th>
                                              <th className="py-3 px-4 font-medium">Institution</th>
                                              <th className="py-3 px-4 font-medium">Bureau</th>
                                              <th className="py-3 px-4 font-medium">Subject</th>
                                              <th
                                                onClick={() => handleSort("priority")}
                                                className="py-3 px-4 cursor-pointer hover:text-[#171923] select-none font-medium"
                                              >
                                                  <div className="flex items-center gap-1.5">
                                                    <span>Priority</span>
                                                    <ArrowUpDown className="w-3.5 h-3.5 text-[#98A2B3]" />
                                                  </div>
                                              </th>
                                              <th className="py-3 px-4 font-medium">Status</th>
                                              <th className="py-3 px-4 font-medium">Assigned Officer</th>
                                              <th
                                                onClick={() => handleSort("dueDate")}
                                                className="py-3 px-4 cursor-pointer hover:text-[#171923] select-none font-medium"
                                              >
                                                  <div className="flex items-center gap-1.5">
                                                    <span>SLA Deadline</span>
                                                    <ArrowUpDown className="w-3.5 h-3.5 text-[#98A2B3]" />
                                                  </div>
                                              </th>
                                              <th className="py-3 px-4 text-right font-medium">Actions</th>
                                            </tr>
                                          </thead>
                                          <tbody className="divide-y divide-[#E8EAF0]">
                                            {filteredCases.map((c) => (
                                              <tr
                                                key={c.id}
                                                onClick={() => setSelectedCase(c)}
                                                className="hover:bg-[#F7F8FA] transition-colors cursor-pointer group"
                                              >
                                                {/* 1. Case ID */}
                                                    <td className="py-3.5 px-4">
                                                      <span className="font-mono text-[13px] font-medium text-[#6246EA] block group-hover:underline">
                                                        {c.caseNumber}
                                                      </span>
                                                      {c.hasOverlapAlert && (
                                                          <span className="inline-block mt-1 text-[10px] font-medium text-[#D93649] bg-[#FDF2F4] px-1.5 py-0.5 rounded border border-[#FAD2D8]">
                                                            Collision Alert
                                                          </span>
                    )}
                                                        </td>

                  {/* 2. Institution */}
                                                        <td className="py-3.5 px-4 font-normal text-[#171923] max-w-[200px]">
                                                          <span className="block truncate text-[13px] font-medium">{c.institutionName}</span>
                                                          <span className="text-[11px] text-[#98A2B3] font-mono">{c.category}</span>
                                                        </td>

                                                        {/* 3. Bureau */}
                                                            <td className="py-3.5 px-4">
                                                              <span className="text-[11px] font-medium text-[#171923] bg-[#F7F8FA] px-2 py-0.5 rounded-md border border-[#E8EAF0] whitespace-nowrap">
                                                                {c.bureau}
                                                              </span>
                                                            </td>

                                                            {/* 4. Subject */}
                                                                <td className="py-3.5 px-4 max-w-xs">
                                                                  <p className="text-[13px] font-normal text-[#171923] truncate">
                                                                    {c.subject}
                                                                  </p>
                                                                  <p className="text-[11px] text-[#667085] truncate mt-0.5">
                                                                    {c.description}
                                                                  </p>
                                                                </td>

                                                                {/* 5. Priority */}
                                                                  <td className="py-3.5 px-4">
                                                                    <span
                                                                      className={`text-[11px] font-medium px-2 py-0.5 rounded-md border font-mono ${
                                                                        c.priority === "critical"
                                                                          ? "bg-[#FDF2F4] text-[#D93649] border border-[#FAD2D8]"
                                                                          : c.priority === "high"
                                                                              ? "bg-[#FCF8E8] text-[#C88918] border border-[#F6E8B6]"
                                                                              : "bg-[#EBF3FC] text-[#3478C9] border border-[#D5E6F8]"
                                                                      }`}
                                                                    >
                                                                      {c.priority.toUpperCase()}
                                                                    </span>
                                                                  </td>

                  {/* 6. Status */}
                  <td className="py-3.5 px-4">
                    <span
                                                                      className = {`text-[11px] font-medium px-2 py-0.5 rounded-md border font-mono ${c.status === "open"
                                                                            ? "bg-[#EBF3FC] text-[#3478C9] border-[#D5E6F8]"
                                                                            : c.status === "new"
                                                                              ? "bg-[#F3F0FF] text-[#6246EA] border-[#E8EAF0]"
                                                                          : "bg-[#E8F8F2] text-[#078B68] border-[#D1F0E4]"
                                                                        }`}
                    >
                                                                    {c.status.toUpperCase()}
                                                                  </span>
                                                                </td>

                                                                {/* 7. Assigned Officer */}
                                                                  <td className="py-3.5 px-4 text-[12px]">
                                                                    <span className="font-medium text-[#171923] block">{c.ownerName}</span>
                                                                    <span className="text-[#98A2B3] text-[11px]">{c.ownerBureau}</span>
                                                                  </td>

                                                                  {/* 8. SLA Deadline */}
                                                                      <td className="py-3.5 px-4 text-[12px] font-mono tabular-nums">
                                                                        <span className="text-[#171923] font-medium flex items-center gap-1.5">
                                                                          <Clock className="w-3.5 h-3.5 text-[#98A2B3]" />
                                                                          {c.dueDate}
                                                                        </span>
                                                                      </td>

                                                                      {/* 9. Actions */}
                                                                        <td className="py-3.5 px-4 text-right">
                                                                          <button
                                                                            onClick={(e) => {
                                                                              e.stopPropagation();
                                                                              onOpenOverlapForCase(c);
                                                                            }}
                                                                            className="p-1.5 rounded-lg hover:bg-[#F3F0FF] text-[#667085] hover:text-[#6246EA] transition-colors"
                                                                            title="Inspect Overlap Engine"
                                                                          >
                                                                            <Sparkles className="w-4 h-4" />
                                                                          </button>
                                                                        </td>
                                                                      </tr>
              ))}
                                                                    </tbody>
                                                                  </table>
                                                                </div>
                                                              </div>

                                                              {/* Case Details Modal */}
                                                              {selectedCase && (
                                                                <div className="fixed inset-0 bg-black/40 backdrop-blur-2xs z-50 flex items-center justify-center p-4">
                                                                      <div className="bg-white border border-[#E8EAF0] rounded-xl max-w-xl w-full p-6 modal-shadow space-y-4 animate-in fade-in zoom-in-95">
                                                                        <div className="flex items-start justify-between pb-3.5 border-b border-[#E8EAF0]">
                                                                          <div>
                                                                            <div className="flex items-center gap-2">
                                                                                <span className="font-mono text-[13px] font-medium text-[#6246EA]">
                                                                                  {selectedCase.caseNumber}
                                                                                </span>
                                                                                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-[#F7F8FA] border border-[#E8EAF0] text-[#667085]">
                                                                                    {selectedCase.bureau}
                                                                                  </span>
                                                                                  <span
                                                                                    className={`text-[11px] font-medium px-2 py-0.5 rounded-md border font-mono ${
                                                                                      selectedCase.priority === "critical"
                                                                                        ? "bg-[#FDF2F4] text-[#D93649] border border-[#FAD2D8]"
                                                                                        : "bg-[#EBF3FC] text-[#3478C9] border border-[#D5E6F8]"
                                                                                    }`}
                                                                                  >
                                                                                    {selectedCase.priority.toUpperCase()} SLA
                                                                                  </span>
                </div>
                <h3 className="text-[16px] font-medium text-[#171923] mt-2 leading-snug">
                  {selectedCase.subject}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCase(null)}
                className="p-1 text-[#98A2B3] hover:text-[#171923] rounded-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-[13px]">
              <div className="p-3.5 bg-[#F7F8FA] rounded-lg border border-[#E8EAF0]">
                <span className="text-[11px] uppercase font-mono text-[#667085] font-medium">Institution</span>
                <p className="font-medium text-[#171923] mt-1">{selectedCase.institutionName}</p>
              </div>
              <div className="p-3.5 bg-[#F7F8FA] rounded-lg border border-[#E8EAF0]">
                <span className="text-[11px] uppercase font-mono text-[#667085] font-medium">Assigned Officer</span>
                <p className="font-medium text-[#171923] mt-1">{selectedCase.ownerName}</p>
                <span className="text-[11px] text-[#667085]">{selectedCase.ownerBureau}</span>
              </div>
            </div>

            <div className="text-[13px] space-y-1.5">
              <span className="font-medium text-[#171923]">Statutory Matter & Findings:</span>
              <p className="p-3.5 bg-[#F7F8FA] rounded-lg border border-[#E8EAF0] text-[#171923] leading-relaxed font-normal">
                {selectedCase.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3.5 border-t border-[#E8EAF0] text-[13px]">
              <span className="text-[#667085] font-mono text-[12px]">
                Statutory Deadline: <strong className="text-[#C88918] font-medium">{selectedCase.dueDate}</strong>
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    onOpenOverlapForCase(selectedCase);
                    setSelectedCase(null);
                  }}
                  className="h-9 px-4 rounded-lg font-medium bg-[#6246EA] text-white text-[13px] hover:bg-[#5338D6] transition-colors shadow-xs"
                >
                  Inspect Overlap Engine
                </button>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="h-9 px-3.5 rounded-lg font-medium bg-[#F7F8FA] text-[#667085] hover:text-[#171923] border border-[#E8EAF0] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
