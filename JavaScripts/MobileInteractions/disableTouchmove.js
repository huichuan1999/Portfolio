// 禁用滚动
document.body.addEventListener('touchmove', function(event) {
    event.preventDefault();
}, { passive: false });
