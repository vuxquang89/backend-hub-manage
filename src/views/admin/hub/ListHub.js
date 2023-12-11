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
  Input,
  Form,
} from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FormProvider, useForm, useFormState } from "react-hook-form";
import {
  DeleteOutlined,
  EyeOutlined,
  EditOutlined,
  SearchOutlined,
  ApartmentOutlined,
} from "@ant-design/icons";
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
import ModalSwitchBranch from "./ModalSwitchBranch";

function ListHub() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const methods = useForm();
  const tableMethods = useForm();
  const [formSwitchBranch] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [editing, setEditing] = useState(false);
  const [branchValue, setBranchValue] = useState("");
  const [listUserManager, setListUserManager] = useState([]);
  const [listUserDepartment, setListUserDepartment] = useState([]);

  const [hubId, setHubId] = useState("");
  const [hubName, setHubName] = useState("");
  const [hubAddress, setHubAddress] = useState("");
  const [hubCity, setHubCity] = useState("");
  const [hubManagerName, setHubManagerName] = useState("");
  const [hubManagerPhone, setHubManagerPhone] = useState("");
  const [staffDepartmentId, setStaffDepartmentId] = useState("");
  const [staffManagerId, setStaffManagerId] = useState("");
  const [searchedText, setSearchText] = useState("");

  const allSelectItem = [
    {
      label: "All",
      value: "all",
    },
  ];
  const [branchList, setBranchList] = useState(allSelectItem);

  /**
   * modal switch branch
   */
  const [isOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBranchList, setModalBranchList] = useState([]);

  useEffect(() => {
    loadData();
    getBranchList();
  }, []);

  const loadData = async () => {
    setLoading(true);
    await axiosPrivate
      .get("/api/admin/hub")
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
   * get branch list
   */
  const getBranchList = async () => {
    await axiosPrivate
      .get("/api/admin/branch/list")
      .then((res) => {
        console.log(">>>>get list branch", res.data);
        // setBranchList(res.data);
        let data = res.data;
        setBranchList([...branchList, ...data]);
        setModalBranchList(data);
      })
      .catch((err) => {
        console.log("get list hub branch", err);

        navigate("/login", { state: { from: location }, replace: true });
      });
  };

  /**
   * delete hub
   */
  const confirmDeleteHub = async () => {
    console.log(">>>comfirm delete", editingId);

    setFormLoading(true);

    await axiosPrivate
      .delete(`/api/admin/hub/${editingId}`)
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
    // getUserManager();
    getUserDepartment();
  };

  const handleOkOnClick = methods.handleSubmit((data) => {
    //setModalText('The modal will be closed after two seconds');
    console.log(">>>>>>get branch value", branchValue);
    console.log(">>>>>>get user id value", staffDepartmentId);
    console.log(data);
    if (branchValue.length === 0) {
      toast.warning("Kiểm tra, chưa chọn chi nhánh");
      return;
    }

    if (staffDepartmentId.length === 0) {
      toast.warning("Kiểm tra, chưa chọn người phụ trách");
      return;
    }

    if (staffManagerId.length === 0) {
      toast.warning("Kiểm tra, chưa chọn quản lý phòng máy");
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
      .post(`/api/admin/hub/${editingId}`, {
        hubName,
        hubAddress,
        hubCity,
        hubManagerName,
        hubManagerPhone,
      })
      .then((res) => {
        console.log(">>>>>>>> save edit ", res.data);
        updateData();

        setFormLoading(false);
        toast.success("Cập nhật thành công");
        tableMethods.reset();
        setEditing(false);
        setEditingId("");
      })
      .catch((err) => {
        setFormLoading(false);
        toast.success("Cập nhật thất bại");
      });
  };

  const updateData = async () => {
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
    setDataSource(updateHubArray);
  };

  const addNewHub = async (record) => {
    setIsLoading(true);
    await axiosPrivate
      .post("/api/admin/hub", {
        hubId: record.hubId,
        staffManagerId: staffManagerId,
        staffDepartmentId: staffDepartmentId,
        branchId: branchValue,
        hubName: record.hubName,
        hubAddress: record.hubAddress,
        hubCity: record.hubCity,
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
      .get(`/api/admin/hub/branch/${branchId}`)
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
   * get list user department
   */
  const getUserDepartment = async () => {
    setFormLoading(true);
    methods.reset();
    await axiosPrivate
      .get(`/api/admin/users/department/selectoption/role/4`)
      .then((res) => {
        console.log(">>>>get list user department", res.data);
        setListUserDepartment(res.data);
        setOpenModal(true);
        setFormLoading(false);
      })
      .catch((err) => {
        console.log("get list user department error", err);
        setFormLoading(false);
        navigate("/login", { state: { from: location }, replace: true });
      });
  };

  /**
   * get list user manager
   */
  const getUserManager = async (branchId) => {
    setFormLoading(true);
    methods.reset();
    await axiosPrivate
      .get(`/api/admin/users/manager/branch/${branchId}/selectoption/role/2`)
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

  /**
   * open modal switch branch
   */
  const openModalSwitchBranch = (hubId, hubName) => {
    setIsOpen(true);
    setHubId(hubId);
    setModalTitle("Chuyển hub " + hubName + " đến Chi Nhánh khác");
  };

  function handleModalCancelOnClick() {
    setIsOpen(false);
    setHubId("");
    formSwitchBranch.resetFields();
  }

  const handleModalSubmitOnClick = (values) => {
    setFormLoading(true);
    console.log("submit branch ", values);
    setSwitchHubToBranch(values);
  };

  /**
   * set switch hub to branch
   */
  const setSwitchHubToBranch = async (values) => {
    await axiosPrivate
      .post("/api/admin/hub/switch/branch", {
        branchId: values.branchId,
        hubId: hubId,
      })
      .then((res) => {
        console.log(">>>>> switch hub to branch", res.data);
        let result = res.data;
        if (result.status === 100) {
          updateHubDataSource(result.hubResponse, hubId);
          toast.success("Chuyển thành công");
          formSwitchBranch.resetFields();
        } else {
          toast.warning("Không thể chuyển");
        }

        setIsOpen(false);
        setFormLoading(false);
      })
      .catch((err) => {
        console.log(">>>>> add new hub error", err);
        toast.error("Lỗi. Không thể chuyển");
        setFormLoading(false);
      });
  };

  /**
   * update data source maintenance history
   */
  const updateHubDataSource = (response, hubId) => {
    const updateHubArray = dataSource.map((hub) => {
      if (hub.hubId === hubId) {
        return {
          ...hub,
          branchName: response.branchResponse.branchName,
          hubManagerName: response.hubManagerName,
          hubManagerPhone: response.hubManagerPhone,
        };
      } else {
        return hub;
      }
    });
    setDataSource(updateHubArray);
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
              if (e === "all") {
                loadData();
              } else {
                getHubByBranch(value.value);
                setBranchValue(value.value);
              }
            }}
            options={branchList}
            value={allSelectItem.value}
          />

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
                  dataIndex: "hubId",
                  key: "hubId",
                  filteredValue: [searchedText],
                  onFilter: (value, record) => {
                    return (
                      String(record.hubId)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      String(record.hubName)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      String(record.hubManagerName)
                        .toLowerCase()
                        .includes(value.toLowerCase())
                    );
                  },
                },
                {
                  title: "Phòng máy",
                  dataIndex: "hubName",
                  key: "hubName",

                  // render: (text, record) => {
                  //   return record.hubId === editingId && editing ? (
                  //     <InputCustom
                  //       {...hubName_validation}
                  //       className="inputEditCell"
                  //       onChange={onInputChange}
                  //       value={hubName}
                  //     />
                  //   ) : (
                  //     text
                  //   );
                  // },
                },
                {
                  title: "Địa chỉ",
                  dataIndex: "hubAddress",
                  key: "hubAddress",
                  // render: (text, record) => {
                  //   return record.hubId === editingId && editing ? (
                  //     <InputCustom
                  //       {...hubAddress_validation}
                  //       className="inputEditCell"
                  //       onChange={(e) => {
                  //         setHubAddress(e.target.value);
                  //       }}
                  //       value={hubAddress}
                  //     />
                  //   ) : (
                  //     text
                  //   );
                  // },
                },
                {
                  title: "Tỉnh/Thành phố",
                  dataIndex: "hubCity",
                  key: "hubCity",
                  // render: (text, record) => {
                  //   return record.hubId === editingId && editing ? (
                  //     <InputCustom
                  //       {...hubCity_validation}
                  //       className="inputEditCell"
                  //       onChange={(e) => {
                  //         setHubCity(e.target.value);
                  //       }}
                  //       value={hubCity}
                  //     />
                  //   ) : (
                  //     text
                  //   );
                  // },
                },
                {
                  title: "Chi nhánh",
                  dataIndex: "branchName",
                  key: "branchName",
                },
                {
                  title: "Quản lý PM",
                  dataIndex: "hubManagerName",
                  key: "hubManagerName",
                  // render: (text, record) => {
                  //   return record.hubId === editingId && editing ? (
                  //     <InputCustom
                  //       {...hubManager_validation}
                  //       className="inputEditCell"
                  //       onChange={(e) => {
                  //         setHubManagerName(e.target.value);
                  //       }}
                  //       value={hubManagerName}
                  //     />
                  //   ) : (
                  //     text
                  //   );
                  // },
                },

                {
                  title: "SĐT quản lý PM",
                  dataIndex: "hubManagerPhone",
                  key: "hubManagerPhone",
                  // render: (text, record) => {
                  //   return record.hubId === editingId && editing ? (
                  //     <InputCustom
                  //       {...phone_validation}
                  //       className="inputEditCell"
                  //       onChange={(e) => {
                  //         setHubManagerPhone(e.target.value);
                  //       }}
                  //       value={hubManagerPhone}
                  //     />
                  //   ) : (
                  //     text
                  //   );
                  // },
                },

                {
                  title: "Người phụ trách",
                  dataIndex: "departmentName",
                  key: "departmentName",
                },
                {
                  title: "SĐT",
                  dataIndex: "departmentPhone",
                  key: "departmentPhone",
                },
                {
                  title: "Action",
                  key: "hubId",
                  dataIndex: "hubId",
                  render: (text, record) => (
                    <>
                      {/* {editing && record.hubId === editingId ? (
                        <>
                          <button
                            className="btnUserEdit"
                            onClick={tableMethods.handleSubmit((data) => {
                              // const hubId = record.hubId;

                              handleSaveEditCell(data);
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
                      )} */}
                      <Link to={"/admin/hub/" + record.hubId}>
                        <EditOutlined className="buttonViewCell" />
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
                          className="buttonDeleteCell"
                          onClick={() => handleDeleteHubOnClick(record)}
                        />
                      </Popconfirm>
                      <ApartmentOutlined
                        className="buttonSwitchToBranch"
                        onClick={() =>
                          openModalSwitchBranch(record.hubId, record.hubName)
                        }
                        title="Chuyển Hub đến Chi Nhánh khác"
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
        branchValue={branchValue}
        branchList={modalBranchList}
        listUserManager={listUserManager}
        listUserDepartment={listUserDepartment}
        setBranchValue={setBranchValue}
        getUserManager={getUserManager}
        staffDepartmentId={staffDepartmentId}
        setStaffDepartmentId={setStaffDepartmentId}
        staffManagerId={staffManagerId}
        setStaffManagerId={setStaffManagerId}
      />
      <ModalSwitchBranch
        isOpen={isOpen}
        isLoading={isLoading}
        modalTitle={modalTitle}
        branchList={modalBranchList}
        formSwitchBranch={formSwitchBranch}
        handleModalCancelOnClick={handleModalCancelOnClick}
        handleModalSubmitOnClick={handleModalSubmitOnClick}
      />

      {formLoading && <SpanLoading />}
    </>
  );
}

export default ListHub;
