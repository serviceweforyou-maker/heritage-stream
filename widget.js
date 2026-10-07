(function() {
  var container = document.getElementById('sanatana360-widget');
  if (!container) return;
  var theme = container.getAttribute('data-theme') || 'dark';
  var type = container.getAttribute('data-type') || 'darshan';
  
  var iframe = document.createElement('iframe');
  iframe.src = 'https://www.sanatana360.com/widget.html?type=' + type + '&theme=' + theme;
  iframe.style.width = '100%';
  iframe.style.height = '420px';
  iframe.style.border = 'none';
  iframe.style.borderRadius = '16px';
  iframe.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.3)';
  iframe.loading = 'lazy';
  iframe.title = 'Sanatana360 Live Widget';
  
  container.appendChild(iframe);
})();