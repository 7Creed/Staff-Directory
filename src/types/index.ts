export interface Employee {
  id: string
  name: string
  email: string
  country: string
  state: string
  address: string
  role: string
  department: string
  position: string
  gradeLevel?: string
  isActive: boolean
}

export interface GradeLevel {
  id: string
  title: string
}

export interface Country {
  nameData: string
  country: string
}

export interface CountryContextType {
  nameData: Country[]
  loading: boolean
  error: string | null
}
