import React, { useState, useEffect } from "react";
import "./EditUser.css";
import {
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import { message } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  const [role, setRole] = useState(3);

  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    loadUserDetail();
  }, []);

  const onSubmit = methods.handleSubmit((data) => {
    saveEdit();
  });

  const loadUserDetail = async () => {
    setFormLoading(true);
    await axiosPrivate
      .get(`/api/users/${id}`)
      .then((res) => {
        const result = res.data;
        console.log(">>>>>get user result", res.data);
        if (result.status === 100) {
          const response = result.responses[0];

          setDataSource(response);
          setEmail(response.email);
          setFullname(response.fullname);
          setPhone(response.phone);
          setRole(response.roles[0]);

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
      .put(`/api/users/${id}`, {
        fullname,
        email,
        phone,
        role,
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
          setRole(response.roles[0]);

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
          <h4 className="userTitle">Chỉnh sửa User</h4>
          <div className="buttonContainer">
            <Link to="/admin/users/add">
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
                </span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Chi tiết tài khoản</span>
              <div className="userShowInfo">
                <UserOutlined className="userShowIcon" />
                <span className="userShowInfoTitle">
                  {status ? dataSource.username : "null"}
                </span>
              </div>

              <div className="userShowInfo">
                <PhoneOutlined className="userShowIcon" />
                <span className="userShowInfoTitle">
                  {status ? dataSource.phone : "null"}
                </span>
              </div>
              <div className="userShowInfo">
                <MailOutlined className="userShowIcon" />
                <span className="userShowInfoTitle">
                  {status ? dataSource.email : "null"}
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
                        <option value="2">Manager</option>
                        <option value="3">User</option>
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
