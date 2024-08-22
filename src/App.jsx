import { Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Sidebar from "./component/Sidebar";
import Dashboard from "./pages/Dashboard";
import PeopleDirectory from "./pages/PeopleDirectory";

function App() {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-[190px] mt-[5px] p-5">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/people" element={<PeopleDirectory />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
