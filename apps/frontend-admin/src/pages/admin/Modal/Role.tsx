import React, { useState } from 'react';
import { createRole } from '../../../redux/role';
import { CreateRole } from 'apps/frontend-admin/src/interface';
import { useAppDispatch } from 'apps/frontend-admin/src/redux/store';

export default function ModalRole() {
  const [roleName, setRoleName] = useState('');
  const dispatch = useAppDispatch();

  const handleRoleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoleName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: CreateRole = {
      role: roleName,
    };

    dispatch(createRole(formData));
  };

  return (
    <div
      className="modal fade text-left"
      id="role"
      role="dialog"
      aria-labelledby="role"
      aria-hidden="true"
    >
      {/* Modal content */}
      <form onSubmit={handleSubmit}>
        <div className="modal-body">
          <label htmlFor="role">Nama Role: </label>
          <div className="form-group">
            <input
              id="role"
              type="text"
              name="role"
              placeholder="Nama Role"
              className="form-control"
              value={roleName}
              onChange={handleRoleNameChange}
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
