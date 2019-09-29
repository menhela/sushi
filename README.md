# treasure2019-group-c
## 概要
* Treasure2019のグループワーク用リポジトリ
* [treasure-app](https://github.com/voyagegroup/treasure-app) をAWSにデプロイするためのラッパー
  * ディレクトリの構成が少し変わっています
    * /frontend/* -> /ui/src/*
    * /backend/*  -> /api/src/*
    * /database/* -> /database/src/*

## ローカル環境での開発
* [treasure-app](https://github.com/voyagegroup/treasure-app) を参照して下さい

## デプロイ
* masterに変更が加わったことを検知し、CodePipelineが起動します
* ビルドで何をしているかは `.codebuild/*` を見るとわかります
