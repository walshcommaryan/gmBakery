import React from 'react';
import NavBar from '../components/NavBar'
import Hero from '../components/Hero'
import ProductGrid from '../components/ProductGrid';
import Products from '../data/Products';

const HomePage = () => {
    return (
    <div className='min-h-screen bg-spanish-white text-gray-600 font-bakery'>
        <div className='min-h-screen flex flex-col'>
            <NavBar />
            <Hero />
            {/* Featured section */}
            <section className='justify-items-center py-12'>
                <ProductGrid items={Products.featured} columns={3} />
            </section>
        </div>

        {/* Other Products section */}
        <section className='min-h-screen py-12 bg-gray-100'>
            <h2 className='py-8 text-3xl font-bold text-center'>Products</h2>
            <ProductGrid items={Products.productItems} columns={4}/>
        </section>
        </div>
  );
};

export default HomePage;