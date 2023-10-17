import React from "react";
import "./AddUser.css";

function AddUser() {
  return (
    <div className="newUser ps-12">
      <h4 className="newUserTitle">Create New User</h4>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input type="text" placeholder="john" />
        </div>
        <div className="newUserItem">
          <label>Full Name</label>
          <input type="text" placeholder="John Smith" />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" placeholder="john@gmail.com" />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" placeholder="password" />
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input type="text" placeholder="+1 123 456 78" />
        </div>

        <button className="newUserButton">Create</button>
      </form>
    </div>
  );
}

export default AddUser;
