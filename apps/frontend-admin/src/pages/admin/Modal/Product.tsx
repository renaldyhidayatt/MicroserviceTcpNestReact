import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategories } from '../../../redux/category';
import { createProduct } from '../../../redux/product';
import {
  useAppDispatch,
  useAppSelector,
} from 'apps/frontend-admin/src/redux/store';

interface ModalProductProps {}

interface ProductFormData {
  name: string;
  image: File | null;
  categoryId: string;
  description: string;
  price: string;
  countInStock: string;
}

export default function ModalProduct(props: ModalProductProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    image: null,
    categoryId: '',
    description: '',
    price: '',
    countInStock: '',
  });

  const { categories } = useAppSelector((state) => state.category);
  const dispatch = useAppDispatch();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      name: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({
        ...formData,
        image: e.target.files[0],
      });
    }
  };

  const handleCategoryIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      categoryId: e.target.value,
    });
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      description: e.target.value,
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      price: e.target.value,
    });
  };

  const handleCountInStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      countInStock: e.target.value,
    });
  };

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', formData.name);
    form.append('category_id', formData.categoryId);
    form.append('description', formData.description);
    form.append('price', formData.price);
    form.append('countInStock', formData.countInStock);
    if (formData.image) {
      form.append('file', formData.image);
    }

    dispatch(createProduct(form));
  };

  return (
    // Modal content
    <div
      className="modal fade text-left"
      id="product"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="product"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="product">
              Add Product
            </h4>
            <button
              type="button"
              className="close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i data-feather="x" />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <label htmlFor="name_produk">Nama Produk: </label>
              <div className="form-group">
                <input
                  id="name_produk"
                  type="text"
                  name="name"
                  placeholder="Nama Produk"
                  className="form-control"
                  value={formData.name}
                  onChange={handleNameChange}
                />
              </div>
              <label htmlFor="image">Gambar: </label>
              <div className="form-group">
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                />
              </div>
              <label htmlFor="category_id">ID Kategori: </label>
              <div className="form-group">
                <select
                  name="category_id"
                  className="form-control"
                  value={formData.categoryId}
                  onChange={handleCategoryIdChange}
                >
                  <option value="">Pilih Kategori</option>
                  {categories &&
                    categories.map((k) => (
                      <option key={k.category_id} value={k.category_id}>
                        {k.nama_kategori}
                      </option>
                    ))}
                </select>
              </div>
              <label htmlFor="description">Deskripsi: </label>
              <div className="form-group">
                <textarea
                  id="description"
                  name="description"
                  placeholder="Deskripsi"
                  className="form-control"
                  value={formData.description}
                  onChange={handleDescriptionChange}
                />
              </div>
              <label htmlFor="price">Harga: </label>
              <div className="form-group">
                <input
                  id="price"
                  type="text"
                  name="price"
                  placeholder="Harga"
                  className="form-control"
                  value={formData.price}
                  onChange={handlePriceChange}
                />
              </div>
              <label htmlFor="countInStock">Jumlah Stok: </label>
              <div className="form-group">
                <input
                  id="countInStock"
                  type="text"
                  name="countInStock"
                  placeholder="Jumlah Stok"
                  className="form-control"
                  value={formData.countInStock}
                  onChange={handleCountInStockChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light-secondary"
                data-bs-dismiss="modal"
              >
                <i className="bx bx-x d-block d-sm-none" />
                <span className="d-none d-sm-block">Close</span>
              </button>
              <button
                type="submit"
                className="btn btn-primary ms-1"
                data-bs-dismiss="modal"
              >
                <i className="bx bx-check d-block d-sm-none" />
                <span className="d-none d-sm-block">Adding</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
