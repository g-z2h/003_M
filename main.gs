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


//YouTube Info
const youtubeApikey = scriptProperties.getProperty('YT_APIKEY') //youtube api key
const channelID = "UCb-YblEIoA8fdgfVhgG4tBA"; // sample yokokawa
const baseUrl = "https://www.googleapis.com/youtube/v3/";

//////////////////////////////////////////////////////////////////////////////////////////////////////////

//今日の日時取得
let date = new Date();
let day = date.getDate();

//昨日の日付を取得
date.setDate(day-1);
const json = JSON.stringify(date) // ex). "2017-08-23T03:00:00.000Z"
const yesterday = JSON.parse(json) // ex).  2017-08-23T03:00:00.000Z (RFC 3339 形式の date-time 値)

//////////////////////////////////////////////////////////////////////////////////////////////////////////

//youtubeからデータ取ってくる
 function getDataVideos() {
  // let url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=' + channelID + '&q=筋トレ'+'&maxResults=2&order=date&type=video&key=' + youtubeApikey
  let url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId='  + '&q=筋トレ'+'&maxResults=2&order=date&publishedAfter=' + yesterday + '&type=video&key=' + youtubeApikey

  let response = UrlFetchApp.fetch(url);
  var responseJson = JSON.parse(response.getContentText());

   const youtubeData =  responseJson.items
   Logger.log(youtubeData)
   return youtubeData
}

 //youtube APIで取得したデータを格納 (youtubeData =  responseJson.items)
  const youtubeData = getDataVideos()


  const postbackData = [
  youtubeData[0].snippet.thumbnails.high.url,
  "https://www.youtube.com/watch?v="+ youtubeData[0].id.videoId,
  youtubeData[0].snippet.title,
  youtubeData[0].snippet.channelTitle,
  Utilities.formatDate(new Date(youtubeData[0].snippet.publishedAt), "JST", "yyyy-MM-dd"),

  youtubeData[0].snippet.title.match(/筋トレ/) ? '筋トレ（仮）' : ' '
  ]
//////////////////////////////////////////////////////////////////////////////////////////////////////////


//ユーザーにLINEのメッセージ送信
function postToLine() {


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
          "url": youtubeData[0].snippet.thumbnails.high.url,
          "size": "full",
          "aspectRatio": "20:13",
          "aspectMode": "cover",
          "action": {
            "type": "uri",
            "uri": "https://www.youtube.com/watch?v="+ youtubeData[0].id.videoId
          }
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": youtubeData[0].snippet.title,
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
                  "text": youtubeData[0].snippet.channelTitle,
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
                      "text": Utilities.formatDate(new Date(youtubeData[0].snippet.publishedAt), "JST", "yyyy-MM-dd HH:mm:ss"),
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
              "color": "#64b8fc",
              "height": "sm",
              "action": {
                "type": "postback",
                "label": "保存",
                "data": '保存しました',
                "displayText": " "
              }
            },
            {
              "type": "button",
              "style": "link",
              "height": "sm",
              "action": {
                "type": "postback",
                "label": "無視",
                "data": "無視しました",
                "displayText": " "
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

//返信処理
function doPost(e){
  // レスポンス取得
  // const responseLine = e.postData.getDataAsString();
  let events = JSON.parse(e.postData.contents).events;


    events.forEach(function(event) {
    if(event.type == "follow") {
      follow(event);
    }else if(event.type == "message"){
      reply(event);
    }
 });

  let saved = events[0].postback.data; //postToLineのdata ここに配列を入れたい
  let replyToken = events[0].replyToken;

  if(saved == '無視しました')  {
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
                "text":  '無視しました！'
            }],
        }),
    })
    return
  }else{


 //Notionに保存
  notion(postbackData)

  //ユーザーid, name取得
  let userId = events[0].source.userId;
  let nickname = getUserProfile(userId);


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
                "text":  '保存しました！'
            }],
        }),
    });
  }
}

//ユーザー情報の取得（今は使用していない）
function getUserProfile(userId){
  let url = 'https://api.line.me/v2/bot/profile/' + userId;
  let userProfile = UrlFetchApp.fetch(url,{
    'headers': {
      'Authorization' :  'Bearer ' + token,
    },
  })
  return JSON.parse(userProfile).displayName;
}

//友達追加されたときの処理
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

//ユーザーからのメッセージ返信処理
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

// Notionにデータを保存
function notion(array) {
  const  headers = {
    'Content-Type' : 'application/json; charset=UTF-8',
    'Authorization': 'Bearer ' + integrationToken,
    'Notion-Version': '2021-05-13',
  };

  const  post_data = {
    'parent': {'database_id': databaseID},
    'properties': {
       '動画タイトル': {
          'title': [
          {
            'text': {
              'content': postbackData[2],
            }
          }
        ]
      },
        'チャンネル名': {
          "rich_text": [
          {
            'text': {
              'content': postbackData[3],
            }
          }
        ]
      },
      "URL":{
        "url":postbackData[1]
      },
       '部位': {
        "multi_select": [
      {
        "name": postbackData[5]
      },
      {
        "name": "胸"
      }
    ]
      },
      "投稿日":{
        "date":{
          "start":postbackData[4],
           "end":null
      },
    //   "サムネイル":{
    //    "files": [
    //   {
    //     "type": "external",
    //     "name": "Space Wallpaper",
    //     "external": "https://website.domain/images/space.png"
    //   }
    // ]
    // }
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
