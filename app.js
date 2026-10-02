(function(){
  const form=document.getElementById('rebusForm');
  const btn=document.getElementById('submitBtn');
  const frame=document.getElementById('submitFrame');
  const status=document.getElementById('status');

  const lightbox=document.getElementById('lightbox');
  const imageButton=document.getElementById('imageButton');
  const zoomBtn=document.getElementById('zoomBtn');
  const closeLightbox=document.getElementById('closeLightbox');

  let waiting=false;
  let timeoutId=null;

  function openPuzzle(){
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
  }

  function closePuzzle(){
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden','true');
  }

  function show(message,type){
    status.textContent=message;
    status.className='status show '+type;
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

  form.addEventListener('submit',function(e){
    if(!form.reportValidity()){
      e.preventDefault();
      return;
    }

    if(waiting){
      e.preventDefault();
      return;
    }

    waiting=true;
    btn.disabled=true;
    btn.textContent='Submitting…';
    show('Sending your answers…','ok');

    clearTimeout(timeoutId);
    timeoutId=setTimeout(function(){
      if(waiting){
        waiting=false;
        btn.disabled=false;
        btn.textContent='Submit My Answers';
        show('Your submission was sent. Please wait a few seconds and check before submitting again.','ok');
      }
    },10000);
  });

  frame.addEventListener('load',function(){
    if(!waiting) return;

    clearTimeout(timeoutId);
    waiting=false;
    btn.disabled=false;
    btn.textContent='Submit My Answers';

    show('Thank you! Your answers were submitted successfully.','ok');
    form.reset();
    status.scrollIntoView({behavior:'smooth',block:'center'});
  });
})();
