import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Products from '../data/Products';
import CheckOutGrid from '../components/CheckOutGrid';
import { motion } from 'framer-motion'
import { createOrder } from '../api/Order'

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
                        <div className='grid grid-cols-3'>
                            <h1 className='flex col-start-2 justify-center'>$ {getTotalPrice().toFixed(2)}</h1>
                            <motion.button
                                onClick={() => createOrder({
                                    customer_id: 1,
                                    order_date: new Date().toISOString().split('T')[0],
                                    status: 'PENDING',
                                    total_amount: getTotalPrice(),
                                })}
                                className='col-start-2 w-100 rounded-md bg-cyan-500 shadow-lg shadow-cyan-500/50'
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >Checkout</motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckOutPage;