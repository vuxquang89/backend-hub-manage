import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import {
  Space,
  Typography,
  Card,
  Row,
  Col,
  Form,
  Input,
  message,
  Tabs,
  Table,
  Popconfirm,
  // DatePicker,
  Button,
} from "antd";
// import DatePicker from "react-multi-date-picker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  UserOutlined,
  RollbackOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import "./DetailDevice.css";
import home from "../../assets/images/home.jpg";
import {
  device_trademark_validation,
  device_ratedPower_validation,
} from "../../utils/inputDetailDeviceValidations";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { FormProvider, useForm } from "react-hook-form";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import SpanLoading from "../../components/loading/SpanLoading";
import useAuth from "../../hooks/useAuth";

import ModalMaintenanceHistory from "./ModalMaintenanceHistory";
import moment from "moment";
import ModalSwitchDevice from "./ModalSwitchDevice";

import { over } from "stompjs";
import SockJS from "socketjs-client";

const DetailDevice = ({ stompClient, userData, sendPrivateValue, receive }) => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  let { hubDetailId } = useParams();
  const [form] = Form.useForm();
  // const [formHistory] = Form.useForm();
  const { TextArea } = Input;

  let navigate = useNavigate();
  const location = useLocation();
  const methods = useForm();
  const [success, setSuccess] = useState(false);
  const [mes, setMes] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [getData, setGetData] = useState(false);

  const [dataHistory, setDataHistory] = useState([]);

  const [branchId, setBranchId] = useState("");
  const [branchName, setBranchName] = useState("");
  const [deputyTechnicalDirector, setDeputyTechnicalDirector] = useState("");
  const [phoneDeputyTechnicalDirector, setPhoneDeputyTechnicalDirector] =
    useState("");
  const [emailDeputyTechnicalDirector, setEmailDeputyTechnicalDirector] =
    useState("");
  const [branchAddress, setBranchAddress] = useState("");

  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");

  const [hubId, setHubId] = useState("");
  const [hubName, setHubName] = useState("");
  const [hubAddress, setHubAddress] = useState("");
  const [hubCity, setHubCity] = useState("");
  const [hubManagerName, setHubManagerName] = useState("");
  const [hubManagerPhone, setHubManagerPhone] = useState("");

  const [deviceId, setDeviceId] = useState("");
  const [deviceName, setDeviceName] = useState("");

  const [trademark, setTrademark] = useState("");
  const [ratedPower, setRatePower] = useState("");
  const [loadDuringPowerOutage, setLoadDuringPowerOutage] = useState("");
  const [batteryQuantity, setBatteryQuantity] = useState("");
  const [batteryNumber, setBatteryNumber] = useState("");
  const [batteryCapacity, setBatteryCapacity] = useState("");
  const [productionTime, setProductionTime] = useState("");
  const [conductorType, setConductorType] = useState("");
  const [cbPower, setCBPower] = useState("");
  const [schneider, setSchneider] = useState("");
  const [yearInstall, setYearInstall] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");
  const [number, setNumber] = useState("");
  const [newDate, setNewDate] = useState("");

  //-----------

  const [openHistory, setOpenHistory] = useState(false);
  const [dateMaintenance, setDateMaintenance] = useState(new Date());
  const [dateSelect, setDateSelect] = useState("");
  const [note, setNote] = useState("");
  const [maintenanceId, setMaintenanceId] = useState("");
  const [isEditTable, setIsEditTable] = useState(false);

  //--------------
  const [openModalSwitch, setOpenModalSwitch] = useState(false);
  const [branchList, setBranchList] = useState([]);
  const [hubList, setHubList] = useState([]);

  //--------------------
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    localStorage.getItem("isLogin") && loadData();
    // getNewDate();

    receive(stompClient, userData.receiverName);
  }, [hubDetailId]);

  //-------------
  // const [userData, setUserData] = useState({
  //   username: localStorage.getItem("username"),
  //   receivername: "admin",
  //   connected: false,
  //   message: "",
  // });

  // const [stompClient, setStompClient] = useState();
  const [privateStompClient, setPirvateStompClient] = useState();
  const [isConnect, setIsConnect] = useState(false);
  const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   if (userData.message && stompClient) {
  //     stompClient?.send("/app/message", {}, JSON.stringify(userData.message));
  //   }
  // }, [userData.message]);

  // const onMessageReceive = (payload) => {
  //   console.log(
  //     "receive message---------------------",
  //     JSON.parse(payload.body)
  //   );
  // };

  // useEffect(() => {
  //   if (isConnect && stompClient) {
  //     const subScription = stompClient.subscribe(
  //       "/group/" + userData.receivername,
  //       onMessageReceive
  //     );
  //     console.log(">>>>>>>>>>>hello....");
  //     return () => {
  //       subScription.unsubscribe();
  //     };
  //   }
  // });

  // const onConnect = () => {
  //   setIsConnect(true);
  // };

  // const connect = () => {
  //   const access_token = localStorage.getItem("accessToken");
  //   const sock = new SockJS("http://localhost:8080/ws", {
  //     headers: {
  //       Authorization: `Bearer ${access_token}`,
  //     },
  //   });
  //   const temp = over(sock);
  //   setStompClient(temp);
  //   temp.connect({ headers: sock.headers }, { onConnect }, onError);
  // };

  // const connect = () => {
  //   var socket = new SockJS("http://localhost:8080/ws");
  //   const tempClient = over(socket);
  //   setStompClient(tempClient);
  //   tempClient.connect({}, function (frame) {
  //     console.log(frame);
  //     tempClient.subscribe("/user/specific", function (result) {
  //       console.log(">>>>>>> result", JSON.parse(result.body));
  //     });
  //   });

  //   socket = new SockJS("http://localhost:8080/ws");
  //   const privateTempClient = over(socket);
  //   privateTempClient.connect({}, function (frame) {
  //     console.log("frame");
  //     privateTempClient.subscribe("/user/specific", function (result) {
  //       console.log(">>>>>>private result", result.body);
  //     });
  //   });
  // };
  // const sendMessage = () => {
  //   stompClient?.send(
  //     "/app/application",
  //     {},
  //     JSON.stringify({ text: inputText })
  //   );
  // };

  // const sendMessagePrivate = () => {
  //   stompClient?.send(
  //     "/app/private",
  //     {},
  //     JSON.stringify({ text: inputText, to: "vu" })
  //   );
  // };

  // const connect = () => {
  //   const access_token = localStorage.getItem("accessToken");

  //   const Sock = new SockJS("http://localhost:8080/ws", {
  //     /*
  //     transportOptions: {
  //       "xhr-streaming": {
  //         headers: {
  //           Authorization: `Bearer ${access_token}`,
  //         },
  //       },
  //     },
  //     */
  //     headers: {
  //       Authorization: `Bearer ${access_token}`,
  //     },
  //   });

  //   stompClient = over(Sock);
  //   stompClient.connect({ headers: Sock.headers }, onConnected, onError);
  //   console.log(">>>>>connect stomp", stompClient);
  //   localStorage.setItem("stompClient", stompClient);
  // };

  // const onConnected = () => {
  //   let user_name = localStorage.getItem("username");

  //   setUserData({ ...userData, connected: true });
  //   stompClient.subscribe("/all/public", onMessageReceived);
  //   stompClient.subscribe(
  //     "/user/" + userData.username + "/private",
  //     onPrivateMessage
  //   );
  //   userJoin();
  //   // loadMessage();
  // };

  // const onMessageReceived = (payload) => {
  //   var payloadData = JSON.parse(payload.body);
  //   console.log(">>>>>payLoad data", payloadData);
  //   // switch (payloadData.status) {
  //   //   case "JOIN":
  //   //     if (!privateChats.get(payloadData.senderName)) {
  //   //       privateChats.set(payloadData.senderName, []);
  //   //       setPrivateChats(new Map(privateChats));
  //   //     }
  //   //     break;
  //   //   case "MESSAGE":
  //   //     publicChats.push(payloadData);
  //   //     setPublicChats([...publicChats]);
  //   //     break;
  //   // }
  // };

  // const userJoin = () => {
  //   var chatMessage = {
  //     senderName: userData.username,
  //     status: "JOIN",
  //   };
  //   stompClient.send("/app/application", {}, JSON.stringify(chatMessage));

  //   // privateChats.set(tab, []);
  //   // setPrivateChats(new Map(privateChats));
  // };

  // const onPrivateMessage = (payload) => {
  //   console.log(">>>>>>>>payload", payload);
  //   var payloadData = JSON.parse(payload.body);
  //   // if (privateChats.get(payloadData.senderName)) {
  //   //   privateChats.get(payloadData.senderName).push(payloadData);
  //   //   // setPrivateChats(new Map(privateChats));
  //   // } else {
  //   //   let list = [];
  //   //   list.push(payloadData);
  //   //   // privateChats.set(payloadData.senderName, list);
  //   //   // setPrivateChats(new Map(privateChats));
  //   // }
  // };

  // const onError = (err) => {
  //   console.log(">>>>>>sokcet erorerr", err);
  // };

  // const sendPrivateValue = () => {
  //   if (stompClient) {
  //     var chatMessage = {
  //       senderName: userData.username,
  //       receiverName: "admin",
  //       message: userData.message,
  //       status: "MESSAGE",
  //     };
  //     console.log(">>>>>send message", chatMessage);
  //     // if (userData.username !== tab) {
  //     //   privateChats.get(tab).push(chatMessage);
  //     //   setPrivateChats(new Map(privateChats));
  //     // }
  //     stompClient.send("/app/private", {}, JSON.stringify(chatMessage));
  //     // setUserData({ ...userData, message: "" });
  //   }
  //   console.log(">>>>>stomp null");
  // };

  const loadData = async () => {
    setFormLoading(true);
    await axiosPrivate
      .get(`/api/hub/detail/${hubDetailId}`)
      .then((res) => {
        const result = res.data;
        console.log(">>>>>get hub detail result", res.data);
        if (result.status === 100) {
          const response = result.response;
          console.log(">>>>get detail", response);

          setBranchId(response.branchId);
          setBranchName(response.branchName);
          setDeputyTechnicalDirector(response.deputyTechnicalDirector);
          setPhoneDeputyTechnicalDirector(
            response.phoneDeputyTechnicalDirector
          );
          setEmailDeputyTechnicalDirector(
            response.emailDeputyTechnicalDirector
          );
          setBranchAddress(response.branchAddress);

          setFullname(response.fullname);
          setPhone(response.phone);

          setHubId(response.hubId);
          setHubName(response.hubName);
          setHubAddress(response.hubAddress);
          setHubCity(response.hubCity);
          setHubManagerName(response.hubManagerName);
          setHubManagerPhone(response.hubManagerPhone);

          setDeviceId(response.deviceId);
          setDeviceName(response.deviceName);

          setTrademark(response.trademark);
          setRatePower(response.ratedPower);
          setLoadDuringPowerOutage(response.loadDuringPowerOutage);
          setBatteryQuantity(response.batteryQuantity);
          setBatteryNumber(response.batteryNumber);
          setBatteryCapacity(response.batteryCapacity);
          setProductionTime(response.productionTime);
          setConductorType(response.conductorType);
          setCBPower(response.cbPower);
          setSchneider(response.schneider);
          setYearInstall(response.yearInstall);
          setCurrentStatus(response.currentStatus);
          setNumber(response.number);

          setGetData(true);
        } else {
          console.log(">>>> khong tim thay ", hubDetailId);
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

  const handleUpdateSubmit = async () => {
    setFormLoading(true);
    await axiosPrivate
      .put(`/api/hub/detail/${hubDetailId}`, {
        // deviceId: deviceId,
        // hubId: hubId,
        trademark,
        ratedPower,
        loadDuringPowerOutage,
        batteryQuantity,
        batteryNumber,
        batteryCapacity,
        productionTime,
        conductorType,
        cbPower,
        schneider,
        yearInstall,
        currentStatus,
        number,
      })
      .then((res) => {
        console.log(">>>>update hub detail", res.data);
        let result = res.data;
        message.success("Cập nhật thành công");
        setFormLoading(false);
      })
      .catch((err) => {
        console.log("update hub detail error", err);
        setFormLoading(false);
        message.error("Không thể cập nhật");
        // navigate("/login", { state: { from: location }, replace: true });
      });
  };

  //-----------------
  const handleOpenHistory = async () => {
    setFormLoading(true);
    await axiosPrivate
      .get(`/api/hub/device/maintenancehistory/${hubDetailId}`)
      .then((res) => {
        const result = res.data;
        console.log(">>>>>data history", result);
        setDataHistory(result);
        //setOpenHistory(true);
        setFormLoading(false);
      })
      .catch((err) => {
        setFormLoading(false);
        console.log(">>>>get history error", err);
      });
  };

  const handleAddNewHistory = async () => {
    setFormLoading(true);
    await axiosPrivate
      .post("/api/hub/device/maintenancehistory", {
        hubDetailId: hubDetailId,
        maintenanceTime: dateMaintenance.toLocaleDateString(),
        maintenanceNote: note,
      })
      .then((res) => {
        console.log(">>>>add new history", res.data);

        //update table
        // setDataHistory([...dataHistory, res.data]);
        setDataHistory([res.data, ...dataHistory]);
        message.success("Thêm mới thành công");
        send();
        form.resetFields();
        resetFormHistory();
        setFormLoading(false);
      })
      .catch((err) => {
        console.log("add new history error", err);
        setFormLoading(false);
        message.error("Không thể thêm mới");
        // navigate("/login", { state: { from: location }, replace: true });
      });
  };

  /*---------------------------------*/
  const dateFormat = "YYYY-MM-DD";

  const confirmDeleteHistory = async (record) => {
    setFormLoading(true);

    await axiosPrivate
      .delete(`/api/hub/device/maintenancehistory/${maintenanceId}`)
      .then((res) => {
        console.log(">>>>delete history", res.data);

        //update dataSource

        if (res.data) {
          let data = dataHistory;

          data = data.filter((item) => item.id !== maintenanceId);
          setDataHistory(data);
          handleCancelEditHistory();
          message.success("Xóa thành công");
        } else {
          message.warning("Không thể xóa");
        }

        setFormLoading(false);
      })
      .catch((err) => {
        console.log("delete history error", err);
        message.error("Không thể xóa");

        setFormLoading(false);
        // navigate("/login", { state: { from: location }, replace: true });
      });
  };
  const handleEditOnClick = (e) => {
    console.log("edit click", e);
    setDateMaintenance(new Date(e.maintenanceTime));
    setNote(e.maintenanceNote);
    setMaintenanceId(e.id);
    setIsEditTable(true);
    console.log("datepick", note);
  };

  const handleSaveEditHistory = async () => {
    setFormLoading(true);
    await axiosPrivate
      .put(`/api/hub/device/maintenancehistory/${maintenanceId}`, {
        maintenanceTime: dateMaintenance.toLocaleDateString(),
        maintenanceNote: note,
      })
      .then((res) => {
        const result = res.data;
        console.log(">>>>>get hub detail result", res.data);
        if (result.status === 100) {
          const response = result.response;
          updateDataHistory(response);
          form.resetFields();
          resetFormHistory();
          setIsEditTable(false);
          message.success("Cập nhật thành công");
        } else {
          console.log(">>>> khong tim thay ", hubDetailId);
          message.warning("Không thể cập nhật");
          setIsEditTable(false);
        }
        console.log(">>>>response save edit history", result.response);
        setFormLoading(false);
      })
      .catch((err) => {
        console.log(">>>>save edit history error", err);
        setFormLoading(false);
        setIsEditTable(false);
        // navigate("/login", { state: { from: location }, replace: true });
      });
  };

  const updateDataHistory = (response) => {
    const updateHistoryArray = dataHistory.map((maintenance) => {
      if (maintenance.id === maintenanceId) {
        return {
          ...maintenance,
          maintenanceNote: response.maintenanceNote,
          maintenanceTime: response.maintenanceTime,
        };
      } else {
        return maintenance;
      }
    });
    setDataHistory(updateHistoryArray);
  };

  const handleCancelEditHistory = () => {
    resetFormHistory();
    setIsEditTable(false);
  };

  function resetFormHistory() {
    console.log(">>>>reset form hítory");
    setNote("");
    setDateMaintenance(new Date());
  }

  //--------------------
  const handleOpenModalSwitch = () => {
    setFormLoading(true);
    getBranchList();
  };

  const getBranchList = async () => {
    await axiosPrivate
      .get("/api/branch/list")
      .then((res) => {
        console.log(">>>>get list branch", res.data);
        let result = res.data;
        setBranchList(result);

        getHubList(branchId);

        setFormLoading(false);
        setOpenModalSwitch(true);
      })
      .catch((err) => {
        console.log("get list hub branch", err);

        // navigate("/login", { state: { from: location }, replace: true });
      });
  };

  const getHubList = async (branchId) => {
    await axiosPrivate
      .get(`/api/hub/list/branch/${branchId}`)
      .then((res) => {
        console.log(">>>>get list hub select", res.data);
        setHubList(res.data);

        setFormLoading(false);
      })
      .catch((err) => {
        console.log("get list hub select error", err);
        setFormLoading(false);
        // navigate("/login", { state: { from: location }, replace: true });
      });
  };

  const handleSwitchSubmit = async () => {
    console.log(">>>>>send hubId", hubId);
    setFormLoading(true);
    await axiosPrivate
      .put(`/api/hub/detail/switch/${hubDetailId}`, { hubId: hubId })
      .then((res) => {
        console.log(">>>>save switch hub select", res.data);
        // setHubList(res.data);
        message.success(`Chuyển thiết bị thành công`);
        setOpenModalSwitch(false);
        // loadData();
        send();
        setFormLoading(false);
        navigate("/manager", {
          state: { from: location },
          replace: true,
        });
      })
      .catch((err) => {
        console.log("save switch hub error", err);
        setOpenModalSwitch(false);
        setFormLoading(false);
        message.error(`Chuyển thiết bị thành công`);
        // navigate("/login", { state: { from: location }, replace: true });
      });
  };

  const handleOnChangeBranch = (branchId) => {
    setFormLoading(true);
    setHubId("");
    getHubList(branchId);
  };

  const handleCancelOnClick = () => {
    setOpenModalSwitch(false);
  };

  const onChangeTabs = (key) => {
    console.log(key);
    if (key === "2") {
      console.log(">>>get history");
      handleOpenHistory();
    }
  };

  const items = [
    {
      key: "1",
      label: "Thông tin thiết bị",
      children: (
        <>
          <Row>
            <Col span={12}>
              <Typography.Title level={5}>Thông tin thiết bị</Typography.Title>
            </Col>
          </Row>
          <div className="mt-5">
            {success && (
              <p className="flex items-center gap-1 mb-5 font-semibold text-red-500">
                {mes}
              </p>
            )}
          </div>
          {/* <FormProvider {...methods}> */}
          <Form name="formHubDetail" form={form} onFinish={handleUpdateSubmit}>
            <Row>
              <Col span={24}>
                <Row>
                  <Col span={8} className="pe-50">
                    <div className="updateItem">
                      <label>Thương hiệu</label>
                      <Form.Item name="trademark">
                        <Input
                          defaultValue={trademark}
                          onChange={(e) => {
                            setTrademark(e.target.value);
                          }}
                        />
                      </Form.Item>
                    </div>
                    <div className="updateItem">
                      <label>CS định mức (KVA)</label>
                      <Form.Item name="ratedPower">
                        <Input
                          defaultValue={ratedPower}
                          onChange={(e) => {
                            setRatePower(e.target.value);
                          }}
                        />
                      </Form.Item>
                    </div>
                    <div className="updateItem">
                      <label>%Tải khi mất điện</label>
                      <Form.Item name="loadDuringPowerOutage">
                        <Input
                          defaultValue={loadDuringPowerOutage}
                          onChange={(e) => {
                            setLoadDuringPowerOutage(e.target.value);
                          }}
                        />
                      </Form.Item>
                    </div>
                    <div className="updateItem">
                      <label>Số bình/ Chuỗi hiện tại</label>
                      <Form.Item name="batteryQuantity">
                        <Input
                          defaultValue={batteryQuantity}
                          onChange={(e) => {
                            setBatteryQuantity(e.target.value);
                          }}
                        />
                      </Form.Item>
                    </div>
                  </Col>
                  <Col span={8} className="pe-50">
                    <div className="updateItem">
                      <label>Số chuỗi Battery hiện tại</label>
                      <Form.Item name="batteryNumber">
                        <Input
                          defaultValue={batteryNumber}
                          onChange={(e) => {
                            setBatteryNumber(e.target.value);
                          }}
                        />
                      </Form.Item>
                    </div>
                    <div className="updateItem">
                      <label>Model (dung lượng AH)</label>
                      <Form.Item name="batteryCapacity">
                        <Input
                          defaultValue={batteryCapacity}
                          onChange={(e) => {
                            setBatteryCapacity(e.target.value);
                          }}
                        />
                      </Form.Item>
                    </div>
                    <div className="updateItem">
                      <label>Ngày sản xuất</label>
                      <Form.Item name="productionTime">
                        <Input
                          defaultValue={productionTime}
                          onChange={(e) => {
                            setProductionTime(e.target.value);
                          }}
                        />
                      </Form.Item>
                    </div>
                    <div className="updateItem">
                      <label>Dây dẫn</label>
                      <Form.Item name="conductorType">
                        <Input
                          defaultValue={conductorType}
                          onChange={(e) => {
                            setConductorType(e.target.value);
                          }}
                        />
                      </Form.Item>
                    </div>
                    <div className="updateItem">
                      <label>CB nguồn</label>
                      <Form.Item name="cbPower">
                        <Input
                          defaultValue={cbPower}
                          onChange={(e) => {
                            setCBPower(e.target.value);
                          }}
                        />
                      </Form.Item>
                    </div>
                  </Col>
                  <Col span={8} className="pe-50">
                    <div className="updateItem">
                      <label>Cắt lọc sét</label>
                      <Form.Item name="schneider">
                        <Input
                          defaultValue={schneider}
                          onChange={(e) => {
                            setSchneider(e.target.value);
                          }}
                        />
                      </Form.Item>
                    </div>
                    <div className="updateItem">
                      <label>Năm lắp đặt HTĐ</label>
                      <Form.Item name="yearInstall">
                        <Input
                          defaultValue={yearInstall}
                          onChange={(e) => {
                            setYearInstall(e.target.value);
                          }}
                        />
                      </Form.Item>
                    </div>
                    <div className="updateItem">
                      <label>Hiện trạng</label>
                      <Form.Item name="currentStatus">
                        <Input
                          defaultValue={currentStatus}
                          onChange={(e) => {
                            setCurrentStatus(e.target.value);
                          }}
                        />
                      </Form.Item>
                    </div>
                    <div className="updateItem">
                      <label>Số lượng</label>
                      <Form.Item name="number">
                        <TextArea
                          defaultValue={number}
                          onChange={(e) => {
                            setNumber(e.target.value);
                          }}
                        />
                      </Form.Item>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>

            <div className="bottomForm text-align-center">
              <button className="userUpdateButton">Cập nhật</button>
            </div>
          </Form>
          {/* </FormProvider> */}
        </>
      ),
    },
    {
      key: "2",
      label: "Lịch sử bảo dưỡng",
      children: (
        <>
          <Form
            //   layout="horizontal"
            form={form}
            onFinish={(values) => {
              !isEditTable && handleAddNewHistory(values);
            }}
          >
            <Row className="cardBody mb-10">
              <Col span={8}>
                <div className="borderItem">
                  <label>Chọn ngày</label>
                  <Form.Item
                    name="dateMaintenance"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Please input the title of collection!",
                    //   },
                    //   // {
                    //   //   pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}",
                    //   // },
                    // ]}
                  >
                    <DatePicker
                      // defaultValue={
                      //   dateMaintenance
                      //     ? moment(dateMaintenance, dateFormat)
                      //     : null
                      // }
                      // onChange={handleDatePickerOnChange}
                      // // value={dateMaintenance}
                      // format={dateFormat}
                      // value={dateMaintenance}
                      // format={dateFormat}
                      // onChange={handleDatePickerOnChange}
                      //filterDate={(dateMaintenance) => new Date() < dateMaintenance}
                      className="datePicker"
                      selected={dateMaintenance}
                      dateFormat="yyyy-MM-dd"
                      disabled={isEditTable}
                      onChange={(date) => {
                        console.log(">>>>>date", date.toLocaleDateString());
                        setDateMaintenance(date);
                      }}
                      minDate={moment().toDate()}
                    />

                    {/* <input
                      type="date"
                      data-date-format="DD MMMM YYYY"
                      className="datePicker"
                      min="1997-01-01"
                      max="2030-12-31"
                      value="10/20/2023"
                      onChange={(e) => {
                        setDateMaintenance(e.target.value);
                      }}
                    /> */}
                  </Form.Item>
                </div>
              </Col>
              <Col span={12}>
                <div className="borderItem">
                  <label>Nội dung</label>
                  <Form.Item
                    name="maintenanceNote"
                    rules={[
                      {
                        required: true,
                        message: "Please input the title of collection!",
                      },
                    ]}
                  >
                    <textarea
                      defaultValue={note}
                      onChange={(e) => {
                        setNote(e.target.value);
                      }}
                      rows={4}
                      cols={40}
                    />
                  </Form.Item>
                </div>
              </Col>
              <Col span={4}>
                <div className="borderItem ">
                  {isEditTable ? (
                    <>
                      <button
                        className="buttonSave mb-10"
                        onClick={() => {
                          handleSaveEditHistory();
                        }}
                      >
                        Lưu
                      </button>
                      <Button
                        onClick={() => {
                          handleCancelEditHistory();
                        }}
                      >
                        Hủy
                      </Button>
                    </>
                  ) : (
                    <button className="buttonAdd mb-10">Thêm</button>
                  )}
                </div>
              </Col>
            </Row>
          </Form>

          <Table
            // loading={loading}
            columns={[
              {
                title: "Ngày bảo dưỡng",
                dataIndex: "maintenanceTime",
                key: "maintenanceTime",
              },
              {
                title: "Nội dung bảo dưỡng",
                dataIndex: "maintenanceNote",
                key: "maintenanceNote",
              },

              {
                title: "Action",
                key: "hubId",
                dataIndex: "hubId",
                render: (text, record) => (
                  <>
                    <EditOutlined
                      className="buttonIconEdit"
                      onClick={() => {
                        handleEditOnClick(record);
                      }}
                    />
                    <Popconfirm
                      title="Alarm"
                      description="Bạn có chắc muốn xóa?"
                      onConfirm={confirmDeleteHistory}
                      onCancel={() => {}}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined
                        className="btnUserDelete"
                        onClick={() => {
                          setMaintenanceId(record.id);
                          console.log("Delete click", record);
                        }}
                      />
                    </Popconfirm>
                  </>
                ),
              },
            ]}
            dataSource={dataHistory}
            pagination={{
              pageSize: 5,
            }}
          ></Table>
        </>
      ),
    },
  ];

  const send = () => {
    var sendMessage = {
      senderName: auth.username,
      receiverName: auth.username,
      message: "",
      status: "MESSAGE",
      action: "EDIT_MAINTENANCE",
    };
    console.log(">>>>>>>>>>>>>username send edit", auth.username);
    sendPrivateValue(stompClient, sendMessage);
  };

  return localStorage.getItem("isLogin") ? (
    <>
      <div className="container">
        <div className="main-container">
          <Row>
            <Col span={24} className="title-container">
              <Typography.Title level={3}>
                Thông tin chi tiết - {deviceName}
              </Typography.Title>
            </Col>
          </Row>
          {getData ? (
            <Row>
              <Col span={24}>
                <Row>
                  <Col span={8}>
                    <Card>
                      <Row>
                        <Col span={24}>
                          <Typography.Title level={5}>
                            Thông tin chi nhánh
                          </Typography.Title>
                          <Row>
                            <Col span={24}>
                              <div class="cardShowTop">
                                <img src={home} alt="" class="cardShowImg" />
                                <div class="cardShowTopTitle">
                                  <span class="cardShowName">{branchName}</span>
                                  <span class="cardShowTitle">{branchId}</span>
                                </div>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col span={24}>
                              <div class="cardShowBottom">
                                <EnvironmentOutlined className="cardShowIcon" />
                                <span class="cardShowInfoTitle">
                                  {branchAddress}
                                </span>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col span={12}>
                              <div class="cardShowBottom">
                                <span class="cardShowTitle">
                                  Thông tin PGĐ KT
                                </span>
                                <div class="cardShowInfo">
                                  <UserOutlined className="cardShowIcon" />
                                  <span class="cardShowInfoTitle">
                                    {deputyTechnicalDirector}
                                  </span>
                                </div>
                                <div className="cardShowInfo">
                                  <PhoneOutlined className="cardShowIcon" />
                                  <span className="cardShowInfoTitle">
                                    {phoneDeputyTechnicalDirector}
                                  </span>
                                </div>
                                <div className="cardShowInfo">
                                  <MailOutlined className="cardShowIcon" />
                                  <span className="cardShowInfoTitle">
                                    {emailDeputyTechnicalDirector}
                                  </span>
                                </div>

                                <span class="cardShowTitle">
                                  Nhân sự chuyên trách
                                </span>
                                <div class="cardShowInfo">
                                  <UserOutlined className="cardShowIcon" />
                                  <span class="cardShowInfoTitle">
                                    {fullname}
                                  </span>
                                </div>
                                <div className="cardShowInfo">
                                  <PhoneOutlined className="cardShowIcon" />
                                  <span className="cardShowInfoTitle">
                                    {phone}
                                  </span>
                                </div>
                              </div>
                            </Col>
                            <Col span={12}>
                              <div class="cardShowBottom">
                                <span class="cardShowTitle">
                                  Thông tin phòng máy
                                </span>
                                <div class="cardShowInfo">
                                  <HomeOutlined className="cardShowIcon" />
                                  <span class="cardShowInfoTitle">
                                    {hubName}
                                  </span>
                                </div>
                                <div class="cardShowInfo">
                                  <EnvironmentOutlined className="cardShowIcon" />
                                  <span class="cardShowInfoTitle">
                                    {hubAddress} - {hubCity}
                                  </span>
                                </div>

                                <div class="cardShowInfo">
                                  <UserOutlined className="cardShowIcon" />
                                  <span class="cardShowInfoTitle">
                                    {hubManagerName}
                                  </span>
                                </div>
                                <div className="cardShowInfo">
                                  <PhoneOutlined className="cardShowIcon" />
                                  <span className="cardShowInfoTitle">
                                    {hubManagerPhone}
                                  </span>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Space direction="vertical"></Space>
                    </Card>
                  </Col>
                  <Col className="ps-12" span={16}>
                    <Row>
                      <Col className="mb-10" span={24}>
                        <Space direction="vertical">
                          <div className="buttonContainer f-e">
                            <button
                              className="buttonSwitch"
                              onClick={() => {
                                handleOpenModalSwitch();
                              }}
                              title="Chuyển thiết bị đến phòng Hub khác"
                            >
                              Chuyển thiết bị
                            </button>
                            {/* <button
                              title="Xem lịch sử bảo dưỡng"
                              className="buttonView"
                              onClick={handleOpenHistory}
                            >
                              Lịch sử bảo dưỡng
                            </button> */}

                            <RollbackOutlined
                              onClick={() =>
                                navigate("/manager", {
                                  state: { from: location },
                                  replace: true,
                                })
                              }
                              className="buttonRollBack"
                              title="Quay lại"
                            />
                          </div>
                        </Space>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <Card>
                          <Tabs
                            defaultActiveKey="1"
                            items={items}
                            onChange={onChangeTabs}
                          />
                        </Card>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          ) : (
            <div>
              <label>Không có dữ liệu</label>
            </div>
          )}
        </div>
      </div>
      {/* <ModalMaintenanceHistory
        open={openHistory}
        cancelOnClick={cancelOnClick}
        dataHistory={dataHistory}
      /> */}
      <ModalSwitchDevice
        open={openModalSwitch}
        handleCancelOnClick={handleCancelOnClick}
        branchList={branchList}
        branchValue={branchId}
        setBranchValue={setBranchId}
        handleOnChangeBranch={handleOnChangeBranch}
        hubList={hubList}
        hubId={hubId}
        setHubId={setHubId}
        handleSubmit={handleSwitchSubmit}
        title="Chuyển thiết bị đến Hub khác"
      />
      {formLoading && <SpanLoading />}
    </>
  ) : (
    <div>
      Bạn cần <a href="/login"> đăng nhập</a>
    </div>
  );
};

export default DetailDevice;
