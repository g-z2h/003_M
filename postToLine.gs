scriptProperties.setProperties({
  //LINE
  CHTOKNE: '*********************',
  LINEID: '*********************',
});
//LINE Info
const token = scriptProperties.getProperty('CHTOKNE'); //LINEチャンネルトークン
const lineID = scriptProperties.getProperty('LINEID'); //LINE ID
//LINE endpoint
const postuUrl = 'https://api.line.me/v2/bot/message/push';
const replyUrl = 'https://api.line.me/v2/bot/message/reply';

//ユーザーにLINEのメッセージ送信
function postToLine() {
  //youtube APIで取得したデータを格納 (youtubeData =  responseJson.items)
  // const youtubeData = getDataVideos()
  // let youtubeData = []
  // let youtubeData = getDataVideos().map(data =>{ data.length === 0 ?  '' : data[0]})//[{}, {}, {}, ...]

  // [[{}], [{}], [{}], [{}]]  =>  [{}, {}, {}, {}]
  let youtubeData = getDataVideos().map((data) => data[0]);

  //空配列を削除 [null, null,{}, null, {} ] => [{}, {}] の形にする。
  youtubeData = youtubeData.filter(Boolean);
  Logger.log(youtubeData);

  /////////////////////////////////////////////////////////////////
  //データ参照場所
  let postbackData = []; //[{}, {}, {}, ...]
  for (let i = 0; i < youtubeData.length; i++) {
    postbackData.push(youtubeData[i]);
  }
  Logger.log(postbackData.length);

  // const userLineID = userId
  // Logger.log(userLineID)

  // 定時時刻処理
  //  setTrigger();

  const lineRoop = () => {
    const fuga = postbackData.map((d) => linePost(d));
    return fuga;
  };

  const linePost = (data) => {
    return {
      type: 'bubble',
      hero: {
        type: 'image',
        url: data.snippet.thumbnails.high.url,
        size: 'full',
        aspectRatio: '20:13',
        aspectMode: 'cover',
        action: {
          type: 'uri',
          uri: 'https://www.youtube.com/watch?v=' + data.id.videoId,
        },
      },
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: data.snippet.title,
            weight: 'bold',
            size: 'md',
          },
          {
            type: 'box',
            layout: 'baseline',
            margin: 'md',
            contents: [
              {
                type: 'text',
                text: data.snippet.channelTitle,
                size: 'sm',
                color: '#999999',
                margin: 'md',
                flex: 0,
              },
            ],
          },
          {
            type: 'box',
            layout: 'vertical',
            margin: 'lg',
            spacing: 'sm',
            contents: [
              {
                type: 'box',
                layout: 'baseline',
                spacing: 'sm',
                contents: [
                  {
                    type: 'text',
                    text: '投稿日',
                    color: '#aaaaaa',
                    size: 'sm',
                    flex: 1,
                  },
                  {
                    type: 'text',
                    text: Utilities.formatDate(
                      new Date(data.snippet.publishedAt),
                      'JST',
                      'yyyy-MM-dd HH:mm:ss'
                    ),
                    wrap: true,
                    color: '#666666',
                    size: 'sm',
                    flex: 5,
                  },
                ],
              },
            ],
          },
        ],
      },
      footer: {
        type: 'box',
        layout: 'horizontal',
        spacing: 'sm',
        contents: [
          {
            type: 'button',
            style: 'primary',
            color: '#64b8fc',
            height: 'sm',
            action: {
              type: 'postback',
              label: '保存',
              data: data.snippet.title + ' を保存しました！',
              displayText: ' ',
            },
          },
          {
            type: 'button',
            style: 'link',
            height: 'sm',
            action: {
              type: 'postback',
              label: '無視',
              data: '無視しました',
              displayText: ' ',
            },
          },
          {
            type: 'spacer',
          },
        ],
      },
    };
  };
  const post = lineRoop();

  const payload =
    postbackData.length > 0
      ? //payload:送るデータの詳細（ユーザー画面に表示されるもの）
        {
          to: lineID,
          messages: [
            {
              type: 'flex',
              altText: '最新の動画が届きました！',
              contents: {
                type: 'carousel',
                contents: post,
              },
            },
          ],
        }
      : //取得データが0の場合
        {
          to: lineID,
          messages: [
            {
              type: 'text',
              text: '本日の最新動画はありません！明日の最新動画の配信をお待ち下さい！',
            },
          ],
        };
  const params = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + token,
    },
    payload: JSON.stringify(payload),
  };

  UrlFetchApp.fetch(postuUrl, params);
}
