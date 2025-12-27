const january2026Schedule = {
  month: "January",
  year: 2026,
  schadstoff: {
    time: "",
    ort: "",
    days: []
  },
  restabfall: {
    days: [2,14,28]
  },
  altpapier: {
    days: [9]
  },
  bioabfall: {
    days: [8,21]
  }
};

const february2026Schedule = {
  month: "February",
  year: 2026,
  schadstoff: {
    time: "10:30 - 11:15",
    ort: "Holzmarkt, Bad Kreuznach",
    days: [11]
  },
  restabfall: {
    days: [11,25]
  },
  altpapier: {
    days: [5]
  },
  bioabfall: {
    days: [4,18]
  }
};

const march2026Schedule = {
  month: "March",
  year: 2026,
  schadstoff: {
    time: "",
    ort: "",
    days: []
  },
  restabfall: {
    days: [11,25]
  },
  altpapier: {
    days: [5]
  },
  bioabfall: {
    days: [4,18]
  }
};

const april2026Schedule = {
  month: "April",
  year: 2026,
  schadstoff: {
    time: "",
    ort: "",
    days: []
  },
  restabfall: {
    days: [9,22]
  },
  altpapier: {
    days: [1,30]
  },
  bioabfall: {
    days: [15,29]
  }
};

const may2026Schedule = {
  month: "May",
  year: 2026,
  schadstoff: {
    time: "10:30 - 11:15",
    ort: "Holzmarkt, Bad Kreuznach",
    days: [20]
  },
  restabfall: {
    days: [6,20]
  },
  altpapier: {
    days: [29]
  },
  bioabfall: {
    days: [13,28]
  }
};

const june2026Schedule = {
  month: "June",
  year: 2026,
  schadstoff: {
    time: "",
    ort: "",
    days: []
  },
  restabfall: {
    days: [3,17]
  },
  altpapier: {
    days: [25]
  },
  bioabfall: {
    days: [10,24]
  }
};

const july2026Schedule = {
  month: "July",
  year: 2026,
  schadstoff: {
    time: "",
    ort: "",
    days: []
  },
  restabfall: {
    days: [1,15,29]
  },
  altpapier: {
    days: [23]
  },
  bioabfall: {
    days: [8,22]
  }
};

const august2026Schedule = {
  month: "August",
  year: 2026,
  schadstoff: {
    time: "10:30 - 11:15",
    ort: "Holzmarkt, Bad Kreuznach",
    days: [15]
  },
  restabfall: {
    days: [12,26]
  },
  altpapier: {
    days: [20]
  },
  bioabfall: {
    days: [5,19]
  }
};

const september2026Schedule = {
  month: "September",
  year: 2026,
  schadstoff: {
    time: "",
    ort: "",
    days: []
  },
  restabfall: {
    days: [9,23]
  },
  altpapier: {
    days: [17]
  },
  bioabfall: {
    days: [2,16,30]
  }
};

const october2026Schedule = {
  month: "October",
  year: 2026,
  schadstoff: {
    time: "",
    ort: "",
    days: []
  },
  restabfall: {
    days: [7,21]
  },
  altpapier: {
    days: [15]
  },
  bioabfall: {
    days: [14,28]
  }
};

const november2026Schedule = {
  month: "November",
  year: 2026,
  schadstoff: {
    time: "10:30 - 11:15",
    ort: "Holzmarkt, Bad Kreuznach",
    days: [18]
  },
  restabfall: {
    days: [4,18]
  },
  altpapier: {
    days: [12]
  },
  bioabfall: {
    days: [11,25]
  }
};

const december2026Schedule = {
  month: "December",
  year: 2026,
  schadstoff: {
    time: "",
    ort: "",
    days: []
  },
  restabfall: {
    days: [2,16,30]
  },
  altpapier: {
    days: [10]
  },
  bioabfall: {
    days: [9,22]
  }
};

export default function getSchedules() {
  return [january2026Schedule, february2026Schedule, march2026Schedule, april2026Schedule, may2026Schedule, june2026Schedule, july2026Schedule, august2026Schedule, september2026Schedule, october2026Schedule, november2026Schedule, december2026Schedule];
}
