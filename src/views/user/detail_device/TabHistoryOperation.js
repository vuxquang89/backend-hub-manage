import { Table } from "antd";
import React from "react";

const TabHistoryOperation = ({ isLoading, dataSource }) => {
  return (
    <Table
      loading={isLoading}
      columns={[
        {
          title: "Ngày thao tác",
          dataIndex: "createDate",
          key: "createDate",
        },
        {
          title: "User thao tác",
          dataIndex: "createBy",
          key: "createBy",
        },

        {
          title: "Thao tác",
          key: "action",
          dataIndex: "action",
        },
        {
          title: "Nội dung thao tác",
          key: "content",
          dataIndex: "content",
        },
      ]}
      dataSource={dataSource}
      pagination={{
        pageSize: 5,
      }}
    ></Table>
  );
};

export default TabHistoryOperation;
