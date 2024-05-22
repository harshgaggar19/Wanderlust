import React from 'react'
import Index from '.'
import Show from './Show'
import {BrowserRouter as Router,Route, Routes, Navigate } from 'react-router-dom'
import index from '.'
import New from './New'
import Edit from './Edit'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to="/listings"/>}/>
        <Route path='/listings' Component={index}/>
        <Route path='/listings/new' Component={New}/>
        <Route path='/listings/:id' Component={Show} />
        <Route path='/listings/:id/edit' Component={Edit} />
      </Routes>
    </Router>
  )
}
