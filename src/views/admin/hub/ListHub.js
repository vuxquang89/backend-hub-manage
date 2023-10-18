import "./ListHub.css";
import { useEffect, useState } from "react";
import { Typography, Space, Table, Flex } from "antd";
import { Link } from "react-router-dom";
import { FormProvider, useForm, useFormState } from "react-hook-form";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { listHub } from "../../../API/dummyData";
import { toast } from "react-toastify";
import ModalAddHub from "./ModalAddHub";
import Input from "../../../components/input/Input";
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
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState("hub_cn_1");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setLoading(true);
    // getInventory().then((res) => {
    //   setDataSource(res.products);
    //   setLoading(false);
    // });
    setDataSource(listHub);
    setLoading(false);
  }, []);

  const handleDeleteHubOnClick = (record) => {
    let data = dataSource;

    data = data.filter((item) => item.hubId !== record.hubId);
    toast.success("Xóa thành công");
    setDataSource(data);
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
    methods.reset();
  };

  const handleSaveCell = (record) => {
    console.log(">>>save cell", record);
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
        <FormProvider {...methods}>
          <form className="formListHub">
            <Table
              loading={loading}
              columns={[
                {
                  title: "Phòng máy",
                  dataIndex: "hubName",
                  render: (text, record) => {
                    return record.hubId === editingId && editing ? (
                      <Input
                        {...hubName_validation}
                        className="inputEditCell"
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
                      <Input
                        {...hubAddress_validation}
                        className="inputEditCell"
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
                      <Input
                        {...hubCity_validation}
                        className="inputEditCell"
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
                      <Input
                        {...hubManager_validation}
                        className="inputEditCell"
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
                      <Input {...phone_validation} className="inputEditCell" />
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
                      {editing && record.hubId === editingId ? (
                        <>
                          <button
                            className="btnUserEdit"
                            onClick={methods.handleSubmit((data) => {
                              console.log(">>>id edit ", record.hubId);
                              console.log(">>>data edit", data);
                              setFormLoading(true);
                              setTimeout(() => {
                                setFormLoading(false);
                                setEditing(false);
                                setEditingId("");
                                methods.reset();
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
                          }}
                        >
                          Edit
                        </button>
                      )}
                      <Link to={"/admin/hub/" + record.hubId}>
                        <EyeOutlined className="buttonViewCell" />
                      </Link>
                      <DeleteOutlined
                        className="btnUserDelete"
                        onClick={() => handleDeleteHubOnClick(record)}
                      />
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
