// import { useState } from "react"
// import { addStay } from "../store/actions/stay.actions"
// import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

// export function StayEdit() {
//     const [stayToEdit, setStayToEdit] = useState({ name: '', country: '', city: '', price: '' })

//     function handleChange(ev) {
//         const { name, value } = ev.target;
//         if (name === "name") {
//             setStayToEdit({ ...stayToEdit, [name]: value })
//         } else if (name === "country") {
//             setStayToEdit({ ...stayToEdit, [country]: value })
//         } else if (name === "city") {
//             setStayToEdit({ ...stayToEdit, [city]: value })
//         } else if (name === "price") {
//             setStayToEdit({ ...stayToEdit, [price]: value })
//         }
//     }

//     async function onAddStay(ev) {
//         ev.preventDefault()
//         if (!stayToEdit.name || !stayToEdit.country || !stayToEdit.city || !stayToEdit.price) {
//             alert('All fields are required')
//             return
//         }

//         try {
//             await addStay(stayToEdit);
//             showSuccessMsg('Stay added');
//             setStayToEdit({ name: '', country: '', city: '', price: '' })
//         } catch (err) {
//             showErrorMsg('Cannot add stay')
//         }
//     }

//     return (
//         <form className="stay-edit" onSubmit={onAddStay}>
//             <input onChange={handleChange} name="name" value={stayToEdit.name} placeholder="Name" />
//             <input onChange={handleChange} name="country" value={stayToEdit.country} placeholder="Country" />
//             <input onChange={handleChange} name="city" value={stayToEdit.city} placeholder="City" />
//             <input onChange={handleChange} type="number" name="price" value={stayToEdit.price} placeholder="Price" />
            
//             <button type="submit">Add</button>
//         </form>
//     );
// }


import { useState } from "react";
import { addStay } from "../store/actions/stay.actions";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";

export function StayEdit() {
    const [stayToEdit, setStayToEdit] = useState({ name: '', country: '', city: '', price: '' });

    function handleChange(ev) {
        const { name, value } = ev.target;
        setStayToEdit(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    async function onAddStay(ev) {
        ev.preventDefault();
        if (!stayToEdit.name || !stayToEdit.country || !stayToEdit.city || !stayToEdit.price) {
            alert('All fields are required');
            return;
        }

        try {
            await addStay(stayToEdit);
            showSuccessMsg('Stay added');
            setStayToEdit({ name: '', country: '', city: '', price: '' });
        } catch (err) {
            showErrorMsg('Cannot add stay');
        }
    }

    return (
        <form className="stay-edit" onSubmit={onAddStay}>
            <input onChange={handleChange} name="name" value={stayToEdit.name} placeholder="Name" />
            <input onChange={handleChange} name="country" value={stayToEdit.country} placeholder="Country" />
            <input onChange={handleChange} name="city" value={stayToEdit.city} placeholder="City" />
            <input onChange={handleChange} type="number" name="price" value={stayToEdit.price} placeholder="Price" />
            
            <button type="submit">Add</button>
        </form>
    );
}
