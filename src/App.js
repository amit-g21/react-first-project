import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import Info from './pages/info';
import ToDoList from './pages/todos';
import Posts from './pages/posts';
import Albums from './pages/albums';
import { UserProvider } from './context/usercontent';
import Error from './pages/error';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} >
            <Route path='/home/:username' element={<Home />} />
            <Route path="/home/:username/info" element={<Info />} />
            <Route path="/home/:username/todoList" element={<ToDoList />} />
            <Route path="/home/:username/posts" element={<Posts />} />
            <Route path="/home/:username/Albums" element={<Albums />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
