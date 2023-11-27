import "./Branch.css";
import { useEffect, useState } from "react";
import { Typography, Space, Table, Flex, Input, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import SpanLoading from "../../../components/loading/SpanLoading";
import { listBranch } from "../../../API/dummyData";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

function Branch() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [searchedText, setSearchText] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [branchId, setBranchId] = useState("");

  useEffect(() => {
    // getInventory().then((res) => {
    //   setDataSource(res.products);
    //   setLoading(false);
    // });
    // setDataSource(listBranch);
    // setLoading(false);
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    await axiosPrivate
      .get("/api/branch")
      .then((res) => {
        console.log(">>>>get branch", res.data);
        setDataSource(res.data);

        setLoading(false);
      })
      .catch((err) => {
        console.log("get branch error", err);
        setLoading(false);
        navigate("/login", { state: { from: location }, replace: true });
      });
    // } catch (err) {
    //   console.log("get branch error", err);
    //   setLoading(false);
    //   // navigate("/login", { state: { from: location }, replace: true });
    // }
  };

  const handleDeleteBranchOnClick = (record) => {
    setBranchId(record.branchId);
  };

  // const deleteBranch = async () => {
  //   await axiosPrivate
  //     .delete(`/api/branch/${branchId}`)
  //     .then((res) => {
  //       console.log(">>>>> delete branch result", res.data);
  //     })
  //     .catch((err) => {
  //       console.log(">>>>>delete branch error", err);
  //     });
  // };

  const confirmDeleteBranch = async () => {
    setFormLoading(true);
    await axiosPrivate
      .delete(`/api/branch/${branchId}`)
      .then((res) => {
        console.log(">>>>> delete branch result", res.data);
        let result = res.data;
        if (result) {
          let data = dataSource;

          data = data.filter((item) => item.branchId !== branchId);
          toast.success("Xóa thành công");
          setDataSource(data);
        } else {
          toast.warning("Không thể thành công");
        }
        setFormLoading(false);
      })
      .catch((err) => {
        console.log(">>>>>delete branch error", err);
        toast.error("Không thể thành công");
        setFormLoading(false);
      });
  };

  const cancel = (e) => {
    console.log(e);
    setBranchId("");
    //message.error('Click on No');
  };

  return (
    <>
      <Space size={20} direction="vertical" className="ps-12">
        <Flex justify="space-between" align="center">
          <Typography.Title level={4}>Danh sách chi nhánh</Typography.Title>
          <Link to="/admin/branch/add">
            <button className="btnAddUser">Thêm mới</button>
          </Link>
        </Flex>
        <Space>
          <Input
            placeholder="Tên chi nhánh..."
            onSearch={(value) => {
              setSearchText(value);
            }}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            prefix={<SearchOutlined />}
          />
        </Space>
        <Table
          loading={loading}
          columns={[
            {
              title: "Tên chi nhánh",
              dataIndex: "branchName",
              key: "branchName",
              filteredValue: [searchedText],
              onFilter: (value, record) => {
                return (
                  String(record.branchName)
                    .toLowerCase()
                    .includes(value.toLowerCase()) ||
                  String(record.deputyTechnicalDirector)
                    .toLowerCase()
                    .includes(value.toLowerCase()) ||
                  String(record.emailDeputyTechnicalDirector)
                    .toLowerCase()
                    .includes(value.toLowerCase())
                );
              },
            },
            {
              title: "P.Giám Đốc KT",
              dataIndex: "deputyTechnicalDirector",
              key: "deputyTechnicalDirector",
              render: (text, record) => (
                <>{text && text.length > 0 ? text : "NULL"}</>
              ),
            },
            {
              title: "Số điên thoại",
              dataIndex: "phoneDeputyTechnicalDirector",
              key: "phoneDeputyTechnicalDirector",
              render: (text, record) => (
                <>{text && text.length > 0 ? text : "NULL"}</>
              ),
            },
            {
              title: "Email",
              dataIndex: "emailDeputyTechnicalDirector",
              key: "emailDeputyTechnicalDirector",
              render: (text, record) => (
                <>{text && text.length > 0 ? text : "NULL"}</>
              ),
            },
            {
              title: "Action",
              key: "id",
              dataIndex: "id",
              render: (text, record) => (
                <>
                  <Link to={"/admin/branch/" + record.branchId}>
                    <button
                      className="btnUserEdit"
                      onClick={() => {
                        console.log(record);
                      }}
                    >
                      Edit
                    </button>
                  </Link>
                  <Popconfirm
                    title="Alarm"
                    description="Bạn có chắc muốn xóa?"
                    onConfirm={confirmDeleteBranch}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <DeleteOutlined
                      className="btnUserDelete"
                      onClick={() => handleDeleteBranchOnClick(record)}
                    />
                  </Popconfirm>
                </>
              ),
            },
          ]}
          dataSource={dataSource}
          pagination={{
            pageSize: 5,
          }}
        ></Table>
      </Space>
      {formLoading && <SpanLoading />}
    </>
  );
}

export default Branch;
