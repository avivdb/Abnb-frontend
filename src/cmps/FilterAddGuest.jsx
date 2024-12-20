
import { useEffect, useState } from "react"

export function FilterAddGuest({ filterToEdit, setFilterToEdit }) {
    const [adultCounter, setAdultCounter] = useState(0)
    const [childrenCounter, setChildrenCounter] = useState(0)
    const [infantCounter, setInfantCounter] = useState(0)
    const [petCounter, setPetCounter] = useState(0)

    useEffect(() => {
        const capacity = adultCounter + childrenCounter;
        // const capacity = adultCounter + childrenCounter + infantCounter + petCounter;
        setFilterToEdit({ ...filterToEdit, guest: { adult: adultCounter, children: childrenCounter, infant: infantCounter, pet: petCounter, capacity: capacity } });
    }, [adultCounter, childrenCounter, infantCounter, petCounter]);

    function handleClick(operator, counter, setCounter) {

        switch (operator) {
            case '+':
                setCounter(counter + 1)
                break;

            case '-':
                setCounter(counter > 0 ? counter - 1 : 0)
                break;

            default:
                break;
        }

    }

    return (
        <section className="add-guest">

            <div className="add-adult add-field ">
                <div className="add-adult-txt add-txt">
                    <h1>Adults</h1>
                    <h2>Ages 13 or above</h2>
                </div>
                <div className="add-adult-counter add-counter ">
                    <button onClick={() => handleClick('-', adultCounter, setAdultCounter)}
                        className={`fa solid minus ${adultCounter === 0? "off" : ""}`}></button>
                    {adultCounter}
                    <button onClick={() => handleClick('+', adultCounter, setAdultCounter)}
                        className="fa solid plus"></button>
                </div>
            </div>


            <div className="add-children add-field">
                <div className="add-children-txt add-txt">
                    <h1>Children</h1>
                    <h2>Ages 2 <span style={{ fontSize: '10px' }} className="fa solid minus"></span> 12</h2>
                </div>
                <div className="add-children-counter add-counter">
                    <button onClick={() => handleClick('-', childrenCounter, setChildrenCounter)}
                        className={`fa solid minus ${childrenCounter === 0? "off" : ""}`}> </button>
                    {childrenCounter}
                    <button onClick={() => handleClick('+', childrenCounter, setChildrenCounter)}
                        className="fa solid plus"> </button>
                </div>
            </div>


            <div className="add-infant add-field">
                <div className="add-infant-txt add-txt">
                    <h1>Infants</h1>
                    <h2>Under 2</h2>
                </div>
                <div className="add-infant-counter add-counter">
                    <button onClick={() => handleClick('-', infantCounter, setInfantCounter)}
                        className={`fa solid minus ${infantCounter === 0? "off" : ""}`}></button>
                    {infantCounter}
                    <button onClick={() => handleClick('+', infantCounter, setInfantCounter)}
                        className="fa solid plus"></button>
                </div>
            </div>


            <div className="add-pet add-field">
                <div className="add-pet-txt add-txt">
                    <h1>Pets</h1>
                    <a href="">Bringing a service animal?</a>
                </div>
                <div className="add-pet-counter add-counter">
                    <button
                        onClick={() => handleClick('-', petCounter, setPetCounter)}
                        className={`fa solid minus ${petCounter === 0? "off" : ""}`}></button>
                    {petCounter}
                    <button onClick={() => handleClick('+', petCounter, setPetCounter)}
                        className="fa solid plus"></button>
                </div>
            </div>

        </section>
    )
}