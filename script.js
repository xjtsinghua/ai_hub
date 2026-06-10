// 搜索与高亮
const search = document.getElementById('search');
const cards = Array.from(document.querySelectorAll('.card'));

function normalize(s){return s.trim().toLowerCase();}

search.addEventListener('input', ()=>{
  const q = normalize(search.value);
  cards.forEach(c => {
    const text = normalize(c.textContent || '');
    const match = q === '' ? true : text.includes(q);
    c.style.display = match ? 'inline-flex' : 'none';
    if(match && q) {
      const label = c.textContent;
      const re = new RegExp('('+q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')','i');
      c.innerHTML = label.replace(re, '<strong class="hl">$1</strong>');
    } else {
      c.innerHTML = c.textContent;
    }
  });
});

// 交互：滚动入场动画
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('show'); });
},{threshold:0.12});
reveals.forEach(r=>io.observe(r));

// 随机注入本地画廊并初始化延迟加载与交互
const localImages = [
  'assets/woman1.jpg',
  'assets/woman2.jpg',
  'assets/img1.jpg',
  'assets/img2.jpg',
  'assets/img3.jpg'
];
function pickRandom(arr, n){
  const pool = arr.slice();
  const out = [];
  for(let i=0;i<n && pool.length>0;i++){
    const idx = Math.floor(Math.random()*pool.length);
    out.push(pool.splice(idx,1)[0]);
  }
  return out;
}
function populateGallery(){
  const gallery = document.getElementById('gallery');
  if(!gallery) return;
  const picks = pickRandom(localImages, 3);
  gallery.innerHTML = picks.map((src, i) => `\n    <figure class="media-card" tabindex="0">\n      <img src="${src}" alt="示例图 ${i+1}" class="lazy">\n      <figcaption>示例图 ${i+1}</figcaption>\n    </figure>`).join('\n');
}
populateGallery();

function initializeLazyImages(){
  const lazyImages = document.querySelectorAll('img.lazy');
  lazyImages.forEach(img=>{
    img.dataset.loaded = 'false';
    const src = img.dataset.src || img.getAttribute('src');
    const ioImg = new IntersectionObserver((ents,obs)=>{
      ents.forEach(en=>{
        if(en.isIntersecting){ if(src){ img.src = src; img.dataset.loaded='true'; } obs.unobserve(img); }
      });
    });
    ioImg.observe(img);
    img.addEventListener('click', ()=>openModalWithImage(img.src, img.alt));
    img.addEventListener('keydown', (e)=>{ if(e.key === 'Enter') openModalWithImage(img.src, img.alt); });
  });
}

// 初始化新注入的图片与媒体卡焦点行为
initializeLazyImages();
document.querySelectorAll('.media-card').forEach(mc=> mc.addEventListener('focus', ()=> mc.scrollIntoView({behavior:'smooth',block:'center'})));


// Modal: 显示图片或视频 iframe
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');
function openModalWithImage(src, alt){ modalContent.innerHTML = `<img src="${src}" alt="${escapeHtml(alt)}">`; showModal(); }
function openModalWithVideo(url){ modalContent.innerHTML = `<iframe src="${url}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`; showModal(); }
function showModal(){ modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
function closeModal(){ modal.setAttribute('aria-hidden','true'); modalContent.innerHTML = ''; document.body.style.overflow=''; }
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });
window.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeModal(); });

// Play demo video button
const playBtn = document.getElementById('playDemo');
if(playBtn) playBtn.addEventListener('click', ()=>{
  // Big Buck Bunny sample on YouTube (replace with your demo URL if desired)
  openModalWithVideo('https://www.youtube.com/embed/aqz-KE-bpKQ');
});

// Tilt interaction for elements with data-tilt
document.querySelectorAll('[data-tilt]').forEach(el=>{
  el.addEventListener('mousemove', (e)=>{
    const r = el.getBoundingClientRect();
    const dx = e.clientX - r.left; const dy = e.clientY - r.top;
    const tx = (dx / r.width - 0.5) * 8; const ty = (dy / r.height - 0.5) * -8;
    el.style.transform = `perspective(800px) rotateX(${ty}deg) rotateY(${tx}deg)`;
  });
  el.addEventListener('mouseleave', ()=>{ el.style.transform=''; });
});

// Small helper
function escapeHtml(s){ return (s||'').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

// focus scrolling for media-cards (accessibility)
document.querySelectorAll('.media-card').forEach(mc=> mc.addEventListener('focus', ()=> mc.scrollIntoView({behavior:'smooth',block:'center'})));
