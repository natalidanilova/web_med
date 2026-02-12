/* ============================================================
   Valentinok — мемные валентинки в стиле "Love is…"
   ============================================================ */

// ---------- База валентинок ----------
const valentines = [
  { headline: "Любовь — это варить кофе не только себе.", body: "И помнить: с молоком, без сахара и с твоей улыбкой." },
  { headline: "Любовь — это когда «доброе утро» важнее будильника.", body: "И день не начинается, пока ты не ответишь." },
  { headline: "Любовь — это делить плед и плейлист.", body: "И пересылать треки со словами: «Это чисто про нас»." },
  { headline: "Любовь — это знать пин‑код и не лезть.", body: "Потому что доверие — это новый роскошь." },
  { headline: "Любовь — это искать мемы специально для одного человека.", body: "И ржать в голос, когда он кидает тебе тот же самый." },
  { headline: "Любовь — это когда человек видел тебя в 6 утра и всё ещё рядом.", body: "Герой, не иначе." },
  { headline: "Любовь — это отправлять голосовые по 3 минуты.", body: "И слушать такие же в ответ, даже в метро." },
  { headline: "Любовь — это когда Wi‑Fi автоматически подключается у него дома.", body: "Ты тут уже свой." },
  { headline: "Любовь — это чувствовать себя в безопасности даже в хаосе.", body: "Потому что рядом кто‑то, кто помнит, как тебя успокоить." },
  { headline: "Любовь — это хотеть рассказать человеку даже мелочи.", body: "Типа какой кофе ты взяла и почему день вообще имеет смысл." },
  { headline: "Любовь — это когда молчание не неловкое.", body: "А просто тёплое." },
  { headline: "Любовь — это твой человек в избранных чатах.", body: "Навсегда закреплён. Без права на удаление." },
  { headline: "Любовь — это когда подруга скидывает скрин в 2 ночи.", body: "И ты точно знаешь, почему она думает о тебе." },
  { headline: "Любовь — это мемы, созвоны и «ты мне как сестра».", body: "Только лучше, потому что мы выбрали друг друга." },
  { headline: "Любовь — это наконец сказать себе: «Я — ок».", body: "Не идеальная, не «слишком». Просто — в самый раз." },
  { headline: "Любовь — это купить себе цветы в понедельник.", body: "Потому что ты заслуживаешь, и точка." },
  { headline: "Любовь — это когда он ставит телефон на зарядку за тебя.", body: "Настоящий рыцарь 2026 года." },
  { headline: "Любовь — это делиться последним кусочком пиццы.", body: "Ладно, половинкой. Но это уже подвиг." },
  { headline: "Любовь — это сказать «я не голодная» и есть из его тарелки.", body: "Классика. Проверено поколениями." },
  { headline: "Любовь — это знать, какой чай человек пьёт.", body: "И заваривать его ровно так, как нужно. Без вопросов." },
  { headline: "Любовь — это не читать сообщение и сразу звонить.", body: "Потому что голос лучше букв." },
  { headline: "Любовь — это разрешить человеку выбирать фильм.", body: "Даже если он опять выберет «Один дома»." },
  { headline: "Любовь — это когда скучаешь через 10 минут после прощания.", body: "И уже пишешь «доехала?»" },
  { headline: "Любовь — это сохранять его мемы в отдельную папку.", body: "«Избранное от него» — 847 файлов." },
  { headline: "Любовь — это терпеть его храп.", body: "И всё равно засыпать рядом, потому что без него хуже." },
  { headline: "Любовь — это смотреть сериал только вместе.", body: "Даже если ты уже на три серии впереди. Молча." },
  { headline: "Любовь — это когда «я тебя ненавижу» значит «обними меня».", body: "Перевод с языка любви: версия 2.0." },
  { headline: "Любовь — это помнить, чего человек боится.", body: "И держать за руку именно в этот момент." },
  { headline: "Любовь — это когда тебе не стыдно быть собой.", body: "Со всеми странностями, тараканами и голосовыми на 7 минут." },
  { headline: "Любовь — это не лайк, а репост с подписью «мой человек».", body: "Публичное признание уровня «бог»." },
];

// ---------- Палитры ----------
const palettes = [
  { bg1: "#fff3d6", bg2: "#ffe0ec", accent: "#ff4b8b", text: "#3b1431" },
  { bg1: "#d6f5ff", bg2: "#e8d6ff", accent: "#9b59f0", text: "#1e1040" },
  { bg1: "#fff0f0", bg2: "#ffd6d6", accent: "#e74c4c", text: "#3a1212" },
  { bg1: "#e6ffe6", bg2: "#d6fff0", accent: "#27ae60", text: "#0e2e1b" },
  { bg1: "#fff8d6", bg2: "#ffeed6", accent: "#f0a030", text: "#3a2a08" },
  { bg1: "#f0e6ff", bg2: "#ffe6f5", accent: "#c060e0", text: "#2a0a3a" },
];

// ---------- Константы ----------
const SITE_URL = "https://natalidanilova.github.io/web_med/";

// ---------- Состояние ----------
let currentIndex = -1;
let currentPalette = palettes[0];

// ---------- DOM ----------
const cnv = document.getElementById("card");
const ctx = cnv.getContext("2d");
const storiesCnv = document.getElementById("stories-canvas");
const storiesCtx = storiesCnv.getContext("2d");
const storiesPreview = document.getElementById("stories-preview");

document.getElementById("btn-generate").addEventListener("click", next);
document.getElementById("btn-download").addEventListener("click", download);
document.getElementById("btn-telegram").addEventListener("click", shareTelegram);
document.getElementById("btn-instagram").addEventListener("click", shareInstagram);

// ---------- Запуск ----------
next();

// ---------- Логика ----------
function next() {
  let idx;
  do { idx = Math.floor(Math.random() * valentines.length); } while (idx === currentIndex && valentines.length > 1);
  currentIndex = idx;
  currentPalette = palettes[Math.floor(Math.random() * palettes.length)];
  drawCard(cnv, ctx, cnv.width, cnv.height);
  drawStoriesPreview();
  storiesPreview.style.display = "block";
}

// ---------- Рисование карточки (универсальное) ----------
function drawCard(canvas, context, W, H) {
  const v = valentines[currentIndex];
  const p = currentPalette;
  const cx = context;

  // Фон
  const grad = cx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, p.bg1);
  grad.addColorStop(1, p.bg2);
  cx.fillStyle = grad;
  cx.fillRect(0, 0, W, H);

  // Декоративные сердечки
  cx.save();
  cx.globalAlpha = 0.12;
  cx.fillStyle = p.accent;
  for (let i = 0; i < 30; i++) {
    drawHeart(cx, 60 + Math.random() * (W - 120), 60 + Math.random() * (H - 120), 10 + Math.random() * (W * 0.03));
  }
  cx.restore();

  // Большое центральное сердце (водяной знак)
  cx.save();
  cx.globalAlpha = 0.07;
  cx.fillStyle = p.accent;
  drawHeart(cx, W / 2, H * 0.38, W * 0.27);
  cx.restore();

  // Рамка
  const inset = W * 0.04;
  const r = W * 0.035;
  cx.save();
  cx.strokeStyle = p.accent;
  cx.globalAlpha = 0.25;
  cx.lineWidth = Math.max(2, W * 0.004);
  roundRect(cx, inset, inset, W - 2 * inset, H - 2 * inset, r);
  cx.stroke();
  cx.restore();

  // «Love is…» сверху
  cx.save();
  cx.fillStyle = p.accent;
  cx.globalAlpha = 0.6;
  cx.font = "italic 600 " + (W * 0.035) + "px system-ui, sans-serif";
  cx.textAlign = "center";
  cx.fillText("Love is…", W / 2, H * 0.09);
  cx.restore();

  // Headline
  cx.save();
  cx.fillStyle = p.text;
  const padX = W * 0.09;
  const maxW = W - padX * 2;
  let fontSize = W * 0.052;
  if (v.headline.length > 30) fontSize = W * 0.045;
  if (v.headline.length > 50) fontSize = W * 0.038;
  const hFont = "700 " + fontSize + "px system-ui, sans-serif";
  const hLines = wrapText(cx, v.headline, maxW, hFont);
  cx.font = hFont;
  cx.textAlign = "center";
  cx.textBaseline = "top";
  const hLH = fontSize * 1.22;
  const hBlockH = hLines.length * hLH;
  const hStartY = (H / 2) - (hBlockH / 2) - H * 0.03;
  hLines.forEach(function(line, i) { cx.fillText(line, W / 2, hStartY + i * hLH); });
  cx.restore();

  // Body
  cx.save();
  cx.fillStyle = p.text;
  cx.globalAlpha = 0.7;
  const bFS = W * 0.03;
  const bFont = "400 " + bFS + "px system-ui, sans-serif";
  const bLines = wrapText(cx, v.body, maxW, bFont);
  cx.font = bFont;
  cx.textAlign = "center";
  cx.textBaseline = "top";
  const bLH = bFS * 1.3;
  const bStartY = H - H * 0.1 - bLines.length * bLH;
  bLines.forEach(function(line, i) { cx.fillText(line, W / 2, bStartY + i * bLH); });
  cx.restore();

  // Подпись
  cx.save();
  cx.fillStyle = p.accent;
  cx.globalAlpha = 0.35;
  cx.font = "600 " + (W * 0.02) + "px system-ui, sans-serif";
  cx.textAlign = "center";
  cx.fillText("valentinok ♥", W / 2, H - W * 0.025);
  cx.restore();
}

// ---------- Stories preview (9:16) ----------
function drawStoriesPreview() {
  var W = storiesCnv.width;
  var H = storiesCnv.height;
  var p = currentPalette;

  // Фон Stories (тёмный/тонированный)
  var grad = storiesCtx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, darken(p.bg1, 0.3));
  grad.addColorStop(1, darken(p.bg2, 0.3));
  storiesCtx.fillStyle = grad;
  storiesCtx.fillRect(0, 0, W, H);

  // Вставляем карточку по центру stories (с отступами)
  var cardSize = W * 0.82;
  var cardX = (W - cardSize) / 2;
  var cardY = (H - cardSize) / 2;

  // Тень под карточкой
  storiesCtx.save();
  storiesCtx.shadowColor = "rgba(0,0,0,0.35)";
  storiesCtx.shadowBlur = 24;
  storiesCtx.fillStyle = "#fff";
  storiesCtx.beginPath();
  storiesCtx.roundRect(cardX, cardY, cardSize, cardSize, 16);
  storiesCtx.fill();
  storiesCtx.restore();

  // Рисуем карточку на отдельном offscreen canvas
  var off = document.createElement("canvas");
  off.width = 800;
  off.height = 800;
  var offCtx = off.getContext("2d");
  drawCard(off, offCtx, 800, 800);

  // Вставляем в stories canvas
  storiesCtx.drawImage(off, cardX, cardY, cardSize, cardSize);

  // Свайп-подсказка внизу
  storiesCtx.save();
  storiesCtx.fillStyle = "rgba(255,255,255,0.7)";
  storiesCtx.font = "500 " + (W * 0.032) + "px system-ui, sans-serif";
  storiesCtx.textAlign = "center";
  storiesCtx.fillText("valentinok ♥ Отправь другу!", W / 2, H - 30);
  storiesCtx.restore();
}

function darken(hex, amount) {
  var r = parseInt(hex.slice(1,3), 16);
  var g = parseInt(hex.slice(3,5), 16);
  var b = parseInt(hex.slice(5,7), 16);
  r = Math.round(r * (1 - amount));
  g = Math.round(g * (1 - amount));
  b = Math.round(b * (1 - amount));
  return "#" + [r,g,b].map(function(c) { return c.toString(16).padStart(2,"0"); }).join("");
}

// ---------- Рисование сердца ----------
function drawHeart(cx, x, y, size) {
  cx.beginPath();
  var s = size;
  var top = y - s * 0.3;
  cx.moveTo(x, y + s * 0.3);
  cx.bezierCurveTo(x, top, x - s / 2, top, x - s / 2, y);
  cx.bezierCurveTo(x - s / 2, y + s * 0.4, x, y + s * 0.7, x, y + s * 0.7);
  cx.bezierCurveTo(x, y + s * 0.7, x + s / 2, y + s * 0.4, x + s / 2, y);
  cx.bezierCurveTo(x + s / 2, top, x, top, x, y + s * 0.3);
  cx.closePath();
  cx.fill();
}

// ---------- Скруглённый прямоугольник ----------
function roundRect(cx, x, y, w, h, r) {
  cx.beginPath();
  cx.moveTo(x + r, y);
  cx.lineTo(x + w - r, y);
  cx.quadraticCurveTo(x + w, y, x + w, y + r);
  cx.lineTo(x + w, y + h - r);
  cx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  cx.lineTo(x + r, y + h);
  cx.quadraticCurveTo(x, y + h, x, y + h - r);
  cx.lineTo(x, y + r);
  cx.quadraticCurveTo(x, y, x + r, y);
  cx.closePath();
}

// ---------- Перенос текста ----------
function wrapText(cx, text, maxWidth, font) {
  cx.font = font;
  var words = text.split(/\s+/);
  var lines = [];
  var cur = "";
  for (var i = 0; i < words.length; i++) {
    var test = cur ? cur + " " + words[i] : words[i];
    if (cx.measureText(test).width > maxWidth && cur) {
      lines.push(cur);
      cur = words[i];
    } else {
      cur = test;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

// ---------- Скачать ----------
function download() {
  var a = document.createElement("a");
  a.href = cnv.toDataURL("image/png");
  a.download = "valentinok.png";
  a.click();
}

// ---------- Telegram ----------
function shareTelegram() {
  var v = valentines[currentIndex];
  var text = encodeURIComponent(v.headline + "\n\n" + v.body + "\n\n♥ Открой мою валентинку:");
  var url = encodeURIComponent(SITE_URL);
  var tgUrl = "https://t.me/share/url?url=" + url + "&text=" + text;
  window.open(tgUrl, "_blank", "noopener");
}

// ---------- Instagram ----------
function shareInstagram() {
  // На мобильных: пытаемся через Web Share API отправить картинку напрямую
  if (navigator.share && navigator.canShare) {
    // Используем stories-canvas (формат 9:16 — идеально для stories)
    storiesCnv.toBlob(function(blob) {
      if (!blob) return;
      var file = new File([blob], "valentinok.png", { type: "image/png" });
      var shareData = {
        files: [file],
        title: "Valentinok ♥",
        text: valentines[currentIndex].headline + " — valentinok ♥"
      };
      if (navigator.canShare(shareData)) {
        navigator.share(shareData).catch(function() {
          // Если не получилось — deep link в Instagram
          openInstagramStories();
        });
        return;
      }
      openInstagramStories();
    }, "image/png");
    return;
  }
  // Fallback: deep link
  openInstagramStories();
}

function openInstagramStories() {
  // Instagram Stories deep link для мобильных
  // На iOS/Android пытаемся открыть Instagram напрямую
  var igUrl = "instagram://story-camera";
  window.location.href = igUrl;

  // Если не открылось через 2 секунды — открываем веб-версию
  setTimeout(function() {
    window.open("https://www.instagram.com/", "_blank", "noopener");
  }, 2000);
}
