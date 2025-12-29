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

  const getClassNames = useCallback((day) => {
    let classNames = '';
    if (restabfall.days.includes(day)) classNames += `${s.restabfall} `;
    if (altpapier.days.includes(day)) classNames += `${s.altpapier} `;
    if (bioabfall.days.includes(day)) classNames += `${s.bioabfall} `;
    if (schadstoff.days.includes(day)) classNames += `${s.schadstoff} `;
    if (day === todayDay && isCurrentMonth) classNames += `${s.today} `;
    return classNames.trim();
  }, [restabfall.days, altpapier.days, bioabfall.days, schadstoff.days, todayDay, isCurrentMonth]);

  const getImagesForDay = useCallback((day) => {
    const images = [];
    if (restabfall.days.includes(day)) images.push(allImg);
    if (altpapier.days.includes(day)) images.push(altpapierImg);
    if (bioabfall.days.includes(day)) images.push(bioImg);
    if (schadstoff.days.includes(day)) images.push(alle_Moll);
    
    // Отладка для дня 29
    if (day === 29) {
      console.log('Day 29 images:', images);
      console.log('Day 29 data:', { 
        restabfall: restabfall.days.includes(29),
        altpapier: altpapier.days.includes(29),
        bioabfall: bioabfall.days.includes(29),
        schadstoff: schadstoff.days.includes(29)
      });
    }
    
    return images;
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
          const images = getImagesForDay(day);

          return (
            <div key={day} className={`${s.day} ${getClassNames(day)}`}>
              {day}
              <div className={s.imagesContainer}>
                {images.map((img, index) => (
                  <img key={index} src={img} className={s.smallImage} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
