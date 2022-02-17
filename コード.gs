//LINEのメッセージ送信
function sendMessage() {
  const url = 'https://api.line.me/v2/bot/message/push';

//スクリプトプロパティで「CHTOKEN」キーに値を格納する
//チャネルアクセストークン
PropertiesService.getScriptProperties().setProperty("CHTOKNE", "Fzq/D3lh2PPaauIWpNw206PC71eNysw6CoDypcS7lGUQhaHH/ybl3P5n3cSLIYF5WJqQFvdPnwgbsr5SPcMc9HEnjQdRCJ8puN5giVwtGU4y40/7phAIZogIZUqerqnngHfJORNyEA3j6J5rqoe26QdB04t89/1O/w1cDnyilFU=");
const token = PropertiesService.getScriptProperties().getProperty("CHTOKNE")


  const payload = {
    to: ' U15b24b97bdd98739f512c72a30e8ad65',//LINE ユーザーID
    messages: [
      { type: 'text', text: 'message' }
    ]
  };

  const params = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + token
    },
    payload: JSON.stringify(payload)
  };

  UrlFetchApp.fetch(url, params);
}




