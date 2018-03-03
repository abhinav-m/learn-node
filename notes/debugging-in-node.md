## Debugging in node

### Using the command line: 

The command `node inspect app.js` can be used to start the debugger on  a certain node process.

Once in debugging mode:

* `n`: used to move to the next line of code
* `c`: used to continue to the next `debugger` breakpoint inserted in the code.
* `repl`: enter **Read-Eval-Print-Loop** environment, to assess value of variables, make changes to them if necessary.


To add a breakpoint to a node.js application the keyword `debugger` can be used on the line we want to break at.



### Using chrome debugger:

The command `node --inspect-brk app.js` can be used to debug code using google chrome.

Once the command has been run:

* Open google chrome browser
* Navigate to chrome://inspect
* Click on `Open dedicated DevTools for Node` link

###Note:

>For continuous debugging and writing code in the same file, `nodemon` can be used  with the `inspect` and `inspect--brk` commands example
`nodemon inspect app.js` `nodemon inspect--brk app.js`