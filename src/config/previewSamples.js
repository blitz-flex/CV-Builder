import { resolveTemplateId, DEFAULT_TEMPLATE_ID } from './cvTemplates'
import { INITIAL_FORM_DATA } from './formTemplates'

const clone = (data) => structuredClone(data)

/** EAGHNEVFuCs — White & Black Tech Professional */
const TECH_BW = {
  fullName: 'David Kapanadze',
  jobTitle: 'Senior Software Engineer',
  email: 'david.k@email.com',
  phoneCode: '+995',
  phone: '555 11 22 33',
  location: 'Tbilisi, Georgia',
  linkedin: 'linkedin.com/in/davidkapanadze',
  github: 'github.com/davidkapanadze',
  profile: 'Full-stack engineer building scalable web platforms with React, Node.js, and PostgreSQL. 7+ years shipping production systems — from API design to CI/CD pipelines and observability. Passionate about clean architecture, mentoring junior developers, and delivering measurable business impact through reliable software.',
  photo: null,
  workExperience: [
    {
      period: '2021 – Present',
      title: 'Senior Software Engineer',
      company: 'TechFlow Georgia',
      description: 'Architected microservices handling 2M+ API requests per day\nReduced p95 latency by 40% through query optimization and Redis caching\nLed migration from monolith to event-driven architecture with Kafka\nMentored 3 junior developers on code review, testing, and system design'
    },
    {
      period: '2018 – 2021',
      title: 'Software Developer',
      company: 'Digital Solutions Ltd.',
      description: 'Built React dashboards and REST APIs for fintech clients\nIntroduced Jest + Cypress test suite — achieved 85% code coverage\nOptimized PostgreSQL queries cutting report generation time by 60%'
    },
    {
      period: '2016 – 2018',
      title: 'Junior Web Developer',
      company: 'Startup Hub Tbilisi',
      description: 'Developed landing pages and internal tools using JavaScript and PHP\nCollaborated with designers to implement responsive UI components\nParticipated in agile sprints and daily stand-ups with cross-functional teams'
    }
  ],
  education: [
    { degree: 'BSc Computer Science', school: 'Georgian Technical University', period: '2012 – 2016' },
    { degree: 'Web Development Bootcamp', school: 'Grow with Google', period: '2017' }
  ],
  training: [
    { title: 'AWS Solutions Architect Associate', period: '2022', description: 'Cloud architecture, Lambda, RDS, VPC design, and cost optimization for production workloads.' },
    { title: 'Advanced React Patterns', period: '2023', description: 'Performance optimization, compound components, server state management with TanStack Query.' }
  ],
  languages: [
    { name: 'Georgian', level: 'Native' },
    { name: 'English', level: 'Professional Working Proficiency' },
    { name: 'Russian', level: 'Limited Working Proficiency' }
  ],
  skills: [
    { name: 'React' }, { name: 'Node.js' }, { name: 'TypeScript' },
    { name: 'PostgreSQL' }, { name: 'Docker' }, { name: 'AWS' },
    { name: 'System Design' }, { name: 'CI/CD' }
  ],
  programs: [
    { name: 'Git' }, { name: 'GitHub Actions' }, { name: 'VS Code' },
    { name: 'Postman' }, { name: 'Docker Desktop' }, { name: 'Figma' }
  ],
  projects: [
    { title: 'Open-source CLI Tool', description: 'DevOps automation utility for deployment pipelines — 400+ GitHub stars, used by 50+ teams.', link: 'github.com/davidkapanadze/cli-tool' },
    { title: 'Real-time Analytics Dashboard', description: 'WebSocket-based monitoring dashboard for SaaS metrics with custom alerting rules.', link: 'github.com/davidkapanadze/analytics-dash' }
  ]
}

/** EAGDNOIuRgo — Blue & White Corporate */
const CORPORATE_BLUE = {
  fullName: 'Sarah Chen',
  jobTitle: 'Business Development Manager',
  email: 'sarah.chen@email.com',
  phoneCode: '+995',
  phone: '599 11 22 33',
  location: 'Tbilisi, Georgia',
  linkedin: 'linkedin.com/in/sarahchen',
  github: '',
  profile: 'Results-driven business development manager with 10+ years in B2B sales and strategic partnerships across EMEA. Proven track record exceeding revenue targets, building long-term client relationships, and leading cross-border market expansion. Skilled in enterprise negotiation, pipeline management, and executive stakeholder communication.',
  photo: null,
  workExperience: [
    {
      period: '2019 – Present',
      title: 'Business Development Manager',
      company: 'Meridian Business Group',
      description: 'Exceeded annual sales target by 22% for 3 consecutive years\nNegotiated 15+ enterprise contracts worth €4.2M combined\nBuilt partner network across 6 countries in the Caucasus region\nPresented quarterly growth strategy to board and investor committee'
    },
    {
      period: '2014 – 2019',
      title: 'Account Executive',
      company: 'Caucasus Consulting Partners',
      description: 'Managed portfolio of 30+ mid-market accounts with 95% retention rate\nIntroduced CRM pipeline process adopted company-wide\nClosed largest single deal in company history — €680K annual contract'
    },
    {
      period: '2010 – 2014',
      title: 'Sales Representative',
      company: 'Global Trade Solutions',
      description: 'Generated €1.2M in new business within first 18 months\nDeveloped lead qualification framework reducing sales cycle by 25%\nCoordinated trade show presence and client networking events'
    }
  ],
  education: [
    { degree: 'MBA Marketing & Strategy', school: 'London Business School', period: '2016 – 2018' },
    { degree: 'BSc Economics', school: 'Tbilisi State University', period: '2006 – 2010' }
  ],
  training: [
    { title: 'Strategic Negotiation Masterclass', period: '2021', description: 'Enterprise deal structuring, multi-party negotiation, and stakeholder alignment techniques.' },
    { title: 'Salesforce Administrator Certification', period: '2020', description: 'CRM configuration, reporting dashboards, and sales automation workflows.' }
  ],
  languages: [
    { name: 'English', level: 'Native or Bilingual Proficiency' },
    { name: 'Georgian', level: 'Professional Working Proficiency' },
    { name: 'Mandarin Chinese', level: 'Elementary Proficiency' }
  ],
  skills: [
    { name: 'B2B Sales' }, { name: 'Partnership Development' }, { name: 'Contract Negotiation' },
    { name: 'CRM Management' }, { name: 'Market Analysis' }, { name: 'Lead Generation' },
    { name: 'Executive Presentations' }, { name: 'Territory Planning' }
  ],
  programs: [
    { name: 'Salesforce' }, { name: 'HubSpot' }, { name: 'PowerPoint' },
    { name: 'Excel' }, { name: 'LinkedIn Sales Navigator' }, { name: 'Zoom' }
  ],
  projects: [
    { title: 'Regional Partner Program', description: 'Designed and launched reseller program — onboarded 12 partners, €1.8M first-year revenue.', link: 'meridiangroup.com/partners' },
    { title: 'EMEA Market Entry Playbook', description: 'Created go-to-market framework adopted across 3 new country launches in 2022–2023.', link: '' }
  ]
}

/** EAFtv3WShcY — Black & White Corporate */
const CORPORATE_BW_CLASSIC = {
  fullName: 'Giorgi Beridze',
  jobTitle: 'Senior Accountant',
  email: 'giorgi.beridze@email.com',
  phoneCode: '+995',
  phone: '577 44 55 66',
  location: 'Tbilisi, Georgia',
  linkedin: 'linkedin.com/in/giorgiberidze',
  github: '',
  profile: 'Detail-oriented accountant with 9 years in general ledger, month-end close, and statutory reporting. Trusted advisor to SMEs on tax compliance, payroll reconciliation, and audit preparation. Known for accuracy, deadline discipline, and translating complex financial data into clear management reports.',
  photo: null,
  workExperience: [
    {
      period: '2018 – Present',
      title: 'Senior Accountant',
      company: 'Beridze & Partners LLC',
      description: 'Prepare financial statements for 12 client accounts under IFRS for SMEs\nReconcile bank, AR/AP, and payroll with zero material adjustments in 3 years\nSupport external audits and liaise with tax advisors on quarterly filings\nTrain 2 junior accountants on month-end procedures and internal controls'
    },
    {
      period: '2015 – 2018',
      title: 'Accountant',
      company: 'Metro Trade Company',
      description: 'Managed invoicing, VAT returns, and supplier payment runs for 200+ vendors\nImplemented filing checklist that reduced missing receipts by 40%\nAutomated expense reporting workflow saving 8 hours per month'
    },
    {
      period: '2012 – 2015',
      title: 'Junior Accountant',
      company: 'Caucasus Finance Group',
      description: 'Processed daily transactions and maintained general ledger entries\nAssisted with annual budget preparation and variance analysis\nPrepared payroll for 45 employees across 2 legal entities'
    }
  ],
  education: [
    { degree: 'BA Accounting & Audit', school: 'Caucasus University', period: '2008 – 2012' },
    { degree: 'Professional Accounting Certificate', school: 'Georgian Accounting Association', period: '2013' }
  ],
  training: [
    { title: 'IFRS for SMEs Update', period: '2023', description: 'Revenue recognition, lease accounting, financial instrument disclosures, and transition requirements.' },
    { title: 'Advanced Excel for Finance', period: '2021', description: 'Pivot tables, Power Query, financial modeling, and automated reporting dashboards.' }
  ],
  languages: [
    { name: 'Georgian', level: 'Native' },
    { name: 'English', level: 'Professional Working Proficiency' },
    { name: 'Russian', level: 'Professional Working Proficiency' }
  ],
  skills: [
    { name: 'General Ledger' }, { name: 'Month-End Close' }, { name: 'VAT / Tax Filing' },
    { name: 'Payroll' }, { name: 'Audit Support' }, { name: 'Financial Reporting' },
    { name: 'Budgeting' }, { name: 'Accounts Receivable' }
  ],
  programs: [
    { name: 'Excel' }, { name: '1C Enterprise' }, { name: 'QuickBooks' },
    { name: 'SAP FI' }, { name: 'Power BI' }, { name: 'Microsoft Word' }
  ],
  projects: [
    { title: 'Chart-of-Accounts Migration', description: 'Standardized 8 client ledgers ahead of audit season — zero restatements required.', link: '' },
    { title: 'Automated VAT Reporting Tool', description: 'Built Excel macro suite reducing quarterly VAT prep time from 6 hours to 90 minutes.', link: '' }
  ]
}

/** EAGx-rtOTgM — Beige Simple Professional A4 */
const BEIGE_SIMPLE = {
  fullName: 'Luka Gvasalia',
  jobTitle: 'Marketing Coordinator',
  email: 'luka.g@email.com',
  phoneCode: '+995',
  phone: '555 66 77 88',
  location: 'Tbilisi, Georgia',
  linkedin: 'linkedin.com/in/lukag',
  github: '',
  profile: 'Marketing coordinator with 4+ years supporting brand campaigns, social media, and event logistics. Organized, creative, and skilled at turning briefs into polished deliverables on tight deadlines. Strong eye for visual consistency and data-driven campaign optimization across digital channels.',
  photo: null,
  workExperience: [
    {
      period: '2022 – Present',
      title: 'Marketing Coordinator',
      company: 'Bright Brand Studio',
      description: 'Coordinate 20+ campaigns per year across social, email, and print channels\nManage content calendar and vendor relationships for 8 active clients\nTrack KPIs and prepare monthly performance reports for leadership\nIncreased average email open rate by 18% through A/B testing and segmentation'
    },
    {
      period: '2020 – 2022',
      title: 'Marketing Assistant',
      company: 'City Business Center',
      description: 'Supported event promotion and newsletter production for 500+ subscribers\nAssisted with photo shoots and brand asset management\nManaged social media accounts — grew Instagram following by 2,400 in 12 months'
    },
    {
      period: '2019 – 2020',
      title: 'Marketing Intern',
      company: 'Creative Agency Tbilisi',
      description: 'Drafted social media copy and scheduled posts across 4 client accounts\nConducted competitor research and compiled weekly trend reports\nSupported event setup and on-site coordination for 6 corporate events'
    }
  ],
  education: [
    { degree: 'BA Marketing & Communications', school: 'Caucasus University', period: '2016 – 2020' },
    { degree: 'Digital Marketing Certificate', school: 'Google Digital Garage', period: '2021' }
  ],
  training: [
    { title: 'Google Analytics Certification', period: '2023', description: 'GA4 setup, conversion tracking, audience segmentation, and custom reporting.' },
    { title: 'Meta Blueprint — Social Media Marketing', period: '2022', description: 'Paid social campaigns, audience targeting, and performance optimization on Facebook and Instagram.' }
  ],
  languages: [
    { name: 'Georgian', level: 'Native' },
    { name: 'English', level: 'Upper Intermediate' },
    { name: 'German', level: 'Elementary Proficiency' }
  ],
  skills: [
    { name: 'Social Media' }, { name: 'Content Planning' }, { name: 'Email Marketing' },
    { name: 'Event Coordination' }, { name: 'Copywriting' }, { name: 'Brand Management' },
    { name: 'SEO Basics' }, { name: 'Campaign Analytics' }
  ],
  programs: [
    { name: 'Canva' }, { name: 'Mailchimp' }, { name: 'Google Analytics' },
    { name: 'Trello' }, { name: 'Adobe Photoshop' }, { name: 'Hootsuite' }
  ],
  projects: [
    { title: 'Product Launch Campaign', description: 'Cross-channel launch for local FMCG brand — 3x social engagement vs. baseline, 12% sales uplift.', link: 'brightbrand.ge/case-studies/launch' },
    { title: 'Employer Branding Refresh', description: 'Redesigned careers page and LinkedIn presence — 40% increase in qualified job applications.', link: '' }
  ]
}

/** EAF9q_w3tqw — Blue & White Minimalist CV */
const BLUE_MINIMALIST = {
  fullName: 'Mariam Chkheidze',
  jobTitle: 'Product Manager',
  email: 'mariam.pm@email.com',
  phoneCode: '+995',
  phone: '555 98 76 54',
  location: 'Tbilisi, Georgia',
  linkedin: 'linkedin.com/in/mariamchkheidze',
  github: 'github.com/mchkheidze',
  profile: 'Product manager with 5+ years launching B2B SaaS features from discovery to release. Bridges engineering, design, and stakeholders with clear roadmaps and data-informed prioritization. Experienced in user research, agile delivery, and driving adoption metrics for growth-stage startups.',
  photo: null,
  workExperience: [
    {
      period: '2021 – Present',
      title: 'Product Manager',
      company: 'CloudStack Georgia',
      description: 'Own roadmap for billing and analytics modules serving 40k+ MAU\nShipped 12 major features with 92% on-time delivery rate\nRan 30+ user interviews and A/B tests to validate 3 pivot decisions\nReduced churn by 15% through onboarding flow redesign and in-app guidance'
    },
    {
      period: '2019 – 2021',
      title: 'Associate Product Manager',
      company: 'Digital Craft Tbilisi',
      description: 'Wrote PRDs and acceptance criteria for mobile app releases\nCoordinated sprint planning with 2 engineering squads (12 developers)\nLaunched customer feedback portal — 200+ feature requests collected in Q1'
    },
    {
      period: '2018 – 2019',
      title: 'Business Analyst',
      company: 'FinTech Solutions Georgia',
      description: 'Gathered requirements from 8 banking clients for payment gateway integration\nCreated process flow diagrams and user stories for development team\nSupported UAT testing and go-live for 3 major product releases'
    }
  ],
  education: [
    { degree: 'BA Business Informatics', school: 'Tbilisi State University', period: '2014 – 2018' },
    { degree: 'Product Management Specialization', school: 'Coursera / University of Virginia', period: '2020' }
  ],
  training: [
    { title: 'Product Management Certificate', period: '2022', description: 'Roadmapping, OKRs, stakeholder management, and go-to-market strategy for SaaS products.' },
    { title: 'Agile & Scrum Master Workshop', period: '2021', description: 'Sprint facilitation, backlog refinement, and cross-team dependency management.' }
  ],
  languages: [
    { name: 'Georgian', level: 'Native' },
    { name: 'English', level: 'Professional Working Proficiency' },
    { name: 'French', level: 'Elementary Proficiency' }
  ],
  skills: [
    { name: 'Roadmapping' }, { name: 'User Research' }, { name: 'Agile / Scrum' },
    { name: 'Data Analysis' }, { name: 'Stakeholder Management' }, { name: 'A/B Testing' },
    { name: 'Wireframing' }, { name: 'Go-to-Market' }
  ],
  programs: [
    { name: 'Jira' }, { name: 'Figma' }, { name: 'Mixpanel' },
    { name: 'Notion' }, { name: 'Miro' }, { name: 'Google Sheets' }
  ],
  projects: [
    { title: 'Self-serve Onboarding Redesign', description: 'Reduced time-to-value by 40% for new trial users — activation rate up 22% within 8 weeks.', link: 'cloudstack.ge/onboarding-case' },
    { title: 'Pricing Page Experiment', description: 'Led A/B test on tier packaging — increased conversion to paid plan by 17%.', link: '' }
  ]
}

const TEMPLATE_SAMPLE_MAP = {
  'tech-bw-professional': TECH_BW,
  'corporate-blue-white': CORPORATE_BLUE,
  'corporate-bw-classic': CORPORATE_BW_CLASSIC,
  'beige-simple-a4': BEIGE_SIMPLE,
  'blue-minimalist-cv': BLUE_MINIMALIST
}

export const getPreviewSample = (templateId) => {
  const resolved = resolveTemplateId(templateId)
  return clone(TEMPLATE_SAMPLE_MAP[resolved] ?? TEMPLATE_SAMPLE_MAP[DEFAULT_TEMPLATE_ID])
}
