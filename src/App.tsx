import React from "react";
import './App.css';
import { Routes, Route } from "react-router-dom";
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import UserReporitories from './components/UserRepositoryList';

function App() {
    return (
      <>
        <React.Fragment>
        <div className="container mt-3">
            <div className="grid">
                <div className="row">
                    <div className="col">
                        <p className="h3 fw-bold text-success">List of GitHub Users</p>
                        <p className="fst-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ducimus facilis nihil numquam quas quia quo repellat! Alias consequatur cumque deleniti dicta, dolores, eum eveniet facilis minima nisi quia quod.</p>
                        <button className="btn btn-success btn-sm">
                          <i className="fa fa-book"/> Read More</button>
                      </div>
                </div>

                {/* <div className="row">
                    <div className="col">
                        <UserList/>
                    </div>
                </div> */}
                {/* <div className="row">
                    <div className="col">
                        <UserReporitories/>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <UserDetails/>
                    </div>
                </div> */}
            </div>
        </div>
      </React.Fragment>
          <Routes>
            <Route path="/users" element={<UserList/>} />
            <Route path="/users/:username/details" element={<UserDetails/>} />
            <Route path="/users/:username/repos" element={<UserReporitories/>} />
         </Routes>
      </>
    );
}

export default App;
