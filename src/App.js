import { HashRouter as Router, Route, Routes } from "react-router-dom"; // Change BrowserRouter to HashRouter
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
