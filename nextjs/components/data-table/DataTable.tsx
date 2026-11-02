import React from "react";

interface DataTableProps {
  columns: string[];
  data: string[][];
  initialPage?: number;
  pageSize?: number;
}

export const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  initialPage = 1,
  pageSize = 10,
}) => {
  const pages = Math.ceil(data.length / (pageSize ?? 1));
  const page = Math.max(1, Math.min(initialPage, pages));
  const start = (page - 1) * (pageSize ?? 1);
  const end = start + (pageSize ?? 1);
  const pageData = data.slice(start, end);

  return (
          <div className="overflow-x-auto rounded-xl border border-[#E8EAF0] bg-white card-shadow">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-[#F7F8FA] border-b border-[#E8EAF0] text-[11px] font-medium text-[#667085] uppercase tracking-wider">
                <tr>
                  {columns.map((col) => (
                      <th key={col} className="py-3 px-4 font-medium">
                        {col}
                      </th>
            ))}
                    </tr>
        </thead>
                <tbody className="divide-y divide-[#E8EAF0]">
                  {pageData.map((row, i) => (
                      <tr key={i} className="hover:bg-[#F7F8FA] transition-colors">
                        {row.map((cell, j) => (
                            <td key={j} className="py-3 px-4 text-[#171923]">
                              {cell}
                            </td>
              ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
    </div>
                );
};
