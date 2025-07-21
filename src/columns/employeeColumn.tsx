import type { Employee, GradeLevel } from '@/types'
import type { ColumnDefinition } from '@/types/global.type'
import { ActionIcon, Badge, Box, Group, Menu, Text } from '@mantine/core'
import {
  IconDots,
  IconEye,
  IconPencil,
  IconTrash,
  IconUser,
} from '@tabler/icons-react'

export const employeeColumns = (
  handleView: (row: Employee) => void,
  handleEdit: (row: Employee) => void,
  confirmDeleteEmployee: any,
  gradeLevels: GradeLevel[],
): ColumnDefinition<Employee>[] => {
  return [
    {
      accessor: 'name',
      header: 'Name',
      render: (row: Employee) => (
        <Group wrap="nowrap">
          <Box className="flex items-center justify-center flex-shrink-0 rounded-appRadius bg-blue-50 p-2 size-8">
            <IconUser size={16} className="text-blue-600" />
          </Box>
          <p className="text-gray-800 capitalize line-clamp-1 text-xs md:text-sm">
            {row.name || 'N/A'}
          </p>
        </Group>
      ),
    },
    {
      accessor: 'department',
      header: 'Department',
      render: (row: Employee) => (
        <p className="text-gray-800 capitalize line-clamp-1 text-xs md:text-sm">
          {row.department || 'N/A'}
        </p>
      ),
    },
    {
      accessor: 'role',
      header: 'Role',
      render: (row: Employee) => (
        <p className="text-gray-800 capitalize line-clamp-1 text-xs md:text-sm">
          {row.role || 'N/A'}
        </p>
      ),
    },
    {
      accessor: 'position',
      header: 'Position',
      render: (row: Employee) => (
        <p className="text-gray-800 capitalize line-clamp-1 text-xs md:text-sm">
          {row.position || 'N/A'}
        </p>
      ),
    },
    {
      accessor: 'gradeLevel',
      header: 'Grade Level',
      render: (row: Employee) => {
        const gradeLevel = gradeLevels.find(
          (level: GradeLevel) => level.id === row.gradeLevel,
        )
        return (
          <Badge
            className="px-3 font-400 h-20 uppercase text-[#6366f1] bg-[rgba(99, 102, 241, 0.1)]"
            variant="light"
            radius="xl"
            size="sm"
          >
            {gradeLevel?.name || 'N/A'}
          </Badge>
        )
      },
    },
    {
      accessor: 'country',
      header: 'Country',
      render: (row: Employee) => (
        <p className="text-gray-800 capitalize line-clamp-1 text-xs md:text-sm">
          {row.country || 'N/A'}
        </p>
      ),
    },
    {
      accessor: 'subcountry',
      header: 'Sub Country',
      render: (row: Employee) => (
        <p className="text-gray-800 capitalize line-clamp-1 text-xs md:text-sm">
          {row.subcountry || 'N/A'}
        </p>
      ),
    },
    {
      accessor: 'action',
      header: 'Action',
      align: 'center',
      render: (row: Employee) => (
        <Menu shadow="md" position="bottom-end">
          <Menu.Target>
            <ActionIcon
              variant="subtle"
              color="gray"
              aria-label="Product actions"
              size="md"
            >
              <IconDots size="md" />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              leftSection={<IconEye size={16} />}
              onClick={() => {
                handleView(row)
              }}
            >
              <Text size="sm">View</Text>
            </Menu.Item>
            <Menu.Item
              leftSection={<IconPencil size={16} />}
              onClick={() => {
                handleEdit(row)
              }}
            >
              <Text size="sm">Edit</Text>
            </Menu.Item>
            <Menu.Item
              leftSection={<IconTrash size={16} />}
              color="red"
              onClick={() => {
                confirmDeleteEmployee(row)
              }}
            >
              <Text size="sm">Delete</Text>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      ),
    },
  ]
}
