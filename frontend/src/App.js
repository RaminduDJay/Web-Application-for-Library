import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import { ThemeContext,useMode } from './contexts/ThemeContext';
import { CssBaseline,ThemeProvider } from '@mui/material';

//importing pages and components
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import NavBar from './components/NavBar';
import AllBooks from './pages/AllBooks';
import AllBorrows from './pages/AllBorrows';
import AvailableBooks from './pages/AvailableBooks';
import PageNotFound from './pages/PageNotFound';
import Reserves from './pages/Reserves'
import Donations from './pages/Donations'
import Fines from './pages/Fines'
import ManageUsers from './pages/ManageUsers'

function App() {
  const [theme,colorMode]=useMode()
  return (
    <ThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <BrowserRouter>
            <NavBar/>
            <div className='pages'>
              <Routes>
              <Route path='/' element={<Home />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route path='/allbooks' element={<AllBooks />} />
                <Route path='/available' element={<AvailableBooks />} />
                <Route path='/borrowdetails' element={<AllBorrows/>} />
                <Route path='/reserve' element={<Reserves />} />
                <Route path='/donate' element={<Donations />} />
                <Route path='/fines' element={<Fines />} />
                <Route path='/manageusers' element={<ManageUsers />} />
                <Route path='*' element={<PageNotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
