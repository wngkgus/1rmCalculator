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
  document.querySelector('#out').innerHTML=`예상 1RM <strong>${one.toFixed(1)} kg</strong><br><span class="small">${note}</span>`;
}
