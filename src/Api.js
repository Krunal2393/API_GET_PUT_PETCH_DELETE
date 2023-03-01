// Api XML to JSON but the data JSON Update In XML than The code is Differeent Nut it's Work Properly But Error is the BAckend Data in XML than face some ISSUE

// import React, { useState, useEffect } from 'react'
// import axios from 'axios'

// const Api = () => {
//   const [students, setStudents] = useState([])
//   const [newStudent, setNewStudent] = useState({ name: '', age: '' })
//   const [updatedStudent, setUpdatedStudent] = useState(null)

//   // GET request to fetch all students
//   useEffect(() => {
//     axios
//       .get('http://127.0.0.1:8000/student/')
//       .then(res => setStudents(res.data))
//       .catch(err => console.log(err))
//   }, [])

//   // POST request to add a new student
//   const handleAddStudent = () => {
//     axios
//       .post('http://127.0.0.1:8000/student', newStudent)
//       .then(res => {
//         setStudents([...students, res.data])
//         setNewStudent({ name: '', age: '' })
//       })
//       .catch(err => console.log(err))
//   }

//   // PUT request to update an existing student
//   const handleUpdateStudent = () => {
//     axios
//       .put(`http://127.0.0.1:8000/student${updatedStudent.id}/`, updatedStudent)
//       .then(res => {
//         const updatedStudents = students.map(student => {
//           if (student.id === res.data.id) {
//             return res.data
//           }
//           return student
//         })
//         setStudents(updatedStudents)
//         setUpdatedStudent(null)
//       })
//       .catch(err => console.log(err))
//   }

//   // DELETE request to remove a student
//   const handleDeleteStudent = id => {
//     axios
//       .delete(`http://127.0.0.1:8000/student${id}/`)
//       .then(res => {
//         const updatedStudents = students.filter(student => student.id !== id)
//         setStudents(updatedStudents)
//       })
//       .catch(err => console.log(err))
//   }

//   return (
//     <div>
//       <h1>Students</h1>
//       <ul>
//         {students.map(student => (
//           <li key={student.id}>
//             {student.name}, {student.age} years old
//             <button onClick={() => handleDeleteStudent(student.id)}>
//               Delete
//             </button>
//             <button onClick={() => setUpdatedStudent(student)}>Edit</button>
//           </li>
//         ))}
//       </ul>
//       <h2>Add student</h2>
//       <label>
//         Name:
//         <input
//           type='text'
//           value={newStudent.name}
//           onChange={e => setNewStudent({ ...newStudent, name: e.target.value })}
//         />
//       </label>
//       <label>
//         Age:
//         <input
//           type='text'
//           value={newStudent.age}
//           onChange={e => setNewStudent({ ...newStudent, age: e.target.value })}
//         />
//       </label>
//       <button onClick={handleAddStudent}>Add</button>
//       {updatedStudent && (
//         <>
//           <h2>Edit student</h2>
//           <label>
//             Name:
//             <input
//               type='text'
//               value={updatedStudent.name}
//               onChange={e =>
//                 setUpdatedStudent({ ...updatedStudent, name: e.target.value })
//               }
//             />
//           </label>
//           <label>
//             Age:
//             <input
//               type='text'
//               value={updatedStudent.age}
//               onChange={e =>
//                 setUpdatedStudent({ ...updatedStudent, age: e.target.value })
//               }
//             />
//           </label>
//           <button onClick={handleUpdateStudent}>Update</button>
//         </>
//       )}
//     </div>
//   )
// }

// export default Api

// Api Calling Fack api

import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = 'https://jsonplaceholder.typicode.com/users'

function Api () {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  console.log(users)
  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
      )
      setUsers(response.data)
      setIsLoading(false)
    } catch (error) {
      setError(error.message)
      setIsLoading(false)
    }
  }

  const addUser = async user => {
    try {
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/users',
        user
      )
      setUsers(prevUsers => [...prevUsers, response.data])
    } catch (error) {
      setError(error.message)
    }
    console.log('user ', user)
  }

  const updateUser = async (id, updatedUser) => {
    try {
      const response = await axios.put(
        `${'https://jsonplaceholder.typicode.com/users'}/${id}`,
        updatedUser
      )
      setUsers(prevUsers =>
        prevUsers.map(user => (user.id === id ? response.data : user))
      )
    } catch (error) {
      setError(error.message)
    }
    console.log(id)
  }

  const deleteUser = async id => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id))
    } catch (error) {
      setError(error.message)
    }
    console.log(id)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.email})
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Add User</h2>
      <form
        onSubmit={event => {
          event.preventDefault()
          const newUser = {
            name: event.target.name.value,
            email: event.target.email.value
          }
          addUser(newUser)
          event.target.reset()
        }}
      >
        <label>
          Name:
          <input type='text' name='name' required />
        </label>
        <br />
        <label>
          Email:
          <input type='email' name='email' required />
        </label>
        <br />
        <button type='submit'>Add</button>
      </form>
      <h2>Update User</h2>
      <form
        onSubmit={event => {
          event.preventDefault()
          const id = event.target.id.value
          const updatedUser = {
            name: event.target.name.value,
            email: event.target.email.value
          }
          updateUser(id, updatedUser)
          event.target.reset()
        }}
      >
        <label>
          ID:
          <input type='number' name='id' required />
        </label>
        <br />
        <label>
          Name:
          <input type='text' name='name' required />
        </label>
        <br />
        <label>
          Email:
          <input type='email' name='email' required />
        </label>
        <br />
        <button type='submit'>Update</button>
      </form>
    </div>
  )
}
export default Api
