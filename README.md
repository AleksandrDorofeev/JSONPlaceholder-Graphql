JSONPlaceholder-graphq


TODO:
[x] базовый функционал
[X] управление ошибками
[X] написание тестов
[ ] добавление пагинации


one user --> many posts
one user --> many albums
one user --> many todos

one post --> many comments

one album --> many photos


/posts	100 posts
/comments	500 comments
/albums	100 albums
/photos	5000 photos
/todos	200 todos
/users	10 users


/users - get all users
/users/:id - get one user
/users/:id/posts - get all post belong to user
/users/:id/albums - get all albums belong to user
/users/:id/todos - get all todos belong to user

/posts - get all posts
/posts/:id - get one post
/posts/:id/comments - get comments on post

/albums - get all albums
/albums/:id - get one album
/albums/:id/photos - get photos in album



<!-- GET	/comments?postId=1
GET	/posts?userId=1
POST	/posts
PUT	/posts/1
PATCH	/posts/1
DELETE	/posts/1 -->