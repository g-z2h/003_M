// 定時時刻処理
function setTrigger() {
  var setTime = new Date();
  setTime.setDate(setTime.getDate() + 1);
  setTime.setHours(7);
  setTime.setMinutes(00);
  ScriptApp.newTrigger('everyPost').timeBased().at(setTime).create();
}
