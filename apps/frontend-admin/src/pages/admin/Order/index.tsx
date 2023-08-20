import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { deleteOrderAsync, fetchOrdersAsync } from '../../../redux/order';
import {
  useAppDispatch,
  useAppSelector,
} from 'apps/frontend-admin/src/redux/store';

const OrderPage = () => {
  const order = useAppSelector((state) => state.order);

  const { error, loading, orders } = order;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOrdersAsync());
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      dispatch(deleteOrderAsync(id));

      return;
    }
  };

  if (loading) {
    <h1>Loading</h1>;
  }

  return (
    <div className="page-heading">
      <div className="page-title">
        <div className="row">
          <div className="col-12 col-md-6 order-md-1 order-last">
            <h3>order</h3>
            {error && (
              <div
                className="alert alert-danger alert-dismissible fade show"
                role="alert"
              >
                {error}
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
            )}
          </div>
          <div className="col-12 col-md-6 order-md-2 order-first">
            <nav
              aria-label="breadcrumb"
              className="breadcrumb-header float-start float-lg-end"
            >
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="index.html">Dashboard</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Order
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <section className="section">
        <div className="card">
          <div className="card-header"></div>
          <div className="card-body">
            <table className="table table-striped" id="table1">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Phone</th>
                  <th>Provinsi</th>
                  <th>Kota</th>
                  <th>Alamat</th>
                  <th>Kurir</th>
                  <th>shippingMethod</th>
                  <th>shippingCost</th>
                  <th>Total Price</th>
                  <th>Total Product</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((row) => (
                  <tr key={row.order_id}>
                    <td>{row.order_id}</td>
                    <td>{row.nama}</td>
                    <td>{row.phone}</td>
                    <td>{row.provinsi}</td>
                    <td>{row.kota}</td>
                    <td>{row.alamat}</td>
                    <td>{row.kurir}</td>
                    <td>{row.shippingMethod}</td>
                    <td>{row.shippingCost}</td>
                    <td>{row.total_price}</td>
                    <td>{row.total_product}</td>

                    <td width="250">
                      <a
                        onClick={() => handleDelete(row.order_id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderPage;
