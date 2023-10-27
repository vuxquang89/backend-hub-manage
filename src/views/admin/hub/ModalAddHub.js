import React, { useEffect, useState } from "react";
import { Form, Modal, Select } from "antd";
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
  setBranchValue,
  userId,
  setUserId,
  branchList,
}) => {
  const [code, setCode] = useState("");

  useEffect(() => {}, []);

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
          <Form className="newUserForm">
            <div className="newUserForm">
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
                }}
                options={branchList}
                value={branchValue}
              />
            </div>

            <div className="newUserForm">
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
                  setUserId(e);
                }}
                options={listUserManager}
                value={userId}
              />
            </div>
            <div className="newUserItem">
              <Input
                {...hubName_validation}
                className="inputAdd"
                onChange={(e) => handleNameHubOnChange(e)}
              />
            </div>
            <div className="newUserItem">
              <Input
                {...hubCode_validation}
                className="inputAdd"
                onChange={(e) => handleCodeHubOnChange(e)}
                value={code}
              />
            </div>
            <div className="newUserItem">
              <Input {...hubAddress_validation} className="inputAdd" />
            </div>
            <div className="newUserItem">
              <Input {...hubCity_validation} className="inputAdd" />
            </div>
            <div className="newUserItem">
              <Input {...hubManager_validation} className="inputAdd" />
            </div>

            <div className="newUserItem">
              <Input {...phone_validation} className="inputAdd" />
            </div>
          </Form>
        </FormProvider>
      </Modal>
    </>
  );
};

export default ModalAddHub;
