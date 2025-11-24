function openModal(type) {
  const modal = document.getElementById('modal');
  const body = document.getElementById('modal-body');
  document.body.classList.add("modal-open");
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
  document.body.classList.remove("modal-open");
  document.getElementById('modal').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  const mainEl = document.querySelector('main');
  const logoEl = document.querySelector('header img.logo');
  const coverContainer = document.querySelector('.cover-img');
  const coverImg = coverContainer ? coverContainer.querySelector('img') : null;

  const ensurePrimaryFadeVisible = () => {
    if (logoEl) {
      logoEl.style.animation = 'none';
      logoEl.style.opacity = '1';
    }

    if (mainEl) {
      mainEl.style.animation = 'none';
      mainEl.style.opacity = '1';
    }

    if (coverImg && coverContainer) {
      coverContainer.classList.remove('cover-animated');
      coverImg.style.opacity = '1';
      coverImg.style.transform = 'scale(1)';
      coverImg.style.filter = 'none';
      coverImg.style.boxShadow = '';
    }
  };

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

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      ensurePrimaryFadeVisible();
    }
  });

  window.addEventListener('pageshow', event => {
    if (event.persisted) {
      ensurePrimaryFadeVisible();
    }
  });

  if (logoEl) {
    logoEl.addEventListener('animationend', ensurePrimaryFadeVisible, { once: true });
  }

  if (mainEl) {
    mainEl.addEventListener('animationend', ensurePrimaryFadeVisible, { once: true });
  }

  if (coverImg && coverContainer) {
    coverImg.addEventListener('animationend', () => {
      coverContainer.classList.remove('cover-animated');
      ensurePrimaryFadeVisible();
    }, { once: true });
  }
});
