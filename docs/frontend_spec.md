# フロントエンド仕様書

## ディレクトリ構成（FSDアーキテクチャ）

frontend/
  ├── src/
  │   ├── entities/
  │   ├── features/
  │   ├── shared/
  │   ├── pages/
  │   └── widgets/
  ├── public/
  ├── .storybook/
  ├── package.json
  ├── tsconfig.json
  └── remix.config.js

## 使用技術
- Remix（TypeScript）
- Zustand（状態管理）
- TanStack Query（API通信・キャッシュ管理）
- Storybook（UIコンポーネント開発）
- Tailwind CSS または CSS Modules（UIスタイリング）
- shadcn/ui（UIコンポーネントライブラリ）
- Eslint/Prettier（コード整形・静的解析）
- webcola（グラフレイアウトエンジン）
- d3.js（データ可視化・グラフ描画）
- remix-i18next（多言語対応）

## 備考
- 今後、WebSocketを使うようアップデート予定。データ同期・取得部分はリアルタイム対応を見据えて設計する。
- UIコンポーネントはshadcn/uiやStorybookを活用し、デザインの一貫性・再利用性を重視する。
- 多言語対応（i18n）やアクセシビリティも必須とし、設計・実装段階から対応すること。