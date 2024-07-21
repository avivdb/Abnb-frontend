import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAirbnb } from '@fortawesome/free-brands-svg-icons'
// import { StayEdit } from '../cmps/StayEdit'
import { FilterFocus } from './FilterFocused'
import { useState } from 'react'


import menu from "../assets/img/icons/menu.svg"
import userimg from "../assets/img/icons/user.svg"

import { useEffect, useState } from 'react'


export function AppHeader() {

	const [userMenu, setUserMenu] = useState(false)

	const user = useSelector(storeState => storeState.userModule.user)
	const navigate = useNavigate()

	// const [isScrolled, setIsScrolled] = useState(false)
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

			<NavLink to="/" className="logo">
				<FontAwesomeIcon icon={faAirbnb} />
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

			// <LocationFilter />

		</header>

	)
}