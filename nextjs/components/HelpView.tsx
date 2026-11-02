"use client";

import React from "react";
import { HelpCircle, BookOpen, ExternalLink, ShieldCheck, Mail } from "lucide-react";

export default function HelpView() {
  const faqs = [
    {
      q: "What is SYNAPSE and how does it prevent regulatory blind spots?",
      a: "SYNAPSE is the AICTE Institution Intelligence & Cross-Bureau Engine developed for the Smart India Hackathon 2026. It unifies case files, approval records, vigilance warnings, and examination notices across 7 AICTE bureaus into a single 360° institution graph to prevent conflicting orders.",
    },
    {
      q: "How does the AI Overlap Engine calculate conflict scores?",
      a: "The engine runs a three-factor evaluation: (1) Deterministic AISHE and alias match (0-100%), (2) Semantic NLP embedding similarity across complaint texts (0-100%), and (3) Symbolic regulatory logic conflict detection (checking if one bureau is issuing approval while another is issuing a freeze or audit).",
    },
    {
      q: "What is the Inter-Bureau Coordination protocol?",
      a: "When a potential overlap is confirmed by a Reviewing Officer, a formal coordination consultation docket is launched. Participating bureaus must reconcile directives before any formal communication or penalty is dispatched to the institution.",
    },
    {
      q: "How does Role-Based Access Control (RBAC) work across the 5 portals?",
      a: "SYNAPSE provides five distinct institutional portals: (1) Central Administrator (Full cross-bureau conflict surveillance and conciliation dispatch), (2) Bureau Officer (Scoped to specific regulatory bureau filings), (3) HEI Administrator (Institutional compliance standing and affidavits), (4) Auditor (Statutory SLA benchmarks and cryptographic ledger), and (5) Super Administrator (Core AI engine parameters, symbolic rulebase, and RBAC matrix).",
    },
  ];

  return (
    <div className="max-w-4xl space-y-6">
            <div className="bg-white border border-[#E8EAF0] rounded-xl card-shadow p-6 flex items-center justify-between">
              <div className="space-y-1">
                <h1 className="text-[26px] font-medium text-[#171923] tracking-tight leading-tight">
                  SYNAPSE Intelligence Portal Documentation & Support
                </h1>
                  <p className="text-[13px] text-[#667085] leading-relaxed">
                    Operational guidelines, regulatory protocols, and SIH 2026 reference architecture.
                  </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border border-[#E8EAF0] rounded-xl card-shadow p-5 flex flex-col justify-between">
                  <div>
                    <BookOpen className="w-5 h-5 text-[#6246EA] mb-3" />
                    <h3 className="text-[14px] font-medium text-[#171923] mb-1">Standard Operating Procedures</h3>
                    <p className="text-[13px] text-[#667085] mb-4 leading-relaxed font-normal">
                      Read AICTE regulatory compliance manuals and cross-bureau arbitration directives.
                    </p>
                  </div>
                  <a
                    href="https://www.aicte-india.org"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[13px] font-medium text-[#6246EA] hover:underline flex items-center gap-1.5"
                  >
                    <span>View AICTE Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                    <div className="bg-white border border-[#E8EAF0] rounded-xl card-shadow p-5 flex flex-col justify-between">
                      <div>
                        <ShieldCheck className="w-5 h-5 text-[#078B68] mb-3" />
                        <h3 className="text-[14px] font-medium text-[#171923] mb-1">Audit & Integrity</h3>
                        <p className="text-[13px] text-[#667085] mb-4 leading-relaxed font-normal">
                          All conciliation minutes and overlap reviews are sealed with SHA-256 cryptographic hashes.
                        </p>
                      </div>
                      <span className="text-[11px] text-[#078B68] font-medium bg-[#E8F8F2] px-2.5 py-1 rounded-md border border-[#D1F0E4] inline-block w-fit font-mono">
                        Tamper-Evident Ledger
                      </span>
                    </div>

                        <div className="bg-white border border-[#E8EAF0] rounded-xl card-shadow p-5 flex flex-col justify-between">
                          <div>
                            <Mail className="w-5 h-5 text-[#3478C9] mb-3" />
                            <h3 className="text-[14px] font-medium text-[#171923] mb-1">Technical Secretariat</h3>
                            <p className="text-[13px] text-[#667085] mb-4 leading-relaxed font-normal">
                              Need system assistance or AICTE data pipeline integration support?
                            </p>
                          </div>
                          <span className="text-[12px] font-medium text-[#171923] font-mono">
                            support@synapse-aicte.gov.in
                          </span>
                        </div>
                    </div>

                    {/* FAQs */}
                        <div className="bg-white border border-[#E8EAF0] rounded-xl card-shadow p-6 space-y-4">
                          <h2 className="text-[13px] font-semibold text-[#171923] flex items-center gap-2 pb-3.5 border-b border-[#E8EAF0] uppercase tracking-wide">
                            <HelpCircle className="w-4 h-4 text-[#6246EA]" />
                            Frequently Asked Questions
                          </h2>

                          <div className="space-y-3">
                            {faqs.map((faq, idx) => (
                                <div key={idx} className="p-4 rounded-lg bg-[#F7F8FA] border border-[#E8EAF0] space-y-1.5">
                                  <h4 className="text-[13px] font-medium text-[#171923]">{faq.q}</h4>
                                  <p className="text-[13px] text-[#667085] leading-relaxed font-normal">{faq.a}</p>
                                </div>
          ))}
                              </div>
      </div>
                        </div>
                        );
}
