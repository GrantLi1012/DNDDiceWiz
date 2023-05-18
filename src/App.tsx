import * as styles from './App.css';

import { strings } from './staticAsset/strings';

import { Home } from './view/Home/Home';
import { AverageRoll } from './view/AverageRoll/AverageRoll';
import { About } from './view/About/About';
import { Roller } from './view/Roller/Roller';
import { DamageOutput } from './view/DamageOutput/DamageOutput';
import { DamageSpellSave } from './view/DamageSpellSave/DamageSpellSave';

import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function App() {
  return (
    <Router>
      <div style={styles.flexGrow}>
        <Navbar color="dark" variant="dark" sticky="top" collapseOnSelect expand="sm" bg="dark">
          <Container>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" style={styles.paddingLeft} />
            <Navbar.Brand href="/" style={styles.largeText}>{strings.appName}</Navbar.Brand>
            <Navbar.Collapse id="responsive-navbar-nav" >
              <Nav className="me-auto" style={styles.mediumText}>
                <Link to="/" className="nav-link">{strings.titles.home}</Link>
                <NavDropdown title={strings.titles.applications} id="navbarScrollingDropdown">
                  <NavDropdown.Item>
                  <Link to="/dice-roller" style={styles.dropdownItem}>{strings.titles.diceRoller}</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                  <Link to="/damage-calculator" style={styles.dropdownItem}>{strings.titles.damageCalculator}</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                  <Link to="/damage-calculator-spell-save" style={styles.dropdownItem}>{strings.titles.damageSpellSave}</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                  <Link to="/average-calculator" style={styles.dropdownItem}>{strings.titles.averageCalculator}</Link>
                  </NavDropdown.Item>
                </NavDropdown>
                <Link to="/about" className="nav-link">{strings.titles.about}</Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/average-calculator" element={<AverageRoll />} />
          <Route path="/about" element={<About />} />
          <Route path="/dice-roller" element={<Roller />} />
          <Route path="/damage-calculator" element={<DamageOutput />} />
          <Route path="/damage-calculator-spell-save" element={<DamageSpellSave />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
