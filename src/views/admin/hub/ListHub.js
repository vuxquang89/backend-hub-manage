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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FormProvider, useForm, useFormState } from "react-hook-form";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
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
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

function ListHub() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const methods = useForm();
  const tableMethods = useForm();
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [editing, setEditing] = useState(false);
  const [branchValue, setBranchValue] = useState("");
  const [listUserManager, setListUserManager] = useState([]);

  const [hubName, setHubName] = useState("");
  const [hubAddress, setHubAddress] = useState("");
  const [hubCity, setHubCity] = useState("");
  const [hubManagerName, setHubManagerName] = useState("");
  const [hubManagerPhone, setHubManagerPhone] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    loadData();
    getBranchList();
  }, []);

  const loadData = async () => {
    setLoading(true);
    await axiosPrivate
      .get("/api/hub")
      .then((res) => {
        console.log(">>>>get list hub", res.data);
        setDataSource(res.data);

        setLoading(false);
      })
      .catch((err) => {
        console.log("get list hub error", err);
        setLoading(false);
        navigate("/login", { state: { from: location }, replace: true });
      });
  };

  const getBranchList = async () => {
    await axiosPrivate
      .get("/api/branch/list")
      .then((res) => {
        console.log(">>>>get list branch", res.data);
        setBranchList(res.data);
      })
      .catch((err) => {
        console.log("get list hub branch", err);

        navigate("/login", { state: { from: location }, replace: true });
      });
  };

  const confirmDeleteHub = async () => {
    console.log(">>>comfirm delete", editingId);

    setFormLoading(true);

    await axiosPrivate
      .delete(`/api/hub/${editingId}`)
      .then((res) => {
        let result = res.data;
        if (result) {
          let data = dataSource;

          data = data.filter((item) => item.hubId !== editingId);
          // toast.success("Xóa thành công");
          setDataSource(data);

          message.success("Xóa thành công");
        } else {
          message.error("Không thể xóa");
        }
        setFormLoading(false);
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

  const handleDeleteHubOnClick = (record) => {
    setEditingId(record.hubId);
    setEditing(false);
  };

  const showModal = () => {
    getUserManager();
  };

  const handleOkOnClick = methods.handleSubmit((data) => {
    //setModalText('The modal will be closed after two seconds');
    console.log(">>>>>>get branch value", branchValue);
    console.log(">>>>>>get user id value", userId);
    console.log(data);
    if (branchValue.length === 0) {
      toast.warning("Kiểm tra, chưa chọn chi nhánh");
      return;
    }

    if (userId.length === 0) {
      toast.warning("Kiểm tra chưa chọn người phụ trách");
      return;
    }

    addNewHub(data);
  });

  const handleCancelOnClick = () => {
    console.log("Clicked cancel button");
    methods.reset();
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
    setHubManagerPhone(record.hubManagerPhone);
  };

  const handleSaveEditCell = async (record) => {
    console.log(">> Save input edit cell:  ", editingId);
    setFormLoading(true);
    await axiosPrivate
      .post(`/api/hub/${editingId}`, {
        hubName,
        hubAddress,
        hubCity,
        hubManagerName,
        hubManagerPhone,
      })
      .then((res) => {
        console.log(">>>>>>>> save edit ", res.data);
        updateHubArray();
        setFormLoading(false);
        tableMethods.reset();
      })
      .catch((err) => {
        setFormLoading(false);
      });
  };

  const updateHubArray = dataSource.map((hub) => {
    if (hub.hubId === editingId) {
      return {
        ...hub,
        hubName: hubName,
        hubAddress: hubAddress,
        hubCity: hubCity,
        hubManagerName: hubManagerName,
        hubManagerPhone: hubManagerPhone,
      };
    } else {
      return hub;
    }
  });

  const addNewHub = async (record) => {
    setIsLoading(true);
    await axiosPrivate
      .post("/api/hub", {
        hubId: record.hubId,
        userId: userId,
        branchId: branchValue,
        hubName: record.hubName,
        hubAddress: record.hubAddress,
        hubCity: record.hubCity,
        hubManagerName: record.hubManagerName,
        hubManagerPhone: record.hubManagerPhone,
      })
      .then((res) => {
        console.log(">>>>> add new hub", res.data);
        setDataSource([...dataSource, res.data]);
        setOpenModal(false);
        setIsLoading(false);
        methods.reset();
        toast.success("Thêm mới thành công");
      })
      .catch((err) => {
        console.log(">>>>> add new hub error", err);
        toast.error("Lỗi. Không thể thêm mới");
        setIsLoading(false);
      });
  };

  /**
   * get hub by branch
   */
  const getHubByBranch = async (branchId) => {
    setLoading(true);
    await axiosPrivate
      .get(`/api/hub/branch/${branchId}`)
      .then((res) => {
        console.log(">>>>get list hub", res.data);
        setDataSource(res.data);

        setLoading(false);
      })
      .catch((err) => {
        console.log("get list hub error", err);
        setLoading(false);
        navigate("/login", { state: { from: location }, replace: true });
      });
  };

  /**
   * get list user manager
   */
  const getUserManager = async () => {
    setFormLoading(true);
    methods.reset();
    await axiosPrivate
      .get(`/api/users/role/selectoption/2`)
      .then((res) => {
        console.log(">>>>get list user manager", res.data);
        setListUserManager(res.data);
        setOpenModal(true);
        setFormLoading(false);
      })
      .catch((err) => {
        console.log("get list user manager error", err);
        setFormLoading(false);
        navigate("/login", { state: { from: location }, replace: true });
      });
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
            onChange={(e, value) => {
              console.log(">>> check select onchange:", e);
              getHubByBranch(value.value);
              setBranchValue(value.value);
            }}
            options={branchList}
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
                  key: "hubName",
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
                  key: "hubAddress",
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
                  key: "hubCity",
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
                  key: "hubManagerName",
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
                  key: "hubManagerPhone",
                  render: (text, record) => {
                    return record.hubId === editingId && editing ? (
                      <InputCustom
                        {...phone_validation}
                        className="inputEditCell"
                        onChange={(e) => {
                          setHubManagerPhone(e.target.value);
                        }}
                        value={hubManagerPhone}
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
                              // const hubId = record.hubId;

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
        branchValue={branchValue}
        branchList={branchList}
        listUserManager={listUserManager}
        setBranchValue={setBranchValue}
        userId={userId}
        setUserId={setUserId}
      />
      {formLoading && <SpanLoading />}
    </>
  );
}

export default ListHub;
