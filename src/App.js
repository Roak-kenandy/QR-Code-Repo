import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StaffDetailsPage from "./StaffDetailsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/staff-details" element={<StaffDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;