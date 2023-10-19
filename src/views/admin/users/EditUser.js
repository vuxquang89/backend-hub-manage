import React, { useState } from "react";
import "./EditUser.css";
import {
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import {
  fullname_validation,
  email_validation,
  phone_validation,
} from "../../../utils/inputUserValidations";
import InputCustom from "../../../components/input/Input";
import avatar from "../../../assets/images/user.png";

function EditUser() {
  let navigate = useNavigate();
  const methods = useForm();
  const [success, setSuccess] = useState(false);

  const onSubmit = methods.handleSubmit((data) => {
    console.log(data);
    methods.reset();

    setSuccess(true);
  });

  return (
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
              <span className="userShowUsername">DUY</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Chi tiết tài khoản</span>
            <div className="userShowInfo">
              <UserOutlined className="userShowIcon" />
              <span className="userShowInfoTitle">duy</span>
            </div>

            <div className="userShowInfo">
              <PhoneOutlined className="userShowIcon" />
              <span className="userShowInfoTitle">+1 123 456 67</span>
            </div>
            <div className="userShowInfo">
              <MailOutlined className="userShowIcon" />
              <span className="userShowInfoTitle">annabeck99@gmail.com</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Thông tin chỉnh sửa</span>
          <div className="mt-5">
            {success && (
              <p className="flex items-center gap-1 mb-5 font-semibold text-red-500">
                Form has been submitted successfully
              </p>
            )}
          </div>
          <FormProvider {...methods}>
            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <InputCustom
                    {...fullname_validation}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <InputCustom
                    {...email_validation}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <InputCustom
                    {...phone_validation}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <button onClick={onSubmit} className="userUpdateButton">
                    Cập nhật
                  </button>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
        <div className="f-1"></div>
      </div>
    </div>
  );
}

export default EditUser;
