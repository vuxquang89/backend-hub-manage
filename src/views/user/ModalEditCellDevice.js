import React, { useEffect, useState } from "react";
import { Modal, Row, Col, Space, Form, Input } from "antd";
import { FormProvider } from "react-hook-form";

const ModalEditCellDevice = ({
  open,
  form,

  handleSubmit,
  handleCancelOnClick,
  isLoading,
  ratedPower,
  setRatePower,
  loadDuringPowerOutage,
  setLoadDuringPowerOutage,
  batteryQuantity,
  setBatteryQuantity,
  batteryNumber,
  setBatteryNumber,
  batteryCapacity,
  setBatteryCapacity,
  productionTime,
  setProductionTime,
  conductorType,
  setConductorType,
  cbPower,
  setCBPower,
  schneider,
  setSchneider,
  yearInstall,
  setYearInstall,
  currentStatus,
  setCurrentStatus,
  number,
  setNumber,
  title,
}) => {
  return (
    <>
      <Modal
        title={title}
        open={open}
        destroyOnClose={true}
        onOk={form.submit}
        confirmLoading={isLoading}
        onCancel={handleCancelOnClick}
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
                  <label>CS đinh mức(KVA)</label>

                  <Form.Item name="ratedPower">
                    <Input />
                  </Form.Item>
                </div>
                <div className="borderItem">
                  <label>%Tải khi mất điện</label>
                  <Form.Item name="loadDuringPowerOutage">
                    <Input />
                  </Form.Item>
                </div>
                <div className="borderItem">
                  <label>Số bình hiện tại</label>
                  <Form.Item name="batteryQuantity">
                    <Input />
                  </Form.Item>
                </div>
                <div className="borderItem">
                  <label>Số chuỗi Battery hiện tại</label>
                  <Form.Item name="batteryNumber">
                    <Input />
                  </Form.Item>
                </div>
                <div className="borderItem">
                  <label>Dung lượng AH</label>
                  <Form.Item name="batteryCapacity">
                    <Input />
                  </Form.Item>
                </div>
                <div className="borderItem">
                  <label>Ngày sản xuất</label>
                  <Form.Item name="productionTime">
                    <Input />
                  </Form.Item>
                </div>
              </Col>
              <Col span={12}>
                <div className="borderItem">
                  <label>Dây dẫn</label>
                  <Form.Item name="conductorType">
                    <Input />
                  </Form.Item>
                </div>
                <div className="borderItem">
                  <label>CB nguồn</label>
                  <Form.Item name="cbPower">
                    <Input />
                  </Form.Item>
                </div>
                <div className="borderItem">
                  <label>Cắt lọc sét</label>
                  <Form.Item name="schneider">
                    <Input />
                  </Form.Item>
                </div>
                <div className="borderItem">
                  <label>Năm lắp đặt HTĐ</label>
                  <Form.Item name="yearInstall">
                    <Input />
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
                    <textarea type="number" rows={3} cols={25} />
                  </Form.Item>
                </div>
                <div className="borderItem">
                  <label>Số ngày bảo dưỡng định kỳ</label>
                  <Form.Item
                    name="dateMaintenance"
                    rules={[
                      {
                        required: true,
                        message: "Please input the title of collection!",
                      },
                      {
                        pattern: new RegExp(/^([1-9][0-9]*|0)$/),
                        message: "No Space or Special Characters Allowed",
                      },
                    ]}
                  >
                    <Input type="number" />
                  </Form.Item>
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
