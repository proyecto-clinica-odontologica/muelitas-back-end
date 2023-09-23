export const obtenerTiempo = () => {
  const fechaHoraActual = new Date();
  const dia = fechaHoraActual.getDate();
  const mes = fechaHoraActual.getMonth() + 1; // Los meses comienzan desde 0
  const año = fechaHoraActual.getFullYear();
  const horas = pad(fechaHoraActual.getHours());
  const minutos = pad(fechaHoraActual.getMinutes());
  const segundos = pad(fechaHoraActual.getSeconds());

  const fechaHoraFormateada =
    horas + ':' + minutos + ':' + segundos + ' ' + dia + '/' + mes + '/' + año;
  return fechaHoraFormateada;
};

const pad = (digit: number): string => {
  return (digit < 10 ? '0' : '') + digit;
};
