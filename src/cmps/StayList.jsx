import { userService } from '../services/user'
import StayPreview from './StayPreview'

export function StayList({ stays }) {

    if (stays === null || stays === undefined || stays.length === 0) {
        return <div className="loader"></div>
    }

    return (
        <section>
            <ul className="stay-list">
                {stays.map(stay =>
                    <li key={stay._id}>
                        <StayPreview stay={stay} />
                    </li>
                )}
            </ul>
        </section>
    );
}
