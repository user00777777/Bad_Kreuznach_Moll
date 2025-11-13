import { useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import Homepage from './Components/Homepage/Homepage.jsx'
import Layout from './MainforApp/Layout/Layout.jsx';
import Dropdown from './Components/Dropdown/Dropdown.jsx'
import DropDowninside from './Components/Dropdown/DropDowninside.jsx';
function App() {
  const [count, setCount] = useState(0)
 

  return (

<div className='app'>

<Routes>
<Route path='/' element={<Layout/>} >

<Route index element={<Homepage />} />
<Route  path='dropdown' element={<Dropdown />} />
<Route path='dropDowninside' element={<DropDowninside />} />

</Route>
</Routes>




</div>
  )
}

export default App



