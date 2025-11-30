// import { useId } from 'react'

import {
  Modal,
  TextInput,
  Button,
  Select,
  Group,
  Box,
  Flex,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEmployeeContext } from '@/context/EmployeeContext'
import { v4 as uuidv4 } from 'uuid'
import type { Employee } from '@/types'
import { useEffect, useState } from 'react'
import { notifications } from '@mantine/notifications'
import { useGradeLevelContext } from '@/context/GradeLevelContext'
import { useRecentActivityContext } from '@/context/RecentActivityContext'

interface AddEmployeeModalProps {
  isOpen: boolean
  onClose: () => void
  employeeToEdit?: Employee | null
}
// (ft: table, level, updated)

const AddEmployeeModal = ({
  isOpen,
  onClose,
  employeeToEdit,
}: AddEmployeeModalProps) => {
  const { state, dispatch } = useEmployeeContext()
  const { dispatch: activityDispatch } = useRecentActivityContext()
  const { state: gradeLevelState } = useGradeLevelContext()
  const [isLoading, setIsLoading] = useState(false)
  const countryOptions = Object.keys(state.countries).map((c) => ({
    value: c,
    label: c,
  }))

  const isEditing = !!employeeToEdit

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      country: '',
      subcountry: '',
      address: '',
      role: '',
      department: '',
      position: '',
      gradeLevel: '',
    },

    validate: {
      name: (value) => (value.length < 2 ? 'Name too short' : null),
      country: (value) => (!value ? 'Select country' : null),
      subcountry: (value) => (!value ? 'Select subcountry' : null),
    },
  })

  useEffect(() => {
    if (isEditing && employeeToEdit) {
      form.setValues({
        name: employeeToEdit?.name,
        email: employeeToEdit?.email,
        country: employeeToEdit.country,
        subcountry: employeeToEdit.subcountry,
        address: employeeToEdit.address,
        role: employeeToEdit.role,
        department: employeeToEdit.department,
        position: employeeToEdit.position,
        gradeLevel: employeeToEdit.gradeLevel,
      })
    } else {
      form.reset()
    }
  }, [employeeToEdit])

  const handleSubmit = async (values: typeof form.values) => {
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (isEditing && employeeToEdit) {
        dispatch({
          type: 'UPDATE_EMPLOYEE',
          payload: {
            id: employeeToEdit.id,
            ...values,
          },
        })
        activityDispatch({
          type: 'ADD_ACTIVITY',
          payload: {
            id: uuidv4(),
            message: `Employee "${values.name}" was updated`,
            type: 'info',
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
          message: 'Employee updated successfully!',
          color: 'blue',
        })
      } else {
        dispatch({
          type: 'ADD_EMPLOYEE',
          payload: {
            id: uuidv4(),
            ...values,
          },
        })
        activityDispatch({
          type: 'ADD_ACTIVITY',
          payload: {
            id: uuidv4(),
            message: `Employee "${values.name}" was added`,
            type: 'info',
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
          message: 'Employee added successfully!',
          color: 'blue',
        })
      }

      form.reset()
      onClose()
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Error saving employee!. Please try again',
        color: 'red',
      })
      console.error('Error saving employee:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal
      size={'lg'}
      opened={isOpen}
      onClose={() => {
        form.reset()
        onClose()
      }}
      title={isEditing ? 'Edit Employee' : 'Add Employee'}
      centered
    >
      <Box
        component="form"
        onSubmit={form.onSubmit(handleSubmit)}
        className="space-y-3"
      >
        <Flex gap={'md'}>
          <TextInput
            label="Full Name"
            {...form.getInputProps('name')}
            required
            w={'100%'}
          />
          <TextInput
            label="Email Address"
            {...form.getInputProps('email')}
            required
            w={'100%'}
          />
        </Flex>

        <Flex gap={'md'}>
          <Select
            label="Country"
            data={countryOptions}
            {...form.getInputProps('country')}
            onChange={(value) => {
              form.setFieldValue('country', value || '')
              form.setFieldValue('subcountry', '')
            }}
            w={'100%'}
            required
          />

          <Select
            label="Subcountry"
            data={
              form.values.country ? state.countries[form.values.country] : []
            }
            {...form.getInputProps('subcountry')}
            w={'100%'}
            required
          />
        </Flex>

        <TextInput label="Address" {...form.getInputProps('address')} />

        <Flex gap={'md'}>
          <Select
            label="Role"
            data={[
              { label: 'Admin', value: 'admin' },
              { label: 'User', value: 'user' },
            ]}
            {...form.getInputProps('role')}
            required
            w={'100%'}
          />
          <TextInput
            label="Department"
            {...form.getInputProps('department')}
            w={'100%'}
          />
        </Flex>
        <Flex gap={'md'}>
          <TextInput
            label="Position"
            {...form.getInputProps('position')}
            w={'100%'}
          />
          <Select
            label="Grade Level"
            data={gradeLevelState.gradeLevels.map((level) => ({
              label: level.name,
              value: level.id,
            }))}
            {...form.getInputProps('gradeLevel')}
            required
            w={'100%'}
          />
        </Flex>

        <Group justify="flex-end" mt="md">
          <Button
            variant="default"
            onClick={() => {
              form.reset()
              onClose()
            }}
          >
            Cancel
          </Button>
          <Button type="submit" loading={isLoading}>
            {isEditing ? 'Update' : 'Save'}
          </Button>
        </Group>
      </Box>
    </Modal>
  )
}

export default AddEmployeeModal
