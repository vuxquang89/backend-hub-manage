import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  UserOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../../../components/input/Input";
import {
  name_validation,
  address_branch_validation,
  phone_validation,
  email_validation,
} from "../../../utils/inputBranchValidations";
import home from "../../../assets/images/home.jpg";

function EditBranch() {
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
        <h4 className="userTitle">Chỉnh sửa chi nhánh</h4>
        <div className="buttonContainer">
          <Link to="/admin/branch/add">
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
            <img src={home} alt="" className="userShowImg" />
            <div className="userShowTopTitle">
              <span className="userShowUsername">Chi nhánh 1</span>
              <span className="userShowUserTitle">cn_1</span>
            </div>
          </div>

          <div className="userShowBottom">
            <span className="userShowTitle">Địa chỉ chi nhánh</span>
            <div className="userShowInfo">
              <EnvironmentOutlined className="userShowIcon" />
              <span className="userShowInfoTitle">New York | USA</span>
            </div>
            <span className="userShowTitle">Thông tin PGĐ KT</span>
            <div className="userShowInfo">
              <UserOutlined className="userShowIcon" />
              <span className="userShowInfoTitle">Mr Oanh</span>
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
            <form
              onSubmit={(e) => e.preventDefault()}
              noValidate
              autoComplete="off"
              className="userUpdateForm"
            >
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <Input {...name_validation} className="userUpdateInput" />
                </div>

                <div className="userUpdateItem">
                  <Input {...email_validation} className="userUpdateInput" />
                </div>
                <div className="userUpdateItem">
                  <Input {...phone_validation} className="userUpdateInput" />
                </div>
                <div className="userUpdateItem">
                  <Input
                    {...address_branch_validation}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <button onClick={onSubmit} className="userUpdateButton">
                    Cập nhật
                  </button>
                </div>
              </div>
              {/* <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  <img
                    className="userUpdateImg"
                    src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt=""
                  />

                  <input type="file" id="file" style={{ display: "none" }} />
                </div>
                
              </div> */}
            </form>
          </FormProvider>
        </div>
        <div className="f-1"></div>
      </div>
    </div>
  );
}

export default EditBranch;
