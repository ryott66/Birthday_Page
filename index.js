
const birthday = new Date("2025-06-07");
const countdownEl = document.getElementById("countdown");

let hasCelebrated = false;  // 🎉 クラッカーを1回だけ表示するためのフラグ

function launchConfetti() {
    // 左から
    confetti({
        particleCount: 300, //紙吹雪の数
        angle: 60, //角度
        spread: 100, //広がる角度
        origin: { x: 0, y: 0.5 }, //発射位置
        colors: ['#ff69b4', '#ffd700', '#87cefa'] //色
    });

    // 右から
    confetti({
        particleCount: 300,
        angle: 120,
        spread: 100,
        origin: { x: 1, y: 0.5 },
        colors: ['#ff69b4', '#ffd700', '#87cefa']
    });

    // 上からシャワー
    confetti({
        particleCount: 600,
        angle: 90,
        spread: 200,
        startVelocity: 50,
        origin: { x: 0.5, y: 0 },
        colors: ['#ff69b4', '#ffffff', '#ffd700']
    });
}


function updateCountdown() {
    const now = new Date();

    // 年月日だけ比較用に抽出
    const todayStr = now.toISOString().slice(0, 10);        // "2025-06-28"
    const birthdayStr = birthday.toISOString().slice(0, 10); // "2025-06-28"

    // 🎉 誕生日当日
    if (todayStr === birthdayStr) {
        countdownEl.innerHTML = `🎉 <span class="birthday-script">Happy Birthday</span> 🎉
                                    <br> <span class="birthday-script">　 Remina</span> <span class="birthday-num">23</span> `;

        if (!hasCelebrated) {
            launchConfetti();  // クラッカーは1回だけ実行
            hasCelebrated = true;
        }

        return;
    }

    // 🎂 誕生日前のカウントダウン
    const diff = birthday - now;
    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    // 0埋めで2桁に
    const pad = (n) => String(n).padStart(2, '0');

    countdownEl.innerHTML =
        `Countdown to Birthday : <br><span class="cdtime"> ${days} days ${pad(hours)}:${pad(minutes)}:${pad(seconds)}</span>`;

}

// 実行
updateCountdown();
setInterval(updateCountdown, 1000);


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        //eはイベントオブジェクトといい、JavaScriptのイベント処理では、関数が自動的にイベントの情報を受け取る
        //eのメンバには、e.target：クリックされた要素そのもの、e.type："click" とか "submit"、e.preventDefault()：デフォルト動作を止める（リンクのジャンプなど）
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;

        const startY = window.scrollY;
        const endY = target.getBoundingClientRect().top + startY - 80; // ヘッダー高さ
        const distance = endY - startY;
        const duration = 1200; // ← ミリ秒でスクロール時間を自由に設定（例：1000 = 1秒）

        let startTime = null;

        //requestAnimationFrameの引数になるが、この関数内でまたrequestAnimaionFrameを呼ぶことで繰り返しコマ送りでアニメーションを作成
        function scrollStep(timestamp) { //timestampは、実行時はブラウザが自動で呼ぶ。今は引数名としてtimestampが書いてある
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percent = Math.min(progress / duration, 1); // 0〜1で進行

            window.scrollTo(0, startY + distance * easeInOutQuad(percent));

            if (progress < duration) {
                requestAnimationFrame(scrollStep);
            }
        }

        function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;  //時間の進み具合を調整。前半と後半で速さを変え、滑らかに
        }

        requestAnimationFrame(scrollStep);
    });
});


//------heart_movement
const heart = document.getElementById("heart"); //heartという定数にDOM取得

heart.addEventListener("click", function() { //DOMに対してadd_Event : click時のfunction
    //まず一回
    heart.classList.add("bigheart");
    setTimeout(() => heart.classList.remove("bigheart"), 200);

    //ここから繰り返し
    const stop_id = setInterval(() => {   //0.8秒ごとに繰り返し、clearInterval(stop_id)が来たらおわり
        heart.classList.add("bigheart"); //classlistは、CSSに追加　#heart.clickedでアクセス
        setTimeout(() => heart.classList.remove("bigheart"), 200); //0.2秒後にremove
    }, 600);
    setTimeout(() => clearInterval(stop_id), 1200);
});