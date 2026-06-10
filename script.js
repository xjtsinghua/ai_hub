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
      // 简单高亮：包裹匹配文本
      const label = c.textContent;
      const re = new RegExp('('+q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')','i');
      c.innerHTML = label.replace(re, '<strong class="hl">$1</strong>');
    } else {
      // 还原为纯文本（保持 href）
      c.innerHTML = c.textContent;
    }
  });
});

// 预留：可以替换为从 JSON 动态加载链接

// 小交互：焦点时平滑滚动到视口中央
cards.forEach(c => c.addEventListener('focus', ()=>{ c.scrollIntoView({behavior:'smooth',block:'center'}); }));
