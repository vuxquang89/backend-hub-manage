import React from "react";
import { useEffect, useState } from "react";
import {
  Typography,
  Space,
  Table,
  Flex,
  Popconfirm,
  message,
  Input,
} from "antd";
import { Link } from "react-router-dom";
import { FormProvider, useForm, useFormState } from "react-hook-form";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { listDevice } from "../../../API/dummyData";
import { toast } from "react-toastify";
import InputCustom from "../../../components/input/Input";
import { deviceName_validation } from "../../../utils/inputDeviceValidations";
import SpanLoading from "../../../components/loading/SpanLoading";
import ModalAddDevice from "./ModalAddDevice";

function ListDevice() {
  const methods = useForm();
  const tableMethods = useForm();
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [editing, setEditing] = useState(false);
  const [searchedText, setSearchText] = useState("");

  useEffect(() => {
    setLoading(true);
    // getInventory().then((res) => {
    //   setDataSource(res.products);
    //   setLoading(false);
    // });
    setDataSource(listDevice);
    setLoading(false);
  }, []);

  const confirmDeleteDevice = (e) => {
    console.log(">>>comfirm delete", editingId);
    setFormLoading(true);
    let data = dataSource;

    data = data.filter((item) => item.id !== editingId);
    // toast.success("Xóa thành công");
    setDataSource(data);

    setTimeout(() => {
      setFormLoading(false);
      message.success("Xóa thành công");
    }, 2000);
  };
  const cancel = (e) => {
    console.log(e);
    //message.error('Click on No');
  };

  const handleDeleteDeviceOnClick = (record) => {
    setEditingId(record.id);
    setEditing(false);
  };

  const showModal = () => {
    setOpenModal(true);
  };

  const handleOkOnClick = methods.handleSubmit((data) => {
    //setModalText('The modal will be closed after two seconds');
    console.log(data);
    setIsLoading(true);
    setTimeout(() => {
      setOpenModal(false);
      setIsLoading(false);
      toast.success("Thêm mới thành công");
      methods.reset();
    }, 2000);
  });

  const handleCancelOnClick = () => {
    console.log("Clicked cancel button");
    setOpenModal(false);
  };

  const handleCancelEditCell = () => {
    setEditing(false);
    setEditingId("");
    tableMethods.reset();
  };

  return (
    <>
      <Space size={20} direction="vertical" className="ps-12">
        <Flex justify="space-between" align="center">
          <Typography.Title level={4}>Danh sách thiết bị</Typography.Title>

          <button onClick={() => showModal()} className="btnAddUser">
            Thêm mới
          </button>
        </Flex>
        <Space>
          <Input
            placeholder="Search..."
            onSearch={(value) => {
              setSearchText(value);
            }}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            prefix={<SearchOutlined />}
          />
        </Space>
        <FormProvider {...tableMethods}>
          <form className="formListHub">
            <Table
              loading={loading}
              columns={[
                {
                  title: "Id",
                  dataIndex: "id",
                  key: "id",
                },
                {
                  title: "Tên thiết bị",
                  dataIndex: "deviceName",
                  filteredValue: [searchedText],
                  onFilter: (value, record) => {
                    return String(record.deviceName)
                      .toLowerCase()
                      .includes(value.toLowerCase());
                  },
                  render: (text, record) => {
                    return record.id === editingId && editing ? (
                      <InputCustom
                        {...deviceName_validation}
                        className="inputEditCell"
                        placeholder={text + " *"}
                      />
                    ) : (
                      text
                    );
                  },
                },

                {
                  title: "Action",
                  key: "id",
                  dataIndex: "id",
                  render: (text, record) => (
                    <>
                      {editing && record.id === editingId ? (
                        <>
                          <button
                            className="btnUserEdit"
                            onClick={tableMethods.handleSubmit((data) => {
                              console.log(">>>id edit ", record.id);
                              console.log(">>>data edit", data);
                              setFormLoading(true);
                              setTimeout(() => {
                                setFormLoading(false);
                                setEditing(false);
                                setEditingId("");
                                tableMethods.reset();
                              }, 3000);
                            })}
                          >
                            Save
                          </button>
                          <button
                            className="buttonEditCell"
                            onClick={() => handleCancelEditCell()}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          className="btnUserEdit"
                          onClick={() => {
                            console.log(record);
                            setEditingId(record.id);
                            setEditing(true);
                          }}
                        >
                          Edit
                        </button>
                      )}
                      <Popconfirm
                        title="Alarm"
                        description="Bạn có chắc muốn xóa?"
                        onConfirm={confirmDeleteDevice}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <DeleteOutlined
                          className="btnUserDelete"
                          onClick={() => handleDeleteDeviceOnClick(record)}
                        />
                      </Popconfirm>
                    </>
                  ),
                },
              ]}
              dataSource={dataSource}
              pagination={{
                pageSize: 5,
              }}
            ></Table>
          </form>
        </FormProvider>
      </Space>
      <ModalAddDevice
        open={openModal}
        handleOkOnClick={handleOkOnClick}
        handleCancelOnClick={handleCancelOnClick}
        isLoading={isLoading}
        methods={methods}
      />
      {formLoading && <SpanLoading />}
    </>
  );
}

export default ListDevice;
