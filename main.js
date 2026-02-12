/* ============================================================
   Valentinok — мемные валентинки в стиле "Love is…"
   ============================================================ */

// ---------- База валентинок ----------
const valentines = [
  // --- романтика ---
  { headline: "Любовь — это варить кофе не только себе.", body: "И помнить: с молоком, без сахара и с твоей улыбкой." },
  { headline: "Любовь — это когда «доброе утро» важнее будильника.", body: "И день не начинается, пока ты не ответишь." },
  { headline: "Любовь — это делить плед и плейлист.", body: "И пересылать треки со словами: «Это чисто про нас»." },
  { headline: "Любовь — это знать пин‑код и не лезть.", body: "Потому что доверие — это новый роскошь." },

  // --- мемы ---
  { headline: "Любовь — это искать мемы специально для одного человека.", body: "И ржать в голос, когда он кидает тебе тот же самый." },
  { headline: "Любовь — это когда человек видел тебя в 6 утра и всё ещё рядом.", body: "Герой, не иначе." },
  { headline: "Любовь — это отправлять голосовые по 3 минуты.", body: "И слушать такие же в ответ, даже в метро." },
  { headline: "Любовь — это когда Wi‑Fi автоматически подключается у него дома.", body: "Ты тут уже свой." },

  // --- нежность ---
  { headline: "Любовь — это чувствовать себя в безопасности даже в хаосе.", body: "Потому что рядом кто‑то, кто помнит, как тебя успокоить." },
  { headline: "Любовь — это хотеть рассказать человеку даже мелочи.", body: "Типа какой кофе ты взяла и почему день вообще имеет смысл." },
  { headline: "Любовь — это когда молчание не неловкое.", body: "А просто тёплое." },
  { headline: "Любовь — это твой человек в избранных чатах.", body: "Навсегда закреплён. Без права на удаление." },

  // --- дружба ---
  { headline: "Любовь — это когда подруга скидывает скрин из твиттера в 2 ночи.", body: "И ты точно знаешь, почему она думает о тебе." },
  { headline: "Любовь — это мемы, созвоны и «ты мне как сестра».", body: "Только лучше, потому что мы выбрали друг друга." },

  // --- self-love ---
  { headline: "Любовь — это наконец сказать себе: «Я — ок».", body: "Не идеальная, не «слишком». Просто — в самый раз." },
  { headline: "Любовь — это купить себе цветы в понедельник.", body: "Потому что ты заслуживаешь, и точка." },

  // --- мемы v2 ---
  { headline: "Любовь — это когда он ставит телефон на зарядку за тебя.", body: "Настоящий рыцарь 2026 года." },
  { headline: "Любовь — это делиться последним кусочком пиццы.", body: "Ладно, половинкой. Но это уже подвиг." },
  { headline: "Любовь — это сказать «я не голодная» и есть из его тарелки.", body: "Классика. Проверено поколениями." },
  { headline: "Любовь — это знать, какой чай человек пьёт.", body: "И заваривать его ровно так, как нужно. Без вопросов." },
  { headline: "Любовь — это не читать сообщение и сразу звонить.", body: "Потому что голос лучше букв." },
  { headline: "Любовь — это разрешить человеку выбирать фильм.", body: "Даже если он опять выберет «Один дома»." },
  { headline: "Любовь — это когда скучаешь через 10 минут после прощания.", body: "И уже пишешь «доехала?»" },
  { headline: "Любовь — это сохранять его мемы в отдельную папку.", body: "«Избранное от него» — 847 файлов." },
];

// ---------- Палитры фона ----------
const palettes = [
  { bg1: "#fff3d6", bg2: "#ffe0ec", accent: "#ff4b8b", text: "#3b1431" },
  { bg1: "#d6f5ff", bg2: "#e8d6ff", accent: "#9b59f0", text: "#1e1040" },
  { bg1: "#fff0f0", bg2: "#ffd6d6", accent: "#e74c4c", text: "#3a1212" },
  { bg1: "#e6ffe6", bg2: "#d6fff0", accent: "#27ae60", text: "#0e2e1b" },
  { bg1: "#fff8d6", bg2: "#ffeed6", accent: "#f0a030", text: "#3a2a08" },
  { bg1: "#f0e6ff", bg2: "#ffe6f5", accent: "#c060e0", text: "#2a0a3a" },
];

// ---------- Состояние ----------
let currentIndex = -1;
let currentPalette = palettes[0];

// ---------- DOM ----------
const cnv = document.getElementById("card");
const ctx = cnv.getContext("2d");

document.getElementById("btn-generate").addEventListener("click", next);
document.getElementById("btn-download").addEventListener("click", download);
document.getElementById("btn-telegram").addEventListener("click", shareTelegram);
document.getElementById("btn-instagram").addEventListener("click", shareInstagram);

// ---------- Запуск ----------
next(); // сразу показать первую

// ---------- Логика ----------
function next() {
  // Случайный индекс, отличный от текущего
  let idx;
  do { idx = Math.floor(Math.random() * valentines.length); } while (idx === currentIndex && valentines.length > 1);
  currentIndex = idx;
  currentPalette = palettes[Math.floor(Math.random() * palettes.length)];
  draw();
}

function draw() {
  const v = valentines[currentIndex];
  const p = currentPalette;
  const W = cnv.width;
  const H = cnv.height;

  // Фон — мягкий градиент
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, p.bg1);
  grad.addColorStop(1, p.bg2);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Декоративные сердечки
  ctx.save();
  ctx.globalAlpha = 0.12;
  ctx.fillStyle = p.accent;
  for (let i = 0; i < 30; i++) {
    drawHeart(
      60 + Math.random() * (W - 120),
      60 + Math.random() * (H - 120),
      10 + Math.random() * 22
    );
  }
  ctx.restore();

  // Большое центральное сердце (водяной знак)
  ctx.save();
  ctx.globalAlpha = 0.07;
  ctx.fillStyle = p.accent;
  drawHeart(W / 2, H * 0.38, 220);
  ctx.restore();

  // Рамка
  const inset = 30;
  const r = 28;
  ctx.save();
  ctx.strokeStyle = p.accent;
  ctx.globalAlpha = 0.25;
  ctx.lineWidth = 3;
  roundRect(inset, inset, W - 2 * inset, H - 2 * inset, r);
  ctx.stroke();
  ctx.restore();

  // «Love is…» надпись сверху
  ctx.save();
  ctx.fillStyle = p.accent;
  ctx.globalAlpha = 0.6;
  ctx.font = "italic 600 28px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Love is…", W / 2, 72);
  ctx.restore();

  // Headline
  ctx.save();
  ctx.fillStyle = p.text;
  const padX = 70;
  const maxW = W - padX * 2;
  let fontSize = 42;
  if (v.headline.length > 30) fontSize = 36;
  if (v.headline.length > 50) fontSize = 30;
  const hFont = `700 ${fontSize}px system-ui, sans-serif`;
  const hLines = wrapText(v.headline, maxW, fontSize, hFont);
  ctx.font = hFont;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  const hLineHeight = fontSize * 1.22;
  const hBlockH = hLines.length * hLineHeight;
  const hStartY = (H / 2) - (hBlockH / 2) - 20;
  hLines.forEach((line, i) => ctx.fillText(line, W / 2, hStartY + i * hLineHeight));
  ctx.restore();

  // Body
  ctx.save();
  ctx.fillStyle = p.text;
  ctx.globalAlpha = 0.7;
  const bFontSize = 24;
  const bFont = `400 ${bFontSize}px system-ui, sans-serif`;
  const bLines = wrapText(v.body, maxW, bFontSize, bFont);
  ctx.font = bFont;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  const bLineH = bFontSize * 1.3;
  const bStartY = H - 80 - bLines.length * bLineH;
  bLines.forEach((line, i) => ctx.fillText(line, W / 2, bStartY + i * bLineH));
  ctx.restore();

  // Подпись внизу
  ctx.save();
  ctx.fillStyle = p.accent;
  ctx.globalAlpha = 0.35;
  ctx.font = "600 16px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("valentinok ♥", W / 2, H - 22);
  ctx.restore();
}

// ---------- Рисование сердца ----------
function drawHeart(cx, cy, size) {
  ctx.beginPath();
  const s = size;
  const top = cy - s * 0.3;
  ctx.moveTo(cx, cy + s * 0.3);
  ctx.bezierCurveTo(cx, top, cx - s / 2, top, cx - s / 2, cy);
  ctx.bezierCurveTo(cx - s / 2, cy + s * 0.4, cx, cy + s * 0.7, cx, cy + s * 0.7);
  ctx.bezierCurveTo(cx, cy + s * 0.7, cx + s / 2, cy + s * 0.4, cx + s / 2, cy);
  ctx.bezierCurveTo(cx + s / 2, top, cx, top, cx, cy + s * 0.3);
  ctx.closePath();
  ctx.fill();
}

// ---------- Скруглённый прямоугольник ----------
function roundRect(x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// ---------- Перенос текста ----------
function wrapText(text, maxWidth, fontSize, font) {
  ctx.font = font;
  const words = text.split(/\s+/);
  const lines = [];
  let cur = "";
  for (const w of words) {
    const test = cur ? cur + " " + w : w;
    if (ctx.measureText(test).width > maxWidth && cur) {
      lines.push(cur);
      cur = w;
    } else {
      cur = test;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

// ---------- Скачать ----------
function download() {
  const a = document.createElement("a");
  a.href = cnv.toDataURL("image/png");
  a.download = "valentinok.png";
  a.click();
}

// ---------- Telegram ----------
function shareTelegram() {
  const v = valentines[currentIndex];

  // Сначала скачиваем картинку, чтобы пользователь мог приложить
  download();

  // Потом открываем Telegram share с текстом
  const text = encodeURIComponent(v.headline + "\n\n" + v.body + "\n\n♥ valentinok");
  const url = "https://t.me/share/url?url=" + encodeURIComponent("https://valentinok.love") + "&text=" + text;
  window.open(url, "_blank", "noopener");
}

// ---------- Instagram ----------
function shareInstagram() {
  // Скачиваем картинку для stories
  download();

  // Пытаемся Web Share API (мобильные)
  if (navigator.share && navigator.canShare) {
    cnv.toBlob(function(blob) {
      if (!blob) return;
      const file = new File([blob], "valentinok.png", { type: "image/png" });
      const shareData = { files: [file], title: "Valentinok", text: "Моя валентинка ♥" };
      if (navigator.canShare(shareData)) {
        navigator.share(shareData).catch(function() {});
      }
    }, "image/png");
  }
}
