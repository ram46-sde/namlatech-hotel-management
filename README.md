# Maaligai — Hotel Discovery & Management

Maaligai is a responsive hotel discovery and management web application built with React. It provides a landing page for the brand and a hotel management workspace where users can browse properties, search and filter listings, manage hotel records, and view hotel locations on an interactive map.

This project was developed as a frontend technical assignment for NamlaTech. The backend is simulated locally with JSON Server.

## Features

### Home and Navigation
- Branded home page with a dedicated hero section.
- Responsive navigation for Home, Hotels, and Contact.
- Shared footer across application routes.
- Calls to action that navigate to the hotel listing and add-hotel form.

### Hotel Listings
- Hotel cards with images, titles, descriptions, and nightly prices.
- Search hotels by title.
- Filter by minimum and maximum price.
- Dual-handle price range slider with matching manual price inputs.
- Sort by recommended order, price (low to high), price (high to low), or hotel name.
- Pagination with six hotels per page.

### Hotel Management
- Create a hotel record.
- Edit an existing hotel record.
- Delete a hotel record with confirmation.
- Reusable add/edit form.
- Form validation for required fields, latitude, longitude, and price.
- Image selection with preview and a client-side 1 MB file-size limit.
- Success and error notifications.

### Hotel Details and Maps
- Individual hotel details page.
- Hotel image, description, nightly price, and coordinates.
- Interactive map displaying the hotel's coordinates using React Leaflet and OpenStreetMap tiles.

### Additional UI and Quality Features
- Reusable components for hotel cards, forms, price filtering, pagination, maps, and page metadata.
- Client-side routing with React Router.
- Centralized hotel state and asynchronous API operations with Redux Toolkit.
- Dynamic page titles and meta descriptions with React Helmet Async.
- Responsive layouts for desktop, tablet, and mobile screens.
- Image alternative text and labelled form controls.

## Technology Stack

| Area | Technology |
| --- | --- |
| UI | React 19 |
| Build tool and development server | Vite |
| Language | JavaScript (ES modules) |
| State management | Redux Toolkit, React Redux |
| Routing | React Router |
| HTTP client | Axios |
| Mock REST API | JSON Server |
| Maps | React Leaflet, Leaflet, OpenStreetMap |
| Page metadata | React Helmet Async |
| Notifications | React Toastify |
| Styling | CSS |

## Getting Started

### Prerequisites

- Node.js and npm
- Git
- A modern web browser

### 1. Clone the repository

```bash
git clone https://github.com/ram46-sde/namlatech-hotel-management.git
cd namlatech-hotel-management
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the mock API

Open a terminal in the project root and run:

```bash
npm run mock-api
```

JSON Server starts at `http://localhost:3001`. The hotel collection is available at:

```
http://localhost:3001/hotels
```

Keep this terminal running while using the application.

### 4. Start the frontend

Open a second terminal in the project root and run:

```bash
npm run dev
```

Vite prints the local development URL in the terminal (normally `http://localhost:5173`). Open that URL in your browser.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server. |
| `npm run mock-api` | Starts JSON Server using `mock-api/db.json` on port 3001. |
| `npm run build` | Creates the production build in `dist/`. |
| `npm run preview` | Serves the production build locally for preview. |
| `npm run lint` | Runs ESLint. |

## Application Routes

| Route | Description |
| --- | --- |
| `/` | Maaligai home page and hero section. |
| `/hotels` | Hotel listing, search, price filters, sorting, and pagination. |
| `/hotels/new` | Add a hotel. |
| `/hotels/:id` | View an individual hotel's details and map. |
| `/hotels/:id/edit` | Edit an existing hotel. |

## Mock API Endpoints

The frontend communicates with JSON Server at `http://localhost:3001`.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/hotels` | Retrieve all hotels. |
| GET | `/hotels/:id` | Retrieve one hotel. |
| POST | `/hotels` | Create a hotel. |
| PUT | `/hotels/:id` | Update a hotel. |
| DELETE | `/hotels/:id` | Delete a hotel. |

The sample data is stored in `mock-api/db.json`. JSON Server writes changes to this local file while it is running.

## Hotel Data Structure

A hotel record uses the following fields:

```json
{
  "id": 1,
  "title": "Azure Grand Resort",
  "description": "A sample hotel description.",
  "image": "https://example.com/hotel-image.jpg",
  "latitude": 11.0168,
  "longitude": 76.9558,
  "price": 3500
}
```

- `id`: Unique hotel identifier.
- `title`: Hotel name.
- `description`: Hotel description.
- `image`: Image URL or image data URL used by the mock application.
- `latitude` and `longitude`: Coordinates used to position the hotel on the map.
- `price`: Nightly price.

## Project Structure

```text
namlatech-hotel-management/
├── mock-api/
│   └── db.json
├── public/
├── src/
│   ├── app/                 # Redux store configuration
│   ├── assets/              # Brand assets and images
│   ├── components/          # Reusable UI components
│   │   ├── Footer/
│   │   ├── HeroSection/
│   │   ├── HotelCard/
│   │   ├── HotelForm/
│   │   ├── HotelMap/
│   │   ├── Navbar/
│   │   ├── Pagination/
│   │   ├── PriceFilter/
│   │   └── SEO/
│   ├── features/
│   │   └── hotels/          # Hotel Redux slice and async actions
│   ├── pages/               # Home, listing, form, and details pages
│   ├── services/            # Axios instance and hotel API functions
│   ├── styles/              # Shared brand styles
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md
```

## Notes

- This is a frontend demonstration application. JSON Server provides a local mock REST API; it is not a production backend.
- The API client is configured for `http://localhost:3001`. Run JSON Server locally before testing hotel data operations.
- The map uses OpenStreetMap tiles and requires an internet connection for map tiles to load.
- Image uploads are handled by the mock application using browser-generated image data URLs; this is not a production image-storage service.
- The repository contains sample hotel records for demonstration and testing.

## Build

To create a production build:

```bash
npm run build
```

The generated static assets are written to the `dist/` directory.

---

Developed for the NamlaTech frontend development assignment.
