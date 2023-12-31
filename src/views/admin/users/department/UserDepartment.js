import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  Avatar,
  Space,
  Input,
  Flex,
  Popconfirm,
} from "antd";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../ListUser.css";
import { toast } from "react-toastify";
import avatar from "../../../../assets/images/user.png";
import SpanLoading from "../../../../components/loading/SpanLoading";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

function UserDepartment() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [searchedText, setSearchText] = useState("");
  const [id, setId] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    await axiosPrivate
      .get("/api/admin/users/department")
      .then((res) => {
        console.log(">>>>get list users", res.data);
        setDataSource(res.data);

        setLoading(false);
      })
      .catch((err) => {
        console.log("get list users error", err);
        setLoading(false);
        navigate("/login", { state: { from: location }, replace: true });
      });
  };

  const confirmDeleteUser = async () => {
    setFormLoading(true);
    await axiosPrivate
      .delete(`/api/admin/users/department/${id}`)
      .then((res) => {
        console.log(">>>>> delete user result", res.data);
        let result = res.data;
        if (result) {
          let data = dataSource;

          data = data.filter((item) => item.id !== id);
          toast.success("Đã khoá thành công");
          setDataSource(data);
        } else {
          toast.warning("Không thể khoá tài khoản này");
        }
        setFormLoading(false);
      })
      .catch((err) => {
        console.log(">>>>>delete user error", err);
        toast.error("Không thể khoá tài khoản này");
        setFormLoading(false);
      });
  };

  const cancel = (e) => {
    console.log(e);
    //message.error('Click on No');
  };

  const handleDeleteOnClick = (record) => {
    setId(record.id);
  };

  return (
    <div className="ps-12">
      <Flex justify="space-between" align="center">
        <Typography.Title level={4}>Danh sách User - PKT</Typography.Title>
        <Link to="/admin/users/department/add">
          <button className="btnAddUser">Thêm mới</button>
        </Link>
      </Flex>
      <Space style={{ marginBottom: 8 }}>
        <Input
          placeholder="username/fullname/email/phone..."
          onSearch={(value) => {
            setSearchText(value);
          }}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          prefix={<SearchOutlined />}
        />
      </Space>
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
            key: "username",
            filteredValue: [searchedText],
            onFilter: (value, record) => {
              return (
                String(record.username)
                  .toLowerCase()
                  .includes(value.toLowerCase()) ||
                String(record.fullname)
                  .toLowerCase()
                  .includes(value.toLowerCase()) ||
                String(record.email)
                  .toLowerCase()
                  .includes(value.toLowerCase()) ||
                String(record.phone).toLowerCase().includes(value.toLowerCase())
              );
            },
          },
          {
            title: "Fullname",
            dataIndex: "fullname",
            key: "fullname",
          },
          {
            title: "Email",
            dataIndex: "email",
            key: "email",
          },
          {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
          },

          {
            title: "Role",
            dataIndex: "rolesName",
            key: "rolesName",
          },
          {
            title: "Active",
            dataIndex: "statusName",
            key: "statusName",
          },
          {
            title: "Action",
            key: "id",
            dataIndex: "id",
            render: (text, record) => (
              <>
                <Link to={"/admin/users/department/" + record.id}>
                  <button
                    className="btnUserEdit"
                    onClick={() => {
                      console.log(record);
                    }}
                  >
                    Edit
                  </button>
                </Link>
                {record.status === 1 ? (
                  <Popconfirm
                    title="Alarm"
                    description="Bạn có muốn khoá tài khoản?"
                    onConfirm={confirmDeleteUser}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <CloseOutlined
                      className="btnUserDelete"
                      onClick={() => handleDeleteOnClick(record)}
                      title="Khoá tài khoản"
                    />
                  </Popconfirm>
                ) : (
                  <CloseOutlined
                    disabled
                    title="Khoá tài khoản"
                    className="btnUserDelete"
                  />
                )}
              </>
            ),
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      ></Table>
      {formLoading && <SpanLoading />}
    </div>
  );
}

export default UserDepartment;
