import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import { FaCheckCircle } from 'react-icons/fa'
import Edit from '../components/Edit'
import UploadBook from '../components/UploadBook'
import BookStatus from '../components/BookStatus'
import Purchase from '../components/Purchase'

const DEFAULT_DP = "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"

function Profile() {
  const [currentTab, setCurrentTab] = useState(1)
  const [username, setUsername] = useState("")
  const [dp, setDp] = useState("")
  const [bio, setBio] = useState("")

  useEffect(() => {
    if (sessionStorage.getItem("token") && sessionStorage.getItem("user")) {
      const user = JSON.parse(sessionStorage.getItem("user"))
      setDp(user?.picture)
      setUsername(user?.username)
      setBio(user?.bio)
    }
  }, [])

  return (
    <>
      <Header />
      <div style={{ height: '200px' }} className='bg-black'></div>

      <div style={{ width: '230px', height: '230px', borderRadius: '50%', marginTop: "-130px", marginLeft: '70px' }} className='bg-white p-3'>
        <img style={{ width: '200px', height: '200px', borderRadius: '50%' }} src={dp ? dp : DEFAULT_DP} alt="user" />
      </div>

      <div className='md:flex justify-between px-5'>
        <div className='flex items-center'>
          <h1 className='text-2xl font-black md:text-3xl'>{username}</h1>
          <FaCheckCircle className='text-blue-700 ms-3' />
        </div>
        <div>
          <Edit />
        </div>
      </div>

      <p className='text-xl font-bold px-20 mt-5'>{bio}</p>

      {/* >>> keep your existing code from the "user profile management dashboard..." paragraph down, including tabs and closing tags <<< */}