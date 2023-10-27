import { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import SpanLoading from "../../../components/loading/SpanLoading";
import { RollbackOutlined } from "@ant-design/icons";
import {
  hubName_validation,
  phone_validation,
  hubAddress_validation,
  hubCity_validation,
  hubManager_validation,
} from "../../../utils/inputHubValidations";
import InputCustom from "../../../components/input/Input";
import { message, Row, Col, Select } from "antd";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { FormProvider, useForm } from "react-hook-form";

function DetailHub() {
  const axiosPrivate = useAxiosPrivate();
  let { id } = useParams();
  let navigate = useNavigate();
  const location = useLocation();
  const methods = useForm();
  const [success, setSuccess] = useState(false);
  const [mes, setMes] = useState("");

  const [formLoading, setFormLoading] = useState(false);

  const [getData, setGetData] = useState(false);

  const [branchValue, setBranchValue] = useState("");
  const [branchResponse, setBranchResponse] = useState([]);
  const [listUserManager, setListUserManager] = useState([]);
  const [hubName, setHubName] = useState("");
  const [hubAddress, setHubAddress] = useState("");
  const [hubCity, setHubCity] = useState("");
  const [hubManagerName, setHubManagerName] = useState("");
  const [hubManagerPhone, setHubManagerPhone] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const getData = async () => {
      setFormLoading(true);
      await axiosPrivate
        .get(`/api/hub/${id}`)
        .then((res) => {
          const result = res.data;
          console.log(">>>>>add branch result", res.data);
          if (result.status === 100) {
            setBranchValue(result.hubResponse.branchResponse.branchId);
            setUserId(result.hubResponse.userResponse.id);
            setHubName(result.hubResponse.hubName);
            setHubAddress(result.hubResponse.hubAddress);
            setHubCity(result.hubResponse.hubCity);
            setHubManagerName(result.hubResponse.hubManagerName);
            setHubManagerPhone(result.hubResponse.hubManagerPhone);

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
          navigate("/login", { state: { from: location }, replace: true });
        });
    };
    getUserManager();
    getBranchList();
    getData();
  }, []);

  /**
   * get list user manager
   */
  const getUserManager = async () => {
    await axiosPrivate
      .get(`/api/users/role/selectoption/2`)
      .then((res) => {
        console.log(">>>>get list user manager", res.data);
        setListUserManager(res.data);
      })
      .catch((err) => {
        console.log("get list user manager error", err);

        navigate("/login", { state: { from: location }, replace: true });
      });
  };

  const getBranchList = async () => {
    await axiosPrivate
      .get("/api/branch/list")
      .then((res) => {
        console.log(">>>>get list branch", res.data);
        setBranchResponse(res.data);
      })
      .catch((err) => {
        console.log("get list hub branch", err);

        navigate("/login", { state: { from: location }, replace: true });
      });
  };

  const onSubmit = methods.handleSubmit((record) => {
    save(record);
  });

  const save = async (record) => {
    setFormLoading(true);
    await axiosPrivate
      .put(`/api/hub/${id}`, {
        userId: userId,
        branchId: branchValue,
        hubName: record.hubName,
        hubAddress: record.hubAddress,
        hubCity: record.hubCity,
        hubManagerName: record.hubManagerName,
        hubManagerPhone: record.hubManagerPhone,
      })
      .then((res) => {
        console.log(">>>>> update hub", res.data);
        let result = res.data;
        setBranchValue(result.branchResponse.branchId);
        setUserId(result.userResponse.id);
        setHubName(result.hubName);
        setHubAddress(result.hubAddress);
        setHubCity(result.hubCity);
        setHubManagerName(result.hubManagerName);
        setHubManagerPhone(result.hubManagerPhone);
        setFormLoading(false);
        methods.reset();
        toast.success("Cập nhật thành công");
      })
      .catch((err) => {
        console.log(">>>>> update hub error", err);
        toast.error("Lỗi. Không thể cập nhật");
        setFormLoading(false);
      });
  };

  return (
    <>
      <div className="user ps-12 pe-12">
        <div className="userTitleContainer">
          <h3 className="userTitle">Thông tin phòng máy</h3>
          <div className="buttonContainer">
            <RollbackOutlined
              onClick={() => navigate(-1)}
              className="buttonRollBack"
            />
          </div>
        </div>
        <div className="userContainer">
          <div className="userUpdate">
            <span className="userUpdateTitle">Thông tin chi tiết</span>
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
                  <Row>
                    <Col span={12}>
                      <div className="userUpdateItem">
                        <InputCustom
                          {...hubName_validation}
                          className="userUpdateInput"
                          value={hubName}
                          onChange={(e) => {
                            setHubName(e.target.value);
                          }}
                        />
                      </div>

                      <div className="userUpdateItem">
                        <InputCustom
                          {...hubAddress_validation}
                          className="userUpdateInput"
                          value={hubAddress}
                          onChange={(e) => {
                            setHubAddress(e.target.value);
                          }}
                        />
                      </div>
                      <div className="userUpdateItem">
                        <InputCustom
                          {...hubCity_validation}
                          className="userUpdateInput"
                          value={hubCity}
                          onChange={(e) => {
                            setHubCity(e.target.value);
                          }}
                        />
                      </div>
                      <div className="userUpdateItem">
                        <InputCustom
                          {...hubManager_validation}
                          className="userUpdateInput"
                          value={hubManagerName}
                          onChange={(e) => {
                            setHubManagerName(e.target.value);
                          }}
                        />
                      </div>
                      <div className="userUpdateItem">
                        <InputCustom
                          {...phone_validation}
                          className="userUpdateInput"
                          value={hubManagerPhone}
                          onChange={(e) => {
                            setHubManagerPhone(e.target.value);
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <div className="userUpdateItem">
                        <label className="label-input font-semibold capitalize ">
                          Thuộc chi nhánh
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
                              .localeCompare(
                                (optionB?.label ?? "").toLowerCase()
                              )
                          }
                          onChange={(e, value) => {
                            console.log(">>> check select onchange:", e);
                            setBranchValue(e);
                          }}
                          options={branchResponse}
                          value={branchValue}
                        />
                      </div>
                      <div className="userUpdateItem">
                        <label className="label-input font-semibold capitalize ">
                          Người phụ trách
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
                              .localeCompare(
                                (optionB?.label ?? "").toLowerCase()
                              )
                          }
                          onChange={(e, value) => {
                            console.log(">>> check select onchange:", e);
                            setUserId(e);
                          }}
                          options={listUserManager}
                          value={userId}
                        />
                      </div>
                      <div className="userUpdateItem">
                        <button onClick={onSubmit} className="userUpdateButton">
                          Cập nhật
                        </button>
                      </div>
                    </Col>
                  </Row>

                  {/* <div className="userUpdateRight">
                    <div className="userUpdateUpload">
                      <img
                        className="userUpdateImg"
                        src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                        alt=""
                      />

                      <input
                        type="file"
                        id="file"
                        style={{ display: "none" }}
                      />
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

export default DetailHub;
