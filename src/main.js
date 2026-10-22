import { questions } from './lib/questions.js';
import { renderQuestion, showScreen, renderResults, renderStats} from './lib/ui.js';
import { pickQuestions, createResults, countCorrect, updateStats } from './lib/quiz.js';

/* TODO importa úr hinum skránum */

/** Fasti sem segir til um hversu margar spurningar við sýnum. */
const NUMBER_OF_QUESTIONS = 4;

/**
 * Staða leiks, heldur utanum tölfræði, spurningar í núverandi leik,
 * svör notanda í núverandi leik og á hvaða spurningu við erum.
 * @type {{
 *   stats: import("./lib/quiz.js").Stats,
 *   questions: import("./lib/quiz.js").Question[],
 *   answers: string[],
 *   current: number,
 * }}
 */
const state = {
  stats: { played: 0, correct: 0, incorrect: 0 },
  questions: [],
  answers: [],
  current: 0,
};

/**
 * Byrjar nýjan leik og sýnir fyrstu spurningu.
 * @returns {void}
 */
function start() {
  /* TODO velja spurningar, endursetja stöðu, sýna fyrsta skjá */
  state.questions = pickQuestions(questions, NUMBER_OF_QUESTIONS);
  state.answers = [];
  state.current = 0;
  renderQuestion(state.questions[state.current], state.current + 1, NUMBER_OF_QUESTIONS);
  showScreen('question');
}

/**
 * Klárar leik, uppfærir tölfræði og sýnir niðurstöður.
 * @returns {void}
 */
function finish() {
  /* TODO uppfæra stöðu, birta stöðu og sýna seinasta skjá */
  const results = createResults(state.questions, state.answers);
  const correctCount = countCorrect(results);
  state.stats = updateStats(state.stats, results);
  renderResults(results, correctCount);
  showScreen('results');
}

/**
 * Vistar svar við núverandi spurningu og sýnir næstu, eða niðurstöður ef
 * öllum spurningum hefur verið svarað.
 * @param {string} text Svar notanda
 * @returns {void}
 */
function submitAnswer(text) {
  /* TODO skrá stöðu svars, klára ef seinasta spurning, annars sýna næstu */
  state.answers.push(text);
  state.current += 1;
  if (state.current >= state.questions.length) {
    finish();
  } 
  else {
    renderQuestion(state.questions[state.current], state.current + 1, NUMBER_OF_QUESTIONS);
  }
}

/**
 * Fer aftur á upphafsskjá með uppfærðri tölfræði.
 * @returns {void}
 */
function restart() {
  /* TODO sýna upphafsskjá og stöðu */
  renderStats(state.stats);
  showScreen('start');
}

function initialize() {
  /* TODO finna öll element, tengja form, sýna upphafsstöðu og upphafsskjá */
  const byrja = document.querySelector('.start-button');
  byrja.addEventListener('click', start);
  const aftur = document.querySelector('.restart-button');
  aftur.addEventListener('click', restart);
  const form = document.querySelector('.answer-form');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const answerInput = document.querySelector('#answer');
    const answer = answerInput.value;
    submitAnswer(answer);
  });
  renderStats(state.stats);
  showScreen('start');
}

initialize( );