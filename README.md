# Maryland Tourist Attractions Searcher
Created by Alex Luo for FBLA Coding & Programming 2021-2022

## Overview
Website that suggests tourist attractions in Maryland based on user-defined attributes. Choose from over 300 filters via a familiar faceted or fulltext search and view detailed information from results narrowed down from 1000+ attractions. Interact with Google Maps to search for attractions within a chosen distance of you or another attraction.

## Tech Stack

This project uses the MERN stack, which is MongoDB, Express, React, Node.js, and a REST API. Other notable technologies used include: 
- Vite (build tool)
- TailwindCSS (CSS framework)
- Atlas (cloud database hosting)
- Heroku (deployment)
- Puppeteer (web scraping)
- Axios (fetching)
- Yarn (package management)
- Git/GitHub (version control)

## Conventions:

File architecture is similar to MVC, with views/templates replaced by pages, which are really just entry-point React components.

CSS properties are arranged in the following order: 
position => display => box => color => text => misc.

## Future Plans

Below is a list of features and technologies which are on track to be implemented, in order of precedence:

- Tailwind CSS
- Fulltext search
- Easy clearing of checked fields
- Redesign of map page UI and popup system
  - Replace the current library for Google Maps API with one that supports both React and InfoWindows
  - Reduce map size and display information on the side instead of in popups
- Add maps to attraction detail pages
- Update to internal checkbox system
- Deploy with Heroku
- Docker because it sounds fun
- Style landing page
- Responsive layouts
- Performance improvements

## Sourcing

- MD Flag GIF: https://giphy.com/gifs/flag-state-baltimore-l0MrFpI94esUsTbIA
- Attractions Data: https://www.visitmaryland.org/things-to-do/attractions
- No Image: https://depositphotos.com/vector-images/no-image-available.html
