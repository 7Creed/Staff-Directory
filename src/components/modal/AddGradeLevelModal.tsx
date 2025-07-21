<<<<<<< HEAD
// import { useEmployeeContext } from '@/context/EmployeeContext'
// import { Modal } from '@mantine/core'
// import { useState } from 'react'

// const AddGradeLevelModal = () => {
//   const { state, dispatch } = useEmployeeContext()

//   const [formData, setFormData] = useState<Partial<Employee>>({
//     role: '',
//     gradeLevel: '',
//   })

//   const handleChange = (field: keyof Employee, value: any) => {
//     setFormData((prev) => ({ ...prev, [field]: value }))
//   }

//   const handleSubmit = () => {
//     if (!formData.name || !formData.department) {
//       alert('Name and Department are required.')
//       return
//     }

//     const newEmployee: Employee = {
//       ...(formData as Employee),
//       id: uuidv4(),
//       gradeLevel: formData.gradeLevel ?? '',
//     }

//     dispatch({ type: 'ADD_EMPLOYEE', payload: newEmployee })

//     onClose()
//   }

//   console.log(state.countries)

//   return (
//     <Modal onClose={onClose} opened={isOpen}>
//       {' '}
//       <div className="">
//         <div className="">
//           <h2 className="text-xl font-bold mb-4">Add New Employee</h2>

//           <div className="space-y-3">
//             <label>
//               Role <span className="text-red-500">*</span>
//             </label>
//             <br />
//             <input
//               className="w-full border p-2 rounded"
//               placeholder="Role"
//               onChange={(e) => handleChange('role', e.target.value)}
//               required
//             />

//             {/* <label>
//               Name <span className="text-red-500">*</span>
//             </label> */}
//             <select
//               name="country"
//               className="w-full border p-2 rounded mb-3"
//               value={formData.country}
//               onChange={(e) => handleChange('country', e.target.value)}
//             >
//               <option value="">— None —</option>
//               {/* <option value="">Select Grade</option> */}
//               {Object.keys(state.countries).map((g) => (
//                 <option key={g.id} value={g.title}>
//                   {g.title}
//                 </option>
//               ))}
//             </select>

//             <select
//               name="gradeLevel"
//               className="w-full border p-2 rounded mb-3"
//               value={formData.gradeLevel}
//               onChange={(e) => handleChange('gradeLevel', e.target.value)}
//             >
//               <option value="">— None —</option>
//               {/* <option value="">Select Grade</option> */}
//               {state.gradeLevels.map((g) => (
//                 <option key={g.id} value={g.title}>
//                   {g.title}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="mt-6 flex justify-end gap-2">
//             <button
//               className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//               onClick={onClose}
//             >
//               Cancel
//             </button>
//             <button
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//               onClick={handleSubmit}
//             >
//               Add Employee
//             </button>
//           </div>
//         </div>
//       </div>
//     </Modal>
//   )
// }

// export default AddGradeLevelModal

import { useEmployeeContext } from '@/context/EmployeeContext'
import { Modal } from '@mantine/core'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const AddNewGradeLevelModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) => {
  const { dispatch } = useEmployeeContext()

  const [gradeLevelTitle, setGradeLevelTitle] = useState('')

  const handleSubmit = () => {
    if (!gradeLevelTitle.trim()) {
      alert('Grade Level title is required.')
      return
    }

    dispatch({
      type: 'ADD_GRADE_LEVEL',
      payload: { id: uuidv4(), title: gradeLevelTitle },
    })

    setGradeLevelTitle('')
=======
import { Modal, TextInput, Button, Group, Box, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useGradeLevelContext } from '@/context/GradeLevelContext'
import { v4 as uuidv4 } from 'uuid'
import type { GradeLevel } from '@/types'
import { useEffect } from 'react'

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
    } else {
      dispatch({
        type: 'ADD_GRADE_LEVEL',
        payload: {
          id: uuidv4(),
          ...values,
          createdAt: new Date(),
        },
      })
    }
    form.reset()
>>>>>>> 1b12650 (ft: table, level, updated)
    onClose()
  }

  return (
<<<<<<< HEAD
    <Modal opened={isOpen} onClose={onClose} title="Add New Grade Level">
      <div className="space-y-4">
        <input
          type="text"
          className="w-full border p-2 rounded"
          placeholder="Grade Level Title"
          value={gradeLevelTitle}
          onChange={(e) => setGradeLevelTitle(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Add Grade Level
          </button>
        </div>
      </div>
=======
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
>>>>>>> 1b12650 (ft: table, level, updated)
    </Modal>
  )
}

<<<<<<< HEAD
export default AddNewGradeLevelModal
=======
export default AddGradeLevelModal
>>>>>>> 1b12650 (ft: table, level, updated)
