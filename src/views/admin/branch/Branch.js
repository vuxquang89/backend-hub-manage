import "./Branch.css";
import { useEffect, useState } from "react";
import { Typography, Space, Table, Flex } from "antd";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import { listBranch } from "../../../API/dummyData";
import { toast } from "react-toastify";

function Branch() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    // getInventory().then((res) => {
    //   setDataSource(res.products);
    //   setLoading(false);
    // });
    setDataSource(listBranch);
    setLoading(false);
  }, []);

  const handleDeleteBranchOnClick = (record) => {
    let data = dataSource;

    data = data.filter((item) => item.branchId !== record.branchId);
    toast.success("Xóa thành công");
    setDataSource(data);
  };

  return (
    <Space size={20} direction="vertical" className="ps-12">
      <Flex justify="space-between" align="center">
        <Typography.Title level={4}>Danh sách chi nhánh</Typography.Title>
        <Link to="/admin/branch/add">
          <button className="btnAddUser">Thêm mới</button>
        </Link>
      </Flex>
      <Table
        loading={loading}
        columns={[
          {
            title: "Tên chi nhánh",
            dataIndex: "branchName",
          },
          {
            title: "Giám Đốc KT",
            dataIndex: "deputyTechnicalDirector",
          },
          {
            title: "Số điên thoại",
            dataIndex: "phoneDeputyTechnicalDirector",
          },
          {
            title: "Email",
            dataIndex: "emailDeputyTechnicalDirector",
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
                <DeleteOutlined
                  className="btnUserDelete"
                  onClick={() => handleDeleteBranchOnClick(record)}
                />
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
  );
}

export default Branch;
