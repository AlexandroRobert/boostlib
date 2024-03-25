import { Color } from 'pixel_combats/basic'


// Библиотека для работы с цветами


// Конвертирует Hex строку в RGB, который будет приобразован в <see href="BASIC.COLOR">
// @param {string} Hex - строка хекса
// @return {BASIC.COLOR} - RGBA структура
export function HexToRGB(Hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(Hex);
  return (result
    ? new Color(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16), 0)
    : new Color(0, 0, 0, 0))
}