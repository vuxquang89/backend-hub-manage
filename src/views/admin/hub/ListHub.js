import "./ListHub.css";
import { useEffect, useState } from "react";
import {
  Typography,
  Space,
  Table,
  Flex,
  Popconfirm,
  message,
  Select,
} from "antd";
import { Link } from "react-router-dom";
import { FormProvider, useForm, useFormState } from "react-hook-form";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { listHub } from "../../../API/dummyData";
import { toast } from "react-toastify";
import ModalAddHub from "./ModalAddHub";
import InputCustom from "../../../components/input/Input";
import {
  hubName_validation,
  phone_validation,
  hubAddress_validation,
  hubCity_validation,
  hubManager_validation,
} from "../../../utils/inputHubValidations";
import SpanLoading from "../../../components/loading/SpanLoading";

function ListHub() {
  const methods = useForm();
  const tableMethods = useForm();
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [editing, setEditing] = useState(false);

  const [hubName, setHubName] = useState("");
  const [hubAddress, setHubAddress] = useState("");
  const [hubCity, setHubCity] = useState("");
  const [hubManagerName, setHubManagerName] = useState("");
  const [hubPhone, setHubPhone] = useState("");

  useEffect(() => {
    setLoading(true);
    // getInventory().then((res) => {
    //   setDataSource(res.products);
    //   setLoading(false);
    // });
    setDataSource(listHub);
    setLoading(false);
  }, []);

  const confirmDeleteHub = (e) => {
    console.log(">>>comfirm delete", editingId);
    setFormLoading(true);
    let data = dataSource;

    data = data.filter((item) => item.hubId !== editingId);
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

  const handleDeleteHubOnClick = (record) => {
    setEditingId(record.hubId);
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
  const onInputChange = (e) => {
    // const newData = [...tableData];
    // newData[index][key] = Number(e.target.value);
    // setTotal(newData, index);
    // setTableData(newData);
    console.log(e.target.value);
    setHubName(e.target.value);
  };

  const setInputCellValue = (record) => {
    tableMethods.reset();
    setHubName(record.hubName);
    setHubAddress(record.hubAddress);
    setHubCity(record.hubCity);
    setHubManagerName(record.hubManagerName);
    setHubPhone(record.hubManagerPhone);
  };

  const handleSaveEditCell = (data) => {
    console.log(">> Save input edit cell:  ", editingId);
    console.log("data ", data);
  };

  return (
    <>
      <Space size={20} direction="vertical" className="ps-12">
        <Flex justify="space-between" align="center">
          <Typography.Title level={4}>Danh sách Hub</Typography.Title>

          <button onClick={() => showModal()} className="btnAddUser">
            Thêm mới
          </button>
        </Flex>
        <Space>
          <label>Chọn chi nhánh</label>
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
            onChange={(value) => {
              console.log(">>> check select onchange:", value);
            }}
            options={[
              {
                value: "1",
                label: "Not Identified",
              },
              {
                value: "2",
                label: "Closed",
              },
              {
                value: "3",
                label: "Communicated",
              },
              {
                value: "4",
                label: "Identified",
              },
              {
                value: "5",
                label: "Resolved",
              },
              {
                value: "6",
                label: "Cancelled",
              },
            ]}
          />
        </Space>
        <FormProvider {...tableMethods}>
          <form className="formListHub">
            <Table
              loading={loading}
              columns={[
                {
                  title: "Phòng máy",
                  dataIndex: "hubName",
                  render: (text, record) => {
                    return record.hubId === editingId && editing ? (
                      <InputCustom
                        {...hubName_validation}
                        className="inputEditCell"
                        onChange={onInputChange}
                        value={hubName}
                      />
                    ) : (
                      text
                    );
                  },
                },
                {
                  title: "Địa chỉ",
                  dataIndex: "hubAddress",
                  render: (text, record) => {
                    return record.hubId === editingId && editing ? (
                      <InputCustom
                        {...hubAddress_validation}
                        className="inputEditCell"
                        onChange={(e) => {
                          setHubAddress(e.target.value);
                        }}
                        value={hubAddress}
                      />
                    ) : (
                      text
                    );
                  },
                },
                {
                  title: "Tỉnh/Thành phố",
                  dataIndex: "hubCity",
                  render: (text, record) => {
                    return record.hubId === editingId && editing ? (
                      <InputCustom
                        {...hubCity_validation}
                        className="inputEditCell"
                        onChange={(e) => {
                          setHubCity(e.target.value);
                        }}
                        value={hubCity}
                      />
                    ) : (
                      text
                    );
                  },
                },
                {
                  title: "Quản lý PM",
                  dataIndex: "hubManagerName",
                  render: (text, record) => {
                    return record.hubId === editingId && editing ? (
                      <InputCustom
                        {...hubManager_validation}
                        className="inputEditCell"
                        onChange={(e) => {
                          setHubManagerName(e.target.value);
                        }}
                        value={hubManagerName}
                      />
                    ) : (
                      text
                    );
                  },
                },
                {
                  title: "SĐT quản lý PM",
                  dataIndex: "hubManagerPhone",
                  render: (text, record) => {
                    return record.hubId === editingId && editing ? (
                      <InputCustom
                        {...phone_validation}
                        className="inputEditCell"
                        onChange={(e) => {
                          setHubPhone(e.target.value);
                        }}
                        value={hubPhone}
                      />
                    ) : (
                      text
                    );
                  },
                },
                {
                  title: "Action",
                  key: "hubId",
                  dataIndex: "hubId",
                  render: (text, record) => (
                    <>
                      {editing && record.hubId === editingId ? (
                        <>
                          <button
                            className="btnUserEdit"
                            onClick={tableMethods.handleSubmit((data) => {
                              const hubId = record.hubId;

                              setFormLoading(true);
                              handleSaveEditCell(data);
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
                            setEditingId(record.hubId);
                            setEditing(true);
                            setInputCellValue(record);
                          }}
                        >
                          Edit
                        </button>
                      )}
                      <Link to={"/admin/hub/" + record.hubId}>
                        <EyeOutlined className="buttonViewCell" />
                      </Link>
                      <Popconfirm
                        title="Alarm"
                        description="Bạn có chắc muốn xóa?"
                        onConfirm={confirmDeleteHub}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <DeleteOutlined
                          className="btnUserDelete"
                          onClick={() => handleDeleteHubOnClick(record)}
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
      <ModalAddHub
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

export default ListHub;
