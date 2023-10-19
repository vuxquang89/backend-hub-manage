import React from "react";
import { Modal } from "antd";
import { FormProvider } from "react-hook-form";
import Input from "../../../components/input/Input";
import { add_deviceName_validation } from "../../../utils/inputDeviceValidations";

const ModalAddDevice = ({
  open,
  methods,
  handleOkOnClick,
  handleCancelOnClick,
  isLoading,
}) => {
  return (
    <>
      <Modal
        title="Thêm mới thiết bị"
        open={open}
        onOk={handleOkOnClick}
        confirmLoading={isLoading}
        onCancel={handleCancelOnClick}
      >
        <FormProvider {...methods}>
          <form className="newUserForm">
            <div className="newUserItem">
              <Input {...add_deviceName_validation} className="inputAdd" />
            </div>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};

export default ModalAddDevice;
