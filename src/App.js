import React, { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Monitoring from './pages/Monitoring/index'
//import Bot from './pages/Bot/index'
import Calculator from './pages/Calculator/index'
import NavBar from './components/NavBar/index'
import { createContext } from 'react'
import { fetchData } from './utils/fetch-data'
import { Footer } from './components/Footer'

export const ThemeContext = createContext(null)

function App() {
  /* Theme switcher*/
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  /* Fetch data */
  const [data, setData] = useState()

  useEffect(() => {
    ;(async () => {
      const data = await fetchData()
      setData(data)
    })()
  }, [])

  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await fetchData()
      setData(data)
      //console.log(data)
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="app" id={theme}>
        <Router>
          <NavBar toggle={toggleTheme} theme={theme} eggPrice={data?.price.toFixed(5) ?? 0} eggGoldRatio={data?.ratio.toFixed(3) ?? 0} />
          <main className="main">
            <Routes>
              <Route path="/dcyc-tools" element={<Monitoring eggPrice={data?.price.toFixed(5) ?? 0} eggGoldRatio={data?.ratio.toFixed(3) ?? 0} />} />
              {/* <Route path="/bot" element={<Bot />} /> */}
              <Route path="/calculator" element={<Calculator eggPrice={data?.price.toFixed(5) ?? 0} eggGoldRatio={data?.ratio.toFixed(3) ?? 0} />} />
            </Routes>
          </main>
        </Router>
        <Footer />
      </div>
    </ThemeContext.Provider>
  )
}

export default App
