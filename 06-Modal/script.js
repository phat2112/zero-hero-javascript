const btnShowModal = document.querySelectorAll('.show-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeModal = document.querySelector('.close-modal');

for(let i = 0; i< btnShowModal.length; i++) {
  btnShowModal[i].addEventListener('click', function() {
    console.log('click')
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  })
}

const handleHiddenModal = function() {
  if(!modal.classList.contains('hidden')) {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
  }
}

closeModal.addEventListener('click', handleHiddenModal);
overlay.addEventListener('click', handleHiddenModal);

function detectCloseModal(e) {
  if(e.code === 'Escape' && !modal.classList.contains('hidden')) {
    handleHiddenModal();
  }
}

window.addEventListener('keydown', detectCloseModal)