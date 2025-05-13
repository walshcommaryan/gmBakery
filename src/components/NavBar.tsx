import React from 'react'
import CheckoutButton from './CheckOutButton';

const NavBar = () => {
    return (
        <div className='flex justify-between p-12'>
            <div><p>GM Petit</p></div>
            <div></div>
            <CheckoutButton />
        </div>
    )
}

export default NavBar;