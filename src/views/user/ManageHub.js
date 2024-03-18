import React, { useEffect, useState, Fragment } from "react";
import "./Home.css";
import {
  DeleteOutlined,
  EditOutlined,
  RetweetOutlined,
} from "@ant-design/icons";
import { Col, Popconfirm, Row, Space, message } from "antd";
import ModalEditCellDevice from "./ModalEditCellDevice";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useContext } from "react";
import { Button, Modal, Form, Input } from "antd";
import { AuthContext } from "../../context/AuthProvider";
import SpanLoading from "../../components/loading/SpanLoading";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ModalAddHistory from "./ModalAddHistory";
import useLogout from "../../hooks/useLogout";
import { toast } from "react-toastify";
import moment from "moment";
import SearchBar from "../../components/user/SearchBar";

const ManageHub = ({
  stompClient,
  userData,
  sendPrivateValue,
  actionStatus,
  receive,
}) => {
  const logout = useLogout();
  const { Search } = Input;
  const { auth, setAuth } = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  // const [formHistory] = Form.useForm();

  const methods = useForm();
  const [dataSource, setDataSource] = useState([]);

  const [open, setOpen] = useState(false);
  const [openHistory, setOpenHistory] = useState(false);
  const [datePickerHistory, setDatePickerHistory] = useState("");
  const [hubDetailId, setHubDetailId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [branchTitle, setBranchTitle] = useState("");

  //detail
  const [titleForm, setTitleForm] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [hubId, setHubId] = useState("");

  const [checkedOrderMaintenance, setCheckedOrderMaintenance] = useState(true);

  const [inputSearch, setInputSearch] = useState("");

  useEffect(() => {
    localStorage.getItem("isLogin") && loadData();

    //receive(stompClient, userData.receiverName);
  }, []);

  useEffect(() => {
    switch (actionStatus.action) {
      case "SWITCH_DEVICE":
      case "ADD_MAINTENANCE":
        pushActionMessage("GET_ALARM", "Get alarm");

        getDeviceSwitch(actionStatus.content);
        break;
      case "ADD_DEVICE":
      case "EDIT_DEVICE":
        getDeviceSwitch(actionStatus.content);
        break;
      case "DELETE_DEVICE":
        pushActionMessage("GET_ALARM", "Get alarm");
        // const dt = dataSource?.filter((item) => {
        //   return item.hubDetailId !== 749;
        // });
        // const dt = dataRemoveItem(dataSource, hubDetailId);
        setDataSource(dataRemoveItem(dataSource, actionStatus.content));
        break;
      default:
        break;
    }
  }, [actionStatus]);

  /**
   * get device had switch
   * @param {} detailId
   */
  const getDeviceSwitch = async (hubDetailId) => {
    await axiosPrivate
      .get(`/api/hub/manager/detail/${hubDetailId}`)
      .then((res) => {
        let result = res.data;
        console.log(">>>>>>>>>data get device", result);
        // const dt = dataSource.filter((item) => {
        //   return item.hubDetailId !== hubDetailId;
        // });
        const dt = dataRemoveItem(dataSource, hubDetailId);
        setDataSource(dt);

        let index = updateCellTable(dt, result.hubId, result.deviceId);

        setDataSource(addArrayAfter(dt, index, result));
      })
      .catch((err) => {
        console.log("get list hub detail error", err);
      });
  };

  /**
   *
   * update data table when delete hubDetailId
   */
  const dataRemoveItem = (data, hubDetailId) => {
    return data.filter((item) => {
      return item.hubDetailId !== hubDetailId * 1;
    });
  };

  // const sendSocket = () => {
  //   console.log(">>>>>>>manager hub send socket", auth);
  //   let name = auth?.username;
  //   if (name === undefined) {
  //     name = localStorage.getItem("username");
  //   }
  //   var sendMessage = {
  //     senderName: name,
  //     receiverName: name,
  //     message: "",
  //     status: "MESSAGE",
  //     action: "EDIT_MAINTENANCE",
  //   };
  //   sendPrivateValue(stompClient, sendMessage);
  // };

  const pushActionMessage = (action, message) => {
    let senderName = auth?.username;
    if (senderName === undefined) {
      senderName = localStorage.getItem("username");
    }
    var sendMessage = {
      senderName: senderName,
      receiverName: senderName,
      message: message,
      status: "MESSAGE",
      action: action,
    };
    sendPrivateValue(stompClient, sendMessage);
  };

  const sendActionMessage = (receiverName, action, message, content) => {
    let senderName = auth?.username;
    if (senderName === undefined) {
      senderName = localStorage.getItem("username");
    }
    var sendMessage = {
      senderName: senderName,
      receiverName: receiverName,
      message: message,
      content: content,
      status: "MESSAGE",
      action: action,
    };
    sendPrivateValue(stompClient, sendMessage);
  };

  const loadData = async () => {
    setFormLoading(true);
    await axiosPrivate
      .get("/api/hub/manager/detail")
      .then((res) => {
        console.log(">>>>get list hub detail", res.data);
        setDataSource(res.data);
        setFormLoading(false);
      })
      .catch((err) => {
        console.log("get list hub detail error", err);
        setFormLoading(false);
        navigate("/login", { state: { from: location }, replace: true });
      });
  };

  const showModal = (dataForm) => {
    setFormLoading(true);
    setTitleForm(`Thêm mới ${dataForm.deviceName} cho Hub ${dataForm.hubName}`);
    setDeviceId(dataForm.deviceId);
    setHubId(dataForm.hubId);

    setTimeout(() => {
      setFormLoading(false);
      setOpen(true);
    }, 100);
  };

  const handleSubmit = (values) => {
    addNewDeviceHubDetail(values);
  };

  const addNewDeviceHubDetail = async (record) => {
    console.log(">>>>>send form", record);
    setFormLoading(true);
    await axiosPrivate
      .post("/api/hub/detail", {
        deviceId: deviceId,
        hubId: hubId,
        trademark: record.trademark,
        ratedPower: record.ratedPower,
        loadDuringPowerOutage: record.loadDuringPowerOutage,
        batteryQuantity: record.batteryQuantity,
        batteryNumber: record.batteryNumber,
        batteryCapacity: record.batteryCapacity,
        productionTime: record.productionTime,
        conductorType: record.conductorType,
        cbPower: record.cbPower,
        schneider: record.schneider,
        yearInstall: record.yearInstall,
        currentStatus: record.currentStatus,
        number: record.number,
        dateMaintenance: record.dateMaintenance,
        orderMaintenance: checkedOrderMaintenance,
      })
      .then((res) => {
        console.log(">>>>get list hub detail", res.data);
        let result = res.data;
        let index = updateCellTable(dataSource, hubId, deviceId);

        setDataSource(addArrayAfter(dataSource, index, result));
        // sendSocket();
        sendActionMessage(
          hubId,
          "ADD_DEVICE",
          "Thêm mới thiết bị hub",
          result.hubDetailId
        );
        form.resetFields();
        setOpen(false);
        setFormLoading(false);
        toast.success("Thêm mới thành công");
      })
      .catch((err) => {
        console.log("get list hub detail error", err);
        setFormLoading(false);
        toast.error("Thêm mới thất bại");
        // navigate("/login", { state: { from: location }, replace: true });
      });
  };

  const updateCellTable = (dataSource, hubId, deviceId) => {
    //  let index = -1;
    for (let i = 0; i < dataSource.length; i++) {
      if (
        dataSource[i].hubId === hubId &&
        dataSource[i].deviceId === deviceId
      ) {
        return i;
      }
    }
    // dataSource.map((hubDetail, index) => {
    //   if (hubDetail.hubId === hubId && hubDetail.deviceId === deviceId) {
    //     console.log("insite index", index);
    //     i = index;
    //     return index;
    //   }
    //   return -1;
    // });
    // return i;
    // setDataSource(update);
  };

  function addArrayAfter(array, index, newItem) {
    return [...array.slice(0, index), newItem, ...array.slice(index)];
  }

  const handleCancelOnClick = () => {
    console.log("Clicked cancel button");
    setOpen(false);
    form.resetFields();
  };

  const showModalHistory = (e) => {
    setHubDetailId(e.hubDetailId);
    setHubId(e.hubId);
    setOpenHistory(true);
  };
  const handleHistorySubmit = (values) => {
    console.log(values);
    console.log("datepicker", datePickerHistory);

    addNewHistory(values);
  };

  const addNewHistory = async (record) => {
    let formData = new FormData();
    formData.append("hubDetailId", hubDetailId);

    formData.append("maintenanceTime", datePickerHistory);

    formData.append("maintenanceNote", record.maintenanceNote);
    setIsLoading(true);
    await axiosPrivate
      .post("/api/hub/device/maintenancehistory", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        let result = res.data;

        if (result.status === 100) {
          //update table
          let hubDetailData = result.response.hubDetailResponse;
          updateData(hubDetailData);

          console.log(">>>update data source", dataSource);
          message.success("Thêm mới thành công");
          form.resetFields();
          // sendSocket();
          sendActionMessage(
            hubId,
            "ADD_MAINTENANCE",
            "Thêm mới lịch bảo dưỡng",
            hubDetailData.hubDetailId
          );
          setOpenHistory(false);
          setDatePickerHistory("");
        } else {
          message.warning(result.message);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("add new history error", err);
        setIsLoading(false);
        setOpenHistory(false);
        setDatePickerHistory("");
        // navigate("/login", { state: { from: location }, replace: true });
      });
  };

  //update dataSource after addNew history
  const updateData = async (res) => {
    // let dateMaintenance = res.dateMaintenance;
    var dateNow = moment().toDate();
    var dayChange = moment(datePickerHistory, "YYYY-MM-DD");
    let days = dayChange.diff(dateNow, "days") >= 0 ? 0 : 1;

    console.log(">>>>>>>>>>>>>>>>>date change", days);
    const updateHubDetailArray = dataSource.map((hubDetail) => {
      if (hubDetail.hubDetailId === hubDetailId) {
        return {
          ...hubDetail,
          latestMaintenanceTime: datePickerHistory,
          alarmMaintenanceStatus: days,
        };
      } else {
        return hubDetail;
      }
    });
    setDataSource(updateHubDetailArray);
  };

  const handleHistoryCancelOnClick = () => {
    console.log("Clicked cancel button");
    form.resetFields();
    setOpenHistory(false);
    setHubDetailId("");
  };

  const popConfirmDeleteDevice = async (e) => {
    console.log(">>>comfirm delete");
    setFormLoading(true);

    await axiosPrivate
      .delete(`/api/hub/detail/${hubDetailId}`)
      .then((res) => {
        console.log(">>>>delete hub detail", res.data);

        //update dataSource

        if (res.data) {
          setDataSource(dataRemoveItem(dataSource, hubDetailId));
          message.success("Xóa thành công");
          // sendSocket();
          sendActionMessage(
            hubId,
            "DELETE_DEVICE",
            "Xóa thiết bị khỏi hub",
            hubDetailId
          );
        } else {
          message.warning("Không thể xóa");
        }

        setIsLoading(false);
        setFormLoading(false);
      })
      .catch((err) => {
        console.log("add new history error", err);
        message.error("Không thể xóa");
        setIsLoading(false);
        setFormLoading(false);
        // navigate("/login", { state: { from: location }, replace: true });
      });
  };

  const cancel = (e) => {
    console.log(e);
    //message.error('Click on No');
  };

  const onSearch = (value, _e, info) => {
    console.log(info?.source, value);
    if (value && value.trim().length > 0) {
      getDataSearch(value);
    } else {
      loadData();
    }
  };
  const getDataSearch = async (value) => {
    setFormLoading(true);
    await axiosPrivate
      .get("/api/hub/manager/detail/search/" + value)
      .then((res) => {
        console.log(">>>>get list hub detail search", res.data);
        setDataSource(res.data);
        setFormLoading(false);
      })
      .catch((err) => {
        console.log("get list hub detail search error", err);
        setFormLoading(false);
        // navigate("/login", { state: { from: location }, replace: true });
      });
  };

  let namesArr = {};
  let names = {};
  let clos = {};
  let nameTableTitle = {};
  let cellTableTitle = {};

  const rowSpan =
    dataSource &&
    dataSource.reduce((result, item, key) => {
      if (namesArr[item.hubId] === undefined) {
        namesArr[item.hubId] = key;
        result[key] = 1;
        names[item.deviceName] = key;
        clos[key] = 1;
        nameTableTitle[item.branchId] = key;
        cellTableTitle[key] = 1;
      } else {
        const firstIndex = namesArr[item.hubId];
        const idex = names[item.deviceName];
        const iCell = nameTableTitle[item.branchId];

        if (item.branchId === dataSource[key - 1].branchId) {
          cellTableTitle[iCell]++;
          cellTableTitle[key] = 0;
        } else {
          cellTableTitle[key] = 1;
          nameTableTitle[item.branchId] = key;
        }

        if (
          firstIndex === key - 1 ||
          (item.hubId === dataSource[key - 1].hubId && result[key - 1] === 0)
        ) {
          result[firstIndex]++;
          result[key] = 0;
        } else {
          result[key] = 1;
          namesArr[item.hubId] = key;
        }

        if (
          idex === key - 1 ||
          (item.deviceName === dataSource[key - 1].deviceName &&
            clos[key - 1] === 0)
        ) {
          clos[idex]++;
          clos[key] = 0;
        } else {
          clos[key] = 1;
          names[item.deviceName] = key;
        }
      }

      return result;
    }, []);

  return localStorage.getItem("isLogin") ? (
    <>
      <div className="container">
        <h4>Thiết bị phòng hub</h4>
        <SearchBar
          onSearch={onSearch}
          inputSearch={inputSearch}
          setInputSearch={setInputSearch}
          loadData={loadData}
        />

        {/* <Row>
          <Col span={6}>
            <div className="mb-10 boxSearch">
              <label className="lblTitleSearch">Tìm kiếm</label>
              <Search
                placeholder="Nhập chi nhánh / phòng hub..."
                onSearch={onSearch}
                onChange={(e) => setInputSearch(e.target.value)}
                value={inputSearch}
                enterButton
              />
              <RetweetOutlined
                className="buttonIconRefresh"
                onClick={() => {
                  setInputSearch("");
                  loadData();
                }}
                title="Làm mới"
              />
            </div>
          </Col>
        </Row> */}
        <table id="tableDevice">
          <thead>
            <tr>
              <th style={{ width: "5%" }}>Mã Hub</th>
              <th style={{ width: "4%" }}>Phòng máy</th>
              <th style={{ width: "5%" }}>Quản lý PM</th>
              <th style={{ width: "5%" }}>SĐT quản lý PM</th>
              <th style={{ width: "5%" }}>Nhân sự chuyên trách </th>
              <th style={{ width: "6%" }}>Tên TB</th>
              <th style={{ width: "5%" }}>Thương hiệu</th>
              <th style={{ width: "3%" }}>CS định mức (KVA)</th>
              <th style={{ width: "3%" }}>%Tải khi mất điện</th>
              <th style={{ width: "3%" }}>Số bình/ Chuỗi hiện tại</th>
              <th style={{ width: "3%" }}>Số chuỗi Battery hiện tại</th>
              <th style={{ width: "5%" }}>Model (dung lượng AH)</th>
              <th style={{ width: "5%" }}>Ngày sản xuất</th>
              <th style={{ width: "5%" }}>Dây dẫn</th>
              <th style={{ width: "4%" }}>CB nguồn</th>
              <th style={{ width: "5%" }}>Cắt lọc sét</th>
              <th style={{ width: "5%" }}>Năm lắp đặt HTĐ</th>
              <th style={{ width: "7%" }}>Số lượng</th>
              <th style={{ width: "5%" }}>Hiện trạng</th>
              <th style={{ width: "6%" }}>Ngày bảo dưỡng, bảo trì gần nhất</th>
              <th style={{ width: "7%" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataSource && dataSource.length > 0 ? (
              dataSource.map((el, index) => (
                <>
                  {cellTableTitle[index] > 0 && (
                    <tr>
                      <th className="deviceTitle" colSpan={21}>
                        {el.branchName} ( {el.deputyTechnicalDirector}{" "}
                        {el.phoneDeputyTechnicalDirector})
                      </th>
                    </tr>
                  )}

                  <tr>
                    {rowSpan[index] > 0 && (
                      <>
                        <td rowSpan={rowSpan[index]} key={el.hubId}>
                          {el.hubId}
                        </td>

                        <td rowSpan={rowSpan[index]}>{el.hubName}</td>
                        <td rowSpan={rowSpan[index]}>{el.hubManagerName}</td>
                        <td rowSpan={rowSpan[index]}>{el.hubManagerPhone}</td>
                        <td rowSpan={rowSpan[index]}>{el.fullname}</td>
                      </>
                    )}
                    {clos[index] > 0 && (
                      <td
                        className={`b-${el.backgroundColor}`}
                        // style={{ background: "#" + el.backgroundColor }}
                        rowSpan={clos[index]}
                      >
                        <span
                          className="spanButton"
                          onClick={() => showModal(el)}
                        >
                          {el.deviceName}
                        </span>
                      </td>
                    )}

                    <td
                      className={`b-${
                        el.alarmMaintenanceStatus === 1 ? 1 : el.backgroundColor
                      }`}
                      // style={{
                      //   background:
                      //     el.alarmMaintenanceStatus === 0
                      //       ? "#" + el.backgroundColor
                      //       : "red",
                      // }}
                    >
                      {el.trademark}
                    </td>
                    <td
                      className={`b-${
                        el.alarmMaintenanceStatus === 1 ? 1 : el.backgroundColor
                      }`}
                      // style={{
                      //   background:
                      //     el.alarmMaintenanceStatus === 0
                      //       ? "#" + el.backgroundColor
                      //       : "red",
                      // }}
                    >
                      {el.ratedPower}
                    </td>
                    <td
                      className={`b-${
                        el.alarmMaintenanceStatus === 1 ? 1 : el.backgroundColor
                      }`}
                    >
                      {el.loadDuringPowerOutage}
                    </td>
                    <td
                      className={`b-${
                        el.alarmMaintenanceStatus === 1 ? 1 : el.backgroundColor
                      }`}
                    >
                      {el.batteryQuantity}
                    </td>
                    <td
                      className={`b-${
                        el.alarmMaintenanceStatus === 1 ? 1 : el.backgroundColor
                      }`}
                    >
                      {el.batteryNumber}
                    </td>
                    <td
                      className={`b-${
                        el.alarmMaintenanceStatus === 1 ? 1 : el.backgroundColor
                      }`}
                    >
                      {el.batteryCapacity}
                    </td>
                    <td
                      className={`b-${
                        el.alarmMaintenanceStatus === 1 ? 1 : el.backgroundColor
                      }`}
                    >
                      {el.productionTime}
                    </td>
                    <td
                      className={`b-${
                        el.alarmMaintenanceStatus === 1 ? 1 : el.backgroundColor
                      }`}
                    >
                      {el.conductorType}
                    </td>
                    <td
                      className={`b-${
                        el.alarmMaintenanceStatus === 1 ? 1 : el.backgroundColor
                      }`}
                    >
                      {el.cbPower}
                    </td>
                    <td
                      className={`b-${
                        el.alarmMaintenanceStatus === 1 ? 1 : el.backgroundColor
                      }`}
                    >
                      {el.schneider}
                    </td>
                    <td
                      className={`b-${
                        el.alarmMaintenanceStatus === 1 ? 1 : el.backgroundColor
                      }`}
                    >
                      {el.yearInstall}
                    </td>
                    <td
                      className={`b-${
                        el.alarmMaintenanceStatus === 1 ? 1 : el.backgroundColor
                      }`}
                    >
                      {el.number}
                    </td>
                    <td
                      className={`b-${
                        el.alarmMaintenanceStatus === 1 ? 1 : el.backgroundColor
                      }`}
                    >
                      {el.currentStatus}
                    </td>
                    <td
                      className={`b-${
                        el.alarmMaintenanceStatus === 1 ? 1 : el.backgroundColor
                      }`}
                    >
                      <span
                        className="spanButton"
                        onClick={() => {
                          showModalHistory(el);
                        }}
                      >
                        {el.latestMaintenanceTime}
                      </span>
                    </td>
                    <td
                      className={`b-${el.backgroundColor}`}
                      // style={{ background: "#" + el.backgroundColor }}
                    >
                      <Link
                        to={"/manager/hub/device/" + el.hubDetailId}
                        title="Xem chi tiết"
                      >
                        <EditOutlined className="buttonIconEdit" />
                      </Link>
                      {(auth.roles[0] === "ROLE_DEPARTMENT" ||
                        auth.roles[0] === "ROLE_BRANCH") && (
                        <Popconfirm
                          title="Alarm"
                          description="Bạn có chắc muốn xóa?"
                          placement="topRight"
                          onConfirm={popConfirmDeleteDevice}
                          onCancel={cancel}
                          okText="Yes"
                          cancelText="No"
                        >
                          <DeleteOutlined
                            className="buttonIconDelete"
                            onClick={() => {
                              setHubDetailId(el.hubDetailId);
                              setHubId(el.hubId);
                            }}
                          />
                        </Popconfirm>
                      )}
                    </td>
                  </tr>
                </>
              ))
            ) : (
              <tr>
                <td colSpan={21} className="noData" style={{ fontSize: 24 }}>
                  No data
                </td>
              </tr>
            )}
            {/* <tr> */}
            {/* <td>BTE_BTE</td> */}
            {/* <td>Bến tre</td> */}
            {/* <td>Nguyễn Minh Luân</td> */}
            {/* <td>0901811307</td> */}
            {/* <td>DUY</td> */}
            {/* <td rowSpan={2}>UPS</td> */}
            {/* <td className="UPS">Socomec</td>
              <td className="UPS">6</td>
              <td className="UPS">12%</td>
              <td className="UPS">20</td>
              <td className="UPS">1</td>
              <td className="UPS"></td>
              <td className="UPS"></td>
              <td className="UPS"></td>
              <td className="UPS"></td>
              <td className="UPS"></td>
              <td className="UPS"></td>
              <td className="UPS"></td>
              <td className="UPS"></td>
              <td className="UPS"></td>
              <td className="UPS">Sửa Xóa</td>
            </tr>
            <tr> */}
            {/* <td>BTE_BTE</td> */}
            {/* <td>Bến tre</td> */}
            {/* <td>Nguyễn Minh Luân</td> */}
            {/* <td>0901811307</td> */}
            {/* <td>DUY</td> */}
            {/* <td className="B-UPS" rowSpan={2}>
                Battery_UPS
              </td>
              <td className="B-UPS">LONG</td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS">WP26-12N</td>
              <td className="B-UPS">2019</td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS">Sửa Xóa</td>
            </tr>
            <tr> */}
            {/* <td>BTE_BTE</td> */}
            {/* <td>Bến tre</td> */}
            {/* <td>Nguyễn Minh Luân</td> */}
            {/* <td>0901811307</td> */}
            {/* <td>DUY</td> */}
            {/* <td rowSpan={2}>Battery_UPS</td> */}
            {/* <td className="B-UPS">Saite/Vietname</td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS">26AH</td>
              <td className="B-UPS">2021</td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS">Sửa Xóa</td>
            </tr>
            <tr> */}
            {/* <td>BTE_BTE</td> */}
            {/* <td>Bến tre</td> */}
            {/* <td>Nguyễn Minh Luân</td> */}
            {/* <td>0901811307</td> */}
            {/* <td>DUY</td> */}
            {/* <td className="MPD" rowSpan={1}>
                Máy phát điện
              </td>
              <td className="MPD">Sử dụng chung với đài truyền hình</td>

              <td className="MPD"></td>
              <td className="MPD"></td>
              <td className="MPD"></td>
              <td className="MPD"></td>
              <td className="MPD"></td>
              <td className="MPD"></td>
              <td className="MPD"></td>
              <td className="MPD"></td>
              <td className="MPD"></td>
              <td className="MPD"></td>
              <td className="MPD"></td>
              <td className="MPD"></td>
              <td className="MPD"></td>
              <td className="MPD">Sửa Xóa</td>
            </tr>
            <tr> */}
            {/* <td>BTE_BTE</td> */}
            {/* <td>Bến tre</td> */}
            {/* <td>Nguyễn Minh Luân</td> */}
            {/* <td>0901811307</td> */}
            {/* <td>DUY</td> */}
            {/* <td className="TD" rowSpan={1}>
                Tủ điện
              </td>
              <td className="TD"></td>
              <td className="TD"></td>
              <td className="TD"></td>
              <td className="TD"></td>
              <td className="TD"></td>
              <td className="TD"></td>
              <td className="TD"></td>
              <td className="TD">4,0mm2</td>
              <td className="TD">32A</td>
              <td className="TD"></td>
              <td className="TD"></td>
              <td className="TD"></td>
              <td className="TD"></td>
              <td className="TD"></td>
              <td className="TD">Sửa Xóa</td>
            </tr>
            <tr> */}
            {/* <td>BTE_BTE</td> */}
            {/* <td>Bến tre</td> */}
            {/* <td>Nguyễn Minh Luân</td> */}
            {/* <td>0901811307</td> */}
            {/* <td>DUY</td> */}
            {/* <td className="ML" rowSpan={1}>
                Máy lạnh
              </td>
              <td className="ML"></td>
              <td className="ML"></td>
              <td className="ML"></td>
              <td className="ML"></td>
              <td className="ML"></td>
              <td className="ML"></td>
              <td className="ML"></td>
              <td className="ML"></td>
              <td className="ML"></td>
              <td className="ML"></td>
              <td className="ML">2 máy 1,5HP</td>
              <td className="ML"></td>
              <td className="ML"></td>
              <td className="ML"></td>
              <td className="ML">Sửa Xóa</td>
            </tr>

            <tr>
              <td rowSpan={7}>BTE_BTE</td>
              <td rowSpan={7}>Bến tre</td>
              <td rowSpan={7}>Nguyễn Minh Luân</td>
              <td rowSpan={7}>0901811307</td>
              <td rowSpan={7}>DUY</td>
              <td className="UPS" rowSpan={2}>
                UPS
              </td>
              <td className="UPS">Dale</td>
              <td className="UPS">3</td>
              <td className="UPS">64%</td>
              <td className="UPS">18</td>
              <td className="UPS">1</td>
              <td className="UPS"></td>
              <td className="UPS"></td>
              <td className="UPS"></td>
              <td className="UPS"></td>
              <td className="UPS"></td>
              <td className="UPS"></td>
              <td className="UPS"></td>
              <td className="UPS"></td>
              <td className="UPS"></td>
              <td className="UPS">Sửa Xóa</td>
            </tr>
            <tr> */}
            {/* <td>BTE_BTE</td> */}
            {/* <td>Bến tre</td> */}
            {/* <td>Nguyễn Minh Luân</td> */}
            {/* <td>0901811307</td> */}
            {/* <td>DUY</td> */}
            {/* <td rowSpan={2}>UPS</td> */}
            {/* <td className="UPS">Socomec</td>
              <td className="UPS">6</td>
              <td className="UPS">12%</td>
              <td className="UPS">20</td>
              <td className="UPS">1</td>
              <td className="UPS"></td>
              <td className="UPS"></td>
              <td className="UPS"></td>
              <td className="UPS"></td>
              <td className="UPS"></td>
              <td className="UPS"></td>
              <td className="UPS"></td>
              <td className="UPS"></td>
              <td className="UPS"></td>
              <td className="UPS">Sửa Xóa</td>
            </tr>
            <tr> */}
            {/* <td>BTE_BTE</td> */}
            {/* <td>Bến tre</td> */}
            {/* <td>Nguyễn Minh Luân</td> */}
            {/* <td>0901811307</td> */}
            {/* <td>DUY</td> */}
            {/* <td className="B-UPS" rowSpan={2}>
                Battery_UPS
              </td>
              <td className="B-UPS">LONG</td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS">WP26-12N</td>
              <td className="B-UPS">2019</td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS">Sửa Xóa</td>
            </tr>
            <tr> */}
            {/* <td>BTE_BTE</td> */}
            {/* <td>Bến tre</td> */}
            {/* <td>Nguyễn Minh Luân</td> */}
            {/* <td>0901811307</td> */}
            {/* <td>DUY</td> */}
            {/* <td rowSpan={2}>Battery_UPS</td> */}
            {/* <td className="B-UPS">Saite/Vietname</td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS">26AH</td>
              <td className="B-UPS">2021</td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS">Sửa Xóa</td>
            </tr>
            <tr> */}
            {/* <td>BTE_BTE</td> */}
            {/* <td>Bến tre</td> */}
            {/* <td>Nguyễn Minh Luân</td> */}
            {/* <td>0901811307</td> */}
            {/* <td>DUY</td> */}
            {/* <td className="MPD" rowSpan={1}>
                Máy phát điện
              </td>
              <td className="MPD">Sử dụng chung với đài truyền hình</td>

              <td className="MPD"></td>
              <td className="MPD"></td>
              <td className="MPD"></td>
              <td className="MPD"></td>
              <td className="MPD"></td>
              <td className="MPD"></td>
              <td className="MPD"></td>
              <td className="MPD"></td>
              <td className="MPD"></td>
              <td className="MPD"></td>
              <td className="MPD"></td>
              <td className="MPD"></td>
              <td className="MPD"></td>
              <td className="MPD">Sửa Xóa</td>
            </tr>
            <tr> */}
            {/* <td>BTE_BTE</td> */}
            {/* <td>Bến tre</td> */}
            {/* <td>Nguyễn Minh Luân</td> */}
            {/* <td>0901811307</td> */}
            {/* <td>DUY</td> */}
            {/* <td className="TD" rowSpan={1}>
                Tủ điện
              </td>
              <td className="TD"></td>
              <td className="TD"></td>
              <td className="TD"></td>
              <td className="TD"></td>
              <td className="TD"></td>
              <td className="TD"></td>
              <td className="TD"></td>
              <td className="TD">4,0mm2</td>
              <td className="TD">32A</td>
              <td className="TD"></td>
              <td className="TD"></td>
              <td className="TD"></td>
              <td className="TD"></td>
              <td className="TD"></td>
              <td className="TD">Sửa Xóa</td>
            </tr>
            <tr> */}
            {/* <td>BTE_BTE</td> */}
            {/* <td>Bến tre</td> */}
            {/* <td>Nguyễn Minh Luân</td> */}
            {/* <td>0901811307</td> */}
            {/* <td>DUY</td> */}
            {/* <td className="ML" rowSpan={1}>
                Máy lạnh
              </td>
              <td className="ML"></td>
              <td className="ML"></td>
              <td className="ML"></td>
              <td className="ML"></td>
              <td className="ML"></td>
              <td className="ML"></td>
              <td className="ML"></td>
              <td className="ML"></td>
              <td className="ML"></td>
              <td className="ML"></td>
              <td className="ML">2 máy 1,5HP</td>
              <td className="ML"></td>
              <td className="ML"></td>
              <td className="ML"></td>
              <td className="ML">Sửa Xóa</td>
            </tr>

            <tr>
              <td rowSpan={7}>BTE_BTE</td>
              <td rowSpan={7}>Bến tre</td>
              <td rowSpan={7}>Nguyễn Minh Luân</td>
              <td rowSpan={7}>0901811307</td>
              <td rowSpan={7}>DUY</td>
              <td className="UPS" rowSpan={2}>
                UPS
              </td>
              <td className="UPS">Dale</td>
              <td className="UPS">3</td>
              <td className="UPS">64%</td>
              <td className="UPS">18</td>
              <td className="UPS">1</td>
              <td className="UPS"></td>
              <td className="UPS"></td>
              <td className="UPS"></td>
              <td className="UPS"></td>
              <td className="UPS"></td>
              <td className="UPS"></td>
              <td className="UPS"></td>
              <td className="UPS"></td>
              <td className="UPS"></td>
              <td className="UPS">Sửa Xóa</td>
            </tr>
            <tr> */}
            {/* <td>BTE_BTE</td> */}
            {/* <td>Bến tre</td> */}
            {/* <td>Nguyễn Minh Luân</td> */}
            {/* <td>0901811307</td> */}
            {/* <td>DUY</td> */}
            {/* <td rowSpan={2}>UPS</td> */}
            {/* <td className="UPS">Socomec</td>
              <td className="UPS">6</td>
              <td className="UPS">12%</td>
              <td className="UPS">20</td>
              <td className="UPS">1</td>
              <td className="UPS"></td>
              <td className="UPS"></td>
              <td className="UPS"></td>
              <td className="UPS"></td>
              <td className="UPS"></td>
              <td className="UPS"></td>
              <td className="UPS"></td>
              <td className="UPS"></td>
              <td className="UPS"></td>
              <td className="UPS">Sửa Xóa</td>
            </tr>
            <tr> */}
            {/* <td>BTE_BTE</td> */}
            {/* <td>Bến tre</td> */}
            {/* <td>Nguyễn Minh Luân</td> */}
            {/* <td>0901811307</td> */}
            {/* <td>DUY</td> */}
            {/* <td className="B-UPS" rowSpan={2}>
                Battery_UPS
              </td>
              <td className="B-UPS">LONG</td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS">WP26-12N</td>
              <td className="B-UPS">2019</td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS">Sửa Xóa</td>
            </tr>
            <tr> */}
            {/* <td>BTE_BTE</td> */}
            {/* <td>Bến tre</td> */}
            {/* <td>Nguyễn Minh Luân</td> */}
            {/* <td>0901811307</td> */}
            {/* <td>DUY</td> */}
            {/* <td rowSpan={2}>Battery_UPS</td> */}
            {/* <td className="B-UPS">Saite/Vietname</td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS">26AH</td>
              <td className="B-UPS">2021</td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS"></td>
              <td className="B-UPS">Sửa Xóa</td>
            </tr>
            <tr> */}
            {/* <td>BTE_BTE</td> */}
            {/* <td>Bến tre</td> */}
            {/* <td>Nguyễn Minh Luân</td> */}
            {/* <td>0901811307</td> */}
            {/* <td>DUY</td> */}
            {/* <td>BTE_BTE</td> */}
            {/* <td>Bến tre</td> */}
            {/* <td>Nguyễn Minh Luân</td> */}
            {/* <td>0901811307</td> */}
            {/* <td>DUY</td> */}
            {/* <td>BTE_BTE</td> */}
            {/* <td>Bến tre</td> */}
            {/* <td>Nguyễn Minh Luân</td> */}
            {/* <td>0901811307</td> */}
            {/* <td>DUY</td> */}
            {/* <td className="ML" rowSpan={1}>
                Máy lạnh
              </td>
              <td className="ML"></td>
              <td className="ML"></td>
              <td className="ML"></td>
              <td className="ML"></td>
              <td className="ML"></td>
              <td className="ML"></td>
              <td className="ML"></td>
              <td className="ML"></td>
              <td className="ML"></td>
              <td className="ML"></td>
              <td className="ML">2 máy 1,5HP</td>
              <td className="ML"></td>
              <td className="ML"></td>
              <td className="ML"></td>
              <td className="ML">Sửa Xóa</td>
            </tr> */}
          </tbody>
        </table>
      </div>
      <ModalEditCellDevice
        open={open}
        form={form}
        deviceType={deviceId}
        checked={checkedOrderMaintenance}
        setChecked={setCheckedOrderMaintenance}
        handleSubmit={handleSubmit}
        handleCancelOnClick={handleCancelOnClick}
        isLoading={isLoading}
        title={titleForm}
      />
      <ModalAddHistory
        open={openHistory}
        form={form}
        handleSubmit={handleHistorySubmit}
        handleCancelOnClick={handleHistoryCancelOnClick}
        isLoading={isLoading}
        setDatePickerHistory={setDatePickerHistory}
      />
      {formLoading && <SpanLoading />}
    </>
  ) : (
    <div>
      Bạn cần <a href="/login"> đăng nhập</a>
    </div>
  );
};

export default ManageHub;
