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
    <button
      className="inline-flex items-center justify-center h-10 px-5 py-2 rounded-full text-sm font-medium tracking-wide bg-chocolate text-cream hover:bg-milkChocolate transition-all duration-200 active:scale-95 focus:outline-none relative"
      onClick={handleCheckoutClick}
    >
      Checkout
      {total > 0 && (
        <span className="absolute -top-1 -right-1 bg-warmGold text-chocolate text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
          {total}
        </span>
      )}
    </button>
  );
};

export default CheckOutButton;
