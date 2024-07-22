import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'

import { FilterFocused } from './FilterFocused'
import { FilterExpanded } from './FilterExpanded'

import menu from "../assets/img/icons/menu.svg"
import userimg from "../assets/img/icons/user.svg"

import { useEffect, useState } from 'react'
import { UserMenu } from './UserMenu'

export function AppHeader() {

	const [userMenu, setUserMenu] = useState(false)

	const user = useSelector(storeState => storeState.userModule.user)
	const navigate = useNavigate()

	const [isExpanded, setIsExpanded] = useState(true)

	useEffect(() => {
		handleScroll()

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}

	}, [])

	function handleScroll() {
		if (window.scrollY > 50) {
			setIsExpanded(false)
		} else {
			setIsExpanded(true)
		}
	}

	function handleFilterClick() {
		setIsExpanded(true)
	}

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

			<NavLink to="/" className="logo fa brand airbnb">
				<h1>bnb</h1>
			</NavLink>

			<FilterExpanded setClass={`filter-expanded ${isExpanded ? 'visible' : 'hidden'}`} />
			<FilterFocused setClass={`filter-focused ${!isExpanded ? 'visible' : 'hidden'}`} handleFilterClick={handleFilterClick} />

			<section className="header-user">
				<Link to={`stay/edit`}>
					<button>Abnb your home</button>
				</Link>
				{user?.isAdmin && <NavLink to="/admin">Admin</NavLink>}

				<div className={`header-login ${userMenu ? "active" : ""}`} onClick={() => setUserMenu(userMenu ? false : true)}>
					<img src={menu} />
					<img src={userimg} />
				</div>

				{userMenu && <UserMenu setUserMenu={setUserMenu} />}

			</section>

		</header>

	)
}