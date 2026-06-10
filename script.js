// 简单搜索：按名称过滤卡片
const search = document.getElementById('search');
search.addEventListener('input', ()=>{
  const q = search.value.trim().toLowerCase();
  const cards = document.querySelectorAll('.card');
  cards.forEach(c=>{
    const t = c.textContent.toLowerCase();
    c.style.display = q && !t.includes(q) ? 'none' : 'inline-flex';
  });
});

// 可按需扩展：动态从 JSON 加载链接或添加分类切换功能