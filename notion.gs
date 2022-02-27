//スクリプトプロパティを取得
// const scriptProperties = PropertiesService.getScriptProperties();
scriptProperties.setProperties({
  //Notion
  ITOKEN: '******************',
  DATABASEID: '******************',
  ITOKEN_LINE: '******************',
  DATABASEID_LINE: '******************',
});
//Notion Info
const integrationToken = scriptProperties.getProperty('ITOKEN'); //Notion Integration Token
const databaseID = scriptProperties.getProperty('DATABASEID'); //DATABASE ID
const integrationTokenLINE = scriptProperties.getProperty('ITOKEN_LINE'); //Notion Integration Token LINE
const databaseIDLINE = scriptProperties.getProperty('DATABASEID_LINE'); //DATABASE ID LINE-INFO
const urlNotion = 'https://api.notion.com/v1/pages'; //url notion

// Notionにデータを保存
function notion(postbackData) {
  const headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    Authorization: 'Bearer ' + integrationToken,
    'Notion-Version': '2021-08-16',
  };

  const post_data = {
    parent: { database_id: databaseID },
    properties: {
      動画タイトル: {
        title: [
          {
            text: {
              content: postbackData.snippet.title,
            },
          },
        ],
      },
      チャンネル名: {
        rich_text: [
          {
            text: {
              content: postbackData.snippet.channelTitle,
            },
          },
        ],
      },
      URL: {
        url: 'https://www.youtube.com/watch?v=' + postbackData.id.videoId,
      },
      部位: {
        multi_select: [
          {
            name: postbackData.snippet.title.match(/腕/) ? '腕' : ' ',
          },
          {
            name: postbackData.snippet.title.match(/胸/) ? '胸' : ' ',
          },
          {
            name: postbackData.snippet.title.match(/背中/) ? '背中' : ' ',
          },
          {
            name: postbackData.snippet.title.match(/脚/) ? '脚' : ' ',
          },
          {
            name: postbackData.snippet.title.match(/肩/) ? '肩' : ' ',
          },
          {
            name: postbackData.snippet.title.match(/前腕/) ? '前腕' : ' ',
          },
          {
            name: postbackData.snippet.title.match(/筋トレ/) ? '筋トレ' : ' ',
          },
        ],
      },
      投稿日: {
        date: {
          start: Utilities.formatDate(
            new Date(postbackData.snippet.publishedAt),
            'JST',
            'yyyy-MM-dd HH:mm:ss'
          ),
          end: null,
        },
      },
      Files: {
        type: 'files',
        files: [
          {
            name: postbackData.snippet.thumbnails.high.url,
            type: 'external',
            external: {
              url: postbackData.snippet.thumbnails.high.url,
            },
          },
        ],
      },
    },
  };

  const options = {
    method: 'post',
    headers: headers,
    payload: JSON.stringify(post_data),
  };

  return UrlFetchApp.fetch(urlNotion, options);
}

//ユーザー情報が保存されない（下記のコードは動かない）
// NotionにLINEユーザー情報保存
// function saveLineInfo(lineIdWithName) {
//   const lineInfo = lineIdWithName
//   const endPoint = `https://api.notion.com/v1/pages`

//   const  headers = {
//     'Content-Type' : 'application/json; charset=UTF-8',
//     'Authorization': 'Bearer ' + integrationTokenLINE,
//     'Notion-Version': '2021-08-16',
//   };

//     const  lineData = {
//     'parent': {'database_id': databaseIDLINE},
//     'properties': {
//        'ユーザー名': {
//           'title': [
//           {
//             'text': {
//               'content': lineInfo[0]
//             }
//           }
//         ]
//       },
//         'ID': {
//           "rich_text": [
//           {
//             'text': {
//               'content': lineInfo[1],
//             }
//           }
//         ]
//       },
//      }
//     }

//   const  options = {
//     "method" : "post",
//     "headers" : headers,
//     "payload" : JSON.stringify(lineData)
//   };

//  return UrlFetchApp.fetch(endPoint, options);
// }

// Notionのデータを取得
// function getNotionData() {
//   const today = new Date();
//   const formattedToday = Utilities.formatDate(today, 'JST', 'yyyy-MM-dd');
//   const query = {
//     filter: {
//       property: '日付',
//       date: {
//         equals: formattedToday,
//       },
//     },
//   };
//   const headers = {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${NOTION_API_KEY}`,
//     'Notion-Version': '2021-08-16',
//   };
//   const options = {
//     method: 'POST',
//     headers: headers,
//     payload: JSON.stringify(query),
//   };

//   const response = UrlFetchApp.fetch(NOTION_URL, options);
//   const json = JSON.parse(response.getContentText());
//   const results = json.results;

//   return results;
// }
