import * as styles from './App.css';

import { Main } from './view/Main/Main';
import { Application } from './view/Application/Application';
import { About } from './view/About/About';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function App() {
  return (
    <Router>
      <div>
        <Navbar variant="dark" sticky='top' style={styles.navbar}>
          <Container>
            <Navbar.Brand href="/" style={styles.largeText}>DND Dice Wiz</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" style={styles.paddingLeft}>
              <Nav className="me-auto" style={styles.mediumText}>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/application">Application</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/application" element={<Application />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
