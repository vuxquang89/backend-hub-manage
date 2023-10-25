import React, { useState } from "react";
import InputCustom from "../../../components/input/Input";
import SpanLoading from "../../../components/loading/SpanLoading";

import {
  name_validation,
  name_branch_validation,
  email_validation,
  phone_validation,
  code_branch_validation,
  address_branch_validation,
} from "../../../utils/inputBranchValidations";
import { RollbackOutlined } from "@ant-design/icons";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./AddBranch.css";
import { stringToCode } from "../../../utils/stringToCode";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

function AddBranch() {
  const axiosPrivate = useAxiosPrivate();

  let navigate = useNavigate();
  const methods = useForm();
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [code, setCode] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const onSubmit = methods.handleSubmit((data) => {
    console.log(">>>>>check data ", data);
    addBranch(data);
  });

  const addBranch = async (form) => {
    console.log(">>>>>add data ", form);
    let branchId = form.branchId;
    let branchName = form.branchName;
    let deputyTechnicalDirector = form.deputyTechnicalDirector;
    let phoneDeputyTechnicalDirector = form.phoneDeputyTechnicalDirector;
    setFormLoading(true);
    await axiosPrivate
      .post("/api/branch", {
        branchId,
        branchName,
        deputyTechnicalDirector,
        phoneDeputyTechnicalDirector,
      })
      .then((res) => {
        console.log(">>>>>add branch result", res.data);
        methods.reset();
        toast.success("Thêm mới thành công");
        setCode("");
        setSuccess(true);
        setMessage("");
        setFormLoading(false);
      })
      .catch((err) => {
        console.log(">>>>add branch error", err);
        setFormLoading(false);
      });
  };

  const handleNameBranchOnChange = (e) => {
    setCode(stringToCode(e.target.value));
  };

  const handleCodeBranchOnChange = (e) => {
    setCode(e.target.value);
  };

  return (
    <>
      <div className="newUser ps-12">
        <div className="titleContainer">
          <h4 className="newUserTitle">Thêm chi nhánh mới</h4>
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="btnRollBack"
          >
            <RollbackOutlined /> Quay lại
          </button>
        </div>
        <div className="mt-5">
          {success && (
            <p className="flex items-center gap-1 mb-5 font-semibold text-red-500">
              {message}
            </p>
          )}
        </div>
        <FormProvider {...methods}>
          <form className="newUserForm">
            <div className="newUserItem">
              <InputCustom
                {...name_branch_validation}
                className="inputAdd"
                onChange={(e) => handleNameBranchOnChange(e)}
              />
            </div>
            <div className="newUserItem">
              <InputCustom
                {...code_branch_validation}
                className="inputAdd"
                onChange={(e) => handleCodeBranchOnChange(e)}
                value={code}
              />
            </div>
            <div className="newUserItem">
              <InputCustom
                {...address_branch_validation}
                className="inputAdd"
              />
            </div>
            <div className="newUserItem">
              <InputCustom {...name_validation} className="inputAdd" />
            </div>
            <div className="newUserItem">
              <InputCustom {...email_validation} className="inputAdd" />
            </div>

            <div className="newUserItem">
              <InputCustom {...phone_validation} className="inputAdd" />
            </div>

            <button onClick={onSubmit} className="newUserButton">
              Thêm mới
            </button>
          </form>
        </FormProvider>
      </div>
      {formLoading && <SpanLoading />}
    </>
  );
}

export default AddBranch;
