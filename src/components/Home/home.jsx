import React from 'react'
import Center from './center'
import Main from './main'
import Header from '../../Utilities/Header/header'
import Sidebar from '../../Utilities/Sidebar/sidebar'
import './styles/home.css'
import { Bottom } from './bottom'



export const Home = () => {
  return (
    <>
          
    <div className="app">
 
      <div className="container">
          <Header/>
          <Sidebar/>
          <div className="main-content">
            <Main/>
            <Center/>
            <Bottom/>
          </div>
      </div>
    </div>
    </>
  )
}
