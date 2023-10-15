# Music Player 

While working on the assignment using the provided assignment document, I couldn't find answers to some of the queries I had. This README file mentions those queries and the reasons behind the actions taken to solve them. In addition to those details, I have also summarized the important packages used and some points to keep in mind while judging the application.

## Table of contents

- [Oueries](#queries)
  - [Initial UI](#initial-ui)
  - [After song completely played](#after-song-completely-played)
  - [From "For You" to "Top Tracks" or vice versa](#from-for-you-to-top-tracks-or-vice-versa)
  - [Button with three dots](#button-with-three-dots)
- [Inconsistent assignment note](#inconsistent-assignment-note)
- [Additional information](#additional-information)
  - [Music player thumb](#music-player-thumb)
  - [Tablet view](#tablet-view)
  - [NextJS](#nextjs)
- [Main tools used other than React](#main-tools-used-other-than-react)
- [Link](link)

## Queries

### Initial UI

**What should the initial UI look like?**

Should the first song on the list be selected and autoplayed, or should I allow the user to select a song? I display a message instructing the user to select a song from the list before using the music player, and I personally think this is how it should be (allowing the user to act before playing any lengthy audio file).

### After song completely played

**What should I do after the selected song is completely played?**

Should I replay the same song? Should I automate selecting the next song from the list? I think both of the approaches are correct, and I decided to replay the same song again.

### From For You to Top Tracks or vice versa

**What would be the correct behavior of the application when the user switches from "For You" to "Top Tracks" or vice versa?**

The music player has "play next song or previous song" buttons, making the logic of switching from "For You" to "Top Tracks" difficult to implement. What if the selected song is from "For You" and the user switches to "Top Tracks"? The "play next or previous song" buttons of the music player might become useless since there is no guarantee that the selected "For You" song is also in the "Top Tracks" list. To avoid complexity, I simply **remove** the selected song if the user switches from "For You" to "Top Tracks" or vice versa.

### Button with three dots

**How should the application react when the user clicks on the button that has three dots?**

The music player has a button that has three dots. I was not sure about the action the application needs to take when the user clicks on it. I assumed it was just present for completeness since there were no requirements associated with this button. So in the application, this button does nothing.

## Inconsistent assignment note

The assignment document had a note  - *API will return different title, artist, cover image and duration but url of every song will be the same.*

But on reading the response from the REST API, I found each song gets a unique audio file. But some URLs have spaces associated with them. If I remove the spaces, those URLs point to the correct audio files. Also, right now, there is a URL that does not exist (maybe the URL was mistyped?). I have handled this case in my application lightly since I don't think this was intended.

## Additional information

### Music player thumb

The Figma file does not have a thumb associated with the music player's slider. Personally, I think at least a single thumb is a must in a slider. I have added a thumb so that testing my application on mobile devices and using the slider on laptops will be easier.

### Tablet view

The tablet view of my application might look weird at first (it's not strictly centered horizontally). This is by design. I wanted to give the song list (which opens from the left of the screen) enough space so that it doesn't cover my music player.

### NextJS

I was unsure whether I could use NextJS to develop the application. I chose not to use NextJS because the assignment document didn't mention anything related to NextJS, and NextJS helps a lot. I assumed this assignment was to test my React skills by allowing me to use a minimum of additional tools.

## Main tools used other than React

The assignment document mentions using React but doesn't list any additional tools that can or can't be used. I have listed down some of the major tools I have used along with React to develop this application. 

- TypeScript
- TailwindCSS
- Radix Primitives (Dialog, Slider, Tooltip)

## Link
Live Site URL: [live site](https://music-player-el07.vercel.app/)
