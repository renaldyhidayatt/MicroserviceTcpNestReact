import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoryById, updateCategoryById } from '../../../redux/category';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector,
} from 'apps/frontend-admin/src/redux/store';

const EditCategoryPage = () => {
  const { id } = useParams();

  const categoryState = useAppSelector((state) => state.category);

  const { category, loading, error } = categoryState;
  const [name, setName] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchCategoryById(parseInt(id)));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (category) {
      setName(category.nama_kategori);
    }
  }, [category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('name', name);

    if (file) {
      formData.append('file', file);
    }

    dispatch(updateCategoryById({ id: parseInt(id!), formData })).then(
      (data) => {
        console.log('Update:', data);
        navigate('/admin/category');
      }
    );
  };

  return (
    <div className="page-heading">
      <div className="page-title">
        <div className="row">
          <div className="col-12 col-md-6 order-md-1 order-last">
            <h3>Edit Category</h3>
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
                  Edit Category
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <section className="section">
        <div className="card">
          <div className="card-header">
            <h3>Edit Category</h3>
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
            {loading ? (
              <h1>Loading</h1>
            ) : (
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                  <label htmlFor="nama_kategori" className="form-label">
                    Nama Kategori
                  </label>
                  <input
                    type="text"
                    name="nama_kategori"
                    value={name}
                    className="form-control"
                    id="nama_kategori"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    Gambar
                  </label>
                  <input
                    type="file"
                    name="image"
                    className="form-control"
                    id="image"
                    onChange={(e) => {
                      const selectedFile = e.target.files?.[0];
                      setFile(selectedFile || null);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="current_image" className="form-label">
                    Gambar Saat Ini
                  </label>
                  <br />
                  {category.image_category ? (
                    <img
                      src={`http://localhost:5000/${category.image_category}`}
                      alt="Current Image"
                      style={{ width: '200px' }}
                    />
                  ) : (
                    <span>Tidak ada gambar</span>
                  )}
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditCategoryPage;
