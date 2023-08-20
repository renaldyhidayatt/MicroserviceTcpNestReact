import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../../redux/store';
import { fetchUsers, deleteUserById } from '../../../redux/user';

const UserPage: React.FC = () => {
  const myuser = useAppSelector((state) => state.user);

  const { users, loading, error } = myuser;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers())
      .then((data) => console.log(data))
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  const handleDeleteUser = (userId: number) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this user?'
    );
    if (confirmDelete) {
      dispatch(deleteUserById(userId))
        .then(() => {
          alert('User deleted successfully');

          window.location.reload();
        })
        .catch((error) => {
          alert('Failed to delete user');
          console.log(error);
        });
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page-heading">
      <div className="page-title">
        <div className="row">
          <div className="col-12 col-md-6 order-md-1 order-last">
            <h3>User</h3>
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
                />
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
                <li className="breadcrumb-item active" aria-current="page"></li>
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
              data-bs-target="#user"
            >
              <i className="fas fa-user" /> Add User
            </button>
          </div>
          <div className="card-body">
            <table className="table table-striped" id="table1">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Email</th>
                  <th>Created_at</th>
                  <th>Updated_at</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.user_id}>
                    <td>{user.user_id}</td>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.email}</td>
                    <td>{user.created_at}</td>
                    <td>{user.updated_at}</td>
                    <td width={250}>
                      <a
                        href={`/admin/user/edit/${user.user_id}`}
                        className="btn btn-success"
                      >
                        Edit
                      </a>
                      <button
                        onClick={() => handleDeleteUser(user.user_id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
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

export default UserPage;
