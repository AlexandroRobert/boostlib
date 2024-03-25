import * as API from 'pixel_combats/room'
import * as BASIC from 'pixel_combats/basic'

// TODO: сделать вставку с библиотекой цветов в основном файле
// import * as COLORLIB from './ColorLib.js'


// Библиотека украшающая работу с API и JavaScript в режимах
// copyright © Mak | MakCompany


// Вернёт UnityMarcup строку исходя от входных параметров
// Не следует писать тегов внутри параметров, выносите за параметры форматированием строк
// @param {string} Text - Входной текст для старта форматирования
// @return {string} - Отформатированный текст в виде UnityMarcup тегов
export function TextView(Text) {
  let newText = ''
  
  Text.split('').forEach(i => {
    if (i === i.toUpperCase()) newText += `<size=38>${i}</size>`
    else newText += `<size=30>${i}</size>`
  })
  
  return newText
}

// Создаёт таймер который будет выполнен 1 раз
// @param {float} Tick - время до выполнения callback внутри таймера
// @param {callback} Callback - функция для выполнения
// @return {API.ITimer} - созданный таймер
export function SetTimeout(Tick, Callback) {
  const TIMER = API.Timers.GetContext().Get(generateId(Callback))
  TIMER.OnTimer.Add(Callback)
  if (Tick >= 0) TIMER.Restart(Tick)
  return TIMER
}

// Аналогично функции <see href='SetTimeout'> только выполняется бесконечно
// Можно остановить методом Stop
export function SetInterval(Tick, Callback) {
  const TIMER = SetTimeout(-1, Callback)
  Timer.RestartLoop(Tick)
  return TIMER
}