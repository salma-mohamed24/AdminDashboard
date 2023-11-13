import React, { useState } from "react";
import { GoSearch } from "react-icons/go";
import { MdModeEditOutline} from "react-icons/md";
import { MdNotInterested} from "react-icons/md";

import { IoMdLock} from "react-icons/io";
import { BsThreeDotsVertical} from "react-icons/bs";
import { BiSolidDownload} from "react-icons/bi";
import { BiPlus} from "react-icons/bi";
import { TiTick } from "react-icons/ti";



import { IoMdClose} from "react-icons/io";





const Usermanagement = (showSidebar) => {





  const [selectedCount, setSelectedCount] = useState(0);
  const [ selectAllText,setSelectAllText] = useState("Select All");

  const handleCheckboxChange = (index) => {
    const updatedUsers = [...users];
  
    if (updatedUsers[index]) {
      // Check if the 'checked' property exists in the user object
      if (typeof updatedUsers[index].checked === 'undefined') {
        updatedUsers[index].checked = false; // Initialize 'checked' property
      }
  
      // Toggle the 'checked' property
      updatedUsers[index].checked = !updatedUsers[index].checked;
      setUsers(updatedUsers);
  
      // Calculate selected count
      const count = updatedUsers.filter((user) => user.checked).length;
      setSelectedCount(count);
  
      if (count === updatedUsers.length) {
        setSelectAllText("Unselect All");
      } else {
        setSelectAllText("Select All");
      }
    }
  };

  const handleUnselect = () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        checkbox.checked = false;
      }
    });
    setSelectedCount(0);
    setSelectAllText("Select All");
  };
  // Function to get initials from the name
const getInitials = (name) => {
  if (!name || typeof name !== 'string') {
    return '';
  }

  const isArabic = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFD\uFE70-\uFEFC]/.test(name);

  if (isArabic) {
    return name.substring(0, 1);
  } else {
    const words = name.split(" ");

    if (words.length === 1) {
      return name.substring(0, 2);
    } else {
      return (words[0].charAt(0) + (words.length > 1 ? words[1].charAt(0) : '')).toUpperCase();
    }
  }
};

const handleStatusChange = (index, event) => {
  const updatedUsers = [...users];
  updatedUsers[index].status = event.target.value;
  setUsers(updatedUsers);
};

const getCircleColor = (name) => {
  const colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', '#E6B333', '#3366E6', '#999966'];
  const initial = name.charCodeAt(0) + name.charCodeAt(1);
  return colors[initial % colors.length];
};


const [users, setUsers] = useState([]);


const [showAddUserScreen, setShowAddUserScreen] = useState(false);
const [newUserName, setNewUserName] = useState('');
const [newUserUsername, setNewUserUsername] = useState('');
const [newUserEmail, setNewUserEmail] = useState('');
const [newUserGroup, setNewUserGroup] = useState('');
const [newUserStatus, setNewUserStatus] = useState('');

const handleAddUser = () => {
  const newUser = {
    name: newUserName,
    username: newUserUsername,
    email: newUserEmail,
    group: newUserGroup,
    status: newUserStatus,
    createdOn: new Date().toLocaleDateString()
  };

  setUsers([...users, newUser]);


  setNewUserName('');
  setNewUserUsername('');
  setNewUserEmail('');
  setNewUserGroup('');
  setNewUserStatus('');

  setShowAddUserScreen(false);
};




  return (
    <div
      className={` content content-container ${
        showSidebar ? "hidden" : "visible"
      }`}
      style={{ background: "#f2f4f8" }}
    >
      <div class="container">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h1 className="fw-bold">User Management</h1>
          <button className="userbtn" onClick={() => setShowAddUserScreen(true)}>
            <BiPlus style={{marginRight:'5px' , marginBottom:'-2px'}}/>
            Add User
          </button>
                  </div>





                  




        <div class="table-responsive custom-table-responsive">
          
          <div style={{ border: "2px solid #ccc",paddingLeft:'50px',paddingTop:'30px',paddingBottom:'30px',background: "#ffffff",borderRadius: "15px",}}>



          <div style={{ display: "flex" }}>

          <div style={{ border: "1px solid #ccc", borderRadius: "8px", display: "flex" ,width:'300px' , height:'40px'}}>
              <input type="text" placeholder="Search.." style={{ border: "none", outline: "none", padding: "5px 10px" ,    margin: "0 20px", fontSize: 17}} />
              <GoSearch style={{ fontSize: 19, marginLeft: -268, color: "#999", marginTop:11 }} />
          </div>

          <div style={{ border: "1px solid #ccc", borderRadius: "8px" ,width:'150px' , height:'40px',      marginLeft: "20px"}}>
              <input type="text" placeholder="User Name" style={{ border: "none", outline: "none", paddingLeft: 25 ,paddingTop:12,  fontSize: 16}} />
          </div>

        
          <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", top: "-12px", background: "#fff", paddingLeft: "30px" ,color:'rgb(117 117 117)'}}>
            Select User
        </div>
        <div style={{ border: "1px solid #ccc", borderRadius: "8px", width: '200px', height:'40px',  marginLeft: "20px" }}>
            <select style={{ border: "none", outline: "none", padding: "5px 10px", fontSize: 16, width: '100%', height: '100%' }}>
                <option value="user1">Any</option>
                <option value="user2">Office</option>
                <option value="user3">Managers</option>
                <option value="user3">Head Office</option>

                {/* Add more options as needed */}
            </select>
        </div>
    </div>


    <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", top: "-12px", background: "#fff", paddingLeft: "30px" ,color:'rgb(117 117 117)'}}>
              Creation Date
         </div>
        <div style={{ border: "1px solid #ccc", borderRadius: "8px", width: '200px', height:'40px',  marginLeft: "20px" }}>
        <input type="date" style={{ border: "none", outline: "none", padding: "5px 10px", fontSize: 16, width: '100%', height: '100%' }} />

        </div>
    </div>



    <div style={{ marginLeft:'20px', marginTop:'10px' , color:'blue', fontSize:'18px'}}>
              All Filters
    </div>

</div>




      <div style={{ display: "flex" , marginTop:'40px',}}>



        <div style={{color:'grey', marginLeft:'6px',marginTop:'10px' }}> {selectedCount} Selected </div>

     <div style={{ borderLeft: '1.5px solid rgb(221 211 211)', height: '35px', marginLeft:'15px' ,marginTop:'3px'}}></div>

      <div style={{ backgroundColor: '#e7e9ef', marginLeft: '20px', opacity: '0.7', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '45px', height: '42px' }}>
        <MdModeEditOutline style={{ fontSize: '24px', fontWeight: 'bold' }}/>
      </div>

      <div style={{ backgroundColor: '#e7e9ef', marginLeft: '13px', opacity: '0.7', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '45px', height: '42px' }}>
        <MdNotInterested style={{ fontSize: '24px', fontWeight: 'bold' }}/>
      </div>
  
      <div style={{ backgroundColor: '#e7e9ef', marginLeft: '13px', opacity: '0.7', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '45px', height: '42px' }}>
        <IoMdLock style={{ fontSize: '24px', fontWeight: 'bold' }} />
      </div>  

      <div style={{ backgroundColor: '#e7e9ef', marginLeft: '13px', opacity: '0.7', borderRadius: '5px', display: 'flex', width: '200px', height: '42px' }}>
        <p style={{ margin: 'auto' , color:'black'  , fontWeight:'bold'}}>Assign to Profile</p>
      </div>
      <div style={{ backgroundColor: '#e7e9ef', marginLeft: '13px', opacity: '0.7', borderRadius: '5px', display: 'flex', width: '200px', height: '42px' }}>
        <p style={{ margin: 'auto' , color:'black'  , fontWeight:'bold'}}>Assign to Groupe</p>
      </div>


      <div style={{ backgroundColor: '#e7e9ef', marginLeft: '13px', opacity: '0.7', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '45px', height: '42px' }}>
        < BsThreeDotsVertical style={{ fontSize: '24px', fontWeight: 'bold' }} />
      </div> 



      <div style={{ display: "flex" }}>
      <p style={{ color: 'grey', marginLeft: '10px', marginTop: '10px', textDecoration: 'underline', cursor: 'pointer' }} onClick={handleUnselect}>
    Unselect all
  </p>

        </div>


      <div style={{ backgroundColor: '#e7e9ef', marginLeft: '450px', opacity: '0.7', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '45px', height: '42px' }}>
        < BiSolidDownload style={{ fontSize: '24px', fontWeight: 'bold' }} />
      </div> 

    

  </div>



            <table className="table custom-table" style={{paddingTop:'40px'}} >
              <thead>
                <tr >
                  <th scope="col">
                    <label class="control control--checkbox">
                      <input type="checkbox" class="js-check-all" />
                      <div class="control__indicator"></div>
                    </label>
                  </th>

                  <th scope="col">Name</th>
                  <th scope="col">User Name</th>
                  <th scope="col">Email Address</th>
                  <th scope="col">Groupe</th>
                  <th scope="col">Status</th>
                  <th scope="col">Created on</th>
                </tr>
              </thead>

              <tbody onChange={handleCheckboxChange}>
              {users.map((user, index) => (


                <><tr key={index}>
                  <th scope="row">
                  <label className="control control--checkbox">
          <input type="checkbox" onChange={() => handleCheckboxChange(index)} />
          <div className="control__indicator">
            {user.checked && <TiTick style={{ fontSize: "20px", color: "white" }} />}
          </div>
        </label>
                  </th>
                  <td>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div class="userCircle" style={{ backgroundColor: getCircleColor(user.name) }}>
                        {getInitials(user.name)}
                      </div>
                      <p style={{ marginLeft: "10px", color: 'black' }}>{user.name}</p>
                    </div>
                  </td>
                  <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.group}</td>

                  <td>
                     <select value={user.status}     onChange={(e) => handleStatusChange(index, e)} style={{ border: 'none', outline: 'none', width: '100%', background: 'transparent' }}>
                     <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Blocked">Blocked</option>
                       </select>
                  </td>

                <td>{user.createdOn}</td>
                </tr><tr class="spacer">
                    <td colspan="100"></td>
                  </tr>
                  </>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>


      {showAddUserScreen && (
  <div
  style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }}
>
  <div
    style={{
      width: '500px',
      height: '600px',
      background: 'rgb(248, 250, 251)',

      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
   
      }}
    >
    
      <header className="fw-bold" style={{ backgroundColor: '#050e2d', fontSize:'20px',color:'white',fontWeight:'bold',paddingLeft:'10px', borderRadius: '10px 10px 0 0', width: '490px',height:'60px' }}>Add New User
      
      <IoMdClose style={{marginLeft:'300px'}} onClick={() => setShowAddUserScreen(false)}/>
      </header>
      <div style={{marginRight:'14px'}}>

      <div style={{ display: 'flex', flexDirection: 'column', width: '80%', marginTop: '20px'}}>
        <label htmlFor="name" style={{color:'#050e2d' , padding: '3px' ,fontWeight: 'bold'}}>Full Name</label>
        <input type="text" id="name" style={{  outline: "none" ,borderColor: "oldlace", borderRadius: "5px", height: '11px' ,padding: '12px' , width: '400px'}} value={newUserName} placeholder="Enter Full name" onChange={(e) => setNewUserName(e.target.value)} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', width: '80%', marginTop: '20px' }}>
        <label htmlFor="username"style={{color:'#050e2d', padding: '3px' ,fontWeight: 'bold'}}>User Name</label>
        <input type="text" id="username" style={{  outline: "none" ,borderColor: "oldlace", borderRadius: "5px", height: '11px' ,padding: '12px' , width: '400px'}} value={newUserUsername} placeholder="Enter username" onChange={(e) => setNewUserUsername(e.target.value)} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', width: '80%', marginTop: '20px' }}>
        <label htmlFor="email"style={{color:'#050e2d', padding: '3px' ,fontWeight: 'bold'}}>Email Address</label>
        <input type="text" id="email" style={{  outline: "none" ,borderColor: "oldlace", borderRadius: "5px", height: '11px' ,padding: '12px' , width: '400px'}} value={newUserEmail} placeholder="Enter user email address" onChange={(e) => setNewUserEmail(e.target.value)} />
      </div>



      <div style={{ display: 'flex', flexDirection: 'column', width: '80%', marginTop: '20px' }}>
  <label htmlFor="user" style={{ color: '#050e2d', padding: '3px', fontWeight: 'bold' }}>Select User</label>
  <select
  value={newUserGroup} // Bind the selected value to the state variable
  onChange={(e) => setNewUserGroup(e.target.value)}
  style={{ outline: "none", borderColor: "oldlace", borderRadius: "5px", height: '48px', padding: '12px', width: '430px', color: 'grey' }}
>
  <option value="">Choose User Group</option>
  <option value="Office">Office</option>
  <option value="Managers">Managers</option>
  <option value="Head Office">Head Office</option>
</select>
</div>



<div style={{ display: 'flex', flexDirection: 'column', width: '80%', marginTop: '20px' }}>
  <label htmlFor="profile" style={{ color: '#050e2d', padding: '3px', fontWeight: 'bold' }}>Assign Profile</label>
  <select 
  value={newUserStatus} // Bind the selected value to the state variable
  onChange={(e) => setNewUserStatus(e.target.value)}
  style={{ outline: "none", borderColor: "oldlace", borderRadius: "5px", height: '48px', padding: '12px', width: '430px', color: 'grey' }}>
    <option value="">Choose Profile</option>
    <option value="Active">Active</option>
  <option value="Inactive">Inactive</option>
  <option value="Blocked">Blocked</option>

  </select>
</div>

    



      <div style={{ display: 'flex', width: '100%' , marginTop: '20px' }}>

      <p style={{ color: 'grey', textDecoration: 'underline', cursor: 'pointer',margintop:'7px' ,marginRight:'auto'}} >
        Reset Fields
      </p>
        <div>
        <button className="userbtn3"  onClick={() => setShowAddUserScreen(false)}>Cancel</button>
        </div>
        <div>
        <button className="userbtn2" onClick={handleAddUser}>Add User</button>
        </div>

      </div>
    </div>
    </div>
  </div>
)}



    </div>
  );
};

export default Usermanagement;
