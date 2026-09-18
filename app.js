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
document.addEventListener('DOMContentLoaded',()=>{const wrap=document.querySelector('.wrap');if(!wrap||document.querySelector('.strength-faq'))return;const section=document.createElement('section');section.className='section strength-faq';section.innerHTML=`<div class="faq-heading"><span>TRAINING GUIDE</span><h2>스트렝스 향상 FAQ</h2><p>운동 강도와 회복에 대해 자주 묻는 질문을 정리했습니다.</p></div><div class="faq-list"><details class="faq-item"><summary>전날 탄수화물을 먹으면 다음 날 힘이 좋아지나요?</summary><p>탄수화물은 근육 글리코겐을 채워 고강도 운동에 필요한 에너지를 공급합니다. 전날 밥, 감자, 고구마처럼 소화가 잘되는 탄수화물을 평소 식사량에 맞춰 섭취하면 다음 날 중량감과 집중력에 도움이 될 수 있습니다. 갑자기 과식하기보다는 익숙한 식사를 유지하세요.</p></details><details class="faq-item"><summary>수분 섭취가 스트렝스에 영향을 주나요?</summary><p>수분이 부족하면 피로감과 집중력 저하로 운동 수행력이 떨어질 수 있습니다. 운동 전부터 물을 나누어 마시고, 땀을 많이 흘린 날에는 전해질도 확인하세요. 단시간에 과도하게 마시는 것은 피하는 것이 좋습니다.</p></details><details class="faq-item"><summary>스트렝스 향상에 추천하는 영양제는 무엇인가요?</summary><p>가장 먼저 균형 잡힌 식사와 충분한 수면을 챙겨야 합니다. 크레아틴 모노하이드레이트는 근력과 고강도 운동 수행에 도움을 줄 수 있고, 식사로 단백질이 부족하다면 단백질 보충제를 활용할 수 있습니다. 복용 중인 약이 있다면 전문가와 상담하세요.</p></details><details class="faq-item"><summary>휴식도 운동만큼 중요한가요?</summary><p>운동으로 자극된 근육과 신경계가 회복되어야 다음 훈련에서 힘을 낼 수 있습니다. 충분히 수면하고 고강도 운동 사이에 회복일을 배치하세요. 기록이 떨어지거나 통증이 있으면 중량과 운동량을 낮추는 것이 좋습니다.</p></details><details class="faq-item"><summary>1RM은 자주 측정하는 게 좋을까요?</summary><p>1RM은 최대중량에 가까운 시도라 인대와 관절, 신경계에 부담이 커질 수 있습니다. 매번 1RM을 확인하기보다는 5~10RM 구간에서 안정적으로 훈련하고, 자세가 무너지지 않는 범위에서 중량을 조금씩 높이는 편이 좋습니다. 1RM 측정은 훈련 기록이 정체되거나 프로그램이 끝나는 시점처럼 필요할 때 6~12주 간격으로 진행하는 방법을 고려할 수 있습니다.</p></details><details class="faq-item"><summary>10RM 훈련이 스트렝스 향상에도 도움이 되나요?</summary><p>도움이 됩니다. 10RM은 충분한 반복 수로 근육량과 동작 숙련도를 함께 쌓을 수 있어 초보자와 중급자에게 실용적입니다. 다만 목표가 최대근력이라면 10RM만 고집하기보다 3~6RM의 무거운 세트와 8~10RM 보조 세트를 함께 구성하세요. 통증이 생기면 무게보다 자세와 회복을 먼저 점검해야 합니다.</p></details></div>`;wrap.appendChild(section)});
