import { createFileRoute } from '@tanstack/react-router'
import DashboardLayout from '@/layout/dashboard.layout'
import { Button, Select, Stack } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import TableComp from '@/components/Table'
import { employeeColumns } from '@/columns/employeeColumn'
import { useState, useMemo } from 'react'
import AddEmployeeModal from '@/components/modal/AddEmployeeModal'
import { useEmployeeContext } from '@/context/EmployeeContext'
import type { Employee } from '@/types'
import { EmployeeViewModal } from '@/components/modal/EmployeeViewModal'
import { ConfirmDeleteModal } from '@/components/modal/ConfirmDeleteModal'
import { notifications } from '@mantine/notifications'
import { IconCheck, IconX } from '@tabler/icons-react'
import { useGradeLevelContext } from '@/context/GradeLevelContext'
import { useRecentActivityContext } from '@/context/RecentActivityContext'
import { v4 as uuidv4 } from 'uuid'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const { state, dispatch } = useEmployeeContext()
  const { state: gradeState } = useGradeLevelContext()
  const { dispatch: activityDispatch } = useRecentActivityContext()
  const [openAddEmployeeModal, setOpenAddEmployeeModal] = useState(false)
  const [openViewModal, setOpenViewModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  )
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(
    null,
  )
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const gradeLevelOptions = useMemo(() => {
    return gradeState.gradeLevels.map((level) => ({
      label: level.name,
      value: level.id,
    }))
  }, [gradeState.gradeLevels])

  // Filter employees based on selected level and search query
  const filteredEmployees = useMemo(() => {
    return state.employees.filter((employee) => {
      // Filter by level if one is selected
      const levelMatch = selectedLevel
        ? employee.gradeLevel === selectedLevel
        : true

      // Filter by search query (case insensitive)
      const searchMatch = searchQuery
        ? employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          employee.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          employee.department
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          employee.position?.toLowerCase().includes(searchQuery.toLowerCase())
        : true

      return levelMatch && searchMatch
    })
  }, [state.employees, selectedLevel, searchQuery])

  const handleView = (employee: Employee) => {
    setSelectedEmployee(employee)
    setOpenViewModal(true)
  }

  const handleEdit = (employee: Employee) => {
    setEmployeeToEdit(employee)
    setOpenAddEmployeeModal(true)
  }

  const confirmDelete = (employee: Employee) => {
    setEmployeeToDelete(employee)
    setOpenDeleteModal(true)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const onDeleteConfirm = async () => {
    if (!employeeToDelete) return

    setIsDeleting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      dispatch({
        type: 'DELETE_EMPLOYEE',
        payload: employeeToDelete.id,
      })
      activityDispatch({
        type: 'ADD_ACTIVITY',
        payload: {
          id: uuidv4(),
          message: `Employee "${employeeToDelete.name}" was added`,
          type: 'warning',
          timestamp: new Date(),
          entity: 'employee',
          user: {
            id: 1,
            name: 'Admin',
          },
        },
      })

      notifications.show({
        title: 'Success',
        message: 'Employee deleted successfully',
        color: 'green',
        icon: <IconCheck />,
      })
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to delete employee',
        color: 'red',
        icon: <IconX />,
      })
    } finally {
      setIsDeleting(false)
      setOpenDeleteModal(false)
      setEmployeeToDelete(null)
    }
  }

  return (
    <DashboardLayout>
      <div className="flex justify-end items-center gap-3 w-full mb-4 text-sm">
        <Button
          leftSection={<IconPlus size={14} />}
          className="text-primary rounded-appRadius"
          size="xs"
          onClick={() => {
            setEmployeeToEdit(null)
            setOpenAddEmployeeModal(true)
          }}
        >
          Add Employee
        </Button>
      </div>
      <TableComp
        data={filteredEmployees}
        columns={employeeColumns(
          handleView,
          handleEdit,
          confirmDelete,
          gradeState.gradeLevels,
        )}
        totalRecords={filteredEmployees.length}
        onPageChange={() => {}}
        tableTitle="Employees"
        onSearch={handleSearch}
        filterComponent={
          <Stack gap="xs">
            <Select
              placeholder="Select Grade Level"
              data={gradeLevelOptions}
              value={selectedLevel}
              onChange={setSelectedLevel}
              className="rounded-appRadius"
              searchable
              clearable
              nothingFoundMessage="No level found, please create a level in the level section."
              size={'sm'}
            />
          </Stack>
        }
        searchPlaceholder="Search employees..."
        currentPage={0}
        isLoading={false}
      />

      <AddEmployeeModal
        onClose={() => setOpenAddEmployeeModal(false)}
        isOpen={openAddEmployeeModal}
        employeeToEdit={employeeToEdit}
      />

      <EmployeeViewModal
        isOpen={openViewModal}
        onClose={() => setOpenViewModal(false)}
        employee={selectedEmployee}
        gradeLevels={gradeState.gradeLevels}
      />

      <ConfirmDeleteModal
        isOpen={openDeleteModal}
        onClose={() => {
          if (!isDeleting) {
            setOpenDeleteModal(false)
            setEmployeeToDelete(null)
          }
        }}
        onConfirm={onDeleteConfirm}
        title="Delete Employee"
        description={`Are you sure you want to delete ${employeeToDelete?.name}?`}
        isLoading={isDeleting}
      />
    </DashboardLayout>
  )
}
