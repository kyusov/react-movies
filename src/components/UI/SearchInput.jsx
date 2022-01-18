import React, { memo } from 'react'

import '../../styles/search.scss'

function SearchInput({ placeholder, value, setValue }) {
    return (
        <div className="search">
            <input
                type="search"
                className="search__input"
                placeholder={placeholder}
                value={value || ''}
                onChange={(event) => setValue(event.target.value)}
            />
        </div>
    )
}

export default memo(SearchInput)
