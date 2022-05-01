# Maryland Tourist Attractions Searcher
Deployed to https://mdattractions.herokuapp.com/ (might not load due to hosting limits)
Created by Alex Luo for FBLA Coding & Programming 2021-2022

## Overview
Website that suggests tourist attractions in Maryland based on user-defined attributes. Choose from over 300 filters via a familiar faceted or fulltext search and view detailed information on results narrowed down from 1000+ attractions. Interact with Google Maps to search for attractions within a chosen distance of you or another attraction.

## Tech Stack

This project uses the MERN stack, which is MongoDB, Express, React, Node.js, and a REST API. Other notable technologies used include: 
- TailwindCSS (CSS framework)
- Redux Toolkit + React Redux (global state)
- React Query (fetching and caching)
- Vite (build tool)
- Docker (containerization)
- Atlas (cloud database hosting)
- Heroku (deployment)
- Puppeteer (web scraping)

## Conventions:

The file architecture is similar to MVC, with views/templates replaced by pages, which are really just entry-point React components.

CSS properties are arranged in the following order: 
position => display => box => color => text => misc.

## Future Plans

Below is a list of features and technologies which are on track to be implemented, in order of precedence:

- Fulltext search
- Easy clearing of checked fields
- Embedded contact form 
- Dockerize and deploy to AWS ElasticBeanstalk because it sounds fun

## Sourcing

- MD Flag GIF: https://giphy.com/gifs/flag-state-baltimore-l0MrFpI94esUsTbIA
- Attractions data: https://www.visitmaryland.org/things-to-do/attractions
- Image for... no image: https://depositphotos.com/vector-images/no-image-available.html
