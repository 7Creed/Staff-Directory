// import React, {
//   createContext,
//   useEffect,
//   useState,
//   useContext,
//   useReducer,
// } from 'react'
// import type { Employee, GradeLevel } from '../types'
// import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorage'
// import { fetchData } from '../api/countries'

// // import React, { createContext, useReducer } from "react";

// type State = {
//   countries(countries: any): unknown
//   employees: Employee[]
//   gradeLevels: GradeLevel[]
//   newEmployee: Partial<Employee>
// }

// type Action =
//   | { type: 'SET_COUNTRIES'; payload: any[] }
//   | { type: 'SET_EMPLOYEES'; payload: Employee[] }
//   | { type: 'ADD_EMPLOYEE'; payload: Employee }
//   | { type: 'UPDATE_EMPLOYEE'; payload: Employee }
//   | { type: 'DELETE_EMPLOYEE'; payload: string }
//   | { type: 'ADD_GRADE_LEVEL'; payload: GradeLevel }
//   | {
//       type: 'UPDATE_NEW_EMPLOYEE_FIELD'
//       payload: { field: keyof Employee; value: any }
//     }
//   | { type: 'DELETE_GRADE_LEVEL'; payload: string }

// const initialState: State = {
//   employees: loadFromLocalStorage('employees') || [],
//   gradeLevels: loadFromLocalStorage('grades') || [],
//   newEmployee: {},
//   countries: {},
// }

// const EmployeeContext = createContext<{
//   state: State
//   dispatch: React.Dispatch<Action>
//   // nameData: Country[];
//   loading: boolean
//   error: string | null
//   // query: "";
//   // department: "";
//   // position: "";
// }>({
//   state: initialState,
//   dispatch: () => null,
//   // nameData: [],
//   loading: false,
//   error: null,
//   // query: "",
//   // department: "",
//   // position: "",
// })

// const reducer = (state: State, action: Action): any => {
//   console.log(state)
//   let updated

//   switch (action.type) {
//     case 'SET_EMPLOYEES':
//       updated = { ...state, employees: action.payload }
//       saveToLocalStorage('employees', updated.employees)
//       return updated

//     case 'ADD_EMPLOYEE':
//       updated = { ...state, employees: [...state.employees, action.payload] }
//       saveToLocalStorage('employees', updated.employees)
//       return updated

//     case 'UPDATE_EMPLOYEE':
//       updated = {
//         ...state,
//         employees: state.employees.map((emp) =>
//           emp.id === action.payload.id ? action.payload : emp,
//         ),
//       }
//       saveToLocalStorage('employees', updated.employees)
//       return updated

//     case 'DELETE_EMPLOYEE':
//       updated = {
//         ...state,
//         employees: state.employees.filter((emp) => emp.id !== action.payload),
//       }
//       saveToLocalStorage('employees', updated.employees)
//       return updated

//     case 'ADD_GRADE_LEVEL':
//       updated = {
//         ...state,
//         gradeLevels: [...state.gradeLevels, action.payload],
//       }
//       saveToLocalStorage('grades', updated.gradeLevels)
//       return updated

//     case 'DELETE_GRADE_LEVEL':
//       updated = {
//         ...state,
//         gradeLevels: state.gradeLevels.filter((g) => g.id !== action.payload),
//       }
//       saveToLocalStorage('grades', updated.gradeLevels)
//       return updated

//     // case "UPDATE_NEW_EMPLOYEE_FIELD":
//     //   updated = {
//     //     ...state,
//     //     newEmployee: {
//     //       ...state.newEmployee,
//     //       [action.payload.field]: action.payload.value,
//     //     },
//     //   };

//     //   return updated;

//     case 'UPDATE_NEW_EMPLOYEE_FIELD': {
//       const updatedNewEmployee = {
//         ...state.newEmployee,
//         [action.payload.field]: action.payload.value,
//       }
//       saveToLocalStorage('newEmployee', updatedNewEmployee)
//       return { ...state, newEmployee: updatedNewEmployee }
//     }

//     default:
//       return state

//     // default:
//     //   break;
//   }
// }

// export const EmployeeProvider = ({
//   children,
// }: {
//   children: React.ReactNode
// }) => {
//   const [state, dispatch] = useReducer(reducer, initialState)

//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     const loadCountries = async () => {
//       try {
//         const countries = await fetchData()
//         console.log(countries)
//         dispatch({ type: 'SET_COUNTRIES', payload: countries })
//       } catch (error) {}
//     }

//     loadCountries()
//   }, [])

//   useEffect(() => {
//     const loadEmployees = async () => {
//       setLoading(true)
//       console.log(loading)
//       try {
//         const data = await fetchData()

//         const mappedEmployees: Employee[] = data
//           .slice(0, 20)
//           .map((item: any, i: number) => ({
//             id: `${i}`,
//             name: `${item.name}`,
//             country: item.country ?? 'Unknown',
//             address: '123 Main St',
//             role: 'Developer',
//             department: 'Engineering',
//             position: 'Software Engineer',
//             gradeLevel: 'Level 1',
//           }))

//         // setNameData(data);
//         dispatch({ type: 'SET_EMPLOYEES', payload: mappedEmployees })
//       } catch (err) {
//         setError('Failed to employee data.')
//       } finally {
//         setLoading(false)
//       }
//     }

//     loadEmployees()
//   }, [])

//   return (
//     <EmployeeContext.Provider
//       value={{
//         state,
//         dispatch,
//         // nameData,
//         loading,
//         error,
//         // query,
//         // department,
//         // position,
//       }}
//     >
//       {children}
//     </EmployeeContext.Provider>
//   )
// }

// export const useEmployeeContext = () => {
//   const context = useContext(EmployeeContext)
//   // if (!context) {
//   //   throw new Error("useCountries must be used within a CountryProvider");
//   // }
//   return context
// }

// // const EmployeeContext = createContext<{
// //   state: State;
// //   dispatch: React.Dispatch<Action>;
// // }>({ state: initialState, dispatch: () => null });

// // const reducer = () => {
// //   switch (action.type) {
// //   }
// // };

// // export const EmployeeContext = ({
// //   children,
// // }: {
// //   children: React.ReactNode;
// // }) => {
// //   const [state, dispatch] = useReducer(reducer, initialState);

// //   return <div>EmployeeContext</div>;
// // };

// // import React, {
// //   createContext,
// //   useEffect,
// //   useState,
// //   useContext,
// //   useReducer,
// // } from "react";
// // import { fetchCountries } from "../api/countries";

// // interface State {
// //   name: string;
// //   country: string;
// // }

// // interface CountryContextType {
// //   countries: Country[];
// //   loading: boolean;
// //   error: string | null;
// // }

// // const EmployeeContext = createContext<any>({ state, dispatch });

// // export const useEmployeeContext = () => useContext(EmployeeContext);

// // const CountryContext = createContext<CountryContextType | undefined>(undefined);

// // export const CountryProvider: React.FC<{ children: React.ReactNode }> = ({
// //   children,
// // }) => {
// //   const [nameData, setNameData] = useState<Country[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);

// //   useEffect(() => {
// //     const loadCountries = async () => {
// //       setLoading(true);
// //       console.log(loading);
// //       try {
// //         const data = await fetchData();
// //         setNameData(data);
// //       } catch (err) {
// //         setError("Failed to fetch countries.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     loadCountries();
// //   }, []);

// //   return (
// //     <CountryContext.Provider value={{ nameData, loading, error }}>
// //       {children}
// //     </CountryContext.Provider>
// //   );
// // };

// // export const useCountries = () => {
// //   const context = useContext(CountryContext);
// //   if (!context) {
// //     throw new Error("useCountries must be used within a CountryProvider");
// //   }
// //   return context;
// // };

import React, {
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
