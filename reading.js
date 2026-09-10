(()=>{
const q=s=>document.querySelector(s),nav=q('#reading-nav'),settings=q('.reading-settings');
const font=q('#font'),theme=q('#theme'),focus=q('#reading-focus');
function labels(){font.textContent=font.getAttribute('aria-pressed')==='true'?'字号：较大':'字号：标准';theme.textContent=document.body.classList.contains('dark')?'主题：深色':'主题：浅色'}
font.addEventListener('click',labels);theme.addEventListener('click',labels);labels();
let focusMode=false;try{focusMode=localStorage.getItem('reading-focus')==='true'}catch{}
function setFocus(){document.body.classList.toggle('focus-reading',focusMode);focus.setAttribute('aria-pressed',String(focusMode));focus.textContent=focusMode?'退出专注阅读':'开启专注阅读'}setFocus();
focus.onclick=()=>{focusMode=!focusMode;try{localStorage.setItem('reading-focus',String(focusMode))}catch{}setFocus();settings.open=false};
function chooseTab(id){nav.querySelectorAll('[role=tab]').forEach(t=>{const selected=t.getAttribute('aria-controls')===id;t.setAttribute('aria-selected',String(selected));t.tabIndex=selected?0:-1});nav.querySelectorAll('[role=tabpanel]').forEach(p=>p.hidden=p.id!==id)}
const current=q('#reading-chapter');
q('#menu').onclick=()=>{settings.open=false;document.querySelector('.sidebar').classList.remove('open');chooseTab(current?'reading-chapter':'reading-book');nav.showModal();q('#menu').setAttribute('aria-expanded','true');const active=nav.querySelector('[role=tabpanel]:not([hidden]) a.current');if(active)active.scrollIntoView({block:'nearest'})};
q('#reading-nav-close').onclick=()=>nav.close();nav.addEventListener('close',()=>{q('#menu').setAttribute('aria-expanded','false');q('#menu').focus()});
nav.addEventListener('click',e=>{const t=e.target.closest('[role=tab]');if(t)chooseTab(t.getAttribute('aria-controls'));if(e.target.closest('[role=tabpanel] a'))nav.close()});
nav.querySelector('[role=tablist]').addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;const tabs=[...nav.querySelectorAll('[role=tab]')];let i=tabs.indexOf(document.activeElement);if(i<0)return;e.preventDefault();i=e.key==='Home'?0:e.key==='End'?tabs.length-1:(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;chooseTab(tabs[i].getAttribute('aria-controls'));tabs[i].focus()});
document.addEventListener('click',e=>{if(!settings.contains(e.target))settings.open=false});document.addEventListener('keydown',e=>{if(e.key==='Escape')settings.open=false});
const headings=[...document.querySelectorAll('.prose h2[id],.prose h3[id]')];
const observer=new IntersectionObserver(entries=>{for(const e of entries){if(!e.isIntersecting)continue;document.querySelectorAll('#reading-chapter a,.toc a').forEach(a=>{const yes=a.hash==='#'+e.target.id;a.classList.toggle('current',yes);if(yes)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})}},{rootMargin:'-8% 0px -65% 0px'});headings.forEach(h=>observer.observe(h));
let timer;document.querySelectorAll('.reader-section-link').forEach(a=>a.addEventListener('click',async e=>{if(!navigator.clipboard)return;e.preventDefault();const path=location.pathname.split('/').pop()||'index.html';const url='https://fieldnote-ops.github.io/harness-formal-foundations/'+path+a.hash;try{await navigator.clipboard.writeText(url);q('#reading-status').textContent='本节链接已复制';clearTimeout(timer);timer=setTimeout(()=>q('#reading-status').textContent='',2400)}catch{location.hash=a.hash}}));
})();
