export const FORM_TEMPLATES = {
  workExperience: { period: '', title: '', company: '', description: '' },
  education: { degree: '', period: '' },
  training: { title: '', period: '', description: '' },
  languages: { name: '' },
  skills: { name: '' },
  programs: { name: '' },
  projects: { title: '', description: '', link: '' }
}

export const INITIAL_FORM_DATA = {
  fullName: '',
  email: '',
  phone: '',
  linkedin: '',
  github: '',
  profile: '',
  photo: null,
  workExperience: [{ period: '', title: '', company: '', description: '' }],
  education: [{ degree: '', period: '' }],
  training: [{ title: '', period: '', description: '' }],
  languages: [{ name: '' }],
  skills: [{ name: '' }],
  programs: [{ name: '' }],
  projects: [{ title: '', description: '', link: '' }]
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
