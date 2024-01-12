import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Popconfirm,
  Table,
  Typography,
} from "antd";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import {
  DeleteOutlined,
  EyeOutlined,
  RedoOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import SpanLoading from "../../../components/loading/SpanLoading";
import { AuthContext } from "../../../context/AuthProvider";
import { useContext } from "react";
import "./ManagerUser.css";

const ManagerUser = ({
  stompClient,
  sendPrivateValue,
  actionStatus,
  receive,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();

  const [formLoading, setFormLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedText, setSearchText] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [isAddUser, setIsAddUser] = useState(false);
  const [detailUser, setDetailUser] = useState(false);
  const [formAddUser] = Form.useForm();
  const [formDetailUser] = Form.useForm();

  const [success, setSuccess] = useState(false);
  const [mes, setMes] = useState("");

  const [username, setUsername] = useState("");
  const [role, setRole] = useState(5);
  const [activate, setActivate] = useState(0);

  const layout = {
    labelCol: {
      span: 10,
    },
    wrapperCol: {
      span: 16,
    },
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    await axiosPrivate
      .get("/api/leader/users")
      .then((res) => {
        console.log(">>>>get list users", res.data);
        setDataSource(res.data);

        setIsLoading(false);
      })
      .catch((err) => {
        console.log("get list users error", err);
        setIsLoading(false);
        navigate("/login", { state: { from: location }, replace: true });
      });
  };

  const setRowClassName = (record) => {
    return record.username === username ? "clickRowStyle" : "";
    // console.log(">>>>>>>set rơ class name", record);
  };

  const handleViewFormAddUserOnClick = () => {
    setIsAddUser(true);
    setDetailUser(false);
    setUsername("");
  };

  function resetFormAddUser() {
    formAddUser.resetFields();
  }

  /**
   * handle add new user
   * @param {*} values
   */
  const handleAddUserSubmit = async (values) => {
    setFormLoading(true);
    await axiosPrivate
      .post("/api/leader/user", {
        username: values.username,
        password: values.password,
        email: values.email,
        fullname: values.fullname,
        phone: values.phone,
      })
      .then((res) => {
        console.log(">>>>> create user result", res.data);
        const result = res.data;
        if (result.status === 100) {
          toast.success("Thêm mới thành công");
          setDataSource([...dataSource, result.responses[0]]);
          setSuccess(false);
          setMes("");
          resetFormAddUser();
        } else {
          setSuccess(true);
          setMes(result.message);
        }
        setFormLoading(false);
      })
      .catch((err) => {
        setFormLoading(false);
        toast.error("Không thể thêm mới");
        console.log(">>>>> create user error", err);
      });
  };

  /**
   * handle edit user
   * @param {*} values
   */
  const handleEditUserSubmit = async (values) => {
    setFormLoading(true);
    await axiosPrivate
      .put(`/api/leader/user`, {
        fullname: values.fullname,
        email: values.email,
        phone: values.phone,
        role: values.role,
        status: values.activate,
        username: username,
      })
      .then((res) => {
        const result = res.data;
        console.log(">>>>>edit user result", res.data);

        if (result.status === 100) {
          const response = result.responses[0];
          updateData(response);
          toast.success("Cập nhật thành công");

          setSuccess(false);
          setMes("");
        } else {
          console.log(">>>> khong tim thay ", username);
          toast.success("Không thể cập nhật");
          setSuccess(true);
          setMes("Không tìm thấy " + username);
        }

        setFormLoading(false);
      })
      .catch((err) => {
        console.log(">>>>edit user error", err);
        setFormLoading(false);

        toast.success("Không thể cập nhật");
        setSuccess(true);
        setMes(err);
      });
  };

  /**
   * update data source
   * @param {} res
   */
  const updateData = async (res) => {
    // let dateMaintenance = res.dateMaintenance;

    const updateUser = dataSource.map((user) => {
      if (user.id === res.id) {
        return {
          ...user,
          fullname: res.fullname,
          email: res.email,
          phone: res.phone,
          statusName: res.statusName,
          rolesName: res.rolesName[0],
        };
      } else {
        return user;
      }
    });
    setDataSource(updateUser);
  };

  const handleViewFormUserOnClick = (record) => {
    setUsername(record.username);

    formDetailUser.setFieldsValue({
      fullname: record.fullname,
      email: record.email,
      phone: record.phone,
      role: record.rolesId[0],
      activate: record.status,
    });
    setIsAddUser(false);
    setDetailUser(true);
  };

  const cancel = (e) => {
    console.log(e);
    setUsername("");
    //message.error('Click on No');
  };

  const handleResetPasswordOnClick = (record) => {
    setUsername(record.username);
  };

  /**
   * handle reset password
   */
  const handleConfirmResetPassword = async () => {
    setFormLoading(true);
    await axiosPrivate
      .put(`/api/leader/user/password/reset`, { username: username })
      .then((res) => {
        let result = res.data;
        if (result.status === 100) {
          toast.success("Reset mật khẩu thành công! Hãy kiểm tra email");
        } else {
          toast.warning("Không thể reset mật khẩu cho tài khoản này");
        }
        setFormLoading(false);
      })
      .catch((err) => {
        console.log(">>>>>reset password error", err);
        toast.error("Reset mật khẩu thất bại");
        setFormLoading(false);
      });
  };

  return (
    <>
      <div className="container">
        <div className="main-container-hub-detail">
          <Row>
            <Col span={24} className="title-container">
              <Typography.Title level={3}>Quản lý Users</Typography.Title>
            </Col>
          </Row>
          {/* {getData ? ( */}
          <Row>
            <Col span={24}>
              <Row>
                <Col span={18}>
                  <Card className="boxShadow">
                    <Row>
                      <Col span={24}>
                        <Row className="align-item-center mb-10">
                          <Col span={8}>
                            <Typography.Title level={5} className="m-0 ">
                              Danh sách Users
                            </Typography.Title>
                          </Col>
                          <Col span={8}>
                            <Input
                              placeholder="Tên đăng nhập / Tên ..."
                              onSearch={(value) => {
                                setSearchText(value);
                              }}
                              onChange={(e) => {
                                setSearchText(e.target.value);
                              }}
                              prefix={<SearchOutlined />}
                            />
                          </Col>
                          <Col span={8} className="text-align-end">
                            <button
                              className="btnAddUser"
                              onClick={() => {
                                handleViewFormAddUserOnClick();
                                console.log("show form add user");
                              }}
                            >
                              Thêm mới
                            </button>
                          </Col>
                        </Row>

                        <Row>
                          <Col span={24}>
                            <Table
                              loading={isLoading}
                              columns={[
                                {
                                  title: "Username",
                                  key: "username",
                                  dataIndex: "username",
                                  filteredValue: [searchedText],
                                  onFilter: (value, record) => {
                                    return (
                                      String(record.username)
                                        .toLowerCase()
                                        .includes(value.toLowerCase()) ||
                                      String(record.fullname)
                                        .toLowerCase()
                                        .includes(value.toLowerCase())
                                    );
                                    //  ||
                                    // String(
                                    //   record.emailDeputyTechnicalDirector
                                    // )
                                    // .toLowerCase()
                                    // .includes(value.toLowerCase())
                                  },
                                },
                                {
                                  title: "Tên",
                                  dataIndex: "fullname",
                                  key: "fullname",
                                },
                                {
                                  title: "Email",
                                  dataIndex: "email",
                                  key: "email",
                                },
                                {
                                  title: "SĐT",
                                  dataIndex: "phone",
                                  key: "phone",
                                },
                                {
                                  title: "Quyền",
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
                                  key: "action",
                                  dataIndex: "action",
                                  render: (text, record) => (
                                    <>
                                      <EditOutlined
                                        className="buttonIconEdit"
                                        title="Chi tiết user"
                                        onClick={() =>
                                          handleViewFormUserOnClick(record)
                                        }
                                      />

                                      <Popconfirm
                                        title="Alarm"
                                        description="Bạn có muốn reset mật khẩu cho tài khoản này?"
                                        onConfirm={handleConfirmResetPassword}
                                        onCancel={cancel}
                                        okText="Yes"
                                        cancelText="No"
                                      >
                                        <RedoOutlined
                                          className="buttonIconReset"
                                          title="Reset mật khẩu"
                                          onClick={() =>
                                            handleResetPasswordOnClick(record)
                                          }
                                        />
                                      </Popconfirm>
                                    </>
                                  ),
                                },
                              ]}
                              dataSource={dataSource}
                              pagination={{
                                pageSize: 5,
                              }}
                              rowClassName={(record) => setRowClassName(record)}
                            ></Table>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col className="ps-12" span={6}>
                  <Row>
                    <Col span={24}>
                      {isAddUser && (
                        <Card className="bg-card-body boxShadow">
                          <Row>
                            <Col span={24} className="text-align-center m-0">
                              <Typography.Title level={5}>
                                Thêm mới User
                              </Typography.Title>
                            </Col>
                          </Row>
                          <div className="mt-5">
                            {success && (
                              <p className="flex items-center gap-1 mb-5 font-semibold text-red-500">
                                {mes}
                              </p>
                            )}
                          </div>

                          <Form
                            {...layout}
                            name="formAddUser"
                            form={formAddUser}
                            onFinish={handleAddUserSubmit}
                          >
                            <Row>
                              <Col span={24}>
                                <Row>
                                  <Col span={24}>
                                    <div className="updateItem">
                                      <Form.Item
                                        label="Tên đăng nhập"
                                        name="username"
                                        rules={[
                                          {
                                            required: true,
                                            message: "Không được để trống",
                                          },
                                          {
                                            pattern: new RegExp(
                                              /^[a-zA-Z0-9]*$/
                                            ),
                                            message:
                                              "Không nhập khoảng trắng hoặc ký tự đặc biệt",
                                          },
                                        ]}
                                      >
                                        <Input />
                                      </Form.Item>
                                    </div>
                                    <div className="updateItem">
                                      <Form.Item
                                        label="Mật khẩu"
                                        name="password"
                                        rules={[
                                          {
                                            required: true,
                                            message: "Không được để trống",
                                          },
                                          {
                                            pattern: new RegExp(
                                              /^[a-zA-Z0-9]*$/
                                            ),
                                            message:
                                              "Không nhập khoảng trắng hoặc ký tự đặc biệt",
                                          },
                                        ]}
                                      >
                                        <Input.Password />
                                      </Form.Item>
                                    </div>
                                    <div className="updateItem">
                                      <Form.Item
                                        label="Họ tên"
                                        name="fullname"
                                        rules={[
                                          {
                                            required: true,
                                            message: "Không được để trống",
                                          },
                                        ]}
                                      >
                                        <Input />
                                      </Form.Item>
                                    </div>
                                    <div className="updateItem">
                                      <Form.Item
                                        label="Email"
                                        name="email"
                                        rules={[
                                          {
                                            required: true,
                                            message: "Không được để trống",
                                          },
                                          {
                                            type: "email",
                                            message:
                                              "Không đúng định dạng E-mail!",
                                          },
                                        ]}
                                      >
                                        <Input />
                                      </Form.Item>
                                    </div>
                                    <div className="updateItem">
                                      <Form.Item
                                        label="SĐT"
                                        name="phone"
                                        rules={[
                                          {
                                            required: true,
                                            message: "Không được để trống",
                                          },
                                          {
                                            pattern: new RegExp(
                                              /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
                                            ),
                                            message: "Không đúng định dạng",
                                          },
                                        ]}
                                      >
                                        <Input />
                                      </Form.Item>
                                    </div>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>

                            <div className="bottomForm text-align-center">
                              <button className="userUpdateButton">
                                Thêm mới
                              </button>
                            </div>
                          </Form>
                        </Card>
                      )}

                      {/* detail user */}
                      {detailUser && (
                        <Card className="bg-card-body boxShadow">
                          <Row>
                            <Col span={24} className="text-align-center m-0">
                              <Typography.Title level={5}>
                                Chi tiết User
                              </Typography.Title>
                            </Col>
                          </Row>
                          <div className="mt-5">
                            {success && (
                              <p className="flex items-center gap-1 mb-5 font-semibold text-red-500">
                                {mes}
                              </p>
                            )}
                          </div>

                          <Form
                            {...layout}
                            name="formDetailUser"
                            form={formDetailUser}
                            onFinish={handleEditUserSubmit}
                            // initialValues={{
                            //   branchId: branchId,
                            // }}
                          >
                            <Row>
                              <Col span={24}>
                                <Row>
                                  <Col span={24} className="pe-50">
                                    <div className="updateItem">
                                      <Form.Item
                                        label="Họ tên"
                                        name="fullname"
                                        rules={[
                                          {
                                            required: true,
                                            message: "Không được để trống",
                                          },
                                        ]}
                                      >
                                        <Input />
                                      </Form.Item>
                                    </div>
                                    <div className="updateItem">
                                      <Form.Item
                                        label="Email"
                                        name="email"
                                        rules={[
                                          {
                                            required: true,
                                            message: "Không được để trống",
                                          },
                                          {
                                            type: "email",
                                            message:
                                              "Không đúng định dạng E-mail!",
                                          },
                                        ]}
                                      >
                                        <Input />
                                      </Form.Item>
                                    </div>
                                    <div className="updateItem">
                                      <Form.Item
                                        label="Số điện thoại"
                                        name="phone"
                                        rules={[
                                          {
                                            required: true,
                                            message: "Không được để trống",
                                          },
                                          {
                                            pattern: new RegExp(
                                              /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
                                            ),
                                            message: "Không đúng định dạng",
                                          },
                                        ]}
                                      >
                                        <Input />
                                      </Form.Item>
                                    </div>

                                    <div className="updateItem">
                                      <Form.Item
                                        label="Trạng thái"
                                        name="activate"
                                        key="activate"
                                        rules={[
                                          {
                                            required: true,
                                            message: "Chưa chọn trạng thái",
                                          },
                                        ]}
                                      >
                                        <select
                                          value={activate}
                                          onChange={(e) =>
                                            setActivate(e.target.value)
                                          }
                                        >
                                          <option value="0">
                                            Đang bị khoá
                                          </option>
                                          <option value="1">
                                            Đang hoạt động
                                          </option>
                                        </select>
                                      </Form.Item>
                                    </div>

                                    <div className="updateItem">
                                      <Form.Item
                                        label="Phân quyền"
                                        name="role"
                                        key="role"
                                        rules={[
                                          {
                                            required: true,
                                            message: "Chưa chọn quyền",
                                          },
                                        ]}
                                      >
                                        <select
                                          value={role}
                                          onChange={(e) =>
                                            setRole(e.target.value)
                                          }
                                        >
                                          <option value="2">Manager</option>
                                          <option value="5">User</option>
                                        </select>
                                      </Form.Item>
                                    </div>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>

                            <div className="bottomForm text-align-center">
                              <button className="userUpdateButton">
                                Cập nhật
                              </button>
                            </div>
                          </Form>
                        </Card>
                      )}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          {/* ) : (
            <div>
              <label>Không có dữ liệu</label>
            </div>
          )} */}
        </div>
      </div>

      {formLoading && <SpanLoading />}
    </>
  );
};

export default ManagerUser;
