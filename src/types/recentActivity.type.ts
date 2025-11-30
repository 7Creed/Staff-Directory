export interface RecentActivityTypes {
  id: number | string
  message: string
  type: 'info' | 'warning' | 'error' | 'success' | 'system' | 'user'
  timestamp: string | Date
  user?: {
    id: number | string
    name: string
    avartar?: string
  }
  entity: string
}
