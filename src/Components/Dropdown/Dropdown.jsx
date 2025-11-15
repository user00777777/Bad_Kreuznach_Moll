import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useStore from '../../State/Strasse/Strasse'; 
import DropDowninside from './DropDowninside';
import s from './css/dropDown.module.css';

export default function Dropdown() {
  const { register, handleSubmit, watch } = useForm();

  // Получаем данные из Zustand
  const streets = useStore((state) => state.streets);
  const show = useStore((state) => state.show);

  const [streetInfo, setStreetInfo] = useState(null); // Состояние для информации об улице
  const [message, setMessage] = useState(''); // Состояние для сообщения

  const onSubmit = (data) => {
    const [streetName, houseNumberStr] = data.option.split('#'); // Разбираем данные
    const houseNumber = Number(houseNumberStr); // Преобразуем номер дома в число

    // Получаем информацию об улице через функцию show из Zustand
    const info = show(streetName, houseNumber); 
    setStreetInfo(info); // Сохраняем информацию о улице в состояние

    if (info) {
      // Получаем текущий день
      const today = new Date();
      const todayDay = today.getDate(); // Получаем текущий день (число)

      let messageText = ''; // Сообщение для вывода


      // Проверяем, если сегодня вывозится какой-либо мусор
      if (info.date && info.date.length > 0) {
        const { restabfall, altpapier, bioabfall } = info.date[0];

        // Проверяем, если сегодня вывозится restabfall
        if (restabfall && restabfall.days.includes(todayDay)) {
          messageText = 'Сегодня вывозится мусор (restabfall)!';
        }
        
        // Проверяем, если сегодня вывозится altpapier
        if (altpapier && altpapier.days.includes(todayDay)) {
          messageText = 'Сегодня вывозится мусор (altpapier)!';
        }

        // Проверяем, если сегодня вывозится bioabfall
        if (bioabfall && bioabfall.days.includes(todayDay)) {
          messageText = 'Сегодня вывозится мусор (bioabfall)!';
        }
      }

      // Если есть сообщение, выводим его
      if (messageText) {
        setMessage(messageText);
      } else {
        setMessage('Сегодня мусор не вывозится.');
      }
    }
  };


  return (<div className={s.container}>
  
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="option">Выберите улицу:</label>
      <select {...register('option')}>
        <option value="">Выберите...</option>

        {/* Пример значений, можно сделать через список streets */}
        <option value="Mannheimer#43">Mannheimer Str 1 bis 67 und 2 bis 98</option>
        <option value="Пушкина#1">Пушкина</option>
      </select>

      <button type="submit">Отправить</button>

      {/* Отображаем сообщение, если оно есть */}
      {message && <p>{message}</p>}

      {/* Отображаем информацию об улице, если она найдена */}
    </form>
    
      {streetInfo && <DropDowninside {...streetInfo}/>
 
      }
    </div>
  );
}
