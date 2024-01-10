import React, { useEffect } from "react";
import { Modal, Form, Row, Col, Select } from "antd";

const ModalSwitchManager = ({
  hubName,
  open,
  form,
  handleCancelOnClick,
  handleSubmit,
  managerId,
  managerList,
}) => {
  useEffect(() => {
    setForm();
  }, [managerId]);

  function setForm() {
    form.setFieldsValue({
      managerId: managerId,
    });
  }
  return (
    <Modal
      footer={null}
      title={hubName + " - Thay đổi quản lý phòng máy"}
      open={open}
      destroyOnClose={true}
      //   onOk={form.submit}
      // confirmLoading={isLoading}
      onCancel={handleCancelOnClick}
      //   width={700}
    >
      <Form className="modalFormSwitch" form={form} onFinish={handleSubmit}>
        <Row>
          <Col span={24}>
            <div className="borderItem">
              <Form.Item
                label="Chọn Quản Lý PM"
                name="managerId"
                key="managerId"
                rules={[
                  {
                    required: true,
                    message: "Chưa chọn quản lý phòng máy",
                  },
                ]}
              >
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
                  value={managerId}
                />
              </Form.Item>
            </div>

            <div className="text-align-center">
              <button className="buttonSave mt-20">OK</button>
            </div>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ModalSwitchManager;
