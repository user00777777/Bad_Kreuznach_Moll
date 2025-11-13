import { Link, Outlet } from "react-router-dom"
import s from './layout.module.css';

import React from 'react'
const Layout = () => {
  return (
    <><header className={s.mainHeader}>

        <Link to='/'>Müll abholen in Bad Kreuznach</Link>
				{/* <Link to='/t'> Тельфера </Link> */}

    </header>
    
    <main className={s.mainContainer}><Outlet /></main>
    </>
  )
}
export default Layout