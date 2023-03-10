import React, { useState, useEffect, useRef } from 'react';
import ScheduleTable from './components/ScheduleTable';
import LoadTable from './components/LoadTable';
import TableButtons from './components/TableButtons';
import Container from '@mui/material/Container';
import { getNewSchedule, tableFields } from './constants/tableConstants';
import useScheduleUtils from './hooks/useScheduleUtils';
import useHistory from './hooks/useHistory';

function App() {
  const [schedule, setSchedule] = useState(getNewSchedule());
  const [loadCount, setLoadCount] = useState({});
  const isFirstRender = useRef(true);
  const { checkShiftConstraints, countShiftsRemaining } = useScheduleUtils(loadCount);
  const { updateHistory, undo, redo } = useHistory();

  const handleScheduleChange = (args) => {
    const { e, day, place } = args;
    const employee = e.target.value;

    const scheduleCopy = { ...schedule };
    countShiftsRemaining(scheduleCopy);

    if (checkShiftConstraints(place, employee, day, scheduleCopy)) {
      // Saves the employee at the registered shift location
      scheduleCopy[place][day] = employee;
      setSchedule(scheduleCopy);
      updateHistory(scheduleCopy);
    }
  }

  useEffect(() => {
    // Retrieve data on component mount
    const fetchData = async () => {
      const res = await fetch('/api/schedule/get')
      const jsonData = await res.json();
      if (Object.keys(jsonData).length != 0) {
        setSchedule(jsonData);
        updateHistory(jsonData);
      } else {
        setSchedule(schedule);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    // Prevents POST request being called when component is first rendered.
    // This is due to how the above useEffect retrieves the latest schedule from the backend
    // and if it updates then that would trigger another POST to the backend. The below logic
    // prevents that
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    
    // POST current schedule data when useEffect hook notices change in schedule state
    const fetchData = async () => {
      await fetch("/api/schedule/save", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(schedule)
      });
    }

    fetchData();
  }, [schedule])

  const undoHistory = () => setSchedule(undo());

  const redoHistory = () => setSchedule(redo());

  return (
    <Container>
      <h2 align="center">Schedule</h2>
      <TableButtons
        clearSchedule={() => setSchedule(getNewSchedule())}
        undo={() => undoHistory()}
        redo={() => redoHistory()}
      />
      <ScheduleTable
        days={tableFields.days}
        staff={tableFields.staff}
        schedule={schedule}
        updateSchedule={(args) => handleScheduleChange(args)}
      ></ScheduleTable>
      <h2 align="center">Load</h2>
      <LoadTable
        days={tableFields.days}
        staff={tableFields.staff}
        schedule={schedule}
        loadCount={loadCount}
        updateLoadCount={(newCount) => setLoadCount(newCount)}
      ></LoadTable>
    </Container>
  );
}

export default App;

