/* eslint-disable */

import React, {useEffect, useState} from 'react';
import {useAuth} from './AuthProvider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import './Mainlist.css';
import {dataBaseContext} from './App';

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

export default function Mainlist() {
  const context = React.useContext(dataBaseContext);
  const data = context.dataChanged;
  const [itemList, setItemList] = useState([]);
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
      setItemList(json.rows);
    })
  }

  useEffect(() => {
    //  console.log('test');
      checkList();
  }, [data])


  return (
    <div className='mainList'>
      <p className='listName'>List Name</p>
      <div>
        <List>
          {itemList.map((object, index) => (
            <ListItem button key={index}>
              <ListItemText primary={object.item}/>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}


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
