/* eslint-disable */

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {editItemContext} from './Mainlist';
import {dataBaseContext} from './App';
import {TextField, Input, Typography, Grid} from '@mui/material';
import {useAuth} from './AuthProvider';


export default function EditDialog() {
  const editContext = React.useContext(editItemContext);
  const dataContext = React.useContext(dataBaseContext);
  const {open, setOpen, editItem} = editContext;
  const setData = dataContext.setDataChanged;
  const data = dataContext.dataChanged;
  const [newItem, setNewItem] = React.useState(
    {item: editItem.item, amount: editItem.amount, purchaseDate: editItem.purchasedate,
      notes: editItem.notes, tags: editItem.tags});
  const authentication = useAuth();
  const tagNames = ['Shared', 'Dairy', 'Meat', 'Produce', 'Spice'];
  

  const updateTags = (tag, bool) => {
    const item = newItem;
    const tags = item['tags'];
    tags[tag] = bool;
    setNewItem(item);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    const {value, name} = event.target;
    const item = newItem;

    if (name === 'amount') {
      item[name] = parseInt(value);
    } else {
      item[name] = value;
    }
    setNewItem(item);
  };

  function createTagButtons(tagNames, updateTags) {
    const rows = [];
  
    for (let i = 0; i < tagNames.length; i++) {
      const name = tagNames[i];
      rows.push(
        <label className='tagBox' key={name}>
          <input type="checkbox"
            key={name}
            id={"tag" + name}
            defaultChecked={editItem.tags[name]}
            className="tag"
            onChange={(e) => updateTags(name, e.target.checked)}
          />
            {name}
        </label>
      );
    }
    return rows;
  }

  const updateItem = (event) => {
    event.preventDefault();
    
    fetch(`http://localhost:3010/v0/foodlist/${editItem.id}`, {
      method: 'PUT',
      body: JSON.stringify(newItem),
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
      setData(!data);
      setOpen(false);
    })
  }

  return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          <Grid container direction={'column'} columns={1} spacing={3}>

            <Grid item>
              <Typography>Name of Item</Typography>
              <TextField size='small' name='item' placeholder='Item Name'
                defaultValue={editItem.item} type={'text'} onChange={handleInputChange}/>
            </Grid>

            <Grid item>
              <Typography>Item Quantity</Typography>
              <TextField size='small' type={'number'} name='amount'
                defaultValue={editItem.amount} placeholder='' onChange={handleInputChange} sx={{
                  width: '30%'
                }}/>
            </Grid>

            <Grid item>
              <Typography>Date Purchased</Typography>
              <Input type={'date'} name='purchaseDate' defaultValue={editItem.purchasedate}
                placeholder='Input an item to add...' onChange={handleInputChange}/>
            </Grid>

            <Grid item pb={'15px'}>
              <Typography>Description of Item</Typography>
              <textarea type='text' placeholder='Write a description for your item...'
                defaultValue={editItem.notes} name='notes' onChange={handleInputChange}/>
            </Grid>
          </Grid>

          {createTagButtons(tagNames, updateTags)}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateItem}>Update Item</Button>
        </DialogActions>
      </Dialog>
  );
}
