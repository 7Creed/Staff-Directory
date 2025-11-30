import type { RecentActivity } from '@/types/recentActivity.type'

export const sampleRecentActivity: RecentActivity[] = [
  {
    id: 1,
    message: 'New grade level added: Grade 7',
    type: 'success',
    timestamp: '2025-11-29T10:12:45Z',
    user: {
      id: 101,
      name: 'Alice Johnson',
      avartar: 'https://example.com/avatars/alice.png',
    },
    entity: 'gradeLevel',
  },
  {
    id: 2,
    message: 'Employee record updated for John Doe',
    type: 'info',
    timestamp: new Date(),
    user: {
      id: 102,
      name: 'Michael Santos',
    },
    entity: 'employee',
  },
  {
    id: 3,
    message: 'Failed attempt to modify grade level',
    type: 'warning',
    timestamp: '2025-11-29T09:50:00Z',
    user: {
      id: 103,
      name: 'Sarah Lee',
      avartar: 'https://example.com/avatars/sarah.png',
    },
    entity: 'gradeLevel',
  },
  {
    id: 4,
    message: 'System maintenance completed',
    type: 'system',
    timestamp: '2025-11-29T08:00:00Z',
    entity: 'employee',
  },
  {
    id: 5,
    message: 'Error occurred while saving employee record',
    type: 'error',
    timestamp: new Date(),
    user: {
      id: 104,
      name: 'Daniel Cruz',
    },
    entity: 'employee',
  },
]
