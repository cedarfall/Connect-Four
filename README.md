<h1 align="center">Connect Four</h1>

![Tic Tac Toe Board](/images/board.png)

### Overview

The project is a JavaScript version of the popular **Connect Four** game created using `Bootstrap`, `JavaScript` and `jQuery`.

### Logic

1. Whenever a `circle` is clicked, check the `turn` and change the color accordingly.

2. `board` is a `JavaScript` object using which we keep track of the board. The object has the following structure :

   `element` provides a jQuery object with the context of a circle, so you can quickly access the DOM without querying again and again.

   `index` helps to quickly resolve index without having to do DOM calls. It stores the individual index of each `element` corresponding to a circle on the board.

   `color` keeps track of the color of the circles on the board.

3. Winning condition is checked whenever a turn gets played. The `circle` that gets filled in the `turn` is used to check if 4 circles are connecting either row-wise, column-wise or diagonally.

### checkRow() and checkDiagonal() with for loop

The reason for calling `checkRow` and `checkDiagonal` in a for loop is because of the way these checkers are implemented. Due to this implementation if a `circle` is not the last element on either ends of the `line of 4`, the implementation won't work.

One such example is shown below - 

![Tic Tac Toe Board Diagonal Four](/images/board-detail.png)

`Red` is about to complete its `four` through the diagonal, but it won't be detected since our functions can only detect `four` when the filled circle is at its either ends.

Which is why we call the `checkRow` and `checkDiagonal` functions inside a for loop which goes through all the possible rows and diagonals that may involve the clicked circle, thus detects all the cases.

Although this approach increases the lines of code, the conditionals used decrease the amount of iteration over non-meaningful cells, since we are only checking combinations that involve the current clicked cell. 

### Alternatives

One could also simply iterate through all the columns, rows and diagonals on the board to check winning condition. Which would definitely save lines of code but would cause unnecessary iteration through all of the board.

One could also simplify the process of finding index of a circle by using `jQuery` and the index method

as shown in the link - https://stackoverflow.com/questions/788225/table-row-and-column-number-in-jquery

and not use an object to keep track of the state of the board.

### Acknowledgements

This project was created with reference to **Jose Portilla's Full Stack Django Development Course**, although it has been heavily modified.
