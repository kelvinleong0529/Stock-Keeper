# **Introduction**
- This server act as a database and storage to keep track of freqeuntly used household items
- First, create an account at `http://localhost:5000/create_user` with email and password, a hashed API key will be sent to your email upon successful registration
- Include the credentials required in the request's header to perform any CRUD (Create, Read, Update and Delete) actions on the inventory records in your account at `http://localhost:5000/item`

# **Creating Account**
- API endpoint: `http://localhost:5000/create_user`
- HTTP method: POST

| Body              | Remarks                                                     |
|-------------------|-------------------------------------------------------------|
| email             | mandatory, unique for each account                          |
| password          | mandatory, will be encrypted before storing in the database |


- A hashed API key will be sent to the email upon successful account registration
- No duplicate emails are allowed (can't use the same email to register multiple accounts)
- example of how to create account using Javascript / Typescript:
```typescript
const response = await fetch("http://localhost:5000/create_user", {
method: "POST",
headers: {
  "Accept": "application/json",
  "Content-Type": "application/json"
},
body: `{
   "email": "kelvin.leong123@gmail.com",
   "password": "testing",
  }`,
});

response.json().then(data => {
  console.log(data);
});
```

# **Creating New Inventory Records**
- API endpoint: `http://localhost:5000/item`
- HTTP method: POST

| Headers           | Remarks                                                  |
|-------------------|----------------------------------------------------------|
| email             | mandatory                                                |
| password          | mandatory                                                |
| api-key           | mandatory, the api key generated upon account registration, can be retrieved from email generated by the server                            |

| Body           | Remarks                                                    |
|-------------------|---------------------------------------------------------|
| item_name         | mandatory                                               |
| item_category     | optional                                                |
| current_quantity  | mandatory                                               |
| alert_quantity    | optional, when the stock quantity reaches this amount an alert will be sent to notify the user, default value is 0                     |
| expiry_date       | optional                                                |

- example of how to create new inventory records using Javascript / Typescript:
```typescript
const response = await fetch("http://localhost:5000/item", {
method: "POST",
headers: {
  "Accept": "application/json",
  "Content-Type": "application/json",
  "email":"kelvin.leong123@gmail.com",
  "password":"testing",
  "api-key":"0bec8a5f-380f-4d8a-be8a-a13ad15e6082"
},
body: `{
   "item_name": "Campbells Cream Chicken Mushroom Soup",
   "item_category": "Canned Food",
   "current_quantity": "8",
   "alert_quantity": "2",
   "expiry_date" : "2024-05-29"
  }`,
});

response.json().then(data => {
  console.log(data);
});
```