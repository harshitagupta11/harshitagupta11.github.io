import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import Home from './components/Home';
import CourseStructure from './components/CourseStructure';
import './App.css';

function App() {
  return (
    <div className="App">
      
       <BrowserRouter>
       <Route path='/'exact component={Home} />
       <Route path='/:coursename' component={CourseStructure} />
       
       
       
       
       
       </BrowserRouter>
      
      
    </div>
  );
}

export default App;
