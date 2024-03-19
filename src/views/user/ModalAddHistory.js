import React, { useEffect, useState } from "react";
import { Modal, Row, Col, Space, Form, Input, DatePicker } from "antd";
import { FormProvider } from "react-hook-form";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";

const ModalViewHistory = ({
  open,
  form,

  handleSubmit,
  handleCancelOnClick,
  setDatePickerHistory,
  isLoading,
  title,
}) => {
  const dateFormat = "YYYY-MM-DD";

  const onChange = (date, dateString) => {
    setDatePickerHistory(dateString);
  };

  return (
    <>
      <Modal
        title="Thêm mới bảo dưỡng, bảo trì"
        open={open}
        destroyOnClose={true}
        onOk={form.submit}
        confirmLoading={isLoading}
        onCancel={handleCancelOnClick}
        // style={{ width: "450px" }}
      >
        {/* <FormProvider {...methods}> */}
        <Form className="modalForm" form={form} onFinish={handleSubmit}>
          <Space direction="vertical">
            <div className="borderItem">
              <label>Chọn ngày</label>
              <Form.Item
                // getValueFromEvent={(onChange) =>
                //   moment(onChange).format("YYYY-MM-DD")
                // }
                // getValueProps={(i) => ({ value: moment(i) })}
                name="maintenanceTime"
                rules={[
                  {
                    required: true,
                    message: "Please input the title of collection!",
                  },
                ]}
              >
                <DatePicker
                  onChange={onChange}
                  format={dateFormat}
                  disabledDate={(current) => {
                    return (
                      //moment().add(-1, "days") >= current ||
                      moment().add(0, "days") <= current ||
                      moment().add(1, "month") <= current
                    );
                  }}
                />
              </Form.Item>
            </div>
            <div className="borderItem">
              <label>Nội dung</label>
              <Form.Item
                name="maintenanceNote"
                rules={[
                  {
                    required: true,
                    message: "Please input the title of collection!",
                  },
                ]}
              >
                <TextArea />
              </Form.Item>
            </div>
          </Space>
        </Form>
        {/* </FormProvider> */}
      </Modal>
    </>
  );
};

export default ModalViewHistory;
