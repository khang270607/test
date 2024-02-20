import React from "react";

const Modal = ({ show, handleClose, student }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <button onClick={handleClose}>Close</button>
                {student && (
                    <div>
                        <h2>Thông tin sinh viên</h2>
                        <p>ID: {student._id}</p>
                        <p>Tên: {student.name}</p>
                        <p>Tuổi: {student.age}</p>
                        <p>Email: {student.email}</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Modal;
