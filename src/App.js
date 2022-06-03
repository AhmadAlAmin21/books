import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthorSearch from './screens/AuthorSearch';
import LoginPage from './screens/LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return(
    <Router>
      <Routes>
        <Route exact path="/books" element={<LoginPage/>} />
        <Route exact path="/AuthorSearch" element={<AuthorSearch/>} />
      </Routes>
    </Router>
  );
}


export default App;