/* eslint-disable */

import React from 'react';
import SelectList from './SelectList';
import { Typography, Button, Modal, Box, Stack } from '@mui/material';
import './Sidebar.css';
import { useAuth } from './AuthProvider';
import { dataBaseContext } from './App';
import DeleteList from './DeleteList';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const buttonStyle = {
  width: "125px"
};

const listStyle = {
  'listStyle': 'none',
  padding: 0,
  margin: 0,
  'margin-bottom': '10px'
};

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
export default function Sidebar() {
  
  // State of elements
  const [joinOpen, setJoinOpen] = React.useState(false);
  const [createOpen, setCreateOpen] = React.useState(false);
  const [listName, setListName] = React.useState('');
  const [joinGroupId, setjoinGroupId] = React.useState('');
  const authentication = useAuth();

  //Context
  const context = React.useContext(dataBaseContext);
  const {availableLists, setAvailableLists} = context;
  const setData = context.setDataChanged;
  const data = context.dataChanged;

  const createSubmit = (event) => {
    event.preventDefault();
    
    const listObject = {
      "list_name": listName
    };
    
    fetch(`http://localhost:3010/v0/lists/${authentication.getID()}`, {
      method: 'POST',
      body: JSON.stringify(listObject),
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authentication.getToken()}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
        .then((json) => {
          console.log('data set');
          //availableLists.push(json);
          //setAvailableLists(availableLists);
          setData(!data);
        })
        .catch((err) => {
          alert(err);
        });
  }

  return (
    <div className='sidebar'>
      <div className='sidebar-buttons'>
        <ul>
          <li>
            <Button variant="outlined"
              style={buttonStyle}
              onClick={() => setJoinOpen(true)}
              id="joinList"
            >
                Join a List
            </Button>
            <Modal
              open={joinOpen}
              onClose={() => setJoinOpen(false)}
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Join a List
                </Typography>
                <Typography id="modal-modal-description" class="joinGroup" sx={{ mt: 2 }}>
                  <form>
                    <Stack spacing={1}>
                      <Typography id="modal-modal-title" variant="subtitle1" component="h2">
                        Enter the group ID of the group you want to join.
                      </Typography>
                      <input
                        id="groupID"
                        type="text"
                        placeholder="Group ID"
                        onChange={(e) => setjoinGroupId(e.target.value)}
                      />
                      <Stack direction="row" spacing={2} justifyContent="center">
                        <button>Join Group</button>
                        <button>Cancel</button>
                      </Stack>
                    </Stack>
                  </form>
                </Typography>
              </Box>
            </Modal></li>
          <li>
            <Button variant="outlined"
              style={buttonStyle}
              onClick={() => setCreateOpen(true)}
              id="createList"
            >
              Create a List
            </Button>
            <Modal
              open={createOpen}
              onClose={() => setCreateOpen(false)}
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Create a List
                </Typography>
                <form onSubmit={createSubmit}>
                  <ul>
                    <li style={listStyle}>
                      <input
                        id="listName"
                        type="text"
                        placeholder="List Name"
                        onChange={(e) => setListName(e.target.value)}
                      />
                    </li>
                    <li style={listStyle} className='buttonLi'>
                      <button className='createListButton'>Create List</button>
                    </li>
                  </ul>
                </form>
              </Box>
            </Modal>
          </li>
          {/* <li> <a href="test3">Other Stuff</a></li> */}
          {/* <li> <a href="test4">Settings</a></li> */}
          <li> <Typography> Select List to View/Edit:</Typography> </li>
          <li> <SelectList /> </li>
          <li> <Typography> Select List to Delete:</Typography></li>
          <li> <DeleteList /> </li>
        </ul>
      </div>
    </div>
  );
}
