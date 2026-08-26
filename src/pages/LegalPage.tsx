import { Link } from "react-router-dom";

type LegalType = "privacy" | "terms" | "security";

const legalContent: Record<LegalType, { title: string; subtitle: string; intro?: string; sections: { heading: string; body: string }[] }> = {
  privacy: {
    title: "Privacy Policy",
    subtitle: "How Roji Roti handles your personal information and protects your data.",
    intro:
      "Roji Roti processes personal and recruitment-related information in order to operate the platform, match users with opportunities, and support lawful employment and hiring activities.",
    sections: [
      {
        heading: "Information we collect",
        body: "We may collect profile information, contact details, education and employment history, skills, resume documents, location preferences, account activity, and communications needed to operate the platform and support recruitment workflows.",
      },
      {
        heading: "How we use your data",
        body: "We use the information to create and manage accounts, match candidates with relevant jobs, enable employer communication, prevent fraud and misuse, maintain platform security, and comply with applicable legal obligations.",
      },
      {
        heading: "Your rights and choices",
        body: "You may access, correct, or update some information through your account dashboard and can contact us for data-related requests, account support, or clarification about processing activities, subject to applicable law.",
      },
      {
        heading: "Third-party sharing",
        body: "We may share information with employers, recruiters, service providers, and legal authorities where required or permitted by the platform’s purpose, consent obligations, or applicable law.",
      },
    ],
  },
  terms: {
    title: "Terms & Conditions",
    subtitle: "Job Seeker Registration, Usage & Data Protection Terms and Conditions.",
    intro:
      "These Terms govern the registration and use of the recruitment and job-search platform operated by Rojiroti. By creating an account, uploading a resume, applying for a job, or otherwise using the Platform, you confirm that you have read, understood, and accepted these Terms.",
    sections: [
      {
        heading: "1. Eligibility and accuracy",
        body: "You represent and warrant that the information provided during registration is accurate and current. You must provide correct name, contact details, educational qualifications, employment history, skills, and other information requested by the Platform. You shall not create an account using another person's identity or credentials.",
      },
      {
        heading: "2. Account registration and confidentiality",
        body: "You are responsible for maintaining the confidentiality of your account credentials and shall not share your password, OTP, or other authentication details with any third party. You must promptly update your profile if material information changes and notify the Company immediately if you suspect unauthorized access.",
      },
      {
        heading: "3. Authenticity of information and documents",
        body: "You shall not submit false, fabricated, misleading, or fraudulent information. You shall not falsely claim education, certifications, experience, job titles, skills, salary history, identity, or professional affiliations. You shall not upload another person’s resume, documents, photograph, or identity information without lawful authority.",
      },
      {
        heading: "4. Resume and document uploads",
        body: "You may upload your own resume/CV and related documents for legitimate recruitment purposes. You are responsible for ensuring the documents do not contain malicious software, unauthorized third-party personal information, confidential employer information, trade secrets, copyrighted content without permission, or other unlawful material.",
      },
      {
        heading: "5. Personal data and privacy",
        body: "The Company may collect and process your personal data for legitimate recruitment and employment-related purposes, including account management, job matching, communication, fraud prevention, security monitoring, and compliance with applicable laws. Processing shall be done in accordance with applicable Indian data-protection laws, including the Digital Personal Data Protection Act, 2023, as and when applicable.",
      },
      {
        heading: "6. Notice and consent",
        body: "By using the Platform, you acknowledge that you have access to the applicable Privacy Notice explaining the categories of data collected, purposes of processing, and rights and mechanisms available to you. Where consent is legally required, you may provide or withdraw consent according to the applicable law and the Company’s mechanisms.",
      },
      {
        heading: "7. Sharing profile with employers and recruiters",
        body: "Depending on the Platform’s features and privacy settings, your profile and recruitment-related information may be shared with prospective employers, recruiters, or authorized recruitment participants. The Company does not guarantee that any employer or recruiter will contact you, shortlist you, interview you, or offer employment.",
      },
      {
        heading: "8. Prohibited activities",
        body: "You shall not use the Platform to create fake or fraudulent profiles, impersonate another person, post false job opportunities, solicit money without authorization, distribute malware, harass or abuse another user, upload unlawful content, collect user information without permission, bypass security controls, or otherwise violate law or these Terms.",
      },
      {
        heading: "9. Fraud and financial safety",
        body: "The Company does not authorize any person to collect unlawful payment from a job seeker in exchange for guaranteed employment. You should exercise caution before making payments or sharing financial, account, or authentication information with any party claiming to represent an employer or recruiter.",
      },
      {
        heading: "10. Communications",
        body: "By registering on the Platform, you may receive communications relating to account creation, profile verification, job applications, interviews, security alerts, service updates, and other communications permitted under applicable law. Promotional communications will only be sent where permitted and as applicable law permits.",
      },
      {
        heading: "11. Intellectual property",
        body: "The Platform, including its software, design, logos, trademarks, content, and technology, is owned by or licensed to the Company. You shall not copy, modify, distribute, reverse engineer, scrape, sell, or commercially exploit the Platform or its proprietary content except as expressly permitted by law or with prior written authorization.",
      },
      {
        heading: "12. Third-party services and employers",
        body: "The Platform may contain links, job postings, or services provided by third parties. The Company does not guarantee the authenticity of every third-party posting or the conduct of every employer or recruiter. You should independently verify material employment-related information before accepting an offer or sharing sensitive information.",
      },
      {
        heading: "13. Security, retention and deletion",
        body: "We implement reasonable security safeguards appropriate to the nature of the data and applicable legal requirements, but no online system can be guaranteed completely secure. Personal data may be retained as long as reasonably necessary for the purposes described in the Company’s Privacy Notice and as required by law. You may request deletion or correction through the mechanisms made available by the Company, subject to legal requirements and retention obligations.",
      },
      {
        heading: "14. User-generated content and account suspension",
        body: "You are responsible for content uploaded or submitted by you. The Company may remove or restrict content that violates these Terms, applicable law, or Platform policies. The Company may suspend, restrict, or terminate an account where necessary due to fraud, security threats, misuse of another person’s personal information, or violation of Platform rules.",
      },
      {
        heading: "15. Grievance redressal",
        body: "Any complaint concerning the Platform, account access, data processing, or fraudulent activity may be submitted to the grievance officer or email contact listed by the Company. Complaints will be handled in accordance with applicable law and the Company’s grievance-redressal process.",
      },
      {
        heading: "16. Governing law and jurisdiction",
        body: "These Terms shall be governed by the laws of India. Subject to applicable law, disputes shall be subject to the jurisdiction of the competent courts at Noida, Uttar Pradesh. Nothing in this clause prevents you from exercising any statutory right or remedy available under Indian law.",
      },
      {
        heading: "17. Acceptance and updates",
        body: "By selecting “I Agree”, “Accept Terms & Conditions”, or an equivalent acceptance mechanism during registration, you confirm that you have read and understood these Terms and agree to comply with them and applicable laws. The Company may update these Terms from time to time. Continued use of the Platform after the effective date of updated Terms constitutes acceptance where legally sufficient.",
      },
    ],
  },
  security: {
    title: "Security",
    subtitle: "Our approach to protecting user accounts and platform data.",
    sections: [
      {
        heading: "Security safeguards",
        body: "We use reasonable technical safeguards, access controls, and verification checks to help protect accounts and sensitive user information.",
      },
      {
        heading: "Responsible data handling",
        body: "Data is stored and processed using secure systems and internal controls designed to reduce unauthorized access, misuse, or loss.",
      },
      {
        heading: "Reporting issues",
        body: "If you notice suspicious activity or any issue related to account security, please contact our support team immediately so we can investigate without delay.",
      },
    ],
  },
};

export default function LegalPage({ type }: { type: LegalType }) {
  const content = legalContent[type];

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-12 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link to="/" className="text-sm font-medium text-slate-600 transition hover:text-slate-900">
            ← Back to home
          </Link>
          <span className="rounded-full bg-sky-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-700">
            Legal
          </span>
        </div>

        <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)] sm:p-8 lg:p-10">
          <div className="border-b border-slate-200 pb-6">
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{content.title}</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">{content.subtitle}</p>
            {content.intro && <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">{content.intro}</p>}
          </div>

          {type === "terms" && (
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              Effective Date: 1st September 2026 · Last Updated: 1st September 2026
            </div>
          )}

          <div className="mt-8 space-y-5">
            {content.sections.map((section) => (
              <section key={section.heading} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h2 className="text-lg font-semibold text-slate-900">{section.heading}</h2>
                <p className="mt-2 text-sm leading-7 text-slate-600">{section.body}</p>
              </section>
            ))}
          </div>

          {type === "terms" && (
            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-600">
              <p className="font-semibold text-slate-900">Grievance Officer / Contact</p>
              <p>Mukul / Administrator</p>
              <p>Email: rojiroti2026@gmail.com</p>
              <p>Address: Noida</p>
              <p>Telephone: 8447752938</p>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
