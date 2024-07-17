import { Link } from 'react-router-dom'

export function StayPreview({ stay }) {
    return (
        <article className="preview">
            <header>
                <Link to={`/stay/${stay._id}`}>{stay.name}</Link>
            </header>


        </article>
    )
}