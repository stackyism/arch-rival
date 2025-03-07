## Architect Solutions Manager

This is a solutions manager app. Every solutions corresponds to a geojson
consisting polygons which gets loaded on map surface. On the right, you have
Tools & Statistics Panel.

You can take a few actions such as:

1. Switch between solutions.
2. Select/Deselect Polygons on the map
3. Intersect or Union the selected Polygons
4. Observe the total area of selected Polygons

# Assumptions or Caveats

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

## Running Tests

To run the tests, use the following command:

```sh
deno test -A
```

## Deploying

You can deploy the app with [Deno Deploy](https://dash.deno.com/new_project).

1. Link your github account
2. Select the repository
3. Give the project a name
4. Set the "Build Step" to `deno task build`
5. Set the entry point to `./server/main.ts`
6. Click 'deploy project'

## License

This project is licensed under the MIT License.
