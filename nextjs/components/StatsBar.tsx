"use client";

import React from "react";
import {
  Building2,
  FileText,
  AlertTriangle,
  Users,
  ShieldCheck,
} from "lucide-react";

interface StatsBarProps {
  totalInstitutions: number;
  totalCases: number;
  totalOverlaps: number;
  totalCoordinations: number;
  onCardClick?: (tab: string) => void;
}

export default function StatsBar({
  totalInstitutions,
  totalCases,
  totalOverlaps,
  totalCoordinations,
  onCardClick,
}: StatsBarProps) {
  const metrics = [
    {
      id: "institutions",
      title: "Monitored HEIs",
      value: totalInstitutions.toString(),
      status: "+2.4%",
      statusColor: "text-[#078B68] bg-[#E8F8F2] border-[#D1F0E4]",
      caption: "100% AISHE mapped",
      icon: Building2,
    },
    {
      id: "cases",
      title: "Cross-Bureau Cases",
      value: totalCases.toString(),
      status: "2 Critical SLA",
      statusColor: "text-[#C88918] bg-[#FCF8E8] border-[#F6E8B6]",
      caption: "Across 7 AICTE bureaus",
      icon: FileText,
    },
    {
      id: "overlaps",
      title: "AI Overlaps Flagged",
      value: totalOverlaps.toString(),
      status: "Action Collision",
      statusColor: "text-[#D93649] bg-[#FDF2F4] border-[#FAD2D8]",
      caption: "91% Avg Confidence",
      icon: AlertTriangle,
    },
    {
      id: "coordination",
      title: "Active Consultations",
      value: totalCoordinations.toString(),
      status: "Harmonized",
      statusColor: "text-[#6246EA] bg-[#F3F0FF] border-[#E8EAF0]",
      caption: "1.8 days turnaround",
      icon: Users,
    },
    {
      id: "audit",
      title: "Collision Prevention Rate",
      value: "96.4%",
      status: "Zero Blindspots",
      statusColor: "text-[#078B68] bg-[#E8F8F2] border-[#D1F0E4]",
      caption: "Contradictory orders averted",
      icon: ShieldCheck,
    },
  ];

  return (
      <div className="bg-white border border-[#E8EAF0] rounded-xl card-shadow divide-y sm:divide-y-0 sm:divide-x divide-[#E8EAF0] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <button
              key={m.id}
              onClick={() => onCardClick && onCardClick(m.id)}
              className="p-5 text-left hover:bg-[#F7F8FA] transition-colors flex flex-col justify-between group focus:outline-none first:rounded-t-xl sm:first:rounded-l-xl sm:first:rounded-tr-none last:rounded-b-xl sm:last:rounded-r-xl sm:last:rounded-bl-none"
            >
                  <div className="flex items-center justify-between gap-2 mb-3 w-full">
                    <span className="text-[13px] font-medium text-[#667085]">
                      {m.title}
                    </span>
                    <Icon className="w-4 h-4 text-[#98A2B3] group-hover:text-[#171923] transition-colors shrink-0" />
                  </div>

                      <div className="flex items-baseline justify-between gap-2 mb-1.5 w-full">
                        <span className="text-[26px] font-semibold text-[#171923] tracking-tight tabular-nums">
                          {m.value}
                        </span>
                        <span
                          className={`text-[11px] font-medium px-2 py-0.5 rounded-md border font-mono ${m.statusColor}`}
                        >
                          {m.status}
                        </span>
                      </div>

                        <p className="text-[12px] text-[#98A2B3] font-normal">
                          {m.caption}
                        </p>
                      </button>
                      );
      })}
                  </div>
                  );
}
