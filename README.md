# Solusi Surabaya

Company profile and portfolio website for Solusi Surabaya.

## Routes

- `/` - company profile homepage
- `/portofolio/` - portfolio catalog
- `/portofolio/fashion/` - fashion demo
- `/portofolio/hotel/` - hotel demo
- `/portofolio/makan/` - restaurant demo

Every portfolio website has a named slug directly under `portofolio/`. Assets inside an individual website may still use subfolders required by that website's HTML and CSS.

## Deployment

This repository is deployable as a static website. The `portofolio/photobox/` directory contains Laravel source and requires a PHP/Laravel runtime; it is not executable by a static web server by itself.

See `DEPLOYMENT.md` for the server layout used by `alurelab`.
