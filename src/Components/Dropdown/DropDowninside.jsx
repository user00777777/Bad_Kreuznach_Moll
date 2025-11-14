import React, { useState } from 'react';
import s from './css/dropdownIside.module.css';

export default function DropDowninside({ name, date }) {
  console.log(date);

  // Деструктурируем date, получая массив дней
  const [a] = date; // Предположим, что date — это массив с одним объектом
  const { restabfall, altpapier, bioabfall } = a;

  // Получаем сегодняшний день
  const today = new Date();
  const todayDay = today.getDate(); // Получаем номер сегодняшнего дня (число)

  // Функция для определения классов для конкретного дня
  const getClassNames = (day) => {
    let classNames = '';

    // Проверяем, есть ли день в каждом массиве, и добавляем соответствующие классы
    if (restabfall.days.includes(day)) classNames += `${s.restabfall} `;
    if (altpapier.days.includes(day)) classNames += `${s.altpapier} `;
    if (bioabfall.days.includes(day)) classNames += `${s.bioabfall} `;
    
    // Добавляем класс для сегодняшнего дня
    if (day === todayDay) classNames += `${s.today} `;

    return classNames.trim(); // Убираем лишний пробел в конце
  };

  // Функция для добавления изображения для определённого типа мусора
  const getImageForDay = (day) => {
    if (restabfall.days.includes(day)) {
      return <img src="/src/Components/Dropdown/Foto/all.png" alt="Restabfall" className={s.image} />;
    }
    if (altpapier.days.includes(day)) {
      return <img src="/src/Components/Dropdown/Foto/altPapier.png" alt="Altpapier" className={s.image} />;
    }
    if (bioabfall.days.includes(day)) {
      return <img src="/src/Components/Dropdown/Foto/bio.png" alt="Bioabfall" className={s.image} />;
    }
    return null;
  };

  return (
    <div className={s.monthGrid}>
      {/* Вставляем квадратики для каждого дня месяца (31 день) */}
      {Array.from({ length: 31 }, (_, index) => {
        const day = index + 1;
        const classNames = getClassNames(day); // Получаем классы для дня
        const image = getImageForDay(day); // Получаем изображение для дня
        return (
          <div key={day} className={`${s.day} ${classNames}`}>
            {day}
            {image} {/* Вставляем изображение, если оно есть */}
          </div>
        );
      })}
    </div>
  );
}
