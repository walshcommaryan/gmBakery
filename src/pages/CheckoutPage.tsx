import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CheckOutGrid from '../components/CheckOutGrid';
import { motion } from 'framer-motion'
import { createOrder } from '../api/Order'
import { useProducts } from '../context/ProductContext';

const CheckOutPage = () => {
    const navigate = useNavigate();
    const { clearCart, getTotalPrice, getTotalQty } = useCart();
    const totalQty = getTotalQty();
    const { products, loading } = useProducts();
    const totalPrice = Number(getTotalPrice().toFixed(2))

    if (loading) return <div className='bg-white'></div>;

    return (
        <div className='min-h-screen bg-gray-300 text-gray-600 font-bakery py-10'>
            <div className='rounded-square-w mx-auto'>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 p-4 text-center sm:text-left">
                    <button className="btn-checkout w-full sm:w-auto" onClick={() => clearCart(true)}>
                        Clear Cart
                    </button>

                    <p className="text-sm sm:text-base flex-1">
                        {
                        totalQty === 0
                            ? "Your cart is empty"
                            : `There ${totalQty === 1 ? "is" : "are"} ${totalQty} item${totalQty === 1 ? "" : "s"} in your cart.`
                        }
                    </p>

                    <button className="btn-checkout w-full sm:w-auto" onClick={() => navigate('/')}>
                        Back
                    </button>
                </div>


                <div className="flex flex-col lg:flex-row py-8 gap-6">
                    {/* Card Grid */}
                    <div className="w-full lg:w-2/3">
                        <CheckOutGrid items={products} />
                    </div>

                    {/* Stripe Checkout Payment */}
                    <div className="w-full lg:w-1/3 h-auto rounded-lg mx-auto text-white bg-gray-800 p-6">
                        <div className="grid grid-cols-1 gap-4 text-center">
                        <h1 className="text-2xl font-bold">$ {totalPrice}</h1>
                        <motion.button
                            onClick={() => createOrder({
                            customer_id: 1,
                            order_date: new Date().toISOString().split('T')[0],
                            status: 'PENDING',
                            total_amount: totalPrice,
                            })}
                            className="w-full rounded-md bg-cyan-500 p-3 shadow-lg shadow-cyan-500/50 text-white"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Checkout
                        </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckOutPage;