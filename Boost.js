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

// Создаёт новую зону с триггером и цветом
// @param {Object} Options - опции создания зоны
//    Все нужные параметры лежат в <see href="MAIN_OPTIONS">
// @return {Object} - зона, состовляющая из 2 частей: триггер, сервис отображения
export function CreateArea(Options) {
  const MAIN_OPTIONS = {
    // Состовляющая отображение
    view: {
      Enable: true, 
      Color: new BASIC.Color(0, 0, 0, 0)
    },
    // Состовляющая триггера
    trigger: {
      Enable: true, 
      Tags: ['default'], 
      Name: 'default', 
      OnEnter: function (p, a) {
        p.Ui.Hint.Value = `вы вошли в зону ${a.Name}`
      },
      OnExit: function (p, a) {
        p.Ui.Hint.Value = `вы вышли из зоны ${a.Name}`
      }
    }
  }
  
  const RESULT = Object.assign(Options, MAIN_OPTIONS)
  
  let trigger = API.AreaPlayerTriggerService.Get(RESULT.trigger.Name)
  trigger.Tags = RESULT.trigger.Tags
  trigger.Enable = RESULT.trigger.Enable
  trigger.OnEnter.Add(RESULT.trigger.OnEnter)
  trigger.OnExit.Add(RESULT.trigger.OnExit)
  
  let view = API.AreaViewService.GetContext().Get(RESULT.trigger.Name)
  view.Tags   = RESULT.trigger.Tags
  view.Enable = RESULT.view.Enable
  view.Color  = RESULT.view.Color
  
  return { trigger, view }
}

function generateId(str) {
  return `${str.length * 2}_${str[Math.floor(Math.random() * str.length)]}`
}