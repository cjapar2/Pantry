/* eslint-disable */

import React, {useEffect} from 'react';

import Mainlist from './Mainlist';
import Navbar from './Navbar';
import Rightbar from './Rightbar';
import Sidebar from './Sidebar';
import {useAuth} from './AuthProvider';
import {dataBaseContext} from './App';

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
export default function MainScreen() {
  const authentication = useAuth();
  const context = React.useContext(dataBaseContext);
  const {setCurrentList,setAvailableLists, setListTitle, setListId} = context;
  const id = authentication.getID();

  const selectList = (listArray) => {
    console.log(listArray);

    if (listArray.length === 1) {
      setCurrentList(listArray[0]);
      setListTitle(listArray[0].list_name);
      setListId(listArray[0].id)

    } else if (listArray.length === 0) {
      setListTitle('No lists are associated with this account yet.\n' + 
      `Create a list or Join another`);

    } else {
      setListTitle('Select a list from the dropdown menu');
    }
  }

  const getUserLists = async () => {
    await fetch(`http://localhost:3010/v0/lists/${id}`, {
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
      console.log(json);
      selectList(json);
      setAvailableLists(json);
    }) 
  }


  useEffect (() => {
    getUserLists();
  }, [])

  return (
    <div>
      <Sidebar />
      <Mainlist />
      <Navbar />
      <Rightbar />
    </div>
  );
}