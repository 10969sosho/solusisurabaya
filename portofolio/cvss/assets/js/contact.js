/* CV Solusi Surabaya - Contact Form Logic */
(function () {
  'use strict';

  const { qs, on } = (window.App && window.App.util) || {
    qs: (s, c = document) => c.querySelector(s),
    on: (el, evt, h, o) => el.addEventListener(evt, h, o || false)
  };

  function validateEmail(email) {
    // Simple but effective email pattern
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email).toLowerCase());
  }

  function show(el) { if (el) el.style.display = 'inline'; }
  function hide(el) { if (el) el.style.display = 'none'; }

  function setStatus(msg, type = 'info') {
    const status = qs('#form-status');
    if (!status) return;
    status.textContent = msg;
    status.style.color = type === 'error' ? '#ff6b35' : type === 'success' ? '#00ff88' : 'inherit';
  }

  function validateForm(form) {
    const name = qs('#name', form);
    const email = qs('#email', form);
    const service = qs('#service', form);
    const desc = qs('#desc', form);

    const errName = qs('#error-name', form);
    const errEmail = qs('#error-email', form);
    const errService = qs('#error-service', form);
    const errDesc = qs('#error-desc', form);

    let valid = true;

    // Name
    if (!name.value.trim()) {
      show(errName); valid = false;
      name.setAttribute('aria-invalid', 'true');
    } else {
      hide(errName);
      name.removeAttribute('aria-invalid');
    }

    // Email
    if (!validateEmail(email.value.trim())) {
      show(errEmail); valid = false;
      email.setAttribute('aria-invalid', 'true');
    } else {
      hide(errEmail);
      email.removeAttribute('aria-invalid');
    }

    // Service
    if (!service.value) {
      show(errService); valid = false;
      service.setAttribute('aria-invalid', 'true');
    } else {
      hide(errService);
      service.removeAttribute('aria-invalid');
    }

    // Description
    if (!desc.value.trim() || desc.value.trim().length < 20) {
      show(errDesc); valid = false;
      desc.setAttribute('aria-invalid', 'true');
    } else {
      hide(errDesc);
      desc.removeAttribute('aria-invalid');
    }

    return valid;
  }

  function serialize(form) {
    const data = new FormData(form);
    return Object.fromEntries(data.entries());
  }

  function initContactForm() {
    const form = qs('#contact-form');
    if (!form) return;

    on(form, 'submit', (e) => {
      e.preventDefault();
      setStatus('');

      if (!validateForm(form)) {
        setStatus('Harap periksa kembali input Anda.', 'error');
        return;
      }

      // Simulate async submission
      setStatus('Mengirim data...', 'info');

      const payload = serialize(form);
      // console.log('Form payload', payload);

      // Simulate API call
      setTimeout(() => {
        // Success state
        setStatus('Terima kasih! Permintaan Anda sudah kami terima. Kami akan menghubungi dalam 1-2 hari kerja.', 'success');
        form.reset();
      }, 900);
    });

    on(form, 'reset', () => {
      ['#error-name', '#error-email', '#error-service', '#error-desc'].forEach(sel => hide(qs(sel, form)));
      setStatus('');
      ['#name', '#email', '#service', '#desc'].forEach(sel => {
        const el = qs(sel, form);
        if (el) el.removeAttribute('aria-invalid');
      });
    });
  }

  // DOM Ready (scripts are defer)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactForm);
  } else {
    initContactForm();
  }
})();