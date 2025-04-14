# Socket events which FE will either subscribe or emit

- Note: As I cannot share the websocket file from postman, so maintaining the list here.

**Socket URL: http://localhost:3004**<br>

### _Note: Socket is secured using the jwt, so frontend needs to send the authorization header on socket calls like every other GQL calls, otherwise an user cannot get connected to socket._

## FE to Server Events:

- [JOIN_ROOM](#JOIN_ROOM)
- [PLACE_BET](#PLACE_BET)
- [CANCEL_BET](#CANCEL_BET)
- [CASH_OUT](#CASH_OUT)
- [GAME_STATS](#GAME_STATS)
- [LAST_MULTIPLIERS](#LAST_MULTIPLIERS)

### **`JOIN_ROOM`**

- Usecase: Join Game Rooms.

**`Note: You don't need to specifically call this event, on new connection with token, server will automatically make the player join the required rooms.`**

JSON to be sent:

```json
{
  "gameCode": "AVIATORX"
}
```

### **`PLACE_BET`**

- Usecase: As the name says, this is used when an user is trying to place bet.

JSON to be sent:

```json
{
  "gameCode": "SLIDE",
  "currency": "INR",
  "betAmount": 10,
  "btnIndex": 0,
  "cashOutAt": 0,
  "targetMultiplier": 1.1
}
```

On success Server emits event [PLACE_BET_RESPONSE](#PLACE_BET_RESPONSE)

### **`CANCEL_BET`**

- Usecase: Used to cancel placed bet.

JSON to be sent:

```json
{
  "betId": "ol6Wv13uRq5QThYzEmeh4",
  "gameCode": "AVIATORX",
  "gameId": "66b914f15bc0bc81874c6f15"
}
```

On success Server emits event [CANCEL_BET_RESPONSE](#CANCEL_BET_RESPONSE) and updated user balance event [USER_BALANCE_UPDATE](#USER_BALANCE_UPDATE).

### **`CASH_OUT`**

- Usecase: The name says for what it is used for.

JSON to be sent:

```json
{
  "betId": "ol6Wv13uRq5QThYzEmeh4",
  "gameCode": "AVIATORX",
  "gameId": "66b914f15bc0bc81874c6f15"
}
```

On success Server emits event [CASHOUT_RESPONSE](#CASHOUT_RESPONSE) and updated user balance event [USER_BALANCE_UPDATE](#USER_BALANCE_UPDATE).

### **`GAME_STATS`**

- Usecase: This is used to fetch the current status of a game.

_Note: On Socket connect, server will automatically send this event, but in case at any point FE wants to explicitly call it, feel free to use this._

```json
{
  "gameCode": "AVIATORX"
}
```

Server will return back the same [GAME_STATS](#GAME_STATS) event.

### **`LAST_MULTIPLIERS`**

- Usecase: This is used to fetch the last 30 rounds multipliers.

_Note: On Socket connect, server will automatically send this event, but in case at any point FE wants to explicitly call it, feel free to use this._

```json
{
  "gameMode": "2"
}
```

NOTE: `gameMode` is optional to send, by default it will take it from user `beToken`

Server will return back the same [LAST_MULTIPLIERS](#LAST_MULTIPLIERS) event.

## Server to FE User Specific Events:

- [PLACE_BET_RESPONSE](#PLACE_BET_RESPONSE)
- [CANCEL_BET_RESPONSE](#CANCEL_BET_RESPONSE)
- [USER_BALANCE_UPDATE](#USER_BALANCE_UPDATE)
- [CASHOUT_RESPONSE](#CASHOUT_RESPONSE)
- [GAME_STATS](#GAME_STATS)
- [LAST_MULTIPLIERS](#LAST_MULTIPLIERS)
- [SLIDE_CASHOUT_RESPONSE][#SLIDE_CASHOUT_RESPONSE]

### **`PLACE_BET_RESPONSE`**

- Usecase: This will be emitted back to the user who placed a bet using **PLACE_BET** event. This will **NOT** be sent to all users.

JSON returned in case of **SUCCESSFUL** bet:

```json
{
  "betId": "Sx2qia2UMyLJ1nmrCIxeF",
  "betAmount": 10,
  "roundId": "_F8anhObecnwWosM8Lrdl",
  "playerId": "669fe5e4cf3b8efc2216f1b8",
  "gameMode": "2",
  "gameCode": "AVIATORX",
  "currency": "INR",
  "cashOutAt": null,
  "btnIndex": 0,
  "status": "BET_PLACED",
  "success": true
}
```

JSON returned in case of **FAILED** bet:

```json
{
  "betAmount": 10,
  "playerId": "669fe5e4cf3b8efc2216f1b8",
  "gameCode": "AVIATORX",
  "btnIndex": 0,
  "success": false,
  "error": "Max 2 bets allowed per round"
}
```

```json
{
  "betAmount": 10,
  "playerId": "669fe5e4cf3b8efc2216f1b8",
  "gameCode": "AVIATORX",
  "btnIndex": 0,
  "success": false,
  "error": "Bet place not allowed, Please try again in next session."
}
```

### **`CANCEL_BET_RESPONSE`**

- Usecase: This will be emitted back to the user who cancelled a bet using **CANCEL_BET** event. This will **NOT** be sent to all users.

JSON returned in case of **SUCCESSFUL** cancellation:

```json
{
  "roundId": "SiPTWImzhTls7D9QgQ5Qg",
  "betId": "XtHBGf65PUOc02r-HVnmE",
  "playerId": "669fe5e4cf3b8efc2216f1b8",
  "gameCode": "AVIATORX",
  "gameMode": "2",
  "btnIndex": 0,
  "status": "BET_CANCELLED",
  "success": true
}
```

JSON returned in case of **FAILED** cancellation:

```json
{
  "betId": "KzaZUjRIldWGTGW4v5RL6",
  "success": false,
  "error": "Cancel not allowed now"
}
```

```json
{
  "betId": "KzaZUjRIldWGTGW4v5RL6",
  "success": false,
  "error": "Bet already settled"
}
```

### **`USER_BALANCE_UPDATE`**

- Usecase: This will be emitted to the FE when there is a change in the player balance.

JSON returned

```json
{
  "balance": 1005549.3173580406,
  "playerId": "669fe5e4cf3b8efc2216f1b8"
}
```

### **`CASHOUT_RESPONSE`**

- Usecase: This will be emitted back to the user who cashed out using **CASH_OUT** event. This will **NOT** be sent to all users.

JSON returned in case of **SUCCESSFUL** cash out:

```json
{
  "roundId": "_F8anhObecnwWosM8Lrdl",
  "betId": "Sx2qia2UMyLJ1nmrCIxeF",
  "playerId": "669fe5e4cf3b8efc2216f1b8",
  "gameCode": "AVIATORX",
  "gameMode": "2",
  "betAmount": 10,
  "currency": "INR",
  "payout": 10.93685272684361,
  "payoutMultiplier": 1.0936852726843609,
  "btnIndex": 0,
  "status": "CASHED_OUT",
  "success": true
}
```

JSON returned in case of **FAILED** cash out:

```json
{
  "betId": "hCSrsUv03wrmXLLGq8erQ",
  "success": false,
  "error": "Bet already settled"
}
```

```json
{
  "betId": "bRgg01JZNN4AHBEzf2iU3",
  "success": false,
  "error": "Game not in running state"
}
```

### **`GAME_STATS`**

- Usecase: This will be emitted after a successful socket connection. This holds the current game details. The `bets` array here will hold only the current user bet details. If there are not bets from current user then it will be empty.

_Note: This event is triggered automatically on socket connect_

JSON returned:

```json
{
  "gameId": "66bb5d8c64a0dcf8395b6afe",
  "roundId": "hlFgtNKV_YnoMuUxJgUdr",
  "status": "RUNNING",
  "currentMultiplier": 4.583214558202664,
  "nextGameHashedSeed": "1ad4b64596e647310188682e06e89ff573b6eb1f6e07a11a1b2a94a481a12a82",
  "bets": [
    {
      "betId": "Myp8B--7ZYviu16_QRa0I",
      "roundId": "hlFgtNKV_YnoMuUxJgUdr",
      "betAmount": 100,
      "playerId": "669fe5e4cf3b8efc2216f1b8",
      "gameMode": "2",
      "gameCode": "AVIATORX",
      "currency": "INR",
      "betStatus": "CREDIT_SUCCESS",
      "cashOutAt": 2,
      "btnIndex": 0,
      "payout": 295.82150505913154,
      "payoutMultiplier": 2.9582150505913156
    },
    {
      "betId": "obiJK2IYETNELTrKrerSg",
      "roundId": "hlFgtNKV_YnoMuUxJgUdr",
      "betAmount": 100,
      "playerId": "669fe5e4cf3b8efc2216f1b8",
      "gameMode": "2",
      "gameCode": "AVIATORX",
      "currency": "INR",
      "betStatus": "DEBIT_SUCCESS",
      "cashOutAt": 2,
      "btnIndex": 0,
      "payout": 0,
      "payoutMultiplier": 0
    }
  ]
}
```

### **`LAST_MULTIPLIERS`**

- Usecase: This will be emitted after a successful socket connection. This holds the last round multipliers.

```json
[
  { "roundId": "VEFQ1YjnRNCmtDAGYJ-g-", "crashMultiplier": 1.3272242117729638 },
  { "roundId": "5yDYJjJA-5ht2ndQBuqNe", "crashMultiplier": 1.1191207245303831 }
]
```

### **`SLIDE_CASHOUT_RESPONSE`**

- Usecase: As the name suggests, it will be triggered _once_ to the specific player with total payout, So, no need to sum up all the bets in FE and then display the final payout.

```json
{
  "multiplier": 1.0453838055130618,
  "payout": 33,
  "playerId": "669fe5e4cf3b8efc2216f1b8",
  "gameMode": "2"
}
```

## Server To FE common game Events:

**After Init call success, FE should start listening to events for `gameCode/gameMode`. Example: `AVIATORX/2`. Here all the common events will be sent, events like game state change, game running, any user place bet, cancel bet, cashout etc. See below for more details on each events.**

#### Q. How to use these?

Ans: Look for the `status` property in each response, based on the status decide what to do with the data. A status can have values like:

- `SCHEDULED`
- `STARTING`
- `ACCEPT_BET`
- `RUNNING`
- `ENDED`
- `UNDER_MAINTENANCE`
- `CASHED_OUT`
- `BET_PLACED`
- `BET_CANCELLED`
- `RESULT`

### Common game events

- A new Game is added

```json
{
  "gameId": "66badfb23b9ef895266a003a",
  "roundId": "yXe4LwiWkMFRyNC-JRFNd",
  "status": "SCHEDULED",
  "nextGameHashedSeed": "548b1c220d7a2badc24c3fc787835e7ffcf617f8c6f2f411421091f53366aa4a"
}
```

- Game goes to accepting new bets

```json
{
  "gameId": "66badfb23b9ef895266a003a",
  "roundId": "yXe4LwiWkMFRyNC-JRFNd",
  "status": "ACCEPT_BET",
  "nextGameHashedSeed": "548b1c220d7a2badc24c3fc787835e7ffcf617f8c6f2f411421091f53366aa4a",
  "delay": 5000
}
```

- Game is starting

```json
{
  "gameId": "66badfb23b9ef895266a003a",
  "roundId": "yXe4LwiWkMFRyNC-JRFNd",
  "status": "STARTING",
  "nextGameHashedSeed": "548b1c220d7a2badc24c3fc787835e7ffcf617f8c6f2f411421091f53366aa4a",
  "delay": 2000
}
```

- Game is running (🛫)

```json
{
  "gameId": "66badfb23b9ef895266a003a",
  "roundId": "yXe4LwiWkMFRyNC-JRFNd",
  "status": "RUNNING",
  "multiplier": 1,
  "isCrashed": false
}
```

- Game ended (🙁)

```json
{
  "gameId": "66badf82aa4af04ee28ae491",
  "roundId": "ZnNxVgNSdBY36j-6TMd4m",
  "status": "ENDED",
  "multiplier": 10,
  "isCrashed": true,
  "delay": 5000
}
```

- Some placed a bet when game is in `ACCEPT_BET` status

```json
{
  "betId": "Sx2qia2UMyLJ1nmrCIxeF",
  "betAmount": 10,
  "roundId": "_F8anhObecnwWosM8Lrdl",
  "playerId": "669fe5e4cf3b8efc2216f1b8",
  "gameMode": "2",
  "gameCode": "AVIATORX",
  "currency": "INR",
  "cashOutAt": null,
  "btnIndex": 0,
  "status": "BET_PLACED",
  "success": true
}
```

- Someone cancelled a bet when game is in `ACCEPT_BET` status

```json
{
  "roundId": "SiPTWImzhTls7D9QgQ5Qg",
  "betId": "XtHBGf65PUOc02r-HVnmE",
  "playerId": "669fe5e4cf3b8efc2216f1b8",
  "gameCode": "AVIATORX",
  "gameMode": "2",
  "btnIndex": 0,
  "status": "BET_CANCELLED",
  "success": true
}
```

- Someone Cashed out when game is in `RUNNING` status

```json
{
  "roundId": "_F8anhObecnwWosM8Lrdl",
  "betId": "Sx2qia2UMyLJ1nmrCIxeF",
  "playerId": "669fe5e4cf3b8efc2216f1b8",
  "gameCode": "AVIATORX",
  "gameMode": "2",
  "betAmount": 10,
  "currency": "INR",
  "payout": 10.93685272684361,
  "payoutMultiplier": 1.0936852726843609,
  "btnIndex": 0,
  "status": "CASHED_OUT",
  "success": true
}
```

- `RESULT` - This is sent for slide game, with the final result

```json
{
  "gameId": "66c20ab5415ef1fafbd2743a",
  "roundId": "81LZL6kDHIo8F5qXfnCiw",
  "status": "RESULT",
  "multiplier": 58.73886264920916,
  "gameMode": "2",
  "startTime": "2024-08-18T14:52:37.559Z",
  "delay": 11000
}
```

- `UNDER_MAINTENANCE` - This is emitted when a gameMode is stopped.

```json
{
  "gameMode": "2",
  "gameCode": "AVIATORX",
  "status": "UNDER_MAINTENANCE",
  "reason": "This game mode is not available anymore, please refresh the page to get connected to new game mode."
}
```

## Notes

### SLIDE Game flow:

- There is no longer a `HALT` status is sent with countdown.
- Instead, now `SCHEDULED` -> `ACCEPT_BET` -> `STARTING` -> `RESULT`, these are the flow.
- When `ACCEPT_BET` event is sent, BE sends the `delay` and a `startTime`. FE should use this `delay` to show the countdown.
- In case of page reload or reconnection on `GAME_STATS` event BE sends the `gameEndIn` property, which holds the time left before the results are out. FE can use this property to reset back the countdown.
- After `RESULT` state and before `SLIDE_CASHOUT_RESPONSE` event, if there is page reload or reconnection, again on `GAME_STATS` FE can use the `currentMultiplier` property get the last round result multiplier.
