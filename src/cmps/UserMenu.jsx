import { Link } from 'react-router-dom'

export function UserMenu({ setUserMenu }) {

    return <div className="user-menu">
        <Link to={`stay/trips`} ><button onClick={() => setUserMenu(false)}>Trips</button></Link>
        <Link to={`stay/wishlists`} ><button onClick={() => setUserMenu(false)}>Wishlist</button></Link>
    </div>
}