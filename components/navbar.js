export function createNavbar() {
    return `
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
        </div>
    `;
}
