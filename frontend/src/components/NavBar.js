import {Link} from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'
import { useThemeContext } from '../hooks/useThemeContext'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { IconButton } from '@mui/material';
import { useTheme } from '@emotion/react';
import whiteLogo from './full-logo-white.png'
import blackLogo from './full-logo-black.png'
import Legend from './Legend';
import { useState } from 'react';


const NavBar=()=>{
    const [isLegendOpen,setIsLegendOpen]=useState(false);
    const {logout}=useLogout()
    const {user}=useAuthContext()
    const handleClick=()=>{
        logout()
        window.location.href = "/"
    }
    const colorMode=useThemeContext()
    const theme=useTheme()

    const togggleLegend=()=>{
        setIsLegendOpen(!isLegendOpen)
    }
    return (
        <header background-color={theme.palette.primary}>
            <nav>
            <Link to="/"><img src={theme.palette.mode==='dark'?whiteLogo:blackLogo} height={50} alt="Logo" /></Link>   
                <div className="navButtons">
                    <Link to="/"><span>Home</span></Link>
                    {/* <Link to="/available"><span>Available Books</span></Link> */}
                    {user && <Link to="/reserve"><span>Reservations</span></Link>}
                    {user && <Link to="/borrowdetails"><span>Borrowing Details</span></Link>}
                    {user && user.userType!=='normal' && <Link to="/allbooks"><span>All Books</span></Link>}
                    {user && user.userType!=='normal' && <Link to="/donate"><span>Donations</span></Link>}
                    {user && user.userType!=='normal' && <Link to="/fines"><span>Fines</span></Link>}
                    {user && user.userType!=='normal' && <Link to="/manageusers"><span>Manage Users</span></Link>}
                    <button class="legButton" onClick={togggleLegend}>
                    <svg class="svgIcon" viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path></svg>
                    Legend
                    </button>
                    {isLegendOpen && <Legend/>}


                </div>

                {user ? (
                    <div className='userDetials user-status'>
                        <div> <span className="material-symbols-outlined">account_circle</span><p>Hi {user.fName+" "+user.lName}</p></div>
                        <button className='logsign' onClick={handleClick}>Log out</button>
                    </div>
                ):(
                    <div className='links user-status'>
                        <Link to='/login'><button className='logsign'>Login</button></Link>
                        <Link to='/signup'><button className='logsign'>Sign Up</button></Link>
                    </div>
                )}
                <IconButton onClick={()=>colorMode.toggleColorMode()}>
                    {(theme.palette.mode==='dark')?(
                    <DarkModeIcon />
                ): (<LightModeOutlinedIcon />)
                }
                </IconButton>
            </nav>
        </header>
    )
}

export default NavBar