//スクリプトプロパティを取得
// const scriptProperties = PropertiesService.getScriptProperties();
scriptProperties.setProperties({
  //Notion
  ITOKEN: '******************',
  DATABASEID: '******************',
  ITOKEN_LINE: '******************',
  DATABASEID_LINE: '******************',
});
//Notion Info for videos
function notion1() {
  return {
    integrationToken: scriptProperties.getProperty('ITOKEN'), //Notion Integration Token
    databaseID: scriptProperties.getProperty('DATABASEID'), //DATABASE ID
  };
}

//Notion Info for line
function notion2Line() {
  return {
    integrationTokenLINE: scriptProperties.getProperty('ITOKEN_LINE'), //Notion Integration Token LINE
    databaseIDLINE: scriptProperties.getProperty('DATABASEID_LINE'), //DATABASE ID LINE-INFO
  };
}

const endpoint = 'https://api.notion.com/v1/pages';

// Notionにデータを保存
function notion(postbackData, gotIdAndName) {
  const { integrationToken, databaseID } = notion1();
  const lineId = gotIdAndName[0];
  const lineName = gotIdAndName[1];

  //multi_select
  const bodyParts = ['腕', '胸', '肩', '背中', '脚', '筋トレ'];
  const multiSelect = bodyParts.map((part) => ({
    name: postbackData.snippet.title.match(part) ? part : ' ',
  }));

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
        multi_select: multiSelect,
      },
      投稿日: {
        date: {
          start: Utilities.formatDate(
            new Date(postbackData.snippet.publishedAt),
            'JST',
            'yyyy-MM-dd'
          ),
          end: null,
        },
      },
      LINEID: {
        rich_text: [
          {
            text: {
              content: lineId,
            },
          },
        ],
      },
      ユーザー名: {
        rich_text: [
          {
            text: {
              content: lineName,
            },
          },
        ],
      },
    },
    children: [
      {
        object: 'block',
        type: 'image',
        image: {
          type: 'external',
          external: {
            url: postbackData.snippet.thumbnails.high.url,
          },
        },
      },
    ],
  };

  const headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    Authorization: 'Bearer ' + integrationToken,
    'Notion-Version': '2021-08-16',
  };

  const options = {
    method: 'post',
    headers: headers,
    payload: JSON.stringify(post_data),
  };

  return UrlFetchApp.fetch(endpoint, options);
}

// NotionにLINEユーザー情報保存
function saveLineInfo(gotIdAndName) {
  const { integrationTokenLINE, databaseIDLINE } = notion2Line();

  const lineId = gotIdAndName[0];
  const lineName = gotIdAndName[1];

  const headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    Authorization: 'Bearer ' + integrationTokenLINE,
    'Notion-Version': '2021-08-16',
  };

  const lineData = {
    parent: { database_id: databaseIDLINE },
    properties: {
      ユーザー名: {
        title: [
          {
            text: {
              content: lineName,
            },
          },
        ],
      },
      ID: {
        rich_text: [
          {
            text: {
              content: lineId,
            },
          },
        ],
      },
    },
  };

  const options = {
    method: 'post',
    headers: headers,
    payload: JSON.stringify(lineData),
  };
  return UrlFetchApp.fetch(endpoint, options);
}
