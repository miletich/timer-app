import React from 'react';
import Navigation from './components/Navigation';

const App = ({children}) =>
  <div>
    <Navigation />
    <h1>Main</h1>
    {children}
  </div>



export default App;
