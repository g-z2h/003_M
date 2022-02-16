# Catch Your Fitness

## プロジェクトの目的

- 自分の好きなフィットネス系 YouTuber の最新トレーニング動画をキャッチアップ
- 最新のトレーニング動画にキャッチアップして、自分のライフスタイルにすぐ取り入れる
- YouTube という巨大なプラットホームから探すとなると、余計なものまで見てしまい、ついつい時間を無駄にしてしまうという課題を解決

## プロジェクトの背景

- 自分の趣味であるトレーニングにおいて、YouTube を通して勉強することが多かった
- 勉強のために動画を見ていたのに、YouTube のアルゴリズムによって余計なものがおすすめ欄に表示される
- YouTube のチャンネル登録機能を見ると、いろんなジャンルのチャンネルが登録されており、動画を探すのが面倒に感じる
- ジャンルごとのアカウントを複数作って、わざわざ切り替えるのも手間になる

## 仕様

### 実装する仕様

- YouTube API を用いて、特定の YouTuber の最新トレーニング動画を取得
- 毎朝同じ時間に LINE から最新のトレーニング動画 10 件程まとめて送る
- LINE BOT を用いて通知が来るようにする
- 気に入った動画のみ Notion のデータベースに保存
- 保存した動画で 24 時間以内に見ていない動画があれば LINE 通知

## 使用技術

- Javascript
- Typescript
- GAS（Google App Script）
- Line Messaging API
- YouTube Data API
- Notion API

### 選択した理由

- Javascript
  \_\_GAS が Javascript を元に作られている
- Typescript
- GAS（Google App Script）
  \_\_サーバーレスで実行可能な環境、Google サービスと連携しやすい（YouTube）
- Line Messaging API
  \_\_外部サービスと接続・連携したアカウントの作成・開発が可能
- YouTube Data API
  \_\_動画の情報を取得できる
- Notion API
  \_\_ソートしたり検索したりするのが直感的で簡単に操作できる

## 実装

### 構成＆処理フロー

![maeda-PF-GAS](https://user-images.githubusercontent.com/73515602/154376707-775169d3-c39d-4af2-9f76-8adc69165942.jpeg)

![maeda-PF-flow2](https://user-images.githubusercontent.com/73515602/154376818-a38abf12-f485-4873-8228-747d3b2409a4.jpeg)

## ユーザー体験

1. LINEBOT に登録
2. 毎朝同じ時間に、フィットネス系 YouTuber の最新のトレーニング動画 最大 10 件が LINE に来る
3. 動画情報（サムネイル、タイトル、チャンネル名、投稿日）を見て保存するかしないか決める
4. Notion で保存した動画をみることができる。見たものは記録しておく
5. 24 時間以内に見ていない動画があれば、LINE から通知を受ける

## セキュリティやプライバシーについての考察

- 自分のデータベースを他の人に見られないようにするために、ユーザー自身が Notion でプライベート設定する必要がある。

## 既知でオープンな問題

- Notion API はオープンベータなので仕様変更がある場合要修正

## 参考文献

https://nasal-howler-18d.notion.site/PF_References-b83878bf0011478d89acca2a91248a3f

## 実装計画

### 基礎作成

- API 権限設定など
- LINE チャンネル作成、アクセストークン発行
- Notion インテグレーション作成、データベース作成
- YouTube Data API Key 作成
- GAS ローカルでの開発環境構築

### 処理土台作成

- GAS トリガー設定
- YouTube Data API で動画取得
- LINE の反応（Yes or No）によって、Notion に保存するか
- 見ていない動画があれば Notion のデータを取得 → LINE 通知

### 使えるように実装

- フローチャートに乗っ取った処理の作成
- LINE 通知見た目

## スケジュール

- 1day 基礎作成
- 2day 処理土台作成
- 3day 処理土台作成
- 4day 使えるように実装
- 5day 使えるように実装
- 6day 使えるように実装
- 7day 調整日
- 8day README 作成
- 9day デバッグとサービス公開
- 10day 調整日

## Doc の編集の履歴

[編集日、編集者、何をしたのか、の 3 つ組を書く]
