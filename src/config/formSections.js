import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Wrench,
  Monitor,
  Languages,
  Award,
  FolderKanban
} from 'lucide-react'

export const FORM_SECTIONS = [
  { key: 'personalInfo', label: 'Personal Information', short: 'Personal', icon: User, hint: 'Your name, role, and contact details — employers use these first.' },
  { key: 'profile', label: 'Profile Summary', short: 'Summary', icon: FileText, hint: '2–4 sentences: who you are, your strengths, and what role you want.' },
  { key: 'workExperience', label: 'Work Experience', short: 'Work', icon: Briefcase, hint: 'List jobs from newest to oldest. Use bullet points with results (numbers help).' },
  { key: 'education', label: 'Education', short: 'Education', icon: GraduationCap, hint: 'Degrees, schools, and graduation years — most recent first.' },
  { key: 'skills', label: 'Skills', short: 'Skills', icon: Wrench, hint: 'Add 5–8 skills that match the job (tools, methods, soft skills).' },
  { key: 'programs', label: 'Programs & Software', short: 'Software', icon: Monitor, hint: 'Software you use daily: Excel, Photoshop, VS Code, etc.' },
  { key: 'languages', label: 'Languages', short: 'Languages', icon: Languages, hint: 'Language and level, e.g. English — Professional Working Proficiency.' },
  { key: 'training', label: 'Training & Certifications', short: 'Training', icon: Award, hint: 'Courses, certificates, or workshops relevant to your field.' },
  { key: 'projects', label: 'Projects', short: 'Projects', icon: FolderKanban, hint: 'Personal, academic, or freelance projects — optional but useful for juniors.' }
]
