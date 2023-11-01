import { Modal, Space, Table } from "antd";
import React, { useEffect, useState } from "react";

const ModalViewHistory = ({
  open,
  handleCancelOnClick,
  dataHistory,
  dateMaintenance,
  isLoading,
}) => {
  return (
    <>
      <Modal
        title="Lịch sử bảo dưỡng, bảo trì"
        open={open}
        destroyOnClose={true}
        footer={null}
        onCancel={handleCancelOnClick}
        // style={{ width: "450px" }}
      >
        {/* <FormProvider {...methods}> */}

        <Table
          loading={isLoading}
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
          ]}
          dataSource={dataHistory}
          pagination={{
            pageSize: 5,
          }}
        ></Table>
      </Modal>
    </>
  );
};

export default ModalViewHistory;
