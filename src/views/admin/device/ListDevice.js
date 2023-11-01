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

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const ListDevice = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const methods = useForm();
  const tableMethods = useForm();
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [editing, setEditing] = useState(false);
  const [valueDeviceName, setValueDeviceName] = useState("");
  const [searchedText, setSearchText] = useState("");

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    setLoading(true);
    setFormLoading(true);
    // getInventory().then((res) => {
    //   setDataSource(res.products);
    //   setLoading(false);
    // });

    const getDevices = async () => {
      try {
        const response = await axiosPrivate.get("/api/device");
        console.log(">>>>get device", response.data);
        isMounted && setDataSource(response.data);

        setLoading(false);
        setFormLoading(false);
      } catch (err) {
        console.log("get device error", err);
        setLoading(false);
        setFormLoading(false);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getDevices();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const confirmDeleteDevice = async () => {
    console.log(">>>comfirm delete", editingId);
    setFormLoading(true);

    await axiosPrivate
      .delete(`/api/device/${editingId}`)
      .then((res) => {
        let result = res.data;

        let data = dataSource;
        data = data.filter((item) => item.id !== editingId);
        // toast.success("Xóa thành công");
        setDataSource(data);

        setFormLoading(false);
        message.success("Xóa thành công");
        console.log(">>>delete data response", result);
      })
      .catch((err) => {
        console.log(">>>> delete error", err);
        setFormLoading(false);
        message.error("Xóa thất bại");
      });
  };
  const cancel = (e) => {
    console.log(e);
    //message.error('Click on No');
  };

  const handleDeleteDeviceOnClick = (record) => {
    setEditingId(record.id);
    setEditing(false);
    setValueDeviceName("");
  };

  const showModal = () => {
    setOpenModal(true);
  };

  const save = async (data) => {
    // console.log(">>>>>>>>", Object.values(data));
    console.log(">>>>>>>>>>", data.deviceName);
    const deviceName = data.deviceName;
    setIsLoading(true);
    const response = await axiosPrivate
      .post("/api/device", { deviceName })
      .then((res) => {
        let result = res.data;
        setDataSource([...dataSource, result]);
        setIsLoading(false);
        setOpenModal(false);
        toast.success("Thêm mới thành công");
        methods.reset();
        console.log(">>> data response", result);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(`get data error ${e}`);
        setOpenModal(false);
        toast.success("Thêm mới thất bại");
      });
  };

  const handleOkOnClick = methods.handleSubmit((data) => {
    //setModalText('The modal will be closed after two seconds');
    console.log(data);

    save(data);
    // setTimeout(() => {
    //   setOpenModal(false);
    //   setIsLoading(false);
    //   toast.success("Thêm mới thành công");
    //   methods.reset();
    // }, 2000);
  });

  const updateData = async () => {
    const updateDeviceArray = dataSource.map((device) => {
      if (device.id === editingId) {
        return { ...device, deviceName: valueDeviceName };
      } else {
        return device;
      }
    });

    setDataSource(updateDeviceArray);
  };

  const saveEdit = async () => {
    setFormLoading(true);
    await axiosPrivate
      .put(`/api/device/${editingId}`, { deviceName: valueDeviceName })
      .then((res) => {
        let result = res.data;

        updateData();

        setIsLoading(false);
        setFormLoading(false);
        setEditing(false);
        setEditingId("");
        tableMethods.reset();
        toast.success("Cập nhật thành công");
        console.log(">>> edit save data response", result);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(`get data error ${e}`);
        setFormLoading(false);
        toast.success("Cập nhật thất bại");
      });
    // setTimeout(() => {
    //   setFormLoading(false);
    //   setEditing(false);
    //   setEditingId("");
    //   tableMethods.reset();
    // }, 3000);
  };

  const handleCancelOnClick = () => {
    console.log("Clicked cancel button");
    setOpenModal(false);
  };

  const handleCancelEditCell = () => {
    setEditing(false);
    setEditingId("");
    setValueDeviceName("");
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
                        value={valueDeviceName}
                        onChange={(e) => {
                          setValueDeviceName(e.target.value);
                        }}
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
                              saveEdit();
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
                            setValueDeviceName(record.deviceName);
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
};

export default ListDevice;
