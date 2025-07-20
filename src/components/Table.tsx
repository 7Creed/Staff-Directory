import React, { useState } from 'react'
import {
  Table,
  Group,
  Text,
  TextInput,
  Button,
  Box,
  Loader,
  Badge,
  Pagination,
  Menu,
  Checkbox,
  Divider,
  Select,
} from '@mantine/core'
import {
  IconSearch,
  IconAdjustmentsHorizontal,
  IconChevronDown,
} from '@tabler/icons-react'
import { DatePicker } from '@mantine/dates'
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
  onFilter,
  showSearch = true,
  showFilter = true,
  showPagination = true,
  pagination = {
    limit: 5,
    nextKey: undefined,
  },
  noDataMessage = 'No data found.',
  headerActions,
  searchPlaceholder = 'Search...',
  onPerPageChange,
}: ReusableTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('')
  const [openFilterMenu, setOpenFilterMenu] = useState(false)
  const [filterSelection, setFilterSelection] = useState('')
  const [perPage, setPerPage] = useState(50)
  const [dateRange, setDateRange] = useState<[string | null, string | null]>([
    null,
    null,
  ])

  const hasMorePages = !!pagination?.nextKey
  const totalPages = hasMorePages ? currentPage + 1 : currentPage
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
      <Group justify="space-between" align="center" mb="sm">
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
                color: 'black',
              },
            }}
          >
            {isLoading ? '...' : (totalRecords ?? 0)}
          </Badge>
        </Group>
        <Group>
          {showSearch && (
            <TextInput
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={handleSearchChange}
              leftSection={<IconSearch size="md" className="text-gray-500" />}
              className="rounded-appRadius"
              size="sm"
              styles={{
                input: {
                  '&::placeholder': {
                    color: 'var(--mantine-color-gray-5)',
                  },
                },
              }}
            />
          )}
          {showFilter && (
            <Menu
              shadow="md"
              width={240}
              position="bottom-end"
              closeOnItemClick={false}
              opened={openFilterMenu}
              onChange={setOpenFilterMenu}
            >
              <Menu.Target>
                <Button
                  variant="default"
                  size="xs"
                  fw={'normal'}
                  fz="sm"
                  color="gray"
                  leftSection={<IconAdjustmentsHorizontal size={14} />}
                  rightSection={<IconChevronDown size={14} />}
                  className="rounded-appRadius text-gray-600 border-gray-300 hover:bg-gray-50"
                >
                  Filter
                </Button>
              </Menu.Target>
              <Menu.Dropdown w={'330px'} p={'md'} className="rounded-appRadius">
                <div className="flex justify-between items-center">
                  <Text>By Date</Text>
                  <Text
                    size="sm"
                    c={'red'}
                    onClick={() => {
                      setFilterSelection('')
                      onFilter?.('1m')
                      setOpenFilterMenu(false)
                    }}
                    className="cursor-pointer"
                  >
                    Reset
                  </Text>
                </div>
                <div className="space-y-4 mt-6">
                  <div className="grid grid-cols-2">
                    <Checkbox
                      checked={filterSelection === '1d'}
                      onChange={(_) => setFilterSelection('1d')}
                      label="Today"
                      className="rounded-appRadius"
                    />
                    <Checkbox
                      checked={filterSelection === '2m'}
                      onChange={(_) => setFilterSelection('2m')}
                      label="last 2 Months"
                      className="rounded-appRadius"
                    />
                  </div>
                  <div className="grid grid-cols-2">
                    <Checkbox
                      checked={filterSelection === '1w'}
                      onChange={(_) => setFilterSelection('1w')}
                      label="This Week"
                      className="rounded-appRadius"
                    />
                    <Checkbox
                      checked={filterSelection === '3m'}
                      onChange={(_) => setFilterSelection('3m')}
                      label="Last 3 Months"
                      className="rounded-appRadius"
                    />
                  </div>
                  <div className="grid grid-cols-2">
                    <Checkbox
                      checked={filterSelection === '1m'}
                      onChange={(_) => setFilterSelection('1m')}
                      label="This Month"
                      className="rounded-appRadius"
                    />
                    <Checkbox
                      checked={filterSelection === '6m'}
                      onChange={(_) => setFilterSelection('6m')}
                      label="Last 6 Months"
                      className="rounded-appRadius"
                    />
                  </div>
                  <Divider />
                  <Checkbox
                    checked={filterSelection === 'date-range'}
                    onChange={(_) => setFilterSelection('date-range')}
                    label="Date Range"
                    className="rounded-appRadius"
                  />
                  {filterSelection === 'date-range' && (
                    <DatePicker
                      type="range"
                      value={dateRange}
                      onChange={setDateRange}
                      className="bg-[#f4f5fa] rounded-appRadius"
                    />
                  )}
                  <Button
                    className="rounded-appRadius"
                    fullWidth
                    onClick={() => {
                      onFilter?.(
                        filterSelection === 'date-range'
                          ? dateRange.join(',')
                          : filterSelection,
                      )
                      setOpenFilterMenu(false)
                    }}
                  >
                    Filter
                  </Button>
                </div>
              </Menu.Dropdown>
            </Menu>
          )}
          {headerActions}
        </Group>
      </Group>

      <Table
        miw={800}
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
                fz={'sm'}
                ta={column.align || 'left'}
                w={column.width}
                className="text-gray-500 font-medium text-xs uppercase px-4 py-3"
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

      {showPagination && (
        <Group justify="space-between" mt="md">
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
            total={totalPages}
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
