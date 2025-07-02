// Quiz.js
'use strict';

const quizData = [
  {
    question: 'HTML の正式名称はどれ？',
    choices : ['Hyper Text Makeup Language',
               'Highlevel Text Markup Language',
               'Hyper Text Markup Language',
               'Hyperlink Text Markdown Language'],
    answer  : 2                // 0-index で 3 番目が正解
  },
  {
    question: 'Git でコミット履歴を確認するコマンドは？',
    choices : ['git status', 'git log', 'git add', 'git push'],
    answer  : 1
  },
  {
    question: 'JavaScript の変数宣言で再代入不可なのは？',
    choices : ['var', 'let', 'const', 'static'],
    answer  : 2
  }
];

let current = 0;

const $q      = document.getElementById('question');
const $choice = document.getElementById('choices');
const $result = document.getElementById('result');
const $next   = document.getElementById('next');

function loadQuestion() {
  const q = quizData[current];
  $q.textContent = `Q${current + 1}. ${q.question}`;
  $choice.innerHTML = '';      // クリア
  $result.textContent = '';
  $next.hidden = true;

  q.choices.forEach((text, idx) => {
    const btn = document.createElement('button');
    btn.textContent = text;
    btn.className = 'choice';
    btn.onclick = () => selectAnswer(idx);
    $choice.appendChild(btn);
  });
}

function selectAnswer(idx) {
  const correct = quizData[current].answer;
  Array.from($choice.children).forEach((b, i) => {
    b.style.pointerEvents = 'none';
    if (i === correct) b.style.borderColor = 'green';
    if (i === idx && i !== correct) b.style.borderColor = 'red';
  });

  $result.textContent = (idx === correct) ? '正解！' : '不正解…';
  $next.hidden = false;
}

$next.onclick = () => {
  if (++current < quizData.length) {
    loadQuestion();
  } else {
    $q.textContent = 'クイズ終了！';
    $choice.innerHTML = '';
    $result.textContent = `あなたの正答率: ${
      Math.round(100 *
        quizData.filter((q, i) => q.answer === +sessionStorage.getItem(i)).length /
        quizData.length)
    }%`;
    $next.hidden = true;
  }
};

loadQuestion();
