import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Space, Typography, Card, Row, Col } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  UserOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import "./DetailDevice.css";
import home from "../../assets/images/home.jpg";
import Input from "../../components/input/Input";
import {
  device_trademark_validation,
  device_ratedPower_validation,
} from "../../utils/inputDetailDeviceValidations";
import { FormProvider, useForm } from "react-hook-form";

function DetailDevice() {
  let navigate = useNavigate();
  const methods = useForm();
  const [success, setSuccess] = useState(false);

  const onSubmit = methods.handleSubmit((data) => {
    console.log(data);
    methods.reset();

    setSuccess(true);
  });

  return (
    <div className="container">
      <div className="main-container">
        <Row>
          <Col span={24} className="title-container">
            <Typography.Title level={3}>
              Thông tin chi tiết - UPS
            </Typography.Title>
          </Col>
        </Row>
        <Space size={20} direction="vertical" className="ps-12">
          <Space
            direction="horizontal"
            className="space-align-start main-content"
          >
            <Card>
              <Space direction="vertical">
                <Typography.Title level={5}>
                  Thông tin chi nhánh
                </Typography.Title>

                <div class="cardShowTop">
                  <img src={home} alt="" class="cardShowImg" />
                  <div class="cardShowTopTitle">
                    <span class="cardShowName">Chi nhánh 1</span>
                    <span class="cardShowTitle">cn_1</span>
                  </div>
                </div>
                <div class="cardShowBottom">
                  <div class="cardShowInfo">
                    <EnvironmentOutlined className="cardShowIcon" />
                    <span class="cardShowInfoTitle">New York | USA</span>
                  </div>
                  <span class="cardShowTitle">Thông tin PGĐ KT</span>
                  <div class="cardShowInfo">
                    <UserOutlined className="cardShowIcon" />
                    <span class="cardShowInfoTitle">Mr Oanh</span>
                  </div>
                  <div className="cardShowInfo">
                    <PhoneOutlined className="cardShowIcon" />
                    <span className="cardShowInfoTitle">+1 123 456 67</span>
                  </div>
                  <div className="cardShowInfo">
                    <MailOutlined className="cardShowIcon" />
                    <span className="cardShowInfoTitle">
                      annabeck99@gmail.com
                    </span>
                  </div>
                  <span class="cardShowTitle">Thông tin QL PM</span>
                  <div class="cardShowInfo">
                    <UserOutlined className="cardShowIcon" />
                    <span class="cardShowInfoTitle">Nguyễn Minh Luân</span>
                  </div>
                  <div className="cardShowInfo">
                    <PhoneOutlined className="cardShowIcon" />
                    <span className="cardShowInfoTitle">0901811307</span>
                  </div>
                  <span class="cardShowTitle">Nhân sự chuyên trách</span>
                  <div class="cardShowInfo">
                    <UserOutlined className="cardShowIcon" />
                    <span class="cardShowInfoTitle">Duy</span>
                  </div>
                  <div className="cardShowInfo">
                    <PhoneOutlined className="cardShowIcon" />
                    <span className="cardShowInfoTitle">0901811307</span>
                  </div>
                </div>
              </Space>
            </Card>

            <Space direction="vertical">
              <Row>
                <Col span={12}>
                  <div className="buttonContainer f-e">
                    <button className="buttonVieww">Chuyển thiết bị</button>
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
                </Col>
              </Row>
              <Card>
                <Space direction="vertical">
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
                        Form has been submitted successfully
                      </p>
                    )}
                  </div>
                  <FormProvider {...methods}>
                    <form
                      onSubmit={(e) => e.preventDefault()}
                      noValidate
                      autoComplete="off"
                    >
                      <Row>
                        <Col span={24}>
                          <Row>
                            <Col span={12} className="pe-50">
                              <div className="updateItem">
                                <Input
                                  {...device_trademark_validation}
                                  className="updateInput"
                                />
                              </div>
                              <div className="updateItem">
                                <Input
                                  {...device_ratedPower_validation}
                                  pattern="[0-9]*"
                                  className="updateInput"
                                />
                              </div>
                              <div className="updateItem">
                                <Input
                                  {...device_trademark_validation}
                                  className="updateInput"
                                />
                              </div>
                              <div className="updateItem">
                                <Input
                                  {...device_ratedPower_validation}
                                  pattern="[0-9]*"
                                  className="updateInput"
                                />
                              </div>
                              <div className="updateItem">
                                <Input
                                  {...device_trademark_validation}
                                  className="updateInput"
                                />
                              </div>
                              <div className="updateItem">
                                <Input
                                  {...device_ratedPower_validation}
                                  pattern="[0-9]*"
                                  className="updateInput"
                                />
                              </div>
                              <div className="updateItem">
                                <Input
                                  {...device_ratedPower_validation}
                                  pattern="[0-9]*"
                                  className="updateInput"
                                />
                              </div>
                            </Col>
                            <Col span={12} className="pe-50">
                              <div className="updateItem">
                                <Input
                                  {...device_trademark_validation}
                                  className="updateInput"
                                />
                              </div>
                              <div className="updateItem">
                                <Input
                                  {...device_ratedPower_validation}
                                  pattern="[0-9]*"
                                  className="updateInput"
                                />
                              </div>
                              <div className="updateItem">
                                <Input
                                  {...device_trademark_validation}
                                  className="updateInput"
                                />
                              </div>
                              <div className="updateItem">
                                <Input
                                  {...device_ratedPower_validation}
                                  pattern="[0-9]*"
                                  className="updateInput"
                                />
                              </div>
                              <div className="updateItem">
                                <Input
                                  {...device_trademark_validation}
                                  className="updateInput"
                                />
                              </div>
                              <div className="updateItem">
                                <Input
                                  {...device_ratedPower_validation}
                                  pattern="[0-9]*"
                                  className="updateInput"
                                />
                              </div>
                            </Col>
                          </Row>
                        </Col>
                      </Row>

                      <div className="bottomForm">
                        <button onClick={onSubmit} className="userUpdateButton">
                          Cập nhật
                        </button>
                      </div>
                    </form>
                  </FormProvider>
                </Space>
              </Card>
            </Space>
          </Space>
        </Space>
      </div>
    </div>
  );
}

export default DetailDevice;
