const questions = [...document.querySelectorAll('[data-question]')];
const checkButton = document.querySelector('#check-answers');
const overallFeedback = document.querySelector('#overall-feedback');
const accessCodePanel = document.querySelector('#access-code-panel');
const progressText = document.querySelector('#progress-text');
const progressBar = document.querySelector('#progress-bar');

function updateProgress() {
  const answered = questions.filter((question) => question.querySelector('input:checked')).length;
  progressText.textContent = `${answered} of ${questions.length} answered`;
  progressBar.style.width = `${(answered / questions.length) * 100}%`;
}

function checkAnswers() {
  let correctCount = 0;
  let firstUnanswered = null;

  questions.forEach((question) => {
    const selected = question.querySelector('input:checked');
    const feedback = question.parentElement.querySelector('.feedback');

    feedback.classList.remove('correct', 'incorrect');

    if (!selected) {
      feedback.textContent = 'Choose an answer before checking your work.';
      feedback.classList.add('incorrect');
      firstUnanswered ??= question;
      return;
    }

    if (selected.value === question.dataset.answer) {
      correctCount += 1;
      feedback.textContent = 'Correct.';
      feedback.classList.add('correct');
    } else {
      feedback.textContent = 'Not quite. Review the section above and try again.';
      feedback.classList.add('incorrect');
    }
  });

  if (correctCount === questions.length) {
    overallFeedback.textContent = 'Excellent work. You answered all five questions correctly.';
    overallFeedback.style.color = 'var(--success)';
    accessCodePanel.hidden = false;
    accessCodePanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    overallFeedback.textContent = `${correctCount} of ${questions.length} answers are correct. Review any marked questions and try again.`;
    overallFeedback.style.color = 'var(--error)';
    accessCodePanel.hidden = true;
    firstUnanswered?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

document.addEventListener('change', updateProgress);
checkButton.addEventListener('click', checkAnswers);
updateProgress();
