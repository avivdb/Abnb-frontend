import { Link, NavLink, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FilterFocused } from './FilterFocused'
import { FilterExpanded } from './FilterExpanded'
import { useEffect, useState } from 'react'
import { UserMenu } from './UserMenu'
import { FilterLabel } from './FilterLabel'
import { setFilterBy } from "../store/actions/stay.actions";
import menu from "../assets/img/icons/menu.svg"
import userimg from "../assets/img/icons/user.svg"
import { debounce } from '../services/util.service'

export function AppHeader() {

	const [userMenu, setUserMenu] = useState(false)
	const filterBy = useSelector(storeState => storeState.stayModule.filterBy)

	const user = useSelector(storeState => storeState.userModule.user)
	const [isExpanded, setIsExpanded] = useState(true)
	let location = useLocation()
	const navigate = useNavigate()

	useEffect(() => {
		handleScroll()
		const debouncedHandleScroll = debounce(handleScroll, 100);

		window.addEventListener('scroll', debouncedHandleScroll);
		return () => {
			window.removeEventListener('scroll', debouncedHandleScroll);
		};


	}, [])

	function handleScroll() {
		if (location.pathname === "/stay" || location.pathname === "/") {
			if (window.scrollY > 50) {
				setIsExpanded(false)
			} else {
				setIsExpanded(true)
			}
		}
	}

	function handleFilterClick() {
		setIsExpanded(true)
	}

	function handleLogoClick() {
		console.log('filterBy', filterBy)
		setFilterBy({})
		navigate('/')
		console.log('filterBy', filterBy)

	}

	return (
		<div className={`app-header ${isExpanded ? 'expanded' : 'focused'}`} >

			<NavLink to="/" onClick={() => handleLogoClick()} className="logo fa brand airbnb ">
				<h1>bnb</h1>
			</NavLink>

			<h1 className={`header-stay-title ${isExpanded ? 'visible' : 'hidden'}`} >Stays</h1>
			<FilterExpanded setClass={`filter-expanded ${isExpanded ? 'visible' : 'hidden'}`} />
			<FilterFocused setClass={`filter-focused ${!isExpanded ? 'visible' : 'hidden'}`} handleFilterClick={handleFilterClick} />

			<section className="header-user">
				<Link to={`stay/edit`}>
					<button className='btn-add-stay'>Abnb your home</button>
				</Link>
				{/* {user?.isAdmin && <NavLink to="/admin">Admin</NavLink>} */}

				{!user ?
					<div className={`header-login ${userMenu ? "active" : ""}`} onClick={() => setUserMenu(userMenu ? false : true)}>
						<img className="user-menu-img" src={menu} />
						<img className="user-img" src={userimg} />
					</div> :
					<div className={`header-login ${userMenu ? "active" : ""}`} onClick={() => setUserMenu(userMenu ? false : true)}>
						<img src={menu} />
						{user.imgUrl ?
							<img src={user.imgUrl} /> :
							<div className="div-user-img">{user.fullname.charAt(0)}<div />
							</div>
						}
					</div>
				}

				{userMenu && <UserMenu setUserMenu={setUserMenu} user={user} />}

			</section>

			{(location.pathname === "/stay" || location.pathname === "/" || location.pathname.startsWith("/s/")) && <FilterLabel />}
		</div>


	)
}