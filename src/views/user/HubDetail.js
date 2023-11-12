import React, { useEffect, useState } from "react";
import SpanLoading from "../../components/loading/SpanLoading";
import {
  Card,
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
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";

const HubDetail = () => {
  const axiosPrivate = useAxiosPrivate();
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

  useEffect(() => {
    localStorage.getItem("isLogin") && getHubByUsername();
  }, []);

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
      })
      .then((res) => {
        console.log(">>>>get list hub detail", res.data);
        let result = res.data;

        form.resetFields();

        setFormLoading(false);
        toast.success("Thêm mới thành công");
      })
      .catch((err) => {
        console.log("get list hub detail error", err);
        setFormLoading(false);
        toast.success("Thêm mới thất bại");
        // navigate("/login", { state: { from: location }, replace: true });
      });
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
                  <Card>
                    <Row>
                      <Col span={24}>
                        <Row>
                          <Col span={8}>
                            <Typography.Title level={5}>
                              Thông tin Hub
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
                                    </>
                                  ),
                                },
                              ]}
                              dataSource={dataSource}
                              pagination={{
                                pageSize: 5,
                              }}
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
                        <Card>
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
                                      <label>Chọn thiết bị</label>
                                      <Form.Item
                                        name="deviceId"
                                        rules={[
                                          {
                                            required: true,
                                            message:
                                              "Please input the title of collection!",
                                          },
                                        ]}
                                      >
                                        <Select
                                          onChange={(e, value) => {
                                            console.log(
                                              ">>> check select onchange:",
                                              e
                                            );
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
                                      <label>CS định mức (KVA)</label>
                                      <Form.Item name="ratedPower">
                                        <Input />
                                      </Form.Item>
                                    </div>
                                    <div className="updateItem">
                                      <label>%Tải khi mất điện</label>
                                      <Form.Item name="loadDuringPowerOutage">
                                        <Input />
                                      </Form.Item>
                                    </div>
                                    <div className="updateItem">
                                      <label>Số bình/ Chuỗi hiện tại</label>
                                      <Form.Item name="batteryQuantity">
                                        <Input />
                                      </Form.Item>
                                    </div>
                                  </Col>
                                  <Col span={8} className="pe-50">
                                    <div className="updateItem">
                                      <label>Số chuỗi Battery hiện tại</label>
                                      <Form.Item name="batteryNumber">
                                        <Input />
                                      </Form.Item>
                                    </div>
                                    <div className="updateItem">
                                      <label>Model (dung lượng AH)</label>
                                      <Form.Item name="batteryCapacity">
                                        <Input />
                                      </Form.Item>
                                    </div>
                                    <div className="updateItem">
                                      <label>Ngày sản xuất</label>
                                      <Form.Item name="productionTime">
                                        <Input />
                                      </Form.Item>
                                    </div>
                                    <div className="updateItem">
                                      <label>Dây dẫn</label>
                                      <Form.Item name="conductorType">
                                        <Input />
                                      </Form.Item>
                                    </div>
                                    <div className="updateItem">
                                      <label>CB nguồn</label>
                                      <Form.Item name="cbPower">
                                        <Input />
                                      </Form.Item>
                                    </div>
                                  </Col>
                                  <Col span={8} className="pe-50">
                                    <div className="updateItem">
                                      <label>Cắt lọc sét</label>
                                      <Form.Item name="schneider">
                                        <Input />
                                      </Form.Item>
                                    </div>
                                    <div className="updateItem">
                                      <label>Năm lắp đặt HTĐ</label>
                                      <Form.Item name="yearInstall">
                                        <Input />
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
                                        <TextArea />
                                      </Form.Item>
                                    </div>
                                    <div className="borderItem">
                                      <label>Số ngày bảo dưỡng định kỳ</label>
                                      <Form.Item
                                        name="dateMaintenance"
                                        rules={[
                                          {
                                            required: true,
                                            message:
                                              "Please input the title of collection!",
                                          },
                                          {
                                            pattern: new RegExp(
                                              /^([1-9][0-9]*|0)$/
                                            ),
                                            message:
                                              "No Space or Special Characters Allowed",
                                          },
                                        ]}
                                      >
                                        <Input type="number" />
                                      </Form.Item>
                                    </div>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>

                            <div className="bottomForm text-align-center">
                              <button className="userUpdateButton">Thêm</button>
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
      {formLoading && <SpanLoading />}
    </>
  ) : (
    <div>
      Bạn cần <a href="/login"> đăng nhập</a>
    </div>
  );
};

export default HubDetail;
