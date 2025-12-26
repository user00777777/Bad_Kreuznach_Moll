import { create } from 'zustand';
import getSchedules from './schedules/schedules';

// Вынесли массив с улицами в отдельную переменную
const initialStreets = [
  { 
    name: 'Mannheimer', 
    postalCode: '55545', 
    city: 'Bad Kreuznach', 
    date: getSchedules(), 
    range1: { start: 1, end: 67 }, // Диапазон 1
    range2: { start: 2, end: 98 }, // Диапазон 2
  },
  { 
    name: 'Пушкина', 
    postalCode: '654321', 
    city: 'Санкт-Петербург',
    date: getSchedules(),
    // Нет диапазонов для "Пушкина"
  },
];

const useStore = create((set, get) => ({
  streets: initialStreets, // Начальные данные о улицах

  addStreet: (newStreet) => set((state) => ({
    streets: [...state.streets, newStreet], // Добавляем новую улицу в массив
  })),

  // Функция для получения всей информации о улице
  show: (streetName, houseNumber) => {
    const street = get().streets.find((s) => s.name === streetName); // Находим улицу по имени
    if (street) {
      // Проверяем, входит ли номер дома в диапазон
      const isInRange = 
        (street.range1 && houseNumber >= street.range1.start && houseNumber <= street.range1.end) ||
        (street.range2 && houseNumber >= street.range2.start && houseNumber <= street.range2.end);
      
      if (isInRange) {
        return street; // Возвращаем всю информацию об улице
      }
    }
    return null; // Если не нашли улицу или диапазон не совпадает
  },
}));

export default useStore;
