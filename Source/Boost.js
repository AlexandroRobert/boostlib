import * as API from 'pixel_combats/room'
import * as BASIC from 'pixel_combats/basic'

// TODO: uncomment && test
// const ColorsLibrary = await import('./ColorLib.js')


// Библиотека украшающая работу с API и JavaScript в режимах
// copyright © Mak | MakCompany


function generateId(str) {
  return `${str.length * 2}_${str.trim()[Math.floor(Math.random() * str.trim().length)]}${Math.floor(Math.random() * 10000)}`
}

// Вернёт UnityMarcup строку исходя от входных параметров
// Не следует писать тегов внутри параметров, выносите за параметры форматированием строк
// @param {string} Text - Входной текст для старта форматирования
// @return {string} - Отформатированный текст в виде UnityMarcup тегов
export function TextView(text) {
  let newText = ''
  
  text.split('').forEach(i => {
    if (i === i.toUpperCase()) newText += `<size=38>${i}</size>`
    else newText += `<size=30>${i}</size>`
  })
  
  return newText
}

// Создаёт таймер который будет выполнен 1 раз
// @param {float} tick - время до выполнения callback внутри таймера
// @param {callback} callback - функция для выполнения
// @return {API.ITimer} - созданный таймер
export function SetTimeout(tick, callback) {
  const timer = API.Timers.GetContext().Get(generateId(callback))
  timer.OnTimer.Add(callback)
  if (tick >= 0) timer.Restart(tick)
  return timer
}

// Аналогично функции <see href='SetTimeout'> только выполняется бесконечно
// Можно остановить методом Stop
export function SetInterval(tick, callback) {
  const timer = SetTimeout(-1, callback)
  timer.RestartLoop(tick)
  return timer
}

// Создаёт новую зону с триггером и цветом
// @param {Object} options - опции создания зоны
//    Все нужные параметры лежат в <see href="main_options">
// @return {Object} - зона, состовляющая из 2 частей: триггер, сервис отображения
export function CreateArea(options) {
  const mainOptions = {
    // Состовляющая отображение
    view: {
      Enable: true, Color: new BASIC.Color(0, 0, 0, 0)},
    // Состовляющая триггера
    trigger: {
      Enable: true, Tags: ['default'], Name: 'default', 
      OnEnter: function (p, a) { p.Ui.Hint.Value = `вы вошли в зону ${a.Name}` },
      OnExit: function (p, a)  { p.Ui.Hint.Value = `вы вышли из зоны ${a.Name}` }}
  }
  
  const result = Object.assign(options, mainOptions), 
    { view: viewT, trigger: triggerT } = result
  let trigger = API.AreaPlayerTriggerService.Get(result.trigger.Name),
    view = API.AreaViewService.GetContext().Get(result.trigger.Name)
  
  trigger.Enable = triggerT.Enable
  view.Enable = viewT.Enable
  view.Tags = triggerT.Tags
  trigger.Tags = triggerT.Tags
  
  trigger.OnEnter.Add(triggerT.OnEnter)
  trigger.OnExit.Add(triggerT.OnExit)
  
  view.Color = viewT.Color

  // вернём объект, в виде триггера и виазулизатора
  return { trigger, view }
}

// Создаёт и возвращает команду
// @param {string} id - айди команды
// @param {string} name - имя команды
// @param {BASIC.IColor} color - цвет команды
// @param {int} spawns - спавнпоинты
// @param {string} build - блоксет
// @return {API.ITeam} команда
export function CreateTeam(id, name, color, spawns, build) {
  const team = API.Teams.Get(id)
  API.Teams.Add(id, name, color)
  team.Spawns.SpawnPointsGroups.Add(spawns)
  team.Build.BlocksSet.Value = API.BuildBlocksSet[build]
  return team
}