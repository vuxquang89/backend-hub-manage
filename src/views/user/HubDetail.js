import React, { useEffect, useState } from "react";
import SpanLoading from "../../components/loading/SpanLoading";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Typography,
} from "antd";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {
  DeleteOutlined,
  EyeOutlined,
  UserSwitchOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthProvider";
import { useContext } from "react";
import ModalSwitchManager from "./ModalSwitchManager";

const HubDetail = ({
  stompClient,
  sendPrivateValue,
  actionStatus,
  receive,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const { auth, setAuth } = useContext(AuthContext);
  let navigate = useNavigate();
  const location = useLocation();
  const [getData, setGetData] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [hubId, setHubId] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [hubName, setHubName] = useState("");
  const { TextArea } = Input;
  const [formLoading, setFormLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isAddDevice, setIsAddDevice] = useState(false);
  const [mes, setMes] = useState("");
  const [form] = Form.useForm();
  const [searchedText, setSearchText] = useState("");

  //---------------------------------------
  const [checked, setChecked] = useState(true);
  const [disabled, setDisabled] = useState(false);

  //-------------------switch manager ---------
  const [formSwitchManager] = Form.useForm();
  const [isOpenModalSwitchManager, setIsOpenModalSwitchManager] =
    useState(false);
  const [managerId, setManagerId] = useState("");
  const [listUserManager, setListUserManager] = useState([]);

  useEffect(() => {
    localStorage.getItem("isLogin") && getHubByUsername();
    getUserManager();
  }, []);

  useEffect(() => {
    switch (actionStatus.action) {
      case "SWITCH_DEVICE":
      case "ADD_MAINTENANCE":
      case "DELETE_DEVICE":
        pushActionMessage("GET_ALARM", "Get alarm");

        break;
      case "ADD_DEVICE":
        break;

      default:
        break;
    }
  }, [actionStatus]);

  const label = `Đặt lịch bảo dưỡng`;

  const handleCheckBoxOnChange = (e) => {
    console.log("checked = ", e.target.checked);
    form.resetFields();
    setChecked(e.target.checked);
  };

  const pushActionMessage = (action, message) => {
    let senderName = auth?.username;
    if (senderName === undefined) {
      senderName = localStorage.getItem("username");
    }
    var sendMessage = {
      senderName: senderName,
      receiverName: senderName,
      message: message,
      status: "MESSAGE",
      action: action,
    };
    sendPrivateValue(stompClient, sendMessage);
  };

  const sendActionMessage = (receiverName, action, message, content) => {
    let senderName = auth?.username;
    if (senderName === undefined) {
      senderName = localStorage.getItem("username");
    }
    var sendMessage = {
      senderName: senderName,
      receiverName: receiverName,
      message: message,
      content: content,
      status: "MESSAGE",
      action: action,
    };
    sendPrivateValue(stompClient, sendMessage);
  };

  const listItemDevice = [
    {
      label: "UPS",
      value: "1",
    },
    {
      label: "Battery_UPS",
      value: "2",
    },
    {
      label: "Máy phát điện",
      value: "3",
    },
    {
      label: "Tủ điện",
      value: "4",
    },
    {
      label: "Máy lạnh",
      value: "5",
    },
  ];

  const getHubByUsername = async () => {
    setIsLoading(true);
    await axiosPrivate
      .get("/api/hub/manager")
      .then((res) => {
        console.log(">>>>get list hub username", res.data);
        setDataSource(res.data);

        setIsLoading(false);
      })
      .catch((err) => {
        console.log("get list hub username error", err);
        setIsLoading(false);
        // navigate("/login", { state: { from: location }, replace: true });
      });
  };

  const handleViewFormHubOnClick = (record) => {
    setHubName(record.hubName);
    setHubId(record.hubId);
    setIsAddDevice(true);
  };

  const handleSubmit = (values) => {
    addNewDeviceHubDetail(values);
  };

  const addNewDeviceHubDetail = async (record) => {
    setFormLoading(true);
    await axiosPrivate
      .post("/api/hub/detail", {
        deviceId: deviceId,
        hubId: hubId,
        trademark: record.trademark,
        ratedPower: record.ratedPower,
        loadDuringPowerOutage: record.loadDuringPowerOutage,
        batteryQuantity: record.batteryQuantity,
        batteryNumber: record.batteryNumber,
        batteryCapacity: record.batteryCapacity,
        productionTime: record.productionTime,
        conductorType: record.conductorType,
        cbPower: record.cbPower,
        schneider: record.schneider,
        yearInstall: record.yearInstall,
        currentStatus: record.currentStatus,
        number: record.number,
        dateMaintenance: record.dateMaintenance,
        orderMaintenance: checked,
      })
      .then((res) => {
        console.log(">>>>result ", res.data);
        let result = res.data;

        form.resetFields();

        setFormLoading(false);
        sendActionMessage(
          hubId,
          "ADD_DEVICE",
          "Thêm mới thiết bị hub",
          result.hubDetailId
        );
        toast.success("Thêm mới thành công");
      })
      .catch((err) => {
        console.log("get list hub detail error", err);
        setFormLoading(false);
        toast.error("Thêm mới thất bại");
        // navigate("/login", { state: { from: location }, replace: true });
      });
  };

  const setRowClassName = (record) => {
    return record.hubId === hubId ? "clickRowStyle" : "";
    // console.log(">>>>>>>set rơ class name", record);
  };

  /**
   * switch manager
   */

  /**
   * get list manager
   */
  const getUserManager = async () => {
    setFormLoading(true);
    // methods.reset();
    await axiosPrivate
      .get(`/api/leader/users/manager`)
      .then((res) => {
        console.log(">>>>get list user manager", res.data);
        setListUserManager(res.data);
        setFormLoading(false);
      })
      .catch((err) => {
        console.log("get list user manager error", err);
        setFormLoading(false);
        navigate("/login", { state: { from: location }, replace: true });
      });
  };

  const handleViewModalSelectManager = (record) => {
    setIsOpenModalSwitchManager(true);
    setIsAddDevice(false);
    setHubName(record.hubName);
    setHubId(record.hubId);
    setManagerId(record.managerResponse.id);
  };

  const handleCloseModalSwitchManager = () => {
    setIsOpenModalSwitchManager(false);
    setHubName("");
    setHubId("");
    setManagerId("");
  };

  const handleSubmitModalSwitchManager = async (formValues) => {
    await axiosPrivate
      .post("/api/leader/hub/switch/manager", {
        hubId: hubId,
        staffManagerId: formValues.managerId,
      })
      .then((res) => {
        console.log(">>>>> switch hub to MANAGER", res.data);
        let result = res.data;
        if (result.status === 100) {
          updateHubDataSource(result.hubResponse, hubId);
          toast.success("Chuyển thành công");
          // formSwitchBranch.resetFields();
        } else {
          toast.warning("Không thể chuyển");
        }

        setIsOpenModalSwitchManager(false);
        setFormLoading(false);
      })
      .catch((err) => {
        console.log(">>>>> add new hub error", err);
        toast.error("Lỗi. Không thể chuyển");
        setFormLoading(false);
      });
  };

  /**
   * update hub data
   * @param {*} res
   * @param {*} hubId
   */
  const updateHubDataSource = async (res, hubId) => {
    // let dateMaintenance = res.dateMaintenance;

    const updateHub = dataSource.map((hub) => {
      if (hub.hubId === hubId) {
        return {
          ...hub,
          hubManagerName: res.hubManagerName,
          hubManagerPhone: res.hubManagerPhone,
          hubCity: res.hubCity,
          hubAddress: res.hubAddress,
          hubName: res.hubName,
        };
      } else {
        return hub;
      }
    });
    setDataSource(updateHub);
  };

  return localStorage.getItem("isLogin") ? (
    <>
      <div className="container">
        <div className="main-container-hub-detail">
          <Row>
            <Col span={24} className="title-container">
              <Typography.Title level={3}>Quản lý Hub</Typography.Title>
            </Col>
          </Row>
          {/* {getData ? ( */}
          <Row>
            <Col span={24}>
              <Row>
                <Col span={12}>
                  <Card className="boxShadow">
                    <Row>
                      <Col span={24}>
                        <Row className="align-item-center mb-10">
                          <Col span={8}>
                            <Typography.Title level={5} className="m-0 ">
                              Danh sách Hub
                            </Typography.Title>
                          </Col>
                          <Col span={8}>
                            <Input
                              placeholder="Mã / Tên phòng máy ..."
                              onSearch={(value) => {
                                setSearchText(value);
                              }}
                              onChange={(e) => {
                                console.log(
                                  ">>>>>>search text",
                                  e.target.value
                                );
                                setSearchText(e.target.value);
                              }}
                              prefix={<SearchOutlined />}
                            />
                          </Col>
                        </Row>

                        <Row>
                          <Col span={24}>
                            <Table
                              loading={isLoading}
                              columns={[
                                {
                                  title: "Id",
                                  key: "hubId",
                                  dataIndex: "hubId",
                                  hidden: true,
                                },
                                {
                                  title: "Phòng máy",
                                  dataIndex: "hubName",
                                  key: "hubName",
                                  filteredValue: [searchedText],
                                  onFilter: (value, record) => {
                                    return (
                                      String(record.hubName)
                                        .toLowerCase()
                                        .includes(value.toLowerCase()) ||
                                      String(record.hubId)
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
                                  title: "Địa chỉ",
                                  dataIndex: "hubAddress",
                                  key: "hubAddress",
                                },
                                {
                                  title: "Tỉnh/Thành phố",
                                  dataIndex: "hubCity",
                                  key: "hubCity",
                                },
                                {
                                  title: "Quản lý PM",
                                  dataIndex: "hubManagerName",
                                  key: "hubManagerName",
                                },
                                {
                                  title: "SĐT quản lý PM",
                                  dataIndex: "hubManagerPhone",
                                  key: "hubManagerPhone",
                                },
                                {
                                  title: "Action",
                                  key: "action",
                                  dataIndex: "action",
                                  render: (text, record) => (
                                    <>
                                      <PlusOutlined
                                        className="btnUserDelete"
                                        onClick={() =>
                                          handleViewFormHubOnClick(record)
                                        }
                                        title="Thêm thiết bị cho phòng hub"
                                      />

                                      <UserSwitchOutlined
                                        className="buttonIconChangeManager"
                                        onClick={() => {
                                          handleViewModalSelectManager(record);
                                        }}
                                        title="Thay đổi quản lý phòng máy"
                                      />
                                    </>
                                  ),
                                },
                              ]}
                              dataSource={dataSource}
                              pagination={{
                                pageSize: 5,
                              }}
                              rowClassName={(record) => setRowClassName(record)}
                              // onRow={(record, index) => {
                              //   return {
                              //     onClick: (event) => {
                              //       console.log(record);
                              //       console.log(">>>>table index", index);
                              //     },
                              //   };
                              // }}
                              // onRow={(record, index) =>

                              //     {
                              //     style: {
                              //         background: record === 'something' ? 'red' : 'default',
                              //     }
                              //   }
                              // }
                            ></Table>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col className="ps-12" span={12}>
                  <Row>
                    <Col span={24}>
                      {isAddDevice && (
                        <Card className="bg-card-body boxShadow">
                          <Row>
                            <Col span={24}>
                              <Typography.Title level={5}>
                                Thêm mới thiết bị cho hub - {hubName}
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
                            name="formDeviceHub"
                            form={form}
                            onFinish={handleSubmit}
                          >
                            <Row>
                              <Col span={24}>
                                <Row>
                                  <Col span={8} className="pe-50">
                                    <div className="updateItem">
                                      <label>
                                        Chọn thiết bị{" "}
                                        <span className="tick">*</span>
                                      </label>
                                      <Form.Item
                                        name="deviceId"
                                        key="deviceId"
                                        rules={[
                                          {
                                            required: true,
                                            message: "Chưa chọn thiết bị",
                                          },
                                        ]}
                                      >
                                        <Select
                                          // value={deviceId}
                                          onChange={(e, value) => {
                                            console.log(
                                              ">>> check select onchange:",
                                              e
                                            );
                                            if (e !== deviceId) {
                                              form.resetFields();
                                              form.setFieldsValue({
                                                deviceId: e,
                                              });
                                            }
                                            if (e === "1" || e === "2") {
                                              setDisabled(true);
                                              setChecked(true);
                                            } else {
                                              setDisabled(false);
                                            }
                                            setDeviceId(value.value);
                                          }}
                                          options={listItemDevice}
                                        />
                                      </Form.Item>
                                    </div>
                                    <div className="updateItem">
                                      <label>Thương hiệu</label>
                                      <Form.Item name="trademark">
                                        <Input />
                                      </Form.Item>
                                    </div>
                                    <div className="updateItem">
                                      <label>
                                        CS định mức (KVA){" "}
                                        <span
                                          hidden={
                                            (deviceId === "1" ||
                                              deviceId === "3") &&
                                            checked
                                              ? false
                                              : true
                                          }
                                          className="tick"
                                        >
                                          *
                                        </span>
                                      </label>
                                      <Form.Item
                                        name="ratedPower"
                                        rules={
                                          (deviceId === "1" ||
                                            deviceId === "3") &&
                                          checked && [
                                            {
                                              required: true,
                                              message: "Không được để trống",
                                            },
                                          ]
                                        }
                                      >
                                        <Input
                                          disabled={
                                            deviceId === "1" || deviceId === "3"
                                              ? false
                                              : true
                                          }
                                        />
                                      </Form.Item>
                                    </div>
                                    <div className="updateItem">
                                      <label>
                                        %Tải khi mất điện{" "}
                                        <span
                                          hidden={
                                            (deviceId === "1" ||
                                              deviceId === "3") &&
                                            checked
                                              ? false
                                              : true
                                          }
                                          className="tick"
                                        >
                                          *
                                        </span>
                                      </label>
                                      <Form.Item
                                        name="loadDuringPowerOutage"
                                        rules={
                                          (deviceId === "1" ||
                                            deviceId === "3") &&
                                          checked && [
                                            {
                                              required: true,
                                              message: "Không được để trống",
                                            },
                                          ]
                                        }
                                      >
                                        <Input
                                          disabled={
                                            deviceId === "1" || deviceId === "3"
                                              ? false
                                              : true
                                          }
                                        />
                                      </Form.Item>
                                    </div>
                                    <div className="updateItem">
                                      <label>
                                        Số bình/ Chuỗi hiện tại{" "}
                                        <span
                                          hidden={
                                            deviceId === "1" && checked
                                              ? false
                                              : true
                                          }
                                          className="tick"
                                        >
                                          *
                                        </span>
                                      </label>
                                      <Form.Item
                                        name="batteryQuantity"
                                        rules={
                                          deviceId === "1" &&
                                          checked && [
                                            {
                                              required: true,
                                              message: "Không được để trống",
                                            },
                                          ]
                                        }
                                      >
                                        <Input
                                          disabled={
                                            deviceId === "1" ? false : true
                                          }
                                        />
                                      </Form.Item>
                                    </div>
                                  </Col>
                                  <Col span={8} className="pe-50">
                                    <div className="updateItem">
                                      <label>
                                        Số chuỗi Battery hiện tại{" "}
                                        <span
                                          hidden={
                                            deviceId === "1" && checked
                                              ? false
                                              : true
                                          }
                                          className="tick"
                                        >
                                          *
                                        </span>
                                      </label>
                                      <Form.Item
                                        name="batteryNumber"
                                        rules={
                                          deviceId === "1" &&
                                          checked && [
                                            {
                                              required: true,
                                              message: "Không được để trống",
                                            },
                                          ]
                                        }
                                      >
                                        <Input
                                          disabled={
                                            deviceId === "1" ? false : true
                                          }
                                        />
                                      </Form.Item>
                                    </div>
                                    <div className="updateItem">
                                      <label>
                                        Model (dung lượng AH){" "}
                                        <span
                                          hidden={
                                            (deviceId === "2") & checked
                                              ? false
                                              : true
                                          }
                                          className="tick"
                                        >
                                          *
                                        </span>
                                      </label>
                                      <Form.Item
                                        name="batteryCapacity"
                                        rules={
                                          (deviceId === "2") & checked && [
                                            {
                                              required: true,
                                              message: "Không được để trống",
                                            },
                                          ]
                                        }
                                      >
                                        <Input disabled={deviceId !== "2"} />
                                      </Form.Item>
                                    </div>
                                    <div className="updateItem">
                                      <label>
                                        Ngày sản xuất{" "}
                                        <span
                                          hidden={
                                            deviceId === "2" && checked
                                              ? false
                                              : true
                                          }
                                          className="tick"
                                        >
                                          *
                                        </span>
                                      </label>
                                      <Form.Item
                                        name="productionTime"
                                        rules={
                                          deviceId === "2" &&
                                          checked && [
                                            {
                                              required: true,
                                              message: "Không được để trống",
                                            },
                                          ]
                                        }
                                      >
                                        <Input disabled={deviceId !== "2"} />
                                      </Form.Item>
                                    </div>
                                    <div className="updateItem">
                                      <label>Dây dẫn</label>
                                      <Form.Item name="conductorType">
                                        <Input disabled={deviceId !== "4"} />
                                      </Form.Item>
                                    </div>
                                    <div className="updateItem">
                                      <label>CB nguồn</label>
                                      <Form.Item name="cbPower">
                                        <Input disabled={deviceId !== "4"} />
                                      </Form.Item>
                                    </div>
                                  </Col>
                                  <Col span={8} className="pe-50">
                                    <div className="updateItem">
                                      <label>Cắt lọc sét</label>
                                      <Form.Item name="schneider">
                                        <Input disabled={deviceId !== "4"} />
                                      </Form.Item>
                                    </div>
                                    <div className="updateItem">
                                      <label>Năm lắp đặt HTĐ</label>
                                      <Form.Item name="yearInstall">
                                        <Input disabled={deviceId !== "4"} />
                                      </Form.Item>
                                    </div>
                                    <div className="updateItem">
                                      <label>Hiện trạng</label>
                                      <Form.Item name="currentStatus">
                                        <Input />
                                      </Form.Item>
                                    </div>
                                    <div className="updateItem">
                                      <label>Số lượng</label>
                                      <Form.Item name="number">
                                        <TextArea disabled={deviceId !== "5"} />
                                      </Form.Item>
                                    </div>
                                    <div className="updateItem">
                                      <Form.Item name="orderMaintenance">
                                        <Checkbox
                                          checked={checked}
                                          disabled={disabled}
                                          onChange={handleCheckBoxOnChange}
                                        >
                                          {label}
                                        </Checkbox>
                                      </Form.Item>
                                    </div>
                                    <div className="borderItem">
                                      <label>
                                        Số ngày BD định kỳ{" "}
                                        <span
                                          hidden={!checked}
                                          className="tick"
                                        >
                                          *
                                        </span>
                                      </label>
                                      <Form.Item
                                        name="dateMaintenance"
                                        rules={
                                          checked && [
                                            {
                                              required: true,
                                              message: "Không được để trống",
                                            },
                                            {
                                              pattern: new RegExp(
                                                /^([1-9][0-9]*|0)$/
                                              ),
                                              message:
                                                "Chỉ được nhập số nguyên dương",
                                            },
                                          ]
                                        }
                                      >
                                        <Input
                                          type="number"
                                          disabled={!checked}
                                        />
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
      {/* <ModalMaintenanceHistory
      open={openHistory}
      cancelOnClick={cancelOnClick}
      dataHistory={dataHistory}
    /> */}
      {/* <ModalSwitchDevice
      open={openModalSwitch}
      handleCancelOnClick={handleCancelOnClick}
      branchList={branchList}
      branchValue={branchId}
      setBranchValue={setBranchId}
      handleOnChangeBranch={handleOnChangeBranch}
      hubList={hubList}
      hubId={hubId}
      setHubId={setHubId}
      handleSubmit={handleSwitchSubmit}
      title="Chuyển thiết bị đến Hub khác"
    /> */}
      <ModalSwitchManager
        form={formSwitchManager}
        hubName={hubName}
        open={isOpenModalSwitchManager}
        managerId={managerId}
        managerList={listUserManager}
        handleCancelOnClick={handleCloseModalSwitchManager}
        handleSubmit={handleSubmitModalSwitchManager}
      />
      {formLoading && <SpanLoading />}
    </>
  ) : (
    <div>
      Bạn cần <a href="/login"> đăng nhập</a>
    </div>
  );
};

export default HubDetail;
