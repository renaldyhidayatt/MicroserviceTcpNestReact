import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSlider } from '../../../redux/slider';
import { useAppDispatch } from 'apps/frontend-admin/src/redux/store';

interface ModalSliderProps {}

export default function ModalSlider(props: ModalSliderProps) {
  const [nama, setNama] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const dispatch = useAppDispatch();

  const handleNamaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNama(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('nama', nama);
    if (image) {
      formData.append('file', image);
    }

    dispatch(createSlider(formData));
  };

  return (
    <div
      className="modal fade text-left"
      id="slider"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="slider"
      aria-hidden="true"
    >
      <form onSubmit={handleSubmit}>
        <div className="modal-body">
          <label htmlFor="nama">Nama: </label>
          <div className="form-group">
            <input
              id="nama"
              type="text"
              name="nama"
              placeholder="Nama"
              className="form-control"
              value={nama}
              onChange={handleNamaChange}
            />
          </div>
          <label htmlFor="image">Image: </label>
          <div className="form-group">
            <input
              type="file"
              className="form-control"
              id="image"
              name="image"
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-light-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="submit"
            className="btn btn-primary ms-1"
            data-bs-dismiss="modal"
          >
            Adding
          </button>
        </div>
      </form>
    </div>
  );
}
