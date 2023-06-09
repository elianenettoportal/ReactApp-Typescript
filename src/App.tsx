import React from "react";
import './App.css';
import UserList from './components/User/userList';

const App:React.FC =() => {
    return (
      <>
        <div className="container mt-3">
            <div className="grid">
                <div className="row">
                    <div className="col">
                        <p className="h3 fw-bold text-success">GitHub Users Project</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                            Ab ducimus facilis nihil numquam quas quia quo repellat! Alias consequatur 
                            cumque deleniti dicta, dolores, eum eveniet facilis minima nisi quia quod.
                        </p>
                        {<UserList/>}
                      </div>
                </div>
            </div>
        </div>
      </>
    );
}
export default App;
