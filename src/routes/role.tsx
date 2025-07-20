import DashboardLayout from '@/layout/dashboard.layout'
import { Button } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/role')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <DashboardLayout>
      <div className="flex justify-end items-center gap-3 w-full mb-4 text-sm">
        <Button
          leftSection={<IconPlus size={14} />}
          className="text-primary rounded-appRadius"
          size="xs"
          onClick={() => setOpenAddRoleModal(!openAddRoleModal)}
        >
          Add Employee
        </Button>
      </div>
      <TableComp
        data={sampleRole}
        columns={roleColumns(handleView, confirmDelete)}
        totalRecords={roleColumns?.length}
        // onPageChange={() => {}}
        // currentPage={currentPage}
        // isLoading={customerLoading}
        tableTitle="Sample Role"
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

      <AddRoleModal
        onClose={() => setOpenAddRoleModal(false)}
        isOpen={openAddRoleModal}
      />
    </DashboardLayout>
  )
}
