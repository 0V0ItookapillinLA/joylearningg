import { useState } from "react";

// 临时最小化版本用于诊断问题
// 原始导入已被注释，以便排查依赖问题

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">欢迎来到 Joy Learning</h1>
        <p className="text-lg text-gray-600">页面正在加载中，请稍候...</p>
        <p className="text-sm text-gray-500 mt-4">如果页面一直显示此消息，可能是依赖缺失造成的问题。</p>
      </div>
    </div>
  );
};

export default HomePage;

