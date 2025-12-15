export const FORM_TEMPLATES = {
  workExperience: { period: '', title: '', company: '', description: '' },
  education: { degree: '', period: '' },
  training: { title: '', period: '' },
  languages: { name: '' },
  skills: { name: '' },
  programs: { name: '' },
  projects: { title: '', description: '' }
}

export const INITIAL_FORM_DATA = {
  fullName: '',
  email: '',
  phone: '',
  linkedin: '',
  github: '',
  profile: '',
  photo: null,
  workExperience: [FORM_TEMPLATES.workExperience],
  education: [FORM_TEMPLATES.education],
  training: [FORM_TEMPLATES.training],
  languages: [FORM_TEMPLATES.languages],
  skills: [FORM_TEMPLATES.skills],
  programs: [FORM_TEMPLATES.programs],
  projects: [FORM_TEMPLATES.projects]
}

export const INITIAL_COLLAPSED_STATE = {
  education: false,
  workExperience: false,
  training: false,
  languages: false,
  skills: false,
  programs: false,
  projects: false
}
