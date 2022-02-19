const youtubeApikey = scriptProperties.getProperty('YT_APIKEY'); //youtube api key
const KZchannelID = 'UCb-YblEIoA8fdgfVhgG4tBA'; // sample
const baseUrl = 'https://www.googleapis.com/youtube/v3/';

function getData() {
  let url =
    'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=' +
    KZchannelID +
    '&q=筋トレ' +
    '&maxResults=1&order=date&type=video&key=' +
    youtubeApikey;
  let response = UrlFetchApp.fetch(url);
  var responseJson = JSON.parse(response.getContentText());

  const youtubeData = responseJson.items[0];
  Logger.log(youtubeData);

  return youtubeData;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////

function PlayList() {
  let list_nextpageID = undefined;

  do {
    //APIキーの呼び出し

    //json形式分解
    let list_resultsPerPage = responseJson.pageInfo.resultsPerPage;
    list_nextpageID = responseJson.nextPageToken;

    for (let cnt = 0; cnt < responseJson.items.length; cnt++) {
      let videoId = responseJson.items[cnt].id.videoId;
      let title = responseJson.items[cnt].snippet.title;
      let description = responseJson.items[cnt].snippet.description;
      // let videoTime = "";
      let type = 'List';

      if (videoId != undefined) {
        type = 'Video';
        //  videoTime = getVideoTime(videoId);
      }

      writeYoutubeVideo(videoId, type, title, description, videoTime);
    }
  } while (list_nextpageID != undefined);
}

// videoの情報を取得
function getVideoTime(videoId) {
  let dataURL = '';
  dataURL =
    baseUrl +
    'videos?part=snippet,contentDetails,statistics,status&id=' +
    videoId +
    '&key=' +
    youtubeApikey;

  //レスポンス値にjson形式で挿入
  let response = UrlFetchApp.fetch(dataURL);
  let responseJson = JSON.parse(response.getContentText());
  let duration = responseJson.items[0].contentDetails.duration;

  return convertDurationTime(duration);
}

// youtubeListを取得
function getYoutubePlayList(channelID, pageToken) {
  //APIキーの呼び出し
  let dataURL = '';
  if (pageToken == undefined) {
    dataURL =
      baseUrl +
      'search?part=snippet&maxResults=50&channelId=' +
      channelID +
      '&key=' +
      youtubeApikey;
  } else {
    dataURL =
      baseUrl +
      'search?part=snippet&maxResults=50&channelId=' +
      channelID +
      '&key=' +
      youtubeApikey +
      '&pageToken=' +
      pageToken;
  }

  //レスポンス値にjson形式で挿入
  let response = UrlFetchApp.fetch(dataURL);
  return JSON.parse(response.getContentText());
  Logger.log(response);
}
