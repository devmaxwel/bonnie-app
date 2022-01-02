import React from 'react'
import NavItems from './NavItems';

const NavLinks = () => {
    return (
        <div>
              <nav className="navbar navbar-light bg-light d-flex justify-content-center">
              
                      <h3>Bonnie Electronics Management</h3>
                     
                  <NavItems />

              </nav>
              
        </div>
    )
}

export default NavLinks;
