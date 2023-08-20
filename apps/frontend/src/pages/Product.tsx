import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductBySlug } from '../redux/product';
import { addToCart } from '../redux/cart';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { AuthState, UserState } from '../interface';

export default function ProductPage() {
  const { slug } = useParams();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const auth = useAppSelector((state) => state.auth);

  const { user }: AuthState = auth;

  const product = useAppSelector((state) => state.product.selectedProduct);
  const loading = useAppSelector((state) => state.product.loading);
  const error = useAppSelector((state) => state.product.error);
  const dispatch = useAppDispatch();

  const updateQuantity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedQuantity(parseInt(event.target.value));
  };

  const handleAddToCart = () => {
    if (isNaN(selectedQuantity) || selectedQuantity <= 0) {
      alert('Please select a valid quantity.');
      return;
    }

    const { name, price, product_id, image_product, weight }: any = product;

    dispatch(
      addToCart({
        name,
        price,
        image_product: image_product,
        quantity: selectedQuantity,
        product_id,
        user_id: user.id,
        weight,
      })
    );

    alert('Product added to cart successfully.');
  };

  useEffect(() => {
    if (slug) {
      dispatch(fetchProductBySlug(slug)).then((data) => {
        console.log('data', data);
      });
    }
  }, [dispatch, slug]);

  return (
    <div className="max-w-screen-xl mx-auto mt-10">
      {!loading && error && (
        <h1 className="text-2xl font-semibold p-3">Error: {error}</h1>
      )}
      {!loading && !error && !product && (
        <h1 className="text-2xl font-semibold p-3">No product found</h1>
      )}
      {!loading && !error && product && (
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 mb-4 md:mb-0">
            <img
              src={`${product.image_product}`}
              alt={product.name}
              className="w-full h-auto"
            />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <div className="bg-white shadow p-4 rounded-md">
              <h1 className="text-xl xl:text-2xl font-medium mb-4">
                {product.name}
              </h1>
              <p className="mt-2 text-gray-600">{product.description}</p>
              <div className="mt-6">
                <h1>Selected Quantity</h1>
                <select
                  id="quantitySelect"
                  name="quantity"
                  onChange={updateQuantity}
                  className="border border-gray-300 rounded-md py-2 px-4"
                >
                  <option value="pilih quantity">Pilih quantity</option>
                  {Array.from(
                    { length: product.countInStock },
                    (_, i) => i + 1
                  ).map((quantity) => (
                    <option key={quantity} value={quantity}>
                      {quantity}
                    </option>
                  ))}
                </select>
              </div>
              <p className="mt-6 text-gray-800 font-semibold">
                Rp.{product.price}
              </p>
              <p className="mt-6 text-gray-800 font-semibold">
                Weight: {product.weight}
              </p>
              <div className="mt-6">
                {product.countInStock > 0 ? (
                  user ? (
                    <button
                      className="bg-gray-800 text-white py-2 px-4 rounded-md mt-6"
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <button
                      className="bg-gray-300 text-gray-500 py-2 px-4 rounded-md cursor-not-allowed"
                      disabled
                    >
                      Add to Cart
                    </button>
                  )
                ) : (
                  <div>
                    <h1>Out Of Stock</h1>
                    <button
                      className="bg-gray-300 text-gray-500 py-2 px-4 rounded-md cursor-not-allowed"
                      disabled
                    >
                      Add to Cart
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
