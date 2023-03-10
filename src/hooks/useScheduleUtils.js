// Custom hook for general utilities when scheduling employees
export default function useScheduleUtils(loadCount) {
  // Looks at next and previous lunch slot to prevent same employee working consecutive lunch shifts
  const checkConsecutiveLunch = (place, employee, day, scheduleCopy) => {
    if (!employee)
      return false

    if (place.toLowerCase().includes("lunch") && employee) {
      const placeArr = place.split(" ");
      const nextChar = String.fromCharCode(placeArr[1].charCodeAt(0) + 1)
      const prevChar = String.fromCharCode(placeArr[1].charCodeAt(0) - 1)
      const nextLunch = `${placeArr[0]} ${nextChar}`;
      const prevLunch = `${placeArr[0]} ${prevChar}`;

      if ((scheduleCopy[nextLunch] && scheduleCopy[nextLunch][day] === employee) || 
          (scheduleCopy[prevLunch] && scheduleCopy[prevLunch][day] === employee)) {
        return true;
      }
    }
    return false;
  }

  // Returns total shifts per week for employee
  const countShiftsPerWeek = (employee) => {
    if (!employee)
      return 0

    const total = Object.values(loadCount[employee]).reduce((acc, curr) => acc + curr, 0);
    return total;
  }

  const checkConcurrentLocation = (place, employee, day, scheduleCopy) => {
    if (!employee)
      return false

    const timeOfDay = place.split(" ")[0];

    for (const schedulePlace in scheduleCopy) {
      if (schedulePlace != place && schedulePlace.includes(timeOfDay)) {
        if (scheduleCopy[schedulePlace][day] === employee) {
          return true
        }
      }
    }
    return false;
  }

  const getShiftsInDay = (employee, day) => {
    return (employee) ? loadCount[employee][day] : 0;
  }

  /**
   * Below logic prevents consecutive lunch shifts, more than 2 shifts per day,
   * more than 7 shifts per week, and employees working in two different places at once
   * @param {string} place 
   * @param {string} employee 
   * @param {string} day 
   * @param {Object} scheduleCopy 
   * @returns true if schedule request doesn't violate a constraint
   */
  const checkShiftConstraints = (place, employee, day, scheduleCopy) => {
    if (!checkConsecutiveLunch(place, employee, day, scheduleCopy) &&
        getShiftsInDay(employee, day) != 2 &&
        countShiftsPerWeek(employee) < 7 &&
        !checkConcurrentLocation(place, employee, day, scheduleCopy)) {
      return true;
    }
    return false;
  }

  const countShiftsRemaining = (schedule) => {
    let remainingShifts = 0;
    const scheduleCopy = structuredClone(schedule);
    for (const employee in loadCount) {
      for (const shift in scheduleCopy) {
        for (const day in scheduleCopy[shift]) {
          if (checkShiftConstraints(shift, employee, day, scheduleCopy)) {
            remainingShifts += 1;
            scheduleCopy[shift][day] = employee;
          }
        }
      }
    }
    console.log(remainingShifts);
  }

  return {
    checkShiftConstraints,
    countShiftsRemaining
  }
}