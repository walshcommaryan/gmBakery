import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import Products from '../data/Products';
import CheckOutGrid from '../components/CheckOutGrid';

const CheckOutPage = () => {
    const navigate = useNavigate();
    const { clearCart } = useCart();

    return (
        <div className='min-h-screen bg-spanish-white text-gray-600 font-bakery'>
            <div className='flex justify-between p-12'>
                <button className='btn-checkout' onClick={() => clearCart()}>
                    Clear Cart
                </button>
                <div></div>
                <button className='btn-checkout' onClick={() => navigate('/')}>
                    Back
                </button>
            </div>
            <section className='justify-self-start py-12 px-72'>
                <CheckOutGrid items={Products.productItems} />
            </section>
        </div>
    )
}

export default CheckOutPage;