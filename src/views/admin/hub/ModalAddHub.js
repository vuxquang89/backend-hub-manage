import React, { useState } from "react";
import { Modal } from "antd";
import { FormProvider } from "react-hook-form";
import { stringToCode } from "../../../utils/stringToCode";

import Input from "../../../components/input/Input";
import {
  name_validation,
  name_branch_validation,
  email_validation,
  phone_validation,
  code_branch_validation,
  address_branch_validation,
} from "../../../utils/inputBranchValidations";

const ModalAddHub = ({
  open,
  methods,
  handleOkOnClick,
  handleCancelOnClick,
  isLoading,
}) => {
  const [code, setCode] = useState("");

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
          <form className="newUserForm">
            <div className="newUserItem">
              <Input
                {...name_branch_validation}
                className="inputAdd"
                onChange={(e) => handleNameHubOnChange(e)}
              />
            </div>
            <div className="newUserItem">
              <Input
                {...code_branch_validation}
                className="inputAdd"
                onChange={(e) => handleCodeHubOnChange(e)}
                value={code}
              />
            </div>
            <div className="newUserItem">
              <Input {...address_branch_validation} className="inputAdd" />
            </div>
            <div className="newUserItem">
              <Input {...name_validation} className="inputAdd" />
            </div>
            <div className="newUserItem">
              <Input {...email_validation} className="inputAdd" />
            </div>

            <div className="newUserItem">
              <Input {...phone_validation} className="inputAdd" />
            </div>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};

export default ModalAddHub;
