import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthorSearch from './AuthorSearch';
import LoginPage from './LoginPage';
import './App.css';
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