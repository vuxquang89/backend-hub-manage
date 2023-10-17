import { Space } from "antd";
import "./App.css";
import Header from "./components/admin/Header";
import SideMenu from "./components/admin/SideMenu";
import PageContent from "./components/admin/PageContent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="SideMenuAndPageContent">
        <SideMenu />
        <PageContent />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        >
          {/* Same as */}
        </ToastContainer>
      </div>
    </div>
  );
}

export default App;
