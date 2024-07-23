import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'

export function UserMenu({ setUserMenu }) {
    const menuRef = useRef(null)

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

    return (
        <div className="user-menu" ref={menuRef}>
            <Link to={`stay/trips`}><button onClick={() => setUserMenu(false)}>Trips</button></Link>
            <Link to={`stay/wishlists`}><button onClick={() => setUserMenu(false)}>Wishlist</button></Link>
            <Link to={`stay/orders`}><button onClick={() => setUserMenu(false)}>Orders</button></Link>
        </div>
    )
}
