import { Space } from "antd";
import "./App.css";
import Header from "./components/admin/Header";
import SideMenu from "./components/admin/SideMenu";
import PageContent from "./components/admin/PageContent";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="SideMenuAndPageContent">
        <SideMenu />
        <PageContent />
      </div>
    </div>
  );
}

export default App;
