import { Modal, Form, Row, Col, Select } from "antd";
import React from "react";

const ModalSwitchDevice = ({
  title,
  open,
  form,
  handleCancelOnClick,
  handleSubmit,
  branchList,
  branchValue,
  setBranchValue,
  handleOnChangeBranch,
  hubId,
  setHubId,
  hubList,
}) => {
  return (
    <Modal
      footer={null}
      title={title}
      open={open}
      destroyOnClose={true}
      //   onOk={form.submit}
      // confirmLoading={isLoading}
      onCancel={handleCancelOnClick}
      width={700}
    >
      <Form className="modalFormSwitch" form={form} onFinish={handleSubmit}>
        <Row>
          <Col span={24}>
            <Row>
              <Col span={10}>
                <div className="borderItem">
                  <label>Chọn Chi Nhánh</label>
                  <Form.Item>
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
                        handleOnChangeBranch(e);
                      }}
                      options={branchList}
                      value={branchValue}
                    />
                  </Form.Item>
                </div>
              </Col>
              <Col span={10}>
                <div className="borderItem">
                  <label>Chọn Hub</label>
                  <Form.Item
                    name="hubId"
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
                        setHubId(e);
                      }}
                      options={hubList}
                      value={hubId}
                    />
                  </Form.Item>
                </div>
              </Col>

              <div className="borderItem">
                <button className="buttonSave mt-20">OK</button>
              </div>
            </Row>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ModalSwitchDevice;
