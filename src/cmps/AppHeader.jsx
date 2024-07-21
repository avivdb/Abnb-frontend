import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'
import { StayFilter } from './StayFilter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAirbnb } from '@fortawesome/free-brands-svg-icons'
import { UserMenu } from '../cmps/UserMenu'
import { FilterFocus } from './FilterFocused'
import { useState } from 'react'


import menu from "../assets/img/icons/menu.svg"
import userimg from "../assets/img/icons/user.svg"

// import { setFilterBy } from '../store/actions/stay.actions'

export function AppHeader() {

	const [userMenu, setUserMenu] = useState(false)

	const user = useSelector(storeState => storeState.userModule.user)
	const navigate = useNavigate()
	// const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
	// console.log('filterBy', filterBy)
	async function onLogout() {
		try {
			await logout()
			navigate('/')
			showSuccessMsg(`Bye now`)
		} catch (err) {
			showErrorMsg('Cannot logout')
		}
	}

	return (
		<header className="app-header full">
			<section className='nav'>
				<NavLink to="/" className="logo">
					<FontAwesomeIcon icon={faAirbnb} />
					<h1>bnb</h1>
				</NavLink>

				<FilterFocus />
				<section className="header-user">
					<Link to={`stay/edit`}>
						<button>Abnb your home</button>
					</Link>
					{user?.isAdmin && <NavLink to="/admin">Admin</NavLink>}

					{/* {!user && <NavLink to="login" className="login-link"> */}
					<div className={`header-login ${userMenu? "active" : ""}`} onClick={() => setUserMenu(userMenu ? false : true)}>
						<img src={menu} />
						<img src={userimg} />
					</div>
					{userMenu && <UserMenu setUserMenu={setUserMenu} />}
					{/* </NavLink>} */}
					{/* {user && (
						<div className="user-info">
							<Link to={`user/${user._id}`}>
								{user.fullname}
							</Link>
							<button onClick={onLogout}>logout</button>
						</div>
					)} */}
				</section>
			</section>
			<StayFilter />
			{/* {editModal && <StayEdit setEditModal={setEditModal} />} */}
		</header>
	)
}
