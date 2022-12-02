import Home from './pages/Home'
import Loguin from './pages/Loguin'
import ProductsDetails from './pages/ProductsDetails'
import Purchases from './pages/Purchases'
import { HashRouter, Route, Routes } from 'react-router-dom'
import '../src/styles/App.css'
import '../src/styles/Home.css'
import '../src/styles/cart.css'

import LoadingScreen from './components/LoadingScreen'
import { useSelector } from 'react-redux'
import './styles/productDetails.css'
import { Container } from 'react-bootstrap'
import NavBar from '../src/components/NavBar'
import ProtectedRoutes from './components/ProtectedRoutes'
import SignUp from './pages/SignUp'

function App() {
 const isLoading=useSelector((state)=>state.isLoading)

  return (
   <HashRouter>
    
    <div className="App">
     {isLoading && <LoadingScreen/>}
    
    <NavBar/>
    <Container className='my-5'>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/product/:id' element={<ProductsDetails/>}/>
      <Route path='/loguin' element={<Loguin/>}/>
      <Route path='/signUp' element={<SignUp/>}/>
      <Route element ={<ProtectedRoutes/>}>
       <Route path='/purchases' element={<Purchases/>}/>
      </Route>
      
      
     </Routes>
    </Container>
   
    </div>
  </HashRouter>
  )
}

export default App
