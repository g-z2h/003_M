//スクリプトプロパティを取得
// const scriptProperties = PropertiesService.getScriptProperties();
scriptProperties.setProperties({
  //youTube
  YT_APIKEY: '**********************',
  TEST2_YT_APIKEY: '**********************',
  TEST3_YT_APIKEY: '**********************',
  TEST4_YT_APIKEY: '**********************',
  TEST5_YT_APIKEY: '**********************',
  TEST6_YT_APIKEY: '**********************',
  TEST7_YT_APIKEY: '**********************',
  TEST8_YT_APIKEY: '**********************',
  TEST9_YT_APIKEY: '**********************',
  TEST10_YT_APIKEY: '**********************',
});
function apiKeyList() {
  return {
    youtubeApikey: scriptProperties.getProperty('YT_APIKEY'), //youtube api key
    test2YoutubeApikey: scriptProperties.getProperty('TEST2_YT_APIKEY'), //youtube api key TEST2
    test3YoutubeApikey: scriptProperties.getProperty('TEST3_YT_APIKEY'), //youtube api key TEST3
    test4YoutubeApikey: scriptProperties.getProperty('TEST4_YT_APIKEY'), //youtube api key TEST4
    test5YoutubeApikey: scriptProperties.getProperty('TEST5_YT_APIKEY'), //youtube api key TEST5
    test7YoutubeApikey: scriptProperties.getProperty('TEST7_YT_APIKEY'), //youtube api key TEST7
    test10YoutubeApikey: scriptProperties.getProperty('TEST10_YT_APIKEY'), //youtube api key TEST10
  };
}

function chanelId() {
  return {
    channelID: 'UCb-YblEIoA8fdgfVhgG4tBA', // sample1 yokokawa
    channelID2: 'UCdSPo9Iefw1REMBTPqm7DwQ', // sample2 bighide
    channelID3: 'UCnRd_MInrP6BhdSFJVY710A', // sample3 arm hero
    channelID4: 'UC7F_CLFtxDetmUnORgmwImg', // sample4 yamamoto
    channelID5: 'UCo2kwWSpTUbbus7syigi0Jg', // sample5 terashima
  };
}

//youtubeからデータ取ってくる
function getDataVideos() {
  const { yesterday } = getYesterday();
  const {
    youtubeApikey,
    test2YoutubeApikey,
    test3YoutubeApikey,
    test4YoutubeApikey,
    test7YoutubeApikey,
    test10YoutubeApikey,
  } = apiKeyList();
  const { channelID, channelID2, channelID3, channelID4, channelID5 } =
    chanelId();

  const endpoint =
    'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=';
  const query = '&q=肩トレ%7C胸トレ%7C背中トレ%7C脚トレ%7C腕トレ%7C筋トレ';
  //  const other = '&maxResults=1&order=date&publishedAfter=' + yesterday //本番用
  const other = '&maxResults=1&order=date&'; //１つ以上取得するため(開発用)
  const key = '&type=video&key=';

  try {
    //url
    const url1 = endpoint + channelID + query + other + key + youtubeApikey;
    const url2 = endpoint + channelID2 + query + other + key + youtubeApikey;
    const url3 =
      endpoint + channelID3 + query + other + key + test2YoutubeApikey;
    const url4 =
      endpoint + channelID4 + query + other + key + test4YoutubeApikey;
    const url5 =
      endpoint + channelID5 + query + other + key + test4YoutubeApikey;

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
    const url1 =
      endpoint + channelID + query + other + key + test3YoutubeApikey;
    const url2 =
      endpoint + channelID2 + query + other + key + test7YoutubeApikey;
    const url3 =
      endpoint + channelID2 + query + other + key + test7YoutubeApikey;
    const url4 =
      endpoint + channelID2 + query + other + key + test10YoutubeApikey;
    const url5 =
      endpoint + channelID2 + query + other + key + test10YoutubeApikey;

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
