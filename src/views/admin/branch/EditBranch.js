import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  UserOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import { message } from "antd";
import { FormProvider, useForm } from "react-hook-form";
import InputCustom from "../../../components/input/Input";
import SpanLoading from "../../../components/loading/SpanLoading";
import {
  name_validation,
  address_branch_validation,
  phone_validation,
  email_validation,
  name_branch_validation,
} from "../../../utils/inputBranchValidations";
import home from "../../../assets/images/home.jpg";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

function EditBranch() {
  const axiosPrivate = useAxiosPrivate();
  let { id } = useParams();
  let navigate = useNavigate();
  const methods = useForm();
  const [success, setSuccess] = useState(false);
  const [mes, setMes] = useState("");
  const [getData, setGetData] = useState(false);

  const [formLoading, setFormLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [branchName, setBranchName] = useState("");

  const [branchId, setBranchId] = useState("");
  const [branchAddress, setBranchAddress] = useState("");
  const [deputyTechnicalDirector, setDeputyTechnicalDirector] = useState("");
  const [phoneDeputyTechnicalDirector, setPhoneDeputyTechnicalDirector] =
    useState("");
  const [emailDeputyTechnicalDirector, setEmailDeputyTechnicalDirector] =
    useState("");

  useEffect(() => {
    const getData = async () => {
      setFormLoading(true);
      await axiosPrivate
        .get(`/api/branch/${id}`)
        .then((res) => {
          const result = res.data;
          console.log(">>>>>add branch result", res.data);
          if (result.status === 100) {
            setDataSource(result.response);
            setBranchId(result.response.branchId);
            setBranchAddress(result.response.branchAddress);
            setBranchName(result.response.branchName);
            setDeputyTechnicalDirector(result.response.deputyTechnicalDirector);
            setPhoneDeputyTechnicalDirector(
              result.response.phoneDeputyTechnicalDirector
            );
            setEmailDeputyTechnicalDirector(
              result.response.emailDeputyTechnicalDirector
            );
            setGetData(true);
          } else {
            console.log(">>>> khong tim thay ", id);
            setGetData(false);
          }

          setFormLoading(false);
        })
        .catch((err) => {
          console.log(">>>>add branch error", err);
          setFormLoading(false);
          setGetData(false);
        });
    };
    getData();
  }, []);

  const onSubmit = methods.handleSubmit((data) => {
    save();
  });

  const save = async () => {
    setFormLoading(true);
    await axiosPrivate
      .put(`/api/branch/${id}`, {
        branchName,
        branchAddress,
        deputyTechnicalDirector,
        phoneDeputyTechnicalDirector,
        emailDeputyTechnicalDirector,
      })
      .then((res) => {
        const result = res.data;
        console.log(">>>>>add branch result", res.data);

        if (result.status === 100) {
          setDataSource(result.response);
          setBranchId(result.response.branchId);
          setBranchAddress(result.response.branchAddress);
          setBranchName(result.response.branchName);
          setDeputyTechnicalDirector(result.response.deputyTechnicalDirector);
          setPhoneDeputyTechnicalDirector(
            result.response.phoneDeputyTechnicalDirector
          );
          setEmailDeputyTechnicalDirector(
            result.response.emailDeputyTechnicalDirector
          );

          message.success("Cập nhật thành công");
          setGetData(true);
          setSuccess(false);
          setMes("");
        } else {
          console.log(">>>> khong tim thay ", id);
          setGetData(false);
          message.warning("Không thể cập nhật");
          setSuccess(true);
          setMes("Không thể cập nhật");
        }

        setFormLoading(false);
      })
      .catch((err) => {
        console.log(">>>>add branch error", err);
        setFormLoading(false);
        setGetData(false);
        message.error("Không thể cập nhật");
        setSuccess(true);
        setMes("Không thể cập nhật");
      });
  };

  return (
    <>
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
                <span className="userShowUsername">
                  {getData ? dataSource.branchName : "null"}
                </span>
                <span className="userShowUserTitle">
                  {getData ? dataSource.branchId : "null"}
                </span>
              </div>
            </div>

            <div className="userShowBottom">
              <span className="userShowTitle">Địa chỉ chi nhánh</span>
              <div className="userShowInfo">
                <EnvironmentOutlined className="userShowIcon" />
                <span className="userShowInfoTitle">
                  {dataSource.branchAddress &&
                  dataSource.branchAddress.length > 0
                    ? dataSource.branchAddress
                    : "Chưa có thông tin"}
                </span>
              </div>
              <span className="userShowTitle">Thông tin PGĐ KT</span>
              <div className="userShowInfo">
                <UserOutlined className="userShowIcon" />
                <span className="userShowInfoTitle">
                  {dataSource.deputyTechnicalDirector &&
                  dataSource.deputyTechnicalDirector.length > 0
                    ? dataSource.deputyTechnicalDirector
                    : "Chưa có thông tin"}
                </span>
              </div>

              <div className="userShowInfo">
                <PhoneOutlined className="userShowIcon" />
                <span className="userShowInfoTitle">
                  {dataSource.phoneDeputyTechnicalDirector &&
                  dataSource.phoneDeputyTechnicalDirector.length > 0
                    ? dataSource.phoneDeputyTechnicalDirector
                    : "Chưa có thông tin"}
                </span>
              </div>
              <div className="userShowInfo">
                <MailOutlined className="userShowIcon" />
                <span className="userShowInfoTitle">
                  {dataSource.emailDeputyTechnicalDirector &&
                  dataSource.emailDeputyTechnicalDirector.length > 0
                    ? dataSource.emailDeputyTechnicalDirector
                    : "Chưa có thông tin"}
                </span>
              </div>
            </div>
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Thông tin chỉnh sửa</span>
            <div className="mt-5">
              {success && (
                <p className="flex items-center gap-1 mb-5 font-semibold text-red-500">
                  {mes}
                </p>
              )}
            </div>
            {getData ? (
              <FormProvider {...methods}>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  noValidate
                  autoComplete="off"
                  className="userUpdateForm"
                >
                  <div className="userUpdateLeft">
                    <div className="userUpdateItem">
                      <InputCustom
                        {...name_branch_validation}
                        className="userUpdateInput"
                        value={branchName}
                        onChange={(e) => setBranchName(e.target.value)}
                      />
                    </div>

                    {/* <div className="userUpdateItem">
                      <InputCustom
                        {...email_validation}
                        className="userUpdateInput"
                        value={emailDeputyTechnicalDirector}
                        onChange={(e) => {
                          setEmailDeputyTechnicalDirector(e.target.value);
                        }}
                      />
                    </div>
                    <div className="userUpdateItem">
                      <InputCustom
                        {...phone_validation}
                        className="userUpdateInput"
                        value={phoneDeputyTechnicalDirector}
                        onChange={(e) => {
                          setPhoneDeputyTechnicalDirector(e.target.value);
                        }}
                      />
                    </div> */}
                    <div className="userUpdateItem">
                      <InputCustom
                        {...address_branch_validation}
                        className="userUpdateInput"
                        value={branchAddress}
                        onChange={(e) => {
                          setBranchAddress(e.target.value);
                        }}
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

export default EditBranch;
