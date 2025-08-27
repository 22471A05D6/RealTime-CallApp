import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Splash() {
	const navigate = useNavigate()
	const [phase, setPhase] = useState('fade-in')

	useEffect(() => {
		const fadeInTimer = setTimeout(() => setPhase('stay'), 1000)
		const stayTimer = setTimeout(() => setPhase('fade-out'), 2000)
		const navTimer = setTimeout(() => navigate('/menu'), 3000)
		return () => {
			clearTimeout(fadeInTimer)
			clearTimeout(stayTimer)
			clearTimeout(navTimer)
		}
	}, [navigate])

	return (
		<div className={`splash ${phase}`}>
			<h1 className="splash-title">KK Ministries</h1>
		</div>
	)
}

export default Splash 