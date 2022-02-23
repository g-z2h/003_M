# Catch Your Fitness

実装済

- GAS→YouTube→LINE→Notion の一通りの処理
  <img width="1454" alt="Notion-sample" src="https://user-images.githubusercontent.com/73515602/154868389-b3d34ff9-4594-4eff-b8b2-63b1090157d3.png">

  <img width="502" alt="LINE-sample" src="https://user-images.githubusercontent.com/73515602/154868611-9d37c3a7-a027-4677-8989-3c1ec32ca14b.png">

実装予定

- Notion にサムネ画像保存 ？
- 友達追加された人全員にメッセージ送るには ？
- YouTube 動画複数取得 (複数チャンネル ID で絞るは可能？クエリで'肩トレ'ように絞る。複数クエリで絞れるか？)
- LINE Flex Message で取得した数だけカルーセル表示

---

**Catch Your Fitness はフィットネス系 YouTuber 最新トレーニング動画を教えてくれる LineBot です。**

- 昨日の時点で投稿された最新トレーニング動画を毎朝定時に Line で教えてくれます。
- 気になる動画があれば、「保存」ボタンを押すことで Notion データベースに保存できます。

GIF

coming soon...

QR code

coming soon...

## このアプリを作った背景

**自分が本当に興味がある動画だけを見て、トレーニングの勉強をしたいと思ったからです。** 私の趣味は筋力トレーニングで YouTube を通して勉強することが多かったです。しかし勉強のために動画を見ていたのに、YouTube のアルゴリズムによって余計なものがおすすめ欄に表示され、ついつい関係のない動画で時間を消費してしまうことがありました。また YouTube の通知機能では「〇〇買ってみた」などのトレーニング以外の動画まで通知される問題点があります。以上の背景から自分の欲しい動画だけを取得できるアプリを開発しようと思いました。

## 工夫した点

###

## 苦労した点

###

## 設計書

### 構成＆処理フロー

![maeda-PF-GAS](https://user-images.githubusercontent.com/73515602/154376707-775169d3-c39d-4af2-9f76-8adc69165942.jpeg)

![maeda-PF-flow2](https://user-images.githubusercontent.com/73515602/154376818-a38abf12-f485-4873-8228-747d3b2409a4.jpeg)

## 機能一覧

| No  | 機能           |                     |
| --- | -------------- | ------------------- |
| 1   | 動画データ取得 | YouTube Data API v3 |
| 2   | Line 応答      | Line Messaging API  |
| 3   | 定時通知       | Google App Script   |

## 使用技術

- Javascript
- GAS（Google App Script）
- Line Messaging API
- YouTube Data API
- Notion API
