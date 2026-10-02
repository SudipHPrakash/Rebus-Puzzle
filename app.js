(function(){
  const form = document.getElementById('rebusForm');
  const btn = document.getElementById('submitBtn');
  const frame = document.getElementById('submitFrame');
  const status = document.getElementById('status');

  const lightbox = document.getElementById('lightbox');
  const imageButton = document.getElementById('imageButton');
  const zoomBtn = document.getElementById('zoomBtn');
  const closeLightbox = document.getElementById('closeLightbox');

  let waiting = false;
  let timer = null;

  function openPuzzle(){
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
  }

  function closePuzzle(){
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden','true');
  }

  imageButton.addEventListener('click', openPuzzle);
  zoomBtn.addEventListener('click', openPuzzle);
  closeLightbox.addEventListener('click', closePuzzle);
  lightbox.addEventListener('click', function(e){
    if(e.target === lightbox) closePuzzle();
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closePuzzle();
  });

  function show(message,type){
    status.textContent = message;
    status.className = 'status show ' + type;
  }

  form.addEventListener('submit',function(e){
    if(!form.reportValidity()){
      e.preventDefault();
      return;
    }
    if(waiting){
      e.preventDefault();
      return;
    }

    waiting = true;
    btn.disabled = true;
    btn.textContent = 'Submitting…';
    show('Sending your answers…','ok');

    timer = setTimeout(function(){
      if(waiting){
        waiting = false;
        btn.disabled = false;
        btn.textContent = 'Submit My Answers';
        show('Your submission was sent. Please check that it appears in the response sheet before submitting again.','ok');
      }
    },8000);
  });

  frame.addEventListener('load',function(){
    if(!waiting) return;

    clearTimeout(timer);
    waiting = false;
    btn.disabled = false;
    btn.textContent = 'Submit My Answers';
    show('Thank you! Your answers were submitted successfully.','ok');
    form.reset();
  });
})();
