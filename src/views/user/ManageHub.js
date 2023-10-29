import React, { useEffect, useState, Fragment } from "react";
import "./Home.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm, message } from "antd";
import ModalEditCellDevice from "./ModalEditCellDevice";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useContext } from "react";
import { Button, Modal, Form, Input } from "antd";
import { AuthContext } from "../../context/AuthProvider";
import SpanLoading from "../../components/loading/SpanLoading";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ModalViewHistory from "./ModalViewHistory";

function ManageHub() {
  const { setAuth } = useContext(AuthContext);
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
  const [ratedPower, setRatePower] = useState("");
  const [loadDuringPowerOutage, setLoadDuringPowerOutage] = useState("");
  const [batteryQuantity, setBatteryQuantity] = useState("");
  const [batteryNumber, setBatteryNumber] = useState("");
  const [batteryCapacity, setBatteryCapacity] = useState("");
  const [productionTime, setProductionTime] = useState("");
  const [conductorType, setConductorType] = useState("");
  const [cbPower, setCBPower] = useState("");
  const [schneider, setSchneider] = useState("");
  const [yearInstall, setYearInstall] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");
  const [number, setNumber] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setFormLoading(true);
    await axiosPrivate
      .get("/api/hub/detail")
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
    // setRatePower(dataForm.ratedPower);
    // setLoadDuringPowerOutage(dataForm.loadDuringPowerOutage);
    // setBatteryQuantity(dataForm.batteryQuantity);
    // setBatteryNumber(dataForm.batteryNumber);
    // setBatteryCapacity(dataForm.batteryCapacity);
    // setProductionTime(dataForm.productionTime);
    // setConductorType(dataForm.conductorType);
    // setCBPower(dataForm.cbPower);
    // setSchneider(dataForm.schneider);
    // setYearInstall(dataForm.yearInstall);
    // setCurrentStatus(dataForm.currentStatus);
    // setNumber(dataForm.number);
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
      })
      .then((res) => {
        console.log(">>>>get list hub detail", res.data);
        let result = res.data;
        let index = updateCellTable();

        setDataSource(addArrayAfter(dataSource, index, result));

        form.resetFields();
        setOpen(false);
        setFormLoading(false);
      })
      .catch((err) => {
        console.log("get list hub detail error", err);
        setFormLoading(false);
        // navigate("/login", { state: { from: location }, replace: true });
      });
  };

  const updateCellTable = () => {
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
    setOpenHistory(true);
  };
  const handleHistorySubmit = (values) => {
    console.log(values);
    console.log("datepicker", datePickerHistory);

    addNewHistory(values);
  };

  const addNewHistory = async (record) => {
    setIsLoading(true);
    await axiosPrivate
      .post("/api/hub/device/maintenancehistory", {
        hubDetailId: hubDetailId,
        maintenanceTime: datePickerHistory,
        maintenanceNote: record.maintenanceNote,
      })
      .then((res) => {
        console.log(">>>>add new history", res.data);

        //update table
        updateData();

        console.log(">>>update data source", dataSource);
        message.success("Thêm mới thành công");
        form.resetFields();
        setOpenHistory(false);
        setDatePickerHistory("");
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
  const updateData = async () => {
    const updateHubDetailArray = dataSource.map((hubDetail) => {
      if (hubDetail.hubDetailId === hubDetailId) {
        return { ...hubDetail, latestMaintenanceTime: datePickerHistory };
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
          let data = dataSource;

          data = data.filter((item) => item.hubDetailId !== hubDetailId);
          setDataSource(data);
          message.success("Xóa thành công");
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

  const logout = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    setAuth({});
    navigate("/linkpage");
  };

  let namesArr = {};
  let names = {};
  let clos = {};
  let nameTableTitle = {};
  let cellTableTitle = {};

  const rowSpan = dataSource.reduce((result, item, key) => {
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

  return (
    <>
      <div className="container">
        <h4>Home page</h4>

        <br />
        <p>You are logged in!</p>

        <div className="flexGrow">
          <button onClick={logout}>Sign Out</button>
        </div>
        <table className="tableDevice">
          <thead>
            <tr>
              <th style={{ width: "45px" }}>Mã Hub</th>
              <th style={{ width: "45px" }}>Phòng máy</th>
              <th style={{ width: "45px" }}>Quản lý PM</th>
              <th style={{ width: "50px" }}>SĐT quản lý PM</th>
              <th style={{ width: "45px" }}>Nhân sự chuyên trách </th>
              <th style={{ width: "45px" }}>Tên TB</th>
              <th style={{ width: "50px" }}>Thương hiệu</th>
              <th style={{ width: "40px" }}>CS định mức (KVA)</th>
              <th style={{ width: "40px" }}>%Tải khi mất điện</th>
              <th style={{ width: "40px" }}>Số bình/ Chuỗi hiện tại</th>
              <th style={{ width: "40px" }}>Số chuỗi Battery hiện tại</th>
              <th style={{ width: "60px" }}>Model (dung lượng AH)</th>
              <th style={{ width: "70px" }}>Ngày sản xuất</th>
              <th style={{ width: "50px" }}>Dây dẫn</th>
              <th style={{ width: "45px" }}>CB nguồn</th>
              <th style={{ width: "40px" }}>Cắt lọc sét</th>
              <th style={{ width: "70px" }}>Năm lắp đặt HTĐ</th>
              <th style={{ width: "70px" }}>Số lượng</th>
              <th style={{ width: "50px" }}>Hiện trạng</th>
              <th style={{ width: "70px" }}>
                Ngày bảo dưỡng, bảo trì gần nhất
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataSource.map((el, index) => (
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
                      <td rowSpan={rowSpan[index]}>{el.hubId}</td>

                      <td rowSpan={rowSpan[index]}>{el.hubAddress}</td>
                      <td rowSpan={rowSpan[index]}>{el.hubManagerName}</td>
                      <td rowSpan={rowSpan[index]}>{el.hubManagerPhone}</td>
                      <td rowSpan={rowSpan[index]}>{el.fullname}</td>
                    </>
                  )}
                  {clos[index] > 0 && (
                    <td
                      style={{ background: "#" + el.backgroundColor }}
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

                  <td style={{ background: "#" + el.backgroundColor }}>
                    {el.trademark}
                  </td>
                  <td style={{ background: "#" + el.backgroundColor }}>
                    {el.ratedPower}
                  </td>
                  <td style={{ background: "#" + el.backgroundColor }}>
                    {el.loadDuringPowerOutage}
                  </td>
                  <td style={{ background: "#" + el.backgroundColor }}>
                    {el.batteryQuantity}
                  </td>
                  <td style={{ background: "#" + el.backgroundColor }}>
                    {el.batteryNumber}
                  </td>
                  <td style={{ background: "#" + el.backgroundColor }}>
                    {el.batteryCapacity}
                  </td>
                  <td style={{ background: "#" + el.backgroundColor }}>
                    {el.productionTime}
                  </td>
                  <td style={{ background: "#" + el.backgroundColor }}>
                    {el.conductorType}
                  </td>
                  <td style={{ background: "#" + el.backgroundColor }}>
                    {el.cbPower}
                  </td>
                  <td style={{ background: "#" + el.backgroundColor }}>
                    {el.schneider}
                  </td>
                  <td style={{ background: "#" + el.backgroundColor }}>
                    {el.yearInstall}
                  </td>
                  <td style={{ background: "#" + el.backgroundColor }}>
                    {el.number}
                  </td>
                  <td style={{ background: "#" + el.backgroundColor }}>
                    {el.currentStatus}
                  </td>
                  <td style={{ background: "#" + el.backgroundColor }}>
                    <span
                      className="spanButton"
                      onClick={() => {
                        showModalHistory(el);
                      }}
                    >
                      {el.latestMaintenanceTime}
                    </span>
                  </td>
                  <td style={{ background: "#" + el.backgroundColor }}>
                    <Link to={"/manager/hub/device/" + el.hubDetailId}>
                      <EditOutlined className="buttonIconEdit" />
                    </Link>
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
                          console.log("Delete click", el.hubDetailId);
                        }}
                      />
                    </Popconfirm>
                  </td>
                </tr>
              </>
            ))}
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
            {/* <td>DUY</td> */}?{/* <td>BTE_BTE</td> */}
            {/* <td>Bến tre</td> */}
            {/* <td>Nguyễn Minh Luân</td> */}
            {/* <td>0901811307</td> */}
            {/* <td>DUY</td> */}?{/* <td>BTE_BTE</td> */}
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
        handleSubmit={handleSubmit}
        handleCancelOnClick={handleCancelOnClick}
        isLoading={isLoading}
        title={titleForm}
        ratedPower={ratedPower}
        setRatePower={setRatePower}
        loadDuringPowerOutage={loadDuringPowerOutage}
        setLoadDuringPowerOutage={setLoadDuringPowerOutage}
        batteryQuantity={batteryQuantity}
        setBatteryQuantity={setBatteryQuantity}
        batteryNumber={batteryNumber}
        setBatteryNumber={setBatteryNumber}
        batteryCapacity={batteryCapacity}
        setBatteryCapacity={setBatteryCapacity}
        productionTime={productionTime}
        setProductionTime={setProductionTime}
        conductorType={conductorType}
        setConductorType={setConductorType}
        cbPower={cbPower}
        setCBPower={setCBPower}
        schneider={schneider}
        setSchneider={setSchneider}
        yearInstall={yearInstall}
        setYearInstall={setYearInstall}
        currentStatus={currentStatus}
        setCurrentStatus={setCurrentStatus}
        number={number}
        setNumber={setNumber}
      />
      <ModalViewHistory
        open={openHistory}
        form={form}
        handleSubmit={handleHistorySubmit}
        handleCancelOnClick={handleHistoryCancelOnClick}
        isLoading={isLoading}
        setDatePickerHistory={setDatePickerHistory}
      />
      {formLoading && <SpanLoading />}
    </>
  );
}

export default ManageHub;
