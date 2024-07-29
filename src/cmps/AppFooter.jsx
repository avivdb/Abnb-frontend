import { useSelector } from 'react-redux'
import globe from "../assets/img/icons/globe.svg"


export function AppFooter() {
	const count = useSelector(storeState => storeState.userModule.count)

	return (
		<footer className="app-footer full">
			<p>&copy; 2024 Abnb, Inc</p>
			{/* <p>Count: {count}</p> */}

			{import.meta.env.VITE_LOCAL ?
				<span className="local-services">Local Services</span> :
				<span className="remote-services"></span>}

			<section className="footer-app-settings">
				<p><img src={globe} />English (US)</p>
				<p><span>₪</span>ILS</p>
			</section>
		</footer>
	)
}