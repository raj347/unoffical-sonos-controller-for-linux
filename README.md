[![Build Status](https://travis-ci.org/pascalopitz/unoffical-sonos-controller-for-linux.svg?branch=master)](https://travis-ci.org/pascalopitz/unoffical-sonos-controller-for-linux)

#Unofficial Sonos Controller for Linux

First I was tinkering with chrome apps and sonos, but chrome apps are a dying platform, so I've moved over to Electron.
The project is written in ES6 and utilizes react and flux to manage the UI

![](http://pascalopitz.github.io/unoffical-sonos-controller-for-linux/screenshots/screenshot_1.png?raw=true)

##Why?

I use Ubuntu as my main OS, and there's no decent controller app.
So I am aiming to at some point provide a usable sonos controller that can run on Linux also, installed via deb file.
Maybe it won't have all the functions of the real sonos player, but if I can browse the library and manage the queue, I'll be pretty damn happy.
Previously this was a chrome app, and I had a good 70k users on the chrome store.

##Install via [.deb file](http://pascalopitz.github.io/unoffical-sonos-controller-for-linux/dist/sonos-controller-unofficial-latest-amd64.deb)

	wget http://pascalopitz.github.io/unoffical-sonos-controller-for-linux/dist/sonos-controller-unofficial-latest-amd64.deb
	sudo dpkg -i sonos-controller-unofficial-latest-amd64.deb

##Install and Run locally

You will need node.js for this.

First, initialize the project:

	npm install

Second, start the electron app in develop mode:

	npm run develop

Building a deb:

	npm run dist

This might require some additional binaries, like graphicsMagick and icnsutils, which you can install via apt

##Firewall settings

You will need to whitelist these if you run Ubuntu firewall for example:

- UDP 1900
- UDP 1901
- TCP 3400
- TCP 1400

##Thanks to other projects

- I ported nearly all of https://github.com/bencevans/node-sonos/ so that it works in chrome.
  Also made it into an ES6 code base where it was easy to do.

- The web interface markup and css is poached from https://github.com/jishi/node-sonos-web-controller/

- Dealing with the UPNP notifications needs a webserver, and https://github.com/kzahel/web-server-chrome provided a good insight and many snippets

##Done

- [x] Create app shell and manifest
- [x] Make all ES6 compile into a JS via npm script
- [x] Single output JS
- [x] Port node-sonos discovery message via
- [x] Port node-sonos UPNP message
- [x] ES6ify the Sonos class
- [x] Port node-sonos UPNP Event Listener UPNP subscribe messages
- [x] Port node-sonos UPNP Event Listener UPNP incoming message handling
- [x] Make sense of topology messages
- [x] ES6ify Event Listener class
- [x] UPNP subscriptions for selected zone
- [x] Remember last selected room
- [x] Display and interact with rooms/zones UI
- [x] Display and interact with volume controls for single player zones
- [x] Display and interact with volume controls for multi player zones
- [x] Display and interact with mute button
- [x] Display and interact with queue
- [x] Display and interact with current play time UI
- [x] Display and interact with UI to start / stop / back / next
- [x] UI to browse artists / tracks / albums
- [x] Drill down from artists / tracks / albums
- [x] Load and display images
- [x] Search for artists / tracks / albums
- [x] Play, add to/replace queue from library browser
- [x] Highlight currently playing track
- [x] Fix image ghosting issues
- [x] Display Loading message if there's no players
- [x] Play and remove from to the queue
- [x] Select and group remove from to the queue
- [x] Label for clear queue button
- [x] Faster topology lookup
- [x] BUG: Sometimes menu click adds track twice to queue
- [x] BUG: Volume slider snapping back after dragging on single player groups
- [x] BUG: Expanded player volumes sometimes hiding prematurely
- [x] BUG: Same track in queue multiple times and selecting one selects all
- [x] BUG: Changing group topology doesn't reflect in volume controls
- [x] Group management
- [x] BUG: App gets stuck during startup ("...can only be added after listen() is called")
- [x] Drag and drop to reorder the queue
- [x] BUG: group mute button sometimes flickers with wrong state
- [x] Get some basic device logging to debug network interface bug
- [x] BUG: drag and drop locking up on older apple mac core duo
- [x] Support Line In
- [x] BUG: bridge shows up in player list
- [x] BUG: stereo pairs show as separate
- [x] BUG: BOOST shows as group
- [x] Show what's playing in zone list for all zones
- [x] BUG: Position info out of bounds
- [x] BUG: Radio stream playing now seems to skip between values
- [x] BUG: Radio station can be played from favourites
- [x] BUG: Volume control glitchy
- [x] Browsing music via file structure
- [x] BUG: Drag and drop in queue stopped working
- [x] Crossfade and play mode controls

##EXPERIMENTAL:
- [ ] Integrate services???

##TODO:
- [ ] Add track to favourites
- [ ] Save Queues
- [ ] Infinite scroll for search results
- [ ] Reduce amount of DOM nodes when scrolling long list with placeholder/margin
- [ ] Fix broken image issues (data url too long?)
- [ ] Find out how to query for next track
- [ ] Jump to places in the alphabet in media library
- [ ] Browse music on phones (is that possible)?
