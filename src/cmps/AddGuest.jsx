import { useState } from "react"

export function AddGuest() {
    const [adultCounter, setAdultCounter] = useState(0)
    const [childrenCounter, setChildrenCounter] = useState(0)
    const [infantCounter, setInfantCounter] = useState(0)
    const [petCounter, setPetCounter] = useState(0)


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
                <div className="add-adult-txt">
                    <h1>Adults</h1>
                    <h2>Ages 13 or above</h2>
                </div>
                <div className="add-adult-counter ">
                    <button onClick={() => handleClick('-', adultCounter, setAdultCounter)}>-</button>
                    {adultCounter}
                    <button onClick={() => handleClick('+', adultCounter, setAdultCounter)}>+</button>
                </div>
            </div>


            <div className="add-children add-field">
                <div className="add-children-txt">
                    <h1>Children</h1>
                    <h2>Ages 2-12</h2>
                </div>
                <div className="add-children-counter">
                    <button onClick={() => handleClick('-', childrenCounter, setChildrenCounter)}>-</button>
                    {childrenCounter}
                    <button onClick={() => handleClick('+', childrenCounter, setChildrenCounter)}>+</button>
                </div>
            </div>


            <div className="add-infant add-field">
                <div className="add-infant-txt">
                    <h1>Infants</h1>
                    <h2>Under 2</h2>
                </div>
                <div className="add-infant-counter">
                    <button onClick={() => handleClick('-', infantCounter, setInfantCounter)}>-</button>
                    {infantCounter}
                    <button onClick={() => handleClick('+', infantCounter, setInfantCounter)}>+</button>
                </div>
            </div>


            <div className="add-pet add-field">
                <div className="add-pet-txt">
                    <h1>Pets</h1>
                    <a href="">Bringing a service animal?</a>
                </div>
                <div className="add-pet-counter">
                    <button onClick={() => handleClick('-', petCounter, setPetCounter)}>-</button>
                    {petCounter}
                    <button onClick={() => handleClick('+', petCounter, setPetCounter)}>+</button>
                </div>
            </div>

        </section>
    )
}