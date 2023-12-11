import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { BiSolidDashboard } from "react-icons/bi";
import { GoSearch } from "react-icons/go";


const Sidebar = ({ show }) => {
  const [userManagementExpanded, setUserManagementExpanded] = useState(false);

  const handleUserManagementClick = () => {
    setUserManagementExpanded(!userManagementExpanded);
  };

  return (
    <div className={show ? "sidenav active" : "sidenav"} style={{ display: "flex", flexDirection: "column" }}>
    
  
    
    <ul style={{ width: '100%' }}>
        <li style={{  width: '100%' }}>
             <a style={{color:"white"}}>
            <BiSolidDashboard style={{color:"white"}}/>
            Dashboard
          </a>
        </li>
        <li>
          <li style={{color:'#484444' , marginLeft:'10px'}}>
            SETTINGS
          </li>
          <ul className="settings-submenu">
            <li>
              <a>
                ATM Setting
                <IoIosArrowDown className="arrow-icon" style={{marginLeft:'72px' , marginBottom:'-5px'}}/>
              </a>
            </li>

            <li>
              <a>
                Bussiness Setup
                <IoIosArrowDown className="arrow-icon"style={{marginLeft:'40px' , marginBottom:'-5px'}} />
              </a>
            </li>

            <li onClick={handleUserManagementClick}>
              <a>
                User Management
                <IoIosArrowDown className="arrow-icon" style={{marginLeft:'17px' , marginBottom:'-5px'}}/>
              </a>
              {userManagementExpanded && (
                <ul className="user-management-list">
                  <li>
                    <a >Users</a>
                  </li>
                  <li>
                    <a >Profiles</a>
                  </li>
                  <li>
                    <a >Groups</a>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <a href="/">License Management</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
