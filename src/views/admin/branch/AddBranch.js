import React, { useState } from "react";
import Input from "../../../components/input/Input";
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
import "./AddBranch.css";
import { stringToCode } from "../../../utils/stringToCode";
import { toast } from "react-toastify";

function AddBranch() {
  const methods = useForm();
  const [success, setSuccess] = useState(false);
  const [code, setCode] = useState("");

  const onSubmit = methods.handleSubmit((data) => {
    console.log(data);
    methods.reset();
    toast.success("Thêm mới thành công");
    setSuccess(true);
  });

  const handleNameBranchOnChange = (e) => {
    setCode(stringToCode(e.target.value));
  };

  const handleCodeBranchOnChange = (e) => {
    setCode(e.target.value);
  };

  return (
    <div className="newUser ps-12">
      <div className="titleContainer">
        <h4 className="newUserTitle">Thêm chi nhánh mới</h4>
        <button className="btnRollBack">
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
            <Input
              {...name_branch_validation}
              className="inputAdd"
              onChange={(e) => handleNameBranchOnChange(e)}
            />
          </div>
          <div className="newUserItem">
            <Input
              {...code_branch_validation}
              className="inputAdd"
              onChange={(e) => handleCodeBranchOnChange(e)}
              value={code}
            />
          </div>
          <div className="newUserItem">
            <Input {...address_branch_validation} className="inputAdd" />
          </div>
          <div className="newUserItem">
            <Input {...name_validation} className="inputAdd" />
          </div>
          <div className="newUserItem">
            <Input {...email_validation} className="inputAdd" />
          </div>

          <div className="newUserItem">
            <Input {...phone_validation} className="inputAdd" />
          </div>

          <button onClick={onSubmit} className="newUserButton">
            Thêm mới
          </button>
        </form>
      </FormProvider>
    </div>
  );
}

export default AddBranch;
