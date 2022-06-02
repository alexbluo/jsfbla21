# Maryland Tourist Attractions Searcher

## Overview

Website that suggests tourist attractions in Maryland based on user-defined attributes. Choose from over 300 filters via a familiar faceted or fulltext search and view detailed information on results narrowed down from 1000+ attractions. Interact with Google Maps to search for attractions within a chosen distance of you or another attraction.

## Tech Stack

This project uses the MERN stack, which is MongoDB, Express, React, Node.js, and a REST API. Other notable technologies used include:

- TailwindCSS (CSS framework)
- Redux Toolkit + React Redux (global state)
- Axios + React Query (fetching and caching)
- Vite (build tool)
- Docker (containerization)
- Heroku | Google Cloud Run (deployment)
- Puppeteer (web scraping)

## Changes Since March 2022

Below is a list of features, technologies, and fixes which have been or will be implemented, with more recent and higher priority ones at the top:

- [ ] Fulltext search for filter and map pages
- [ ] List nearby places on map marker select
- [ ] Refactor into smart and dumb components
- [ ] React concurrent for handling input fields that query on input (search and distance)
- [ ] Machine learning using user behavior when entering typos like Google search "did you mean"
  - definitely not enough time or data to get this done, but fun idea
- [x] Rescrape all data and insert to database in a different format before doing lots of refactoring
- [x] Deploy to Heroku, AWS, and GCP (serverless/PaaS)
- [x] Easy clearing of checked filters
- [x] Docker because it sounds fun
- [x] Update to internal checkbox system
- [x] Responsive layout
- [x] Cool landing page
- [x] Fix performance when multiple markers are rendered at once
- [x] Add maps to attraction detail pages
- [x] Replace current library for Google Maps API with one that supports both React and InfoWindows
- [x] Redesign of map page UI and modals system
- [x] Move from plain CSS to TailwindCSS, CRA/Webpack to Vite, React Context API to Redux Toolkit + React Redux, Fetch API to Axios + React Query, template literals to classnames, npm to yarn
- [x] Small performance optimizations, bug fixes, code structure cleanups

## Dynamic Backup

The following commands from the MongoDB Database Tools are used to dynamically backup the database:

- take snapshot: mongodump --uri mongodb+srv://alexbluo:@mdcp.opzuc.mongodb.net/attractionsDB -o ~/mongodump
- restore snapshot: mongorestore --uri mongodb+srv://alexbluo:@mdcp.opzuc.mongodb.net/attractionsDB -d attractionsDB ~/mongodump/attractionsDB

Note that a .env file with the correct credentials are required for anything related to the database to work locally

## Sourcing

- [MD Flag GIF](https://giphy.com/gifs/flag-state-baltimore-l0MrFpI94esUsTbIA)
- [Attractions data](https://www.visitmaryland.org/things-to-do/attractions)
- [Crab](https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.seekpng.com%2Fipng%2Fu2q8w7q8o0y3a9w7_seafood-graphic-royalty-free-sad-huge-sad-crab%2F&psig=AOvVaw2jx0wHz9fOfhmNjyJzsKxc&ust=1651669215591000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCJjBjbmxw_cCFQAAAAAdAAAAABAD)
- [Image for... no image](https://depositphotos.com/vector-images/no-image-available.html)
