import Header from '@/app/Components/Header/Header'
import MoodInformations from '@/app/Components/MoodInformations/MoodInformations'
import React from 'react'

const page = () => {
  return (
    <div className='w-full h-screen py-[40px]'>
      <Header />

      <MoodInformations />
    </div>
  )
}

export default page
