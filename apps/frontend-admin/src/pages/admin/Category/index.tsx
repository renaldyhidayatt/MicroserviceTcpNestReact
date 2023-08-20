import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteCategoryById,
  fetchAllCategories,
} from '../../../redux/category';
import { Link } from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector,
} from 'apps/frontend-admin/src/redux/store';

const CategoryPage = () => {
  const category = useAppSelector((state) => state.category);

  const { error, loading, categories } = category;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      dispatch(deleteCategoryById(id));

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
            <h3>category</h3>
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
                  Category
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <section className="section">
        <div className="card">
          <div className="card-header">
            <button
              type="button"
              className="btn btn-primary btn-sm mb-3"
              data-bs-toggle="modal"
              data-bs-target="#category"
            >
              <i className="fas fa-user"></i> Add Category
            </button>
          </div>
          <div className="card-body">
            <table className="table table-striped" id="table1">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Kategori</th>
                  <th>Image</th>
                  <th>Created_at</th>
                  <th>Updated_at</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((row) => (
                  <tr key={row.category_id}>
                    <td>{row.category_id}</td>
                    <td>{row.nama_kategori}</td>
                    <td>
                      <img
                        src={`http://localhost:5000/${row.image_category}`}
                        alt="Current Image"
                        style={{ width: '200px' }}
                      />
                    </td>
                    <td>{row.created_at}</td>
                    <td>{row.updated_at}</td>
                    <td width="250">
                      <Link
                        to={`/admin/category/edit/${row.category_id}`}
                        className="btn btn-success"
                      >
                        Edit
                      </Link>
                      <a
                        onClick={() => handleDelete(row.category_id)}
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

export default CategoryPage;
