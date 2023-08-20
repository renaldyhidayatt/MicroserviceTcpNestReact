import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  calculateSubtotal,
  calculateTotalProducts,
  calculateWeight,
} from '../helpers/utils';
import { deleteManyFromCart, fetchCartItems } from '../redux/cart';
import {
  calculateShippingCost,
  fetchCities,
  fetchProvinces,
} from '../redux/rajaongkir';
import MidtransPaymentButton from '../components/MidtransButton';
import { myApi } from '../helpers/api';
import { createOrderAsync } from '../redux/order';
import { updateQuantity } from '../redux/product';
import { getCartItemById } from '../helpers/cart';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { CreateOrderData } from '../interface';

const CheckoutForm = () => {
  const [recipientName, setRecipientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [province, setProvince] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [addressDetail, setAddressDetail] = useState('');
  const [courier, setCourier] = useState<string>('jne');
  const [shippingMethods, setShippingMethods] = useState<any[]>([]);
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [shippingMethod, setShippingMethod] = useState<string>('');
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.auth);

  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const subtotal = calculateSubtotal(cartItems);
  const totalProducts = calculateTotalProducts(cartItems);
  const totalWeight = calculateWeight(cartItems);

  const { provinces, cities, shippingCosts } = useAppSelector(
    (state) => state.rajaOngkir
  );

  useEffect(() => {
    dispatch(fetchProvinces());
    dispatch(fetchCartItems());
  }, [dispatch]);

  useEffect(() => {
    if (province) {
      dispatch(fetchCities(parseInt(province)));
    }
  }, [province]);

  const checkCost = () => {
    try {
      dispatch(
        calculateShippingCost({
          asal: city,
          tujuan: city,
          berat: 2,
          kurir: courier,
        })
      );
    } catch (error) {
      console.error('Error calculating shipping cost:', error);
    }
  };

  useEffect(() => {
    if (city && courier) {
      checkCost();
    }
  }, [city, courier]);

  useEffect(() => {
    if (shippingCosts.length > 0) {
      setShippingMethods(shippingCosts[0].costs);
      setShippingCost(shippingCosts[0].costs[0].cost[0].value);
    }
  }, [shippingCosts]);

  const handleProvinceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setProvince(event.target.value);
  };

  const handleAddressName = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAddressDetail(event.target.value);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(event.target.value);
  };

  const handleCourierChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCourier(event.target.value);
  };

  const handleRecipentName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecipientName(event.target.value);
  };

  const handlePhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
  };

  const handleShippingMethodChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedShippingMethod = event.target.value;
    const selectedCost = shippingMethods.find(
      (method) => method.service === selectedShippingMethod
    );

    if (selectedCost) {
      setShippingCost(selectedCost.cost[0].value);

      setShippingMethod(
        `${selectedCost.service} Rp. ${selectedCost.cost[0].value} Estimasi ${selectedCost.cost[0].etd}`
      );

      console.log(shippingMethod);
    }
  };

  useEffect(() => {
    setTotal(subtotal + shippingCost);
  }, [shippingCost]);

  const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (
        !recipientName ||
        !phoneNumber ||
        !province ||
        !city ||
        !addressDetail ||
        !courier ||
        !shippingMethod ||
        !shippingCost ||
        total <= 0
      ) {
        console.error('Please fill out all required fields correctly.');
        setLoading(false);
        return;
      }

      const formDataOrder: CreateOrderData = {
        user_id: user.id,
        nama: recipientName,
        phone: phoneNumber,
        provinsi: province,
        kota: city,
        alamat: addressDetail,
        kurir: courier,
        shippingMethod: shippingMethod,
        shippingCost: shippingCost,
        totalProduct: totalProducts.toString(),
        totalPrice: total,
      };

      const formData = {
        gross_amount: total,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone: phoneNumber,
      };

      const response = await myApi.post('midtrans/transaction', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      const cartIds = cartItems.map((item) => item.cart_id);
      console.log(cartIds);

      if (data && data.token) {
        window.snap.pay(data.token, {
          onSuccess: async (result: any) => {
            dispatch(createOrderAsync(formDataOrder));

            dispatch(updateQuantity(cartItems));
            dispatch(deleteManyFromCart(cartIds));

            setLoading(false);
          },
          onPending: (result: any) => {
            console.log('Pending transaction', result);
            setLoading(false);
          },
          onError: (result: any) => {
            console.log('Error transaction', result);
            setLoading(false);
          },
          onClose: () => {
            console.log(
              'Customer close the popup window without finishing the payment'
            );
            setLoading(false);
          },
        });
      } else {
        console.error('Snap Token is missing or invalid.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching Snap Token:', error);
      setLoading(false);
    }
  };

  return (
    <section className="max-w-screen-xl mx-auto mt-10">
      <div className="container mx-auto px-4- py-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 md:col-span-1 bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Billing Information</h2>
            <div className="mb-4">
              <label htmlFor="name" className="block font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="recipientName"
                value={recipientName}
                onChange={handleRecipentName}
                className="form-input w-full mt-1"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block font-medium">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phoneNumber"
                value={phoneNumber}
                onChange={handlePhoneNumber}
                className="form-input w-full mt-1"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="provinsi" className="block font-medium">
                Provinsi
              </label>
              <select
                name="province"
                id="province_id"
                className="select-2"
                value={province}
                onChange={handleProvinceChange}
                required
              >
                <option value="" disabled>
                  -- Select Province --
                </option>
                {provinces.map((province) => (
                  <option
                    key={province.province_id}
                    value={province.province_id}
                  >
                    {province.province}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="city" className="block font-medium">
                City
              </label>
              <select
                name="city"
                id="city_id"
                className="select-2"
                value={city}
                onChange={handleCityChange}
                disabled={!cities.length}
                required
              >
                <option value="" disabled>
                  -- Select City --
                </option>
                {cities.map((c) => (
                  <option key={c.city_id} value={c.city_id}>
                    {c.type} {c.city_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block font-medium">
                Address
              </label>
              <textarea
                value={addressDetail}
                onChange={handleAddressName}
                id="address"
                name="addressDetail"
                className="form-textarea w-full mt-1"
                defaultValue={''}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="courier" className="block font-medium">
                Courier
              </label>
              <select
                onChange={handleCourierChange}
                value={courier}
                name="courier"
              >
                <option value="jne">JNE</option>
                <option value="tiki">TIKI</option>
                <option value="pos">POS INDONESIA</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="shipmentMethod" className="block font-medium">
                Shipment Method
              </label>
              <select
                onChange={handleShippingMethodChange}
                name="shippingMethods"
              >
                <option value="" disabled>
                  -- Select Shipment Method --
                </option>
                {shippingMethods.map((method) => (
                  <option key={method.service} value={method.service}>
                    {method.service} Rp. {method.cost[0].value} Estimasi{' '}
                    {method.cost[0].etd}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-span-2 md:col-span-1 bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Your Order</h2>
            <ul className="mb-4">
              {cartItems.map((item) => (
                <li key={item.product_id}>
                  {item.name} x {item.quantity}{' '}
                  <span>RP {item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
            <div className="mb-4">
              <label className="block font-medium">Total Weight</label>
              <p>{totalWeight}</p>
            </div>
            <div className="mb-4">
              <label className="block font-medium">Subtotal</label>
              <p>{subtotal}</p>
            </div>
            <div className="mb-4">
              <label className="block font-medium">Shipping Cost</label>
              <p>{shippingCost}</p>
            </div>
            <div className="mb-4">
              <label className="block font-medium">Total</label>
              <p>{total}</p>
            </div>
            <MidtransPaymentButton
              handlePayment={handlePayment}
              disabled={loading}
            />
            {loading && <p>Loading...</p>}{' '}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutForm;
