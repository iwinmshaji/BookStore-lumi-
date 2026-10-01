import React, { useState } from 'react'
import { FaEye, FaEyeSlash, FaUserAlt } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { registerAPI } from '../services/allAPI'

function Auth({ insideRegister }) {
  const navigate = useNavigate()
  const [togglePassword, setTogglePassword] = useState(false)

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      username: Yup.string().min(3, "Must Be atleast 3 charectors").required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values)
      if (insideRegister) {
        console.log("Register API CALL")
        handleRegister(values)
      } else {
        console.log("Login API CALL")
      }
      resetForm()
    }
  })

  const handleRegister = async (userData) => {
    try {
      const result = await registerAPI(userData)
      console.log(result)
      if (result.status == 201) {
        toast.success("Successfully Registered.. please Login!!!")
        navigate("/login")
      } else {
        toast.error(result?.response?.data || "Registration failed")
      }
    } catch (err) {
      console.log(err)
      toast.error(err?.response?.data || "Something went wrong")
    }
  }

  return (
    <div className='w-full min-h-screen flex justify-center items-center bg-[url(/login.png)] bg-cover bg-center text-blue-900'>
      <div className='p-10'>
        <h1 className='text-center font-bold text-3xl'>BOOKSTORE</h1>

        <div style={{ width: '400px' }} className='bg-blue-900 text-white p-5 flex justify-center items-center flex-col my-5'>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%' }} className='border mb-5 flex justify-center items-center'>
            <FaUserAlt className='text-3xl' />
          </div>

          <h1 className='text-3xl'>{insideRegister ? "Register" : "Login"}</h1>

          <form onSubmit={formik.handleSubmit} className='my-5 w-full'>
            {/* username */}
            {
              insideRegister &&
              <>
                <input
                  name='username'
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  className='bg-white p-2 w-full rounded my-5 text-blue-900'
                  type='text'
                  placeholder='UserName'
                />
                <div className='mb-5 text-yellow-400'>{formik.errors.username}</div>
              </>
            }

            {/* email */}
            <input
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              className='bg-white p-2 w-full rounded my-5 text-blue-900'
              type='email'
              placeholder='E Mail'
            />
            <div className='mb-5 text-yellow-400'>{formik.errors.email}</div>

            {/* password */}
            <div className='flex items-center'>
              <input
                name='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                className='bg-white p-2 w-full rounded my-5 text-blue-900'
                type={togglePassword ? "text" : "password"}
                placeholder='Password'
              />
              {
                togglePassword ?
                  <FaEyeSlash onClick={() => setTogglePassword(!togglePassword)} className='text-gray-400 cursor-pointer' style={{ marginTop: '-2px', marginLeft: '-30px' }} />
                  :
                  <FaEye onClick={() => setTogglePassword(!togglePassword)} className='text-gray-400 cursor-pointer' style={{ marginTop: '-2px', marginLeft: '-30px' }} />
              }
            </div>
            <div className='mb-5 text-yellow-400'>{formik.errors.password}</div>

            {/* forgot password */}
            <div className='flex justify-between mb-5'>
              <p className='text-xs text-orange-300'>*Never Share your Password</p>
              {
                !insideRegister &&
                <button type='button' className='text-xs underline'>Forgot Password</button>
              }
            </div>

            {/* Login/Register Button */}
            <div className='text-center'>
              {
                insideRegister ?
                  <button type='submit' className='bg-green-600 p-2 w-full rounded'>Register</button>
                  :
                  <button type='submit' className='bg-green-600 p-2 w-full rounded'>Login</button>
              }
            </div>

            {/* google Login */}
            {
              !insideRegister &&
              <div className='my-5 text-center'>
                <p>-------------------or-------------------</p>
                <div className='mt-2 flex justify-center items-center w-full'>
                  Google Authentication
                </div>
              </div>
            }

            {/* Login / Register link */}
            <div className='text-center my-5'>
              {
                insideRegister ?
                  <p>Existing User?<Link to='/login' className='underline ms-3 text-blue-300'>Login</Link></p>
                  :
                  <p>New User?<Link to='/register' className='underline ms-3 text-blue-300'>Register</Link></p>
              }
            </div>
          </form>
        </div>
      </div>

      {/* toast container */}
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
    </div>
  )
}

export default Auth