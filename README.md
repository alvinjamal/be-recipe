<h3 align="center">Food Recipe</h3>

## Users

### Register

POST users/register

```Body
{
    "success": true,
    "statusCode": 200,
    "data": {
        "email": "alvinjamal.azkya@gmail.com"
    },
    "message": "register success please check your email"
}
```

### Verification Otp

POST users/verification

```Body
{
    "success": true,
    "statusCode": 200,
    "data": [],
    "message": " verification email success"
}
```
### Login

POST users/login

```Body
{
    "success": true,
    "statusCode": 200,
    "data": {
        "id_user": "367c1d1a-2596-4746-bc24-20b80982f0ab",
        "fullname": "Alvin Jamal Azkya",
        "email": "alvinjamalazkya@gmail.com",
        "phone": "083816767374",
        "photo": "https://res.cloudinary.com/diunwoak6/image/upload/v1676379392/food/huaopbzuzgcziepowyvq.png",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiMzY3YzFkMWEtMjU5Ni00NzQ2LWJjMjQtMjBiODA5ODJmMGFiIiwiZW1haWwiOiJhbHZpbmphbWFsYXpreWFAZ21haWwuY29tIiwiaWF0IjoxNjc2NDc5ODQwLCJleHAiOjE2NzY0ODM0NDB9.smbmDK31cWmJLROJxd1cw8z2-b1f4vMfQMTl-EOqKGc"
    },
    "message": "Login Success"
}
```

### Forgot Password

POST users/forgot

```Body
{
    "success": true,
    "statusCode": 200,
    "message": "send email success"
}
```

### Change Password

POST users/forgot/:token

```Body
{
    "success": true,
    "statusCode": 200,
    "data": [],
    "message": " change password success"
}
```

### Get All Users

GET users/

```Body
{
    "success": true,
    "statusCode": 200,
    "data": [
        {
            "id_user": "43d34754-cf3a-4935-92f4-03afc2751b4c",
            "fullname": "jamal azkya",
            "email": "alvinjamal.azkya@gmail.com",
            "phone": "08211",
            "password": "$2a$10$eSxouWumYnJh4lRaxpSBiOGVzDu2oFjacl3dMQN2xyWwUCBOX2IOC",
            "verif": "1",
            "otp": "859710",
            "photo": null
        },
        {
            "id_user": "367c1d1a-2596-4746-bc24-20b80982f0ab",
            "fullname": "Alvin Jamal Azkya",
            "email": "alvinjamalazkya@gmail.com",
            "phone": "083816767374",
            "password": "$2a$10$ER2KHVVdLLjiU2rFNvJWse8JoG3Luw5BoQ68J2AT0HuoM9WQS/gja",
            "verif": "1",
            "otp": "699602",
            "photo": "https://res.cloudinary.com/diunwoak6/image/upload/v1676379392/food/huaopbzuzgcziepowyvq.png"
        }
    ],
    "message": "Get users success"
}
```

### Get Profile

GET users/profile

```Body
{
    "success": true,
    "statusCode": 200,
    "data": {
        "id_user": "367c1d1a-2596-4746-bc24-20b80982f0ab",
        "fullname": "Alvin Jamal Azkya",
        "email": "alvinjamalazkya@gmail.com",
        "phone": "083816767374",
        "verif": "1",
        "otp": "699602",
        "photo": "https://res.cloudinary.com/diunwoak6/image/upload/v1676379392/food/huaopbzuzgcziepowyvq.png"
    },
    "message": "get profile success"
}
```

### Get Detail Id

GET users/:id_user

```Body
{
    "success": true,
    "statusCode": 200,
    "data": [
        {
            "id_user": "367c1d1a-2596-4746-bc24-20b80982f0ab",
            "fullname": "Alvin Jamal Azkya",
            "email": "alvinjamalazkya@gmail.com",
            "phone": "083816767374",
            "password": "$2a$10$ER2KHVVdLLjiU2rFNvJWse8JoG3Luw5BoQ68J2AT0HuoM9WQS/gja",
            "verif": "1",
            "otp": "699602",
            "photo": "https://res.cloudinary.com/diunwoak6/image/upload/v1676379392/food/huaopbzuzgcziepowyvq.png"
        }
    ],
    "message": "Get detail users success"
}
```

### Update Photo

PUT users/update/:id_user

```Body
{
    "success": true,
    "statusCode": 200,
    "data": {
        "photo": "https://res.cloudinary.com/diunwoak6/image/upload/v1676477270/food/fc4qfrhk0iov7om4ehoj.png"
    },
    "message": "Update Photo Success"
}
```

## Recipe

### Get All Recipe

GET recipe/

```Body
{
    "success": true,
    "statusCode": 200,
    "data": [
        {
            "id_recipe": 1,
            "title": "Burger",
            "ingredients": "Roti, Daging",
            "photo": "http://res.cloudinary.com/diunwoak6/image/upload/v1673707131/food/gymdcqnvxcf1ow4tkgxw.jpg",
            "video": "https://res.cloudinary.com/diunwoak6/video/upload/v1676346050/food/vqjv0kyqqkgendwkst4x.mp4",
            "user_id": "367c1d1a-2596-4746-bc24-20b80982f0ab"
        },
        {
            "id_recipe": 11,
            "title": "Chesse Pizza",
            "ingredients": "Teigu, Keju",
            "photo": "http://res.cloudinary.com/diunwoak6/image/upload/v1676037705/food/cq4snrjmrahqbwiga8qr.jpg",
            "video": "https://res.cloudinary.com/diunwoak6/video/upload/v1676346050/food/vqjv0kyqqkgendwkst4x.mp4",
            "user_id": "367c1d1a-2596-4746-bc24-20b80982f0ab"
        },
        {
            "id_recipe": 13,
            "title": "Pizza",
            "ingredients": "Terigu, Sosis",
            "photo": "http://res.cloudinary.com/diunwoak6/image/upload/v1676037953/food/yquyfzio1v6relzlwcma.jpg",
            "video": "https://res.cloudinary.com/diunwoak6/video/upload/v1676346050/food/vqjv0kyqqkgendwkst4x.mp4",
            "user_id": "367c1d1a-2596-4746-bc24-20b80982f0ab"
        }
    ],
    "message": "Get Data Success"
}
```

### Get Recipe Id

GET recipe/detail/:id_recipe

```Body
{
    "success": true,
    "statusCode": 200,
    "data": {
        "id_recipe": 13,
        "title": "Pizza",
        "ingredients": "Terigu, Sosis",
        "photo": "http://res.cloudinary.com/diunwoak6/image/upload/v1676037953/food/yquyfzio1v6relzlwcma.jpg",
        "video": "https://res.cloudinary.com/diunwoak6/video/upload/v1676346050/food/vqjv0kyqqkgendwkst4x.mp4",
        "user_id": "367c1d1a-2596-4746-bc24-20b80982f0ab"
    },
    "message": "Get data recipe success"
}
```

### Add Recipe

GET recipe/add-recipe

```Body
{
    "success": true,
    "statusCode": 200,
    "data": {
        "title": "Nasi Goreng",
        "ingredients": "Telor, Garam, Sosis, Bawang merah",
        "photo": "https://res.cloudinary.com/diunwoak6/image/upload/v1676477786/food/hza9edypkiliqaliy0rk.jpg",
        "video": "https://res.cloudinary.com/diunwoak6/video/upload/v1676477798/food/ibmt38brzxf8snvubfx2.mp4"
    },
    "message": "Insert Recipe Success"
}
```

### Delete Recipe

DELETE recipe/delete/:id_recipe

```Body
{
    "success": true,
    "statusCode": 200,
    "data": [],
    "message": "Delete recipe success"
}
```

## Comment

### Get Comment

GET recipe/comment/:id_recipe

```Body
{
    "success": true,
    "statusCode": 200,
    "data": [
        {
            "id_comment": 22,
            "comment": "sangat enak,gurih dan sedap",
            "user_id": "367c1d1a-2596-4746-bc24-20b80982f0ab",
            "recipe_id": 11,
            "fullname": "Alvin Jamal Azkya",
            "photo": "https://res.cloudinary.com/diunwoak6/image/upload/v1676379392/food/huaopbzuzgcziepowyvq.png"
        }
    ],
    "message": "Get comment success"
}
```

### Add Comment

POST recipe/add-comment/:id_recipe

```Body
{
    "success": true,
    "statusCode": 200,
    "data": {
        "recipe_id": "11",
        "comment": "sangat sedap"
    },
    "message": "Insert Comment Success"
}
```

## Saved Recipe

### Get Saved Recipe

GET recipe/saved-recipe

```Body
{
    "success": true,
    "statusCode": 200,
    "data": [
        {
            "id_saved": 12,
            "user_id": "367c1d1a-2596-4746-bc24-20b80982f0ab",
            "recipe_id": 11,
            "title": "Chesse Pizza",
            "photo": "http://res.cloudinary.com/diunwoak6/image/upload/v1676037705/food/cq4snrjmrahqbwiga8qr.jpg"
        },
        {
            "id_saved": 7,
            "user_id": "367c1d1a-2596-4746-bc24-20b80982f0ab",
            "recipe_id": 1,
            "title": "Burger",
            "photo": "http://res.cloudinary.com/diunwoak6/image/upload/v1673707131/food/gymdcqnvxcf1ow4tkgxw.jpg"
        }
    ],
    "message": "Get saved recipe success"
}
```

### Add Saved Recipe

POST recipe/saved-recipe/post-saved

```Body
{
    "success": true,
    "statusCode": 200,
    "data": [],
    "message": "Post save recipe success"
}
```

### Delete Saved Recipe

DELETE recipe/saved-recipe/delete/:id_saved

```Body
{
    "success": true,
    "statusCode": 200,
    "data": [],
    "message": "Delete save recipe success"
}
```

## Like Recipe

### Get Like Recipe

GET recipe/like-recipe

```Body
{
    "success": true,
    "statusCode": 200,
    "data": [
        {
            "id_liked": 8,
            "user_id": "367c1d1a-2596-4746-bc24-20b80982f0ab",
            "recipe_id": 11,
            "title": "Chesse Pizza",
            "photo": "http://res.cloudinary.com/diunwoak6/image/upload/v1676037705/food/cq4snrjmrahqbwiga8qr.jpg"
        },
        {
            "id_liked": 3,
            "user_id": "367c1d1a-2596-4746-bc24-20b80982f0ab",
            "recipe_id": 1,
            "title": "Burger",
            "photo": "http://res.cloudinary.com/diunwoak6/image/upload/v1673707131/food/gymdcqnvxcf1ow4tkgxw.jpg"
        }
    ],
    "message": "Get like success"
}
```

### Add Like Recipe

POST recipe/like-recipe/post-like

```Body
{
    "success": true,
    "statusCode": 200,
    "data": [],
    "message": "Post like success"
}
```

### Delete Like Recipe

DELETE recipe/like-recipe/delete/:id_liked

```Body
{
    "success": true,
    "statusCode": 200,
    "data": [],
    "message": "Delete save recipe success"
}
```
## Contact

Contributors names and contact info Fullstack Developers

* Alvin Jamal Azkya [@AlvinJamalAzkya](https://github.com/alvinjamal)
