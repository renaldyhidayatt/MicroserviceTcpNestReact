import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchRoleById, updateRoleById } from '../../../redux/role';
import { useState } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from 'apps/frontend-admin/src/redux/store';

const EditRolePage = () => {
  const { id } = useParams();
  const role = useAppSelector((state) => state.role);
  const { loading, error, selectedRole } = role;
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchRoleById(parseInt(id))).then((data) => console.log(data));
    }
  }, []);

  useEffect(() => {
    if (selectedRole) {
      setName(selectedRole.role);

      console.log(selectedRole);
    }
  }, [selectedRole]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updateRole = {
      role: name,
    };

    dispatch(updateRoleById({ id, updateRole })).then((data) => {
      console.log(data);
      navigate('/admin/role');
    });
  };

  if (loading) {
    <h1>Loading</h1>;
  }

  return (
    <div className="page-heading">
      <div className="page-title">
        <div className="row">
          <div className="col-12 col-md-6 order-md-1 order-last">
            <h3>Role</h3>
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
            <h3>Edit Role</h3>
          </div>
          <div className="card-body">
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

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="role" className="form-label">
                  Nama Role
                </label>
                <input
                  type="text"
                  name="role"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  id="role"
                  aria-describedby="emailHelp"
                />
              </div>
              <button type="submit" name="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditRolePage;
