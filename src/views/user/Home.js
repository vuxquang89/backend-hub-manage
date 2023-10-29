import React, { useState } from "react";
import "./Home.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm, message } from "antd";
import ModalEditCellDevice from "./ModalEditCellDevice";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const Home = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const methods = useForm();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOkOnClick = methods.handleSubmit((data) => {
    //setModalText('The modal will be closed after two seconds');
    console.log(data);
    setIsLoading(true);
    setTimeout(() => {
      setOpen(false);
      setIsLoading(false);
      // toast.success("Thêm mới thành công");
      methods.reset();
    }, 2000);
  });

  const handleCancelOnClick = () => {
    console.log("Clicked cancel button");
    setOpen(false);
    console.log(">>>check open", open);
  };

  const popConfirmDeleteDevice = (e) => {
    console.log(">>>comfirm delete");
    setFormLoading(true);
    // let data = dataSource;

    // data = data.filter((item) => item.id !== editingId);
    // // toast.success("Xóa thành công");
    // setDataSource(data);

    setTimeout(() => {
      setFormLoading(false);
      // message.success("Xóa thành công");
    }, 2000);
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

  return (
    <>
      <div className="container">
        <h4>Home page</h4>

        <br />
        <p>You are logged in!</p>
        <br />
        <Link to="/manager">Go to the Editor page</Link>
        <br />
        <Link to="/admin">Go to the Admin page</Link>
        <br />
        <br />
        <Link to="/admin/device">Go to the Admin Device page</Link>
        <br />
        <br />
        <Link to="/admin/branch">Go to the Admin Branch page</Link>
        <br />
        <br />
        <Link to="/admin/users">Go to the Admin Users page</Link>
        <br />
        <br />
        <Link to="/admin/hub">Go to the Admin Users page</Link>
        <br />
        <Link to="/lounge">Go to the Lounge</Link>
        <br />
        <Link to="/linkpage">Go to the link page</Link>

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
            <tr>
              <th className="deviceTitle" colSpan={21}>
                CHI NHÁNH 1 (MR. OANH 0901810072)
              </th>
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
              <td className="UPS">
                <EditOutlined
                  className="buttonIconEdit"
                  onClick={() => {
                    alert("Edit click");
                    showModal();
                  }}
                />
                <Popconfirm
                  title="Alarm"
                  description="Bạn có chắc muốn xóa?"
                  placement="topLeft"
                  onConfirm={popConfirmDeleteDevice}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <DeleteOutlined
                    className="buttonIconDelete"
                    onClick={() => {
                      alert("Delete click");
                    }}
                  />
                </Popconfirm>
              </td>
            </tr>
            <tr>
              {/* <td>BTE_BTE</td> */}
              {/* <td>Bến tre</td> */}
              {/* <td>Nguyễn Minh Luân</td> */}
              {/* <td>0901811307</td> */}
              {/* <td>DUY</td> */}
              {/* <td rowSpan={2}>UPS</td> */}
              <td className="UPS">Socomec</td>
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
            <tr>
              {/* <td>BTE_BTE</td> */}
              {/* <td>Bến tre</td> */}
              {/* <td>Nguyễn Minh Luân</td> */}
              {/* <td>0901811307</td> */}
              {/* <td>DUY</td> */}
              <td className="B-UPS" rowSpan={2}>
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
            <tr>
              {/* <td>BTE_BTE</td> */}
              {/* <td>Bến tre</td> */}
              {/* <td>Nguyễn Minh Luân</td> */}
              {/* <td>0901811307</td> */}
              {/* <td>DUY</td> */}
              {/* <td rowSpan={2}>Battery_UPS</td> */}
              <td className="B-UPS">Saite/Vietname</td>
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
            <tr>
              {/* <td>BTE_BTE</td> */}
              {/* <td>Bến tre</td> */}
              {/* <td>Nguyễn Minh Luân</td> */}
              {/* <td>0901811307</td> */}
              {/* <td>DUY</td> */}
              <td className="MPD" rowSpan={1}>
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
            <tr>
              {/* <td>BTE_BTE</td> */}
              {/* <td>Bến tre</td> */}
              {/* <td>Nguyễn Minh Luân</td> */}
              {/* <td>0901811307</td> */}
              {/* <td>DUY</td> */}
              <td className="TD" rowSpan={1}>
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
            <tr>
              {/* <td>BTE_BTE</td> */}
              {/* <td>Bến tre</td> */}
              {/* <td>Nguyễn Minh Luân</td> */}
              {/* <td>0901811307</td> */}
              {/* <td>DUY</td> */}
              <td className="ML" rowSpan={1}>
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
            <tr>
              {/* <td>BTE_BTE</td> */}
              {/* <td>Bến tre</td> */}
              {/* <td>Nguyễn Minh Luân</td> */}
              {/* <td>0901811307</td> */}
              {/* <td>DUY</td> */}
              {/* <td rowSpan={2}>UPS</td> */}
              <td className="UPS">Socomec</td>
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
            <tr>
              {/* <td>BTE_BTE</td> */}
              {/* <td>Bến tre</td> */}
              {/* <td>Nguyễn Minh Luân</td> */}
              {/* <td>0901811307</td> */}
              {/* <td>DUY</td> */}
              <td className="B-UPS" rowSpan={2}>
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
            <tr>
              {/* <td>BTE_BTE</td> */}
              {/* <td>Bến tre</td> */}
              {/* <td>Nguyễn Minh Luân</td> */}
              {/* <td>0901811307</td> */}
              {/* <td>DUY</td> */}
              {/* <td rowSpan={2}>Battery_UPS</td> */}
              <td className="B-UPS">Saite/Vietname</td>
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
            <tr>
              {/* <td>BTE_BTE</td> */}
              {/* <td>Bến tre</td> */}
              {/* <td>Nguyễn Minh Luân</td> */}
              {/* <td>0901811307</td> */}
              {/* <td>DUY</td> */}
              <td className="MPD" rowSpan={1}>
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
            <tr>
              {/* <td>BTE_BTE</td> */}
              {/* <td>Bến tre</td> */}
              {/* <td>Nguyễn Minh Luân</td> */}
              {/* <td>0901811307</td> */}
              {/* <td>DUY</td> */}
              <td className="TD" rowSpan={1}>
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
            <tr>
              {/* <td>BTE_BTE</td> */}
              {/* <td>Bến tre</td> */}
              {/* <td>Nguyễn Minh Luân</td> */}
              {/* <td>0901811307</td> */}
              {/* <td>DUY</td> */}
              <td className="ML" rowSpan={1}>
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
            <tr>
              {/* <td>BTE_BTE</td> */}
              {/* <td>Bến tre</td> */}
              {/* <td>Nguyễn Minh Luân</td> */}
              {/* <td>0901811307</td> */}
              {/* <td>DUY</td> */}
              {/* <td rowSpan={2}>UPS</td> */}
              <td className="UPS">Socomec</td>
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
            <tr>
              {/* <td>BTE_BTE</td> */}
              {/* <td>Bến tre</td> */}
              {/* <td>Nguyễn Minh Luân</td> */}
              {/* <td>0901811307</td> */}
              {/* <td>DUY</td> */}
              <td className="B-UPS" rowSpan={2}>
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
            <tr>
              {/* <td>BTE_BTE</td> */}
              {/* <td>Bến tre</td> */}
              {/* <td>Nguyễn Minh Luân</td> */}
              {/* <td>0901811307</td> */}
              {/* <td>DUY</td> */}
              {/* <td rowSpan={2}>Battery_UPS</td> */}
              <td className="B-UPS">Saite/Vietname</td>
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
            <tr>
              {/* <td>BTE_BTE</td> */}
              {/* <td>Bến tre</td> */}
              {/* <td>Nguyễn Minh Luân</td> */}
              {/* <td>0901811307</td> */}
              {/* <td>DUY</td> */}
              <td className="MPD" rowSpan={1}>
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
            <tr>
              {/* <td>BTE_BTE</td> */}
              {/* <td>Bến tre</td> */}
              {/* <td>Nguyễn Minh Luân</td> */}
              {/* <td>0901811307</td> */}
              {/* <td>DUY</td> */}
              <td className="TD" rowSpan={1}>
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
            <tr>
              {/* <td>BTE_BTE</td> */}
              {/* <td>Bến tre</td> */}
              {/* <td>Nguyễn Minh Luân</td> */}
              {/* <td>0901811307</td> */}
              {/* <td>DUY</td> */}
              <td className="ML" rowSpan={1}>
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
              <th className="deviceTitle" colSpan={21}>
                CHI NHÁNH 2 (MR. NĂNG 0901810072)
              </th>
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
            <tr>
              {/* <td>BTE_BTE</td> */}
              {/* <td>Bến tre</td> */}
              {/* <td>Nguyễn Minh Luân</td> */}
              {/* <td>0901811307</td> */}
              {/* <td>DUY</td> */}
              {/* <td rowSpan={2}>UPS</td> */}
              <td className="UPS">Socomec</td>
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
            <tr>
              {/* <td>BTE_BTE</td> */}
              {/* <td>Bến tre</td> */}
              {/* <td>Nguyễn Minh Luân</td> */}
              {/* <td>0901811307</td> */}
              {/* <td>DUY</td> */}
              <td className="B-UPS" rowSpan={2}>
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
            <tr>
              {/* <td>BTE_BTE</td> */}
              {/* <td>Bến tre</td> */}
              {/* <td>Nguyễn Minh Luân</td> */}
              {/* <td>0901811307</td> */}
              {/* <td>DUY</td> */}
              {/* <td rowSpan={2}>Battery_UPS</td> */}
              <td className="B-UPS">Saite/Vietname</td>
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
            <tr>
              {/* <td>BTE_BTE</td> */}
              {/* <td>Bến tre</td> */}
              {/* <td>Nguyễn Minh Luân</td> */}
              {/* <td>0901811307</td> */}
              {/* <td>DUY</td> */}
              <td className="MPD" rowSpan={1}>
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
            <tr>
              {/* <td>BTE_BTE</td> */}
              {/* <td>Bến tre</td> */}
              {/* <td>Nguyễn Minh Luân</td> */}
              {/* <td>0901811307</td> */}
              {/* <td>DUY</td> */}
              <td className="TD" rowSpan={1}>
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
            <tr>
              {/* <td>BTE_BTE</td> */}
              {/* <td>Bến tre</td> */}
              {/* <td>Nguyễn Minh Luân</td> */}
              {/* <td>0901811307</td> */}
              {/* <td>DUY</td> */}
              <td className="ML" rowSpan={1}>
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
            <tr>
              {/* <td>BTE_BTE</td> */}
              {/* <td>Bến tre</td> */}
              {/* <td>Nguyễn Minh Luân</td> */}
              {/* <td>0901811307</td> */}
              {/* <td>DUY</td> */}
              {/* <td rowSpan={2}>UPS</td> */}
              <td className="UPS">Socomec</td>
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
            <tr>
              {/* <td>BTE_BTE</td> */}
              {/* <td>Bến tre</td> */}
              {/* <td>Nguyễn Minh Luân</td> */}
              {/* <td>0901811307</td> */}
              {/* <td>DUY</td> */}
              <td className="B-UPS" rowSpan={2}>
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
            <tr>
              {/* <td>BTE_BTE</td> */}
              {/* <td>Bến tre</td> */}
              {/* <td>Nguyễn Minh Luân</td> */}
              {/* <td>0901811307</td> */}
              {/* <td>DUY</td> */}
              {/* <td rowSpan={2}>Battery_UPS</td> */}
              <td className="B-UPS">Saite/Vietname</td>
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
            <tr>
              {/* <td>BTE_BTE</td> */}
              {/* <td>Bến tre</td> */}
              {/* <td>Nguyễn Minh Luân</td> */}
              {/* <td>0901811307</td> */}
              {/* <td>DUY</td> */}
              <td className="MPD" rowSpan={1}>
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
            <tr>
              {/* <td>BTE_BTE</td> */}
              {/* <td>Bến tre</td> */}
              {/* <td>Nguyễn Minh Luân</td> */}
              {/* <td>0901811307</td> */}
              {/* <td>DUY</td> */}
              <td className="TD" rowSpan={1}>
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
            <tr>
              {/* <td>BTE_BTE</td> */}
              {/* <td>Bến tre</td> */}
              {/* <td>Nguyễn Minh Luân</td> */}
              {/* <td>0901811307</td> */}
              {/* <td>DUY</td> */}
              <td className="ML" rowSpan={1}>
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
            <tr>
              {/* <td>BTE_BTE</td> */}
              {/* <td>Bến tre</td> */}
              {/* <td>Nguyễn Minh Luân</td> */}
              {/* <td>0901811307</td> */}
              {/* <td>DUY</td> */}
              {/* <td rowSpan={2}>UPS</td> */}
              <td className="UPS">Socomec</td>
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
            <tr>
              {/* <td>BTE_BTE</td> */}
              {/* <td>Bến tre</td> */}
              {/* <td>Nguyễn Minh Luân</td> */}
              {/* <td>0901811307</td> */}
              {/* <td>DUY</td> */}
              <td className="B-UPS" rowSpan={2}>
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
            <tr>
              {/* <td>BTE_BTE</td> */}
              {/* <td>Bến tre</td> */}
              {/* <td>Nguyễn Minh Luân</td> */}
              {/* <td>0901811307</td> */}
              {/* <td>DUY</td> */}
              {/* <td rowSpan={2}>Battery_UPS</td> */}
              <td className="B-UPS">Saite/Vietname</td>
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
            <tr>
              {/* <td>BTE_BTE</td> */}
              {/* <td>Bến tre</td> */}
              {/* <td>Nguyễn Minh Luân</td> */}
              {/* <td>0901811307</td> */}
              {/* <td>DUY</td> */}
              <td className="MPD" rowSpan={1}>
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
            <tr>
              {/* <td>BTE_BTE</td> */}
              {/* <td>Bến tre</td> */}
              {/* <td>Nguyễn Minh Luân</td> */}
              {/* <td>0901811307</td> */}
              {/* <td>DUY</td> */}
              <td className="TD" rowSpan={1}>
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
            <tr>
              {/* <td>BTE_BTE</td> */}
              {/* <td>Bến tre</td> */}
              {/* <td>Nguyễn Minh Luân</td> */}
              {/* <td>0901811307</td> */}
              {/* <td>DUY</td> */}
              <td className="ML" rowSpan={1}>
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
          </tbody>
        </table>
      </div>
      <ModalEditCellDevice
        open={open}
        handleOkOnClick={handleOkOnClick}
        handleCancelOnClick={handleCancelOnClick}
        isLoading={isLoading}
        methods={methods}
      />
    </>
  );
};

export default Home;
