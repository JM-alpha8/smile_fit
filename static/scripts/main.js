const routes = {
  '': 'pages/index.html',
  'game_mode': 'pages/game_mode.html',
  'game_follow': 'pages/game_follow.html',
  'game_emotion': 'pages/game_emotion.html',
  'game_feedback': 'pages/game_feedback.html',
  'rehab_mode': 'pages/rehab_mode.html',
  'focus': 'pages/focus.html',
  'focus_fit': 'pages/focus_fit.html',
  'complex': 'pages/complex.html',
  'complex_fit': 'pages/complex_fit.html',
  'feedback': 'pages/feedback.html'
};

async function loadPage(route) {
  const path = routes[route];
  if (!path) return;

  const res = await fetch(path);
  const html = await res.text();
  document.getElementById('app').innerHTML = html;
  window.scrollTo(0, 0);

  // 페이지 전용 스크립트 동적 로딩
  const scriptPath = `scripts/${route}.js`;
  try {
    const module = await import(`/${scriptPath}`);
    if (module?.init) module.init();
  } catch (e) {
    console.warn(`No script for ${route}`);
  }
}

function navigate(route) {
  history.pushState({}, '', `#${route}`);
  loadPage(route);
}

window.addEventListener('popstate', () => {
  loadPage(location.hash.slice(1));
});

document.addEventListener('DOMContentLoaded', () => {
  loadPage(location.hash.slice(1) || '');
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/serviceWorker.js');
  }
});
