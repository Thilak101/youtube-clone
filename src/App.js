import React from 'react'
import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home, Video } from './pages'
import { Navbar } from './components'
import { Provider } from "react-redux"
import { store } from './app/store'

const App = () => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/video/:id' element={<Video />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>


  )
}

export default App