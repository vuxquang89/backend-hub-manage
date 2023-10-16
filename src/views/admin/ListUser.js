import React, { useState, useEffect } from "react";
import { Typography, Table, Avatar } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { userRows } from "../../API/dummyData";
import { Link, useLocation } from "react-router-dom";
import "./ListUser.css";

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

    setDataSource(data);
  };

  return (
    <div>
      <Typography.Title level={4}>List User</Typography.Title>
      <Table
        loading={loading}
        columns={[
          {
            title: "Avatar",
            dataIndex: "avatar",
            render: (link) => {
              return <Avatar src={link} />;
            },
          },
          {
            title: "Username",
            dataIndex: "username",
          },
          {
            title: "Transaction",
            dataIndex: "transaction",
          },
          {
            title: "Email",
            dataIndex: "email",
          },
          {
            title: "Status",
            dataIndex: "status",
          },
          {
            title: "Action",
            key: "id",
            dataIndex: "id",
            render: (text, record) => (
              <>
                <Link to={"/users/" + record.id + "/edit"}>
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
