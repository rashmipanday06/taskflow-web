import LoginPage from './features/auth/pages/LoginPage.tsx'
import { Route, Routes } from 'react-router-dom'
import { RegistrationPage } from './features/auth/pages/RegisterPage.tsx'

function App() {
    
  return (
 <Routes>
  <Route path="/" element={<LoginPage/>} />
  <Route path="/register" element={<RegistrationPage />} />
</Routes>
  )
}

export default App
