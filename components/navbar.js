export function createNavbar() {
    return `
        <div class="nav">
            <ul class="navlist">
                <li class="btli">
                    <a href="/index.html" class="home-icon-link">
                        <!-- <img src="/assets/images/TangibleIllusions.jpg" alt="Home" class="home-icon" id="homeIcon"> -->
                        <span class="home-text">Huichuan Wang</span>
                    </a>
                </li>
                <li class="btli"><a href="/works.html">WORKS</a></li>
                <li class="btli"><a href="/about/aboutMe.html">INFO</a>
                    <ul class="droplist">
                        <li><a href="mailto:huichuanwang@outlook.com">E-mail me!</a></li>
                        <li><a href="https://www.instagram.com/huichuan_/ ">Instagram</a></li>
                        <li><a href="https://www.xiaohongshu.com/user/profile/60a0abc50000000001002142?xhsshare=CopyLink&appuid=60a0abc50000000001002142&apptime=1707347193 ">Xiaohongshu/Red</a></li>
                        <li><a href="https://www.linkedin.com/in/huichuan-ekawa ">Linkedin</a></li>
                    </ul>
                </li>
            </ul>
        </div>
        <script>
            document.addEventListener('DOMContentLoaded', function() {
                const homeIcon = document.getElementById('homeIcon');
                if (homeIcon) {
                    homeIcon.addEventListener('click', function() {
                        this.src = '/assets/images/TangibleIllusions-1.png';
                    });
                }
            });
        </script>
    `;
}
