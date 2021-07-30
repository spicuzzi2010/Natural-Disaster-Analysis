# What is the Most Dangerous State to Live In?
For this project Team One decided to look into the most dangerous place to live in the United States based on the federally declared natural disasters that have happened in the last 10 years and creating our own point system to give weight to each disaster. The Team decided on the time frame of the last 10 years because the dataset is very large with about 21,000+ records which would take quite a while to load and display. The dataset that the Team used was found on fema.gov called Disaster Declarations Summary-v2 which is raw, unedited data from FEMA’s National Emergency Management Information System (NEMIS). 

"The FEMA Disaster Declarations Summary is a summarized dataset describing all federally declared disasters. The dataset lists all official FEMA Disasters Declarations, beginning with the first disaster declaration in 1953 and features all three disaster declaration types: major disaster, emergency, and fire management assistance. The dataset includes declared recovery programs and geographic areas(counties were not available before 1964 and Fire Management records are considered partial due to the historical nature of the dataset)." -FEMA commentary on dataset

Presentation Link https://docs.google.com/presentation/d/1hf62hA5lI5pDgIPthLenRxxkLpOZf36w3VvTkHR4zUw/edit#slide=id.ge726d615ea_0_0 and created website https://natural-disaster-analysis.herokuapp.com/

## ETL
A FEMA-declared disaster dataset with over 21,000 records since 2010 was used as our primary source. Coordinates (lat, lon) for each disaster record was retrieved with functio created using GeoPy. This updated dataset was then cleaned and loaded to a PostgreSQL database that can run multiple times in succession and will replace current values if they exist.

## Flask
A Flask application is used to select data from the database and generate a JSON file to be called through our API. Each disaster record has a unique ID and includes data for date, year, state, county, latitude, longitude, disaster type, and disaster description.

The API interfaces with our JS and is used as the primary source of data revealed in the user-facing application.

## Application
The JavaScript library Leaflet along with Mapbox is used to create an interactive map centered the United States. Users can select from a variety of disaster types--earthquakes, tornadoes, wildfires, hurricanes, floods, severe ice storms, mud/landslides, and tsunamis--to reveal map markers showing where they have been concentrated over the past ten years. Tooltips allow users to gain more information on individual FEMA-declared emergencies.

To determine which State is the most dangerous to live in, each disaster record is given arbitrary point value of one. Without significantly more data on casualties, property damage, and physical power of the disaster event itself, we determined it is safest to assume that all disaster records are equal. Using this formula, the top 5 most dangerous states are:

- Texas: 1074 disaster points
- Louisiana: 870 disaster points
- Georgia: 764 disaster points
- North Carolina: 644 disaster points
- Virginia: 500 disaster points

Because this points system is somewhat arbitrary, we have included a way for users to create their own formula. For each disaster type, you can change the base point value between 0 and 5. The table of States is then updated with the new point values.

For example, if a user thinks earthquakes are much more dangerous than other disasters, they might give it a weight of 5. Alternatively, if they don't think ice storms should be included, they could set it's point vale to 0, and those records would not be counted toward a State's danger level.

Other formulas that may give interesting results include those where only a single disaster type receive points, while all others are set to 0. This formula shows to an extent States where people have been most in danger from that disaster type over the past ten years.

The entire application is implemented using Heroku.