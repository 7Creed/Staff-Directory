export interface Employee {
  id: string
  name: string
  email: string
  country: string
  subcountry: string
  address: string
  role: string
  department: string
  position: string
  gradeLevel?: string
}

export type GradeLevel = {
  id: string
  name: string
  description?: string
  createdAt?: Date
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
