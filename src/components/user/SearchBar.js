import { Col, Row, Input } from "antd";
import { RetweetOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch, inputSearch, setInputSearch, loadData }) => {
  const { Search } = Input;

  const [visible, setVisible] = useState(false);

  const toggleFixSearchBar = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 320) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  window.addEventListener("scroll", toggleFixSearchBar);

  return (
    <Row className={visible ? `fix-search justify-content-center` : ""}>
      <Col span={8}>
        <div className="mb-10 boxSearch">
          <label className="lblTitleSearch">Tìm kiếm</label>
          <Search
            placeholder="Nhập chi nhánh / phòng hub..."
            onSearch={onSearch}
            onChange={(e) => setInputSearch(e.target.value)}
            value={inputSearch}
            enterButton
          />
          <RetweetOutlined
            className="buttonIconRefresh"
            onClick={() => {
              setInputSearch("");
              loadData();
            }}
            title="Làm mới"
          />
        </div>
      </Col>
    </Row>
  );
};

export default SearchBar;
