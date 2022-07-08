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
  const commentReq = new XMLHttpRequest();

  commentReq.onload = () => {
    updateComments(JSON.parse(commentReq.responseText));
  }
  commentReq.open('GET', '/comments');
  commentReq.send();
};

const sendComment = () => {
  const formData = getFormData();
  const postCommentReq = new XMLHttpRequest();

  postCommentReq.onload = () => {
    if (postCommentReq.status === 201) {
      requestComments();
    }
  }
  postCommentReq.open('POST', '/logcomment');
  postCommentReq.send(formData);
};

const main = () => {
  const submitBtn = document.getElementById('submit');
  submitBtn.onclick = sendComment;
};

window.onload = main;
