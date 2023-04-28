import React from 'react'

import './container.css'

const Container = ({ children }) => (
    <main className="app-container">
        {children}
    </main>
)

export default Container