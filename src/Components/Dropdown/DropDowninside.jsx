import React from 'react';
import s from './css/dropdownIside.module.css';

export default function DropDowninside({ name, date }) {
  console.log(date);

  // Деструктурируем date, получая массив дней, который приходит в пропсах
  const [a] = date;
  console.log(a.altpapier.days);  // Проверяем, что в нем содержится

  // Массивы с днями, которым нужно присваивать различные классы
  const daysArray1 = [1, 5, 10, 15];
  const daysArray2 = [3, 8, 12, 18];
  const daysArray3 = [7, 13, 20, 25];
  const daysArray4 = [2, 6, 14, 30];

  // Функция для определения классов для конкретного дня
  const getClassNames = (day) => {
    let classNames = '';
    
    // Проверяем, есть ли день в каждом массиве, и добавляем соответствующие классы
    if (daysArray1.includes(day)) classNames += `${s.highlight1} `;
    if (daysArray2.includes(day)) classNames += `${s.highlight2} `;
    if (daysArray3.includes(day)) classNames += `${s.highlight3} `;
    if (daysArray4.includes(day)) classNames += `${s.highlight4} `;
    
    return classNames.trim(); // Убираем лишний пробел в конце
  };

  return (
    <div className={s.monthGrid}>
      {/* Вставляем квадратики для каждого дня месяца (31 день) */}
      {Array.from({ length: 31 }, (_, index) => {
        const day = index + 1;
        const classNames = getClassNames(day); // Получаем классы для дня
        return (
          <div key={day} className={`${s.day} ${classNames}`}>
            {day}
          </div>
        );
      })}
    </div>
  );
}
