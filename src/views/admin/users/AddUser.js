import React, { useState } from "react";
import "./AddUser.css";
import { FormProvider, useForm } from "react-hook-form";
import { RollbackOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import InputCustom from "../../../components/input/Input";
import {
  username_validation,
  fullname_validation,
  email_validation,
  password_validation,
  phone_validation,
} from "../../../utils/inputUserValidations";

function AddUser() {
  let navigate = useNavigate();
  const methods = useForm();
  const [success, setSuccess] = useState(false);

  const onSubmit = methods.handleSubmit((data) => {
    console.log(data);
    methods.reset();
    setSuccess(true);
  });

  return (
    <div className="newUser ps-12">
      <div className="titleContainer">
        <h4 className="newUserTitle">Thêm mới User</h4>
        <button onClick={() => navigate(-1)} className="btnRollBack">
          <RollbackOutlined /> Quay lại
        </button>
      </div>
      <div className="mt-5">
        {success && (
          <p className="flex items-center gap-1 mb-5 font-semibold text-red-500">
            Form has been submitted successfully
          </p>
        )}
      </div>
      <FormProvider {...methods}>
        <form className="newUserForm">
          <div className="newUserItem">
            <InputCustom {...username_validation} className="inputAdd" />
          </div>
          <div className="newUserItem">
            <InputCustom {...fullname_validation} className="inputAdd" />
          </div>
          <div className="newUserItem">
            <InputCustom {...email_validation} className="inputAdd" />
          </div>
          <div className="newUserItem">
            <InputCustom {...password_validation} className="inputAdd" />
          </div>
          <div className="newUserItem">
            <InputCustom {...phone_validation} className="inputAdd" />
          </div>

          <button onClick={onSubmit} className="newUserButton">
            Create
          </button>
        </form>
      </FormProvider>
    </div>
  );
}

export default AddUser;
