import { useDispatch, useSelector } from 'react-redux';
import { calculateSubtotal, calculateTotalProducts } from '../helpers/utils';
import { fetchCartItems, removeFromCart } from '../redux/cart';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store';

export default function CartPage() {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const loading = useAppSelector((state) => state.cart.loading);
  const error = useAppSelector((state) => state.cart.error);

  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth.user);
  const subtotal = calculateSubtotal(cartItems);
  const totalProducts = calculateTotalProducts(cartItems);
  const dispatch = useAppDispatch();

  const handleRemoveFromCart = (cartId: number) => {
    dispatch(removeFromCart(cartId));
  };

  useEffect(() => {
    if (!auth) {
      navigate('/login');
    }
    console.log('cartItems', cartItems);
  }, []);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="relative overflow-x-auto mt-10">
      <div className="flex justify-center">
        <div className="w-full md:w-2/3 card text-center shadow-lg p-3 mb-5 bg-white rounded">
          <div className="text-center m-5">My Cart</div>
          <div className="overflow-x-auto mt-10">
            <table className="table-auto w-full text-sm text-left">
              <thead>
                <tr>
                  <th className="border border-gray-800 p-2">Name</th>
                  <th className="border border-gray-800 p-2">Quantity</th>
                  <th className="border border-gray-800 p-2">Weight</th>
                  <th className="border border-gray-800 p-2">Price</th>
                  <th className="border border-gray-800 p-2">Total Price</th>
                  <th className="border border-gray-800 p-2">Delete</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.cart_id}>
                    <td className="border border-gray-800 px-4 py-2">
                      {item.name}
                    </td>
                    <td className="border border-gray-800 px-4 py-2">
                      {item.quantity}
                    </td>
                    <td className="border border-gray-800 px-4 py-2">
                      {item.weight}
                    </td>
                    <td className="border border-gray-800 px-4 py-2">
                      {item.price}
                    </td>
                    <td className="border border-gray-800 px-4 py-2">
                      {item.quantity * item.price}
                    </td>
                    <td className="border border-gray-800 px-4 py-2">
                      <button
                        onClick={() => handleRemoveFromCart(item.cart_id)}
                        className="text-red-500"
                      >
                        <i className="far fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <hr />
          <h2 className="text-center">SubTotal: Rp: {subtotal}</h2>
          <p className="text-center">Total Products: {totalProducts}</p>
          <hr />
          <div className="flex justify-center">
            <Link
              to={'/checkout'}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
