import React, { useState } from 'react';
import { render } from 'react-dom';
import { Router, Link } from '@reach/router';
import SearchParams from './components/SearchParams';
import Details from './components/Details';
import ThemeContext from './context/ThemeContext';

const App = () => {
  const theme = useState({
    buttonColor: 'darkblue',
    modalColor: 'pink'
  });

  return (
     <ThemeContext.Provider value={theme}>
        <div>
          <header>
            <Link to='/'>
              Adopt Me!
            </Link>
          </header>
          <Router>
            <SearchParams path='/'/>
            <Details path='/details/:id'/>
          </Router> 
        </div>
     </ThemeContext.Provider>
  )
};

render(<App/>, document.getElementById("root"));
