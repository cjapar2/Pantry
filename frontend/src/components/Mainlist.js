/* eslint-disable */

import React, {useEffect, useState} from 'react';
import {useAuth} from './AuthProvider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import './Mainlist.css';
import {dataBaseContext} from './App';
import { ListItemButton } from '@mui/material';
import EditDialog from './EditDialog';

/*
      <button onClick={addItemButton} className='addItemButton'>+</button>
      <input
        id="test"
        type="text"
        className='addItemTextbox'
        placeholder='Input an item to add...'/>
        */

/**
 * Simple component with no state.
 *
 * @return {object} maintest
 */

 const editItemContext = React.createContext();

export default function Mainlist() {
  const context = React.useContext(dataBaseContext);
  const data = context.dataChanged;
  const [itemList, setItemList] = useState([]);
  const [editItem, setEditItem] = React.useState({});
  // id: 0, item: '', amount: 0, purchaseDate: '', notes: '', tags: {}
  const [open, setOpen] = React.useState(false);
  const authentication = useAuth();

  async function checkList(event) {
    fetch('http://localhost:3010/v0/foodlist', {
      method: 'GET',
      headers: {
        'accept': 'application/json',
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
      const data = json.rows;
      data.sort((a, b) => a.id < b.id ? -1 : 1);
      console.log(json.rows);
      setItemList(json.rows);
    })
  }

  useEffect(() => {
    //  console.log('test');
      checkList();
  }, [data])

  function handleClickOpen (item) {
    setEditItem(item);
    setOpen(true);
  };

  return (
    <div className='mainList'>
      <p className='listName'>List Name</p>
      <div>
          <List>
            {itemList.map((object, index) => (
                <ListItem key={index}>
                  <ListItemText primary={object.item}/>
                  <ListItemButton role={'button'} color={'blue'} onClick={() => {handleClickOpen(object)}}>
                  <ListItemText primary={'Edit'}/>
                  </ListItemButton>
                </ListItem>
            ))}
          </List>
          <editItemContext.Provider value={{open, setOpen, editItem}}>
            {open? (<EditDialog/>) : null}
          </editItemContext.Provider>
      </div>
    </div>
  );
}

export {
  editItemContext,
};

/**
 * Adds an item to the list
 *
 * @return {object} True or False
function addItemButton() {
  if (document.getElementById('test').value) {
    const itemText = document.getElementById('test').value;
    const newListItem = document.createElement('li');
    newListItem.appendChild(document.createTextNode(itemText));
    const mainItemList = document.getElementById('mainItemList');
    mainItemList.appendChild(newListItem);
    document.getElementById('test').value = '';
    return true;
  }
  return false;
}
*/
