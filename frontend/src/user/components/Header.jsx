import React, { useState, useEffect } from 'react'
import { FaFacebookF, FaInstagram, FaPowerOff, FaTwitter, FaUser } from 'react-icons/fa'
import { FaGear } from 'react-icons/fa6'
import { IoMenu } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'

const DEFAULT_DP = "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"

function Header() {
  const navigate = useNavigate()
  const [toggle, setToggle] = useState(false)
  const [token, setToken] = useState("")
  const [dp, setDp] = useState("")
  const [userId, setUserId] = useState("")
  const [dropDown, setDropDown] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem("token") && sessionStorage.getItem("user")) {
      const userToken = sessionStorage.getItem("token")
      const user = JSON.parse(sessionStorage.getItem("user"))
      setToken(userToken)
      setDp(user?.picture)
      setUserId(user?._id)
    }
  }, [])

  const handleLogout = () => {
    sessionStorage.clear()
    setToken("")
    setDp("")
    setUserId("")
    setDropDown(false)
    navigate('/login')
  }

  return (
    <>
      {/* Header Top part */}
      <div className='grid grid-cols-3 p-5'>
        {/* logo */}
        <div className='flex items-center'>
          <img width={'50px'} height={'50px'} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTa8aURiprjEz3oPg7cqmrFzwle7GZCsoDtKL_ZdbRzqmOqXD3xRnxiWK-&s=10" alt="BOOKS" />
          <h1 className='text-2xl font-bold ms-2 md:hidden'>BOOKSTORE</h1>
        </div>

        {/* title */}
        <div className='md:flex justify-center items-center hidden'>
          <h1 className='text-3xl font-bold'>BOOKSTORE</h1>
        </div>

        {/* login */}
        <div className='md:flex justify-end items-center hidden'>
          <FaInstagram />
          <FaTwitter className='mx-2' />
          <FaFacebookF />

          {/* login Link */}
          {
            !token ?
              <Link to={'/login'} className='border border-black rounded px-3 ms-3 flex items-center'>
                <FaUser className='me-1' /> Login
              </Link>
              :
              <div className='relative'>
                <button onClick={() => setDropDown(!dropDown)} className='shadow-sm rounded p-1 hover:bg-gray-100'>
                  <img width={'40px'} height={'40px'} style={{ borderRadius: '50%' }} src={dp ? dp : DEFAULT_DP} alt="Profile" />
                </button>

                {/* dropdown menu */}
                {
                  dropDown &&
                  <div className='absolute right-0 z-10 mt-2 w-40 bg-white shadow rounded ring-1 ring-black/5 p-2 focus:outline-hidden'>
                    <Link to={`/profile/${userId}`} className='flex items-center text-gray-600 text-sm px-3 py-2'>
                      <FaGear className='me-1' /> Profile
                    </Link>
                    <button onClick={handleLogout} className='flex items-center text-gray-600 text-sm px-3 py-2'>
                      <FaPowerOff className='me-1' /> Logout
                    </button>
                  </div>
                }
              </div>
          }
        </div>
      </div>

      {/* Navigation Part */}
      {/* >>> keep your existing <nav> ... </nav> code from here down, and the closing </> ) } export default Header <<< */}