# JokeAPI
An API which provides funny jokes enough to make you laugh ! Made for educational purposes !

## Base URL
- https://jokesapi-00oa.onrender.com/api/v1/jokes

## Endpoints 
| Endpoint | Description | Request Type |
|----------|-------------|--------------|
| /addJoke | To Add Joke To The Database | **POST** |
| /random | To Get Random Joke From The API | **GET** |
| /random/{jokeID} | To Get Joke With `jokeID` From The API | **GET** |
| /filter?type={type} | To Get Joke with `type` From The API | **GET** |
| /editJoke/{jokeID} | To Edit Joke With `jokeID` | **PUT** |
| /patchJoke/{jokeID} | To Partially Edit Joke With `jokeID` | **PATCH** |
| /deleteJoke/{jokeID} | To Delete Joke With `jokeID` **(REQUIRES MASTER_KEY)** | **DELETE** |

## How To Use API ?
- Go To [Postman](https://www.postman.com/).
- Create A `Collection` And Inside It Add `New Request`.
- Look Under `Endpoints` And Arrange The Request Accordingly.

## How To Use The Code ?
- Create MongoDB Database And Store The Link In `.env`.
- Now Run `npm install`.
- Then, Run `npm run start`. Your API Ready For Usage !
- Learn About Database Model -> [Here](https://app.eraser.io/workspace/1fdmJTpWaDJc868OS5fl).

## Contributing
- Contributions, issues and feature requests are always needed and welcome!

## Support
- You can show your support by giving a ⭐ if you find some help!
