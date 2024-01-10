import React from "react";

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
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const FormViewDetailHub = ({
  formHubDetail,
  hubName,
  handleSubmit,
  managerList,
  hubManagerId,
  hubManagerName,
  success,
  mes,
}) => {
  const { auth, setAuth } = useContext(AuthContext);

  const layout = {
    labelCol: {
      span: 10,
    },
    wrapperCol: {
      span: 16,
    },
  };

  return (
    <Card className="bg-card-body boxShadow">
      <Row>
        <Col span={24} className="text-align-center m-0">
          <Typography.Title level={5}>
            Thông tin chi tiết Hub - {hubName}
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
        name="formHubDetail"
        form={formHubDetail}
        onFinish={handleSubmit}
      >
        <Row>
          <Col span={24}>
            <Row>
              <Col span={24}>
                <div className="updateItem">
                  <Form.Item
                    label="Tên phòng máy"
                    name="hubName"
                    rules={
                      auth.roles[0] === "ROLE_BRANCH" && [
                        {
                          required: true,
                          message: "Không được để trống",
                        },
                      ]
                    }
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div className="updateItem">
                  <Form.Item
                    label="Địa chỉ"
                    name="hubAddress"
                    rules={
                      auth.roles[0] === "ROLE_BRANCH" && [
                        {
                          required: true,
                          message: "Không được để trống",
                        },
                      ]
                    }
                  >
                    <Input />
                  </Form.Item>
                </div>

                <div className="updateItem">
                  <Form.Item
                    label="Tỉnh/ Thành phố"
                    name="hubCity"
                    rules={
                      auth.roles[0] === "ROLE_BRANCH" && [
                        {
                          required: true,
                          message: "Không được để trống",
                        },
                      ]
                    }
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div className="updateItem">
                  <Form.Item
                    label="Quản lý PM"
                    name="hubManagerId"
                    rules={
                      auth.roles[0] === "ROLE_BRANCH" && [
                        {
                          required: true,
                          message: "Không được để trống",
                        },
                      ]
                    }
                  >
                    {auth.roles[0] === "ROLE_BRANCH" ? (
                      <Select
                        showSearch
                        style={{
                          width: 200,
                        }}
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option?.label ?? "").includes(input)
                        }
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                        }
                        onChange={(e, value) => {
                          console.log(">>> check select onchange:", e);
                        }}
                        options={managerList}
                        value={hubManagerId}
                      />
                    ) : (
                      hubManagerName
                    )}
                  </Form.Item>
                </div>
                <div className="updateItem">
                  <Form.Item label="Người phụ trách" name="departmentName">
                    <Input disabled />
                  </Form.Item>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        <div className="bottomForm text-align-center">
          {auth.roles[0] === "ROLE_BRANCH" && (
            <button className="userUpdateButton">Cập nhật</button>
          )}
        </div>
      </Form>
    </Card>
  );
};

export default FormViewDetailHub;
