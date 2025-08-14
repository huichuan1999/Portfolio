// 批量重构导航栏脚本
// 使用方法：在浏览器控制台中运行此脚本

const navHTML = `
<div class="nav">
    <ul class="navlist">
        <li class="btli"><a href="/index.html">HOME</a></li>
        <li class="btli"><a href="/computationalArtist/computationalArt.html">COMPUTATIONAL ARTS</a></li>
        <li class="btli"><a href="/Illustrations/gallery.html">ILLUSTRATIONS</a></li>
        <li class="btli"><a href="/gameDev/gamedevelopment.html">GAME DEV</a>
            <ul class="droplist">
                <li><a href="https://huichuan-wang.itch.io/">Itch.io</a></li>
            </ul>
        </li>
        <li class="btli"><a href="/graphicDesign/graphicDesign.html">GRAPHICS</a></li>
        <li class="btli"><a href="/about/aboutMe.html">INFO</a>
            <ul class="droplist">
                <li><a href="mailto:huichuanwang@outlook.com">E-mail me!</a></li>
                <li><a href="https://www.instagram.com/huichuan_/ ">Instagram</a></li>
                <li><a href="https://www.xiaohongshu.com/user/profile/60a0abc50000000001002142?xhsshare=CopyLink&appuid=60a0abc50000000001002142&apptime=1707347193 ">Xiaohongshu/Red</a></li>
                <li><a href="https://www.linkedin.com/in/huichuan-ekawa ">Linkedin</a></li>
            </ul>
        </li>
    </ul>
</div>`;

const navContainerHTML = `<!-- 导航栏容器 -->
<div id="nav-container"></div>`;

const navScriptHTML = `
    <!-- 加载导航栏组件 -->
    <script type="module">
        import { createNavbar } from '../components/navbar.js';
        
        document.addEventListener('DOMContentLoaded', () => {
            const navContainer = document.getElementById('nav-container');
            if (navContainer) {
                navContainer.innerHTML = createNavbar();
            }
        });
    </script>`;

// 查找并替换导航栏
function replaceNavbar() {
    // 查找所有导航栏
    const navElements = document.querySelectorAll('.nav');
    
    if (navElements.length === 0) {
        console.log('未找到导航栏元素');
        return;
    }
    
    console.log(`找到 ${navElements.length} 个导航栏元素`);
    
    // 替换第一个导航栏为容器
    const firstNav = navElements[0];
    firstNav.outerHTML = navContainerHTML;
    
    // 移除其他重复的导航栏
    for (let i = 1; i < navElements.length; i++) {
        navElements[i].remove();
    }
    
    console.log('导航栏已替换为容器');
}

// 在页面底部添加导航栏脚本
function addNavbarScript() {
    // 检查是否已经有导航栏脚本
    if (document.querySelector('script[src*="navbar.js"]')) {
        console.log('导航栏脚本已存在');
        return;
    }
    
    // 在body结束标签前添加脚本
    const body = document.querySelector('body');
    if (body) {
        const script = document.createElement('script');
        script.type = 'module';
        script.innerHTML = `
            import { createNavbar } from '../components/navbar.js';
            
            document.addEventListener('DOMContentLoaded', () => {
                const navContainer = document.getElementById('nav-container');
                if (navContainer) {
                    navContainer.innerHTML = createNavbar();
                }
            });
        `;
        body.appendChild(script);
        console.log('导航栏脚本已添加');
    }
}

// 执行重构
function refactorPage() {
    console.log('开始重构页面...');
    replaceNavbar();
    addNavbarScript();
    console.log('页面重构完成！');
}

// 导出函数供外部使用
window.refactorNavbar = {
    replaceNavbar,
    addNavbarScript,
    refactorPage
};

console.log('导航栏重构脚本已加载');
console.log('使用方法：refactorNavbar.refactorPage()');
