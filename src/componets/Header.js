import React from 'react'

const Header = ({title, size}) => {
  return (
    <header className='header' >
        <h1> {title} {size} </h1>
    </header>
  )
}

export default Header