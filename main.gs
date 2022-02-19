//スクリプトプロパティを取得
const scriptProperties = PropertiesService.getScriptProperties();
scriptProperties.setProperties({
  CHTOKNE:'*******************',
  LINEID: ''*******************',',
  ITOKEN: ''*******************',',
  DATABASEID: ''*******************',
  URL: ''*******************',',
  YT_APIKEY: '*******************',
});

//LINE Info
const token = scriptProperties.getProperty('CHTOKNE'); //LINEチャンネルトークン
const lineID = scriptProperties.getProperty('LINEID'); //LINE ID
//LINE endpoint
const postuUrl = 'https://api.line.me/v2/bot/message/push';
const replyUrl = 'https://api.line.me/v2/bot/message/reply';


//Notion Info
const integrationToken = scriptProperties.getProperty('ITOKEN'); //Notion Integration Token
const databaseID = scriptProperties.getProperty('DATABASEID'); //DATABASE ID
const urlNotion = scriptProperties.getProperty('URL'); //url notion


//ユーザーにLINEのメッセージ送信(毎朝提定時に実行する処理)
function postToLine() {

  //youtubeから取得したデータ
  const youtubeData = getData()
  const postbackData = [youtubeData.snippet.thumbnails.high.url,"https://www.youtube.com/watch?v="+ youtubeData.id.videoId, youtubeData.snippet.title,youtubeData.snippet.channelTitle,Utilities.formatDate(new Date(youtubeData.snippet.publishedAt), "JST", "yyyy-MM-dd HH:mm:ss")]

  // const url = 'https://api.notion.com/v1/databases/' + databaseID + '/query';

  //payload:送るデータの詳細（ユーザー画面に表示されるもの）
  const payload = {
    to: lineID,
    messages: [
     {"type": "flex",
    "altText": "最新の動画が届きました！",
      "contents":{
        "type": "bubble",
        "hero": {
          "type": "image",
          "url": youtubeData.snippet.thumbnails.high.url,
          "size": "full",
          "aspectRatio": "20:13",
          "aspectMode": "cover",
          "action": {
            "type": "uri",
            "uri": "https://www.youtube.com/watch?v="+ youtubeData.id.videoId
          }
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": youtubeData.snippet.title,
              "weight": "bold",
              "size": "md"
            },
            {
              "type": "box",
              "layout": "baseline",
              "margin": "md",
              "contents": [
                {
                  "type": "text",
                  "text": youtubeData.snippet.channelTitle,
                  "size": "sm",
                  "color": "#999999",
                  "margin": "md",
                  "flex": 0
                }
              ]
            },
            {
              "type": "box",
              "layout": "vertical",
              "margin": "lg",
              "spacing": "sm",
              "contents": [
                {
                  "type": "box",
                  "layout": "baseline",
                  "spacing": "sm",
                  "contents": [
                    {
                      "type": "text",
                      "text": "投稿日",
                      "color": "#aaaaaa",
                      "size": "sm",
                      "flex": 1
                    },
                    {
                      "type": "text",
                      "text": Utilities.formatDate(new Date(youtubeData.snippet.publishedAt), "JST", "yyyy-MM-dd HH:mm:ss"),
                      "wrap": true,
                      "color": "#666666",
                      "size": "sm",
                      "flex": 5
                    }
                  ]
                }
              ]
            }
          ]
        },
        "footer": {
          "type": "box",
          "layout": "horizontal",
          "spacing": "sm",
          "contents": [
            {
              "type": "button",
              "style": "primary",
              "height": "sm",
              "action": {
                "type": "postback",
                "label": "保存",
                "data": postbackData[2],
                "displayText": "保存"
              }
            },
            {
              "type": "button",
              "style": "link",
              "height": "sm",
              "action": {
                "type": "postback",
                "label": "無視",
                "data": "無視",
                "displayText": "無視"
              }
            },
            {
              "type": "spacer"
            }
          ],
          "flex": 0,
          "action": {
            "type": "message",
            "label": "action",
            "text": "hello"
          }
        }
      }

      /////////////////////////////////////////////////////////////////////
     }
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

  UrlFetchApp.fetch(postuUrl, params);
}

function doPost(e){
  // レスポンス取得
  // const responseLine = e.postData.getDataAsString();
  var events = JSON.parse(e.postData.contents).events;

    events.forEach(function(event) {
    if(event.type == "follow") {
      follow(event);
    }else if(event.type == "message"){
      reply(event);
    }
 });

 // JSON形式に変換する
  // var saved = JSON.parse(responseLine).events[0].postback.data;
  // var replyToken = JSON.parse(responseLine).events[0].replyToken;

  // var userId = JSON.parse(responseLine).events[0].source.userId;

  var saved = events[0].postback.data;
  var replyToken = events[0].replyToken;

  var userId = events[0].source.userId;
  var nickname = getUserProfile(userId);


  //Notionに保存
  notion(saved)

  UrlFetchApp.fetch(replyUrl, {
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
        'method': 'POST',
        'payload': JSON.stringify({
      'replyToken': replyToken,
            "messages": [{
                "type": "text",
                "text":  nickname + 'のIDは' + userId
            }],
        }),
    });
}
function getUserProfile(userId){
  var url = 'https://api.line.me/v2/bot/profile/' + userId;
  var userProfile = UrlFetchApp.fetch(url,{
    'headers': {
      'Authorization' :  'Bearer ' + token,
    },
  })
  return JSON.parse(userProfile).displayName;
}

function follow(event) {
  let message = {
    "replyToken" : event.replyToken,
    "messages" : [{
        "type": "text",
        "text" : "フォローありがとうございます!"
      }]};
  let options = {
    "method" : "post",
    "headers" : {
      "Content-Type" : "application/json",
      "Authorization" : "Bearer " + token
    },
    "payload" : JSON.stringify(message)
  };
  UrlFetchApp.fetch(replyUrl,options)
}

function reply(event) {
  let message = {
    "replyToken" : event.replyToken,
    "messages" : [{
        "type": "text",
        "text" : "次の最新動画は明日の予定です！今日もジムに行ってしっかり鍛えて来て下さい！！"
      }]};
  let options = {
    "method" : "post",
    "headers" : {
      "Content-Type" : "application/json",
      "Authorization" : "Bearer " + token
    },
    "payload" : JSON.stringify(message)
  };
  UrlFetchApp.fetch(replyUrl,options)
}


/////////////////////////////////////////////////////////////////////////////////////////////////

// Notionにデータを保存
function notion(test) {
  const  headers = {
    'Content-Type' : 'application/json; charset=UTF-8',
    'Authorization': 'Bearer ' + integrationToken,
    'Notion-Version': '2021-08-16',
  };

  const  post_data = {
    'parent': {'database_id': databaseID},
    'properties': {
      'Name': {
        'title': [
          {
            'text': {
              'content': test,
            }
          }
        ]
      }
    }
  };

  const  options = {
    "method" : "post",
    "headers" : headers,
    "payload" : JSON.stringify(post_data)
  };

 return UrlFetchApp.fetch(urlNotion, options);

}



/////////////////////////////////////////////////////
// var line_endpoint = 'https://api.line.me/v2/bot/message/reply';
// //ポストで送られてくるので、送られてきたJSONをパース
// function doPost(e) {
//   var json = JSON.parse(e.postData.contents);
//   // var event = JSON.parse(e.postData.contents).events[0];
//   // if(event.type === 'postback'){
//   //         var data = JSON.parse(event.postback.data);
//   //         Logger.log(data)
//   //         // data.actionでポストバックの振り分け
//   //         // data.idを使って処理など

//   //     }

//   //返信するためのトークン取得
//   var reply_token= json.events[0].replyToken;
//   if (typeof reply_token === 'undefined') {
//     return;
//   }

//   //送られたメッセージ内容を取得
//   var message = json.events[0].message.text;
//   // メッセージを返信
//   UrlFetchApp.fetch(line_endpoint, {
//     'headers': {
//       'Content-Type': 'application/json; charset=UTF-8',
//       'Authorization': 'Bearer ' + token,
//     },
//     'method': 'post',
//     'payload': JSON.stringify({
//       'replyToken': reply_token,
//       'messages': [{
//         'type': 'text',
//         'text': message
//       }],
//     }),
//   });
//   return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
// }









/////////////////////////////////////////////////////////////////////////////////////////////////


// Notionのデータを取得
// function getNotionData() {
//   const today = new Date();
//   const formattedToday = Utilities.formatDate(today, 'JST', 'yyyy-MM-dd');
//   const query = {
//     filter: {
//       property: '日付',
//       date: {
//         equals: formattedToday,
//       },
//     },
//   };
//   const headers = {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${NOTION_API_KEY}`,
//     'Notion-Version': '2021-08-16',
//   };
//   const options = {
//     method: 'POST',
//     headers: headers,
//     payload: JSON.stringify(query),
//   };

//   const response = UrlFetchApp.fetch(NOTION_URL, options);
//   const json = JSON.parse(response.getContentText());
//   const results = json.results;

//   return results;
// }
