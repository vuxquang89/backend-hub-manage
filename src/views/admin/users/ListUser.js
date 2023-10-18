import React, { useState, useEffect } from "react";
import { Typography, Table, Avatar, Space, Button, Flex } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { userRows } from "../../../API/dummyData";
import { Link, useLocation } from "react-router-dom";
import "./ListUser.css";
import { toast } from "react-toastify";
import avatar from "../../../assets/images/user.png";

function ListUser() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    setDataSource(userRows);
    setLoading(false);
    // getInventory().then((res) => {
    //   setDataSource(res.products);
    //   setLoading(false);
    // });
  }, []);

  const handleDeleteOnClick = (record) => {
    let data = dataSource;
    console.log(record.id);
    data = data.filter((item) => item.id !== record.id);
    toast.success("Xóa thành công");
    setDataSource(data);
  };

  return (
    <div className="ps-12">
      <Flex justify="space-between" align="center">
        <Typography.Title level={4}>List User</Typography.Title>
        <Link to="/admin/users/add">
          <button className="btnAddUser">Thêm mới</button>
        </Link>
      </Flex>
      <Table
        loading={loading}
        columns={[
          {
            title: "Avatar",
            dataIndex: "avatar",
            render: (link) => {
              return <Avatar src={avatar} />;
            },
          },
          {
            title: "Username",
            dataIndex: "username",
          },
          {
            title: "Fullname",
            dataIndex: "fullname",
          },
          {
            title: "Email",
            dataIndex: "email",
          },
          {
            title: "Phone",
            dataIndex: "phone",
          },

          {
            title: "Role",
            dataIndex: "role",
          },
          {
            title: "Action",
            key: "id",
            dataIndex: "id",
            render: (text, record) => (
              <>
                <Link to={"/admin/users/" + record.id}>
                  <button
                    className="btnUserEdit"
                    onClick={() => {
                      console.log(record);
                    }}
                  >
                    Edit
                  </button>
                </Link>
                <DeleteOutlined
                  className="btnUserDelete"
                  onClick={() => handleDeleteOnClick(record)}
                />
              </>
            ),
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      ></Table>
    </div>
  );
}

export default ListUser;
