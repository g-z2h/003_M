//返信処理
function doPost(e) {
  let youtubeData = getDataVideos().map((data) => data[0]);
  //空配列を削除 [null, null,{}, null, {} ] => [{}, {}] の形にする。
  youtubeData = youtubeData.filter(Boolean);
  let postbackData = []; //[{}, {}, {}, ...]
  for (let i = 0; i < youtubeData.length; i++) {
    postbackData.push(youtubeData[i]);
  }
  // レスポンス取得
  let events = JSON.parse(e.postData.contents).events;

  events.forEach(function (event) {
    if (event.type == 'follow') {
      follow(event);
      getIdAndName(event);
    } else if (event.type == 'message') {
      reply(event);
    } else if (event.type == 'unfollow') {
    }
  });

  let reaction = events[0].postback.data;
  let replyToken = events[0].replyToken;

  if (reaction == '無視しました') {
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
            text: '無視しました！',
          },
        ],
      }),
    });
    return;
  } else {
    if (reaction == postbackData[0].snippet.title + ' を保存しました！') {
      //Notion処理発火
      notion(postbackData[0]);
    } else if (
      reaction ==
      postbackData[1].snippet.title + ' を保存しました！'
    ) {
      //Notion処理発火
      notion(postbackData[1]);
    } else if (
      reaction ==
      postbackData[2].snippet.title + ' を保存しました！'
    ) {
      //Notion処理発火
      notion(postbackData[2]);
    } else if (
      reaction ==
      postbackData[3].snippet.title + ' を保存しました！'
    ) {
      //Notion処理発火
      notion(postbackData[3]);
    } else if (
      reaction ==
      postbackData[4].snippet.title + ' を保存しました！'
    ) {
      //Notion処理発火
      notion(postbackData[4]);
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

//ユーザーからのメッセージ返信処理
function reply(event) {
  let message = {
    replyToken: event.replyToken,
    messages: [
      {
        type: 'text',
        text: '次の最新動画は明日の予定です！今日もジムに行ってしっかり鍛えて来て下さい！！',
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
