import { useState } from 'react'


//routes
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";



// const {setFlashMessage} = userFlashMessage()
// setFlashMessage(data.message, msgType)


//layouts
import Navbar from './components/layout/navbar/Navbar'
import Footer from './components/layout/footer/Footer'
import Message from './components/layout/message/message';

//pages
import Home from      './components/pages/home/Home';
import Register from  './components/pages/register/Register';
import Login from     './components/pages/login/Login';
import Container from './components/layout/container/Container'
import Profile from './components/pages/user/Profile'
import MyPets from './components/pages/pet/mypets/MyPets'
import AddPet from './components/pages/pet/addPets/AddPet';

//Contexto
import { UserProvider } from './context/UserContext';

function App() {

  return (
    <>
      <Router>
        <UserProvider>
          <Navbar />
          <Message />
            <Container>
              <Routes>
                <Route path="/login" element={ <Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/user/profile" element={<Profile />} />
                <Route path="/pet/mypets" element={<MyPets />} />
                <Route path="/pet/add" element={<AddPet />} />
                <Route path="/" element={<Home />} />
              </Routes>
            </Container>
          <Footer />
        </UserProvider> 
      </Router>
    </>
  )
}

export default App
