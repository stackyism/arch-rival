# Architect Solutions Manager

This is a solutions manager app. Every solutions corresponds to a geojson
consisting polygons which gets loaded on map surface. On the right, you have
Tools & Statistics Panel.

## Checkout

[Live App](https://stakhi.me/arch-rival/)

<img width="1512" alt="Screenshot 2025-03-07 at 03 12 16" src="https://github.com/user-attachments/assets/44377fa9-0813-4948-815c-f0c3a2570eca" />



You can take a few actions such as:

1. Switch between solutions.
2. Select/Deselect Polygons on the map
3. Intersect or Union the selected Polygons
4. Observe the total area of selected Polygons

## Assumptions or Caveats

1. We assume that we're going to deal just with Polygon feature types for now.
   This is the reason that we've stored the store keys as polygons and other
   actions with polygons names.
2. We're using polygonId of type number because mapbox on click does not
   populate feature id in event callback if it is a string
3. We assumed there's going to be at least 1 solution and atleast 1 selected
   always - so no safety checks

## Project Structure

```sh
src 
   ├── app.tsx - The main React component
   └── architect-solutions-manager.tsx - The main landing page for achitect solutions manager page
   └── store.ts - global store to hold the state of app
   └── types.ts - global types
   └── workspace - component parts of workspace for solutions manager
data
   ├── solution.json - geojson solution file
public
   ├── x.svg - public resources
```

## Tech Stack

1. [Mapbox](https://visgl.github.io/react-map-gl/): To render the geojson and
   allow interactiosn with polygons
2. [Turf.js](https://turfjs.org/): To do operations on polygon such as union,
   intersect, etc.
3. [Zustand](https://github.com/pmndrs/zustand): To hold and manipulate the
   state of the application
4. [Vite](https://vite.dev/): Build tool for frontend app

## Getting Started

### Prerequisites

To run this app locally, you will need to have
[Deno](https://docs.deno.com/runtime/) installed.

```sh
git clone https://github.com/stackyism/arch-rival.git
cd arch-rival
```

## Install the dependencies

To install the dependencies run the following command:

```sh
deno install
```

## Run the dev server with vite

The app uses a Vite dev server to run in development mode. To start the dev
server, run the following command:

```sh
deno run dev
```

## Build the app

To build the app for production, run the following command:

```sh
deno run build
```

## License

This project is licensed under the MIT License.
