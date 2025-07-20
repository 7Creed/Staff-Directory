import type { Employee } from '@/types'
import type { ColumnDefinition } from '@/types/global.type'
import { ActionIcon, Badge, Box, Group, Menu, Text } from '@mantine/core'
import { IconDots, IconEye, IconTrash, IconUser } from '@tabler/icons-react'

export const employeeColumns = (
  handleView: (row: Employee) => void,
  confirmDeleteEmployee: any,
): ColumnDefinition<Employee>[] => {
  return [
    {
      accessor: 'name',
      header: 'Name',
      render: (row: Employee) => (
        <Group wrap="nowrap">
          <Box className="flex items-center justify-center flex-shrink-0 rounded-appRadius bg-[rgba(59, 130, 246, 0.08)] size-14">
            <IconUser size={16} className="text-blue-600" />
          </Box>
          <Text size="sm" className="text-gray-800 capitalize" lineClamp={1}>
            {row.name || 'N/A'}
          </Text>
        </Group>
      ),
    },
    {
      accessor: 'department',
      header: 'Department',
      render: (row: Employee) => (
        <Text size="sm" className="text-gray-700 capitalize" lineClamp={1}>
          {row.department || 'N/A'}
        </Text>
      ),
    },
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
      accessor: 'position',
      header: 'Position',
      render: (row: Employee) => (
        <Text size="sm" className="text-gray-700 capitalize">
          {row.position || 'N/A'}
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
      accessor: 'country',
      header: 'Country',
      render: (row: Employee) => (
        <Text size="sm" className="text-gray-700">
          {row.country || 'N/A'}
        </Text>
      ),
    },
    {
      accessor: 'action',
      header: 'Action',
      align: 'center',
      render: (row: Employee) => (
        <Menu shadow="md" width="150px" position="bottom-end">
          <Menu.Target>
            <ActionIcon
              variant="subtle"
              color="gray"
              aria-label="Product actions"
              size="lg"
            >
              <IconDots size="md" />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              leftSection={<IconEye size="md" />}
              onClick={() => {
                handleView(row)
              }}
            >
              <Text size="sm">View</Text>
            </Menu.Item>
            <Menu.Item
              leftSection={<IconTrash size="md" />}
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
