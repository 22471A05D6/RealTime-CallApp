import { Link } from 'react-router-dom'
import './theme.css'

function MainMenu() {
	return (
		<div className="page mainmenu">
			<h1 className="title">CK Ministries</h1>
			<div className="menu-buttons">
				<Link className="primary-button" to="/CallGroup">CALL GROUP</Link>
				<Link className="primary-button" to="/AddMembers">ADD MEMBERS</Link>
				<Link className="primary-button" to="/GroupList">GROUP LIST</Link>
			</div>
		</div>
	)
}

export default MainMenu
