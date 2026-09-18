import React from 'react'
import Header from '../components/Header'
import { FaLocationPin } from 'react-icons/fa6'
import { FaPaperPlane } from 'react-icons/fa'

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <Header />

      <div className="md:px-20 p-5 my-5">
        <h1 className="text-center my-5 font-bold text-3xl">Contact Us</h1>

        <p className="text-justify">
          We love hearing from our community of readers, neighbors, and book lovers.
          Whether you are searching for a hard-to-find title, looking for a personalized
          book recommendation tailored to your tastes, or asking about our next exciting
          community event, we are always here to help! Our passionate booksellers are
          dedicated to guiding you on your next reading journey, supporting local authors,
          and creating a welcoming space for everyone. Please feel free to reach out with
          your questions, feedback, or just to share what great book you are reading next.
        </p>

        <div className="md:grid grid-cols-3 gap-5 items-center md:px-40 p-5 mt-5 md:mt-0">
          <div className="flex items-center">
            <div
              style={{ width: '50px', height: '50px', borderRadius: '50%' }}
              className="flex items-center justify-center bg-gray-200"
            >
              <FaLocationPin />
            </div>
            <p className="ms-5">Street 50 London</p>
          </div>

          <div className="flex items-center">
            <div
              style={{ width: '50px', height: '50px', borderRadius: '50%' }}
              className="flex items-center justify-center bg-gray-200"
            >
              <FaLocationPin />
            </div>
            <p className="ms-5">Street 50 London</p>
          </div>

          <div className="flex items-center">
            <div
              style={{ width: '50px', height: '50px', borderRadius: '50%' }}
              className="flex items-center justify-center bg-gray-200"
            >
              <FaLocationPin />
            </div>
            <p className="ms-5">Street 50 London</p>
          </div>
        </div>

        <div className="md:grid grid-cols-2 gap-10 my-5 p-5 md:px-40 items-center">
          <div className="bg-gray-200 p-5 text-center">
            <h1 className="font-semibold text-2xl">Send Message</h1>

            <form onSubmit={handleSubmit}>
              <div className="mb-5 my-10">
                <input
                  type="text"
                  placeholder="Name"
                  className="bg-white w-full p-2 rounded"
                />
              </div>

              <div className="mb-5 my-10">
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-white w-full p-2 rounded"
                />
              </div>

              <div className="mb-5 my-10">
                <textarea
                  placeholder="Message"
                  className="bg-white w-full p-2 rounded"
                  rows="4"
                />
              </div>

              <div className="mb-5">
                <button
                  type="submit"
                  className="bg-black text-white p-2 w-full text-lg flex justify-center items-center"
                >
                  <FaPaperPlane className="ms-2 me-2" />
                  Submit
                </button>
              </div>
            </form>
          </div>

          <div className="mt-3 md:mt-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62865.55832720318!2d76.30948101195872!3d10.008813464713272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080c8e94a07a07%3A0x49921cdfae82660!2sKakkanad%2C%20Kerala!5e0!3m2!1sen!2sin!4v1789542998592!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Kakkanad location map"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact