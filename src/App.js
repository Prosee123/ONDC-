import OndcDashboard from './views/ondc-dashboard/ondc-dashboard';
import Login from './views/login/login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RouteConfig from './utils/router-config';


function App() {
  return (
    <div className="App">
      <RouteConfig/>
    </div>
  );
}

export default App;
