import SearchIcon from '@mui/icons-material/Search';

export function FilterFocus() {
    return (
        <section className="filter-focus">
            <div className="anywhere-field field">Anywhere</div>
            <hr />
            <div className="any-week-field field">Any week</div>
            <hr />
            <div className="add-dates-field field">
                Add guset
                <SearchIcon className='search-icon' />
            </div>

        </section>
    )
}