window.onload = function() {
    var colorThief = new ColorThief();

    var images = document.querySelectorAll('.flex-item a'); // 只选择 .flex-item a 的图片
    images.forEach(function(image) {
        var img = new Image();
        img.src = image.style.backgroundImage.slice(4, -1).replace(/"/g, ""); // 获取背景图片的URL
        img.onload = function() {
            var color = colorThief.getColor(img);
            image.style.setProperty('--overlay-color', 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',0.5)');
        }
    });
};
