import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthorSearch from './screens/AuthorSearch';
import LoginPage from './screens/LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createContext, useState } from "react";
import ProtectedRoutes from './components/ProtectedRoutes';

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({ loggedIn: false });
  return(
    <Router>
     <UserContext.Provider value={{ user, setUser }}>
      <Routes>
      <Route exact path="/books" element={<LoginPage/>} />
      <Route element={<ProtectedRoutes />}>
        <Route exact path="/AuthorSearch" element={<AuthorSearch/>} />
        </Route>
      </Routes>
      </UserContext.Provider>
    </Router>
  );
}


export default App;