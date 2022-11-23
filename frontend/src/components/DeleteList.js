/* eslint-disable */

import React, {useEffect, useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Dialog, ListItemButton } from '@mui/material';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import {useAuth} from './AuthProvider';
import {dataBaseContext} from './App';


export default function DeleteList() {
  const authentication = useAuth();
  const context = React.useContext(dataBaseContext);
  const {availableLists} = context;
  const setData = context.setDataChanged;
  const data = context.dataChanged;
  const [selectedList, setSelectedList] = React.useState({});
  const [openDelete, setOpenDelete] = React.useState(false);
  const id = authentication.getID();

  const handleChange = (event) => {
    let list = availableLists.filter(obj => {
      return obj.id === event.target.value;
    });

    console.log(list[0]);
    setSelectedList(list[0]);
    setOpenDelete(true);
  };

  function handleClose (){
    setOpenDelete(false);
  };

  function deletingItem (){
    fetch(`http://localhost:3010/v0/users/${selectedList.id}`, {
      method: 'DELETE',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${authentication.getToken()}`,
      },
    })
    .then(() => {
      setOpenDelete(false);
      setData(!data);
    })
  }

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120,}} size="small">
        <InputLabel sx={{ color: 'black'}} id="Select List">List Name</InputLabel>
        <Select
          value={''}
          label="List Name"
          onChange={handleChange}
        >
          {availableLists.map((list) =>
            <MenuItem key={list.id} value={list.id}>{list.list_name}</MenuItem>
          )}
        </Select>
      </FormControl>
      <Dialog open={openDelete} onClose={handleClose}>
        <DialogTitle>Delete List</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you do want to delete {selectedList.list_name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deletingItem} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}