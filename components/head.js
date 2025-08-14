export function createHead(title, additionalStyles = []) {
    const baseStyles = [
        '../css/page.css',
        '../css/flex-items.css', 
        '../css/meida-Queries.css',
        '../css/nav.css',
        '../css/p5.css'
    ];
    
    const allStyles = [...baseStyles, ...additionalStyles];
    
    return `
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="../assets/images/favicon.png" type="image/png">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.js"></script>
        <title>${title}</title>
        ${allStyles.map(style => `<link rel="stylesheet" href="${style}">`).join('\n        ')}
    `;
}

// 为首页创建特殊的头部（因为路径不同）
export function createHomeHead(title, additionalStyles = []) {
    const baseStyles = [
        './css/page.css',
        './css/flex-items.css', 
        './css/meida-Queries.css',
        './css/nav.css',
        './css/p5.css'
    ];
    
    const allStyles = [...baseStyles, ...additionalStyles];
    
    return `
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./assets/images/favicon.png" type="image/png">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.js"></script>
        <script src="https://cdn.jsdelivr.net/gh/hapticdata/toxiclibsjs@0.3.2/build/toxiclibs.js"></script>
        <script type="module" src="./JavaScripts/ParticleNetwork.js"></script>
        <script type="module" src="./JavaScripts/Star.js"></script>
        <script type="module" src="./JavaScripts/jellyfishSketch.js"></script>
        <title>${title}</title>
        ${allStyles.map(style => `<link rel="stylesheet" href="${style}">`).join('\n        ')}
    `;
}
