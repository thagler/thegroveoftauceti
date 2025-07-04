function openModal(type) {
  const modal = document.getElementById('modal');
  const body = document.getElementById('modal-body');
  body.innerHTML = '';

  if (typeof type === 'object' && type.url) {
    body.innerHTML = `<iframe src="${type.url}" style="width:100%; height:80vh; border:none;" loading="lazy" title="Embedded Form"></iframe>`;
    modal.style.display = 'flex';
  } else {
    if (type === 'cover') {
      body.innerHTML = '<img src="front-cover.jpg" alt="Book Cover Full Size">';
    } else if (type === 'order') {
      body.innerHTML = '<h2>Order Now</h2><p><a href="#">Amazon</a><br><a href="#">Other Retailers</a></p>';
    } else if (type === 'subscribe') {
      body.innerHTML = '<h2>Subscribe</h2><p>Mailchimp embed or placeholder form goes here.</p>';
    } else if (type === 'contact') {
      body.innerHTML = '<h2>Contact</h2><p>Contact form or mailto link goes here.</p>';
    }
    modal.style.display = 'flex';
  }
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-modal-url]').forEach(el => {
    el.addEventListener('click', () => {
      const url = el.getAttribute('data-modal-url');
      openModal({ url });
    });
  });

  document.querySelectorAll('[data-modal]').forEach(el => {
    el.addEventListener('click', () => {
      const value = el.getAttribute('data-modal');
      openModal(value);
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
});
