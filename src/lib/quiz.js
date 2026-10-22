/**
 * @typedef {object} Question
 * @property {string} category Flokkur spurningar
 * @property {string} question Spurningin sjálf
 * @property {string} answer Rétt svar
 */

/**
 * @typedef {object} Result
 * @property {string} category Flokkur spurningar
 * @property {string} question Spurningin sjálf
 * @property {string} answer Svar notanda
 * @property {string} correctAnswer Rétt svar
 * @property {boolean} correct `true` ef notandi svaraði rétt
 */

/**
 * @typedef {object} Stats
 * @property {number} played Fjöldi spilaðra leikja
 * @property {number} correct Fjöldi réttra svara
 * @property {number} incorrect Fjöldi rangra svara
 */

/**
 * Stokkar fylki.
 * @template T
 * @param {T[]} array Fylki sem á að stokka
 * @returns {T[]} Nýtt, stokkað fylki
 */
export function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Velur `count` spurningar af handahófi, engin spurning er valin oftar en einu sinni.
 * @param {Question[]} questions Allar spurningar
 * @param {number} count Fjöldi spurninga sem á að velja
 * @returns {Question[]} Valdar spurningar
 */
export function pickQuestions(questions, count) {
  /* TODO útfæra */
  const shuffledQuestions = shuffle(questions);
  return shuffledQuestions.slice(0, count);
}

/**
 * Athugar hvort svar sé rétt.
 * Hunsar bil í byrjun og enda og há- og lágstafi.
 * @param {string} answer Svar notanda
 * @param {string} correctAnswer Rétt svar
 * @returns {boolean} `true` ef svar er rétt
 */
export function isCorrect(answer, correctAnswer) {
  const normalizedAnswer = answer.trim().toLowerCase();
  const normalizedCorrectAnswer = correctAnswer.trim().toLowerCase();
  return normalizedAnswer === normalizedCorrectAnswer;
}

/**
 * Býr til niðurstöður út frá spurningum og svörum notanda, í sömu röð.
 * @param {Question[]} questions Spurningar sem voru spurðar
 * @param {string[]} answers Svör notanda, í sömu röð og spurningar
 * @returns {Result[]} Niðurstöður
 */
export function createResults(questions, answers) {
  return questions.map((question, index) => {
    const userAnswer = answers[index];
    const correctAnswer = question.answer;
    const correct = isCorrect(userAnswer, correctAnswer);
    return {
      category: question.category,
      question: question.question,
      answer: userAnswer,
      correctAnswer: correctAnswer,
      correct: correct,
    };
  });
}

/**
 * Telur fjölda réttra svara í niðurstöðum.
 * @param {Result[]} results Niðurstöður
 * @returns {number} Fjöldi réttra svara
 */
export function countCorrect(results) {
  return results.filter(result => result.correct).length;
}

/**
 * Uppfærir tölfræði með niðurstöðum úr leik. Breytir ekki `stats`.
 * @param {Stats} stats Tölfræði fyrir leik
 * @param {Result[]} results Niðurstöður leiks
 * @returns {Stats} Ný tölfræði
 */
export function updateStats(stats, results) {
  const correctCount = countCorrect(results);
  const incorrectCount = results.length - correctCount;
  return {
    played: stats.played + 1,
    correct: stats.correct + correctCount,
    incorrect: stats.incorrect + incorrectCount,
  };
}
