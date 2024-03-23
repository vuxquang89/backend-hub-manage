import React, { useEffect, useState } from "react";
import { Modal, Row, Col, Space, Form, Input, Checkbox } from "antd";
import { FormProvider } from "react-hook-form";

const ModalEditCellDevice = ({
  open,
  form,
  checked,
  setChecked,
  deviceType,
  handleSubmit,
  handleCancelOnClick,
  isLoading,
  title,
}) => {
  //---------------------------------------

  const [disabled, setDisabled] = useState(false);
  const { TextArea } = Input;

  useEffect(() => {
    if (
      deviceType === 1 ||
      deviceType === 2 ||
      deviceType === 3 ||
      deviceType === 5
    ) {
      setChecked(true);
    }
    setDefaultValue(deviceType);
  }, [deviceType, open]);

  function setDefaultValue(deviceType) {
    switch (deviceType) {
      case 1:
        form.setFieldsValue({
          trademark: "null", //thuong hieu
          ratedPower: 0,

          loadDuringPowerOutage: 0, //tai khi mat dien
          batteryQuantity: 0, //binh / chuoi hien tai
          batteryNumber: 0, //so chuoi battery hien tai

          productionTime: "null", //thoi gian san xuat
          conductorType: "null", //day dan

          cbPower: "null",
          yearInstall: "null", //nam lap dat he thong dien
          currentStatus: "null", //hien trang
          dateMaintenance: 365, //so ngay bao duong dinh ky
        });
        break;
      case 2:
        form.setFieldsValue({
          trademark: "null", //thuong hieu

          batteryCapacity: 0, //model (dung luong AH)
          productionTime: "null", //thoi gian san xuat
          conductorType: "null", //day dan

          cbPower: "null",

          yearInstall: "null", //nam lap dat he thong dien
          currentStatus: "null", //hien trang
          dateMaintenance: 365,
        });
        break;
      case 3:
        form.setFieldsValue({
          trademark: "null",
          ratedPower: 0,

          loadDuringPowerOutage: 0, //tai khi mat dien
          batteryQuantity: 0, //binh / chuoi hien tai

          batteryCapacity: 0, //model (dung luong AH)
          productionTime: "null", //thoi gian san xuat
          conductorType: "null", //day dan

          cbPower: "null",

          loadCurrentPerPhase: 0, //dong tai moi pha

          yearInstall: "null",
          currentStatus: "null",
          dateMaintenance: 180,
        });
        break;
      case 4:
        form.setFieldsValue({
          trademark: "null",
          ratedPower: 0,

          productionTime: "null", //thoi gian san xuat
          conductorType: "null", //day dan

          cbPower: "null",

          yearInstall: "null",
          currentStatus: "null",
          dateMaintenance: 90,
        });
        break;
      case 5:
        form.setFieldsValue({
          trademark: "null",
          ratedPower: 0,

          productionTime: "null", //thoi gian san xuat
          conductorType: "null", //day dan

          cbPower: "null",

          loadCurrentPerPhase: 0, //dong tai moi pha

          yearInstall: "null",
          currentStatus: "null",
          dateMaintenance: 90,
        });
        break;
      default:
        form.setFieldsValue({
          trademark: "null",
          ratedPower: 0,

          productionTime: "null", //thoi gian san xuat
          conductorType: "null", //day dan

          cbPower: "null",

          loadCurrentPerPhase: 0, //dong tai moi pha
          resistor: 0, //dien tro
          seriesOrParallel: "null", //mac noi tiep/song song
          yearInstall: "null",
          currentStatus: "null",
          dateMaintenance: 90,
        });
        break;
    }
  }

  const handleCheckBoxOnChange = (e) => {
    console.log("checked = ", e.target.checked);
    //form.resetFields();
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
                {deviceType !== 4 ? (
                  <div className="borderItem">
                    <label>
                      Thương hiệu<span className="tick">*</span>
                    </label>

                    <Form.Item
                      name="trademark"
                      rules={[
                        {
                          required: true,
                          message: "Không được để trống",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                ) : null}
                {deviceType !== 2 ? (
                  <div className="borderItem">
                    <label>
                      CS đinh mức(KVA){" "}
                      <span
                        /*
                      hidden={
                        (deviceType === 1 || deviceType === 3) && checked
                          ? false
                          : true
                      }
                      */
                        className="tick"
                      >
                        *
                      </span>
                    </label>

                    <Form.Item
                      name="ratedPower"
                      rules={[
                        {
                          required: true,
                          message: "Không được để trống",
                        },
                        {
                          pattern: new RegExp(/^([1-9][0-9]*|0)$/),
                          message: "Chỉ được nhập số nguyên dương",
                        },
                      ]}
                    >
                      <Input type="number" />
                    </Form.Item>
                  </div>
                ) : null}
                {deviceType === 1 || deviceType === 3 ? (
                  <div className="borderItem">
                    <label>
                      %Tải khi mất điện{" "}
                      <span
                        /*
                      hidden={
                        (deviceType === 1 || deviceType === 3) && checked
                          ? false
                          : true
                      }
                      */
                        className="tick"
                      >
                        *
                      </span>
                    </label>
                    <Form.Item
                      name="loadDuringPowerOutage"
                      rules={[
                        {
                          required: true,
                          message: "Không được để trống",
                        },
                        {
                          pattern: new RegExp(/^([1-9][0-9]*|0)$/),
                          message: "Chỉ được nhập số nguyên dương",
                        },
                      ]}
                    >
                      <Input type="number" />
                    </Form.Item>
                  </div>
                ) : null}
                {deviceType === 1 || deviceType === 3 ? (
                  <div className="borderItem">
                    <label>
                      Số bình hiện tại{" "}
                      <span
                        //hidden={deviceType === 1 && checked ? false : true}
                        className="tick"
                      >
                        *
                      </span>
                    </label>
                    <Form.Item
                      name="batteryQuantity"
                      rules={[
                        {
                          required: true,
                          message: "Không được để trống",
                        },
                        {
                          pattern: new RegExp(/^([1-9][0-9]*|0)$/),
                          message: "Chỉ được nhập số nguyên dương",
                        },
                      ]}
                    >
                      <Input type="number" />
                    </Form.Item>
                  </div>
                ) : null}
                {deviceType === 1 ? (
                  <div className="borderItem">
                    <label>
                      Số chuỗi Battery hiện tại{" "}
                      <span
                        //hidden={deviceType === 1 && checked ? false : true}
                        className="tick"
                      >
                        *
                      </span>
                    </label>
                    <Form.Item
                      name="batteryNumber"
                      rules={[
                        {
                          required: true,
                          message: "Không được để trống",
                        },
                        {
                          pattern: new RegExp(/^([1-9][0-9]*|0)$/),
                          message: "Chỉ được nhập số nguyên dương",
                        },
                      ]}
                    >
                      <Input type="number" />
                    </Form.Item>
                  </div>
                ) : null}

                {deviceType === 6 ? (
                  <div className="borderItem">
                    <label>
                      Mắc nối tiếp/song song<span className="tick">*</span>
                    </label>
                    <Form.Item
                      name="seriesOrParallel"
                      rules={[
                        {
                          required: true,
                          message: "Không được để trống",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                ) : null}

                {deviceType === 6 ? (
                  <div className="borderItem">
                    <label>
                      Điện trở đất<span className="tick">*</span>
                    </label>
                    <Form.Item
                      name="resistor"
                      rules={[
                        {
                          required: true,
                          message: "Không được để trống",
                        },
                        {
                          pattern: new RegExp(/^([1-9][0-9]*|0)$/),
                          message: "Chỉ được nhập số nguyên dương",
                        },
                      ]}
                    >
                      <Input type="number" />
                    </Form.Item>
                  </div>
                ) : null}

                {deviceType === 2 || deviceType === 3 ? (
                  <div className="borderItem">
                    <label>
                      Model(dung lượng AH){" "}
                      <span
                        //hidden={deviceType === 2 && checked ? false : true}
                        className="tick"
                      >
                        *
                      </span>
                    </label>
                    <Form.Item
                      name="batteryCapacity"
                      rules={[
                        {
                          required: true,
                          message: "Không được để trống",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                ) : null}

                {deviceType !== 4 || deviceType !== 5 ? (
                  <div className="borderItem">
                    <label>
                      Ngày sản xuất{" "}
                      <span
                        //hidden={deviceType === 2 && checked ? false : true}
                        className="tick"
                      >
                        *
                      </span>
                    </label>
                    <Form.Item
                      name="productionTime"
                      rules={[
                        {
                          required: true,
                          message: "Không được để trống",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                ) : null}
              </Col>
              <Col span={12}>
                <div className="borderItem">
                  <label>
                    Dây dẫn (mm2)<span className="tick">*</span>
                  </label>
                  <Form.Item
                    name="conductorType"
                    rules={[
                      {
                        required: true,
                        message: "Không được để trống",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div className="borderItem">
                  <label>
                    CB nguồn (A)<span className="tick">*</span>
                  </label>
                  <Form.Item
                    name="cbPower"
                    rules={[
                      {
                        required: true,
                        message: "Không được để trống",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>

                {deviceType === 3 || deviceType === 5 || deviceType === 6 ? (
                  <div className="borderItem">
                    <label>
                      Dòng tải mỗi pha (A)<span className="tick">*</span>
                    </label>
                    <Form.Item
                      name="loadCurrentPerPhase"
                      rules={[
                        {
                          required: true,
                          message: "Không được để trống",
                        },
                        {
                          pattern: new RegExp(/^([1-9][0-9]*|0)$/),
                          message: "Chỉ được nhập số nguyên dương",
                        },
                      ]}
                    >
                      <Input type="number" />
                    </Form.Item>
                  </div>
                ) : null}

                <div className="borderItem">
                  <label>
                    Năm lắp đặt <span className="tick">*</span>
                  </label>
                  <Form.Item
                    name="yearInstall"
                    rules={[
                      {
                        required: true,
                        message: "Không được để trống",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div className="borderItem">
                  <label>
                    Hiện trạng<span className="tick">*</span>
                  </label>
                  <Form.Item
                    name="currentStatus"
                    rules={[
                      {
                        required: true,
                        message: "Không được để trống",
                      },
                    ]}
                  >
                    <TextArea />
                  </Form.Item>
                </div>

                <div className="borderItem">
                  <Form.Item name="orderMaintenance">
                    <Checkbox
                      checked={checked}
                      disabled={
                        deviceType === 1 ||
                        deviceType === 2 ||
                        deviceType === 3 ||
                        deviceType === 5
                          ? true
                          : false
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
                    <Input type="number" disabled={!checked} />
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
