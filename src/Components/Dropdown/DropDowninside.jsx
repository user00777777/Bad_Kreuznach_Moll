import React, { useState, useMemo, useCallback, useEffect } from 'react';
import s from './css/dropdownIside.module.css';

import allImg from '/src/Components/Dropdown/Foto/all.png';
import altpapierImg from '/src/Components/Dropdown/Foto/altPapier.png';
import bioImg from '/src/Components/Dropdown/Foto/bio.png';
import alle_Moll from '/src/Components/Dropdown/Foto/rest.png';

const MONTH_S = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december'
];

const MONTH_NAMES_RU = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
];

export default function DropDowninside({ date: schedules }) {
  const today = new Date();
  const todayDay = today.getDate();
  const currentMonthIndex = today.getMonth();
  const currentYear = today.getFullYear();

  // индекс текущего месяца в schedules
  const initialIndex = useMemo(() => {
    const currentMonthName = MONTH_S[currentMonthIndex];
    return schedules.findIndex(
      s => s.month.toLowerCase() === currentMonthName && s.year === currentYear
    );
  }, [schedules, currentMonthIndex, currentYear]);

  const [displayedMonthIndex, setDisplayedMonthIndex] = useState(
    initialIndex >= 0 ? initialIndex : 0
  );

  const currentSchedule = schedules[displayedMonthIndex];
  if (!currentSchedule) return null;

  const { restabfall, altpapier, bioabfall, schadstoff } = currentSchedule;

  const monthIndex = MONTH_S.indexOf(currentSchedule.month.toLowerCase());
  const daysInMonth = useMemo(() => 
    new Date(currentSchedule.year, monthIndex + 1, 0).getDate(),
    [currentSchedule.year, monthIndex]
  );

  const isCurrentMonth =
    monthIndex === currentMonthIndex && currentSchedule.year === currentYear;

  const getClassNames = useCallback((day) => [
    restabfall.days.includes(day) && s.restabfall,
    altpapier.days.includes(day) && s.altpapier,
    bioabfall.days.includes(day) && s.bioabfall,
    schadstoff.days.includes(day) && s.schadstoff,
    day === todayDay && isCurrentMonth && s.today
  ].filter(Boolean).join(' '), []);

  const getImageForDay = useCallback((day) => {
    if (restabfall.days.includes(day)) return allImg;
    if (altpapier.days.includes(day)) return altpapierImg;
    if (bioabfall.days.includes(day)) return bioImg;
    if (schadstoff.days.includes(day)) return alle_Moll;
    return null;
  }, [restabfall.days, altpapier.days, bioabfall.days, schadstoff.days]);

  const hasData = useMemo(() => [
    restabfall, altpapier, bioabfall, schadstoff
  ].some(type => type.days.length), [restabfall, altpapier, bioabfall, schadstoff]);

  // Горячие клавиши - только когда фокус на календаре
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Проверяем, что фокус на элементе календаря или его дочерних элементах
      const calendarElement = document.querySelector(`.${s.calendarContainer}`);
      if (!calendarElement || !calendarElement.contains(event.target)) {
        return;
      }

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          setDisplayedMonthIndex(prev => Math.max(0, prev - 1));
          break;
        case 'ArrowRight':
          event.preventDefault();
          setDisplayedMonthIndex(prev => Math.min(schedules.length - 1, prev + 1));
          break;
        case 'Home':
          event.preventDefault();
          setDisplayedMonthIndex(initialIndex >= 0 ? initialIndex : 0);
          break;
        case 'End':
          event.preventDefault();
          setDisplayedMonthIndex(schedules.length - 1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [schedules.length, initialIndex]);

  if (!hasData) return null;

  return (
    <div className={s.calendarContainer}>
      <div className={s.monthNavigation}>
        <button
          onClick={() => setDisplayedMonthIndex(i => Math.max(0, i - 1))}
          disabled={displayedMonthIndex === 0}
          className={s.navButton}
          title="Предыдущий месяц (←)"
        >
          ←
        </button>
        
        <h3 className={s.monthTitle}>
          {MONTH_NAMES_RU[monthIndex]} {currentSchedule.year}
        </h3>
        
        <button
          onClick={() => setDisplayedMonthIndex(i => Math.min(schedules.length - 1, i + 1))}
          disabled={displayedMonthIndex === schedules.length - 1}
          className={s.navButton}
          title="Следующий месяц (→)"
        >
          →
        </button>
      </div>
      
      <div className={s.monthGrid}>
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const img = getImageForDay(day);

          return (
            <div key={day} className={`${s.day} ${getClassNames(day)}`}>
              {day}
              {img && <img src={img} className={s.image} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
