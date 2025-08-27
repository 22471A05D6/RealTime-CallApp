import { useNavigate } from 'react-router-dom'

function BackButton() {
	const navigate = useNavigate()
	return (
		<button className="back-button" onClick={() => navigate(-1)} aria-label="Go back">
			<span className="back-button-icon">&larr;</span>
		</button>
	)
}

export default BackButton 