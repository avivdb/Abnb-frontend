import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { logout } from '../store/actions/user.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

export function UserMenu({ setUserMenu, user }) {
    const menuRef = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setUserMenu(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [setUserMenu])

    async function onLogout() {
        setUserMenu(false)
        try {
            await logout()
            navigate('/')
            // showSuccessMsg(`Bye now`)
        } catch (err) {
            // showErrorMsg('Cannot logout')
        }
    }


    return (
        <div className="user-menu" ref={menuRef}>
            {user ?
                <>
                    <Link to={`stay/trips`}><button onClick={() => setUserMenu(false)}>Trips</button></Link>
                    {/* <Link to={`stay/wishlists`}><button onClick={() => setUserMenu(false)}>Wishlist</button></Link> */}
                    <Link to={`stay/orders`}><button onClick={() => setUserMenu(false)}>Orders</button></Link>
                    <hr />
                    <button className="btn-log-out" onClick={onLogout}>Log out</button>
                </> :
                <>
                    <Link to={`/login`}><button onClick={() => setUserMenu(false)}>Log in</button></Link>
                    <Link to={`login/signup`}><button onClick={() => setUserMenu(false)}>Sign up</button></Link>
                    <hr />
                    <Link to={`stay/edit`}><button onClick={() => setUserMenu(false)}>Abnb your home</button></Link>
                </>
            }
        </div>
    )
}
