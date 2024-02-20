import React, { useState, useEffect } from "react";
import "./Data.css";
const Modal = ({ student, closeModal }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>
                    &times;
                </span>
                <h2>Thông tin sinh viên</h2>
                <p>
                    <strong>ID:</strong> {student._id}
                </p>
                <p>
                    <strong>Name:</strong> {student.name}
                </p>
                <p>
                    <strong>Age:</strong> {student.age}
                </p>
                <p>
                    <strong>Email:</strong> {student.email}
                </p>
            </div>
        </div>
    );
};
//useState: Hook được sử dụng trong React để quản lý trạng thái của một component.
const Data = () => {
    //
    const [showModal, setShowModal] = useState(false); // Trạng thái hiển thị modal
    const [selectedStudent, setSelectedStudent] = useState(null); // Sinh viên được chọn để hiển thị trong modal

    // Hàm mở modal và hiển thị thông tin sinh viên khi nút "Xem thông tin" được nhấp
    const openModal = (student) => {
        setSelectedStudent(student);
        setShowModal(true);
    };

    // Hàm đóng modal
    const closeModal = () => {
        setShowModal(false);
    };
    // Render các đối tượng sinh viên và thêm nút "Show" sau mỗi đối tượng
    // Khai báo các state cho tiêu đề và danh sách sinh viên là một mảng các đối tượng
    const [title, setTitle] = useState([
        "ID",
        "Name students",
        "Age",
        "Email",
        "",
        "",
        "",
    ]);
    //students: biến lưu giá trị | setStudents: biến cập nhật giá trị biến students
    const [students, setStudents] = useState([
        {
            _id: 1, //Mã số duy nhất của sinh viên.
            name: "Huỳnh Vũ Khang", //Tên của sinh viên.
            age: 17, //Tuổi của sinh viên.
            email: "khang@gmail.com", //Địa chỉ email của sinh viên.
        },
        {
            _id: 2,
            name: "Huỳnh Hoàng Anh",
            age: 22,
            email: "anh@gmail.com",
        },
        {
            _id: 3,
            name: "Đặng Ngọc Chí",
            age: 19,
            email: "chi@gmail.com",
        },
        {
            _id: 4,
            name: "Phan Thành Đạt",
            age: 17,
            email: "dat@gmail.com",
        },
    ]);
    //State định nghĩa trạng thái hiện tại của component, bao gồm các giá trị dữ liệu mà component đó sử dụng và hiển thị.
    // Các state để lưu thông tin sinh viên mới và chỉnh sửa
    const [newId, setNewId] = useState("");
    const [newName, setNewName] = useState("");
    const [newAge, setNewAge] = useState("");
    const [newEmail, setNewEmail] = useState("");
    // State để lưu id của sinh viên đang được chỉnh sửa
    const [editingRow, setEditingRow] = useState("");
    // State để lưu trạng thái chế độ tối/sáng
    const [darkMode, setDarkMode] = useState(false);
    // State để lưu từ khóa tìm kiếm
    const [searchTerm, setSearchTerm] = useState("");

    // useEffect được sử dụng để thay đổi chế độ tối/sáng của trang web
    // effects có thể là như lấy và ghi dữ liệu từ các nguồn bên ngoài như API, gửi yêu cầu HTTP, đăng ký và hủy đăng ký các sự kiện, thao tác với DOM, và nhiều hành động khác.
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark-mode"); // Thêm class "dark-mode" vào body khi chế độ tối được bật
        } else {
            document.body.classList.remove("dark-mode"); // Xóa class "dark-mode" khi chế độ tối được tắt
        }
    }, [darkMode]); // useEffect sẽ chạy lại mỗi khi darkMode thay đổi

    // Hàm xử lý khi click vào nút "Thêm mới" để thêm sinh viên vào danh sách
    const onClickAddStudents = () => {
        let studentsCopy = [...students]; // Tạo bản sao của danh sách sinh viên hiện tại
        studentsCopy.push({
            // Thêm sinh viên mới vào danh sách
            _id: newId,
            name: newName,
            age: newAge,
            email: newEmail,
        });
        setStudents(studentsCopy); // Cập nhật danh sách sinh viên với sinh viên mới
        // Reset các trường nhập liệu sau khi thêm sinh viên thành công
        setNewId("");
        setNewName("");
        setNewAge("");
        setNewEmail("");
    };

    // Hàm xử lý khi click vào nút "Cập nhật" để cập nhật thông tin sinh viên
    const onClickUpdateStudents = () => {
        let studentsCopy = [...students]; // Tạo bản sao của danh sách sinh viên hiện tại
        let index = students.findIndex((s) => s._id === editingRow); // Tìm index của sinh viên đang được chỉnh sửa
        studentsCopy[index] = {
            // Cập nhật thông tin của sinh viên trong danh sách
            _id: newId,
            name: newName,
            age: newAge,
            email: newEmail,
        };
        setStudents(studentsCopy); // Cập nhật danh sách sinh viên
        // Reset các trường nhập liệu sau khi cập nhật thành công
        setNewId("");
        setNewName("");
        setNewAge("");
        setNewEmail("");
    };

    // Các hàm xử lý thay đổi giá trị của các trường nhập liệu
    const onChangeNewId = (e) => {
        setNewId(e.currentTarget.value);
    };
    const onChangeNewName = (e) => {
        setNewName(e.currentTarget.value);
    };
    const onChangeNewAge = (e) => {
        setNewAge(e.currentTarget.value);
    };
    const onChangeNewEmail = (e) => {
        setNewEmail(e.currentTarget.value);
    };

    // Hàm xử lý khi click vào nút "Chỉnh sửa" của một sinh viên
    const onPressEditingRow = (student) => {
        // Set các giá trị của sinh viên vào state để hiển thị trong các trường nhập liệu
        setNewId(student._id);
        setNewName(student.name);
        setNewAge(student.age);
        setNewEmail(student.email);
        // Lưu id của sinh viên đang chỉnh sửa để sử dụng cho việc cập nhật
        setEditingRow(student._id);
    };

    // Hàm xử lý khi click vào nút "Xoá" của một sinh viên
    const onPressDeleteRow = (_id) => {
        let studentsCopy = [...students]; // Tạo bản sao của danh sách sinh viên hiện tại
        let index = students.findIndex((s) => s._id === _id); // Tìm index của sinh viên cần xoá
        studentsCopy.splice(index, 1); // Xoá sinh viên khỏi danh sách
        setStudents(studentsCopy); // Cập nhật danh sách sinh viên
    };

    // Hàm chuyển đổi giữa chế độ tối và sáng
    const toggleDarkMode = () => {
        setDarkMode(!darkMode); // Đảo ngược giá trị của darkMode khi click vào nút chuyển đổi
    };

    // Hàm xử lý thay đổi của ô nhập liệu tìm kiếm
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Lọc danh sách sinh viên theo từ khóa tìm kiếm
    //student._id.toString().includes(searchTerm): Đây là điều kiện để lọc các sinh viên. Chi tiết:
    // student._id: Là thuộc tính _id của sinh viên hiện đang được xem xét. Có thể giả định rằng _id là một số, nhưng đối với một số trường hợp, nó có thể được lưu trữ dưới dạng chuỗi.
    // .toString(): Chuyển đổi giá trị của _id thành chuỗi. Điều này đảm bảo rằng chúng ta có thể sử dụng phương thức includes() sau đó.
    // .includes(searchTerm): Phương thức includes() được sử dụng để kiểm tra xem chuỗi _id có chứa chuỗi searchTerm hay không. Nếu searchTerm xuất hiện trong _id, điều kiện này trả về true, ngược lại trả về false.
    const filteredStudents = students.filter((student) =>
        student._id.toString().includes(searchTerm)
    );
    return (
        <React.Fragment>
            <div className="body">
                {/* Nút chuyển đổi chế độ sáng/tối */}
                <button onClick={toggleDarkMode}>
                    {darkMode ? "Chế độ sáng" : "Chế độ tối"}
                </button>

                {/* Ô input tìm kiếm theo ID */}
                <input
                    type="text"
                    placeholder="Tìm kiếm theo ID"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />

                {/* Thông báo nếu không tìm thấy ID */}
                {filteredStudents.length === 0 && (
                    <p className="nullId">ID KHÔNG TỒN TẠI</p>
                )}

                {/* Ô input để nhập ID mới */}
                <input
                    onChange={onChangeNewId}
                    name="id"
                    value={newId}
                    disabled={editingRow} // Vô hiệu hóa khi chỉnh sửa hàng
                    placeholder="Hãy nhập ID"
                />

                {/* Ô input để nhập tên mới */}
                <input
                    onChange={onChangeNewName}
                    name="nameId"
                    value={newName}
                    placeholder="Hãy nhập tên"
                />

                {/* Ô input để nhập tuổi mới */}
                <input
                    onChange={onChangeNewAge}
                    name="age"
                    value={newAge}
                    placeholder="Hãy nhập tuổi"
                />

                {/* Ô input để nhập email mới */}
                <input
                    onChange={onChangeNewEmail}
                    name="email"
                    value={newEmail}
                    placeholder="Hãy nhập email"
                />

                {editingRow ? (
                    <button onClick={onClickUpdateStudents}>Cập nhật</button>
                ) : (
                    <button onClick={onClickAddStudents}>Thêm mới</button>
                )}

                {/* Bảng hiển thị danh sách sinh viên */}
                <table className={darkMode ? "table-dark" : ""}>
                    {/* Tiêu đề của các cột */}

                    <tr>
                        {title.map((t) => {
                            return <th key={t}>{t}</th>;
                        })}
                    </tr>

                    {/* Dữ liệu của các sinh viên */}

                    {filteredStudents.map((s) => {
                        return (
                            <tr key={s._id}>
                                {/* Cột ID */}
                                <td key={s._id}>{s._id}</td>

                                {/* Cột Tên */}
                                <td key={s.name}>{s.name}</td>

                                {/* Cột Tuổi */}
                                <td key={s.age}>{s.age}</td>

                                {/* Cột Email */}
                                <td key={s.email}>{s.email}</td>

                                {/* Nút "Chỉnh sửa" */}
                                <td>
                                    <button
                                        onClick={(e) => onPressEditingRow(s)}
                                    >
                                        Chỉnh sửa
                                    </button>
                                </td>

                                {/* Nút "Xoá" */}
                                <td>
                                    <button
                                        onClick={(e) => onPressDeleteRow(s._id)}
                                    >
                                        Xoá
                                    </button>
                                </td>
                                <td>
                                    {/* Nút "Xem thông tin" */}
                                    <button onClick={() => openModal(s)}>
                                        Xem thông tin
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </table>

                {/* Hiển thị modal */}
                {showModal && (
                    <Modal student={selectedStudent} closeModal={closeModal} />
                )}
            </div>
        </React.Fragment>
    );
};

export default Data;
