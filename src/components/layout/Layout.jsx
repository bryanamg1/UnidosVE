import React from 'react'
import Header from './Header'
import Footer from './Footer'
import styles from './Layout.module.css'

function Layout({ children }) {
  return (
    <div className={styles.layoutWrapper}>
      <Header />
      <div className={styles.mainContent}>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout
