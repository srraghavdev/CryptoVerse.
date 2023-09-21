import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CoinPage from "./pages/CoinPage";
import ComparePage from "./pages/ComparePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Logout from "./pages/Logout";
import Glossary from "./pages/Glossary";
import News from "./pages/News";
import Favourites from "./pages/Favourites";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* all the routes for each page mentioned below */}
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          {/* /coin/:id enables dyanmic routing , anything after : can be xtracted using useParam hook for futher api call */}
          <Route path="/coin/:id" element={<CoinPage></CoinPage>}></Route>
          <Route path="/compare" element={<ComparePage></ComparePage>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/logout" element={<Logout></Logout>}></Route>
          <Route path="/glossary" element={<Glossary></Glossary>}></Route>
          <Route path="/news" element={<News></News>}></Route>
          <Route path="/favourites" element={<Favourites></Favourites>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
