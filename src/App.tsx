import * as styles from './App.css';

import { Home } from './view/Home/Home';
import { Application } from './view/Application/Application';
import { About } from './view/About/About';

import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function App() {
  return (
    <Router>
      <div style={styles.flexGrow}>
        <Navbar color="dark" variant="dark" sticky="top" collapseOnSelect expand="sm" bg="dark">
          <Container>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" style={styles.paddingLeft} />
            <Navbar.Brand href="/" style={styles.largeText}>DND Dice Wiz</Navbar.Brand>
            <Navbar.Collapse id="responsive-navbar-nav" >
              <Nav className="me-auto" style={styles.mediumText}>
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/application" className="nav-link">Application</Link>
                <Link to="/about" className="nav-link">About</Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/application" element={<Application />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
