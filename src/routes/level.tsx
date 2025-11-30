import DashboardLayout from '@/layout/dashboard.layout'
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import TableComp from '@/components/Table'
import { gradeLevelColumns } from '@/columns/gradeLevelColumn'
import { useState } from 'react'
import { useGradeLevelContext } from '@/context/GradeLevelContext'
import { ConfirmDeleteModal } from '@/components/modal/ConfirmDeleteModal'
import type { GradeLevel } from '@/types'
import AddGradeLevelModal from '@/components/modal/AddGradeLevelModal'
import { useRecentActivityContext } from '@/context/RecentActivityContext'
import { v4 as uuidv4 } from 'uuid'

export const Route = createFileRoute('/level')({
  component: RouteComponent,
})

function RouteComponent() {
  const { state, dispatch } = useGradeLevelContext()
  const { dispatch: activityDispatch } = useRecentActivityContext()
  const [openAddModal, setOpenAddModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [gradeLevelToEdit, setGradeLevelToEdit] = useState<GradeLevel | null>(
    null,
  )
  const [gradeLevelToDelete, setGradeLevelToDelete] =
    useState<GradeLevel | null>(null)

  const handleEdit = (level: GradeLevel) => {
    setGradeLevelToEdit(level)
    setOpenAddModal(true)
  }

  const confirmDelete = (level: GradeLevel) => {
    setGradeLevelToDelete(level)
    setOpenDeleteModal(true)
  }

  const onDeleteConfirm = () => {
    if (gradeLevelToDelete) {
      dispatch({ type: 'DELETE_GRADE_LEVEL', payload: gradeLevelToDelete.id })
      activityDispatch({
        type: 'ADD_ACTIVITY',
        payload: {
          id: uuidv4(),
          message: `Employee "${gradeLevelToDelete.name}" was added`,
          type: 'warning',
          timestamp: new Date(),
          entity: 'gradeLevel',
          user: {
            id: 1,
            name: 'Admin',
          },
        },
      })
      setOpenDeleteModal(false)
      setGradeLevelToDelete(null)
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
            setGradeLevelToEdit(null)
            setOpenAddModal(true)
          }}
        >
          Add Grade Level
        </Button>
      </div>

      <TableComp
        data={state.gradeLevels}
        columns={gradeLevelColumns(handleEdit, confirmDelete)}
        totalRecords={state.gradeLevels.length}
        onPageChange={() => {}}
        tableTitle="Grade Levels"
        searchPlaceholder="Search grade levels..."
        currentPage={0}
        isLoading={false}
      />

      <AddGradeLevelModal
        isOpen={openAddModal}
        onClose={() => setOpenAddModal(false)}
        gradeLevelToEdit={gradeLevelToEdit}
      />

      <ConfirmDeleteModal
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={onDeleteConfirm}
        title="Delete Grade Level"
        description={`Are you sure you want to delete ${gradeLevelToDelete?.name}?`}
      />
    </DashboardLayout>
  )
}
