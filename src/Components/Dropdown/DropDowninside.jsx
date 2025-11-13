import React from 'react'
import s from './css/dropdownIside.module.css'

export default function DropDowninside({name,date}) { {
console.log(date);

    
  return (
    <div className={s.monthGrid}>
      {/* Вставляем квадратики для каждого дня месяца (31 день) */}
      {Array.from({ length: 31 }, (_, index) => (
        <div key={index + 1} className="day">
          {index + 1}
        </div>
      ))}
    </div>
  )
}}
