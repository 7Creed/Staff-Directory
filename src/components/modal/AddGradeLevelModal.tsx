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
    onClose()
  }

  return (
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
    </Modal>
  )
}

export default AddNewGradeLevelModal
