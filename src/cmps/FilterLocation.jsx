
export function FilterLocation({ filterToEdit, setFilterToEdit }) {

    function handleChange(ev) {
        const value = ev.target.value
        setFilterToEdit({ ...filterToEdit, txt: value })
    }

    return (
        <input
            name='txt'
            placeholder="Search destinations"
            value={filterToEdit.txt}
            onChange={handleChange}
            className="location-filter"
            autoComplete='off'
        />
    )
}