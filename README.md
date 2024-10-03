Области хранения данных

-   База данных на json-server
-   BFF (Backend for frontend)
-   Redux-store

Сущности приложения

-   Пользователь: БД (список пользователей), BFF (сессия текущего), redux-store (отображение в браузере)
-   Роль пользователя: БД (список ролей), BFF (сессия пользователя с ролью), redux-store (использование на клиенте)
-   Статья: БД (список статей), redux-store (отображение в браузере)
-   Комментарий: БД (список комментариев), redux-store (отображение в браузере)

Таблицы БД

-   Пользователи - users: id / login / password / registed_at / role_id
-   Роли - roles: id / name
-   Статьи - posts: id / title / image_url / content / published_at
-   Комментарии - comments: id / author_id / post_id / content

Схема состояния на BFF

-   Сессия текущего пользователя: login / password / role

Схема для redux-store (на клиенте)

-   user: id / login / role_id / session
-   posts: массив post: id / title / imageUrl / publishedAt / commentsCount
-   post: id / title / imageUrl / content / publishedAt / comments: массив comment: id / author / content / publishedAt
-   users: id / login / registedAt / role
