import React from 'react'
import Header from './header'
import Container from './container'
import Footer from './footer'

const Base = ({children}) => { return(
    <div className="app">
        <Header/>
        <Container> {children} </Container>
        <Footer />
    </div>
)}

export default Base
