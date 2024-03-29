import React, { useEffect, useState } from "react";
import "./Home.css";
import {
  DeleteOutlined,
  EditOutlined,
  RetweetOutlined,
} from "@ant-design/icons";
import { Popconfirm, Space, message, Input, Row, Col } from "antd";
import ModalEditCellDevice from "./ModalEditCellDevice";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate, Link, useLocation } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ModalViewHistory from "./ModalViewHistory";
import SpanLoading from "../../components/loading/SpanLoading";
import SearchBar from "../../components/user/SearchBar";

const Home = () => {
  const { Search } = Input;
  const logout = useLogout();
  const navigate = useNavigate();

  const location = useLocation();
  const { auth, setAuth } = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate();

  const methods = useForm();
  const [dataSource, setDataSource] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isExist, setIsExist] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [dataViewHistory, setDataViewHistory] = useState([]);
  const [dateMaintenance, setDateMaintenance] = useState("");
  const [inputSearch, setInputSearch] = useState("");

  useEffect(() => {
    localStorage.getItem("isLogin") && loadData();
  }, []);

  const loadData = async () => {
    let role = auth?.roles;

    let api = "/api/user/hub/detail";
    /*
    if (
      role[0] !== "ROLE_USER" &&
      role[0] !== "ROLE_EDITOR" &&
      role[0] !== "ROLE_DEPARTMENT_1"
    ) {
      api = "/api/hub/manager/detail";
    }
    */
    setFormLoading(true);
    await axiosPrivate
      // .get("/api/user/hub/detail")
      .get(api)
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

  const handleCancelOnClick = () => {
    console.log("Clicked cancel button");
    setOpen(false);
    console.log(">>>check open", open);
  };

  const showModalHistory = (record) => {
    console.log(record);
    setIsLoading(true);
    setDateMaintenance(record.dateMaintenance);
    var obj = [...record.maintenanceHistories];
    obj.sort((a, b) => b.maintenanseId - a.maintenanseId);

    setDataViewHistory(obj);
    setIsLoading(false);
    setOpen(true);
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
    let role = auth?.roles;

    let api = "/api/hub/detail/search/";
    /*
    if (
      role[0] !== "ROLE_USER" &&
      role[0] !== "ROLE_ADMIN" &&
      role[0] !== "ROLE_EDITOR" &&
      role[0] !== "ROLE_DEPARTMENT_1"
    ) {
      api = "/api/hub/manager/detail/search/";
    }
    */
    setFormLoading(true);
    await axiosPrivate
      // .get("/api/hub/detail/search/" + value)
      .get(api + value)
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

  return localStorage.getItem("isLogin") ? (
    <>
      <div className="container">
        <h4>Trang chủ</h4>

        <SearchBar
          onSearch={onSearch}
          inputSearch={inputSearch}
          setInputSearch={setInputSearch}
          loadData={loadData}
        />
        {/* <Row className="fix-search">
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
              <th style={{ width: "5%" }}>Dây dẫn (mm2)</th>
              <th style={{ width: "4%" }}>CB nguồn (A)</th>
              <th style={{ width: "3%" }}>Dòng tải mỗi pha (A)</th>
              <th style={{ width: "6%" }}>Mắc nối tiếp/ song song</th>
              <th style={{ width: "4%" }}>Điện trở đất</th>
              <th style={{ width: "5%" }}>Năm lắp đặt</th>

              <th style={{ width: "5%" }}>Hiện trạng</th>
              <th style={{ width: "6%" }}>Ngày bảo dưỡng, bảo trì gần nhất</th>
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
                        rowSpan={clos[index]}
                      >
                        {el.deviceName}
                      </td>
                    )}

                    <td
                      className={`b-${
                        el.trademark === null ? "Gray" : el.backgroundColor
                      }`}
                    >
                      {el.trademark === "null" ? "" : el.trademark}
                    </td>
                    <td
                      className={`b-${
                        el.ratedPower === null ? "Gray" : el.backgroundColor
                      }`}
                    >
                      {el.ratedPower === "null" ? "" : el.ratedPower}
                    </td>
                    <td
                      className={`b-${
                        el.loadDuringPowerOutage === null
                          ? "Gray"
                          : el.backgroundColor
                      }`}
                    >
                      {el.loadDuringPowerOutage === "null"
                        ? ""
                        : el.loadDuringPowerOutage}
                    </td>
                    <td
                      className={`b-${
                        el.batteryQuantity === null
                          ? "Gray"
                          : el.backgroundColor
                      }`}
                    >
                      {el.batteryQuantity === "null" ? "" : el.batteryQuantity}
                    </td>
                    <td
                      className={`b-${
                        el.batteryNumber === null ? "Gray" : el.backgroundColor
                      }`}
                    >
                      {el.batteryNumber === "null" ? "" : el.batteryNumber}
                    </td>
                    <td
                      className={`b-${
                        el.batteryCapacity === null
                          ? "Gray"
                          : el.backgroundColor
                      }`}
                    >
                      {el.batteryCapacity === "null" ? "" : el.batteryCapacity}
                    </td>
                    <td
                      className={`b-${
                        el.productionTime === null ? "Gray" : el.backgroundColor
                      }`}
                    >
                      {el.productionTime === "null" ? "" : el.productionTime}
                    </td>
                    <td
                      className={`b-${
                        el.conductorType === null ? "Gray" : el.backgroundColor
                      }`}
                    >
                      {el.conductorType === "null" ? "" : el.conductorType}
                    </td>
                    <td
                      className={`b-${
                        el.cbPower === null ? "Gray" : el.backgroundColor
                      }`}
                    >
                      {el.cbPower === "null" ? "" : el.cbPower}
                    </td>
                    <td
                      className={`b-${
                        el.loadCurrentPerPhase === null
                          ? "Gray"
                          : el.backgroundColor
                      }`}
                    >
                      {el.loadCurrentPerPhase === "null"
                        ? ""
                        : el.loadCurrentPerPhase}
                    </td>

                    <td
                      className={`b-${
                        el.seriesOrParallel === null
                          ? "Gray"
                          : el.backgroundColor
                      }`}
                    >
                      {el.seriesOrParallel === "null"
                        ? ""
                        : el.seriesOrParallel}
                    </td>

                    <td
                      className={`b-${
                        el.resistor === null ? "Gray" : el.backgroundColor
                      }`}
                    >
                      {el.resistor === "null" ? "" : el.resistor}
                    </td>

                    <td
                      className={`b-${
                        el.yearInstall === null ? "Gray" : el.backgroundColor
                      }`}
                    >
                      {el.yearInstall === "null" ? "" : el.yearInstall}
                    </td>

                    <td className={`b-${el.backgroundColor}`}>
                      {el.currentStatus === "null" ? "" : el.currentStatus}
                    </td>
                    <td className={`b-${el.backgroundColor}`}>
                      <span
                        className="spanButton"
                        onClick={() => {
                          showModalHistory(el);
                        }}
                      >
                        {el.latestMaintenanceTime}
                      </span>
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
          </tbody>
        </table>
      </div>
      <ModalViewHistory
        open={open}
        isLoading={isLoading}
        // handleOkOnClick={handleOkOnClick}
        handleCancelOnClick={handleCancelOnClick}
        dataHistory={dataViewHistory}
        dateMaintenance={dateMaintenance}
      />
      {formLoading && <SpanLoading />}
    </>
  ) : (
    <div>
      Bạn cần <a href="/login"> đăng nhập</a>
    </div>
  );
};

export default Home;
