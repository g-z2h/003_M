// scriptProperties.setProperties({
//   //LINE
//     'CHTOKNE': '***************',
//   });
// //LINE Info
// const token = scriptProperties.getProperty('CHTOKNE') //LINEチャンネルトークン
// //LINE endpoint
// const broadcastUrl = 'https://api.line.me/v2/bot/message/broadcast';

// //ユーザーにLINEのメッセージ送信（定時）
// function everyPost() {

//   // 定時時刻処理
//    setTrigger();

//   //youtubeデータ取得
//   const gotYoutubeData = getDataVideos()

//   const lineRoop = () => {
//   const data = gotYoutubeData.map(d => linePost(d))
//   return data
//   }

//   const linePost = (data) => {

//     return {
//         "type": "bubble",
//         "hero": {
//           "type": "image",
//           "url": data.snippet.thumbnails.high.url,
//           "size": "full",
//           "aspectRatio": "20:13",
//           "aspectMode": "cover",
//           "action": {
//             "type": "uri",
//             "uri": "https://www.youtube.com/watch?v="+ data.id.videoId
//           }
//         },
//         "body": {
//           "type": "box",
//           "layout": "vertical",
//           "contents": [
//             {
//               "type": "text",
//               "text": data.snippet.title,
//               "weight": "bold",
//               "size": "md"
//             },
//             {
//               "type": "box",
//               "layout": "baseline",
//               "margin": "md",
//               "contents": [
//                 {
//                   "type": "text",
//                   "text": data.snippet.channelTitle,
//                   "size": "sm",
//                   "color": "#999999",
//                   "margin": "md",
//                   "flex": 0
//                 }
//               ]
//             },
//             {
//               "type": "box",
//               "layout": "vertical",
//               "margin": "lg",
//               "spacing": "sm",
//               "contents": [
//                 {
//                   "type": "box",
//                   "layout": "baseline",
//                   "spacing": "sm",
//                   "contents": [
//                     {
//                       "type": "text",
//                       "text": "投稿日",
//                       "color": "#aaaaaa",
//                       "size": "sm",
//                       "flex": 1
//                     },
//                     {
//                       "type": "text",
//                       "text": Utilities.formatDate(new Date(data.snippet.publishedAt), "JST", "yyyy-MM-dd HH:mm:ss"),
//                       "wrap": true,
//                       "color": "#666666",
//                       "size": "sm",
//                       "flex": 5
//                     }
//                   ]
//                 }
//               ]
//             }
//           ]
//         },
//         "footer": {
//           "type": "box",
//           "layout": "horizontal",
//           "spacing": "sm",
//           "contents": [
//             {
//               "type": "button",
//               "style": "primary",
//               "color": "#64b8fc",
//               "height": "sm",
//               "action": {
//                 "type": "postback",
//                 "label": "保存",
//                 "data": data.snippet.title + ' を保存しました！',
//                 "displayText": " "
//               }
//             },
//             {
//               "type": "button",
//               "style": "link",
//               "height": "sm",
//               "action": {
//                 "type": "postback",
//                 "label": "無視",
//                 "data": "無視しました",
//                 "displayText": " "
//               }
//             },
//             {
//               "type": "spacer"
//             }
//           ],
//         }
//     }
//   }
//   const post = lineRoop()

//   const payload = gotYoutubeData.length > 0 ? (
//   //payload:送るデータの詳細（ユーザー画面に表示されるもの）
//     {
//     // to: userLineID,（この情報は不要）
//     messages: [
//        {"type": "flex",
//         "altText": "最新の動画が届きました！",
//         contents: {
//         type: "carousel",
//       "contents":post
//        }
//       }
//     ]
//     }
//   ):(
//    //取得データが0の場合
//     {
//         // to : userLineID,（この情報は不要）
//           "messages" : [
//             {
//               "type" : "text",
//               "text" : "本日の最新動画はありません！明日の最新動画の配信をお待ち下さい！"
//             }
//           ]
//     }
//   )
//   const params = {
//     method: 'post',
//     contentType: 'application/json',
//     headers: {
//       Authorization: 'Bearer ' + token
//     },
//     payload: JSON.stringify(payload)
//   };

//   UrlFetchApp.fetch(broadcastUrl, params);
// }
