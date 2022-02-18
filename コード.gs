//スクリプトプロパティを取得
const scriptProperties = PropertiesService.getScriptProperties();
scriptProperties.setProperties({
  CHTOKNE:
    'Fzq/D3lh2PPaauIWpNw206PC71eNysw6CoDypcS7lGUQhaHH/ybl3P5n3cSLIYF5WJqQFvdPnwgbsr5SPcMc9HEnjQdRCJ8puN5giVwtGU4y40/7phAIZogIZUqerqnngHfJORNyEA3j6J5rqoe26QdB04t89/1O/w1cDnyilFU=',
  LINEID: 'U15b24b97bdd98739f512c72a30e8ad65',
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
