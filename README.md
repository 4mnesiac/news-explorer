# News Explorer API

### Описание

Реализация REST API с функционалом регистрации и авторизации пользователя, сохранения и удаления статей в личном кабинете.

_Основные обрабатываемые запросы:_

- `POST /signup` регистрация пользователя;
- `POST /signin` авторизация пользователя;
- `GET /articles` возвращает сохраненную статью;
- `POST /articles` сохраняет статью в избранное;
- `DELETE /articles` удаляет статью из избранного.

### Ссылки на проект

Публичный ip проекта: 213.189.218.106

Фронтенд будет располагаться на: [https://nhance.tk](https://nhance.tk)

Запросы к API по адресу https://api.nhance.tk

### Стек

<a href="https://nodejs.org" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" title="nodejs" width="46" height="46"/> </a> <a href="https://expressjs.com" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" title="express" width="46" height="46"/> </a> <a href="https://www.mongodb.com/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="46" height="46"/> </a>

### Версии

**v.1.0.1** - инициализация проекта.

**v.1.1.0** - изменены ответы пользователям, авторизация через куки заменена на jwt;

**v.1.2.0** - изменены настройки сервера, обновлены настройки CORS.
