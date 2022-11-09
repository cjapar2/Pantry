/* eslint-disable */

import React, {useEffect, useState} from 'react';
import {useAuth} from './AuthProvider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
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
      <List sx={{ mt: 5 }} component={Stack} direction="row" spacing={0}>
        <ListItem>
          <ListItemText primary="Item" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Amount" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Date Purchased" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Notes" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Tags" />
        </ListItem>
      </List>
      {itemList.map((object, index) => (
            <List component={Stack} direction="row" spacing={0}>
              <ListItem button key={index + "name"}>
                <ListItemText primary={object.item} />
              </ListItem>
              <ListItem button key={index + "amount"}>
                <ListItemText primary={object.amount} />
              </ListItem>
              <ListItem button key={index + "date"}>
                <ListItemText primary={formatDate(object.purchasedate)} />
              </ListItem> 
              <ListItem button key={index + "notes"}>
                <ListItemText primary={object.notes} />
              </ListItem>
              <ListItem button key={index}>
                <ListItemText primary= {printTags(object.tags)} />
              </ListItem>
           </List>
          ))}
    </div>
  );
}

function printTags(objectTags){
  console.log(objectTags)
  console.log(Object.keys(objectTags))
  var result = "";
  Object.keys(objectTags).forEach((key) =>{
    result = result + key + ", "
  });
  result = result.replace(/,\s*$/, "");
  return result
}

function formatDate(date_string){
  let date = new Date(date_string);
  let dateMDY = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
  return dateMDY
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
