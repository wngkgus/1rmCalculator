function calc1rm() {
  const weight = Number(document.querySelector('#weight')?.value);
  const reps = Number(document.querySelector('#reps')?.value);
  const exercise = document.querySelector('#exercise')?.value || '운동';
  const result = document.querySelector('#out');

  if (!Number.isFinite(weight) || weight <= 0 || !Number.isInteger(reps) || reps < 1 || reps > 10) {
    result.textContent = '중량은 0보다 크게, 반복 횟수는 1~10회의 정수로 입력해 주세요.';
    return;
  }

  const epley = reps === 1 ? weight : weight * (1 + reps / 30);
  const brzycki = reps === 1 ? weight : weight * 36 / (37 - reps);
  const estimate = (epley + brzycki) / 2;
  const format = value => (Math.round(value * 10) / 10).toFixed(1);
  const percentages = [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50];

  result.className = 'result rm-result';
  result.innerHTML = '<h2>예상 1RM ' + format(estimate) + ' kg</h2>' +
    '<p>' + exercise + ': ' + format(weight) + ' kg × ' + reps + '회 기록 기준</p>' +
    '<ul><li>Epley: ' + format(epley) + ' kg</li><li>Brzycki: ' + format(brzycki) + ' kg</li></ul>' +
    '<p>두 공식 평균을 참고값으로 표시합니다. 개인의 반복 능력과 운동 방식에 따라 실제 최대중량과 다를 수 있습니다.</p>' +
    '<h3>예상 1RM 기준 훈련 중량</h3>' +
    '<table><thead><tr><th>강도</th><th>중량</th></tr></thead><tbody>' +
    percentages.map(percent => '<tr><td>' + percent + '%</td><td>' + format(estimate * percent / 100) + ' kg</td></tr>').join('') +
    '</tbody></table><p>이 비율은 중량 환산용이며 해당 강도에서 가능한 반복 횟수를 보장하지 않습니다. 고중량을 직접 시험할 때는 세이프티 장비와 보조자를 사용하세요.</p>';
}
