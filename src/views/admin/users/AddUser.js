import React, { useState } from "react";
import "./AddUser.css";
import { FormProvider, useForm } from "react-hook-form";
import { RollbackOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import InputCustom from "../../../components/input/Input";
import SpanLoading from "../../../components/loading/SpanLoading";
import {
  username_validation,
  fullname_validation,
  email_validation,
  password_validation,
  phone_validation,
} from "../../../utils/inputUserValidations";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

function AddUser() {
  const axiosPrivate = useAxiosPrivate();

  let navigate = useNavigate();
  const methods = useForm();
  const [success, setSuccess] = useState(false);
  const [mes, setMes] = useState("");

  const [formLoading, setFormLoading] = useState(false);

  const onSubmit = methods.handleSubmit((data) => {
    createUser(data);
  });

  const createUser = async (record) => {
    let username = record.username;
    let fullname = record.fullname;
    let email = record.email;
    let password = record.password;
    let phone = record.phone;

    setFormLoading(true);
    await axiosPrivate
      .post("/api/users", { username, password, email, fullname, phone })
      .then((res) => {
        console.log(">>>>> create user result", res.data);
        const result = res.data;
        if (result.status === 100) {
          toast.success("Thêm mới thành công");
          setSuccess(false);
          setMes("");
          methods.reset();
        } else {
          setSuccess(true);
          setMes(result.message);
        }
        setFormLoading(false);
      })
      .catch((err) => {
        setFormLoading(false);
        toast.error("Không thể thêm mới");
        console.log(">>>>> create user error", err);
      });
  };

  return (
    <>
      <div className="newUser ps-12">
        <div className="titleContainer">
          <h4 className="newUserTitle">Thêm mới User</h4>
          <button onClick={() => navigate(-1)} className="btnRollBack">
            <RollbackOutlined /> Quay lại
          </button>
        </div>
        <div className="mt-5">
          {success && (
            <pre className="flex items-center gap-1 mb-5 font-semibold text-red-500">
              {mes}
            </pre>
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
      {formLoading && <SpanLoading />}
    </>
  );
}

export default AddUser;
