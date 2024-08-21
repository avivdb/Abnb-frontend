import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { FilterFocused } from './FilterFocused';
import { FilterExpanded } from './FilterExpanded';
import { UserMenu } from './UserMenu';
import { FilterLabel } from './FilterLabel';
import { setFilterBy } from "../store/actions/stay.actions";
import menu from "../assets/img/icons/menu.svg";
import userimg from "../assets/img/icons/user.svg";
import { stayService } from '../services/stay';
import search from '../assets/img/icons/search.svg';
import { useMediaQuery } from '@mui/material';
import { debounce } from '../services/util.service';
import { MobileFilterModal } from './MobileFilterModal';

const { getDefaultFilter } = stayService;

export function AppHeader() {
	const [userMenu, setUserMenu] = useState(false);
	const filterBy = useSelector(storeState => storeState.stayModule.filterBy);
	const user = useSelector(storeState => storeState.userModule.user);
	const [isExpanded, setIsExpanded] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();
	const [allowScroll, setAllowScroll] = useState(true);
	const [activePhoneModal, setActivePhoneModal] = useState(false);
	const lastScrollTop = useRef(0);
	const isSmallScreen = useMediaQuery('(max-width:600px)');

	useEffect(() => {
		const handleScroll = debounce(() => {
			if (!allowScroll) return;
			const scrollTop = window.scrollY;

			if (scrollTop === 0 && location.pathname === '/') {
				setIsExpanded(true);
			} else if (scrollTop > lastScrollTop.current) {
				setIsExpanded(false);
			}
			lastScrollTop.current = scrollTop;
		}, 100);

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [allowScroll, location]);

	useEffect(() => {
		if (location.pathname === '/' && window.scrollY === 0) {
			setIsExpanded(true);
		} else {
			setIsExpanded(false);
		}
	}, [location]);

	const handleFilterClick = () => {
		setAllowScroll(false);
		setIsExpanded(state => !state);

		const timeoutDuration = 1000; // 1-second delay to prevent immediate closing

		setTimeout(() => {
			setAllowScroll(true);
		}, timeoutDuration);
	};

	const handleLogoClick = () => {
		setIsExpanded(false);
		setFilterBy(getDefaultFilter());
		navigate('/');
	};

	if (isSmallScreen && location.pathname !== '/' && location.pathname !== '/stay') {
		return null; // No header on non-home pages for small screens
	}

	return (
		<>
			<div className={`app-header-container full main-container ${location.pathname.startsWith('/stay') ? 'stay-details-layout' : ''}`}>
				{isSmallScreen ? (
					<>
						<div className='app-header-mobile'>
							<div className="mobile-header-btn-search" onClick={() => { setActivePhoneModal(true) }}>
								<img src={search} alt="Search" />
								<section>
									<p>Where to?</p>
									<p>Anywhere · Any week · Add guests</p>
								</section>
							</div>
						</div>
						{activePhoneModal && <MobileFilterModal setActivePhoneModal={setActivePhoneModal} activePhoneModal={activePhoneModal} />}
					</>
				) : (
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
								<FilterFocused setClass={`filter-focused ${!isExpanded ? 'visible' : 'hidden'}`} handleFilterClick={handleFilterClick} />
								{isExpanded && <FilterExpanded setClass="filter-expanded visible" />}
							</>
						)}

						<section className="header-user">
							<Link to="stay/edit">
								<button className="btn-add-stay">Abnb your home</button>
							</Link>

							<div className='header-login-wrapper'>

								<div className={`header-login ${userMenu ? 'active' : ''}`} onClick={() => setUserMenu(!userMenu)}>
									<img className="user-menu-img" src={menu} alt="Menu" />
									{user ? (
										user.imgUrl ? (
											<img src={user.imgUrl} alt="User" />
										) : (
											<div className="div-user-img">
												{user.fullname.charAt(0)}
											</div>
										)
									) : (
										<img className="user-img" src={userimg} alt="User" />
									)}
								</div>
								{userMenu && <UserMenu setUserMenu={setUserMenu} user={user} />}
							</div>

						</section>
					</div>
				)}
			</div>

			{(location.pathname === "/stay" || location.pathname === "/" || location.pathname.startsWith("/s/")) && <FilterLabel />}
		</>
	);
}
