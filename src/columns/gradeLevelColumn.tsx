import type { Employee } from '@/types'
import type { ColumnDefinition } from '@/types/global.type'
import { ActionIcon, Badge, Box, Group, Menu, Text } from '@mantine/core'
import { IconDots, IconEye, IconTrash, IconUser } from '@tabler/icons-react'

export const gradeLevelColumn = (
  handleView: (row: Employee) => void,
  confirmDeleteEmployee: any,
): ColumnDefinition<Employee>[] => {
  return [
    {
      accessor: 'role',
      header: 'Role',
      render: (row: Employee) => (
        <Text size="sm" className="text-gray-700 capitalize">
          {row.role || 'N/A'}
        </Text>
      ),
    },
    {
      accessor: 'gradeLevel',
      header: 'Grade Level',
      render: (row: Employee) => (
        <Badge
          className="px-3 font-400 h-20 uppercase text-[#6366f1] bg-[rgba(99, 102, 241, 0.1)]"
          variant="light"
          radius="xl"
          size="sm"
        >
          {row.gradeLevel || 'N/A'}
        </Badge>
      ),
    },
    {
      accessor: 'createdAt',
      header: 'Created At',
      render: (row: Employee) => (
        <Text size="sm" className="text-gray-700 capitalize">
          {row.position || 'N/A'}
        </Text>
      ),
    },
  ]
}
