import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FilterFocused } from './FilterFocused';
import { FilterExpanded } from './FilterExpanded';
import { useEffect, useState } from 'react';
import { UserMenu } from './UserMenu';
import { FilterLabel } from './FilterLabel';
import { setFilterBy } from "../store/actions/stay.actions";
import menu from "../assets/img/icons/menu.svg";
import userimg from "../assets/img/icons/user.svg";
import { debounce } from '../services/util.service';
import { stayService } from '../services/stay/index';

const { getDefaultFilter } = stayService;

export function AppHeader() {
	const [userMenu, setUserMenu] = useState(false);
	const filterBy = useSelector(storeState => storeState.stayModule.filterBy);
	const user = useSelector(storeState => storeState.userModule.user);
	const [isExpanded, setIsExpanded] = useState(false); // Start with not expanded
	const [isClicked, setIsClicked] = useState(false);
	const [initialScrollPos, setInitialScrollPos] = useState(0);
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (location.pathname === '/' && window.scrollY <= 50) {
			setIsExpanded(true);
		} else {
			setIsExpanded(false);
		}

		const debouncedHandleScroll = debounce(handleScroll, 100);
		window.addEventListener('scroll', debouncedHandleScroll);

		return () => {
			window.removeEventListener('scroll', debouncedHandleScroll);
		};
	}, [location]);

	function handleScroll() {
		const currentScrollPos = window.scrollY;
		if (location.pathname === '/') {
			if (isClicked && Math.abs(currentScrollPos - initialScrollPos) > 50) {
				setIsClicked(false);
				setIsExpanded(false);
			} else if (!isClicked && currentScrollPos <= 50) {
				setIsExpanded(true);
			} else if (!isClicked && currentScrollPos > 50) {
				setIsExpanded(false);
			}
		} else {
			setIsExpanded(false);
		}
	}

	function handleFilterClick() {
		setIsClicked(true);
		setInitialScrollPos(window.scrollY);
		setIsExpanded(state => !state);
	}

	function handleLogoClick() {
		setIsClicked(false);
		setFilterBy(getDefaultFilter());
		navigate('/');
	}

	return (
		<div className={`app-header ${isExpanded ? 'expanded' : 'focused'}`}>
			<NavLink to="/" onClick={handleLogoClick} className="logo fa brand airbnb">
				<h1>bnb</h1>
			</NavLink>

			{location.pathname === '/' && (
				<>
					<h1 className={`header-stay-title ${isExpanded ? 'visible' : 'hidden'}`}>Stays</h1>
					<FilterExpanded setClass={`filter-expanded ${isExpanded ? 'visible' : 'hidden'}`} />
					<FilterFocused setClass={`filter-focused ${!isExpanded ? 'visible' : 'hidden'}`} handleFilterClick={handleFilterClick} />
				</>
			)}

			{location.pathname !== '/' && (
				<>
					<FilterFocused setClass="filter-focused visible" handleFilterClick={handleFilterClick} />
					{isExpanded && <FilterExpanded setClass="filter-expanded visible" />}
				</>
			)}

			<section className="header-user">
				<Link to="stay/edit">
					<button className="btn-add-stay">Abnb your home</button>
				</Link>

				<div className={`header-login ${userMenu ? 'active' : ''}`} onClick={() => setUserMenu(!userMenu)}>
					<img className="user-menu-img" src={menu} alt="Menu" />
					{user ? (
						user.imgUrl ? (
							<img src={user.imgUrl} alt="User" />
						) : (
							<div className="div-user-img">
								{user.fullname.charAt(0)}
								<div />
							</div>
						)
					) : (
						<img className="user-img" src={userimg} alt="User" />
					)}
				</div>

				{userMenu && <UserMenu setUserMenu={setUserMenu} user={user} />}
			</section>

			{(location.pathname === "/stay" || location.pathname === "/" || location.pathname.startsWith("/s/")) && <FilterLabel />}
		</div>
	);
}
