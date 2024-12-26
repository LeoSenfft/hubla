export const getBrazilTime = (date: Date) => {
  const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;
  const offset = 3 * 60 * 60 * 1000; // 3 horas
  return new Date(utcTime - offset);
};
