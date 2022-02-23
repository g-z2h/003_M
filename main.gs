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
const json = JSON.stringify(date) //ex). "2017-08-23T03:00:00.000Z"
const yesterday = JSON.parse(json) //ex).  2017-08-23T03:00:00.000Z (RFC 3339 形式の date-time 値)

//////////////////////////////////////////////////////////////////////////////////////////////////////////

//youtubeからデータ取ってくる
 function getDataVideos() {
  let url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=' + channelID  + '&q=肩トレ%7C胸トレ%7C背中トレ%7C脚トレ%7C腕トレ%7C筋トレ'+'&maxResults=1&order=date&type=video&key=' + test7YoutubeApikey
  let url2 = 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=' + channelID2  + '&q=肩トレ%7C胸トレ%7C背中トレ%7C脚トレ%7C腕トレ%7C筋トレ'+'&maxResults=1&order=date&type=video&key=' + test7YoutubeApikey
  let url3 = 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=' + channelID3  + '&q=肩トレ%7C胸トレ%7C背中トレ%7C脚トレ%7C腕トレ%7C筋トレ'+'&maxResults=1&order=date&type=video&key=' + test7YoutubeApikey
  let url4 = 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=' + channelID4  + '&q=肩トレ%7C胸トレ%7C背中トレ%7C脚トレ%7C腕トレ%7C筋トレ'+'&maxResults=1&order=date&type=video&key=' + test7YoutubeApikey
  let url5 = 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=' + channelID5  + '&q=肩トレ%7C胸トレ%7C背中トレ%7C脚トレ%7C腕トレ%7C筋トレ'+'&maxResults=1&order=date&type=video&key=' + test7YoutubeApikey

const URLS = [url, url2, url3, url4, url5]
const youtubeData = URLS.map(function(URL){
  // return JSON.parse(UrlFetchApp.fetch(URL).getContentText()).items
  let response = UrlFetchApp.fetch(URL);
  var responseJson = JSON.parse(response.getContentText());
  const youtubeData =  responseJson.items
  return youtubeData
})
   Logger.log(youtubeData) //[[], [], data, [], []]
   return youtubeData
}


 //youtube APIで取得したデータを格納 (youtubeData =  responseJson.items)
  // const youtubeData = getDataVideos()
  // let youtubeData = []
  // let youtubeData = getDataVideos().map(data =>{ data.length === 0 ?  '' : data[0]})//[{}, {}, {}, ...]

  // [[{}], [{}], [{}], [{}]]  =>  [{}, {}, {}, {}]
  let youtubeData = getDataVideos().map((data)=>data[0])

  //空配列を削除 [null, null,{}, null, null ] => [{}] 現段階では必ず動画を取得するからこの処理は必要ない
  youtubeData = youtubeData.filter(Boolean)
   Logger.log(youtubeData)

/////////////////////////////////////////////////////////////////
//データ参照場所
let postbackData = [] //[{}, {}, {}, ...]
for(let i = 0 ; i < youtubeData.length; i++ ){
postbackData.push(youtubeData[i])
}
Logger.log(postbackData)
//////////////////////////////////////////////////////////////////////////////////////////////////////////

//定時時刻処理
// function setTrigger() {
//  var setTime = new Date();
//   setTime.setDate(setTime.getDate() + 1)
//   setTime.setHours(7);
//   setTime.setMinutes(00);
//   ScriptApp.newTrigger('postToLine').timeBased().at(setTime).create();
// }

//ユーザーにLINEのメッセージ送信
function postToLine() {

  //定時時刻処理
  //  setTrigger();

  const payload = youtubeData.length > 0 ? (
  //payload:送るデータの詳細（ユーザー画面に表示されるもの）
    {
    to: lineID,
    messages: [
     {"type": "flex",
      "altText": "最新の動画が届きました！",
      contents: {
      type: "carousel",
      "contents":[
      ///////////////////////////////////////////////////////////////////////////////////////////////////#0
        {
        "type": "bubble",
        "hero": {
          "type": "image",
          "url": postbackData[0].snippet.thumbnails.high.url,
          "size": "full",
          "aspectRatio": "20:13",
          "aspectMode": "cover",
          "action": {
            "type": "uri",
            "uri": "https://www.youtube.com/watch?v="+ postbackData[0].id.videoId
          }
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": postbackData[0].snippet.title,
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
                  "text": postbackData[0].snippet.channelTitle,
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
                      "text": Utilities.formatDate(new Date(postbackData[0].snippet.publishedAt), "JST", "yyyy-MM-dd HH:mm:ss"),
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
                "data": postbackData[0].snippet.title + ' を保存しました！',
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
        }
      },
      ///////////////////////////////////////////////////////////////////////////////////////////////////#1
       {
        "type": "bubble",
        "hero": {
          "type": "image",
          "url": postbackData[1].snippet.thumbnails.high.url,
          "size": "full",
          "aspectRatio": "16:9",
          "aspectMode": "cover",
          "action": {
            "type": "uri",
            "uri": "https://www.youtube.com/watch?v="+ postbackData[1].id.videoId
          }
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": postbackData[1].snippet.title,
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
                  "text": postbackData[1].snippet.channelTitle,
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
                      "text": Utilities.formatDate(new Date(postbackData[1].snippet.publishedAt), "JST", "yyyy-MM-dd HH:mm:ss"),
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
                "data": postbackData[1].snippet.title + ' を保存しました！',
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
        }
      },
      ///////////////////////////////////////////////////////////////////////////////////////////////////#2
       {
        "type": "bubble",
        "hero": {
          "type": "image",
          "url": postbackData[2].snippet.thumbnails.high.url,
          "size": "full",
          "aspectRatio": "16:9",
          "aspectMode": "cover",
          "action": {
            "type": "uri",
            "uri": "https://www.youtube.com/watch?v="+ postbackData[2].id.videoId
          }
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": postbackData[2].snippet.title,
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
                  "text": postbackData[2].snippet.channelTitle,
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
                      "text": Utilities.formatDate(new Date(postbackData[2].snippet.publishedAt), "JST", "yyyy-MM-dd HH:mm:ss"),
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
                "data": postbackData[2].snippet.title + ' を保存しました！',
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
        }
      },
      ///////////////////////////////////////////////////////////////////////////////////////////////////#3
       {
        "type": "bubble",
        "hero": {
          "type": "image",
          "url": postbackData[3].snippet.thumbnails.high.url,
          "size": "full",
          "aspectRatio": "16:9",
          "aspectMode": "cover",
          "action": {
            "type": "uri",
            "uri": "https://www.youtube.com/watch?v="+ postbackData[3].id.videoId
          }
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": postbackData[3].snippet.title,
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
                  "text": postbackData[3].snippet.channelTitle,
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
                      "text": Utilities.formatDate(new Date(postbackData[3].snippet.publishedAt), "JST", "yyyy-MM-dd HH:mm:ss"),
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
                "data": postbackData[3].snippet.title + ' を保存しました！',
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
        }
      },
      ///////////////////////////////////////////////////////////////////////////////////////////////////#4
       {
        "type": "bubble",
        "hero": {
          "type": "image",
          "url": postbackData[4].snippet.thumbnails.high.url,
          "size": "full",
          "aspectRatio": "16:9",
          "aspectMode": "cover",
          "action": {
            "type": "uri",
            "uri": "https://www.youtube.com/watch?v="+ postbackData[4].id.videoId
          }
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": postbackData[4].snippet.title,
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
                  "text": postbackData[4].snippet.channelTitle,
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
                      "text": Utilities.formatDate(new Date(postbackData[4].snippet.publishedAt), "JST", "yyyy-MM-dd HH:mm:ss"),
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
                "data": postbackData[4].snippet.title + ' を保存しました！',
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
        }
      }
    ]
    } //contents
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////
     }
    ] //message
  }
  ):(
   //取得データが0の場合
    {
        to : lineID,
          "messages" : [
            {
              "type" : "text",
              "text" : "本日の最新動画はありません！"
            }
          ]
    }
  )


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
  let events = JSON.parse(e.postData.contents).events;

    events.forEach(function(event) {
    if(event.type == "follow") {
      follow(event);
    }else if(event.type == "message"){
      reply(event);
    }else if(event.type == "unfollow"){
    }
 });

  let reaction = events[0].postback.data;
  let replyToken = events[0].replyToken;

  if(reaction == '無視しました')  {
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
    if(reaction == postbackData[0].snippet.title + ' を保存しました！'){
 //Notion処理発火
  notion(postbackData[0])
    }else if(reaction == postbackData[1].snippet.title + ' を保存しました！'){
      //Notion処理発火
  notion(postbackData[1])
    }else if(reaction == postbackData[2].snippet.title + ' を保存しました！'){
      //Notion処理発火
  notion(postbackData[2])
    }else if(reaction == postbackData[3].snippet.title + ' を保存しました！'){
      //Notion処理発火
  notion(postbackData[3])
    }else if(reaction == postbackData[4].snippet.title + ' を保存しました！'){
      //Notion処理発火
  notion(postbackData[4])
    }


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
                "text":  reaction
            }],
        }),
    });
  }




}

//ユーザー情報の処理
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

  Logger.log(event)

  //ユーザーid, name取得
  // let userId = events[0].source.userId;
  // let nickname = getUserProfile(userId);


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


/////////////////////////////////////////////////////////////////////////////////////////////////

// Notionにデータを保存
function notion(postbackData) {
  const  headers = {
    'Content-Type' : 'application/json; charset=UTF-8',
    'Authorization': 'Bearer ' + integrationToken,
    'Notion-Version': '2021-08-16',
  };

    const  post_data = {
    'parent': {'database_id': databaseID},
    'properties': {
       '動画タイトル': {
          'title': [
          {
            'text': {
              'content': postbackData.snippet.title,
            }
          }
        ]
      },
        'チャンネル名': {
          "rich_text": [
          {
            'text': {
              'content': postbackData.snippet.channelTitle,
            }
          }
        ]
      },
        "URL":{
          "url":"https://www.youtube.com/watch?v="+ postbackData.id.videoId
        },
         '部位': {
          "multi_select": [
        {
          "name": postbackData.snippet.title.match(/腕/) ? '腕トレ' : ' '
        },
        {
          "name": postbackData.snippet.title.match(/胸/) ? '胸トレ' : ' '
        },
          {
          "name": postbackData.snippet.title.match(/背中/) ? '背中トレ' : ' '
        },
          {
          "name": postbackData.snippet.title.match(/脚/) ? '脚トレ' : ' '
        },
          {
          "name": postbackData.snippet.title.match(/肩/) ? '肩トレ' : ' '
        },
          {
          "name": postbackData.snippet.title.match(/筋トレ/) ? '筋トレ' : ' '
        },

      ]
        },
      "投稿日":{
        "date":{
          "start":Utilities.formatDate(new Date(postbackData.snippet.publishedAt), "JST", "yyyy-MM-dd HH:mm:ss"),
           "end":null
        }
      },
       "Files": {
          "type": "files",
          "files": [
            {
              "name": postbackData.snippet.thumbnails.high.url,
              "type": "external",
              "external": {
                "url": postbackData.snippet.thumbnails.high.url,
              }
            }
          ]
        },
     }
    }




  const  options = {
    "method" : "post",
    "headers" : headers,
    "payload" : JSON.stringify(post_data)
  };

 return UrlFetchApp.fetch(urlNotion, options);
}
