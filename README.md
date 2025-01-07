# Book Fair Back-end 2025

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/) (version 14.x or later)
- [npm](https://www.npmjs.com/) (version 6.x or later)
- [Git](https://git-scm.com/)
- [XAMPP](https://www.apachefriends.org/download.html)
  Start module Apache and MySQL in XAMPP
  Create database name "test"
-

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/Gibmh/BackEnd-HS2025.git
   ```

2. **Navigate to the project directory:**

   ```sh
   cd backend
   ```

3. **Install the dependencies:**

   ```sh
   npm install
   npm install body-parser cors dotenv ejs express moment-timezone mysql2 sequelize
   npm install --save-dev @babel/core @babel/node @babel/preset-env nodemon sequelize-cli
   ```

4. **Create database**
   Create database in (http://localhost/phpmyadmin/index.php?route=/server/databases) Databasename: "book"

   Run database migrations

   ```sh
   npx sequelize-cli db:migrate
   ```

5. **Start the development server:**

   ```sh
   npm start
   ```

6. **Api:**

Get list (Get): http://localhost:9999/api/get-object-list

Create object (Post): http://localhost:9999/api/create-object

Get object by id (Get): http://localhost:9999/api/get-ob-by-id

Update object (Post): http://localhost:9999/api/update-object

Delete object : http://localhost:9999/api/delete-object

**Example function call api**
Get method function :

```sh
const fetchUsers = async () => {
 const url = 'https://example.com/api/users';
 try {
   const data = await apiRequest(url, 'GET');
   console.log('List of data:', data);
 } catch (error) {
   console.error('Error fetching users:', error.message);
 }
};
```

Post method function :

```sh
const createob = async () => {
  const url = 'https://example.com/api/users';
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
  };

  try {
    const data = await apiRequest(url, 'POST', userData);
    console.log('User created:', data);
  } catch (error) {
    console.error('Error creating user:', error.message);
  }
};
```

** Lưu ý: khi sử dụng method post thì trong các object khi gửi kèm theo giúp em 1 biến là typeob vì các thông tin đều dùng cùng 1 api để post nên em sử dụng thêm biến đó để nó phân biệt là post vô table nào **
