// Prototype estimator: values are illustrative coefficients, not validated benchmarks.
const baseFps={
 cs2:{rtx3060:190,rtx4050:155,rtx4060:220,gtx1660s:125,gtx1050:55,rx6600:155},
 gta5:{rtx3060:115,rtx4050:105,rtx4060:140,gtx1660s:85,gtx1050:38,rx6600:105},
 minecraft:{rtx3060:260,rtx4050:220,rtx4060:300,gtx1660s:210,gtx1050:110,rx6600:230},
 fortnite:{rtx3060:125,rtx4050:115,rtx4060:155,gtx1660s:80,gtx1050:30,rx6600:105},
 roblox:{rtx3060:180,rtx4050:165,rtx4060:200,gtx1660s:150,gtx1050:90,rx6600:170}
};
const cpuFactor={old:.68,mid:1,strong:1.18,laptop:.82};
const qualityFactor={low:1.28,medium:1,high:.72};
const resolutionFactor={1080:1,1440:.76,2160:.48};
const ramFactor={'8':.82,'16':1,'32':1.03};
const $=id=>document.getElementById(id);
$('calculate').addEventListener('click',()=>{
 const gpu=$('gpu').value,cpu=$('cpu').value,game=$('game').value;
 let estimate=baseFps[game][gpu]*cpuFactor[cpu]*qualityFactor[$('quality').value]*resolutionFactor[$('resolution').value]*ramFactor[$('ram').value];
 if(game==='cs2'&&cpu==='old')estimate*=.82;
 if(game==='minecraft'&&$('quality').value==='high')estimate*=.85;
 estimate=Math.max(12,Math.round(estimate/5)*5);
 const low=Math.max(8,Math.round(estimate*.72/5)*5),high=Math.round(estimate*1.28/5)*5;
 $('fps').innerHTML=`${estimate} <small>FPS</small>`;
 $('range').textContent=`Ориентировочно ${low}–${high} FPS`;
 $('tier').textContent=estimate>=144?'Высокий FPS':estimate>=60?'Комфортно':'Низкий FPS';
 $('bar').style.width=`${Math.min(100,estimate/240*100)}%`;
 $('resultNote').textContent='Это упрощённая оценка для прототипа, не проверенный результат бенчмарка. Фактический FPS зависит от точных моделей комплектующих, охлаждения, драйверов и версии игры.';
 $('result').classList.remove('hidden');
 $('result').scrollIntoView({behavior:'smooth',block:'nearest'});
});