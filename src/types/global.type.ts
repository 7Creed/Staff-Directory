export type TableRowData = Record<string, any>

export interface ColumnDefinition<T extends TableRowData> {
  accessor: keyof T | string
  header: React.ReactNode
  width?: string | number
  render?: (row: T) => React.ReactNode
  align?: 'left' | 'center' | 'right'
}

export interface ReusableTableProps<T extends TableRowData> {
  data: T[] | undefined
  columns: ColumnDefinition<T>[]
  totalRecords: number | undefined
  recordsPerPage?: number
  onPageChange: (page: number) => void
  currentPage: number
  isLoading: boolean
  tableTitle: string
  onSearch?: (query: string) => void
  onFilter?: (value: any | undefined) => void
  showSearch?: boolean
  showFilter?: boolean
  filterComponent?: React.ReactNode
  showPagination?: boolean
  pagination?: PaginationTypes
  noDataMessage?: string
  headerActions?: React.ReactNode
  hasMorePages?: boolean
  searchPlaceholder?: string
  onPerPageChange?: (value: string) => void
}

export interface PaginationTypes {
  nextKey?: string | undefined
  limit?: number
}

export interface SearchParams {
  limit: string
  searchTerm?: string | undefined
  nextKey?: string | undefined
  range?: string
}
