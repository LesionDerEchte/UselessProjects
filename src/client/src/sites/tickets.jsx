//import * as React from 'react';
import React, { useEffect, useLayoutEffect, useState,useCallback} from 'react';
import axios, { Axios } from 'axios';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button } from '@mui/material';

export default function Tickets() {
  const [games, setGames] = useState([])

  useState(() => {
      axios.get(`http://${window.location.hostname}:3001/games/select/`).then((response)=>{
        setGames(response.data) 
        console.log(response.data)
      });
  });

  const handleEvent: GridEventListener<'rowClick'> = (
    params, // GridRowParams
    event, // MuiEvent<React.MouseEvent<HTMLElement>>
    details, // GridCallbackDetails
  ) => {
    console.log(params.row.gameid)
  };
  
    const columns: GridColDef[] = [
        { field: 'date', headerName: 'Datum', width: 260, renderCell: (params) => <div>{params.value.replace('Z',' ').replace('T',', ').replace(':00.000','')+' Uhr'}</div>}, 
        { field: 'imageLeague', headerName: '', width: 50, renderCell: (params) => <img src={params.value} width={30} />}, 
        { field: 'league', headerName: 'Liga', width: 300 },
        { field: 'imageHome', headerName: '', width: 50, renderCell: (params) => <img src={params.value} width={30} />}, 
        { field: 'home', headerName: 'Heimverein', width: 300 },
        { field: 'imageAway', headerName: '', width: 50, renderCell: (params) => <img src={params.value} width={30} />}, 
        { field: 'away', headerName: 'Auswärtsverein', width: 300},
        { field: 'stadium', headerName: 'Stadion', width: 300},
        { field: 'buy',  headerName: '', width: 150, renderCell: (params) =>  <form action={params.value}>
  
        <Button type="submit">Tickets kaufen</Button>
     </form> },
      ];
  return (
    <div>



<Box sx={{ height: 800, width: '100%' }}>
      <DataGrid onRowClick={handleEvent} rows={games} columns={columns} />
    </Box>


    </div>
  )
}


  
