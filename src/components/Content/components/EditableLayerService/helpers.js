export function setLocalisationDraw(drawLocalVar) {
  drawLocalVar.draw.toolbar.actions = {
    title: 'Отменить добавление',
    text: 'Отменить'
  };
  drawLocalVar.draw.toolbar.finish = {
    title: 'Завершить добавление',
    text: 'Завершить'
  };
  drawLocalVar.draw.toolbar.undo = {
    title: 'Удалить последнюю установленную точку',
    text: 'Удалить последнюю точку'
  };
  drawLocalVar.draw.toolbar.buttons.polygon = 'Добавить новый кадастровый участок';
  drawLocalVar.draw.handlers.polygon.tooltip = {
    start: 'Для добавления границ нового участка кликните на карте',
    cont: 'Для продолжения добавления границ нового участка кликните на карте',
    end: 'Для завершения границ нового участка кликните на первую установленную точку'
  };
  drawLocalVar.edit.toolbar.actions.save = {
    title: 'Сохранить изменения границ участков',
    text: 'Сохранить'
  };
  drawLocalVar.edit.toolbar.actions.cancel = {
    title: 'Отменить изменения границ участков',
    text: 'Отменить'
  };
  drawLocalVar.edit.toolbar.buttons = {
    edit: 'Изменить границы участков',
    editDisabled: 'Нет участков на карте',
    remove: 'Удалить участок',
    removeDisabled: 'Нет участков на карте'
  };
  drawLocalVar.edit.handlers.edit.tooltip = {
    text: 'Удерживайте и перетащите точку на границах участка',
    subtext: 'Нажните "Отменить" для сброса изменений'
  };
  drawLocalVar.edit.handlers.remove.tooltip = {
    text: 'Кликните по области участка для его удаления'
  };
}
