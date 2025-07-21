import type { GradeLevel } from '@/types'
import type { ColumnDefinition } from '@/types/global.type'
import { ActionIcon, Badge, Menu, Text } from '@mantine/core'
import { IconDots, IconPencil, IconTrash } from '@tabler/icons-react'

export const gradeLevelColumns = (
  handleEdit: (row: GradeLevel) => void,
  confirmDelete: (row: GradeLevel) => void,
): ColumnDefinition<GradeLevel>[] => {
  return [
    {
      accessor: 'name',
      header: 'Grade Level',
      render: (row: GradeLevel) => (
        <Badge
          className="px-3 font-400 h-20 uppercase text-[#6366f1] bg-[rgba(99, 102, 241, 0.1)]"
          variant="light"
          radius="xl"
          size="sm"
        >
          {row.name || 'N/A'}
        </Badge>
      ),
    },
    {
      accessor: 'description',
      header: 'Description',
      render: (row: GradeLevel) => (
        <Text size="sm" c="dimmed" className="line-clamp-1">
          {row.description || 'No description'}
        </Text>
      ),
    },
    {
      accessor: 'createdAt',
      header: 'Created At',
      render: (row: GradeLevel) => {
        if (!row.createdAt)
          return (
            <Text size="sm" c="dimmed">
              N/A
            </Text>
          )

        const date = new Date(row.createdAt)
        const formattedDate = date.toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
        return (
          <Text size="sm" c="dimmed">
            {`${formattedDate}`}
          </Text>
        )
      },
    },
    {
      accessor: 'action',
      header: 'Action',
      align: 'center',
      render: (row: GradeLevel) => (
        <Menu shadow="md" position="bottom-end">
          <Menu.Target>
            <ActionIcon variant="subtle" color="gray" size="md">
              <IconDots size="md" />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              leftSection={<IconPencil size={16} />}
              onClick={() => handleEdit(row)}
            >
              <Text size="sm">Edit</Text>
            </Menu.Item>
            <Menu.Item
              leftSection={<IconTrash size={16} />}
              color="red"
              onClick={() => confirmDelete(row)}
            >
              <Text size="sm">Delete</Text>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      ),
    },
  ]
}
