import { Route } from "react-router-dom"
import { Routes } from "react-router-dom"
import Page from "./Page"
import Register from "./Register"


function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Page />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default App