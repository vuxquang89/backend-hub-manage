import { Card, Space, Statistic, Table, Typography } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getOrders } from "../../API";
import useAuth from "../../hooks/useAuth";

const DashBoard = () => {
  const { auth } = useAuth();

  return (
    <Space size={20} direction="vertical" className="ps-12">
      <Typography.Title level={4}>Xin chào {auth.username}</Typography.Title>
      {/* <Space direction="horizontal">
          <DashBoardCard title={"Orders"} value={1234} />
          <DashBoardCard title={"Orders"} value={1234} />
          <DashBoardCard title={"Orders"} value={1234} />
          <DashBoardCard title={"Orders"} value={1234} />
        </Space>
        <Space>
          <RecentOrders />
        </Space> */}
    </Space>
  );
};

function DashBoardCard({ title, value }) {
  return (
    <Card>
      <Space direction="horizontal">
        <ShoppingCartOutlined />
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}

function RecentOrders() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getOrders().then((res) => {
      setDataSource(res.products.splice(0, 3));
      setLoading(false);
    });
  }, []);
  return (
    <>
      <Typography.Text>Recent Orders</Typography.Text>
      <Table
        columns={[
          {
            title: "Title",
            dataIndex: "title",
          },
          {
            title: "Quantity",
            dataIndex: "quantity",
          },
          {
            title: "Price",
            dataIndex: "discountedPrice",
          },
        ]}
        loading={loading}
        dataSource={dataSource}
        pagination={false}
      ></Table>
    </>
  );
}
export default DashBoard;
