import { Outlet } from "react-router-dom";
import Header from "./admin/Header";
import SideMenu from "./admin/SideMenu";
import PageContent from "./admin/PageContent";
import { ToastContainer } from "react-toastify";
import useAuth from "../hooks/useAuth";
import UserHeader from "./user/Header";

const Layout = ({ allowedRoles }) => {
  const { auth } = useAuth();

  console.log(">>>>auth", auth);
  console.log(">>>>>roles", allowedRoles);
  // const filtereed = auth?.roles?.filter((role) => {
  //   return role === "ROLE_ADMIN";
  // });
  return auth?.roles?.find((role) => allowedRoles?.includes(role)) &&
    localStorage.getItem("isLogin") ? (
    // <main className="App">
    //   <Outlet />
    // </main>
    <div className="App">
      {auth.roles[0] === "ROLE_ADMIN" ? (
        <>
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
              Same as
            </ToastContainer>
          </div>
        </>
      ) : (
        <>
          <UserHeader />
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
            Same as
          </ToastContainer>
        </>
      )}
    </div>
  ) : (
    <Outlet />
  );
};

export default Layout;
