import { Modal, TextInput, Button, Group, Box, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useGradeLevelContext } from '@/context/GradeLevelContext'
import { v4 as uuidv4 } from 'uuid'
import type { GradeLevel } from '@/types'
import { useEffect } from 'react'
import { useRecentActivityContext } from '@/context/RecentActivityContext'

interface AddGradeLevelModalProps {
  isOpen: boolean
  onClose: () => void
  gradeLevelToEdit?: GradeLevel | null
}

const AddGradeLevelModal = ({
  isOpen,
  onClose,
  gradeLevelToEdit,
}: AddGradeLevelModalProps) => {
  const { dispatch } = useGradeLevelContext()
  const { dispatch: activityDispatch } = useRecentActivityContext()
  const isEditing = !!gradeLevelToEdit

  const form = useForm({
    initialValues: {
      name: '',
      description: '',
    },
    validate: {
      name: (value) =>
        value.length < 2 ? 'Name must be at least 2 characters' : null,
    },
  })

  useEffect(() => {
    if (isEditing && gradeLevelToEdit) {
      form.setValues({
        name: gradeLevelToEdit.name,
        description: gradeLevelToEdit.description || '',
      })
    } else {
      form.reset()
    }
  }, [gradeLevelToEdit, isEditing])

  const handleSubmit = (values: typeof form.values) => {
    if (isEditing && gradeLevelToEdit) {
      dispatch({
        type: 'UPDATE_GRADE_LEVEL',
        payload: {
          ...gradeLevelToEdit,
          ...values,
        },
      })
      activityDispatch({
        type: 'ADD_ACTIVITY',
        payload: {
          id: uuidv4(),
          message: `Grade Level "${values.name}" was updated`,
          type: 'info',
          timestamp: new Date(),
          entity: 'Grade level',
          user: {
            id: 1,
            name: 'Admin',
          },
        },
      })
    } else {
      dispatch({
        type: 'ADD_GRADE_LEVEL',
        payload: {
          id: uuidv4(),
          ...values,
          createdAt: new Date(),
        },
      })
      activityDispatch({
        type: 'ADD_ACTIVITY',
        payload: {
          id: uuidv4(),
          message: `Grade Level "${values.name}" was updated`,
          type: 'info',
          timestamp: new Date(),
          entity: 'Grade level',
          user: {
            id: 1,
            name: 'Admin',
          },
        },
      })
    }
    form.reset()
    onClose()
  }

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Grade Level' : 'Add Grade Level'}
      centered
    >
      <Box
        component="form"
        onSubmit={form.onSubmit(handleSubmit)}
        className="space-y-4"
      >
        <TextInput
          label="Grade Level Name"
          placeholder="e.g. LVL1, LVL2"
          {...form.getInputProps('name')}
          required
        />

        <Textarea
          label="Description"
          placeholder="Optional description"
          {...form.getInputProps('description')}
          rows={3}
        />

        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{isEditing ? 'Update' : 'Save'}</Button>
        </Group>
      </Box>
    </Modal>
  )
}

export default AddGradeLevelModal
