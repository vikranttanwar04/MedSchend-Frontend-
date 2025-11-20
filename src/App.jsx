import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './user-pages/Home'
import Doctors from './user-pages/Doctors'
// import AllDoctors from './Admin-pages/Doctors'
import Signup from './user-pages/signup'
import Signin from './user-pages/signin'
import Layout from './Layout/layout'
import About from './user-pages/About'
import DoctorPage from './user-pages/DoctorPage'
import { useAuth } from './context/authContext'
import UserProfile from './user-pages/UserProfile'
// import AdminDash from './admin-pages/Dashboard'
import ProtectedRoutes from './context/ProtectedPaths'
// import AdminLayout from './Layout/adminLayout'
// import Appointments from './admin-pages/Appointments'
// import AddDoctor from './admin-pages/AddDoctor'
import DoctorLayout from './Layout/doctorLayout'
import DoctorDash from './doctor-pages/dashboard'
import DoctorAppointments from './doctor-pages/appointments'
import DoctorProfile from './doctor-pages/profile'
import UserAppointments from './user-pages/appointments'
// import AdminLogin from './admin-pages/Login'
import axios from 'axios'
import Contact from './user-pages/Contact'


function App() {

  const { user } = useAuth();

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index path='/' element={<Home />} />
        <Route path='/signup' element={!user ? <Signup /> : <FirstLogOut />} />
        <Route path='/signin' element={!user ? <Signin /> : <FirstLogOut />} />
        {/* <Route path='/signin/admin' element={<AdminLogin />} /> */}
        <Route path='/userprofile' element={
          <ProtectedRoutes user={user} roles={['patient']}>
            <UserProfile />
          </ProtectedRoutes>}
        />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='*' element={<h1>No Page Found!</h1>} />

        <Route path='/doc/:id' element={
          <ProtectedRoutes user={user} roles={['patient', 'doctor']}>
            <DoctorPage />
          </ProtectedRoutes>}
        />
        {/* User (Logged In) */}
        <Route path='/myappointments' element={<ProtectedRoutes user={user} roles={['patient']}>
          <UserAppointments />
        </ProtectedRoutes>}
        />
      </Route>

      {/* Doctor Routes */}
      <Route path='/doctor' element={<ProtectedRoutes user={user} roles={['doctor']}><DoctorLayout /></ProtectedRoutes>}>

        <Route index path='/doctor/dash' element={<ProtectedRoutes user={user} roles={['doctor']}>
          <DoctorDash />
        </ProtectedRoutes>}
        />

        <Route index path='/doctor/appointments' element={<ProtectedRoutes user={user} roles={['doctor']}>
          <DoctorAppointments />
        </ProtectedRoutes>}
        />

        <Route index path='/doctor/profile' element={<ProtectedRoutes user={user} roles={['doctor']}>
          <DoctorProfile />
        </ProtectedRoutes>}
        />

        <Route path='*' element={<h1>No Page Found!</h1>} />
      </Route>

      {/* Admin Routes */}
      {/* <Route path='/admin' element={<ProtectedRoutes user={user} roles={['admin', 'doctor']}><AdminLayout /></ProtectedRoutes>}>
        <Route index path='/admin/dash' element={
          <ProtectedRoutes user={user} roles={['admin', 'doctor']}>
            <AdminDash />
          </ProtectedRoutes>}
        />
        <Route path='/admin/appointments' element={
          <ProtectedRoutes user={user} roles={['admin', 'doctor']}>
            <Appointments />
          </ProtectedRoutes>}
        />
        <Route path='/admin/doctorlist' element={
          <ProtectedRoutes user={user} roles={['admin', 'doctor']}>
            <AllDoctors />
          </ProtectedRoutes>}
        />
        <Route path='/admin/adddoctor' element={
          <ProtectedRoutes user={user} roles={['admin', 'doctor']}>
            <AddDoctor />
          </ProtectedRoutes>}
        />
        <Route path='*' element={<h1>No Page Found!</h1>} />
      </Route> */}

    </Routes>
  )
}

export default App;


export function FirstLogOut() {

  const { setUser, setIsLogoHide } = useAuth();
  const navigate = useNavigate();

  const onLogoutClick = async () => {
    try {
      await axios.post("http://localhost:8080/logout", {}, { withCredentials: true });

      setUser(null);
      setIsLogoHide(true);
      navigate('/signin');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="min-h-[70vh] flex flex-col gap-2 justify-center items-center">
      <h1 className="text-2xl">First logout already login account.</h1>
      <div className="flex gap-3 flex-wrap">
        <button onClick={onLogoutClick} className="px-7 py-1 rounded-full bg-primary text-white">Logout</button>
        <button onClick={() => navigate('/')} className="px-7 py-1 rounded-full bg-primary text-white">Back to home</button>
      </div>
    </div>
  )
}