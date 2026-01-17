# CLAUDE.md

React Three Fiber (R3F) アプリケーションテンプレート用の開発ガイドです。

## プロジェクト概要

このプロジェクトは React Three Fiber を使用した 3D グラフィックスアプリケーションのテンプレートです。

### 技術スタック

- **React 19** - UI フレームワーク
- **React Three Fiber (R3F)** - Three.js の React レンダラー
- **TypeScript 5.9** - 型安全性（strict mode 有効）
- **Vite 7** - ビルドツール・開発サーバー
- **Tailwind CSS v4** - スタイリング
- **Bun** - パッケージマネージャー・ランタイム
- **Ultracite** - コード品質ツール（Oxlint + Oxfmt）

## 開発コマンド

すべてのパッケージマネージャーコマンドは `ni` を使用してください:

- `nr dev` - 開発サーバーを起動
- `nr build` - プロダクションビルドを作成
- `nr preview` - ビルドしたアプリケーションをプレビュー
- `nr fix` - Ultracite でコードを自動修正（型チェック付き）
- `nr check` - Ultracite でコードをチェック

## プロジェクト構造

```
src/
├── app.tsx        # メインアプリケーションコンポーネント（Canvas を含む）
├── main.tsx       # エントリーポイント（React StrictMode を使用）
├── global.css     # グローバルスタイル
└── assets/        # 静的アセット
```

### 重要なポイント

- **エントリーポイント**: `src/main.tsx` が React アプリケーションを初期化
- **StrictMode**: React.StrictMode が有効化されています
- **型安全性**: TypeScript の strict モードが有効

## React Three Fiber (R3F) ガイドライン

### Canvas コンポーネント

- すべての R3F コンポーネントは `<Canvas>` 内に配置する必要があります
- `<Canvas>` は通常のReactコンポーネントツリーのどこにでも配置可能

### R3F Hooks の使用制限

以下の R3F hooks は `<Canvas>` の**内部**でのみ使用できます:

- `useThree()`
- `useFrame()`
- その他の R3F 専用フック

これらを `<Canvas>` の外で使用するとエラーになります。

### コンポーネント構成の例

```tsx
// ❌ 誤った使い方
export const App = () => {
  const { camera } = useThree(); // エラー: Canvas の外
  return <Canvas>...</Canvas>;
};

// ✅ 正しい使い方
const Scene = () => {
  const { camera } = useThree(); // OK: Canvas の内側
  return <mesh>...</mesh>;
};

export const App = () => (
  <Canvas>
    <Scene />
  </Canvas>
);
```
