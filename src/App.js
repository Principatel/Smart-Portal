import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Landingpage from "./Components/pages/Landingpage";
import Maindashboard from "./Components/Dashboardpages/Maindashboard";
import Footer from "./Components/homepages/Footer";

function App() {
  return (
    <div className="App">
      <div className="landingpff">
        <div class="background">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Landingpage />} />
              <Route path="/maindashboard" element={<Maindashboard />} />
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
