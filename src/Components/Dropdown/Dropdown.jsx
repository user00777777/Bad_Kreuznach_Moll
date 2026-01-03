import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useStore from '../../State/Strasse/Strasse';
import DropDowninside from './DropDowninside';
import s from './css/dropDown.module.css';

// Import images
import allImg from '/src/Components/Dropdown/Foto/all.png';
import altpapierImg from '/src/Components/Dropdown/Foto/altPapier.png';
import bioImg from '/src/Components/Dropdown/Foto/bio.png';
import alle_Moll from '/src/Components/Dropdown/Foto/rest.png';

export default function Dropdown() {
  const { register, handleSubmit, watch } = useForm();

  // Localization state: 'de' (default) or 'ru'
  const [lang, setLang] = useState('de');

  const toggleLang = () => {
    setLang(prev => prev === 'de' ? 'ru' : 'de');
  };

  // Translation Database
  const t = {
    de: {
      label: 'Wählen Sie eine Straße:',
      placeholder: 'Wählen...',
      sendButton: 'Senden',
      today: 'HEUTE!',
      inDays: (d) => `in ${d} Tagen`,
      nextPickup: 'Nächste Abholung:',
      noInfo: 'Keine Information zur nächsten Abholung.',
      types: {
        'restabfall': 'Restabfall (Schwarz)',
        'altpapier': 'Altpapier (Blau)',
        'bioabfall': 'Bioabfall (Braun)',
        'schadstoff': 'Schadstoff (Mobil)'
      }
    },
    ru: {
      label: 'Выберите улицу:',
      placeholder: 'Выберите...',
      sendButton: 'Отправить',
      today: 'СЕГОДНЯ!',
      inDays: (d) => `через ${d} дн.`,
      nextPickup: 'Следующий вывоз:',
      noInfo: 'Нет информации о следующем вывозе.',
      types: {
        'restabfall': 'Остаточный мусор (Restabfall)',
        'altpapier': 'Бумага (Altpapier)',
        'bioabfall': 'Биоотходы (Bioabfall)',
        'schadstoff': 'Вредные вещества (Schadstoff)'
      }
    }
  };

  // Helper to get text based on current lang
  const validLang = t[lang] ? lang : 'de';
  const text = t[validLang];

  // Получаем данные из Zustand
  const streets = useStore((state) => state.streets);
  const show = useStore((state) => state.show);

  const [streetInfo, setStreetInfo] = useState(null); // Состояние для информации об улице
  const [message, setMessage] = useState(null); // Состояние для сообщения (JSX or null)

  /* 
   * NEW LOGIC: Calculate Next Pickup
   * Iterates from current date forward to find the very next pickup 
   */
  const getNextPickup = (schedules) => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonthIndex = today.getMonth(); // 0-11
    const currentDay = today.getDate();

    // Start checking from the current month
    // We look ahead up to 12 months to be safe
    for (let i = 0; i < 12; i++) {
      // Calculate target month/year
      let targetMonthIndex = currentMonthIndex + i;
      let targetYear = currentYear;

      // Handle year rollover (e.g. month 12 is Jan next year)
      if (targetMonthIndex > 11) {
        targetYear += Math.floor(targetMonthIndex / 12);
        targetMonthIndex = targetMonthIndex % 12;
      }

      // Find schedule for this specific month/year
      // Schedules have English month names like "January"
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const targetMonthName = monthNames[targetMonthIndex];

      const schedule = schedules.find(s =>
        s.month === targetMonthName && s.year === targetYear
      );

      if (!schedule) continue;

      // Extract trash dates
      const { restabfall, altpapier, bioabfall, schadstoff } = schedule;

      // Combine all events: { day, type, label }
      const events = [];
      if (restabfall?.days) restabfall.days.forEach(d => events.push({ day: d, type: 'restabfall', label: 'Restabfall (Black)' }));
      if (altpapier?.days) altpapier.days.forEach(d => events.push({ day: d, type: 'altpapier', label: 'Altpapier (Paper)' }));
      if (bioabfall?.days) bioabfall.days.forEach(d => events.push({ day: d, type: 'bioabfall', label: 'Bioabfall (Green)' }));
      if (schadstoff?.days) schadstoff.days.forEach(d => events.push({ day: d, type: 'schadstoff', label: 'Schadstoff (Toxic)' }));

      if (events.length === 0) continue;

      // Sort events by day
      events.sort((a, b) => a.day - b.day);

      // If it's the current month, filter out past days
      // If it's a future month, take the first event
      let nextEvent = null;
      if (i === 0) {
        nextEvent = events.find(e => e.day >= currentDay);
      } else {
        nextEvent = events[0];
      }

      if (nextEvent) {
        // Calculate days remaining
        const eventDate = new Date(targetYear, targetMonthIndex, nextEvent.day);

        // Reset time parts for accurate day diff
        const todayNoTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const eventNoTime = new Date(targetYear, targetMonthIndex, nextEvent.day);

        const diffTime = Math.abs(eventNoTime - todayNoTime);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return {
          ...nextEvent,
          date: eventDate,
          daysRemaining: diffDays,
          monthName: targetMonthName
        };
      }
    }
    return null;
  };

  const onSubmit = (data) => {
    const [streetName, houseNumberStr] = data.option.split('#');
    const houseNumber = Number(houseNumberStr);

    const info = show(streetName, houseNumber);
    setStreetInfo(info);

    // We only set the raw data here so the render logic can handle language switching dynamically
    if (info && info.date) {
      const nextPickup = getNextPickup(info.date);
      setMessage(nextPickup); // Store the object, not the string!
    } else {
      setMessage(null);
    }
  };

  // Render message dynamically
  const renderMessage = () => {
    if (!message) {
      if (streetInfo && !message) return text.noInfo;
      return null;
    }

    // If message is just a string (legacy/error), return it
    if (typeof message === 'string') return message;

    // Logic for next pickup object
    const dayText = message.daysRemaining === 0
      ? text.today
      : text.inDays(message.daysRemaining);

    const typeImages = {
      'restabfall': allImg,
      'altpapier': altpapierImg,
      'bioabfall': bioImg,
      'schadstoff': alle_Moll
    };

    const typeName = text.types[message.type] || message.label;
    const typeImgSrc = typeImages[message.type];

    return (
      <div className={s.messageContent}>
        {text.nextPickup}
        <span className={s.highlightType}>
          <img src={typeImgSrc} alt="icon" className={s.messageIcon} />
          {typeName}
        </span>
        — {dayText} <span className={s.date}>({message.day} {message.monthName})</span>
      </div>
    );
  };


  return (<div className={s.container}>

    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="option" onClick={toggleLang} style={{ cursor: 'pointer' }} title="Click to switch language / Нажмите для смены языка">
        {text.label}
      </label>

      <select {...register('option')}>
        <option value="">{text.placeholder}</option>

        {/* Пример значений, можно сделать через список streets */}
        <option value="Mannheimer#43">Mannheimer Str 1 bis 67 und 2 bis 98</option>

      </select>

      <button type="submit">Senden</button>

      {/* Отображаем сообщение, если оно есть */}
      {streetInfo && (
        <div className={s.messageText} onClick={toggleLang} style={{ cursor: 'pointer' }} title="Click to switch language">
          {renderMessage()}
        </div>
      )}

      {/* Отображаем информацию об улице, если она найдена */}
    </form>

    {streetInfo && <DropDowninside {...streetInfo} />

    }
  </div>
  );
}
