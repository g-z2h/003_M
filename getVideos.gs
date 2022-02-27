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
//YouTube Info
//API KEY
const youtubeApikey = scriptProperties.getProperty('YT_APIKEY'); //youtube api key
const test2YoutubeApikey = scriptProperties.getProperty('TEST2_YT_APIKEY'); //youtube api key TEST2
const test3YoutubeApikey = scriptProperties.getProperty('TEST3_YT_APIKEY'); //youtube api key TEST3
const test4YoutubeApikey = scriptProperties.getProperty('TEST4_YT_APIKEY'); //youtube api key TEST4
const test5YoutubeApikey = scriptProperties.getProperty('TEST5_YT_APIKEY'); //youtube api key TEST5
const test6YoutubeApikey = scriptProperties.getProperty('TEST6_YT_APIKEY'); //youtube api key TEST6
const test7YoutubeApikey = scriptProperties.getProperty('TEST7_YT_APIKEY'); //youtube api key TEST7
const test8YoutubeApikey = scriptProperties.getProperty('TEST8_YT_APIKEY'); //youtube api key TEST8
const test9YoutubeApikey = scriptProperties.getProperty('TEST9_YT_APIKEY'); //youtube api key TEST9
const test10YoutubeApikey = scriptProperties.getProperty('TEST10_YT_APIKEY'); //youtube api key TEST10

//youtube Channel ID
const channelID = 'UCb-YblEIoA8fdgfVhgG4tBA'; // sample1 yokokawa
const channelID2 = 'UCdSPo9Iefw1REMBTPqm7DwQ'; // sample2 bighide
const channelID3 = 'UCnRd_MInrP6BhdSFJVY710A'; // sample3 arm hero
const channelID4 = 'UC7F_CLFtxDetmUnORgmwImg'; // sample4 yamamoto
const channelID5 = 'UCo2kwWSpTUbbus7syigi0Jg'; // sample5 terashima

const baseUrl = 'https://www.googleapis.com/youtube/v3/';

//今日の日時取得
let date = new Date();
let day = date.getDate();

//昨日の日付を取得
date.setDate(day - 1);
const json = JSON.stringify(date); //ex). "2017-08-23T03:00:00.000Z"
const yesterday = JSON.parse(json); //ex).  2017-08-23T03:00:00.000Z (RFC 3339 形式の date-time 値)

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//youtubeからデータ取ってくる
function getDataVideos() {
  // let url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=' + channelID + '&q=筋トレ'+'&maxResults=2&order=date&type=video&key=' + youtubeApikey
  // let url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId='  + '&q=肩トレ%7C胸トレ%7C背中トレ%7C脚トレ%7C腕トレ'+'&maxResults=1&order=date&publishedAfter=' + yesterday + '&type=video&key=' + test2YoutubeApikey
  let url =
    'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=' +
    channelID +
    '&q=肩トレ%7C胸トレ%7C背中トレ%7C脚トレ%7C腕トレ%7C筋トレ' +
    '&maxResults=1&order=date&publishedAfter=' +
    yesterday +
    '&type=video&key=' +
    test10YoutubeApikey;
  let url2 =
    'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=' +
    channelID2 +
    '&q=肩トレ%7C胸トレ%7C背中トレ%7C脚トレ%7C腕トレ%7C筋トレ' +
    '&maxResults=1&order=date&publishedAfter=' +
    yesterday +
    '&type=video&key=' +
    test10YoutubeApikey;
  let url3 =
    'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=' +
    channelID3 +
    '&q=肩トレ%7C胸トレ%7C背中トレ%7C脚トレ%7C腕トレ%7C筋トレ' +
    '&maxResults=1&order=date&publishedAfter=' +
    yesterday +
    '&type=video&key=' +
    test10YoutubeApikey;
  let url4 =
    'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=' +
    channelID4 +
    '&q=肩トレ%7C胸トレ%7C背中トレ%7C脚トレ%7C腕トレ%7C筋トレ' +
    '&maxResults=1&order=date&publishedAfter=' +
    yesterday +
    '&type=video&key=' +
    test10YoutubeApikey;
  let url5 =
    'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=' +
    channelID5 +
    '&q=肩トレ%7C胸トレ%7C背中トレ%7C脚トレ%7C腕トレ%7C筋トレ' +
    '&maxResults=1&order=date&publishedAfter=' +
    yesterday +
    '&type=video&key=' +
    test10YoutubeApikey;

  const URLS = [url, url2, url3, url4, url5];
  const youtubeData = URLS.map(function (URL) {
    // return JSON.parse(UrlFetchApp.fetch(URL).getContentText()).items
    let response = UrlFetchApp.fetch(URL);
    var responseJson = JSON.parse(response.getContentText());
    const youtubeData = responseJson.items;
    return youtubeData;
  });
  Logger.log(youtubeData); //[[], [], data, [], data]
  return youtubeData;
}
