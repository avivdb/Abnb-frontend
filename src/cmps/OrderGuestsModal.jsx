
import { useEffect, useState } from "react"

export function OrderGuestsModal({ orderToEdit, setOrderToEdit, stay, setIsGuestsModalOpen }) {
    const [adultCounter, setAdultCounter] = useState(1)
    const [childrenCounter, setChildrenCounter] = useState(0)
    const [infantCounter, setInfantCounter] = useState(0)
    const [petCounter, setPetCounter] = useState(0)

    useEffect(() => {
        setAdultCounter(orderToEdit.guestCounts.adults || 1)
        setChildrenCounter(orderToEdit.guestCounts.children || 0)
        setInfantCounter(orderToEdit.guestCounts.infants || 0)
        setPetCounter(orderToEdit.guestCounts.pets || 0)
    }, [orderToEdit])

    function handleClick(operator, counter, setCounter, type) {
        let newCounter = counter
        const totalAdultsChildren = adultCounter + childrenCounter

        switch (operator) {
            case '+':
                if (type === 'infant' && counter < 5) {
                    newCounter = counter + 1
                } else if ((type === 'adult' || type === 'children') && totalAdultsChildren < stay.capacity) {
                    newCounter = counter + 1
                } else if (type === 'pet') {
                    newCounter = counter + 1
                }
                break;
            case '-':
                if (type === 'adult') {
                    newCounter = counter > 1 ? counter - 1 : 1
                } else {
                    newCounter = counter > 0 ? counter - 1 : 0
                }
                break;

            default:
                break;
        }
        setCounter(newCounter)
        setOrderToEdit({
            ...orderToEdit,
            capacity: adultCounter + childrenCounter,
            guestCounts: {
                adults: type === 'adult' ? newCounter : adultCounter,
                children: type === 'children' ? newCounter : childrenCounter,
                infants: type === 'infant' ? newCounter : infantCounter,
                pets: type === 'pet' ? newCounter : petCounter
            }
        })
    }

    return (
        <section className="ogm-add-guest">
            <div className="ogm-add-adult ogm-add-field ">
                <div className="ogm-add-adult-txt ogm-add-txt">
                    <h1>Adults</h1>
                    <h2>Ages 13 or above</h2>
                </div>
                <div className="ogm-add-adult-counter ogm-add-counter ">
                    <button onClick={() => handleClick('-', adultCounter, setAdultCounter, 'adult')}>-</button>
                    {adultCounter}
                    <button onClick={() => handleClick('+', adultCounter, setAdultCounter, 'adult')}>+</button>
                </div>
            </div>


            <div className="ogm-add-children ogm-add-field">
                <div className="ogm-add-children-txt ogm-add-txt">
                    <h1>Children</h1>
                    <h2>Ages 2-12</h2>
                </div>
                <div className="ogm-add-children-counter ogm-add-counter">
                    <button onClick={() => handleClick('-', childrenCounter, setChildrenCounter, 'children')}
                    className={childrenCounter === 0? "off" : ""} >-</button>
                    {childrenCounter}
                    <button onClick={() => handleClick('+', childrenCounter, setChildrenCounter, 'children')}>+</button>
                </div>
            </div>


            <div className="ogm-add-infant ogm-add-field">
                <div className="ogm-add-infant-txt ogm-add-txt">
                    <h1>Infants</h1>
                    <h2>Under 2</h2>
                </div>
                <div className="ogm-add-infant-counter ogm-add-counter">
                    <button onClick={() => handleClick('-', infantCounter, setInfantCounter, 'infant')} 
                    className={infantCounter === 0? "off" : ""}>-</button>
                    {infantCounter}
                    <button onClick={() => handleClick('+', infantCounter, setInfantCounter, 'infant')}>+</button>
                </div>
            </div>


            <div className="ogm-add-pet ogm-add-field">
                <div className="ogm-add-pet-txt ogm-add-txt">
                    <h1>Pets</h1>
                    <a href="">Bringing a service animal?</a>
                </div>
                <div className="ogm-add-pet-counter ogm-add-counter">
                    <button
                        onClick={() => handleClick('-', petCounter, setPetCounter, 'pet')}
                        className={petCounter === 0? "off" : ""}>-</button>
                    {petCounter}
                    <button onClick={() => handleClick('+', petCounter, setPetCounter, 'pet')}>+</button>
                </div>
            </div>

            <button className="guest-modal-close" onClick={() => setIsGuestsModalOpen(false)}>Close</button>

        </section>
    )
}