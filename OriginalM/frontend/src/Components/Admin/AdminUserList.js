import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [updatedUserInfo, setUpdatedUserInfo] = useState({
    firstname: "",
    email: "",
    ZipCode: "",
    dob: "",
    kids: "",
    city: "",
    addressOne: "",
    state: "",
  });

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:3002/admin/user-info");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      // Handle error
    }
  };

  const viewUser = async (userId) => {
    if (!userId) {
      console.error("User ID is undefined");
      return;
    }

    try {
      const response = await axios.get(
        `http://127.0.0.1:3002/admin/user-info/${userId}`
      );
      setSelectedUser(response.data);
      setIsViewModalOpen(true);
    } catch (error) {
      console.error("Error fetching user details:", error);
      // Handle error
    }
  };

  const editUser = async (userId) => {
    if (!userId) {
      console.error("User ID is undefined");
      return;
    }

    try {
      const response = await axios.get(
        `http://127.0.0.1:3002/admin/user-info/${userId}`
      );
      setSelectedUser(response.data);
      setUpdatedUserInfo(response.data); // Set the user info for editing
      setIsEditModalOpen(true);
    } catch (error) {
      console.error("Error fetching user details for editing:", error);
      // Handle error
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updateUser = async () => {
    try {
      const userId = selectedUser.id;
      await axios.put(
        `http://127.0.0.1:3002/admin/user-info/${userId}`,
        updatedUserInfo
      );
      // Assuming the server responds with a success message
      console.log("User updated successfully");
      // Close the modal
      setIsEditModalOpen(false);
      // Refresh the user list
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
      // Handle error
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className="left-side">
        <img src="../image/leftbar.png" alt="Admin Image" />
        <div className="links">
          <Link to="/admindashboard">Dashboard</Link>
          <Link to="/adminuserlist">Manage Userlist</Link>
          <Link to="/adminwavelist">Wave list</Link>
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        <h2>User Information</h2>
        <table
          style={{
            borderCollapse: "collapse",
            width: "80%",
            marginTop: "20px",
          }}>
          <thead>
            <tr>
              <th
                style={{
                  border: "1px solid #dddddd",
                  textAlign: "left",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                }}>
                Name
              </th>
              <th
                style={{
                  border: "1px solid #dddddd",
                  textAlign: "left",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                }}>
                Email
              </th>
              <th
                style={{
                  border: "1px solid #dddddd",
                  textAlign: "left",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                }}>
                Phone Number
              </th>
              <th
                style={{
                  border: "1px solid #dddddd",
                  textAlign: "left",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                }}>
                Status
              </th>
              <th
                style={{
                  border: "1px solid #dddddd",
                  textAlign: "left",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td
                  style={{
                    border: "1px solid #dddddd",
                    textAlign: "left",
                    padding: "8px",
                  }}>
                  {user.firstname}
                </td>
                <td
                  style={{
                    border: "1px solid #dddddd",
                    textAlign: "left",
                    padding: "8px",
                  }}>
                  {user.email}
                </td>
                <td
                  style={{
                    border: "1px solid #dddddd",
                    textAlign: "left",
                    padding: "8px",
                  }}>
                  {user.phoneNumber}
                </td>
                <td
                  style={{
                    border: "1px solid #dddddd",
                    textAlign: "left",
                    padding: "8px",
                  }}>
                  {user.status}
                </td>
                <td>
                  <button
                    style={{ marginRight: "5px" }}
                    onClick={() => viewUser(user.id)}>
                    View
                  </button>
                  <button
                    style={{ marginRight: "5px" }}
                    onClick={() => editUser(user.id)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isViewModalOpen}
        onRequestClose={() => setIsViewModalOpen(false)}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
          },
        }}>
        {selectedUser && (
          <div style={{ textAlign: "left" }}>
            <h3>User Details</h3>
            <p>
              <strong>First Name:</strong> {selectedUser.firstname}
            </p>
            <p>
              <strong>Last Name:</strong> {selectedUser.lastname}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Phone Number:</strong> {selectedUser.phoneNumber}
            </p>
            <p>
              <strong>Zip Code:</strong> {selectedUser.ZipCode}
            </p>
            <p>
              <strong>Date of Birth:</strong> {selectedUser.dob}
            </p>
            <p>
              <strong>Kids:</strong> {selectedUser.kids}
            </p>
            <p>
              <strong>City:</strong> {selectedUser.city}
            </p>
            <p>
              <strong>Address:</strong> {selectedUser.addressOne}
            </p>
            <p>
              <strong>State:</strong> {selectedUser.state}
            </p>
          </div>
        )}
        <button onClick={() => setIsViewModalOpen(false)}>Close</button>
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
          },
        }}>
        {selectedUser && (
          <div style={{ textAlign: "left" }}>
            <h3>Edit User</h3>
            <h4>First Name</h4>{" "}
            <input
              type="text"
              name="firstname"
              value={updatedUserInfo.firstname}
              onChange={handleInputChange}
            />
            <h4>email</h4>{" "}
            <input
              type="email"
              name="email"
              value={updatedUserInfo.email}
              onChange={handleInputChange}
            />
            <h4>zip code</h4>{" "}
            <input
              type="text"
              name="ZipCode"
              value={updatedUserInfo.ZipCode}
              onChange={handleInputChange}
            />
            <h4>Date of birth</h4>{" "}
            <input
              type="text"
              name="dob"
              value={updatedUserInfo.dob}
              onChange={handleInputChange}
            />
            <h4>Kids</h4>{" "}
            <input
              type="text"
              name="kids"
              value={updatedUserInfo.kids}
              onChange={handleInputChange}
            />
            <h4>City</h4>{" "}
            <input
              type="text"
              name="city"
              value={updatedUserInfo.city}
              onChange={handleInputChange}
            />
            <h4>AddressOne</h4>{" "}
            <input
              type="text"
              name="addressOne"
              value={updatedUserInfo.addressOne}
              onChange={handleInputChange}
            />
            <h4>State</h4>{" "}
            <input
              type="text"
              name="state"
              value={updatedUserInfo.state}
              onChange={handleInputChange}
            />
            <button onClick={updateUser}>Update</button>
          </div>
        )}
        <button onClick={() => setIsEditModalOpen(false)}>Close</button>
      </Modal>
    </>
  );
};

export default AdminUserList;
