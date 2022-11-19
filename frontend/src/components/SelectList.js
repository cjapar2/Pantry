/* eslint-disable */

import React, {useEffect, useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useAuth} from './AuthProvider';
import {dataBaseContext} from './App';


export default function SelectList() {
  const authentication = useAuth();
  const context = React.useContext(dataBaseContext);
  const {currentList, setCurrentList, availableLists,
    setAvailableLists, listTitle, setListTitle} = context;
  const id = authentication.getID();

  const handleChange = (event) => {
    let list = availableLists.filter(obj => {
      return obj.id === event.target.value;
    });

    console.log(list[0]);
    setCurrentList(list[0]);
    setListTitle(list[0].list_name);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="Select List">List Name</InputLabel>
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
  );
}