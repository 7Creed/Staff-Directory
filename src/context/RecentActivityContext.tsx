import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react'
import { type RecentActivityTypes } from '@/types/recentActivity.type'

const LOCALACTIVITYKEY = 'activities'

interface ActivityState {
  activities: RecentActivityTypes[]
}

const initialState: ActivityState = {
  activities: JSON.parse(localStorage.getItem(LOCALACTIVITYKEY) || '[]'),
}

interface Action {
  type: string
  payload?: RecentActivityTypes
}

function reducer(state: ActivityState, action: Action): ActivityState {
  switch (action.type) {
    case 'ADD_ACTIVITY':
      const activityTSave = [action.payload!, ...state.activities]
      localStorage.setItem(LOCALACTIVITYKEY, JSON.stringify(activityTSave))
      return {
        ...state,
        activities: activityTSave, // newest first
      }
      break

    default:
      return state
  }
}

const RecentActivityContext = createContext<{
  state: ActivityState
  dispatch: React.Dispatch<Action>
}>({
  state: initialState,
  dispatch: () => null,
})

export const RecentActivityProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const value = useMemo(() => {
    return { state, dispatch }
  }, [state])

  return (
    <RecentActivityContext.Provider value={value}>
      {children}
    </RecentActivityContext.Provider>
  )
}

export const useRecentActivityContext = () => useContext(RecentActivityContext)
