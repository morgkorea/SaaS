import React from 'react';

const EditBtn = ({ setEditMode, editMode, saveBtn, editBtn, handleEditClick }) => {
    return (
        <div className="edit-btn-area avatar-md" onClick={() => setEditMode((prev) => !prev)}>
            <span className="avatar-title bg-primary text-white font-20 rounded-circle shadow-lg">
                {editMode ? (
                    <i className="mdi mdi-account-edit" onClick={saveBtn} />
                ) : (
                    <i className="mdi mdi-content-save" onClick={editBtn} />
                )}

            </span>
        </div>
    );
};

export default EditBtn;
