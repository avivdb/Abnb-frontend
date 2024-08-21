import { useState } from "react"
import { useNavigate } from "react-router"

import globe from "../assets/img/icons/globe.svg"

import heartgrey from "../assets/img/icons/heartgrey.svg"
import heartpink from "../assets/img/icons/heartpink.svg"
import exploregrey from "../assets/img/icons/exploregrey.svg"
import explorepink from "../assets/img/icons/explorepink.svg"
import tripsgrey from "../assets/img/icons/tripsgrey.svg"
import tripspink from "../assets/img/icons/tripspink.svg"
import messagesgrey from "../assets/img/icons/messagesgrey.svg"
import messagespink from "../assets/img/icons/messagespink.svg"
import profilegrey from "../assets/img/icons/profilegrey.svg"
import profilepink from "../assets/img/icons/profilepink.svg"


export function AppFooter() {

	const navigate = useNavigate()
	const [activeLabel, setActiveLabel] = useState('explore')

	function handleClick(label) {
		setActiveLabel(label)
		if (label === 'explore') {
			navigate(`/stay`)
		} else if (label === 'profile') {
			navigate(`/stay/orders`)
		} else {
			navigate(`/stay/${label}`)
		}
	}

	return (
		<footer className="app-footer">

			<section className="main-container">
				<footer className="app-footer-desktop">
					<p>&copy; 2024 Abnb, Inc</p>
					{import.meta.env.VITE_LOCAL ?
						<span className="local-services">Local Services</span> :
						<span className="remote-services"></span>}

					<section className="footer-app-settings">
						<p><img src={globe} />English (US)</p>
						<p><span>₪</span>ILS</p>
					</section>
				</footer>
			</section>

			<footer className="app-footer-mobile">
				<div onClick={() => handleClick("explore")} className="app-footer-mobile-icon">
					<img src={activeLabel === "explore" ? explorepink : exploregrey} />
					<p className={activeLabel === "explore" ? "selected" : ""}>Explore</p>
				</div>
				<div onClick={() => setActiveLabel("wishlist")} className="app-footer-mobile-icon">
					<img src={activeLabel === "wishlist" ? heartpink : heartgrey} />
					<p className={activeLabel === "wishlist" ? "selected" : ""}>Wishlists</p>
				</div>
				<div onClick={() => handleClick("trips")} className="app-footer-mobile-icon">
					<img src={activeLabel === "trips" ? tripspink : tripsgrey} />
					<p className={activeLabel === "trips" ? "selected" : ""}>Trips</p>
				</div>
				<div onClick={() => setActiveLabel("messages")} className="app-footer-mobile-icon">
					<img src={activeLabel === "messages" ? messagespink : messagesgrey} />
					<p className={activeLabel === "messages" ? "selected" : ""}>Messages</p>
				</div>
				<div onClick={() => setActiveLabel("profile")} className="app-footer-mobile-icon">
					<img src={activeLabel === "profile" ? profilepink : profilegrey} />
					<p className={activeLabel === "profile" ? "selected" : ""}>Profile</p>
				</div>
			</footer>

		</footer>
	)
}