import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const LoadTable = ({days, staff, schedule, loadCount, updateLoadCount}) => {

  useEffect(() => {
    // Creates fresh new instance of table for later counting total of shifts per day
    // This will not scale well if the shift locations is very large as it creates a new table
    // and it loops through the schedule in each property and increments the shift by one for each
    // occurrence
    const newLoadCount = createLoadCountTable();
    for (const location in schedule) {
      for (const day in schedule[location]) {
        const member = schedule[location][day];
        if (member in newLoadCount) 
          newLoadCount[member][day] += 1;
      }
    }

    updateLoadCount(newLoadCount);

  }, [schedule]);

  // Creates new object table where each staff member has their shift count at 0 per day
  const createLoadCountTable = () => {
    const newLoadCount = {};
    for (const member of staff) {
      newLoadCount[member] = {};
      for (const day of days) {
        newLoadCount[member][day] = 0;
      }
    }
    return newLoadCount;
  }

  // Returns total shifts employee worked in week
  const getTotal = (memberObj) => {
    let total = 0;
    for (const day in memberObj) {
      total += memberObj[day];
    }
    return total;
  }

  return (
    <TableContainer component={Paper} sx={{ mb: 20 }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Staff Member</TableCell>
            {days.map((day) => <TableCell key={day}>{day}</TableCell>)}
            <TableCell>Totals</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {staff.map((staff) => (
            <TableRow key={`${staff}-row`}>
              <TableCell>{staff}</TableCell>
              {days.map((day) => (
                // Employees total will be inserted in this table cell
                <TableCell
                  key={`${staff}-${day}-load`}
                >
                  {loadCount[staff]?.[day] || 0}
                </TableCell>
              ))}
              {/* Totals cell */}
              <TableCell>
                {getTotal(loadCount[staff])}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default LoadTable;