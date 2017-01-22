import React from 'react';
import Navigation from './components/Navigation';
import { Grid, Row, Col } from 'react-bootstrap';

const App = ({children}) =>
  <div>
    <Grid fluid>
      <Row>
        <Col>
          <Navigation />
        </Col>
      </Row>
      <Row>
        <Col sm={4} smOffset={4}>
          {children}
        </Col>
      </Row>
    </Grid>
  </div>



export default App;
