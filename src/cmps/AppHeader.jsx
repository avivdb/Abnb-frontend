import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'
import { StayFilter } from './StayFilter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAirbnb } from '@fortawesome/free-brands-svg-icons'
// import { StayEdit } from '../cmps/StayEdit'
import { FilterFocus } from './FilterFocused'
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

	function onAddStay() {
		console.log('add stay')
	}

	return (
		<header className="app-header full">
			<section className='nav'>
				<NavLink to="/" className="logo">
					<FontAwesomeIcon icon={faAirbnb} />
					<h1>bnb</h1>
				</NavLink>

				<FilterFocus />
				<section>
					<button onClick={onAddStay}>Abnb your home</button>
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
			</section>
			<StayFilter />
		</header>
	)
}
