import { createFileRoute, Link } from '@tanstack/react-router'
// import logo from '../logo.svg'
import DashboardLayout from '@/layout/dashboard.layout'
import { Button } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import TableComp from '@/components/Table'
import { employeeColumns } from '@/columns/employeeColumn'
import { sampleEmployees } from '@/data/mockEmployee'
import { useState } from 'react'
import AddEmployeeModal from '@/components/modal/AddEmployeeModal'

export const Route = createFileRoute('/')({
  component: App,
})

const handleView = () => {}

const confirmDelete = () => {}

const handleSearch = () => {}

const handleApplyFilter = () => {}

function App() {
  const [openAddEmployeeModal, setOpenAddEmployeeModal] = useState(false)

  return (
    <DashboardLayout>
      <div className="flex justify-end items-center gap-3 w-full mb-4 text-sm">
        <Button
          leftSection={<IconPlus size={14} />}
          className="text-primary rounded-appRadius"
          size="xs"
          onClick={() => setOpenAddEmployeeModal(!openAddEmployeeModal)}
        >
          Add Employee
        </Button>
      </div>
      <TableComp
        data={sampleEmployees}
        columns={employeeColumns(handleView, confirmDelete)}
        totalRecords={employeeColumns?.length}
        // onPageChange={() => {}}
        // currentPage={currentPage}
        // isLoading={customerLoading}
        tableTitle="Sample Employees"
        onSearch={handleSearch}
        // showPagination={true}
        onFilter={handleApplyFilter}
        searchPlaceholder="Search by amount"
        // onPageChange={function (page: number): void {
        //   throw new Error('Function not implemented.')
        // }}
        currentPage={0}
        isLoading={false}
        // onPerPageChange={(value) =>
        //   setSearchParams((prev) => ({ ...prev, limit: Number(value) }))
        // }
      />

      <AddEmployeeModal
        onClose={() => setOpenAddEmployeeModal(false)}
        isOpen={openAddEmployeeModal}
      />
    </DashboardLayout>
  )
}
