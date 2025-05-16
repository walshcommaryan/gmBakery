import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import Products from '../data/Products';
import CheckOutGrid from '../components/CheckOutGrid';

const CheckOutPage = () => {
    const navigate = useNavigate();
    const { clearCart, getTotalPrice } = useCart();

    return (
        <div className='min-h-screen bg-gray-300 text-gray-600 font-bakery py-10'>
            <div className='rounded-square-w mx-auto'>
                <div className='flex justify-between p-4'>
                    <button className='btn-checkout' onClick={() => clearCart()}>
                        Clear Cart
                    </button>
                    <div></div>
                    <button className='btn-checkout' onClick={() => navigate('/')}>
                        Back
                    </button>
                </div>

                <div className="flex py-8">
                    {/* Card Grid */}
                    <div className='w-2/3'>
                        <CheckOutGrid items={Products.productItems} />
                    </div>

                    {/* Stripe Checkout Payment */}
                    <div className='w-1/2 h-[500px] rounded-square-h mx-8 text-white'>
                        <p className='flex justify-center'>{getTotalPrice()}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckOutPage;