# Project Name

Book Swap

<br>

## Description

Interactive platform where users can upload and offer books for swap, and view other user's offered books. Users can then make offers to trade/swap books amongst themselves.

<br>

## User Stories

- **homepage** - As a user I want to see a page that shows a title/banner image, a description of the website, sign up/sign in call, latest added books, most wanted/wishlisted books. I want a search bar to look for a specific book. I also want a navbar for easy navigation.
- **sign up** - A signup button to create an account.
- **login** - A login button to authenticate and access my user profile.
- **logout** - A logout button that only appears if I'm logged in.
- **edit user** - As a user I want to be able to edit my profile.
- **favorite list** - As a user I want to see the list of my favorite books and delete them.
- **community** - As a user I want to see a list of contributors to the website.
- **books-offered** - Viewing all books users submitted for offer.
- **books-wished** - Viewing all books users wished for.
<!-- - **books-filter** - As a user I want to see the list of books filtered by my preferences. -->
- **book-details** - As a user I want to see more details of the book, to see who has it up for offer, and also which users have it wishlisted.
- **404** - Custom 404 page to show I went somewhere that doesn't exist
- **500** - Custom 500 page to show the error isn't my fault

<br>

# Client / Frontend

## React Router Routes (React App)

| Path                       | Component             | Permissions                | Behavior                                                                 |
| -------------------------- | --------------------- | -------------------------- | ------------------------------------------------------------------------ |
| `/login`                   | LoginPage             | anon only `<AnonRoute>`    | Login form, navigates to home page after login.                          |
| `/signup`                  | SignupPage            | anon only `<AnonRoute>`    | Signup form, navigates to home page after signup.                        |
| `/`                        | HomePage              | public `<Route>`           | Home page.                                                               |
| `/user-profile`            | ProfilePage           | user only `<PrivateRoute>` | User and player profile for the current user.                            |
| `/user-profile/edit`       | EditProfilePage       | user only `<PrivateRoute>` | Edit user profile form.                                                  |
| `/books/offer`             | NewBookOfferPage      | user only `<PrivateRoute>` | Create new book to offer for trade.                                      |
| `/offers`                  | BooksAvailablePage    | public `<Route>`           | List of books currently available for offer on the website.              |
<!-- | `/latest-wished`           | BooksLatestWishedPage | public `<Route>`           | List of books last wished for by users.                                  |
| `/most-wished`             | BooksMostWishedPage   | public `<Route>`           | List of books most wished for on website.      -->                           |
| `/book/:bookId`            | BookDetailsPage       | public `<Route>`           | Displays book details.                                                   |
| `/community/users/`        | UserCommunityPage     | user only `<PrivateRoute>` | Overview of users registered to website.                                 |
<!-- | `/community/users/:userId` | UserDetailsPage       | user only `<PrivateRoute>` | Details of specific user. Includes books for offer and books wished for. | -->

## Components

Pages:

- LoginPage

- SignupPage

- HomePage

- ProfilePage

- EditProfilePage

- NewBookOfferPage

- BooksAvailablePage

<!-- - BooksLatestWishedPage

- BooksMostWishedPage -->

- BookDetailsPage

<!-- - UserCommunityPage
 -->
<!-- - UserDetailsPage -->

Components:

- UserCard
- BookCard
- Navbar

<br>

## Services

- **Auth Service**

  - `authService` :
    - `.login(user)`
    - `.signup(user)`
    - `.logout()`
    - `.validate()`

- **User Service**

  - `userService` :
    - `.updateCurrentUser(id, userData)`
    - `.getCurrentUser()`

- **Books Service**

  - `bookService` :
    - `.addBook(bookData)`
    - `.getBooksOffered()`
    - `.getBooksWished()`
    - `.getOneBook(id)`
    - `.deleteBook(id)`

<br>

## Server (Back-end):

<br>

## Models

User model

```javascript
{
  nickname: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  about: { type: String },
  imageUrl: {type: String},
  offeredBooks: [ { type: Schema.Types.ObjectId, ref:'Book' } ],
  wishedBooks: [ { type: Schema.Types.ObjectId, ref:'Book' } ],
  messages: [{type: Schema.Types.ObjectId, ref:'Message'}]
}

Book model

{
  title: { type: String },
  author: { type: String },
  genre: { type: String },
  description: { type: String },
  publisher: { type: String },
  published_date: { type: Number }
}

Message model

{
  receiver: { type: String},
  subject: {type: String},
  content: {type: String}
}

Review model


{
  rating: { type: Number},
  content: {type: String},
  author: [{ type: Schema.Types.ObjectId, ref: "User"}],
}
```
<br>

## API Endpoints (backend routes)

| **Method** | **Route**                     | **Description**                                                          | Request - Body                                                          |
| ---------- | ----------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| `GET`      | `/`                           | Main page route. Renders home `index` view.                              |                                                                         |
| `GET`      | `/login`                      | Renders `login` form view.                                               |                                                                         |
| `POST`     | `/login`                      | Sends Login form data to the server.                                     | { email, password }                                                     |
| `GET`      | `/signup`                     | Renders `signup` form view.                                              |                                                                         |
| `POST`     | `/signup`                     | Sends Sign Up info to the server and creates user in the DB.             | { email, password }                                                     |
| `GET`      | `/private/edit-profile`       | Private route. Renders `edit-profile` form view.                         |                                                                         |
| `PUT`      | `/private/edit-profile`       | Private route. Sends edit-profile info to server and updates user in DB. | { email, password, [nickname], [imageUrl], [about] } |
| `GET`      | `/private/favorites`          | Private route. Render the `favorites` view.                              |                                                                         |
| `POST`     | `/private/favorites/`         | Private route. Adds a new favorite for the current user.                 | { title, author, genre }                                |
| `DELETE`   | `/private/favorites/:bookId` | Private route. Deletes the existing favorite from the current user.      |                                                                         |
| `GET`      | `/books`                     | Renders `books-list` view.                                              |                                                                         |
| `GET`      | `/book/details/:id`         | Renders `book-details` view for the particular book.                  |

| `GET` | `/private/community` | Private route. Renders `users-list` view.





<br>

## API's

Books API
https://openlibrary.org/dev/docs/api/books

<br>

## Packages

<br>

## Backlog

[https://trello.com/b/BxpDkbSX/book-swap-web-app]()

<br>

## Links

### Git

The url to your repository and to your deployed project

[Repository Link](https://github.com/mapmargaridapereira/book-swap-project,
https://github.com/mapmargaridapereira/book-swap-project-backend)

[Deploy Link]()

<br>

### Slides

The url to your presentation slides

[Slides Link]()

### Contributors

Cris Kith - [`<github-username>`](https://github.com/cris-k1) - [`<linkedin-profile-link>`](https://www.linkedin.com/in/cristian-kith-pollini-85a229176/)

Margarida Pereira - [`<github-username>`](https://github.com/mapmargaridapereira) - [`<linkedin-profile-link>`](https://www.linkedin.com/in/mapmargaridapereira/)
```
