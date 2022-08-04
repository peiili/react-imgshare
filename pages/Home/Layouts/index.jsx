import React from 'react'
import HomeLayout from '@/components/HomeLayout/index.jsx'
const Home = ({ children, active }) => {
    return (
        <HomeLayout active={active}>
            {children}
        </HomeLayout>
    )
}
export default Home
