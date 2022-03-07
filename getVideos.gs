scriptProperties.setProperties({
  //youTube
  YT_APIKEY: '**************',
  YT_APIKEY2: '**************',
  YT_APIKEY3: '**************',
  YT_APIKEY4: '**************',
  YT_APIKEY5: '**************',
  YT_APIKEY7: '**************',
  YT_APIKEY10: '**************',
});

function apiKeyList() {
  return {
    youtubeApikey: scriptProperties.getProperty('YT_APIKEY'), //youtube api key
    youtubeApikey2: scriptProperties.getProperty('YT_APIKEY2'), //youtube api key2
    youtubeApikey3: scriptProperties.getProperty('YT_APIKEY3'), //youtube api key3
    youtubeApikey4: scriptProperties.getProperty('YT_APIKEY4'), //youtube api key4
    youtubeApikey5: scriptProperties.getProperty('YT_APIKEY5'), //youtube api key5
    youtubeApikey7: scriptProperties.getProperty('YT_APIKEY7'), //youtube api key7
    youtubeApikey10: scriptProperties.getProperty('YT_APIKEY10'), //youtube api key10
  };
}

function chanelId() {
  return {
    channelID: 'UCb-YblEIoA8fdgfVhgG4tBA', //  yokokawa chanel
    channelID2: 'UCdSPo9Iefw1REMBTPqm7DwQ', //  bighide chanel
    channelID3: 'UCnRd_MInrP6BhdSFJVY710A', //  arm hero chanel
    channelID4: 'UC7F_CLFtxDetmUnORgmwImg', //  yamamoto chanel
    channelID5: 'UCo2kwWSpTUbbus7syigi0Jg', //  terashima chanel
  };
}

//youtubeからデータ取ってくる
function getDataVideos() {
  const { yesterday } = getYesterday();
  const {
    youtubeApikey,
    youtubeApikey2,
    youtubeApikey3,
    youtubeApikey4,
    youtubeApikey5,
    youtubeApikey7,
    youtubeApikey10,
  } = apiKeyList();
  const { channelID, channelID2, channelID3, channelID4, channelID5 } =
    chanelId();

  const endpoint =
    'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=';
  const query = '&q=肩トレ%7C胸トレ%7C背中トレ%7C脚トレ%7C腕トレ';
  const other = '&maxResults=1&order=date&publishedAfter=' + yesterday; //本番用
  // const other = '&maxResults=1&order=date&' //１つ以上取得するため(開発用)
  const key = '&type=video&key=';

  try {
    //url
    const url1 = endpoint + channelID + query + other + key + youtubeApikey;
    const url2 = endpoint + channelID2 + query + other + key + youtubeApikey;
    const url3 = endpoint + channelID3 + query + other + key + youtubeApikey2;
    const url4 = endpoint + channelID4 + query + other + key + youtubeApikey4;
    const url5 = endpoint + channelID5 + query + other + key + youtubeApikey5;

    const urls = [url1, url2, url3, url4, url5];
    const youtubeData = urls.map(function (url) {
      const response = UrlFetchApp.fetch(url);
      const responseJson = JSON.parse(response.getContentText());
      const youtubeData = responseJson.items;
      return youtubeData;
    });
    Logger.log(youtubeData); //[[], [], data, [], data]
    let youtubeDataArray = youtubeData.map((data) => data[0]); //[[{}], [{}]] => [{}, {}]
    //空配列を削除 [null, null,{}, null, {} ] => [{}, {}] の形にする。
    const postbackData = youtubeDataArray.filter(Boolean);

    return postbackData;
  } catch (error) {
    //url
    const url1 = endpoint + channelID + query + other + key + youtubeApikey3;
    const url2 = endpoint + channelID2 + query + other + key + youtubeApikey7;
    const url3 = endpoint + channelID2 + query + other + key + youtubeApikey7;
    const url4 = endpoint + channelID2 + query + other + key + youtubeApikey10;
    const url5 = endpoint + channelID2 + query + other + key + youtubeApikey10;

    const urls = [url1, url2, url3, url4, url5];
    const youtubeData = urls.map(function (url) {
      const response = UrlFetchApp.fetch(url);
      const responseJson = JSON.parse(response.getContentText());
      const youtubeData = responseJson.items;
      Logger.log(error);
      return youtubeData;
    });
    Logger.log(youtubeData); //[[], [], data, [], data]
    let youtubeDataArray = youtubeData.map((data) => data[0]); //[[{}], [{}]] => [{}, {}]
    //空配列を削除 [null, null,{}, null, {} ] => [{}, {}] の形にする。
    const postbackData = youtubeDataArray.filter(Boolean);

    return postbackData;
  }
}
