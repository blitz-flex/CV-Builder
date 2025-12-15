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
  workExperience: [],
  education: [],
  training: [],
  languages: [],
  skills: [],
  programs: [],
  projects: []
}

export const INITIAL_COLLAPSED_STATE = {
  personalInfo: true,
  profile: true,
  education: true,
  workExperience: true,
  training: true,
  languages: true,
  skills: true,
  programs: true,
  projects: true
}
