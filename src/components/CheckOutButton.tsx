import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

interface CheckOutButtonProps {
  openLoginModal: (required?: boolean) => void;
  openCheckoutModal: () => void;
}

const CheckOutButton: React.FC<CheckOutButtonProps> = ({
  openLoginModal,
  openCheckoutModal,
}) => {
  const { getTotalQuantity } = useCart();
  const { user } = useAuth();
  const total = getTotalQuantity();

  const handleCheckoutClick = () => {
    if (!user) {
      openLoginModal(true);
    } else {
      openCheckoutModal();
    }
  };

  return (
    <button className="btn-checkout relative" onClick={handleCheckoutClick}>
      Checkout
      {total > 0 && (
        <span className="absolute bottom-[100%] left-[100%] bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          {total}
        </span>
      )}
    </button>
  );
};

export default CheckOutButton;
