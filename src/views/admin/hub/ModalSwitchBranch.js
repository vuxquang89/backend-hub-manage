import { Col, Form, Modal, Row, Select, Item } from "antd";
import React from "react";

const ModalSwitchBranch = ({
  modalTitle,
  branchList,
  isOpen,
  handleModalSubmitOnClick,
  handleModalCancelOnClick,
  formSwitchBranch,
}) => {
  return (
    <Modal
      title={modalTitle}
      open={isOpen}
      //   onOk={handleModalOkOnClick}
      //   confirmLoading={isLoading}
      destroyOnClose={true}
      footer={null}
      onCancel={handleModalCancelOnClick}
    >
      <Form form={formSwitchBranch} onFinish={handleModalSubmitOnClick}>
        <Row>
          <Col span={24}>
            <div className="modalSwitchBranchContent">
              <Row>
                <Col span={6}>
                  <label>Chọn chi nhánh</label>
                </Col>
                <Col span={18}>
                  <Form.Item
                    name="branchId"
                    rules={[
                      {
                        required: true,
                        message: "Please input the title of collection!",
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
                        //   setBranchValue(e);
                        //   getUserManager(e);
                      }}
                      options={branchList}
                      // value={branchValue}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>

            <div className="borderModalFooter">
              <span
                className="buttonModalCancel mt-20"
                onClick={() => handleModalCancelOnClick()}
              >
                Cancel
              </span>
              <button type="submit" className="buttonSave mt-20">
                OK
              </button>
            </div>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ModalSwitchBranch;
