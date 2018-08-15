# Readme

Clone JS Objects without worrying about `Circular` data and key names not suitable for MongoDB 

Details [here](https://jira.mongodb.org/browse/SERVER-3229?focusedCommentId=36821&page=com.atlassian.jira.plugin.system.issuetabpanels%3Acomment-tabpanel#comment-36821)


## Use

`npm install clone-data`

```javascript
const cloneData = require('clone-data');
...
let myData = cloneData(oldData);
```


## Origin

The code is based (or copied from):

[https://github.com/winstonjs/winston-mongodb/blob/f0095206e9c27e903bd7e896822633bf47601030/lib/helpers.js](https://github.com/winstonjs/winston-mongodb/blob/f0095206e9c27e903bd7e896822633bf47601030/lib/helpers.js)

## Original author

The original author for that code is [Yurij Mikhalevich](https://github.com/yurijmikhalevich)
