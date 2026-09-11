import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: "1. Acceptance of Terms & Engagement Binding",
      content: `These Terms of Service ("Terms", "Agreement") constitute a legally binding contract between Astrivix Corp ("Astrivix", "Company", "we", "us", or "our") and any entity, organization, or individual ("Client", "User", "you") accessing www.astrivix.in ("Website") or engaging Astrivix for enterprise web development, mobile application engineering, brand architecture, performance marketing, graphic design, motion graphics, or business consulting services ("Services").

By executing a Statement of Work (SOW), issuing a purchase order, accessing our digital platforms, or remitting payment for Services, you explicitly accept and agree to be bound by these Terms. If you are entering into this Agreement on behalf of a corporation or legal entity, you warrant that you possess full authority to bind such entity.`
    },
    {
      title: "2. Scope of Services & Statement of Work (SOW)",
      content: `A. Service Delivery: Astrivix delivers bespoke digital engineering and agency services strictly in accordance with approved Statements of Work, Master Services Agreements (MSAs), or project proposals.

B. Scope Revisions & Change Orders: Any request for feature additions, design alterations, performance enhancements, or structural revisions outside the explicitly defined deliverables in an active SOW shall be evaluated via a formal Change Order process. Change Orders will detail modified milestones, delivery timelines, and associated fee adjustments.`
    },
    {
      title: "3. Intellectual Property Rights & Work Product Assignment",
      content: `A. Client Work Product: Upon full and final settlement of all invoiced fees associated with a specific project, Astrivix assigns to Client all right, title, and interest (including copyright and trademark rights) in the final bespoke deliverables (custom source code, logos, visual assets, and UI components created specifically for Client).

B. Astrivix Pre-Existing IP & Frameworks: Astrivix retains exclusive ownership of all pre-existing technology, proprietary frameworks, modular libraries, baseline algorithms, 3D shader code, development workflows, and agency toolsets ("Astrivix IP"). Client is granted a perpetual, non-exclusive, worldwide, royalty-free license to use Astrivix IP solely as integrated within the final delivered Work Product.`
    },
    {
      title: "4. Billing, Invoicing & Payment Terms",
      content: `A. Fee Schedules: Project fees, retainers, and milestone payments are established in the applicable SOW or proposal.

B. Payment Obligations: Invoices are payable within fourteen (14) calendar days of issuance unless otherwise stipulated in writing. Late payments incur interest at a rate of 1.5% per month (or the maximum statutory rate permitted by law).

C. Suspension of Services: Astrivix reserves the right to suspend active project development, withhold final code deployment, or pause cloud hosting management if invoice payments remain past due for more than thirty (30) calendar days.`
    },
    {
      title: "5. Client Warranties & Obligations",
      content: `Client agrees to:
1. Timely Asset Delivery: Provide required branding materials, content, legal disclosures, API access keys, and technical credentials in a timely manner.
2. Ownership Rights: Warrant that all content, logos, copy, images, and data provided to Astrivix do not infringe upon any third-party patent, trademark, copyright, or trade secret.
3. Review & Approvals: Review milestone builds and provide consolidated feedback within five (5) business days of milestone delivery.`
    },
    {
      title: "6. Confidentiality & Non-Disclosure",
      content: `Both parties agree to treat all non-public technical information, source code, financial projections, business strategies, and client data disclosed during the engagement as strictly confidential ("Confidential Information").

Neither party shall disclose Confidential Information to any third party without prior written consent, except to employees, subcontractors, or legal advisors bound by equivalent non-disclosure obligations, or when required by legal process.`
    },
    {
      title: "7. Performance Guarantees & Service Level Standards",
      content: `Astrivix guarantees that all delivered software systems, React web applications, and mobile platforms will meet the technical performance specifications defined in the SOW (including Core Web Vitals optimization and zero-lag baseline performance).

Astrivix provides a thirty (30) day post-launch warranty period during which any reproducible technical bugs, code errors, or broken component functionality resulting from Astrivix's original development will be remediated at zero additional cost.`
    },
    {
      title: "8. Warranties Disclaimer",
      content: `EXCEPT AS EXPRESSLY PROVIDED HEREIN, ASTRIVIX SERVICES AND DELIVERABLES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. ASTRIVIX DISCLAIMS ALL OTHER WARRANTIES, EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. ASTRIVIX DOES NOT GUARANTEE UNINTERRUPTED OR ERROR-FREE OPERATION OF THIRD-PARTY CLOUD INFRASTRUCTURE (AWS, VERCEL, GOOGLE CLOUD) BEYOND CONTROL.`
    },
    {
      title: "9. Limitation of Liability",
      content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL ASTRIVIX CORP, ITS DIRECTORS, OFFICERS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, PUNITIVE, OR EXEMPLARY DAMAGES (INCLUDING LOSS OF PROFITS, REVENUE, DATA, OR BUSINESS OPPORTUNITY) ARISING OUT OF OR IN CONNECTION WITH THE SERVICES OR THESE TERMS.

ASTRIVIX'S TOTAL AGGREGATE LIABILITY FOR ANY CLAIM ARISING OUT OF THIS AGREEMENT SHALL NOT EXCEED THE TOTAL FEES ACTUALLY PAID BY CLIENT TO ASTRIVIX UNDER THE SPECIFIC SOW GIVING RISE TO LIABILITY IN THE SIX (6) MONTHS PRECEDING THE CLAIM.`
    },
    {
      title: "10. Indemnification",
      content: `Client agrees to defend, indemnify, and hold harmless Astrivix Corp and its personnel from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or related to: (a) Client's breach of these Terms; (b) Client-supplied content or intellectual property infringing third-party rights; or (c) Client's unauthorized modification or misuse of delivered software.`
    },
    {
      title: "11. Termination & Offboarding",
      content: `Either party may terminate an active engagement for cause if the other party materially breaches this Agreement and fails to cure such breach within fourteen (14) days of receiving written notice.

Upon termination, Client shall pay Astrivix for all work completed, hours accrued, and non-cancellable expenses incurred up to the effective date of termination. Astrivix will deliver all completed and in-progress Work Product corresponding to paid invoices.`
    },
    {
      title: "12. Governing Law & Dispute Resolution",
      content: `These Terms and any disputes arising under or related to them shall be governed by and construed in accordance with the substantive laws of India, without giving effect to conflicts of law principles.

Any dispute, controversy, or claim arising out of or relating to this Agreement shall be resolved first through good-faith executive negotiations. If unresolved within thirty (30) days, the dispute shall be submitted to binding arbitration in accordance with the Arbitration and Conciliation Act, 1996. The seat of arbitration shall be India, and the proceedings shall be conducted in English.`
    },
    {
      title: "13. Corporate Legal Inquiries",
      content: `For formal legal notices, contract inquiries, or governance questions, please contact our legal counsel:

Astrivix Corp — Corporate Legal Division
Email: legal@astrivix.in
Website: https://www.astrivix.in`
    }
  ];

  return (
    <div className="min-h-screen bg-[#050509] text-white pt-24 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-12 relative overflow-hidden font-sans">
      {/* Subtle Background Glow */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(120,120,150,0.1),transparent)]" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Back Button */}
        <motion.a
          href="/"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-white/60 hover:text-white uppercase mb-8 transition-colors group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> BACK TO ASTRIVIX
        </motion.a>

        {/* Title Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-metallic p-8 md:p-12 rounded-[2.5rem] border border-white/20 shadow-2xl mb-12 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
            <div>
              <span className="text-xs font-mono tracking-[0.3em] text-white/50 uppercase block mb-2">Master Enterprise Engagement Agreement</span>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase text-white">Terms of Service</h1>
            </div>
            <div className="text-left md:text-right text-xs font-mono text-white/40">
              <p>LAST REVISED: SEPTEMBER 2026</p>
              <p>VERSION: 2.4 ENTERPRISE</p>
            </div>
          </div>
          <p className="text-white/70 text-sm md:text-base leading-relaxed">
            This Master Agreement governs all corporate engagements, digital product deliveries, technical services, and software developments provided by Astrivix Corp worldwide.
          </p>
        </motion.div>

        {/* Structured Legal Sections */}
        <div className="flex flex-col gap-8">
          {sections.map((sec, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              className="glass-fast p-6 md:p-8 rounded-3xl border border-white/15 shadow-xl relative"
            >
              <h2 className="text-lg md:text-xl font-bold uppercase tracking-wider text-white mb-4 border-b border-white/10 pb-3">
                {sec.title}
              </h2>
              <div className="text-white/70 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-normal">
                {sec.content}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center border-t border-white/10 pt-8 text-xs font-mono text-white/40 uppercase tracking-widest">
          Astrivix Corp © 2026 • Master Corporate Terms of Service
        </div>

      </div>
    </div>
  );
}
