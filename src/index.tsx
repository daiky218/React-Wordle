import * as ReactDOMClient from "react-dom/client";
import App from "./App";

// TODO:
// 基本游戏功能 ✅
// 动画特效 ❎
// 黑暗模式 ❎
// 成语模式 ❎
// 单词解释功能 ❎
// 统计功能 ✅
    // 统计模态框 ✅
    // 统计数据显示 ✅
// 设置模态框 ❎
// LocalStorage数据存储 ✅
// 分享功能 ❎

// FIXME:
// 通知组件位置问题 ❎

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container!);
root.render(<App />);

