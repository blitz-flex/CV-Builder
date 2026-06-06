import { INITIAL_FORM_DATA } from './formTemplates'

const clone = (data) => structuredClone(data)
const emptyForm = () => clone(INITIAL_FORM_DATA)

/** 5 Canva resume styles — layout/color/font only, no sample content */
export const CV_TEMPLATES = {
  'tech-bw-professional': {
    id: 'tech-bw-professional',
    canvaId: 'EAGHNEVFuCs',
    name: 'Tech',
    accentColor: '#0a0a0a',
    font: 'Inter',
    layoutVariant: 'simple',
    formData: emptyForm()
  },
  'corporate-blue-white': {
    id: 'corporate-blue-white',
    canvaId: 'EAGDNOIuRgo',
    name: 'Corporate',
    accentColor: '#2563eb',
    font: 'Roboto',
    layoutVariant: 'executive',
    formData: emptyForm()
  },
  'corporate-bw-classic': {
    id: 'corporate-bw-classic',
    canvaId: 'EAFtv3WShcY',
    name: 'Classic',
    accentColor: '#171717',
    font: 'Merriweather',
    layoutVariant: 'classic',
    formData: emptyForm()
  },
  'beige-simple-a4': {
    id: 'beige-simple-a4',
    canvaId: 'EAGx-rtOTgM',
    name: 'Beige',
    accentColor: '#78716c',
    font: 'Lato',
    layoutVariant: 'stacked',
    formData: emptyForm()
  },
  'blue-minimalist-cv': {
    id: 'blue-minimalist-cv',
    canvaId: 'EAF9q_w3tqw',
    name: 'Minimal',
    accentColor: '#2563eb',
    font: 'Poppins',
    layoutVariant: 'creative',
    formData: emptyForm()
  }
}

export const TEMPLATE_ORDER = [
  'tech-bw-professional',
  'corporate-blue-white',
  'corporate-bw-classic',
  'beige-simple-a4',
  'blue-minimalist-cv'
]

export const TEMPLATE_LIST = TEMPLATE_ORDER.map((id) => CV_TEMPLATES[id])

export const DEFAULT_TEMPLATE_ID = 'corporate-blue-white'

export const resolveTemplateId = (id) =>
  CV_TEMPLATES[id] ? id : DEFAULT_TEMPLATE_ID

export const getTemplate = (id) =>
  CV_TEMPLATES[resolveTemplateId(id)] ?? CV_TEMPLATES[DEFAULT_TEMPLATE_ID]

export const getTemplateSnapshot = (id) => {
  const resolvedId = resolveTemplateId(id)
  const template = CV_TEMPLATES[resolvedId]
  return {
    templateId: resolvedId,
    formData: clone(template.formData),
    accentColor: template.accentColor,
    selectedFont: template.font
  }
}
