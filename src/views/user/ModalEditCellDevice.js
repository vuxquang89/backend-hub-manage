import React, { useEffect, useState } from "react";
import { Modal, Row, Col, Space, Form, Input, Checkbox } from "antd";
import { FormProvider } from "react-hook-form";

const ModalEditCellDevice = ({
  open,
  form,
  deviceType,
  handleSubmit,
  handleCancelOnClick,
  isLoading,
  title,
}) => {
  //---------------------------------------
  const [checked, setChecked] = useState(true);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (deviceType === 1 || deviceType === 2) {
      setChecked(true);
    }
  }, [deviceType]);

  const handleCheckBoxOnChange = (e) => {
    console.log("checked = ", e.target.checked);
    form.resetFields();
    setChecked(e.target.checked);
  };

  return (
    <>
      <Modal
        title={title}
        open={open}
        destroyOnClose={true}
        // onOk={form.submit}
        confirmLoading={isLoading}
        onCancel={handleCancelOnClick}
        footer={null}

        // style={{ width: "450px" }}
      >
        {/* <FormProvider {...methods}> */}
        <Form className="modalForm" form={form} onFinish={handleSubmit}>
          <Space>
            <Row>
              <Col span={12}>
                <div className="borderItem">
                  <label>Thương hiệu</label>

                  <Form.Item name="trademark">
                    <Input />
                  </Form.Item>
                </div>
                <div className="borderItem">
                  <label>
                    CS đinh mức(KVA){" "}
                    <span
                      hidden={
                        (deviceType === 1 || deviceType === 3) && checked
                          ? false
                          : true
                      }
                      className="tick"
                    >
                      *
                    </span>
                  </label>

                  <Form.Item
                    name="ratedPower"
                    rules={
                      (deviceType === 1 || deviceType === 3) &&
                      checked && [
                        {
                          required: true,
                          message: "Không được để trống",
                        },
                      ]
                    }
                  >
                    <Input
                      disabled={
                        deviceType === 1 || deviceType === 3 ? false : true
                      }
                    />
                  </Form.Item>
                </div>
                <div className="borderItem">
                  <label>
                    %Tải khi mất điện{" "}
                    <span
                      hidden={
                        (deviceType === 1 || deviceType === 3) && checked
                          ? false
                          : true
                      }
                      className="tick"
                    >
                      *
                    </span>
                  </label>
                  <Form.Item
                    name="loadDuringPowerOutage"
                    rules={
                      (deviceType === 1 || deviceType === 3) &&
                      checked && [
                        {
                          required: true,
                          message: "Không được để trống",
                        },
                      ]
                    }
                  >
                    <Input
                      disabled={
                        deviceType === 1 || deviceType === 3 ? false : true
                      }
                    />
                  </Form.Item>
                </div>
                <div className="borderItem">
                  <label>
                    Số bình hiện tại{" "}
                    <span
                      hidden={deviceType === 1 && checked ? false : true}
                      className="tick"
                    >
                      *
                    </span>
                  </label>
                  <Form.Item
                    name="batteryQuantity"
                    rules={
                      deviceType === 1 &&
                      checked && [
                        {
                          required: true,
                          message: "Không được để trống",
                        },
                      ]
                    }
                  >
                    <Input disabled={deviceType !== 1} />
                  </Form.Item>
                </div>
                <div className="borderItem">
                  <label>
                    Số chuỗi Battery hiện tại{" "}
                    <span
                      hidden={deviceType === 1 && checked ? false : true}
                      className="tick"
                    >
                      *
                    </span>
                  </label>
                  <Form.Item
                    name="batteryNumber"
                    rules={
                      deviceType === 1 &&
                      checked && [
                        {
                          required: true,
                          message: "Không được để trống",
                        },
                      ]
                    }
                  >
                    <Input disabled={deviceType !== 1} />
                  </Form.Item>
                </div>
                <div className="borderItem">
                  <label>
                    Model(dung lượng AH){" "}
                    <span
                      hidden={deviceType === 2 && checked ? false : true}
                      className="tick"
                    >
                      *
                    </span>
                  </label>
                  <Form.Item
                    name="batteryCapacity"
                    rules={
                      deviceType === 2 &&
                      checked && [
                        {
                          required: true,
                          message: "Không được để trống",
                        },
                      ]
                    }
                  >
                    <Input disabled={deviceType !== 2} />
                  </Form.Item>
                </div>
                <div className="borderItem">
                  <label>
                    Ngày sản xuất{" "}
                    <span
                      hidden={deviceType === 2 && checked ? false : true}
                      className="tick"
                    >
                      *
                    </span>
                  </label>
                  <Form.Item
                    name="productionTime"
                    rules={
                      deviceType === 2 &&
                      checked && [
                        {
                          required: true,
                          message: "Không được để trống",
                        },
                      ]
                    }
                  >
                    <Input disabled={deviceType !== 2} />
                  </Form.Item>
                </div>
              </Col>
              <Col span={12}>
                <div className="borderItem">
                  <label>Dây dẫn</label>
                  <Form.Item name="conductorType">
                    <Input disabled={deviceType !== 4} />
                  </Form.Item>
                </div>
                <div className="borderItem">
                  <label>CB nguồn</label>
                  <Form.Item name="cbPower">
                    <Input disabled={deviceType !== 4} />
                  </Form.Item>
                </div>
                <div className="borderItem">
                  <label>Cắt lọc sét</label>
                  <Form.Item name="schneider">
                    <Input disabled={deviceType !== 4} />
                  </Form.Item>
                </div>
                <div className="borderItem">
                  <label>Năm lắp đặt HTĐ</label>
                  <Form.Item name="yearInstall">
                    <Input disabled={deviceType !== 4} />
                  </Form.Item>
                </div>
                <div className="borderItem">
                  <label>Hiện trạng</label>
                  <Form.Item name="currentStatus">
                    <Input />
                  </Form.Item>
                </div>
                <div className="borderItem">
                  <label>Số lượng</label>
                  <Form.Item name="number">
                    <textarea
                      type="number"
                      rows={3}
                      cols={25}
                      disabled={deviceType !== 5}
                    />
                  </Form.Item>
                </div>
                <div className="borderItem">
                  <Form.Item name="orderMaintenance">
                    <Checkbox
                      checked={checked}
                      disabled={
                        deviceType === 1 || deviceType === 2 ? true : false
                      }
                      onChange={handleCheckBoxOnChange}
                    >
                      Đặt lịch bảo dưỡng
                    </Checkbox>
                  </Form.Item>
                </div>
                <div className="borderItem">
                  <label>
                    Số ngày BD định kỳ{" "}
                    <span hidden={!checked} className="tick">
                      *
                    </span>
                  </label>
                  <Form.Item
                    name="dateMaintenance"
                    rules={
                      checked && [
                        {
                          required: true,
                          message: "Không được để trống",
                        },
                        {
                          pattern: new RegExp(/^([1-9][0-9]*|0)$/),
                          message: "Chỉ được nhập số nguyên dương",
                        },
                      ]
                    }
                  >
                    <Input type="number" />
                  </Form.Item>
                </div>
              </Col>
              <Col span={24}>
                <div className="borderModalFooter">
                  <button className="buttonSave mt-20">OK</button>
                </div>
              </Col>
            </Row>
          </Space>
        </Form>
        {/* </FormProvider> */}
      </Modal>
    </>
  );
};

export default ModalEditCellDevice;
