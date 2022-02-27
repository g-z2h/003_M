# Catch Your Fitness

<img width="995" alt="carousel" src="https://user-images.githubusercontent.com/73515602/155256564-067fe2e7-84ea-4baf-84ac-2c76aa0d58e4.png">

**Catch Your Fitness はフィットネス系 YouTuber 最新トレーニング動画を教えてくれる LineBot です。**

- 昨日の時点で投稿された最新トレーニング動画を毎朝定時に Line で教えてくれます。
- 気になる動画があれば、「保存」ボタンを押すことで Notion データベースに保存できます。

QR code

<img width="281" alt="catch your fitness" src="https://user-images.githubusercontent.com/73515602/155257109-5db88d4e-2b70-43f3-8d76-eace7b5d2f42.png">

デモストレーション

![1 5倍](https://user-images.githubusercontent.com/73515602/155871971-b69907e3-6911-4610-92cf-689d82729079.gif)

## このアプリを作った背景

**自分が本当に興味がある動画だけを見て、トレーニングの勉強をしたいと思ったからです。** 私の趣味は筋力トレーニングで YouTube を通して勉強することが多かったです。しかし勉強のために動画を見ていたのに、YouTube のアルゴリズムによって余計なものがおすすめ欄に表示され、ついつい関係のない動画で時間を消費してしまうことがありました。また YouTube の通知機能では「〇〇買ってみた」などのトレーニング以外の動画まで通知される問題点があります。以上の背景から自分の欲しい動画だけを取得できるアプリを開発しようと思いました。

## 工夫した点

### 動画情報の保存に Notion を選択したことです。

Notion のデータベースには GAS でプロパティを指定することで、YouTube から取得した動画情報を保存することができます。Notion では保存されたデータを検索、フィルター、並び替えの他に、表示形式もユーザーの好みで変更することが可能です。特に、このアプリでは取得した動画データから鍛える部位を判断し、マルチセレクタープロパティに保存するように設定しました。それにより Notion の Board 形式で表示したときに部位別に表示されるので、どこの部位の動画がいくつあるのかひと目で理解することが出来ます。
<img width="1512" alt="board" src="https://user-images.githubusercontent.com/73515602/155256688-4aff68ed-1d4c-4177-b38d-1740e480c772.png">

## 苦労した点

### YouTube API キーで取得できる 1 日のデータ量が制限されていることです。

開発の段階でたくさんの動画を取得しようと考えると、API の 1 日の利用制限の上限に達してしまいます。現段階では自分が使うものになりますので、自分が興味がある YouTube 動画を開発の段階で決め、チャンネルごとに API キーを発行して開発しました。これにより一つの API キーを使って繰り返し処理をするよりは、取得できる回数を増やすことができました。しかし、今後のサービス拡大を考えたときには、API キーの上限を増加（要申請）、ユーザーに応じた動画を取得できるような実装などをしていく必要があると考えています。

## 今後の追加したい機能

- Notion に溜まった動画を期日までに消化していなかったら、LINE に通知
- ユーザーに応じた動画を取得できる機能

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
