import React, { useState, useEffect } from "react";
import "./EditUser.css";
import {
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import { message, Select } from "antd";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import SpanLoading from "../../../components/loading/SpanLoading";
import { FormProvider, useForm } from "react-hook-form";
import {
  fullname_validation,
  email_validation,
  phone_validation,
} from "../../../utils/inputUserValidations";
import InputCustom from "../../../components/input/Input";
import avatar from "../../../assets/images/user.png";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

function EditUser() {
  let navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  let { id } = useParams();
  const methods = useForm();
  const [success, setSuccess] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [status, setStatus] = useState(true);
  const [mess, setMess] = useState("");

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState(5);
  const [branchList, setBranchList] = useState([]);
  const [branchId, setBranchId] = useState("");
  const [branchName, setBranchName] = useState("");
  const [activate, setActivate] = useState(0);

  const [itemBranchUser, setItemBranchUser] = [];
  const item = [{ label: "", value: "" }];

  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    loadUserDetail();
    getBranchList();
  }, []);

  const onSubmit = methods.handleSubmit((data) => {
    saveEdit();
  });

  const getBranchList = async () => {
    await axiosPrivate
      .get("/api/admin/branch/list/user")
      .then((res) => {
        console.log(">>>>get list branch", res.data);
        setBranchList(res.data);
      })
      .catch((err) => {
        console.log("get list hub branch", err);

        navigate("/login", { state: { from: location }, replace: true });
      });
  };

  const loadUserDetail = async () => {
    setFormLoading(true);
    await axiosPrivate
      .get(`/api/admin/users/leader/${id}`)
      .then((res) => {
        const result = res.data;
        console.log(">>>>>get user result", res.data);
        if (result.status === 100) {
          const response = result.responses[0];

          setDataSource(response);
          setEmail(response.email);
          setFullname(response.fullname);
          setPhone(response.phone);
          setRole(response.rolesId[0]);
          setActivate(response.status);
          setBranchId(response.branchId);
          setBranchName(response.branchName);
          /*
          setItemBranchUser([
            {
              ...itemBranchUser,
              label: response.branchId,
              value: response.branchName,
            },
          ]);
          */
          setStatus(true);
        } else {
          console.log(">>>> khong tim thay ", id);
          setStatus(false);
        }

        setFormLoading(false);
      })
      .catch((err) => {
        console.log(">>>>get user error", err);
        setFormLoading(false);
        setStatus(false);
      });
  };

  const saveEdit = async () => {
    setFormLoading(true);
    await axiosPrivate
      .put(`/api/admin/users/leader/${id}`, {
        fullname,
        email,
        phone,
        role,
        status: activate,
        branchId: branchId,
        branchName: branchName,
      })
      .then((res) => {
        const result = res.data;
        console.log(">>>>>add branch result", res.data);

        if (result.status === 100) {
          const response = result.responses[0];
          setDataSource(response);
          setEmail(response.email);
          setFullname(response.fullname);
          setPhone(response.phone);
          setRole(response.rolesId[0]);
          setActivate(response.status);
          setBranchId(response.branchId);
          setBranchName(response.branchName);
          message.success("Cập nhật thành công");
          setStatus(true);
          setSuccess(false);
          setMess("");
        } else {
          console.log(">>>> khong tim thay ", id);
          setStatus(false);
          message.warning("Không thể cập nhật");
          setSuccess(true);
          setMess("Không thể cập nhật");
        }

        setFormLoading(false);
      })
      .catch((err) => {
        console.log(">>>>add branch error", err);
        setFormLoading(false);
        setStatus(false);
        message.error("Không thể cập nhật");
        setSuccess(true);
        setMess(err);
      });
  };

  return (
    <>
      <div className="user ps-12 pe-12">
        <div className="userTitleContainer">
          <h4 className="userTitle">Chỉnh sửa User - PGĐ KT</h4>
          <div className="buttonContainer">
            <Link to="/admin/users/leader/add">
              <button className="userAddButton">Thêm mới</button>
            </Link>
            <RollbackOutlined
              onClick={() => navigate(-1)}
              className="buttonRollBack"
            />
          </div>
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <img src={avatar} alt="" className="userShowImg" />
              <div className="userShowTopTitle">
                <span className="userShowUsername">
                  {status ? dataSource.fullname : "null"}
                  {/* {dataSource.fullname} */}
                </span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Chi tiết tài khoản</span>
              <div className="userShowInfo">
                <UserOutlined className="userShowIcon" />
                <span className="userShowInfoTitle">
                  {status ? dataSource.username : "null"}
                  {/* {dataSource.username} */}
                </span>
              </div>

              <div className="userShowInfo">
                <PhoneOutlined className="userShowIcon" />
                <span className="userShowInfoTitle">
                  {status ? dataSource.phone : "null"}
                  {/* {dataSource.phone} */}
                </span>
              </div>
              <div className="userShowInfo">
                <MailOutlined className="userShowIcon" />
                <span className="userShowInfoTitle">
                  {status ? dataSource.email : "null"}
                  {/* {dataSource.email} */}
                </span>
              </div>
            </div>
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Thông tin chỉnh sửa</span>
            <div className="mt-5">
              {success && (
                <p className="flex items-center gap-1 mb-5 font-semibold text-red-500">
                  {mess}
                </p>
              )}
            </div>
            {status ? (
              <FormProvider {...methods}>
                <form className="userUpdateForm">
                  <div className="userUpdateLeft">
                    <div className="userUpdateItem">
                      <InputCustom
                        {...fullname_validation}
                        className="userUpdateInput"
                        value={fullname}
                        onChange={(e) => {
                          setFullname(e.target.value);
                        }}
                      />
                    </div>
                    <div className="userUpdateItem">
                      <InputCustom
                        {...email_validation}
                        className="userUpdateInput"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </div>
                    <div className="userUpdateItem">
                      <InputCustom
                        {...phone_validation}
                        className="userUpdateInput"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                        }}
                      />
                    </div>
                    <div className="userUpdateItem">
                      <label>
                        Chọn chi nhánh <span>*</span>
                      </label>
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
                          console.log(
                            ">>> check select onchange:",
                            value.label
                          );
                          setBranchId(e);
                          setBranchName(value.label);
                        }}
                        options={branchList}
                        value={branchId}
                      />
                    </div>
                    <div className="userUpdateItem">
                      <label
                        for="selectRole"
                        className="label-input font-semibold capitalize "
                      >
                        Trạng thái tài khoản
                      </label>
                      <select
                        value={activate}
                        onChange={(e) => setActivate(e.target.value)}
                      >
                        <option value="0">Đang bị khoá</option>
                        <option value="1">Đang hoạt động</option>
                      </select>
                    </div>
                    <div className="userUpdateItem">
                      <label
                        for="selectRole"
                        className="label-input font-semibold capitalize "
                      >
                        Phân quyền
                      </label>
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value="3">Branch</option>
                        <option value="5">User</option>
                      </select>
                    </div>
                    <div className="userUpdateItem">
                      <button onClick={onSubmit} className="userUpdateButton">
                        Cập nhật
                      </button>
                    </div>
                  </div>
                </form>
              </FormProvider>
            ) : (
              "Không tìm thấy thông tin"
            )}
          </div>
          <div className="f-1"></div>
        </div>
      </div>
      {formLoading && <SpanLoading />}
    </>
  );
}

export default EditUser;
