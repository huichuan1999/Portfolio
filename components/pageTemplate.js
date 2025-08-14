import { createHead } from './head.js';
import { createNavbar } from './navbar.js';

export function createPageTemplate(title, additionalStyles = [], bodyContent = '', isHomePage = false) {
    const headFunction = isHomePage ? 'createHomeHead' : 'createHead';
    
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            ${isHomePage ? createHomeHead(title, additionalStyles) : createHead(title, additionalStyles)}
        </head>
        <body>
            <div id="nav-container"></div>
            ${bodyContent}
            
            <script type="module">
                import { createNavbar } from '${isHomePage ? './components/navbar.js' : '../components/navbar.js'}';
                
                document.addEventListener('DOMContentLoaded', () => {
                    const navContainer = document.getElementById('nav-container');
                    if (navContainer) {
                        navContainer.innerHTML = createNavbar();
                    }
                });
            </script>
        </body>
        </html>
    `;
}

// 创建导航栏加载脚本（用于现有页面的渐进式重构）
export function createNavbarScript(isHomePage = false) {
    const path = isHomePage ? './components/navbar.js' : '../components/navbar.js';
    
    return `
        <script type="module">
            import { createNavbar } from '${path}';
            
            document.addEventListener('DOMContentLoaded', () => {
                const navContainer = document.getElementById('nav-container');
                if (navContainer) {
                    navContainer.innerHTML = createNavbar();
                }
            });
        </script>
    `;
}
