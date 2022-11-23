/* eslint-disable */

import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Dialog} from '@mui/material';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import {useAuth} from './AuthProvider';
import {dataBaseContext} from './App';


export default function ShareList() {
  const context = React.useContext(dataBaseContext);
  const {availableLists} = context;
  const [selectedList, setSelectedList] = React.useState({});
  const [openShare, setOpenShare] = React.useState(false);

  const handleChange = (event) => {
    let list = availableLists.filter(obj => {
      return obj.id === event.target.value;
    });

    setSelectedList(list[0]);
    setOpenShare(true);
  };

  function handleClose (){
    setOpenShare(false);
  };

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
      <Dialog open={openShare} onClose={handleClose}>
        <DialogTitle>Share List</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Share this code to have others join {selectedList.list_name}: {selectedList.id}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}