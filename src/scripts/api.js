

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-4',
    headers: {
      authorization: 'b6f96620-84b1-4747-a1ce-ac14e14f2526',
      'Content-Type': 'application/json'
    }
};

const response = (res) => {
    if (res.ok) {
      return res.json();
    }
  
    return Promise.reject(`Ошибка: ${res.status}`);
};

const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
      .then((res) => response(res))
};

const getInformation = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then((res) => response(res))
};

const editProfile = (name, job) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
    
      body: JSON.stringify({
        name: name,
        about: job,
    }),
  })
      .then((res) => response(res))
  };

const addNewCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
    
      body: JSON.stringify({
        name: name,
        link: link,
    }),
  })
      .then((res) => response(res))
};

const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: config.headers,
  })
      .then((res) => response(res))
};

const addLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: config.headers,
      })
        .then((res) => response(res))
};

const removeLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: config.headers,
      })
        .then((res) => response(res)) 
};

const changeProfileAvatar = (link) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
          avatar: link.value,
        }),
      })
        .then((res) => response(res));
}

export {config, response, getInitialCards, getInformation, editProfile, addNewCard, deleteCard, addLike, removeLike, changeProfileAvatar};