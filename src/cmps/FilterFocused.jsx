import SearchIcon from '@mui/icons-material/Search';

export function FilterFocused({ handleFilterClick, setClass }) {
    // console.log('setClass', setClass)
    return (
        <section className={` ${setClass}  `} onClick={handleFilterClick}>
            <div className="anywhere-field field">Anywhere</div>

            <div className="any-week-field field">Any week</div>

            <div className="add-dates-field field">
                Add gusets
            </div>

            <div className="search-icon-container">
                <SearchIcon className="search-icon" />
            </div>

        </section >
    )
}