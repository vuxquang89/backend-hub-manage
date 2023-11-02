import React, { useEffect, useState } from "react";
import "./Home.css";
import {
  DeleteOutlined,
  EditOutlined,
  RetweetOutlined,
} from "@ant-design/icons";
import { Popconfirm, Space, message, Input } from "antd";
import ModalEditCellDevice from "./ModalEditCellDevice";
import { useForm } from "react-hook-form";
import { useNavigate, Link, useLocation } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ModalViewHistory from "./ModalViewHistory";
import SpanLoading from "../../components/loading/SpanLoading";

const Home = () => {
  const { Search } = Input;
  const logout = useLogout();
  const navigate = useNavigate();

  const location = useLocation();
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
    loadData();
  }, []);

  const loadData = async () => {
    setFormLoading(true);
    await axiosPrivate
      .get("/api/user/hub/detail")
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
    setDataViewHistory(record.maintenanceHistories);
    setIsLoading(false);
    setOpen(true);
  };

  const onSearch = (value, _e, info) => {
    console.log(info?.source, value);
    getDataSearch(value);
  };
  const getDataSearch = async (value) => {
    setFormLoading(true);
    await axiosPrivate
      .get("/api/hub/detail/search/" + value)
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

  return (
    <>
      <div className="container">
        <h4>Trang chủ</h4>
        <Space className="mb-10">
          <label>Tìm kiếm</label>
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
        </Space>
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
                      {el.deviceName}
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
                </tr>
              </>
            ))}
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
  );
};

export default Home;
