import React from 'react';
import s from './css/dropdownIside.module.css';

import allImg from '/src/Components/Dropdown/Foto/all.png';
import altpapierImg from '/src/Components/Dropdown/Foto/altPapier.png';
import bioImg from '/src/Components/Dropdown/Foto/bio.png';

export default function DropDowninside({ name, date }) {
  const [a] = date;
  const { restabfall, altpapier, bioabfall } = a;

  const todayDay = new Date().getDate();

  const getClassNames = (day) => {
    let classNames = '';
    if (restabfall.days.includes(day)) classNames += `${s.restabfall} `;
    if (altpapier.days.includes(day)) classNames += `${s.altpapier} `;
    if (bioabfall.days.includes(day)) classNames += `${s.bioabfall} `;
    if (day === todayDay) classNames += `${s.today} `;
    return classNames.trim();
  };

  const getImageForDay = (day) => {
    if (restabfall.days.includes(day)) return <img src={allImg} className={s.image} />;
    if (altpapier.days.includes(day)) return <img src={altpapierImg} className={s.image} />;
    if (bioabfall.days.includes(day)) return <img src={bioImg} className={s.image} />;
    return null;
  };

  return (
    <div className={s.monthGrid}>
      {Array.from({ length: 31 }, (_, index) => {
        const day = index + 1;
        return (
          <div key={day} className={`${s.day} ${getClassNames(day)}`}>
            {day}
            {getImageForDay(day)}
          </div>
        );
      })}
    </div>
  );
}
