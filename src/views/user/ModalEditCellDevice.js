import React from "react";
import { Modal } from "antd";
import { FormProvider } from "react-hook-form";

const ModalEditCellDevice = ({
  open,
  methods,
  handleOkOnClick,
  handleCancelOnClick,
  isLoading,
  title,
}) => {
  return (
    <>
      <Modal
        title="Chỉnh sửa thông tin"
        open={open}
        onOk={handleOkOnClick}
        confirmLoading={isLoading}
        onCancel={handleCancelOnClick}
      >
        <FormProvider {...methods}>
          <form className="newUserForm">
            <div className="newUserItem">
              <input type="text" name="namedevice" />
            </div>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};

export default ModalEditCellDevice;
