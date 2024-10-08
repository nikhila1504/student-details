import "bootstrap-icons/font/bootstrap-icons.css";
import "react-datepicker/dist/react-datepicker.module.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import LoginComponent from "./auth/Login";
import Registration from "./auth/Registration";
import AddPartyComponent from "./components/AddPartyComponent";
import CalendarComponent from "./components/CalendarComponent";
import HeaderComponent from "./components/HeaderComponent";
import PartyListComponent from "./components/PartyListComponent";

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<LoginComponent />}></Route>
            <Route exact path="/register" element={<Registration />}></Route>
            <Route path="/parties" element={<PartyListComponent />}></Route>
            <Route path="/add-party" element={<AddPartyComponent />}></Route>
            <Route path="/calendar/:id" element={<CalendarComponent />}></Route>
            <Route
              path="/edit-party/:id"
              element={<AddPartyComponent />}
            ></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
