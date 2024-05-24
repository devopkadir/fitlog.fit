import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../logo/logo.png'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'


const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
    }

    return (
        <header>
            <div className='container'>
                <Link to={'/'}>
                    <h1>
                        fit.log
                        (<span><img className='logo' src={logo} alt="logo" /></span>)
                    </h1>
                </Link>
                <nav>
                    {user && (
                        <div>
                            <span className='logged-email'>{user.email}</span>
                            <button onClick={handleClick}>Log out</button>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <Link to={'/login'}>Login</Link>
                            <Link to={'/signup'}>SignUp</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar