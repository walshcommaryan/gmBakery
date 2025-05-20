import React from 'react';
import NavBar from '../components/NavBar'
import Hero from '../components/Hero'
import ProductGrid from '../components/ProductGrid';
import Products from '../data/Products';
import Contact from './Contact';

const HomePage = () => {
    return (
    <div className='bg-spanish-white text-gray-600 font-bakery'>
        <div className='min-h-screen flex flex-col'>
            <NavBar />
            <Hero />
        </div>

        {/* Other Products section */}
        <section className='min-h-screen py-12 bg-gray-100'>
            <h2 className='pb-20 text-5xl font-bold text-center'>Products</h2>
            <ProductGrid items={Products.productItems} columns={4}/>
        </section>

        {/* Contact section */}
        <section className='min-h-screen'>
            <Contact/>
        </section>
        </div>
  );
};

export default HomePage;