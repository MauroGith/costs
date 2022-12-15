import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Home from './components/pages/Home';
import About from './components/pages/About'
import Contact from './components/pages/Contact'
import Projects from './components/pages/Projects'
import Project from './components/pages/Project'
import NewProject from './components/pages/NewProject';
import Container from './components/layout/Container';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';

function App() {
  return (
    <Router>
        <NavBar />
        <Container customClass="min-height">
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/projects' element={<Projects/>}/>
            <Route path='/newproject' element={<NewProject/>}/>
            <Route path='/project/:id' element={<Project/>}/>
          </Routes>
        </Container>
        <Footer/>
    </Router>
  );
}

export default App;
