import React from 'react'

// function Header(props){
function Header({children}){
    return (
        <header>
            {/* <h1>{props.title}</h1> */}
            {/* {props.children} */}
            {children}
        </header>
    )
}

export default Header