//end point
const replyUrl = 'https://api.line.me/v2/bot/message/reply';

//返信処理
function doPost(e) {
  // レスポンス取得
  let events = JSON.parse(e.postData.contents).events;

  events.forEach(function (event) {
    if (event.type == 'follow') {
      const youtubedata = getDataVideos();
      follow(event, youtubedata);
      // getIdAndName(event)
    } else if (event.type == 'message') {
      reply(event);
    } else if (event.type == 'postback') {
      let reaction = events[0].postback.data;
      let replyToken = events[0].replyToken;

      if (reaction) {
        let userId = event.source.userId;
        let nickname = getUserProfile(userId);
        const gotIdAndName = [userId, nickname];

        const postbackData = getDataVideos();
        //Notion処理発火
        if (reaction == postbackData[0].snippet.title + ' を保存しました！') {
          notion(postbackData[0], gotIdAndName);
        } else if (
          reaction ==
          postbackData[1].snippet.title + ' を保存しました！'
        ) {
          //Notion処理発火
          notion(postbackData[1], gotIdAndName);
        } else if (
          reaction ==
          postbackData[2].snippet.title + ' を保存しました！'
        ) {
          //Notion処理発火
          notion(postbackData[2], gotIdAndName);
        } else if (
          reaction ==
          postbackData[3].snippet.title + ' を保存しました！'
        ) {
          //Notion処理発火
          notion(postbackData[3], gotIdAndName);
        } else if (
          reaction ==
          postbackData[4].snippet.title + ' を保存しました！'
        ) {
          //Notion処理発火
          notion(postbackData[4], gotIdAndName);
        }

        UrlFetchApp.fetch(replyUrl, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
          method: 'POST',
          payload: JSON.stringify({
            replyToken: replyToken,
            messages: [
              {
                type: 'text',
                text: reaction,
              },
            ],
          }),
        });
      }
    }
  });
}

//ユーザーからのメッセージ返信処理
function reply(event) {
  let message = {
    replyToken: event.replyToken,
    messages: [
      {
        type: 'text',
        text: '次の最新動画は明日の予定です！\n今日もジムに行ってしっかり鍛えて来て下さいね🏃‍♂️🏃‍♂️',
      },
    ],
  };
  let options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    payload: JSON.stringify(message),
  };
  UrlFetchApp.fetch(replyUrl, options);
}
