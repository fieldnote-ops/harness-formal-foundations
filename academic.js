(()=>{
const font=document.querySelector('#font');
const syncSize=()=>document.documentElement.style.setProperty('--size',font?.getAttribute('aria-pressed')==='true'?'21px':'18px');
syncSize();font?.addEventListener('click',syncSize);
const headings=[...document.querySelectorAll('.prose [data-parent-section]')];
const links=[...document.querySelectorAll('.toc a[data-parent-section]')];
function expand(parent){for(const a of links)if(a.classList.contains('sub'))a.hidden=a.dataset.parentSection!==parent}
if(headings.length){expand(headings[0].dataset.parentSection);let scheduled=false;const update=()=>{scheduled=false;let current=headings[0];for(const h of headings){if(h.getBoundingClientRect().top<=150)current=h;else break}expand(current.dataset.parentSection)};addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(update)}},{passive:true});update()}
})();
