import SearchIcon from '@mui/icons-material/Search';

export function FilterFocus() {
    return (
        <section className="filter-focus">
            <button className="anywhere-btn">Anywhere</button>
            <hr />
            <button className="any-week-btn">Any week</button>
            <hr />
            <button className="add-dates-btn">Add guset</button>
            <SearchIcon />
        </section>
    )
}