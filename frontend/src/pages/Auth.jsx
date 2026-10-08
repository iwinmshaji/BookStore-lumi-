import React, { useState } from 'react'
import { FaEye, FaEyeSlash, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { loginAPI, registerAPI } from '../services/alllApi'
import { ToastContainer, toast } from 'react-toastify';

function Auth({ insideRegister }) {

  const navigate = useNavigate()
  const [togglePassword, setTogglePassword] = useState()

  const formik = useFormik({
    initialValues: {
      username: "Username",
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      username: Yup.string().min(3, "Must have atleat 3 charater").required("Required"),
      email: Yup.string().email("Invaild Email").required("Required"),
      password: Yup.string().required("Required")
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      if (insideRegister) {
        console.log("register Api call ");
        handleRegister(values)
      }
      else {
        console.log("login Api call ");
        handleLogin(values)
      }
      resetForm()
    }
  })

  const handleLogin = async(userData)=>{
    const result = await loginAPI(userData)
    console.log(result);
    if(result.status==200){
      toast.success("Successfully Logged in")
      sessionStorage.setItem("token",result.data.token)
      sessionStorage.setItem("user",JSON.stringify(result.data.user))
      setTimeout(() => {
        if(result.data.user.role=="admin"){
          navigate('/admin')
        }
        else{
          navigate('/')
        }
      }, 2500);
    }
    else{
      toast.error(result)
    }
  }

  const handleRegister = async (userData) => {
    const result = await registerAPI(userData)
    console.log(result);
    if(result.status){
      toast.success("Successfully Regitered.. please Login")
    }
    else{
      toast.error(result)
    }
    navigate("/login")
  }

  return (
    <div className='w-full min-h-screen flex justify-center items-center bg-[url(/login.png)] bg-cover bg-center text-white'>
      <div className="p-10">
        <h1 className="text-center font-bold text-3xl">BOOKSTORE</h1>
        <div style={{ width: '400px', }} className="bg-[#233b40] text-white p-5 flex justify-center items-center flex-col my-5">
          <div style={{ width: '80px', height: '80px', borderRadius: '50%' }} className="border mb-5 flex justify-center items-center">
            <FaUser className='text-4xl' />
          </div>
          <h1 className="text-3xl">{insideRegister ? "Register" : "Login"}</h1>
          <form onSubmit={formik.handleSubmit} className='my-5 w-full'>
            {/* Username */}
            {
              insideRegister &&
              <>
                <input name='username' value={formik.values.username} onChange={formik.handleChange} className='bg-white p-2 w-full rounded my-5 text-[#6b9b70]' type="text" placeholder='username' />
                <div className='mb-5 text-yellow-300'>{formik.errors.username}</div>
              </>
            }
            {/* Email */}
            <input name='email' value={formik.values.email} onChange={formik.handleChange} className='bg-white p-2 w-full rounded my-5 text-[#6b9b70]' type="text" placeholder='Email' />
            <div className='mb-5 text-yellow-300'>{formik.errors.email}</div>
            {/* PAssword */}
            <input name='password' value={formik.values.password} onChange={formik.handleChange} className='bg-white p-2 w-full rounded my-5 text-[#6b9b70]' type={togglePassword ? "Text" : "password"} placeholder='Password' />

            {
              togglePassword ?
                <FaEye onClick={() => setTogglePassword(!togglePassword)} className='text-gray-400 cursor-pointer text-xl' style={{ marginTop: '-50px', marginLeft: '335px' }} />
                :
                <FaEyeSlash onClick={() => setTogglePassword(!togglePassword)} className='text-gray-400 cursor-pointer text-xl' style={{ marginTop: '-50px', marginLeft: '335px' }} />
            }
            <div className=' mt-5 mb-5 text-yellow-300'>{formik.errors.password}</div>
            {/* forgot password */}
            <div className="flex justify-between mt-5">
              <p className="text-xs text-orange-600">*Never share your password</p>
              {
                !insideRegister &&
                <button className='text-xs'>Forget Password</button>
              }
            </div>
            {/* Register or Logon Button */}
            <div className="text-center">
              {
                insideRegister ?
                  <button type='submit' className="bg-[#3d695b] p-2 w-full rounded mt-3">Register</button>
                  :
                  <button type='submit' className="bg-[#3d695b] p-2 w-full rounded mt-3">Login</button>
              }
            </div>
            {/* google Login */}
            {
              !insideRegister &&
              <div className=" my-5 text-center">
                <p>-------------------or-------------------</p>
                <div className="mt-2 flex justify-center items-center w-full">
                  Google Authentication
                </div>
              </div>
            }
            {/* already user */}
            <div className='text-center my-5'>
              {
                insideRegister ?
                  <p className="text-white">Existing User? <Link to={'/login'} className='underline ms-3 text-[#1a13d2]'>Login</Link></p>
                  :
                  <p className="text-white">New User? <Link to={'/register'} className='underline ms-3 text-[#1a13d2]'>Register</Link></p>
              }
            </div>
          </form>
        </div>
      </div>
      {/* toastify container */}
      <ToastContainer position='top-center' theme='colored' autoClose='3000' />

    </div>
  )
}

export default Auth