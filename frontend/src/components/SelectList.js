/* eslint-disable */

import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {dataBaseContext} from './App';


export default function SelectList() {
  const context = React.useContext(dataBaseContext);
  const {setCurrentList, availableLists, setListTitle,
    listId, setListId} = context;

  // Sets the current list to the one selected
  const handleChange = (event) => {
    let list = availableLists.filter(obj => {
      return obj.id === event.target.value;
    });

    setCurrentList(list[0]);
    setListTitle(list[0].list_name);
    setListId(list[0].id);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120,}} size="small">
      <InputLabel sx={{ color: 'black'}} id="Select List">Your Lists</InputLabel>
      <Select
        value={listId}
        label="List Name"
        onChange={handleChange}
      >
        {availableLists.map((list) =>
          <MenuItem key={list.id} value={list.id}>{list.list_name}</MenuItem>
        )}
      </Select>
    </FormControl>
  );
}