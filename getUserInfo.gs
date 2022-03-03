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
