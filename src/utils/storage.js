import { resolveTemplateId } from '../config/cvTemplates'

const STORAGE_KEY = 'cv-builder-draft'
const DRAFT_VERSION = 5
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000

const isBrowser = () => typeof window !== 'undefined'

export const loadDraft = () => {
  if (!isBrowser()) return null

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null

    const draft = JSON.parse(raw)
    if (Date.now() - draft.updatedAt > MAX_AGE_MS) {
      localStorage.removeItem(STORAGE_KEY)
      return null
    }

    const migrated = {
      version: DRAFT_VERSION,
      templateId: resolveTemplateId(draft.templateId),
      formData: { ...draft.formData, photo: null },
      accentColor: draft.accentColor,
      selectedFont: draft.selectedFont
    }

    if (draft.version !== DRAFT_VERSION || draft.templateId !== migrated.templateId) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...migrated, updatedAt: Date.now() })
      )
    }

    return migrated
  } catch {
    return null
  }
}

export const saveDraft = ({ templateId, formData, accentColor, selectedFont }) => {
  if (!isBrowser()) return

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: DRAFT_VERSION,
        templateId: resolveTemplateId(templateId),
        formData: { ...formData, photo: null },
        accentColor,
        selectedFont,
        updatedAt: Date.now()
      })
    )
  } catch {
    // Quota exceeded or private browsing — fail silently
  }
}

export const clearDraft = () => {
  if (!isBrowser()) return
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}

export const hasMeaningfulDraft = (draft) => {
  if (!draft?.formData) return false
  const { fullName, jobTitle, email, phone, profile, workExperience, education, skills } = draft.formData
  if (fullName?.trim() || jobTitle?.trim() || email?.trim() || phone?.trim() || profile?.trim()) return true
  if (workExperience?.some((i) => i.title || i.company || i.description)) return true
  if (education?.some((i) => i.degree || i.school)) return true
  if (skills?.some((i) => i.name)) return true
  return false
}

export const formatDraftDate = (timestamp) => {
  if (!timestamp) return ''
  return new Date(timestamp).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
