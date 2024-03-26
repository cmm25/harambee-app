import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Sidebar, NavBar } from './components';
import {HarambeeDetails, CreateHarambee, Home, Profile } from './pages';
const App = () => {
  return (
    <div className="relative sm:-8 p-4 bg-[#ECC194] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>

      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/create-harambee" element={<CreateHarambee />} />
          <Route path="/profile" element={<Profile/>} />
          {/* <Route path="/harambee-details" element={<HarambeeDetails />} /> */}
        </Routes>
      </div>
    </div>
  )
}

export default App