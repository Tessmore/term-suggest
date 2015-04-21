# Term suggest
Find closest matching suggestion for a word

`npm install term-suggest`


### Usage

```
var suggester = require('term-suggest');

var input = "stauts";
var terms = ["clone", "pull", "push", "commit", "status", "help"];

var output = suggester.closest(input, terms); // "status"
```