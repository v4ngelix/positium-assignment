# Drought in Algarve

It's my first time using ESRI's ArcGIS API for JavaScript and I decided to use the occasion to create
a map about the drought in Algarve, Portugal.

## Background
While driving along the A-2 through Alentajo to Algarve, 
the closer I got to the coastline the more I started seeing billboards with slogans like "Water is Life",
"Less pools, more ocean". Naturally, after reaching my destination and settling in,
I took the time to research what the background of these billboards were and I found the following article:
[National campaign "Water is life - don't waste it" starts today in the Algarve](https://www.sulinformacao.pt/en/2023/06/campanha-nacional-agua-e-vida-nao-a-desperdice-arranca-hoje-no-algarve/)

So they have drought and apparently it's pretty severe:
[Storage of the six Algarve dams is only enough for 1 year of public consumption](https://www.sulinformacao.pt/en/2022/10/armazenamento-das-seis-barragens-algarvias-so-da-para-1-ano-de-consumo-publico)
[Portugal will face water shortage crisis, primarily affecting Algarve and Alentejo](https://www.portugalresident.com/portugal-will-face-water-shortage-crisis-primarily-affecting-algarve-and-alentejo/)
[Algarve remains in extreme drought](https://www.theportugalnews.com/news/2024-04-05/algarve-remains-in-extreme-drought/87620)

On the Facebook I found Algarve expats community discussing the possible causes of the water scarcity.
Tourism and golf specifically were mentioned, but some of the users also blamed greedy farmers and their avocado and almond plantations.
Natural causes, climate change or wasteful water habits weren't mentioned.

For a about week now I've been reading and collecting data about the issue. The assignment offered me a good excuse to
try to put it all together in some meaningful way.

## Idea
* Have a hill-shaded map of Algarve.
  * Maybe highlight important population centers.
* Show all the important reservoirs.
  * When reservoir is clicked, open a popup with the basic information about the reservoir.
* Display a chart showing the population changes in the Algarve region.
* On the same chart, show the effect of tourism on the population.
  * Maybe come up with a virtual population (the total number of overnight stays divided by the number of days in a year).
  * Or, instead of raw number of people, show the total water consumption. I know that Statistics Portugal has relevant tables for this.
* Show reservoir fill level
  * Have the fill color of the reservoir change, with red meaning low and blue meaning high water levels.
  * Or, display some kind of floating pins over the reservoirs, showing the fill level percentage.
* Have chart and map highlights/colors move in sync with a time slider.

## Data
### District boundary
I wanted to highlight the Algarve region. My first idea was to clip the basemap in a way that the Algarve region
would have a detailed basemap and the rest of the world only outlines of the land (For example by using Natural Earth).
With Maplibre GL I've done it, using Planetiler to get tiles for a specific area, but with ArcGIS...
well after some research, I decided to skip it and just delimit the area with a colorful border.

For this I needed a geoJson with the boundary of the Algarve region. Somewhat confusingly,
the area known as Algarve is sometimes called Faro, after the largest city. First, I tried to find a suitable geoJSON from NUTS 2 areas,
but ended up using QGIS/QuickOSM for it. I queried "name"="Algarve" and "Boundary"="statistical" and got the polygon I needed.

### Reservoirs
Again, used QGIS/QuickOSM to get the data with "water"="reservoir" query. I limited the query area with the polygon from the previous step. 
Unfortunately there are many artificial bodies of water in the Algarve region, all tagged as "reservoir" so I had many false positives. 

Added additional information about the reservoirs from the Portugese Wikipedia and Sistema Nacional de Informação de Recursos Hídricos portal.

### Population
Found Eurostat table for population changes in the NUTS II areas. The dataset goes back to 1991, which is great.
Statistics Portugal also has tables about population changes on the municipal level (something to keep in mind for the future).

### Tourism
Found Eurostat table for overnight stays in the NUTS II regions, but unfortunately the dataset only goes back to 2012.
Seems like Statistics Portugal have better tables about tourism, but this needs further research.
