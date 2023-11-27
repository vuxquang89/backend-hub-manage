import React, { useEffect, useState } from "react";
import "../AddUser.css";
import { FormProvider, useForm } from "react-hook-form";

import { RollbackOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import InputCustom from "../../../../components/input/Input";
import SpanLoading from "../../../../components/loading/SpanLoading";
import {
  username_validation,
  fullname_validation,
  email_validation,
  password_validation,
  phone_validation,
} from "../../../../utils/inputUserValidations";
import { Row, Col, Select } from "antd";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

function AddUserManager() {
  const axiosPrivate = useAxiosPrivate();

  let navigate = useNavigate();

  const location = useLocation();
  const methods = useForm();
  const [success, setSuccess] = useState(false);
  const [branchList, setBranchList] = useState([]);
  const [branchId, setBranchId] = useState("");
  const [mes, setMes] = useState("");

  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    getBranchList();
  }, []);

  const onSubmit = methods.handleSubmit((data) => {
    if (branchId.length === 0) {
      toast.warning("Kiểm tra, chưa chọn chi nhánh");
      setSuccess(true);
      setMes("Kiểm tra, chưa chọn chi nhánh");
      return;
    }

    createUser(data);
  });

  const getBranchList = async () => {
    await axiosPrivate
      .get("/api/branch/list")
      .then((res) => {
        console.log(">>>>get list branch", res.data);
        setBranchList(res.data);
      })
      .catch((err) => {
        console.log("get list hub branch", err);

        navigate("/login", { state: { from: location }, replace: true });
      });
  };

  const createUser = async (record) => {
    let username = record.username;
    let fullname = record.fullname;
    let email = record.email;
    let password = record.password;
    let phone = record.phone;

    setFormLoading(true);
    await axiosPrivate
      .post("/api/admin/users/manager", {
        username,
        password,
        email,
        fullname,
        phone,
        branchId: branchId,
      })
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
          <h4 className="newUserTitle">Thêm mới User - QL phòng máy</h4>
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
          <Row>
            <Col span={12}>
              <form className="newUserForm">
                <div className="newUserItem">
                  <InputCustom {...username_validation} className="inputAdd" />
                </div>
                <div className="newUserItem">
                  <InputCustom {...password_validation} className="inputAdd" />
                </div>
                <div className="newUserItem">
                  <InputCustom {...fullname_validation} className="inputAdd" />
                </div>
                <div className="newUserItem">
                  <InputCustom {...email_validation} className="inputAdd" />
                </div>

                <div className="newUserItem">
                  <InputCustom {...phone_validation} className="inputAdd" />
                </div>

                <div className="newUserItem">
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
                      console.log(">>> check select onchange:", e);
                      setBranchId(e);
                    }}
                    options={branchList}
                    value={branchId}
                  />
                </div>
                <div className="newUserItem">
                  <button onClick={onSubmit} className="newUserButton">
                    Create
                  </button>
                </div>
              </form>
            </Col>
          </Row>
        </FormProvider>
      </div>
      {formLoading && <SpanLoading />}
    </>
  );
}

export default AddUserManager;
