const select = document.getElementById('themeSelect');
const root = document.documentElement;

function apply(theme) {
  root.dataset.theme = theme;
  localStorage.setItem('theme', theme);
}

select.onchange = () => apply(select.value);

const saved = localStorage.getItem('theme') || 'system';
select.value = saved;
apply(saved);
