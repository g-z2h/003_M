//LINEのメッセージ送信
function sendMessage() {
  const url = 'https://api.line.me/v2/bot/message/push';

  //スクリプトプロパティで「CHTOKEN」キーに値を格納する
  //チャネルアクセストークン
  PropertiesService.getScriptProperties().setProperty(
    'CHTOKNE',
    '＊＊＊＊＊＊＊＊＊＊＊＊'
  );
  const token = PropertiesService.getScriptProperties().getProperty('CHTOKNE');

  const payload = {
    to: ' ＊＊＊＊＊＊＊＊＊＊＊＊', //LINE ユーザーID
    messages: [{ type: 'text', text: 'message' }],
  };

  const params = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + token,
    },
    payload: JSON.stringify(payload),
  };

  UrlFetchApp.fetch(url, params);
}
