// import type { Employee } from '@/types'
// import { useEmployeeContext } from '@/context/EmployeeContext'

// import { Modal } from '@mantine/core'
// import { useState } from 'react'
// import { v4 as uuidv4 } from 'uuid'

// const AddEmployeeModal = ({
//   onClose,
//   isOpen,
// }: {
//   onClose: () => void
//   isOpen: boolean
// }) => {
//   const { state, dispatch } = useEmployeeContext()

//   const [formData, setFormData] = useState<Partial<Employee>>({
//     name: '',
//     department: '',
//     role: '',
//     position: '',
//     gradeLevel: '',
//     country: '',
//     address: '',
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
//               Name <span className="text-red-500">*</span>
//             </label>
//             <br />
//             <input
//               className="w-full border p-2 rounded"
//               placeholder="Name"
//               onChange={(e) => handleChange('name', e.target.value)}
//               required
//             />

//             <label>
//               Department <span className="text-red-500">*</span>
//             </label>
//             <br />
//             <input
//               className="w-full border p-2 rounded"
//               placeholder="Department"
//               onChange={(e) => handleChange('department', e.target.value)}
//               required
//             />

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
//             Name <span className="text-red-500">*</span>
//           </label> */}
//             <label>
//               Position <span className="text-red-500">*</span>
//             </label>
//             <br />
//             <input
//               className="w-full border p-2 rounded"
//               placeholder="Position"
//               onChange={(e) => handleChange('position', e.target.value)}
//             />

//             <label>
//               Country <span className="text-red-500">*</span>
//             </label>
//             <br />
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
//             <input
//               className="w-full border p-2 rounded"
//               placeholder="Country"
//               onChange={(e) => handleChange('country', e.target.value)}
//               required
//             />

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

// export default AddEmployeeModal

import { Modal, TextInput, Button, Select, Group, Box } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEmployeeContext } from '@/context/EmployeeContext'
import { useId } from 'react'

const AddEmployeeModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) => {
  const { state, dispatch } = useEmployeeContext()
  const countryOptions = Object.keys(state.countries).map((c) => ({
    value: c,
    label: c,
  }))
  const form = useForm({
    initialValues: {
      name: '',
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

  const handleSubmit = (values: typeof form.values) => {
    dispatch({
      type: 'ADD_EMPLOYEE',
      payload: {
        id: useId(),
        ...values,
      },
    })
    form.reset()
    onClose()
  }

  return (
    <Modal
      size={'lg'}
      opened={isOpen}
      onClose={onClose}
      title="Add Employee"
      centered
    >
      <Box
        component="form"
        onSubmit={form.onSubmit(handleSubmit)}
        className="space-y-3"
      >
        <TextInput label="Full Name" {...form.getInputProps('name')} required />

        <Select
          label="Country"
          data={countryOptions}
          {...form.getInputProps('country')}
          onChange={(value) => {
            form.setFieldValue('country', value || '')
            form.setFieldValue('subcountry', '')
          }}
          required
        />

        <Select
          label="Subcountry"
          data={form.values.country ? state.countries[form.values.country] : []}
          {...form.getInputProps('subcountry')}
          required
        />

        <TextInput label="Address" {...form.getInputProps('address')} />

        <Select
          label="Role"
          data={[
            { label: 'Admin', value: 'admin' },
            { label: 'User', value: 'user' },
          ]}
          {...form.getInputProps('role')}
          required
        />
        <TextInput label="Department" {...form.getInputProps('department')} />
        <TextInput label="Position" {...form.getInputProps('position')} />
        <TextInput label="Grade Level" {...form.getInputProps('gradeLevel')} />

        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </Group>
      </Box>
    </Modal>
  )
}

export default AddEmployeeModal
