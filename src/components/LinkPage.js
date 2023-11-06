import { useState } from "react";
import { Link } from "react-router-dom";
import { over } from "stompjs";
import SockJS from "sockjs-client";

var stompClient = null;
const LinkPage = () => {
  const [privateChats, setPrivateChats] = useState(new Map());
  const [publicChats, setPublicChats] = useState([]);
  const [tab, setTab] = useState("C-Mart");
  const [isLoading, setIsLoading] = useState(false);
  const [nameChat, setNameChat] = useState("vu");
  // const [stompClient, setStompClient] = useState();
  const [userData, setUserData] = useState({
    // username: localStorage.getItem("username"),
    username: nameChat,
    receivername: tab,
    connected: false,
    message: "",
  });

  /*
  useEffectOnce(() => {
    // code here
    if (userData.connected) {
      console.log("run code load message");
      loadMessage();
    }
  });
*/
  const connect = () => {
    //const access_token = localStorage.getItem("accessToken");
    const access_token = "askldflkjdflksjdf";

    const Sock = new SockJS("http://localhost:8080/chat");
    const headers = {
      Authorization: `Bearer ${access_token}`,
      "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
    };

    // const stomp = over(Sock);
    // setStompClient(stomp);
    // stomp.connect(headers, onConnected, onError);
    //stompClient = over(Sock);
    // stompClient.connect(headers, onConnected, onError);

    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`: ${name}-`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
  }

  const onConnected = () => {
    let user_name = localStorage.getItem("username");
    console.log(">>>>>>>>>connect.....");
    setUserData({ ...userData, connected: true });

    stompClient.subscribe(
      "/user/" + userData.username + "/private",
      onPrivateMessage
    );
    userJoin();
    // loadMessage();
  };

  const userJoin = () => {
    var chatMessage = {
      senderName: userData.username,
      status: "JOIN",
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));

    privateChats.set(tab, []);
    setPrivateChats(new Map(privateChats));
  };

  const onPrivateMessage = (payload) => {
    console.log(">>>>>>>>>receive message", payload);
    var payloadData = JSON.parse(payload.body);
    if (privateChats.get(payloadData.senderName)) {
      privateChats.get(payloadData.senderName).push(payloadData);
      setPrivateChats(new Map(privateChats));
    } else {
      let list = [];
      list.push(payloadData);
      privateChats.set(payloadData.senderName, list);
      setPrivateChats(new Map(privateChats));
    }
  };

  const onError = (err) => {
    console.log(err);
  };

  const loadMessage = () => {
    setIsLoading(true);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("accessToken")
    );
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:8080/messages/customer", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.status);
      })
      .then((result) => {
        var payloadData = result.body;

        payloadData.map((el) => {
          console.log("get message", el);
          publicChats.push(el);
          setPublicChats([...publicChats]);
        });
        console.log(privateChats);
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch((error) => console.log("error", error));
  };

  const sendPrivateValue = () => {
    if (stompClient) {
      var chatMessage = {
        senderName: userData.username,
        receiverName: "vu",
        message: userData.message,
        status: "MESSAGE",
        action: "EDIT_MAINTENANCE",
      };

      if (userData.username !== tab) {
        privateChats.get(tab).push(chatMessage);
        setPrivateChats(new Map(privateChats));
      }
      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  return (
    <div className="container">
      {userData.connected ? (
        <div className="chat-box">
          <div className="member-list">
            <ul>
              <li className="member active">C-Mart</li>
            </ul>
          </div>

          <div className="chat-content">
            <ul className="chat-messages">
              {publicChats.map((chat, index) => (
                <li
                  className={`message ${
                    chat.senderName === userData.username && "self"
                  }`}
                  key={index}
                >
                  {chat.senderName !== userData.username && (
                    <div className="avatar">{chat.senderName}</div>
                  )}
                  <div className="message-data">{chat.message}</div>
                  {chat.senderName === userData.username && (
                    <div className="avatar self">{chat.senderName}</div>
                  )}
                </li>
              ))}

              {[...privateChats.get(tab)].map((chat, index) => (
                <li
                  className={`message ${
                    chat.senderName === userData.username && "self"
                  }`}
                  key={index}
                >
                  {chat.senderName !== userData.username && (
                    <div className="avatar">{chat.senderName}</div>
                  )}
                  <div className="message-data">{chat.message}</div>
                  {chat.senderName === userData.username && (
                    <div className="avatar self">{chat.senderName}</div>
                  )}
                </li>
              ))}
            </ul>

            <div className="send-message">
              <input
                type="text"
                className="input-message"
                placeholder="enter the message"
                value={userData.message}
                onChange={handleMessage}
              />
              <button
                type="button"
                className="send-button"
                onClick={sendPrivateValue}
              >
                send
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="register">
          <input
            onChange={(e) => {
              setNameChat(e.target.value);
              console.log(">>>>name chat", nameChat);
            }}
            value={nameChat}
          />
          <button type="button" onClick={connect}>
            connect
          </button>
        </div>
      )}
    </div>
  );
};

export default LinkPage;
