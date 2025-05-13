import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

const CheckOutButton = () => {
    const { getTotalQuantity } = useCart();
    const total = getTotalQuantity();
    const navigate = useNavigate();

    return (
        <button className='btn-checkout' onClick={() => navigate('/checkout')}>
        Checkout
        {total > 0 && (
            <span className='absolute top-7 right-7 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'>
            {total}
            </span>
        )}
        </button>
    );
};

export default CheckOutButton;
