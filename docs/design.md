# React-TypeScript Todoアプリ設計図

## アーキテクチャ概要

### フォルダ構成
```
src/
├── components/           # 再利用可能なコンポーネント
│   ├── common/          # 共通コンポーネント
│   │   ├── Button/
│   │   ├── Input/
│   │   └── Card/
│   └── todo/            # Todo専用コンポーネント
│       ├── Header/
│       ├── TodoList/
│       ├── TodoItem/
│       ├── FilterBar/
│       └── Footer/
├── hooks/               # カスタムフック
│   ├── useTodos.ts
│   └── useLocalStorage.ts
├── types/              # TypeScript型定義
│   └── todo.ts
├── utils/              # ユーティリティ関数
│   └── storage.ts
├── styles/             # スタイル関連
│   ├── globals.css
│   └── variables.css
├── App.tsx
├── App.css
└── index.tsx
```

## コンポーネント設計

### 1. App（ルートコンポーネント）
```typescript
interface AppProps {}

// 責務：
// - アプリケーション全体の状態管理
// - 各コンポーネントの配置・レイアウト
// - TodoContextの提供
```

### 2. Header（ヘッダー）
```typescript
interface HeaderProps {
  onAddTodo: (text: string) => void;
}

// 責務：
// - アプリケーションタイトル表示
// - 新しいTodoの入力フォーム
// - Todoの追加処理
```

### 3. TodoList（Todoリスト）
```typescript
interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: string) => void;
  onEditTodo: (id: string, text: string) => void;
  onDeleteTodo: (id: string) => void;
}

// 責務：
// - フィルタリングされたTodoの表示
// - 各TodoItemへのprops渡し
// - 空リスト時のメッセージ表示
```

### 4. TodoItem（個別Todo）
```typescript
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}

// 責務：
// - 個別Todoの表示・操作
// - 完了/未完了の切り替え
// - インライン編集機能
// - 削除機能
```

### 5. FilterBar（フィルターバー）
```typescript
interface FilterBarProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  activeCount: number;
}

// 責務：
// - フィルター切り替えボタン
// - アクティブなタスク数の表示
// - 現在のフィルター状態の表示
```

### 6. Footer（フッター）
```typescript
interface FooterProps {
  completedCount: number;
  onClearCompleted: () => void;
}

// 責務：
// - 完了済みタスクの一括削除
// - 統計情報の表示
// - アプリケーション情報
```

## 状態管理設計

### 1. メインの状態
```typescript
interface TodoState {
  todos: Todo[];
  filter: FilterType;
}
```

### 2. カスタムフック（useTodos）
```typescript
interface UseTodosReturn {
  todos: Todo[];
  filteredTodos: Todo[];
  filter: FilterType;
  activeCount: number;
  completedCount: number;
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  editTodo: (id: string, text: string) => void;
  deleteTodo: (id: string) => void;
  setFilter: (filter: FilterType) => void;
  clearCompleted: () => void;
}
```

### 3. データフロー
```
App (TodoState)
├── Header ← addTodo
├── TodoList ← filteredTodos, toggleTodo, editTodo, deleteTodo
├── FilterBar ← filter, activeCount, setFilter
└── Footer ← completedCount, clearCompleted
```

## UI/UX設計

### レイアウト構成
```
┌─────────────────────────────────┐
│            Header               │
│  [Todo App Title]              │
│  [Add new todo input] [Add]    │
├─────────────────────────────────┤
│           FilterBar             │
│  [All] [Active] [Completed]    │
│  "3 items left"                │
├─────────────────────────────────┤
│           TodoList              │
│  □ Buy groceries      [Edit][×] │
│  ☑ Learn React       [Edit][×] │
│  □ Write tests       [Edit][×] │
├─────────────────────────────────┤
│            Footer               │
│  [Clear completed] "2 of 3"    │
└─────────────────────────────────┘
```

### インタラクション設計

1. **Todo追加**
   - Enter キー または Add ボタンで追加
   - 空文字の場合は追加しない
   - 追加後は入力フィールドをクリア

2. **Todo編集**
   - ダブルクリックで編集モード
   - Enter キーで確定、Escape キーでキャンセル
   - 編集中は他の操作を無効化

3. **フィルタリング**
   - ボタンクリックでフィルター切り替え
   - アクティブなフィルターを視覚的に強調
   - URLパラメータと同期（オプション）

4. **アニメーション**
   - Todo追加/削除時のフェードイン/アウト
   - フィルター切り替え時のスムーズな遷移
   - ホバー時のマイクロインタラクション

### レスポンシブデザイン

- **モバイル（〜768px）**
  - 単一カラムレイアウト
  - タッチフレンドリーなボタンサイズ
  - スワイプジェスチャー対応

- **タブレット（768px〜1024px）**
  - 余白を増やした中央配置
  - 適度なカードシャドウ

- **デスクトップ（1024px〜）**
  - 最大幅を制限して読みやすさ向上
  - ホバーエフェクトの追加

## データ永続化

### ローカルストレージ仕様
```typescript
// Key: 'todoApp_todos'
// Value: Todo[]のJSON文字列

interface StorageService {
  loadTodos(): Todo[];
  saveTodos(todos: Todo[]): void;
  clearTodos(): void;
}
```

### 自動保存タイミング
- Todo追加時
- Todo更新時（完了/未完了、編集、削除）
- アプリケーション終了時

## パフォーマンス考慮事項

1. **メモ化**
   - `React.memo`でコンポーネントの不要な再レンダリング防止
   - `useMemo`で計算コストの高い処理の最適化
   - `useCallback`でコールバック関数の最適化

2. **遅延読み込み**
   - 大量のTodoがある場合の仮想スクロール（将来拡張）

3. **状態更新の最適化**
   - バッチ更新の活用
   - 必要最小限の状態更新