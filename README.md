# Strava Artistic Map (Aesthetic Activity Mapping)

Visualize your Strava adventures by combining and rendering your rides, runs, and hikes into stunning, high-resolution aesthetic maps.

## ✨ Features

- **Connect with Strava:** Easily log in and fetch your activities directly from Strava.
- **Premium Maps:** Beautiful CartoDB Dark Matter tiles provide stunning contrast for your vibrant activity overlays using Leaflet.
- **Combine Activities:** Select up to 10 activities at once. Effortlessly calculate combined distance, moving time, and elevation.
- **Location Awareness:** Automatically displays the city/country of your activities using reverse geocoding via BigDataCloud.
- **High-Res Export:** Download a beautiful, pixel-perfect PNG composition of your map and statistics, automatically named after your first selected activity.

## 🚀 Tech Stack

- [Astro](https://astro.build/) - Web framework
- [Tailwind CSS v4](https://tailwindcss.com/) - Styling
- [Leaflet](https://leafletjs.com/) - Interactive mapping
- [html-to-image](https://github.com/bubkoo/html-to-image) - High-res PNG export
- [Strava API](https://developers.strava.com/) - Activity data
- BigDataCloud API - Reverse geocoding

## 🏃‍♂️ Getting Started

### Prerequisites

You need to create a Strava API application to get your Client ID and Client Secret.

1. Go to [Strava API Settings](https://www.strava.com/settings/api) and create an app.
2. Set the "Authorization Callback Domain" to `localhost:4321` (or your respective production domain).

### Installation

1. Install dependencies:

```sh
npm install
```

2. Create a `.env` file in the root of the project with your Strava API credentials:

```env
STRAVA_CLIENT_ID=your_client_id
STRAVA_CLIENT_SECRET=your_client_secret
PUBLIC_URL=http://localhost:4321
```

3. Start the local development server:

```sh
npm run dev
```

Open your browser to [http://localhost:4321](http://localhost:4321) to see the application running.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
