const xhrReq = (req, onStatus, handler, body = '') => {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.status === onStatus) {
      handler(xhr);
    }
  };

  xhr.open(req.method, req.url);
  xhr.send(body);
};

const parseForm = (formData) => {
  return new URLSearchParams(formData).toString();
};

const getFormData = () => {
  const form = document.querySelector('form');
  const formData = new FormData(form);
  form.reset();
  return parseForm(formData);
};

const createComment = ({ name, comment, date }) => {
  const commentElement = document.createElement('li');
  commentElement.innerText = `${date} ${name}:${comment}`;
  return commentElement;
};

const updateComments = (comments) => {
  const commentsBox = document.querySelector('#comments');
  commentsBox.removeChild(document.querySelector('#comments > ul'));
  const commentsList = document.createElement('ul');

  comments.forEach(comment => {
    commentsList.append(createComment(comment));
  });

  commentsBox.appendChild(commentsList);
};

const requestComments = () => {
  const request = { method: 'GET', url: '/comments' };

  xhrReq(request, 200,
    (xhrRes) => updateComments(JSON.parse(xhrRes.responseText)));
};

const sendComment = () => {
  const formData = getFormData();

  const request = { method: 'POST', url: '/logcomment' };
  xhrReq(request, 201, requestComments, formData);
};

const main = () => {
  const submitBtn = document.getElementById('submit');
  submitBtn.onclick = sendComment;
};

window.onload = main;
