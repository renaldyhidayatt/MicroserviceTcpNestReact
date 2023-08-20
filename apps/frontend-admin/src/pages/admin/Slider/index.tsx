import { useEffect } from 'react';
import { deleteSliderById, fetchAllSliders } from '../../../redux/slider';
import { Link } from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector,
} from 'apps/frontend-admin/src/redux/store';

const SliderPage = () => {
  const { sliders, error, loading } = useAppSelector((state) => state.slider);

  const dispatch = useAppDispatch();

  const handleDeleteSlider = (id: number) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      dispatch(deleteSliderById(id));
    }
  };

  useEffect(() => {
    dispatch(fetchAllSliders()).then((data) => console.log(data));
  }, []);

  if (loading) {
    <h1>Loading</h1>;
  }

  return (
    <div className="page-heading">
      <div className="page-title">
        <div className="row">
          <div className="col-12 col-md-6 order-md-1 order-last">
            <h3>Slider - Page</h3>
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
                  <Link to={'/admin'}>Dashboard</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Slider
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
              data-bs-target="#slider"
            >
              <i className="fas fa-user"></i> Add Slider
            </button>
          </div>
          <div className="card-body">
            <table className="table table-striped" id="table1">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Image</th>
                  <th>Created_at</th>
                  <th>Updated_at</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {sliders &&
                  sliders.map((row) => (
                    <tr key={row.slider_id}>
                      <td>{row.slider_id}</td>
                      <td>{row.nama}</td>
                      <td>
                        <img
                          src={'http://localhost:5000/' + row.image}
                          alt="Current Image"
                          style={{ width: '200px' }}
                        />
                      </td>
                      <td>{row.created_at}</td>
                      <td>{row.updated_at}</td>
                      <td width="250">
                        <Link
                          to={`/admin/slider/edit/${row.slider_id}`}
                          className="btn btn-success"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => {
                            handleDeleteSlider(row.slider_id);
                          }}
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

export default SliderPage;
