import React from 'react'
import Header from './header'
import Footer from './footer'
import { Container } from 'react-bootstrap'

const Base = ({children}) => { return(
    <div className="app">
        <Header/>
        <Container>{children}</Container>
        <Footer />
    </div>
)}

export default Base
