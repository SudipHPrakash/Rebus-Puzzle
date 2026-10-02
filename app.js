(function(){
  const lightbox=document.getElementById('lightbox');
  const imageButton=document.getElementById('imageButton');
  const zoomBtn=document.getElementById('zoomBtn');
  const closeLightbox=document.getElementById('closeLightbox');

  function openPuzzle(){
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
  }
  function closePuzzle(){
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden','true');
  }

  imageButton.addEventListener('click',openPuzzle);
  zoomBtn.addEventListener('click',openPuzzle);
  closeLightbox.addEventListener('click',closePuzzle);
  lightbox.addEventListener('click',function(e){
    if(e.target===lightbox) closePuzzle();
  });
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape') closePuzzle();
  });
})();
