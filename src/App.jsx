import React from 'react'
import Show from './Show'
import {BrowserRouter as Router,Route, Routes, Navigate } from 'react-router-dom'
import Listings from './Listings'
import New from './New'
import Edit from './Edit'
import Layout from './Layout'
import ErrorPage from './Error'

export default function App() {
  return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path='listings' index element={<Listings />} />
					<Route path="listings/new" element={<New />} />
					<Route path="listings/:id" element={<Show />} />
					<Route path="listings/:id/edit" element={<Edit />} />
				</Route>
				<Route path="*" element={<Navigate to="/" />} />
				<Route path="/error" element={<ErrorPage />} />
			</Routes>
		</Router>
	);
}
