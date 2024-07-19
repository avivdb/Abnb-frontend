import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAirbnb } from '@fortawesome/free-brands-svg-icons'
import { FilterFocus } from './FilterFocused'


import menu from "../assets/img/icons/menu.svg"
import userimg from "../assets/img/icons/user.svg"
import { FilterExpanded } from './FilterExpanded'


export function AppHeader() {

	const user = useSelector(storeState => storeState.userModule.user)
	const navigate = useNavigate()

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

					{!user && <NavLink to="login" className="login-link">
						<div className="header-login">
							<img src={menu} />
							<img src={userimg} />
						</div>
					</NavLink>}
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
			<FilterExpanded />
			{/* <StayFilter /> */}
		</header>
	)
}
