import React, { useEffect, useState } from "react";
import { Col, Form, Modal, Row, Select } from "antd";
import { FormProvider } from "react-hook-form";
import { stringToCode } from "../../../utils/stringToCode";

import Input from "../../../components/input/Input";
import {
  hubName_validation,
  hubAddress_validation,
  hubManager_validation,
  phone_validation,
  hubCode_validation,
  hubCity_validation,
} from "../../../utils/inputHubValidations";

const ModalAddHub = ({
  open,
  methods,
  handleOkOnClick,
  handleCancelOnClick,
  isLoading,
  branchValue,
  listUserManager,
  listUserDepartment,
  getUserManager,
  setBranchValue,
  staffDepartmentId,
  setStaffDepartmentId,
  staffManagerId,
  setStaffManagerId,
  branchList,
}) => {
  const [code, setCode] = useState("");

  useEffect(() => {
    branchValue && getUserManager(branchValue);
  }, []);

  const handleNameHubOnChange = (e) => {
    setCode(stringToCode(e.target.value));
  };

  const handleCodeHubOnChange = (e) => {
    setCode(e.target.value);
  };

  return (
    <>
      <Modal
        title="Thêm mới Hub"
        open={open}
        onOk={handleOkOnClick}
        confirmLoading={isLoading}
        onCancel={handleCancelOnClick}
      >
        <FormProvider {...methods}>
          <Form>
            <Row>
              <Col span={24}>
                <Row>
                  <Col span={12}>
                    <div className="addBranchItem">
                      <label>Chọn chi nhánh</label>
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
                          setBranchValue(e);
                          getUserManager(e);
                        }}
                        options={branchList}
                        value={branchValue}
                      />
                    </div>

                    <div className="addBranchItem">
                      <label>Chọn QL phòng máy</label>
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
                          setStaffManagerId(e);
                        }}
                        options={listUserManager}
                        value={staffManagerId}
                      />
                    </div>

                    <div className="addBranchItem">
                      <label>Chọn người phụ trách</label>
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
                          setStaffDepartmentId(e);
                        }}
                        options={listUserDepartment}
                        value={staffDepartmentId}
                      />
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="addHubItem">
                      <Input
                        {...hubName_validation}
                        className="inputAdd"
                        onChange={(e) => handleNameHubOnChange(e)}
                      />
                    </div>
                    <div className="addHubItem">
                      <Input
                        {...hubCode_validation}
                        className="inputAdd"
                        onChange={(e) => handleCodeHubOnChange(e)}
                        value={code}
                      />
                    </div>
                    <div className="addHubItem">
                      <Input {...hubAddress_validation} className="inputAdd" />
                    </div>
                    <div className="addHubItem">
                      <Input {...hubCity_validation} className="inputAdd" />
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </FormProvider>
      </Modal>
    </>
  );
};

export default ModalAddHub;
