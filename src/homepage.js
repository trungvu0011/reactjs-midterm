import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import React from 'react';
  import MapDashBoard from './Components/MapDashboard';
import Stats from './Components/Stats';
  export default function HomePage() {
    return (
      <Router>
        <div>
              <button className="block"> 
                <Link to="/map">Map</Link>
            </button>
              <button className="block">
                <Link to="/stats">Stats</Link>
            </button>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/map">
              <MapDashBoard />
            </Route>
            <Route path="/stats">
              <Stats />
            </Route>
        
          </Switch>
        </div>
      </Router>
    );
  }
