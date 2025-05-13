import React from 'react'
import { ProductCardProps } from './ProductCard';
import Counter from './Counter';

const CheckOutCard = ({ name, price, itemImage, plateImage, sizeClass}: ProductCardProps) => {
    return (
        <div className="card card-border border-gray-300 bg-white w-96 shadow-2xl">
                <figure className="">
                    <img
                        src={`${itemImage}`}
                        alt={`${name}`}
                        className="w-1/2 h-1/2 -translate-x-4"
                    />
                </figure>
                <div className="card-body relative"> 
                <h2 className="card-title">
                    {`${name}`}
                    <div className="badge badge-primary">{`${price}`}</div>
                </h2>
                <div className="card-actions justify-end">
                        <div className='-translate-x-4 -translate-y-12'>
                            <Counter name={name} />
                    </div>
                </div>
                </div>

            </div>
    )
}

export default CheckOutCard;