import { FORM_SECTIONS } from '../config/formSections'

// ─── Primitive helpers ────────────────────────────────────────────────────────

export const hasText = (value) => !!value?.trim?.()

export const itemHasAny = (item, fields) =>
  fields.some((field) => hasText(item[field]))

export const arrayHasAny = (items, fields) =>
  items.some((item) => itemHasAny(item, fields))

// ─── Field groups ────────────────────────────────────────────────────────────

export const WORK_FIELDS      = ['period', 'title', 'company', 'description']
export const EDUCATION_FIELDS = ['degree', 'school', 'period']
export const TRAINING_FIELDS  = ['title', 'period', 'description']
export const PROJECT_FIELDS   = ['title', 'description', 'link']
export const LANGUAGE_FIELDS  = ['name', 'level']

// ─── Section-level checks (drives progress bar + download gate) ───────────────

const SECTION_CHECKS = {
  personalInfo:   (d) => hasText(d.fullName) || hasText(d.jobTitle) || hasText(d.email) ||
                         hasText(d.phone)    || hasText(d.location) || hasText(d.linkedin) ||
                         hasText(d.github),
  profile:        (d) => hasText(d.profile),
  workExperience: (d) => arrayHasAny(d.workExperience, WORK_FIELDS),
  education:      (d) => arrayHasAny(d.education,      EDUCATION_FIELDS),
  training:       (d) => arrayHasAny(d.training,       TRAINING_FIELDS),
  languages:      (d) => arrayHasAny(d.languages,      LANGUAGE_FIELDS),
  skills:         (d) => arrayHasAny(d.skills,         ['name']),
  programs:       (d) => arrayHasAny(d.programs,       ['name']),
  projects:       (d) => arrayHasAny(d.projects,       PROJECT_FIELDS),
}

export const isSectionFilled = (section, formData) =>
  !!(SECTION_CHECKS[section]?.(formData) ?? false)

export const getFilledSectionCount = (formData) =>
  FORM_SECTIONS.filter((s) => isSectionFilled(s.key, formData)).length

export const isFormComplete = (formData) =>
  getFilledSectionCount(formData) === FORM_SECTIONS.length

// ─── Preview-level checks (drives empty-state UI) ────────────────────────────

export const hasPersonalHeader = (formData) =>
  SECTION_CHECKS.personalInfo(formData)

export const hasContactInfo = (formData) => !!(
  hasText(formData.email)    ||
  hasText(formData.phone)    ||
  hasText(formData.location) ||
  hasText(formData.linkedin) ||
  hasText(formData.github)
)

export const hasMainContent = (formData) => !!(
  hasText(formData.profile) ||
  arrayHasAny(formData.workExperience, WORK_FIELDS) ||
  arrayHasAny(formData.projects,       PROJECT_FIELDS)
)

export const hasSideContent = (formData) => !!(
  arrayHasAny(formData.education, EDUCATION_FIELDS) ||
  arrayHasAny(formData.skills,    ['name'])         ||
  arrayHasAny(formData.programs,  ['name'])         ||
  arrayHasAny(formData.training,  TRAINING_FIELDS)  ||
  arrayHasAny(formData.languages, LANGUAGE_FIELDS)
)

export const isCvMostlyEmpty = (formData) =>
  !hasPersonalHeader(formData) &&
  !hasText(formData.profile)   &&
  !hasMainContent(formData)    &&
  !hasSideContent(formData)
