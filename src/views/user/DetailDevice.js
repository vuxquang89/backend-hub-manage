import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { Space, Typography, Card, Row, Col, Form, Input, message } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  UserOutlined,
  RollbackOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import "./DetailDevice.css";
import home from "../../assets/images/home.jpg";
import {
  device_trademark_validation,
  device_ratedPower_validation,
} from "../../utils/inputDetailDeviceValidations";
import { FormProvider, useForm } from "react-hook-form";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import SpanLoading from "../../components/loading/SpanLoading";
import TextArea from "antd/es/input/TextArea";

function DetailDevice() {
  const axiosPrivate = useAxiosPrivate();
  let { hubDetailId } = useParams();
  const [form] = Form.useForm();

  let navigate = useNavigate();
  const location = useLocation();
  const methods = useForm();
  const [success, setSuccess] = useState(false);
  const [mes, setMes] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [getData, setGetData] = useState(false);

  const [branchId, setBranchId] = useState("");
  const [branchName, setBranchName] = useState("");
  const [deputyTechnicalDirector, setDeputyTechnicalDirector] = useState("");
  const [phoneDeputyTechnicalDirector, setPhoneDeputyTechnicalDirector] =
    useState("");
  const [emailDeputyTechnicalDirector, setEmailDeputyTechnicalDirector] =
    useState("");
  const [branchAddress, setBranchAddress] = useState("");

  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");

  const [hubId, setHubId] = useState("");
  const [hubName, setHubName] = useState("");
  const [hubAddress, setHubAddress] = useState("");
  const [hubCity, setHubCity] = useState("");
  const [hubManagerName, setHubManagerName] = useState("");
  const [hubManagerPhone, setHubManagerPhone] = useState("");

  const [deviceId, setDeviceId] = useState("");
  const [deviceName, setDeviceName] = useState("");

  const [trademark, setTrademark] = useState("");
  const [ratedPower, setRatePower] = useState("");
  const [loadDuringPowerOutage, setLoadDuringPowerOutage] = useState("");
  const [batteryQuantity, setBatteryQuantity] = useState("");
  const [batteryNumber, setBatteryNumber] = useState("");
  const [batteryCapacity, setBatteryCapacity] = useState("");
  const [productionTime, setProductionTime] = useState("");
  const [conductorType, setConductorType] = useState("");
  const [cbPower, setCBPower] = useState("");
  const [schneider, setSchneider] = useState("");
  const [yearInstall, setYearInstall] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");
  const [number, setNumber] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setFormLoading(true);
    await axiosPrivate
      .get(`/api/hub/detail/${hubDetailId}`)
      .then((res) => {
        const result = res.data;
        console.log(">>>>>get hub detail result", res.data);
        if (result.status === 100) {
          const response = result.response;
          console.log(">>>>get detail", response);

          setBranchId(response.branchId);
          setBranchName(response.branchName);
          setDeputyTechnicalDirector(response.deputyTechnicalDirector);
          setPhoneDeputyTechnicalDirector(
            response.phoneDeputyTechnicalDirector
          );
          setEmailDeputyTechnicalDirector(
            response.emailDeputyTechnicalDirector
          );
          setBranchAddress(response.branchAddress);

          setFullname(response.fullname);
          setPhone(response.phone);

          setHubId(response.hubId);
          setHubName(response.hubName);
          setHubAddress(response.hubAddress);
          setHubCity(response.hubCity);
          setHubManagerName(response.hubManagerName);
          setHubManagerPhone(response.hubManagerPhone);

          setDeviceId(response.deviceId);
          setDeviceName(response.deviceName);

          setTrademark(response.trademark);
          setRatePower(response.ratedPower);
          setLoadDuringPowerOutage(response.loadDuringPowerOutage);
          setBatteryQuantity(response.batteryQuantity);
          setBatteryNumber(response.batteryNumber);
          setBatteryCapacity(response.batteryCapacity);
          setProductionTime(response.productionTime);
          setConductorType(response.conductorType);
          setCBPower(response.cbPower);
          setSchneider(response.schneider);
          setYearInstall(response.yearInstall);
          setCurrentStatus(response.currentStatus);
          setNumber(response.number);

          setGetData(true);
        } else {
          console.log(">>>> khong tim thay ", hubDetailId);
          setGetData(false);
        }

        setFormLoading(false);
      })
      .catch((err) => {
        console.log(">>>>add branch error", err);
        setFormLoading(false);
        setGetData(false);
        navigate("/login", { state: { from: location }, replace: true });
      });
  };

  const handleUpdateSubmit = async () => {
    setFormLoading(true);
    await axiosPrivate
      .put(`/api/hub/detail/${hubDetailId}`, {
        // deviceId: deviceId,
        // hubId: hubId,
        trademark,
        ratedPower,
        loadDuringPowerOutage,
        batteryQuantity,
        batteryNumber,
        batteryCapacity,
        productionTime,
        conductorType,
        cbPower,
        schneider,
        yearInstall,
        currentStatus,
        number,
      })
      .then((res) => {
        console.log(">>>>update hub detail", res.data);
        let result = res.data;
        message.success("Cập nhật thành công");
        setFormLoading(false);
      })
      .catch((err) => {
        console.log("update hub detail error", err);
        setFormLoading(false);
        message.error("Không thể cập nhật");
        // navigate("/login", { state: { from: location }, replace: true });
      });
  };

  return (
    <>
      <div className="container">
        <div className="main-container">
          <Row>
            <Col span={24} className="title-container">
              <Typography.Title level={3}>
                Thông tin chi tiết - {deviceName}
              </Typography.Title>
            </Col>
          </Row>
          {getData ? (
            <Row>
              <Col span={24}>
                <Row>
                  <Col span={8}>
                    <Card>
                      <Row>
                        <Col span={24}>
                          <Typography.Title level={5}>
                            Thông tin chi nhánh
                          </Typography.Title>
                          <Row>
                            <Col span={24}>
                              <div class="cardShowTop">
                                <img src={home} alt="" class="cardShowImg" />
                                <div class="cardShowTopTitle">
                                  <span class="cardShowName">{branchName}</span>
                                  <span class="cardShowTitle">{branchId}</span>
                                </div>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col span={24}>
                              <div class="cardShowBottom">
                                <EnvironmentOutlined className="cardShowIcon" />
                                <span class="cardShowInfoTitle">
                                  {branchAddress}
                                </span>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col span={12}>
                              <div class="cardShowBottom">
                                <span class="cardShowTitle">
                                  Thông tin PGĐ KT
                                </span>
                                <div class="cardShowInfo">
                                  <UserOutlined className="cardShowIcon" />
                                  <span class="cardShowInfoTitle">
                                    {deputyTechnicalDirector}
                                  </span>
                                </div>
                                <div className="cardShowInfo">
                                  <PhoneOutlined className="cardShowIcon" />
                                  <span className="cardShowInfoTitle">
                                    {phoneDeputyTechnicalDirector}
                                  </span>
                                </div>
                                <div className="cardShowInfo">
                                  <MailOutlined className="cardShowIcon" />
                                  <span className="cardShowInfoTitle">
                                    {emailDeputyTechnicalDirector}
                                  </span>
                                </div>

                                <span class="cardShowTitle">
                                  Nhân sự chuyên trách
                                </span>
                                <div class="cardShowInfo">
                                  <UserOutlined className="cardShowIcon" />
                                  <span class="cardShowInfoTitle">
                                    {fullname}
                                  </span>
                                </div>
                                <div className="cardShowInfo">
                                  <PhoneOutlined className="cardShowIcon" />
                                  <span className="cardShowInfoTitle">
                                    {phone}
                                  </span>
                                </div>
                              </div>
                            </Col>
                            <Col span={12}>
                              <div class="cardShowBottom">
                                <span class="cardShowTitle">
                                  Thông tin phòng máy
                                </span>
                                <div class="cardShowInfo">
                                  <HomeOutlined className="cardShowIcon" />
                                  <span class="cardShowInfoTitle">
                                    {hubName}
                                  </span>
                                </div>
                                <div class="cardShowInfo">
                                  <EnvironmentOutlined className="cardShowIcon" />
                                  <span class="cardShowInfoTitle">
                                    {hubAddress} - {hubCity}
                                  </span>
                                </div>

                                <div class="cardShowInfo">
                                  <UserOutlined className="cardShowIcon" />
                                  <span class="cardShowInfoTitle">
                                    {hubManagerName}
                                  </span>
                                </div>
                                <div className="cardShowInfo">
                                  <PhoneOutlined className="cardShowIcon" />
                                  <span className="cardShowInfoTitle">
                                    {hubManagerPhone}
                                  </span>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Space direction="vertical"></Space>
                    </Card>
                  </Col>
                  <Col className="ps-12" span={16}>
                    <Row>
                      <Col className="mb-10" span={24}>
                        <Space direction="vertical">
                          <div className="buttonContainer f-e">
                            <button className="buttonSwitch">
                              Chuyển thiết bị
                            </button>
                            <button
                              title="Xem lịch sử bảo dưỡng"
                              className="buttonView"
                            >
                              Lịch sử bảo dưỡng
                            </button>

                            <RollbackOutlined
                              onClick={() => navigate(-1)}
                              className="buttonRollBack"
                              title="Quay lại"
                            />
                          </div>
                        </Space>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <Card>
                          <Row>
                            <Col span={12}>
                              <Typography.Title level={5}>
                                Thông tin thiết bị
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
                          {/* <FormProvider {...methods}> */}
                          <Form
                            name="formHubDetail"
                            form={form}
                            onFinish={handleUpdateSubmit}
                          >
                            <Row>
                              <Col span={24}>
                                <Row>
                                  <Col span={8} className="pe-50">
                                    <div className="updateItem">
                                      <label>Thương hiệu</label>
                                      <Form.Item name="trademark">
                                        <Input
                                          defaultValue={trademark}
                                          onChange={(e) => {
                                            setTrademark(e.target.value);
                                          }}
                                        />
                                      </Form.Item>
                                    </div>
                                    <div className="updateItem">
                                      <label>CS định mức (KVA)</label>
                                      <Form.Item name="ratedPower">
                                        <Input
                                          defaultValue={ratedPower}
                                          onChange={(e) => {
                                            setRatePower(e.target.value);
                                          }}
                                        />
                                      </Form.Item>
                                    </div>
                                    <div className="updateItem">
                                      <label>%Tải khi mất điện</label>
                                      <Form.Item name="loadDuringPowerOutage">
                                        <Input
                                          defaultValue={loadDuringPowerOutage}
                                          onChange={(e) => {
                                            setLoadDuringPowerOutage(
                                              e.target.value
                                            );
                                          }}
                                        />
                                      </Form.Item>
                                    </div>
                                    <div className="updateItem">
                                      <label>Số bình/ Chuỗi hiện tại</label>
                                      <Form.Item name="batteryQuantity">
                                        <Input
                                          defaultValue={batteryQuantity}
                                          onChange={(e) => {
                                            setBatteryQuantity(e.target.value);
                                          }}
                                        />
                                      </Form.Item>
                                    </div>
                                  </Col>
                                  <Col span={8} className="pe-50">
                                    <div className="updateItem">
                                      <label>Số chuỗi Battery hiện tại</label>
                                      <Form.Item name="batteryNumber">
                                        <Input
                                          defaultValue={batteryNumber}
                                          onChange={(e) => {
                                            setBatteryNumber(e.target.value);
                                          }}
                                        />
                                      </Form.Item>
                                    </div>
                                    <div className="updateItem">
                                      <label>Model (dung lượng AH)</label>
                                      <Form.Item name="batteryCapacity">
                                        <Input
                                          defaultValue={batteryCapacity}
                                          onChange={(e) => {
                                            setBatteryCapacity(e.target.value);
                                          }}
                                        />
                                      </Form.Item>
                                    </div>
                                    <div className="updateItem">
                                      <label>Ngày sản xuất</label>
                                      <Form.Item name="productionTime">
                                        <Input
                                          defaultValue={productionTime}
                                          onChange={(e) => {
                                            setProductionTime(e.target.value);
                                          }}
                                        />
                                      </Form.Item>
                                    </div>
                                    <div className="updateItem">
                                      <label>Dây dẫn</label>
                                      <Form.Item name="conductorType">
                                        <Input
                                          defaultValue={conductorType}
                                          onChange={(e) => {
                                            setConductorType(e.target.value);
                                          }}
                                        />
                                      </Form.Item>
                                    </div>
                                    <div className="updateItem">
                                      <label>CB nguồn</label>
                                      <Form.Item name="cbPower">
                                        <Input
                                          defaultValue={cbPower}
                                          onChange={(e) => {
                                            setCBPower(e.target.value);
                                          }}
                                        />
                                      </Form.Item>
                                    </div>
                                  </Col>
                                  <Col span={8} className="pe-50">
                                    <div className="updateItem">
                                      <label>Cắt lọc sét</label>
                                      <Form.Item name="schneider">
                                        <Input
                                          defaultValue={schneider}
                                          onChange={(e) => {
                                            setSchneider(e.target.value);
                                          }}
                                        />
                                      </Form.Item>
                                    </div>
                                    <div className="updateItem">
                                      <label>Năm lắp đặt HTĐ</label>
                                      <Form.Item name="yearInstall">
                                        <Input
                                          defaultValue={yearInstall}
                                          onChange={(e) => {
                                            setYearInstall(e.target.value);
                                          }}
                                        />
                                      </Form.Item>
                                    </div>
                                    <div className="updateItem">
                                      <label>Hiện trạng</label>
                                      <Form.Item name="currentStatus">
                                        <Input
                                          defaultValue={currentStatus}
                                          onChange={(e) => {
                                            setCurrentStatus(e.target.value);
                                          }}
                                        />
                                      </Form.Item>
                                    </div>
                                    <div className="updateItem">
                                      <label>Số lượng</label>
                                      <Form.Item name="number">
                                        <TextArea
                                          defaultValue={number}
                                          onChange={(e) => {
                                            setNumber(e.target.value);
                                          }}
                                        />
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
                          {/* </FormProvider> */}
                        </Card>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          ) : (
            <div>
              <label>Không có dữ liệu</label>
            </div>
          )}
        </div>
      </div>
      {formLoading && <SpanLoading />}
    </>
  );
}

export default DetailDevice;
