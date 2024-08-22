# lite-scraper-api

A Minimal Lite scraping service for the Lite Scraper Chrome extension I built, this project was mostly used to scrape E-commerce website to produce a placeholder dataset to work on for different projects for all kinds of developers, and maybe considered useful for business owners that would want to gain insights for different prices on various E-commerce websites.

### The tools used are simple:
- **Playwright**: for initializing a headless browser and providing Webdriver protocol interface so that NodeJs can access the browser's API programatically.
- **ExpressJS**: a minimal framework that make things easier to create middlewares and handle requests and response to the clients.  
- **Ngrok**: a reverse proxy so that instead of hosting the docker container in the cloud, I could utilize Ngrok to redirect request and response to the web scraping server via `HTTPS` that runs locally and make it more secure since Ngrok will handle incoming requests from different clients before the web scraping server receives it locally.


#### How to build (TBD)
