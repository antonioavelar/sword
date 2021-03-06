# Sword Challenge

For several reasons i couldn't dedicate the time i wanted to this challenge. I've just completed the first 2 parts with minimal unit tests as examples.

This project in not production ready. With more time this is what i would do:

https://viewer.diagrams.net/?tags=%7B%7D&highlight=0000ff&edit=_blank&layers=1&nav=1&title=Untitled%20Diagram.drawio#R5Vrbcto6FP0aHssgyTceAwntmWnazCRnTvoo28LWYCxGFgH69ZWwbGzJKSRjoM3JZbCWLpaW1vbe2maApsvtZ45X6T2LSTaAo3g7QLcDCIGPfPmhkF2JjD1UAgmnsW50AB7pT6LBkUbXNCZFq6FgLBN01QYjluckEi0Mc8427WZzlrXvusIJsYDHCGc2%2Bh%2BNRVqiAfQP%2BBdCk7S6M%2FDGZc0SV431SooUx2zTgNDdAE05Y6K8Wm6nJFPkVbyU%2FWav1NYT4yQXp3T4ET49Pd%2FNk2%2BPMPbJwrlJvqSf9CgvOFvrBf9bEF6o6RL%2BQiOi5y52FSGcrfOYqDFHAzTZpFSQxxWOVO1GSkBiqVhmsgTk5Zxm2ZRljO%2F7otglQexIvBCcLUijJoAh8jxZo%2BdDuCDbVxcKavqk7ghbEsF3sonuAB3NuJYcHOny5rCBoNqVtLF5nsaw1kxSD32gVV5oZt%2FAMrRYfsLF4mOx7ATXZhlZLH9jgs5phAVl%2BV9Ntue1yUYOuDLZrkX2ZyzIBu96ZXc%2Bn8Mo6mI39kLP7YldZJJ7bSV7FrkWqySPb5R7k6Uow0VBozaRbdbJlopnXaOufzTw222zsKsKuVzIc7Ow7zN0q%2BKh275U9SsnSmLLqxqbIRfD1jwixyUmME%2BIOObD7M1t7J7bsXkVxkkmnw8v7el27ai%2BwwOjciEH7YwNZzM2RFEuU%2FdqumdjIMf0Wo4xUMmDNdBeYPWy3685%2FxKaAx9Fc%2FCamgOmN3Dfqbl6QtVAo8tqLjiuORk1r9RltMuoFBdHx31IWMrwa1gDOFoke3F%2BXws5DNF4UZ42gNuTGzHYrP1KQxXoN6ro3Y2MPzS9LrwyvcA%2BPN2TolAHSjgKVbzCbb4XRESpfm6tlF3tZ%2BVO5J%2Bc57T8d2XTqUKG0O0AuzDfBoHdTH6ArjuYYBfm2yCwm6lSNes22IX5rj1jszfo6A2M3vIPTVipvmmdCVAcz1kuGmGj%2FJ2pLZ4kHMeUtOpmM2cWTBp1t5TLgdTZAd3mjCuRmQHqZArQPgy1AtT5%2FkfWxLhIa6eoLEAeSLKvOCTZAyuoHj5kQrBlo8FNRhNVIZgyP6xLkZyVVFU7ZJYr1HkTAKuyVpy6JS5WJR1zulXzmFQ2v9wmKmczxJvCGXJSOo1%2FIjWfiSyWV%2B1WRV70Y8yO6XkQtIzZD2xjrrD%2Bjdk%2Bo%2FcU%2F%2Bj45awR0L70QDiVZCh99B0WVZm3o6H4VWPxs8VFl47FgZ3K6E2MTlONn0bDEUKXk6Qa%2BYwyhX%2BFTBEw1OW%2F98gIDb0H48vK1LFk%2BrAOM1qkErx7ISq4MWUrXYZoC9XybaYLXNI4Vt2VU6I%2FcVh7tnb8pEIAvBasCjstp5wzFZq2PLiG%2BohOHbe1F05H8D%2Fu0BQ8W3RqZ%2Bj%2Bv5sTGIbS8UbgsptzkWzLIfJ45dHe8TT%2BA3Iw4NRoA131Kf5REn%2FAzsKod4CWHqtjw3qZ3USCNR8GbzzNNETceWbrweL9UftxDHzb4ruSBWdL6YMTkjF9nC9%2Bn9Xv0UrRqbFWcE0rdVFghEjGEKdaqeebsZYx0JmttHJF5ttNReU9znHSYbG2Oz%2FV557u9ruShW2d9mHNRqALO941ex0iQm%2B3Zlk8fCWj3LzDF1vQ3S8%3D

## How to start the project

Its possible to override every single configuration on the application with env vars but I can explain that on the review. (This services uses nconf).

```
  yarn dev // starts docker compose
  yarn migrate // applies first time migration on the database
  yarn test // test the application
```

## How to make it a prod ready project

- Add logs, metrics, tracing and alerting
- Add Cache
- Perform NFTs to measure performance/pods needed
- Decouple database for each service and entity
- Move from compose to a production ready orchestrator (K8s)
- Add proper unit testing + intregration tests

## Requests

```
// create tasks (manager) Bearer 1 is the token that bellongs to a user that exists on the database
curl --location --request POST 'http://localhost:3000/tasks' \
--header 'Authorization: Bearer 1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "date":  "2011-10-05T14:48:00.000Z",
    "summary": "a dummy summary"
}'

// get tasks (manager) Bearer 2 is the token that bellongs to the manager
curl --location --request GET 'http://localhost:3000/tasks' \
--header 'Authorization: Bearer 2'

// get tasks (technician) Bearer 1 is the token that bellongs to the tech
curl --location --request GET 'http://localhost:3000/tasks' \
--header 'Authorization: Bearer 1'
```
