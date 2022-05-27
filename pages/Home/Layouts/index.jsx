import React from 'react'
import HomeLayout from '@/components/HomeLayout'
const Home = ({ children }) => {
  return (
    <HomeLayout>
      {children}
    </HomeLayout>
  )
}
export default Home