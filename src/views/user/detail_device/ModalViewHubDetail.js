import React, { useState } from "react";
import { Modal, Row, Col, Button } from "antd";

const ModalViewHubDetail = ({
  title,
  open,
  isLoading,
  handleCancelOnClick,
  dataHubDetailAfterChange,
  dataHistoryHubDetailBeforeChange,
}) => {
  console.log(
    ">>>>>>>dataHubDetailAfterChange",
    dataHistoryHubDetailBeforeChange
  );
  const [index, setIndex] = useState(0);
  // Click the button - update the index
  function nextElement(arr) {
    setIndex(index + 1);
    console.log(">>>>>>>set next index", index);
  }

  // Return some JSX by slicing the array up
  // to the index, and then `map` over that array
  // and return some divs
  function getElements(arr, index) {
    return Array.from(arr)
      .slice(index, index + 1)
      .map((el) => {
        return (
          <>
            <div className="borderItem">
              <label>{el.status} khi thay đổi</label>
            </div>
            {el.modifiedDate && el.modifiedDate.length > 0 && (
              <div className="borderItem">
                <p>
                  Thời gian sửa: <strong>{el.modifiedDate}</strong>
                </p>
              </div>
            )}
            {el.modifiedBy && el.modifiedBy.length > 0 && (
              <div className="borderItem">
                <p>
                  User sửa: <strong>{el.modifiedBy}</strong>
                </p>
              </div>
            )}
            {el.trademark && el.trademark.length > 0 && (
              <div className="borderItem">
                <p>
                  Thương hiệu: <strong>{el.trademark}</strong>
                </p>
              </div>
            )}
            {el.ratedPower && el.ratedPower.length > 0 && (
              <div className="borderItem">
                <p>
                  CS đinh mức(KVA): <strong>{el.ratedPower}</strong>
                </p>
              </div>
            )}
            {el.loadDuringPowerOutage &&
              el.loadDuringPowerOutage.length > 0 && (
                <div className="borderItem">
                  <p>
                    %Tải khi mất điện:{" "}
                    <strong>{el.loadDuringPowerOutage}</strong>
                  </p>
                </div>
              )}
            {el.batteryQuantity && el.batteryQuantity.length > 0 && (
              <div className="borderItem">
                <p>
                  Số bình hiện tại: <strong>{el.batteryQuantity}</strong>
                </p>
              </div>
            )}
            {el.batteryNumber && el.batteryNumber.length > 0 && (
              <div className="borderItem">
                <p>
                  Số chuỗi Battery hiện tại: <strong>{el.batteryNumber}</strong>
                </p>
              </div>
            )}
            {el.batteryCapacity && el.batteryCapacity.length > 0 && (
              <div className="borderItem">
                <p>
                  Model(dung lượng AH): <strong>{el.batteryCapacity}</strong>
                </p>
              </div>
            )}
            {el.productionTime && el.productionTime.length > 0 && (
              <div className="borderItem">
                <p>
                  Ngày sản xuất: <strong>{el.productionTime}</strong>
                </p>
              </div>
            )}
            {el.conductorType && el.conductorType.length > 0 && (
              <div className="borderItem">
                <p>
                  Dây dẫn: <strong>{el.conductorType}</strong>
                </p>
              </div>
            )}
            {el.cbPower && el.cbPower.length > 0 && (
              <div className="borderItem">
                <p>
                  CB nguồn: <strong>{el.cbPower}</strong>
                </p>
              </div>
            )}
            {el.schneider && el.schneider.length > 0 && (
              <div className="borderItem">
                <p>
                  Cắt lọc sét: <strong>{el.schneider}</strong>
                </p>
              </div>
            )}
            {el.yearInstall && el.yearInstall.length > 0 && (
              <div className="borderItem">
                <p>
                  Năm lắp đặt HTĐ: <strong>{el.yearInstall}</strong>
                </p>
              </div>
            )}
            {el.currentStatus && el.currentStatus.length > 0 && (
              <div className="borderItem">
                <p>
                  Hiện trạng: <strong>{el.currentStatus}</strong>
                </p>
              </div>
            )}
            {el.number && el.number.length > 0 && (
              <div className="borderItem">
                <p>
                  Số lượng: <strong>{el.number}</strong>
                </p>
              </div>
            )}

            <div className="borderItem">
              <p>
                Đặt lịch bảo dưỡng:{" "}
                <strong>{el.orderMaintenance === true ? "Có" : "Không"}</strong>
              </p>
            </div>

            <div className="borderItem">
              <p>
                Số ngày BD định kỳ: <strong>{el.dateMaintenance}</strong>
              </p>
            </div>
          </>
        );
      });
  }

  return (
    <Modal
      title="Chi tiết nội dung chỉnh sửa"
      open={open}
      destroyOnClose={true}
      // onOk={form.submit}
      confirmLoading={isLoading}
      onCancel={handleCancelOnClick}
      footer={null}

      // style={{ width: "450px" }}
    >
      {/* <FormProvider {...methods}> */}

      <Row>
        <Col span={12}>
          {Object.keys(dataHistoryHubDetailBeforeChange).length > 0 ? (
            <>{getElements(dataHistoryHubDetailBeforeChange, 0)}</>
          ) : (
            <div>No data</div>
          )}
        </Col>
        <Col span={12}>
          {Object.keys(dataHistoryHubDetailBeforeChange).length > 0 ? (
            <>{getElements(dataHistoryHubDetailBeforeChange, 1)}</>
          ) : (
            <div>No data</div>
          )}
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalViewHubDetail;
