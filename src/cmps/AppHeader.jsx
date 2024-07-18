import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'
import { StayFilter } from './StayFilter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAirbnb } from '@fortawesome/free-brands-svg-icons'
// import { setFilterBy } from '../store/actions/stay.actions'

export function AppHeader() {
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
					{/* <img src="../../src/assets/img/logo.png" /> */}
					<h1>bnb</h1>
				</NavLink>

				{/* <NavLink to="stay">Stays</NavLink> */}

				{user?.isAdmin && <NavLink to="/admin">Admin</NavLink>}

				{!user && <NavLink to="login" className="login-link">Login</NavLink>}
				{user && (
					<div className="user-info">
						<Link to={`user/${user._id}`}>
							{user.fullname}
						</Link>
						<button onClick={onLogout}>logout</button>
					</div>
				)}
			</section>
			<StayFilter />
		</header>
	)
}
