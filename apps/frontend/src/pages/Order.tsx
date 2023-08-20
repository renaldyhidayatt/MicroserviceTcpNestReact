import { useEffect } from 'react';
import { fetchOrdersAsync } from '../redux/order';
import { Button, Table } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { deleteOrderAsync } from '../redux/order';
import { useAppDispatch, useAppSelector } from '../redux/store';

export default function OrderPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const order = useAppSelector((state) => state.order);

  const { loading, error, orders } = order;

  const handleDelete = (orderId: number) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      dispatch(deleteOrderAsync(orderId)).then((data) => {
        console.log(data);
      });

      navigate('/');
    }
  };

  const handleGeneratePdf = () => {
    navigate('/order/generatePdf');
  };

  useEffect(() => {
    dispatch(fetchOrdersAsync()).then((data) => {
      console.log('order', data);
    });
  }, []);

  return (
    <div className="relative overflow-x-auto mt-20">
      <div className="flex justify-center">
        <div className="w-full md:w-2/3 card text-center shadow-lg p-3 mb-5 bg-white rounded">
          <div className="text-center m-5">My Order</div>
          <div className="overflow-x-auto mt-10">
            <Table className="w-full text-sm text-left">
              <thead>
                <tr>
                  <th className="border p-2">Order ID</th>
                  <th className="border p-2">Nama</th>
                  <th className="border p-2">Kota</th>
                  <th className="border p-2">Provinsi</th>
                  <th className="border p-2">Total Product</th>
                  <th className="border p-2">Total Price</th>
                  <th className="border p-2">Delete</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <h1>Loading</h1>
                ) : error ? (
                  <h1>Error: {error}</h1>
                ) : (
                  orders.map((row) => (
                    <tr key={row.order_id}>
                      <td className="border px-4 py-2">{row.order_id}</td>
                      <td className="border px-4 py-2">{row.nama}</td>
                      <td className="border px-4 py-2">{row.kota}</td>
                      <td className="border px-4 py-2">{row.provinsi}</td>
                      <td className="border px-4 py-2">{row.total_product}</td>
                      <td className="border px-4 py-2">{row.total_price}</td>
                      <td className="border px-4 py-2">
                        <Button
                          color="failure"
                          onClick={() => handleDelete(row.order_id)}
                        >
                          <i
                            style={{ color: 'white' }}
                            className="far fa-trash-alt"
                          ></i>
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
          <div className="flex justify-center mt-5">
            <Button color="blue" onClick={handleGeneratePdf}>
              <span className="fas fa-file-pdf"></span> Generate PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
