export const tableFields = {
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  staff: ["Messi", "Henry", "Saka", "Zidane", "Bergkamp", "Ronaldinho", "Lehmann"],
  locations: [
    "Morning Up Stairs",
    "Morning Down Stairs",
    "Morning Parking Lot",
    "Lunch A",
    "Lunch B",
    "Lunch C",
    "Lunch D",
    "Afternoon Up Stairs",
    "Afternoon Down Stairs",
    "Afternoon Parking Lot"
  ]
}

export function getNewSchedule() {
  const staffSchedule = {};
  
  // Dynamically generates a object in the format of the schedule table as seen in UI
  for (const location of tableFields.locations) {
    staffSchedule[location] = {};
    for (const day of tableFields.days) {
      staffSchedule[location][day] = "";
    }
  }

  return staffSchedule;
}
