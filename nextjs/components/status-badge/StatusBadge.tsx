import React from "react";

interface StatusBadgeProps {
  status: "new" | "open" | "pending" | "resolved" | "closed";
}

const statusClasses: Record<StatusBadgeProps["status"], string> = {
  new: "bg-[#F3F0FF] text-[#6246EA] border-[#E8EAF0]",
  open: "bg-[#EBF3FC] text-[#3478C9] border-[#D5E6F8]",
  pending: "bg-[#FCF8E8] text-[#C88918] border-[#F6E8B6]",
  resolved: "bg-[#E8F8F2] text-[#078B68] border-[#D1F0E4]",
  closed: "bg-[#F7F8FA] text-[#667085] border-[#E8EAF0]",
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
const classes = statusClasses[status] || statusClasses.closed;
return (
  <span
    className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium border uppercase tracking-wide font-mono ${classes}`}
  >
    {status}
  </span>
);
};
