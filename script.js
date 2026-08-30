const claimVoiceTopics = [
  [
    "Why Motor Insurance Claims Get Rejected",
    "Common rejection, dispute and deduction reasons",
    "why-motor-insurance-claims-get-rejected.html",
    "GUIDE"
  ],
  [
    "Second-Hand Vehicle Claim Within 14 Days",
    "Used car purchase, transfer, ownership and claim issues",
    "second-hand-vehicle-14-day-insurance-claim.html",
    "GUIDE"
  ],
  [
    "Accident Claim Documents",
    "Approximate documents for an accident or own-damage claim",
    "claim-documents-accident-theft.html#accident",
    "GUIDE"
  ],
  [
    "Theft Claim Documents",
    "Approximate documents for a stolen vehicle claim",
    "claim-documents-accident-theft.html#theft",
    "GUIDE"
  ],
  [
    "Vehicle Recovered After Theft",
    "Court release, Superdari, insurer process and lock/security precautions after recovery",
    "vehicle-recovered-after-theft-insurance-claim.html",
    "GUIDE"
  ],
  [
    "RTO Forms 26, 28, 29 and 30",
    "Official motor vehicle forms and where to download them",
    "forms-downloads.html#rto-forms",
    "GUIDE"
  ],
  [
    "Partial Theft",
    "Parts or components stolen from your vehicle",
    "partial-theft-insurance-claim.html",
    "GUIDE"
  ],
  [
    "Total Loss vs CTL",
    "Constructive Total Loss, IDV, repair cost and salvage",
    "total-loss-ctl-motor-insurance.html",
    "GUIDE"
  ],
  [
    "Surveyor vs Investigator",
    "Understand the difference between survey and investigation",
    "surveyor-vs-investigator-motor-insurance-claim.html",
    "GUIDE"
  ],
  [
    "How to Escalate",
    "What to do after rejection, delay or unresolved claim",
    "escalation.html",
    "GUIDE"
  ],
  [
    "Aftermarket Modifications",
    "Accessories, modifications and insurance claim issues",
    "modifications.html",
    "GUIDE"
  ],
  [
    "CNG / LPG",
    "Installation, RC and insurance endorsement",
    "cng-lpg-installation-rc-insurance-endorsement.html",
    "GUIDE"
  ],
  [
    "Fog Lights",
    "Aftermarket fog lights, wiring, fire and claim rejection",
    "aftermarket-fog-lights-insurance-claim.html",
    "GUIDE"
  ],
  [
    "Tyres & Rims",
    "Tyre, alloy wheel and rim modifications",
    "tyre-rim-modifications-insurance-claim.html",
    "GUIDE"
  ],
  [
    "Aftermarket Sunroof",
    "Sunroof modification and insurance claim issues",
    "aftermarket-sunroof-insurance-claim.html",
    "GUIDE"
  ],
  [
    "Vehicle Colour Change",
    "Colour change, RC and insurance implications",
    "car-colour-change-insurance-claim.html",
    "GUIDE"
  ],
  [
    "Two-Wheeler Prohibited Road",
    "Highway / expressway and prohibited-road claim issues",
    "two-wheeler-prohibited-road-insurance-claim.html",
    "GUIDE"
  ],
  [
    "Real Claim Stories",
    "Customer-submitted motor insurance experiences",
    "real-claim-stories/index.html",
    "REAL STORY"
  ],
  [
    "₹33.6 Crore Motor Accident Compensation Case",
    "1994 accident, MACT compensation and decades of 9% interest",
    "motor-insurance-news/33-6-crore-mact-compensation.html",
    "NEWS & UPDATE"
  ],
  [
    "Insurance Ombudsman: Used Two-Wheeler Claim Award",
    "Ombudsman award, ownership transfer and personal accident cover",
    "motor-insurance-news/insurance-ombudsman-motor-claim-award.html",
    "NEWS & UPDATE"
  ],
  [
    "Motor Insurance News & Updates",
    "Court decisions, MACT cases, Ombudsman awards and important sector developments",
    "motor-insurance-news/index.html",
    "NEWS & UPDATE"
  ],
  [
    "Policy Decoder",
    "Simple explanations of difficult motor insurance terms",
    "policy-decoder.html",
    "GUIDE"
  ],
  [
    "Documents Library",
    "Claim documents, checklists and examples",
    "documents-library.html",
    "GUIDE"
  ],
  [
    "Forms & Downloads",
    "Useful motor claim and RTO forms",
    "forms-downloads.html",
    "GUIDE"
  ],
  [
    "Grievance Contacts",
    "Insurer grievance information",
    "insurer-grievance-directory.html",
    "GUIDE"
  ],
  [
    "Feedback",
    "Suggestions, corrections and website feedback",
    "feedback.html",
    "GUIDE"
  ]
];

function escapeHtml(value){return value.replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
function attachSearch(input){
  if(!input || input.dataset.cvSearchV15) return;
  input.dataset.cvSearchV15='1';
  const container=input.closest('.search-area,.search-wrap,.search,.search-box') || input.parentElement;
  let box=container?.querySelector('.suggestions,#suggestions,#drop');
  if(!box){box=document.createElement('div');box.className='suggestions';box.hidden=true;input.parentElement.appendChild(box);}
  const render=()=>{
    const q=input.value.trim().toLowerCase();
    if(!q){box.hidden=true;box.innerHTML='';return;}
    const terms=q.split(/\s+/).filter(Boolean);
    const matches=claimVoiceTopics.map(t=>({t,score:terms.reduce((n,w)=>n+((t[0]+' '+t[1]+' '+t[3]).toLowerCase().includes(w)?1:0),0)})).filter(x=>x.score===terms.length || x.score>0).sort((a,b)=>b.score-a.score).slice(0,8).map(x=>x.t);
    box.innerHTML=matches.length ? matches.map((t,i)=>`<div class="cv-suggestion-row" data-url="${t[2]}" data-index="${i}" role="option"><span class="cv-result-label ${t[3]==='REAL STORY'?'story-label':t[3]==='NEWS & UPDATE'?'news-label':''}">${escapeHtml(t[3])}</span><b>${escapeHtml(t[0])}</b><br><small>${escapeHtml(t[1])}</small></div>`).join('') : '<div class="cv-suggestion-row">No matching ClaimVoice topic. Try words such as rejection, accident, theft, documents, RTO, CTL or modification.</div>';
    box.hidden=false;
  };
  input.addEventListener('input',render);
  input.addEventListener('focus',render);
  input.addEventListener('keydown',e=>{
    if(e.key==='Escape'){box.hidden=true;return;}
    if(e.key==='Enter'){const first=box.querySelector('[data-url]');if(first){e.preventDefault();location.href=cvResolveUrl(first.dataset.url);}}
  });
  box.addEventListener('click',e=>{const row=e.target.closest('[data-url]');if(row)location.href=cvResolveUrl(row.dataset.url);});
}


function cvResolveUrl(url){
  const nested = location.pathname.includes('/real-claim-stories/') || location.pathname.includes('/motor-insurance-news/');
  if(!nested) return url;
  return url.startsWith('../') ? url : '../'+url;
}

document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('input[type="search"],.search-area input,.search-wrap input,.search input,#search,#q').forEach(attachSearch);
  const btn=document.getElementById('searchBtn');
  if(btn){btn.addEventListener('click',()=>{const input=document.getElementById('search');if(input){const first=input.closest('.search-area')?.querySelector('[data-url]');if(first)location.href=cvResolveUrl(first.dataset.url);}});}
  const menuBtn=document.getElementById('cvMenuBtn'),panel=document.getElementById('cvMenuPanel');
  if(menuBtn&&panel){
    panel.classList.remove('open');panel.setAttribute('aria-hidden','true');menuBtn.setAttribute('aria-expanded','false');
    menuBtn.addEventListener('click',()=>{const open=panel.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));panel.setAttribute('aria-hidden',String(!open));});
    panel.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{panel.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');panel.setAttribute('aria-hidden','true');}));
    document.addEventListener('click',e=>{if(!panel.contains(e.target)&&!menuBtn.contains(e.target)){panel.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');panel.setAttribute('aria-hidden','true');}});
  }
});
