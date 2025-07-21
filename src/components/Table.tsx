import React, { useState } from 'react'
import {
  Table,
  Group,
  Text,
  TextInput,
  Box,
  Loader,
  Badge,
  Pagination,
  Select,
} from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import type { ReusableTableProps, TableRowData } from '@/types/global.type'

function TableComp<T extends TableRowData>({
  data,
  columns,
  totalRecords,
  onPageChange,
  currentPage,
  isLoading,
  tableTitle,
  onSearch,
  showSearch = true,
  showFilter = true,
  filterComponent,
  showPagination = true,
  noDataMessage = 'No data found.',
  headerActions,
  searchPlaceholder = 'Search...',
  onPerPageChange,
}: ReusableTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('')
  const [perPage, setPerPage] = useState(50)

  const calculatedTotalPages = totalRecords
    ? Math.ceil(totalRecords / perPage)
    : currentPage + 1
  const colSpan = columns.length

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.currentTarget.value
    setSearchQuery(query)
    onSearch?.(query)
  }

  const tableRows = data?.map((row, index) => (
    <Table.Tr
      key={row.id || index}
      bg={index % 2 === 1 ? 'white' : 'transparent'}
    >
      {columns.map((column, colIndex) => (
        <Table.Td
          key={String(column.accessor) + colIndex}
          style={{
            textAlign: column.align || 'left',
            fontFamily: 'Poppins, sans-serif',
          }}
          className="whitespace-nowrap"
        >
          {column.render ? (
            column.render(row)
          ) : (
            <Text
              size="sm"
              c="dimmed"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {String(row[column.accessor as keyof T] ?? '')}
            </Text>
          )}
        </Table.Td>
      ))}
    </Table.Tr>
  ))

  return (
    <Box className="bg-transparent rounded-appRadius">
      <Group
        justify="space-between"
        align="center"
        mb="sm"
        className="flex-wrap"
      >
        <Group align="center">
          <Text size="md" fw={600} className="text-gray-800">
            {tableTitle}
          </Text>
          <Badge
            variant="filled"
            radius="lg"
            className="px-2 py-1 bg-primary"
            styles={{
              root: {
                height: 'md',
                paddingLeft: 'sm',
                paddingRight: 'sm',
                fontSize: 'sm',
                fontWeight: 400,
                color: 'white',
              },
            }}
          >
            {isLoading ? '...' : (totalRecords ?? 0)}
          </Badge>
        </Group>
        <Group className="flex">
          {showSearch && (
            <TextInput
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={handleSearchChange}
              leftSection={<IconSearch size={14} className="text-gray-500" />}
              className="rounded-appRadius"
            />
          )}
          {showFilter && filterComponent && filterComponent}
          {headerActions}
        </Group>
      </Group>
      <Table.ScrollContainer minWidth={800}>
        <Table
          verticalSpacing="sm"
          horizontalSpacing="md"
          className="border-collapse"
          highlightOnHover
        >
          <Table.Thead>
            <Table.Tr bg={'white'}>
              {columns.map((column, index) => (
                <Table.Th
                  key={String(column.accessor) + index}
                  ta={column.align || 'left'}
                  w={column.width}
                  className="text-gray-500 font-medium text-[10px] md:text-sm uppercase px-4 py-3 whitespace-nowrap"
                >
                  {column.header}
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {isLoading ? (
              <Table.Tr>
                <Table.Td colSpan={colSpan}>
                  <Group justify="center" p="xl">
                    <Loader size="xs" type={'bars'} />
                    <Text size="md" c="dimmed">
                      Loading {tableTitle.toLowerCase()} data...
                    </Text>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ) : data && data.length > 0 ? (
              tableRows
            ) : (
              <Table.Tr>
                <Table.Td colSpan={colSpan}>
                  <Text ta="center" c="dimmed" p="md">
                    {noDataMessage}
                  </Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      {showPagination && (
        <Group justify="space-between" mt="md" className="flex-wrap">
          <Group gap={'md'}>
            <Select
              data={['20', '50', '100']}
              size="xs"
              value={perPage as unknown as string}
              onChange={(value) => {
                if (value) {
                  setPerPage(Number(value))
                  onPerPageChange?.(value)
                }
              }}
              w={70}
            />
            <Text size="sm">Per page</Text>
          </Group>
          <Pagination
            total={calculatedTotalPages}
            value={currentPage}
            onChange={onPageChange}
            boundaries={1}
            siblings={1}
            color="blue"
            size="xs"
            className="rounded-appRadius"
          />
        </Group>
      )}
    </Box>
  )
}

export default TableComp
