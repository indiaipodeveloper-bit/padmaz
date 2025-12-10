import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  DecreaseQuantity,
  IncreaseQuantity,
  RemoveProductFromCart,
} from "../../redux/slices/CartSlice";
import { toast } from "sonner";
import axios from "axios";
import { backendUrl } from "../../assets/constant";

export function RemoveProductFromUserDetailsOnBackend(bodyitem = {}) {
  setTimeout(async () => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/cart/remove-from-cart`,
        { item: bodyitem },
        { withCredentials: true }
      );
    } catch (error) {
      toast.error(error.response.data);
    }
  }, 2000);
}

const CartComponent = () => {
  const cartProducts = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  return (
    <div className="">
      {!!cartProducts.length ? (
        <>
          {cartProducts.map((prod, index) => {
            return (
              <div
                key={prod._id}
                className="flex items-start justify-between
                     py-4 border-b"
              >
                <div className="flex items-start">
                  <img
                    src={`${backendUrl}/uploads/products/${prod.img}`}
                    alt={prod.title}
                    className="w-20 h-24 object-cover mr-4 rounded "
                  />
                  <div className="">
                    <div className="">
                      <span className="text-lg">{prod.title}</span>
                      <p className="text-sm text-gray-500">
                        {prod.description}
                      </p>
                    </div>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => dispatch(DecreaseQuantity(prod))}
                        className="border rounded cursor-pointer px-2  text-xl font-medium"
                      >
                        -
                      </button>
                      <span className="mx-4">{prod.quantity}</span>
                      <button
                        onClick={() => dispatch(IncreaseQuantity(prod))}
                        className="border cursor-pointer rounded px-2  text-xl font-medium"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="">
                  <p className="">Rs {prod.price.toLocaleString()}</p>
                  <button
                    onClick={() => {
                      dispatch(RemoveProductFromCart(prod));
                      RemoveProductFromUserDetailsOnBackend(prod);
                    }}
                    className="cursor-pointer"
                  >
                    <RiDeleteBin3Line className="h-6 w-6 mt-2 text-red-600" />
                  </button>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div className="font-bold  my-[50%] text-xl text-center">
          No Products in Your Cart
          <p className=""></p>
        </div>
      )}
    </div>
  );
};

export default CartComponent;
