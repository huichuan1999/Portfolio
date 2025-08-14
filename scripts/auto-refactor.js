// 自动化导航栏重构脚本
// 使用方法：在浏览器控制台中运行此脚本

class NavbarRefactor {
    constructor() {
        this.navbarHTML = `
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
        
        this.navContainerHTML = `<!-- 导航栏容器 -->
        <div id="nav-container"></div>`;
        
        this.navbarScript = `
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
        
        this.homeNavbarScript = `
    <!-- 加载导航栏组件 -->
    <script type="module">
        import { createNavbar } from './components/navbar.js';
        
        document.addEventListener('DOMContentLoaded', () => {
            const navContainer = document.getElementById('nav-container');
            if (navContainer) {
                navContainer.innerHTML = createNavbar();
            }
        });
    </script>`;
    }

    // 检测当前页面类型
    detectPageType() {
        const path = window.location.pathname;
        if (path === '/' || path === '/index.html') {
            return 'home';
        } else if (path.includes('/computationalArtist/')) {
            return 'computationalArtist';
        } else if (path.includes('/Illustrations/')) {
            return 'illustrations';
        } else if (path.includes('/graphicDesign/')) {
            return 'graphicDesign';
        } else if (path.includes('/gameDev/')) {
            return 'gameDev';
        } else if (path.includes('/about/')) {
            return 'about';
        } else if (path.includes('/TangibleIllusions/')) {
            return 'tangibleIllusions';
        } else if (path.includes('/WeeklyBlog/')) {
            return 'weeklyBlog';
        } else if (path.includes('/exhibitions/')) {
            return 'exhibitions';
        } else {
            return 'unknown';
        }
    }

    // 获取正确的组件路径
    getComponentPath() {
        const pageType = this.detectPageType();
        if (pageType === 'home') {
            return './components/navbar.js';
        } else {
            return '../components/navbar.js';
        }
    }

    // 获取正确的导航栏脚本
    getNavbarScript() {
        const pageType = this.detectPageType();
        if (pageType === 'home') {
            return this.homeNavbarScript;
        } else {
            return this.navbarScript;
        }
    }

    // 查找并替换导航栏
    replaceNavbar() {
        const navElements = document.querySelectorAll('.nav');
        
        if (navElements.length === 0) {
            console.log('未找到导航栏元素');
            return false;
        }
        
        console.log(`找到 ${navElements.length} 个导航栏元素`);
        
        // 替换第一个导航栏为容器
        const firstNav = navElements[0];
        firstNav.outerHTML = this.navContainerHTML;
        
        // 移除其他重复的导航栏
        for (let i = 1; i < navElements.length; i++) {
            navElements[i].remove();
        }
        
        console.log('导航栏已替换为容器');
        return true;
    }

    // 添加导航栏脚本
    addNavbarScript() {
        // 检查是否已经有导航栏脚本
        if (document.querySelector('script[src*="navbar.js"]') || 
            document.querySelector('script:contains("createNavbar")')) {
            console.log('导航栏脚本已存在');
            return false;
        }
        
        // 在body结束标签前添加脚本
        const body = document.querySelector('body');
        if (body) {
            const script = document.createElement('script');
            script.type = 'module';
            script.innerHTML = `
                import { createNavbar } from '${this.getComponentPath()}';
                
                document.addEventListener('DOMContentLoaded', () => {
                    const navContainer = document.getElementById('nav-container');
                    if (navContainer) {
                        navContainer.innerHTML = createNavbar();
                    }
                });
            `;
            body.appendChild(script);
            console.log('导航栏脚本已添加');
            return true;
        }
        return false;
    }

    // 执行重构
    refactorPage() {
        console.log('开始重构页面...');
        console.log(`页面类型: ${this.detectPageType()}`);
        console.log(`组件路径: ${this.getComponentPath()}`);
        
        const navbarReplaced = this.replaceNavbar();
        const scriptAdded = this.addNavbarScript();
        
        if (navbarReplaced || scriptAdded) {
            console.log('页面重构完成！');
            console.log('请刷新页面查看效果');
        } else {
            console.log('页面无需重构或重构失败');
        }
        
        return { navbarReplaced, scriptAdded };
    }

    // 批量重构所有页面（需要手动在每个页面运行）
    static batchRefactor() {
        console.log('批量重构功能');
        console.log('请在需要重构的页面中运行此脚本');
        console.log('使用方法: new NavbarRefactor().refactorPage()');
    }

    // 检查页面状态
    checkPageStatus() {
        const hasNavbar = document.querySelector('.nav') !== null;
        const hasNavContainer = document.getElementById('nav-container') !== null;
        const hasNavbarScript = document.querySelector('script[src*="navbar.js"]') !== null || 
                               document.querySelector('script:contains("createNavbar")') !== null;
        
        console.log('页面状态检查:');
        console.log(`- 原始导航栏: ${hasNavbar ? '存在' : '不存在'}`);
        console.log(`- 导航栏容器: ${hasNavContainer ? '存在' : '不存在'}`);
        console.log(`- 导航栏脚本: ${hasNavbarScript ? '存在' : '不存在'}`);
        
        if (!hasNavbar && hasNavContainer && hasNavbarScript) {
            console.log('✅ 页面已完成重构');
        } else if (hasNavbar && !hasNavContainer) {
            console.log('❌ 页面需要重构');
        } else {
            console.log('⚠️ 页面状态异常');
        }
        
        return { hasNavbar, hasNavContainer, hasNavbarScript };
    }
}

// 创建全局实例
window.navbarRefactor = new NavbarRefactor();

// 导出便捷方法
window.refactorNavbar = () => window.navbarRefactor.refactorPage();
window.checkNavbarStatus = () => window.navbarRefactor.checkPageStatus();

console.log('🚀 自动化导航栏重构脚本已加载');
console.log('使用方法:');
console.log('- refactorNavbar() - 重构当前页面');
console.log('- checkNavbarStatus() - 检查页面状态');
console.log('- new NavbarRefactor().refactorPage() - 完整重构');
