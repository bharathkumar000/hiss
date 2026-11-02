import React from "react";

interface KpiCardProps {
  title: string;
  number: number | string;
  trend?: number; // positive = up, negative = down, omitted = neutral
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  number,
  trend = 0,
}) => {
  return (
      <div className="bg-white rounded-xl p-5 card-shadow border border-[#E8EAF0] space-y-2">
        <p className="text-[13px] font-medium text-[#667085]">{title}</p>
        <div className="flex items-baseline justify-between gap-2">
          <p className="text-[26px] font-semibold text-[#171923] tracking-tight tabular-nums">
            {number}
          </p>
          {trend !== undefined && trend !== 0 && (
            <span
              className={`text-[11px] font-medium px-2 py-0.5 rounded-md font-mono ${trend > 0
                  ? "bg-[#E8F8F2] text-[#078B68] border border-[#D1F0E4]"
                  : "bg-[#FDF2F4] text-[#D93649] border border-[#FAD2D8]"
                }`}
            >
              {trend > 0 ? "↑" : "↓"} {Math.abs(trend).toFixed(1)}%
            </span>
          )}
        </div>
      </div>
      );
};
