import { useState } from "react"
import { addStay } from "../store/actions/stay.actions"
import { Link, useNavigate } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"


export function StayEdit({ setEditModal }) {

    const navigate = useNavigate()

    const [stayToEdit, setStayToEdit] = useState({ name: '', country: '', city: '', price: '', fullname: '' })

    function handleChange(ev) {
        const { name, value } = ev.target
        setStayToEdit(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    async function onAddStay(ev) {
        ev.preventDefault()
        if (!stayToEdit.name || !stayToEdit.country || !stayToEdit.city || !stayToEdit.price || !stayToEdit.fullname) {
            alert('All fields are required')
            return
        }

        try {
            await addStay(stayToEdit)
            showSuccessMsg('Stay added')
            setStayToEdit({ name: '', country: '', city: '', price: '', fullname: '' })
        } catch (err) {
            showErrorMsg('Cannot add stay')
        }
    }

    function onNavHome() {
        navigate('/stay')
    }

    return (
        <section className="stay-edit">
            <Link to={`/stay`}><button>Back</button></Link>
            <h1>Add Your Property</h1>
            <h2>Provide important information in order to become an Abnb host</h2>
            <form className="stay-edit-content" onSubmit={onAddStay}>

                <label htmlFor="fullname">Your Name:</label>
                <input onChange={handleChange} id="fullname" name="fullname" value={stayToEdit.fullname} placeholder="Enter your full name" />

                <label htmlFor="name">Property Name:</label>
                <input onChange={handleChange} id="name" name="name" value={stayToEdit.name} placeholder="Enter property name" />

                <label htmlFor="country">Country of property:</label>
                <input onChange={handleChange} id="country" name="country" value={stayToEdit.country} placeholder="Enter country" />

                <label htmlFor="city">City of property:</label>
                <input onChange={handleChange} id="city" name="city" value={stayToEdit.city} placeholder="Enter city" />

                <label htmlFor="price">Property Price (per night):</label>
                <input onChange={handleChange} id="counpricetry" type="number" name="price" value={stayToEdit.price} placeholder="Enter price" />

                <button type="submit" className="btn-container">
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="content">
                            <button type="submit" className="action-btn">
                                <span>Add your property</span>
                            </button>
                        </div>
                    </button>

            </form>
        </section>
    )
}
