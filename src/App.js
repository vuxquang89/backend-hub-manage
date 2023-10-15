
import { Space } from 'antd';
import './App.css';
import Header from './components/admin/Header';
import SideMenu from './components/admin/SideMenu';
import PageContent from './views/pagecontent/admin';
import { Footer } from 'antd/es/layout/layout';

function App() {
  return (
    <div className="App">
      <Header/>
      <Space>
        <SideMenu/>
        <PageContent/>
      </Space>
      <Footer/>
    </div>
  );
}

export default App;
