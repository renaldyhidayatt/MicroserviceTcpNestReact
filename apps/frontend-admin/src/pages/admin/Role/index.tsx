import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllRoles, deleteRoleById } from '../../../redux/role';
import {
  useAppDispatch,
  useAppSelector,
} from 'apps/frontend-admin/src/redux/store';

const RolePage = () => {
  const role = useAppSelector((state) => state.role);
  const { loading, error, roles } = role;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllRoles());
  }, []);

  const handleDelete = (roleId: number) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      dispatch(deleteRoleById(roleId));
    }
  };

  return (
    <div className="page-heading">
      <div className="page-title">
        <div className="row">
          <div className="col-12 col-md-6 order-md-1 order-last">
            <h3>Role Page</h3>
            {error && (
              <div
                className="alert alert-danger alert-dismissible fade show"
                role="alert"
              >
                {error.message}
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
                  Role
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
              data-bs-target="#role"
            >
              <i className="fas fa-user"></i> Add Role
            </button>
          </div>
          <div className="card-body">
            <table className="table table-striped" id="table1">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Role</th>
                  <th>Created_at</th>
                  <th>Updated_at</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((row) => (
                  <tr key={row.role_id}>
                    <td>{row.role_id}</td>
                    <td>{row.role}</td>
                    <td>{row.created_at}</td>
                    <td>{row.updated_at}</td>
                    <td width="250">
                      <a
                        href={`/admin/role/edit/${row.role_id}`}
                        className="btn btn-success"
                      >
                        Edit
                      </a>
                      <a
                        onClick={() => handleDelete(row.role_id)}
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

export default RolePage;
