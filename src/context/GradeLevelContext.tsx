import React, { createContext, useReducer, useContext } from 'react'
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorage'
import type { GradeLevel } from '@/types'

type State = {
  gradeLevels: GradeLevel[]
}

type Action =
  | { type: 'SET_GRADE_LEVELS'; payload: GradeLevel[] }
  | { type: 'ADD_GRADE_LEVEL'; payload: GradeLevel }
  | { type: 'UPDATE_GRADE_LEVEL'; payload: GradeLevel }
  | { type: 'DELETE_GRADE_LEVEL'; payload: string }

const initialState: State = {
  gradeLevels: loadFromLocalStorage('gradeLevels') || [],
}

const GradeLevelContext = createContext<{
  state: State
  dispatch: React.Dispatch<Action>
}>({
  state: initialState,
  dispatch: () => null,
})

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_GRADE_LEVELS':
      saveToLocalStorage('gradeLevels', action.payload)
      return { ...state, gradeLevels: action.payload }

    case 'ADD_GRADE_LEVEL': {
      const updated = [...state.gradeLevels, action.payload]
      saveToLocalStorage('gradeLevels', updated)
      return { ...state, gradeLevels: updated }
    }

    case 'UPDATE_GRADE_LEVEL': {
      const updated = state.gradeLevels.map((level) =>
        level.id === action.payload.id ? action.payload : level,
      )
      saveToLocalStorage('gradeLevels', updated)
      return { ...state, gradeLevels: updated }
    }

    case 'DELETE_GRADE_LEVEL': {
      const updated = state.gradeLevels.filter(
        (level) => level.id !== action.payload,
      )
      saveToLocalStorage('gradeLevels', updated)
      return { ...state, gradeLevels: updated }
    }

    default:
      return state
  }
}

export const GradeLevelProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <GradeLevelContext.Provider value={{ state, dispatch }}>
      {children}
    </GradeLevelContext.Provider>
  )
}

export const useGradeLevelContext = () => useContext(GradeLevelContext)
