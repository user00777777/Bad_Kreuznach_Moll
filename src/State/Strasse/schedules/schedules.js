const wasteSchedule = {
  month: "December",
  year: 2025,
  schadstoff: {
    time: "13:15-14:15",
    ort: "Parkhaus",
    days: [4, 5, 8, 19, 21]
  },
  restabfall: {
    days: [5, 19]
  },
  altpapier: {
    days: [13]
  },
  bioabfall: {
    days: [12, 26]
  }
};

const january2026Schedule = {
  month: "January",
  year: 2026,
  restabfall: {
    days: []
  },
  altpapier: {
    days: []
  },
  bioabfall: {
    days: []
  }
};

export default function getSchedules() {
  return [wasteSchedule, january2026Schedule];
}
