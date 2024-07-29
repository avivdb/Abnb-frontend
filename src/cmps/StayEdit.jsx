import { useState } from "react"
import { addStay } from "../store/actions/stay.actions"
import { Link, useNavigate } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { AbnbGradientBtn } from "./AbnbGradientBtn"


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
        const stayToSave = {
            name: stayToEdit.name,
            loc: {
                city: stayToEdit.city,
                country: stayToEdit.country,
                lat: 31.771959,
                lan: 35.217018
            },
            price: stayToEdit.price,
            imgUrls: [
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/407313266.jpg?k=e55ba82e1a97dc5d0df63f03453c41756099d8c657cdc82934f65d65157e9a1f&o=&hp=1",
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/407311892.jpg?k=703ea9df4d895c99490ac4025ecb42e91a9b964c25021b73378864ab1752b9f2&o=&hp=1",
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/363225117.jpg?k=2c28351baceb809f007ed1e47f2e8a070dc09f25a40b8edc3523514c177bd6ed&o=&hp=1",
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/367052898.jpg?k=a8daacec924be824ed66baa6fb90eddda607819c2484b73601135470655d6ddd&o=&hp=1",
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/367052778.jpg?k=54c250688224760dd891a242fc04ed7e3909750a48c5838bd0d55dcff91b65a4&o=&hp=1"
            ],
            type: "House",
            summary: "The perfect location for an ideal vacation in the capital! The AJU boutique studio is located in the heart of Jerusalem, on the historical Hillel street. A walking distance from King George and Ben Yehuda street, the Mahane Yehuda market, restaurants, bars, and public transportation. With this prime location, you'll be able to explore the locals' favorite go-to spots, and take tours all around the city.",
            capacity: 4,
            amenities: [
                "TV",
                "Wifi",
                "Kitchen",
                "Smoking allowed",
                "Free parking",
                "Private pool",
                "Pets allowed",
                "Garden",
                "Bidet",
                "Pool table",
                "Wine glasses",
                "Coffee",
                "Ping pong table",
                "Fire pit",
                "Mountain view"
            ],
            labels: [
                "Amazing Views",
                "Trending",
                "Play",
                "Tropical"
            ],
            host: {
                _id: userService.getLoggedinUser()._id,
                fullname: userService.getLoggedinUser().fullname,
                pictureUrl: userService.getLoggedinUser().imgUrl
            },
            rating: 4.9,
            bedrooms: [{ beds: 1 }],
            beds: 1,
            baths: 2,
            defaultCheckin: "12-08-2024",
            defaultCheckout: "19-08-2024",
        }

        try {
            await addStay(stayToSave)
            // await addStay(stayToEdit)
            showSuccessMsg('Stay added')
            setStayToEdit({ name: '', country: '', city: '', price: '', fullname: '' })
            navigate('/')
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
            <form className="stay-edit-content">

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

                <AbnbGradientBtn handleClick={onAddStay} text="Add your property" />

            </form>
        </section>
    )
}
