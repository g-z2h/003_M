//スクリプトプロパティを取得
const scriptProperties = PropertiesService.getScriptProperties();
scriptProperties.setProperties({
  CHTOKNE: '**********',
  LINEID: '**********',
});

const token = scriptProperties.getProperty('CHTOKNE'); //LINEチャンネルトークン
const lineID = scriptProperties.getProperty('LINEID'); //LINE ID

//LINEのメッセージ送信
function postToLine() {
  const url = 'https://api.line.me/v2/bot/message/push';
  const payload = {
    to: lineID,
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
