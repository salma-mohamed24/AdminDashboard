import React, { useState, useEffect } from "react";

import { GoSearch } from "react-icons/go";
import { MdModeEditOutline} from "react-icons/md";
import { FaCheck, FaTimes } from 'react-icons/fa';

import { IoMdLock} from "react-icons/io";
import { BiPlus} from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { MdDelete } from "react-icons/md";

import axios from 'axios';



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
  if (!name || typeof name !== 'string' || name.length === 0) {
    // Return a default color or handle this case based on your requirements
    return '#999999';
  }

  const colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', '#E6B333', '#3366E6', '#999966'];
  const initial = name.charCodeAt(0) + (name.length > 1 ? name.charCodeAt(1) : 0);
  return colors[initial % colors.length];
};

const [users, setUsers] = useState([]);
const [showAddUserScreen, setShowAddUserScreen] = useState(false);
const [newUserName, setNewUserName] = useState('');
const [newUserUsername, setNewUserUsername] = useState('');
const [newUserEmail, setNewUserEmail] = useState('');
const [newUserGroup, setNewUserGroup] = useState('Any');
const [newUserStatus, setNewUserStatus] = useState('Any');




useEffect(() => {
  console.log("Fetching user data...");
  axios.get('http://localhost:5000/users/get-users')
    .then(response => {
      console.log("User data:", response.data);

      // Format date before setting it in the state
      const formattedUsers = response.data.map(user => ({
        ...user,
        // Assuming your timestamp field is named 'createdOn'
        createdOn: formatDate(user.createdOn),
      }));

      setUsers(formattedUsers);
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
}, []);

// Helper function to format the timestamp to a readable date
const formatDate = (timestamp) => {
  const options = { year: 'numeric', month: 'numeric', day: '2-digit' };
  return new Date(Number(timestamp)).toLocaleString('en-US', options);
};

const handleAddUser = () => {
  const newUser = {
    newUserName,
    newUserUsername,
    newUserEmail,
    newUserGroup,
    newUserStatus,
    createdOn: new Date(),
  };

  // Use Axios to send a POST request to your server to add a new user
  axios.post('http://localhost:5000/users/add-user', newUser)
    .then(response => {
      // Update the local state with the new user
      setUsers([...users, response.data]);
      // Reset the form fields
      resetForm();
    })
    .catch(error => {
      console.error('Error adding new user:', error);

      // Check if the error is due to the user already existing
      if (error.response && error.response.status === 401) {
        // Show an alert for user existence
        alert('User already exists. Please choose a different username.');
      } else {
        // Show a generic error alert for other errors
        alert('Error adding new user. Please try again later.');
      }
    });

  // Clear the input fields and close the add user screen
  setNewUserName('');
  setNewUserUsername('');
  setNewUserEmail('');
  setNewUserGroup('');
  setNewUserStatus('');
  setShowAddUserScreen(false);
};



const [searchParams, setSearchParams] = useState({
  newUserIdentifier: '',
  newUserGroup: 'Any',
  newUserStatus: 'Any',
  createdOn: '',
});

const resetForm = () => {
  setNewUserName('');
  setNewUserUsername('');
  setNewUserEmail('');
  setNewUserGroup('');
  setNewUserStatus('');
};





const handleSearch = () => {
  // Extract the search parameters from the state
  const { newUserIdentifier, newUserGroup, newUserStatus, createdOn } = searchParams;

  // Construct the search query based on the selected filters
  const queryParams = {
    newUserIdentifier,
    newUserGroup,
    newUserStatus,
    createdOn,
  };
  console.log('Sending request with newUserStatus:', newUserStatus);

  // Make a request to the server to fetch the filtered users
  axios.get('http://localhost:5000/users/search', { params: queryParams })
    .then(response => {
      console.log("Filtered User data:", response.data);
      console.log('Received parameters:', newUserGroup, newUserStatus);

      // Format date before setting it in the state
      const formattedUsers = response.data.map(user => ({
        ...user,
        createdOn: formatDate(user.createdOn),
      }));

      setUsers(formattedUsers);
    })

    .catch(error => {
      console.error('Error fetching filtered user data:', error);
    });
};







const [editableUserIndex, setEditableUserIndex] = useState(null);

  const handleEditUser = (index) => {
    // Enable inline editing for the selected user
    setEditableUserIndex(index);
  };

  const handleSaveUser = (index) => {
    // Perform the update operation using Axios or your preferred method
    const updatedUser = users[index];
    axios.put(`http://localhost:5000/users/update/${updatedUser.id}`, updatedUser)
      .then(response => {
        // Handle the successful update
        console.log('User updated successfully:', response.data);

        // Disable inline editing after saving
        setEditableUserIndex(null);
      })
      .catch(error => {
        // Handle the update error
        console.error('Error updating user:', error);

        // You may want to show an error message to the user
      });
  };

  const handleCancelEdit = () => {
    // Disable inline editing without saving changes
    setEditableUserIndex(null);
  };





  return (
    <div 
      className={` content content-container ${
        showSidebar ? "hidden" : "visible"
      }`}
      
    >
      <div class="container" >
        <div style={{ display: "flex", alignItems: "center" }}>
          <h1 className="fw-bold">User Management</h1>
          <button className="userbtn" onClick={() => setShowAddUserScreen(true)}>
            <BiPlus style={{marginRight:'5px' , marginBottom:'-2px'}}/>
            Add User
          </button>
                  </div>





                  




        <div class="table-responsive custom-table-responsive" >
          
          <div style={{ border: "2px solid #ccc",paddingTop:'30px',paddingBottom:'30px',background: "#ffffff",borderRadius: "15px",}} className="resp1">







<div style={{  display: "flex", marginLeft: '20px', flexDirection: "row", flexWrap: "wrap" }} >
  <div style={{ position:"relative",border: "1px solid #ccc", borderRadius: "8px", marginRight: "10px", marginBottom: "10px", width: '300px', height: '40px' }}>
    <input type="text" placeholder="Search.." style={{position:"absolute", backgroundColor: "transparent",border: "none", outline: "none", padding: "10px 25px", fontSize: 17 }}  
    value={searchParams.newUserIdentifier}
    onChange={(e) =>
      setSearchParams({
        ...searchParams,
        newUserIdentifier: e.target.value,
      })
    } />
    <GoSearch style={{ position:"absolute",fontSize: 19, color: "#999", top:"50%",transform:"translateY(-50%)" }} />
  </div>

  <div style={{ position: "relative", marginRight: "10px", marginBottom: "10px" }} className="userstate">
    <div style={{ position: "absolute", top: "-8px", background: "#fff", paddingLeft: "19px", color: 'rgb(117 117 117)',width:"94px", height:"10px" }}>
      User Group
    </div>
    <div style={{ border: "1px solid #ccc", borderRadius: "8px", width: '200px', height: '40px' }}>
      <select style={{ backgroundColor: "transparent",border: "none", outline: "none", padding: "5px 10px", fontSize: 16, width: '100%', height: '100%' }} 
    value={searchParams.newUserGroup}
    onChange={(e) =>
      setSearchParams({
        ...searchParams,newUserGroup: e.target.value,
      })
    }>
        <option value="">Any</option>
        <option value="Office">Office</option>
        <option value="Managers">Managers</option>
        <option value="Head Office">Head Office</option>
        {/* Add more options as needed */}
      </select>
    </div>
  </div>

  <div style={{ position: "relative", marginRight: "10px", marginBottom: "10px" }} className="userstate">
    <div style={{ position: "absolute", top: "-8px", background: "#fff", paddingLeft: "19px", color: 'rgb(117 117 117)',width:"94px", height:"10px" }}>
      User Status
    </div>
    <div style={{ border: "1px solid #ccc", borderRadius: "8px", width: '200px', height: '40px' }}>
      <select style={{ backgroundColor: "transparent",border: "none", outline: "none", padding: "5px 10px", fontSize: 16, width: '100%', height: '100%' }}   
      value={searchParams.newUserStatus}
      onChange={(e) =>
        setSearchParams({
          ...searchParams,newUserStatus: e.target.value,
        })
      }>
        <option value="">Any</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
        <option value="Blocked">Blocked</option>
        {/* Add more options as needed */}
      </select>
    </div>
  </div>

  <div style={{ position: "relative", marginRight: "10px", marginBottom: "10px" }} className="date">
    <div style={{ position: "absolute", top: "-8px", background: "#fff", paddingLeft: "19px", color: 'rgb(117 117 117)',width:"104px", height:"10px"}}>
      Creation Date
    </div>
    <div style={{ border: "1px solid #ccc", borderRadius: "8px", width: '172px', height: '40px' }}>
      <input type="date" style={{ backgroundColor: "transparent",border: "none", outline: "none", padding: "5px 10px", fontSize: 16, height: '100%' }}
     value={searchParams.createdOn}
     onChange={(e) =>
       setSearchParams({
         ...searchParams,
         createdOn: e.target.value,
       })
     } />
    </div>
  </div>
  <button onClick={handleSearch} className="userbtn4">Search</button>


</div>









   < div style={{ display: "flex" , flexDirection: "row", flexWrap: "wrap",marginTop:'40px',position:'relative'  , marginLeft:'20px'}}>



        <div style={{color:'grey', marginLeft:'6px',marginTop:'10px' }}> {selectedCount} Selected </div>

     <div style={{ borderLeft: '1.5px solid rgb(221 211 211)', height: '35px', marginLeft:'15px' ,marginTop:'3px'}}></div>

    
      <div  className=" iconresponsive" style={{ backgroundColor: '#e7e9ef', marginLeft: '13px', opacity: '0.7', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '45px', height: '42px' }}>
        <MdDelete style={{ fontSize: '24px', fontWeight: 'bold' }} />
      </div>  


      <div  className=" iconresponsive" style={{ backgroundColor: '#e7e9ef', marginLeft: '13px', opacity: '0.7', borderRadius: '5px', display: 'flex', width: '200px', height: '42px' }}>
        <p style={{ margin: 'auto' , color:'black'  , fontWeight:'bold'}}>Assign to Profile</p>
      </div>
      <div className=" iconresponsive"style={{ backgroundColor: '#e7e9ef', marginLeft: '13px', opacity: '0.7', borderRadius: '5px', display: 'flex', width: '200px', height: '42px' }}>
        <p style={{ margin: 'auto' , color:'black'  , fontWeight:'bold'}}>Assign to Group</p>
      </div>


    



      <div className=" iconresponsive" style={{ display: "flex" }}>
      <p style={{ color: 'grey', marginLeft: '10px', marginTop: '10px', textDecoration: 'underline', cursor: 'pointer' }} onClick={handleUnselect}>
    Unselect all
  </p>

        </div>


  

  </div>



            <table className="table custom-table" style={{ width:'100%'}} >
            <thead style={{backgroundColor: "#f2f4f8" , height:'60px'}}>
                <tr style={{ width:'100%'}}>
                  <th scope="col"  >
                    <label class="control control--checkbox" style={{ marginLeft:'15px'}}>
                      <input type="checkbox" class="js-check-all" />
                      <div class="control__indicator"></div>
                    </label>
                  </th>

                  <th scope="col" style={{paddingLeft:'10px'}}>Name</th>
                  <th scope="col">User Name</th>
                  <th scope="col">Email Address</th>
                  <th scope="col" style={{textAlign:'center'}}>Group</th>
                  <th scope="col">Status</th>
                  <th scope="col">Created on</th>
                  <th scope="col"></th>

                </tr>
              </thead>

              <tbody onChange={handleCheckboxChange}>
              {users.map((user, index) => (


                <><tr key={index} style={{ width:'100%'}}>
                  <th scope="row">
                  <label className="control control--checkbox" style={{ marginLeft:'15px'}}>
          <input type="checkbox" onChange={() => handleCheckboxChange(index)} />
          <div className="control__indicator">
            {user.checked && <TiTick style={{ fontSize: "20px", color: "white" }} />}
          </div>
        </label>
                  </th>
                  
                  
                  <td>
                  {editableUserIndex === index ? (
                  <input
                  style={{  outline: "none" , borderRadius: "5px", height: '11px' ,padding: '12px' , width: '150px', marginLeft:"5px"}}
                    type="text"
                    value={user.newUserName}
                    onChange={(e) => {
                      const updatedUsers = [...users];
                      updatedUsers[index].newUserName = e.target.value;
                      setUsers(updatedUsers);
                    }}
                  />
                ) : (
                    <div style={{ display: "flex", alignItems: "center"  , paddingLeft:'10px'}}>
                      <div class="userCircle" style={{ backgroundColor: getCircleColor(user.newUserName) }}>
                        {getInitials(user.newUserName)}
                      </div>
                      <p style={{ marginLeft: "10px", color: 'black' }}>{user.newUserName}</p>
                    </div>
                     )}
                  </td>

              <td>
              {editableUserIndex === index ? (
                  <input
                  style={{  outline: "none" , borderRadius: "5px", height: '11px' ,padding: '12px' , width: '150px'}}
                    type="text"
                    value={user.newUserUsername}
                    onChange={(e) => {
                      const updatedUsers = [...users];
                      updatedUsers[index].newUserUsername = e.target.value;
                      setUsers(updatedUsers);
                    }}
                  />
                ) : (
                <p style={{ color: 'black' }}>
                {user.newUserUsername}
                </p>
                )}

                </td>


                <td>
              {editableUserIndex === index ? (
                  <input
                  style={{  outline: "none" , borderRadius: "5px", height: '11px' ,padding: '12px' , width: '150px'}}
                    type="text"
                    value={user.newUserEmail}
                    onChange={(e) => {
                      const updatedUsers = [...users];
                      updatedUsers[index].newUserEmail = e.target.value;
                      setUsers(updatedUsers);
                    }}
                  />
                ) : (
                <p style={{ color: 'black' }}>
                {user.newUserEmail}
                </p>
                )}

                </td>

                
              <td style={{textAlign:'center'}}>
              {editableUserIndex === index ? (

<select value={user.newUserGroup}  
   onChange={(e) => 
     {
       const updatedUsers = [...users];
       updatedUsers[index].newUserGroup = e.target.value;
       setUsers(updatedUsers);
     handleStatusChange(index, e)
   } }
   style={{ border: 'none', outline: 'none', background: 'transparent' }}>

 <option value="Office">Office</option>
  <option value="Managers">Managers</option>
  <option value="Head Office">Head Office</option>
  </select>
  ) : (
                user.newUserGroup
                )}
                </td>

                  <td>
                  {editableUserIndex === index ? (

                     <select value={user.newUserStatus}  
                        onChange={(e) => 
                          {
                            const updatedUsers = [...users];
                            updatedUsers[index].newUserStatus = e.target.value;
                            setUsers(updatedUsers);
                          handleStatusChange(index, e)
                        } }
                        style={{ border: 'none', outline: 'none', background: 'transparent' }}>
                     <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Blocked">Blocked</option>
                       </select>
                       ) : (
                        user.newUserStatus
                      )}
                  </td>

                <td>{user.createdOn}</td>
                <td>
                {editableUserIndex === index ? (
                  <>
                   <FaCheck onClick={() => handleSaveUser(index)} style={{ cursor: 'pointer', marginRight: '5px' }} />
                    <FaTimes onClick={handleCancelEdit} style={{ cursor: 'pointer' }} />
                  </>
                ) : (
                  <MdModeEditOutline onClick={() => handleEditUser(index)} />
                )}
              </td>
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

      <p style={{ color: 'grey', textDecoration: 'underline', cursor: 'pointer',margintop:'7px' ,marginRight:'auto'}}  onClick={resetForm}>
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
