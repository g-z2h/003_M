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
        text: '☆使い方☆\n1. すぐ見たい場合は【サムネ】をクリック👀\n2. 気に入った動画があれば【保存】をクリック🏋️‍♀️ \n3. 保存した動画一覧が見るには【Notion】をクリック📚 ',
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
