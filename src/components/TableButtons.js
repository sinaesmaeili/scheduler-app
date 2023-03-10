import React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const TableButtons = ({clearSchedule, undo, redo}) => {
  return (
    <Grid
        container
        direction="row"
        sx={{mb:2}}
    >
      <Button
        variant="outlined"
        size="medium"
        onClick={() => clearSchedule()}
      >
        Clear Table
      </Button>
      <Button
        variant="outlined"
        size="medium"
        sx={{ml: "auto"}}
        onClick={() => undo()}
      >
        Undo
      </Button>
      <Button
        variant="outlined"
        size="medium"
        sx={{ml: 1}}
        onClick={() => redo()}
      >
        Redo
      </Button>
    </Grid>
  )
}

export default TableButtons;