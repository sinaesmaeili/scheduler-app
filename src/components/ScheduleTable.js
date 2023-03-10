import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { tableFields } from '../constants/tableConstants';

const ScheduleTable = ({days, staff, schedule, updateSchedule}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {days.map((day) => <TableCell key={day}>{day}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Loop through locations and create new row for each */}
          {tableFields.locations.map((place) => (
            <TableRow key={`${place}-row`}>
              {/* First cell will be name of location */}
              <TableCell>{place}</TableCell>
              {/* Create cells for each day */}
              {days.map((day) => (
                // Creating select element and using employees as options
                <TableCell key={`${day}-select`}>
                  <select
                    onChange={(e) => updateSchedule({e, day, place})}
                    value={schedule[place][day]}
                  >
                    <option></option>
                    {staff.map((employee) => (
                      <option key={employee} value={employee}>
                        {employee}
                      </option>
                    ))}
                  </select>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ScheduleTable;