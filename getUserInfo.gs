//ユーザー情報の処理
function getUserProfile(userId) {
  let url = 'https://api.line.me/v2/bot/profile/' + userId;
  let userProfile = UrlFetchApp.fetch(url, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  return JSON.parse(userProfile).displayName;
}

//ブロードキャストでメッセージを送る場合IDを管理しないから、ユーザー情報をNotionに保存する必要ない
//ユーザー名、ID取得
// function getIdAndName (event){
//   let userId = event.source.userId;
//   let nickname = getUserProfile(userId);
//   const lineIdWithName = [userId, nickname]

//   saveLineInfo(lineIdWithName)

//   return lineIdWithName
// }
