import React, { memo } from 'react'

import '../../styles/header.scss'

function Header({ children }) {
    return (
        <div className="header">
            <h1 className="header__title">{children}</h1>
        </div>
    )
}

export default memo(Header)
