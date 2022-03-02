//友達追加されたときの処理
function follow(event, youtubedata) {
  // ユーザーid, name取得`
  let userId = event.source.userId;
  let nickname = getUserProfile(userId);

  let message = {
    replyToken: event.replyToken,
    messages: [
      {
        type: 'text',
        text:
          nickname +
          'さんフォローありがとうございます! 明日から毎朝7時に最新トレーニング動画を配信します！',
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

  postToLine(userId, youtubedata);

  const gotIdAndName = [userId, nickname];
  //notionへ保存
  saveLineInfo(gotIdAndName);
}
