# LucyDigGame

I was inspired by the game pacman.  I wanted to make a game that was similar but not the exact theme.

In order for a player to win the game, they must collect all the bones in the gamecanvas, while also avoiding angry gophers.
The gophers are moving randomly at a fast velocity which makes it diffcult to navigate past them.  Tennis balls are placed on the screen as well and can be used to change the gophers status so the player can get rid of them.
There is a timer set though, so that the gophers are able to regenerate in the location they died. If you are caught by a gopher you lose the game.

I used html, css, and javascript to build it out.  Javascript was mostly used to build the tileMap through an array and then images were drawn on the canvas or tileMap. 

Functions were created to animate the lucy image so it appears she was running by looping though lucyimageindex array. Worked on rotating the lucy image so she switches direction depending on key pressed. 

Next worked on collision detection to the outer perimeter so lucy would stay on screen and inside the canvas and so game was lost when she ran into gophers.  Functionality was also added to make tennisball animated and allow for lucy to attack the gophers.

While there is a restart button it is used to refresh the screen.  I would like to add more tilemaps and levels to add more challenges as levels progress.


