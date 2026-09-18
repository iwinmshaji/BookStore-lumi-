import React, { useState } from 'react'
import { FaEye, FaEyeSlash, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Auth({ insideRegister }) {
  const [togglePassword, setTogglePassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-[url('/login.png')] bg-cover bg-center text-white">
      <div className="p-5 sm:p-10 w-full max-w-md">
        <h1 className="text-center font-bold text-3xl">BOOKSTORE</h1>

        <div className="bg-[#233b40] text-white p-5 flex justify-center items-center flex-col my-5">
          <div
            style={{ width: '80px', height: '80px', borderRadius: '50%' }}
            className="border mb-5 flex justify-center items-center"
          >
            <FaUser className="text-4xl" />
          </div>

          <h1 className="text-3xl">
            {insideRegister ? 'Register' : 'Login'}
          </h1>

          <form className="my-5 w-full" onSubmit={handleSubmit}>
            {insideRegister && (
              <input
                className="bg-white p-2 w-full rounded my-5 text-[#6b9b70]"
                placeholder="Username"
                type="text"
              />
            )}

            <input
              className="bg-white p-2 w-full rounded my-5 text-[#6b9b70]"
              type="email"
              placeholder="Email"
            />

            <div className="relative my-5">
              <input
                className="bg-white p-2 w-full rounded text-[#6b9b70]"
                type={togglePassword ? 'text' : 'password'}
                placeholder="Password"
              />

              <button
                type="button"
                onClick={() => setTogglePassword(!togglePassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl"
                aria-label={togglePassword ? 'Hide password' : 'Show password'}
              >
                {togglePassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <div className="flex justify-between mt-5">
              <p className="text-xs text-orange-600">* Never share your password</p>

              {!insideRegister && (
                <button type="button" className="text-xs">
                  Forgot Password?
                </button>
              )}
            </div>

            <button
              type="submit"
              className="bg-[#3d695b] p-2 w-full rounded mt-3"
            >
              {insideRegister ? 'Register' : 'Login'}
            </button>

            {!insideRegister && (
              <div className="my-5 text-center">
                <p>-------------------or-------------------</p>
                <div className="mt-2 flex justify-center items-center w-full">
                  Google Authentication
                </div>
              </div>
            )}

            <div className="text-center my-5">
              {insideRegister ? (
                <p>
                  Existing User?
                  <Link to="/login" className="underline ms-3 text-[#1a13d2]">
                    Login
                  </Link>
                </p>
              ) : (
                <p>
                  New User?
                  <Link to="/register" className="underline ms-3 text-[#1a13d2]">
                    Register
                  </Link>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Auth