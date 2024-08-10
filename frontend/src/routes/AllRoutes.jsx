import { Routes, Route } from "react-router-dom";
import { Register, Login, Dashboard, Students } from "../pages";
import { SideBar } from "../components";

export const AllRoutes = () => {
  return (
    <div>
      <SideBar />
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/students" element={<Students />} />
        </Routes>
      </main>
    </div>
    //   <Routes>
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/register" element={<Register />} />
    //     <Route path="/dashboard" element={<Dashboard />} />
    //   </Routes>
    // </div>
  );
};
