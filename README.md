# Match 2 game

**Overview:**

A game in which you have to find all matching images for the least amount of turns.

After opening the site, user waits till all the images are loaded from the server.
After that user gets 8 original images and 8 duplicates and can play a game.
After opening a pair of images the counter of turns is incremented by 1.
After finding all pairs user gets a "You win!" message and some confetti :).
User is also able to see his records each time he decides to play a game.

**Technical issues:**

Main issue was basically creating an algorithm for a game. This includes:
* Keeping track of selected images
* Updating images based on if user choose correct or incorrect match
* Creating proper data structure for game objects(images)