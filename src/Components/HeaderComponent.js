import React from 'react'
import logo from '../Images/ProfPic.jpg';

const HeaderComponent = () => {
  return (
    <div>
        <header>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <a className="navbar-brand" href="/">
            <h2>
              &nbsp;
              <img src={logo} width="40" height="40" class="d-inline-block align-top" alt="" />
              &nbsp;&nbsp;Todo List v3
            </h2>
          </a>
        </nav>
        </header>
    </div>
  )
}

export default HeaderComponent