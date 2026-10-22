import { el, empty, setText } from './elements.js';

/**
 * @typedef {"start" | "question" | "results"} Screen
 */

/**
 * Allir mögulegir skjáir.
 * @type {Screen[]}
 */
const SCREENS = ['start', 'question', 'results'];

/**
 * Sýnir skjá `name` og felur aðra.
 * @param {Screen} name Skjár sem á að sýna
 * @returns {void}
 */
export function showScreen(name) {
  SCREENS.forEach(screen => {
    const element = document.querySelector('.' + screen);
    if (screen === name) {
      element.classList.remove('hidden');
    } else {
      element.classList.add('hidden');
    }
  });
}

/**
 * Birtir tölfræði á upphafsskjá.
 * @param {import("./quiz.js").Stats} stats Tölfræði
 * @returns {void}
 */
export function renderStats(stats) {
  setText('.stats-played', stats.played.toString());
  setText('.stats-correct', stats.correct.toString());
  setText('.stats-incorrect', stats.incorrect.toString());
}

/**
 * Birtir spurningu, tæmir svarreit og setur fókus á hann.
 * @param {import("./quiz.js").Question} question Spurning
 * @param {number} num Númer spurningar, byrjar á 1
 * @param {number} total Heildarfjöldi spurninga
 * @returns {void}
 */
export function renderQuestion(question, num, total) {
  setText('.current', num.toString());
  setText('.total', total.toString());
  setText('.category', question.category);
  setText('.question-text', question.question);
  const answerInput = document.querySelector('#answer');
  answerInput.value = '';
  answerInput.focus();
}

/**
 * Birtir niðurstöður leiks.
 * @param {import("./quiz.js").Result[]} results Niðurstöður
 * @param {number} correctCount Fjöldi réttra svara
 * @returns {void}
 */
export function renderResults(results, correctCount) {
  correctCount = correctCount.toString();
  setText('.correct-count', correctCount);
  setText('.results .total', results.length.toString());
  const resultsList = document.querySelector('.results-list');
  empty(resultsList);
  for (const result of results) {
    const li = el('li', { class: result.correct ? 'result correct' : 'result incorrect' },
      el('p', { class: 'result-category' }, result.category),
      el('p', { class: 'result-question' }, result.question),
      el('p', {}, 'Þitt svar: ', el('span', { class: 'result-answer' }, result.answer ? result.answer : 'Ekkert svar')),
      el('p', {}, 'Rétt svar: ', el('span', { class: 'result-correct' }, result.correctAnswer)),
    );
    resultsList.appendChild(li);
  }
}
