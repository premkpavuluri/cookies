const xhrRequest = (request, onStatus, handler, altHandler, body = '') => {
  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    if (xhr.status === onStatus) {
      return handler(xhr);
    }

    altHandler(xhr);
  }
  xhr.open(request.method, request.url);
  xhr.send(body);
};

const getFormData = (form) => {
  const formData = new FormData(form);
  return new URLSearchParams(formData).toString();
};

const redirectToGuestBook = (xhr) => {
  window.location.href = '/guestbook';
};

const showInvalidLogin = (xhr) => {
  const loginSec = document.querySelector('.login-sec');
  const message = document.createElement('div')

  message.style.color = 'red';
  message.innerText = 'Invalid credentials';

  loginSec.append(message);
};

const login = () => {
  const form = document.querySelector('form');
  const formData = getFormData(form);
  const request = { method: 'POST', url: '/login' };

  xhrRequest(request, 200, redirectToGuestBook, showInvalidLogin, formData);
};

const main = () => {
  const submitBtn = document.querySelector('#submitBtn');
  submitBtn.onclick = login;
};

window.onload = main;
