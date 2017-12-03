import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
      
        <div id="zone_joystick">
        </div>

        <div id="debug">
          <ul>
            <li className="position">
              position :
              <ul>
                <li className="x">x : <span className='data'></span></li>
                <li className="y">y : <span className='data'></span></li>
              </ul>
            </li>
            <li className="force">force : <span className='data'></span></li>
            <li className="pressure">pressure : <span className='data'></span></li>
            <li className="distance">distance : <span className='data'></span></li>
            <li className="angle">
              angle :
              <ul>
                <li className="radian">radian : <span className='data'></span></li>
                <li className="degree">degree : <span className='data'></span></li>
              </ul>
            </li>
            <li className="direction">
              direction :
              <ul>
                <li className="x">x : <span className='data'></span></li>
                <li className="y">y : <span className='data'></span></li>
                <li className="angle">angle : <span className='data'></span></li>
              </ul>
            </li>
          </ul>
          <div className="dump"></div>  
        </div>

      </div>
    );
  }
}

export default App;
