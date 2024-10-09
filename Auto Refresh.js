// ==UserScript==
// @name         Auto Refresh
// @version      1.0
// @description  每隔 10 秒自动刷新
// @author       breeze
// @match        *://orders.damai.cn/orderList*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const maxCount = 999; // 最大次数
    let count = parseInt(localStorage.getItem('refreshCount')) || 0; // 从 localStorage 获取计数器
    let intervalId; // 定时器 ID
    let isRefreshing = localStorage.getItem('isRefreshing') === 'true'; // 从 localStorage 获取刷新状态

    // 创建按钮
    const button = document.createElement('button');
    button.textContent = isRefreshing ? '停止 刷新' : '启动 刷新';
    button.style.position = 'fixed';
    button.style.top = '10px';
    button.style.right = '10px';
    button.style.zIndex = '1000';
    button.style.padding = '10px';
    button.style.backgroundColor = '#4285F4';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';

    // 添加按钮到页面
    document.body.appendChild(button);

    // 刷新页面的函数
    const refreshPage = () => {
        if (count < maxCount) {
            console.log(`刷新次数: ${count + 1}`); // 调试信息
            location.reload(); // 刷新页面
            count++; // 计数器加一
            localStorage.setItem('refreshCount', count); // 更新计数器到 localStorage
        } else {
            stopRefreshing(); // 达到最大次数后停止
        }
    };

    // 启动和停止刷新
    const toggleRefresh = () => {
        if (isRefreshing) {
            stopRefreshing();
        } else {
            startRefreshing();
        }
    };

    const startRefreshing = () => {
        if (isRefreshing) return; // 防止重复启动
        isRefreshing = true;
        localStorage.setItem('isRefreshing', 'true'); // 更新状态到 localStorage
        button.textContent = '停止 刷新';
        intervalId = setInterval(refreshPage, 10000); // 每 10 秒刷新
    };

    const stopRefreshing = () => {
        isRefreshing = false;
        localStorage.setItem('isRefreshing', 'false'); // 更新状态到 localStorage
        button.textContent = '启动 刷新';
        clearInterval(intervalId); // 清除定时器
        count = 0; // 计数器可选重置
        localStorage.removeItem('refreshCount'); // 可选：清除计数器
    };

    // 初始化状态
    if (isRefreshing) {
        intervalId = setInterval(refreshPage, 10000);
    }

    // 绑定按钮点击事件
    button.addEventListener('click', toggleRefresh);
})();
