import {
  createContext,
  useEffect,
  useReducer,
  useContext,
  useState,
} from 'react'
import { fetchData } from '../api/countries'
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorage'

export type Employee = {
  id: string
  name: string
  email: string
  country: string
  subcountry: string
  address: string
  role: string
  department: string
  position: string
  gradeLevel: string
}

export type GradeLevel = {
  id: string
  name: string
}

type State = {
  countries: Record<string, string[]>
  employees: Employee[]
  gradeLevels: GradeLevel[]
  newEmployee: Partial<Employee>
}

type Action =
  | { type: 'SET_COUNTRIES'; payload: Record<string, string[]> }
  | { type: 'SET_EMPLOYEES'; payload: Employee[] }
  | { type: 'ADD_EMPLOYEE'; payload: Employee }
  | { type: 'UPDATE_EMPLOYEE'; payload: Employee }
  | { type: 'DELETE_EMPLOYEE'; payload: string }
  | {
      type: 'UPDATE_NEW_EMPLOYEE_FIELD'
      payload: { field: keyof Employee; value: any }
    }

const initialState: State = {
  countries: {},
  employees: loadFromLocalStorage('employees') || [],
  gradeLevels: [],
  newEmployee: {},
}

const EmployeeContext = createContext<{
  state: State
  dispatch: React.Dispatch<Action>
  loading: boolean
  error: string | null
}>({
  state: initialState,
  dispatch: () => null,
  loading: false,
  error: null,
})

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_COUNTRIES':
      return { ...state, countries: action.payload }

    case 'SET_EMPLOYEES':
      saveToLocalStorage('employees', action.payload)
      return { ...state, employees: action.payload }

    case 'ADD_EMPLOYEE': {
      const updated = [...state.employees, action.payload]
      saveToLocalStorage('employees', updated)
      return { ...state, employees: updated }
    }

    case 'UPDATE_EMPLOYEE': {
      const updated = state.employees.map((emp) =>
        emp.id === action.payload.id ? action.payload : emp,
      )
      saveToLocalStorage('employees', updated)
      return { ...state, employees: updated }
    }

    case 'DELETE_EMPLOYEE': {
      const updated = state.employees.filter((emp) => emp.id !== action.payload)
      saveToLocalStorage('employees', updated)
      return { ...state, employees: updated }
    }

    case 'UPDATE_NEW_EMPLOYEE_FIELD': {
      const newEmployee = {
        ...state.newEmployee,
        [action.payload.field]: action.payload.value,
      }
      return { ...state, newEmployee }
    }

    default:
      return state
  }
}

export const EmployeeProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const data = await fetchData()
        dispatch({ type: 'SET_COUNTRIES', payload: data })
      } catch (e) {
        setError('Failed to fetch countries')
      } finally {
        setLoading(false)
      }
    }

    loadCountries()
  }, [])

  return (
    <EmployeeContext.Provider value={{ state, dispatch, loading, error }}>
      {children}
    </EmployeeContext.Provider>
  )
}

export const useEmployeeContext = () => useContext(EmployeeContext)
