const wordSets = {
  greeting: [
    { word: "Magandang umaga", meaning: "おはよう" },
    { word: "Magandang hapon", meaning: "こんにちは" },
    { word: "Magandang gabi", meaning: "おやすみ" },
    { word: "Kumusta?", meaning: "元気？" },
    { word: "Kumusta ka ba?", meaning: "あなた元気？" },
    { word: "Mabuti ako", meaning: "私元気" },
    { word: "Antok ako", meaning: "私ねむい" },
    { word: "Hindi ako antok", meaning: "私ねむくない" },
    { word: "Hindi (pa) ako antok", meaning: "私（まだ）眠くない" },
    { word: "Antok ka ba", meaning: "あなたねむい？" },
    { word: "Tulog ka na", meaning: "もう寝てね／おやすみ" },
    { word: "Ingat po", meaning: "take care" }
  ],

  eating: [
    { word: "Masarap", meaning: "おいしい" },
    { word: "Mukhang masarap", meaning: "おいしそう" },
    { word: "Salamat po sa pagkain", meaning: "ごちそうさま" },
    { word: "Pagkain", meaning: "食事／食べ物" },
    { word: "Salamat po, Panginoon", meaning: "主よ感謝します" },
    { word: "Panginoon", meaning: "主／Lord" },
    { word: "Gutom", meaning: "お腹すいた" },
    { word: "Gutom (na) ako", meaning: "私は（もう）お腹すいた" },
    { word: "Gutom ako", meaning: "私お腹すいた" },
    { word: "Hindi ako gutom", meaning: "私お腹すいてない" },
    { word: "Hindi (pa) ako gutom", meaning: "私（まだ）お腹すいてない" }
  ],

  responding: [
    { word: "Oo / Opo", meaning: "yes" },
    { word: "Hindi / Hindi po", meaning: "no" },
    { word: "Wala", meaning: "ない／いない" },
    { word: "Sige", meaning: "OK／了解" },
    { word: "Salamat", meaning: "ありがとう" },
    { word: "Walang anuman", meaning: "どういたしまして" },
    { word: "Ingat po", meaning: "take care" },
    { word: "Bakit", meaning: "Why" },
    { word: "Sigurado ka ba?", meaning: "Are you sure?" },
    { word: "Aray", meaning: "ouch" },
    { word: "Bilis", meaning: "hurry up" },
    { word: "Tara", meaning: "let’s go" },
    { word: "Tama", meaning: "correct／truth" },
    { word: "Mali", meaning: "incorrect／false" },
    { word: "Konti", meaning: "a bit" }
  ],

  daily: [
    { word: "Ano 'yan?", meaning: "what is that?" },
    { word: "Pasalubong", meaning: "お土産" },
    { word: "Salamat", meaning: "ありがとう" },
    { word: "Walang anuman", meaning: "どういたしまして" },
    { word: "Pogi", meaning: "Kamu" },
    { word: "Pogi ka", meaning: "あなたかっこいい" },
    { word: "Maganda", meaning: "Raquel" },
    { word: "Maganda ka", meaning: "あなたかわいい" },
    { word: "Siyempre", meaning: "もちろん／いつも／ずっと" },
    { word: "Pangit", meaning: "ugly" },
    { word: "Baliw", meaning: "crazy" },
    { word: "Pangit ka", meaning: "you are ugly" },
    { word: "Salamat po, Panginoon", meaning: "主よ感謝します" },
    { word: "Panginoon", meaning: "主／Lord" },
    { word: "Kapitbahay", meaning: "neighbor" }
  ],

  coming: [
    { word: "Coming Soon", meaning: "工事中" }
  ]
};


/* ==============================
   画面の一覧
============================== */

const screenIds = [
  "modeSelect",
  "flashcardHome",
  "wordListHome",
  "wordListPlaceholder",
  "flashcardStudy"
];


/* ==============================
   単語帳で使用する変数
============================== */

let currentSet = [];
let index = 0;


/* ==============================
   指定した画面だけ表示する
============================== */

function showScreen(screenId) {
  screenIds.forEach(function (id) {
    const screen = document.getElementById(id);

    if (id === screenId) {
      screen.hidden = false;
    } else {
      screen.hidden = true;
    }
  });
}


/* ==============================
   学習方法選択 → 単語帳
============================== */

function openFlashcardHome() {
  showScreen("flashcardHome");
}


/* ==============================
   学習方法選択 → 単語集
============================== */

function openWordListHome() {
  showScreen("wordListHome");
}


/* ==============================
   学習方法選択画面に戻る
============================== */

function backToModeSelect() {
  showScreen("modeSelect");
}


/* ==============================
   単語帳を開始する
============================== */

function startFlashcard(categoryName) {
  const selectedSet = wordSets[categoryName];

  if (!selectedSet || selectedSet.length === 0) {
    return;
  }

  currentSet = selectedSet;
  index = 0;

  showScreen("flashcardStudy");
  showWord();
}


/* ==============================
   単語帳のジャンル選択に戻る
============================== */

function backToFlashcardHome() {
  showScreen("flashcardHome");
}


/* ==============================
   単語集の準備中画面を開く
============================== */

function openWordListPlaceholder(categoryName) {
  const title = document.getElementById("wordListTitle");

  title.textContent = categoryName + "の単語集";

  showScreen("wordListPlaceholder");
}


/* ==============================
   単語集のジャンル選択に戻る
============================== */

function backToWordListHome() {
  showScreen("wordListHome");
}


/* ==============================
   現在の単語を表示する
============================== */

function showWord() {
  if (currentSet.length === 0) {
    return;
  }

  const wordElement = document.getElementById("word");
  const meaningElement = document.getElementById("meaning");

  wordElement.textContent = currentSet[index].word;
  meaningElement.textContent = "???";
}


/* ==============================
   意味を表示する
============================== */

function showMeaning() {
  if (currentSet.length === 0) {
    return;
  }

  const meaningElement = document.getElementById("meaning");

  meaningElement.textContent = currentSet[index].meaning;
}


/* ==============================
   前の単語へ
============================== */

function prevWord() {
  if (currentSet.length === 0) {
    return;
  }

  index =
    (index - 1 + currentSet.length)
    % currentSet.length;

  showWord();
}


/* ==============================
   次の単語へ
============================== */

function nextWord() {
  if (currentSet.length === 0) {
    return;
  }

  index =
    (index + 1)
    % currentSet.length;

  showWord();
}
