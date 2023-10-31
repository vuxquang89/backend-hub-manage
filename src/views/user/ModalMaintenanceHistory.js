import React, { useState } from "react";
import {
  Modal,
  Row,
  Col,
  Space,
  Form,
  Input,
  DatePicker,
  Table,
  Button,
  Popconfirm,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";

const ModalMaintenanceHistory = ({
  open,
  form,
  isLoading,
  cancelOnClick,
  formLoading,
  dataHistory,
}) => {
  const dateFormat = "YYYY-MM-DD";
  const [dateMaintenance, setDateMaintenance] = useState(new Date());
  const [note, setNote] = useState("");
  const [maintenanceId, setMaintenanceId] = useState("");

  const handleEditOnClick = (e) => {
    console.log("edit click", e);
    setDateMaintenance(e.maintenanceTime);
    setNote(e.maintenanceNote);
    setMaintenanceId(e.id);
    console.log("datepick", note);
  };

  const handleDatePickerOnChange = (date, dateString) => {
    console.log(dateString);
    setDateMaintenance(dateString);
    console.log("picker onchang", dateMaintenance);
  };

  const popConfirmDeleteHistory = (id) => {
    console.log(">>>comfirm delete", id);
    //setFormLoading(true);

    // await axiosPrivate
    //   .delete(`/api/hub/detail/${hubDetailId}`)
    //   .then((res) => {
    //     console.log(">>>>delete hub detail", res.data);

    //     //update dataSource

    //     if (res.data) {
    //       let data = dataSource;

    //       data = data.filter((item) => item.hubDetailId !== hubDetailId);
    //       setDataSource(data);
    //       message.success("Xóa thành công");
    //     } else {
    //       message.warning("Không thể xóa");
    //     }

    //     setIsLoading(false);
    //     setFormLoading(false);
    //   })
    //   .catch((err) => {
    //     console.log("add new history error", err);
    //     message.error("Không thể xóa");
    //     setIsLoading(false);
    //     setFormLoading(false);
    //     // navigate("/login", { state: { from: location }, replace: true });
    //   });
  };

  return (
    <>
      <Modal
        title="Lịch sử bảo dưỡng, bảo trì"
        open={open}
        destroyOnClose={true}
        // onOk={form.submit}
        confirmLoading={isLoading}
        onCancel={cancelOnClick}
        style={{ width: 450, height: 500 }}
        footer={null}
        // footer={[
        //   <Button key="1">1</Button>,
        //   <Button key="2">2</Button>,
        //   <Button key="3" type="primary">
        //     3
        //   </Button>,
        // ]}
      >
        <Row>
          <Col span={24}>
            <Form
            //   layout="horizontal"

            // onFinish={values => onFinish(values)}
            >
              <Row className="cardBody mb-10">
                <Col span={8}>
                  <div className="borderItem">
                    <label>Chọn ngày</label>
                    <Form.Item
                      name="maintenanceTime"
                      rules={[
                        {
                          required: true,
                          message: "Please input the title of collection!",
                        },
                        {
                          pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}",
                        },
                      ]}
                    >
                      {/* <DatePicker
                        // defaultValue={moment(dateMaintenance, dateFormat)}
                        onChange={handleDatePickerOnChange}
                        format={dateFormat}
                      />
                       */}

                      <input
                        type="date"
                        data-date-format="DD MMMM YYYY"
                        className="datePicker"
                        min="1997-01-01"
                        max="2030-12-31"
                        value="10/20/2023"
                        onChange={(e) => {
                          setDateMaintenance(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </div>
                </Col>
                <Col span={10}>
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
                      <TextArea
                        defaultValue={note}
                        onChange={(e) => {
                          setNote(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </div>
                </Col>
                <Col span={6}>
                  <div className="borderItem">
                    <button className="buttonAdd">Thêm</button>
                    <button className="buttonSave">Lưu</button>
                    <Button>Hủy</Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <table className="tableHistory">
          <thead>
            <tr>
              <td style={{ width: "30%" }}>Ngày bảo dưỡng</td>
              <td style={{ width: "45%" }}>Nội dung bảo dưỡng</td>
              <td style={{ width: "25%" }}>Action</td>
            </tr>
          </thead>
          <tbody>
            {dataHistory.map((el, index) => (
              <tr>
                <td>{el.maintenanceTime}</td>
                <td>{el.maintenanceNote}</td>
                <td>
                  <EditOutlined
                    className="buttonIconEdit"
                    onClick={() => {
                      handleEditOnClick(el);
                    }}
                  />
                  <Popconfirm
                    title="Alarm"
                    description="Bạn có chắc muốn xóa?"
                    placement="topRight"
                    onConfirm={popConfirmDeleteHistory(el.id)}
                    onCancel={(e) => {}}
                    okText="Yes"
                    cancelText="No"
                  >
                    <DeleteOutlined
                      className="buttonIconDelete"
                      onClick={() => {
                        setMaintenanceId(el.id);
                        console.log("Delete click", el.id);
                      }}
                    />
                  </Popconfirm>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>
    </>
  );
};

export default ModalMaintenanceHistory;
