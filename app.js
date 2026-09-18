function calc1rm(){
  const w=+document.querySelector('#weight').value;
  const r=+document.querySelector('#reps').value;
  const exercise=document.querySelector('#exercise')?.value||'';
  if(!(w>0&&r>0)) return;

  // 화면에서 확인한 종목별 RM 비율표(1RM 대비 수행중량 비율).
  // 100kg x 5회 기준: 벤치프레스 115kg, 오버헤드프레스 110kg.
  const rmRatio={
    '벤치프레스':[null,1,111.1/115,106.5/115,103.1/115,100/115,97.5/115,94.3/115,91.6/115,89.2/115,86.8/115,84.6/115,82.4/115],
    '오버헤드프레스':[null,1,107.8/110,104.8/110,101.9/110,100/110,98.2/110,95.7/110,93.2/110,91.7/110,89.4/110,88/110,86.6/110],
    '데드리프트':[null,1,109.3/116.4,103/116.4,101.5/116.4,100/116.4,98.6/116.4,97.2/116.4,95.4/116.4,94.5/116.4,93.9/116.4,92.4/116.4,90.9/116.4],
    '스쿼트':[null,1,114.6/120,106.2/120,103.7/120,100/120,96.6/120,93.5/120,90.5/120,87.7/120,85.1/120,82.6/120,80.3/120]
  };

  let one, note;
  if(rmRatio[exercise] && r<=12){
    one=w/rmRatio[exercise][r];
    note=exercise+' 종목별 반복 계수 기준 · 실제 최대중량과 차이가 날 수 있습니다.';
  }else{
    one=r===1?w:w*(1+r/30);
    note='Epley 공식 기준 · 실제 최대중량과 차이가 날 수 있습니다.';
  }
  const rounded = n => (Math.round(n * 10) / 10).toFixed(1);
  const levels = [['고강도', .90], ['스트렝스', .85], ['볼륨', .75], ['자세 점검', .65]];
  const reps = Array.from({length: 12}, (_, i) => i + 1);
  const values = reps.map(n => {
    if (rmRatio[exercise] && rmRatio[exercise][n]) return one * rmRatio[exercise][n];
    return n === 1 ? one : one / (1 + n / 30);
  });
  document.querySelector('#out').className = 'result rm-result';
  document.querySelector('#out').innerHTML = `<div class="rm-summary"><div><span class="rm-label">예상 1RM</span><strong>${rounded(one)} kg</strong><p>${exercise} · ${w} kg × ${r}회 기준</p></div><span class="rm-tip">실제 최대 시도 전에는 워밍업과 보조자를 챙겨주세요.</span></div><div class="rm-levels">${levels.map(([name, ratio]) => `<div class="rm-box"><span>${name}</span><b>${rounded(one * ratio)} kg</b><small>1RM ${Math.round(ratio * 100)}%</small></div>`).join('')}</div><h3>반복 수별 예상 중량</h3><div class="rm-reps">${reps.map((n, i) => `<div class="rm-box ${n === r ? 'active' : ''}"><span>${n}RM ${n === r ? '<b>입력한 횟수</b>' : ''}</span><strong>${rounded(values[i])} kg</strong></div>`).join('')}</div><p class="rm-note">${note}</p>`;
}
