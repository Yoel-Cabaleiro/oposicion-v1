import React from 'react'
import Navbar from './components/navigation/Navbar'
import Footer from './components/Footer'
import FooterExam from './components/FooterExam'

export default function NavbarExamLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <FooterExam />
    </>
  )
}

