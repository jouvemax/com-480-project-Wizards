# Milestone 1

What do you know about Co2 emissions?

A project to learn about Co2 emissions to understand the challenges we are facing with climate change. 

## Dataset

We will use multiple datasets for each part of our visualization:

- First showing global emissions per sectors and countries. This will allow the user to see which countries and sectors are responsible for the emissions. We
will be using Greenhouse Gas Emissions by Country and Economic Sector [data]((https://resourcewatch.org/data/explore/cli008-Greenhouse-Gas-Emissions-by-Country-and-Sector-Full-Longform?hash=layers&section=Discover&zoom=1&lat=0&lng=0&pitch=0&bearing=0&basemap=dark&labels=light&layers=%255B%257B%2522dataset%2522%253A%2522a290675c-9528-4a51-8201-f6c2d7848744%2522%252C%2522opacity%2522%253A1%252C%2522layer%2522%253A%2522c0c8ee6e-5cd4-4c9d-bd10-ce6545b26fef%2522%257D%255D&page=1&sort=most-viewed&sortDirection=-1)), that was itself obtained from this ClimateWatch [dataset](https://www.climatewatchdata.org/data-explorer/historical-emissions?historical-emissions-data-sources=71&historical-emissions-gases=246&historical-emissions-regions=All%20Selected&historical-emissions-sectors=843&page=3#data).
The raw data can be seen [here](https://github.com/jouvemax/com-480-project-Wizards/blob/main/milestones/datasets/historical_global_emissions.csv).
It corresponds to historical data ranging from 1990 until 2017 of emissions per countries and sector. We will focus on the most recent data (2017).
For the preprocessing, we have decided to gather some sectors together to keep the data analysis simple. We will focus on the 5 following sectors: Energy (electricity production and heat), Industry (industrial processes and manufacture), Transport, Agriculture (with deforestation and food waste) and Other. We are using the MtCo2e metric (Million tons of carbon dioxide equivalent), which means that we consider the green house gases altogether and do not make distinctions betweens carbon dioxyd and methan for example. 

- Then, we will focus on the energy sector. We have a more precise dataset for this part. The data is already clean and comes from the following [github](https://github.com/owid/energy-data). The raw data can be accessed [here](https://github.com/jouvemax/com-480-project-Wizards/blob/main/milestones/datasets/electricity_emissions.csv). It shows the energy obtained from different sources (nuclear, fossil, wind...). We might add more supporting data when building the website, for example, to have the emissions of each source.

- Similarly, we will have a dataset for the industrial sector. It was obtained from references of the following [paper](https://www.nature.com/articles/s41561-021-00690-8#MOESM3). The raw data is accessible [here](https://github.com/jouvemax/com-480-project-Wizards/blob/main/milestones/datasets/industry_emissions.csv). It corresponds to the emission in Giga tons of Co2 equivalent per year, for each type of material (cement, iron, steel, plastic...).

- The next part will be about the agriculture sector. For this part, we have decided to show the kg of Co2 emissions per kg of food. Thus, we would like to compare various kind of food and their relative emissions. The data is from [OurWorldInData](https://ourworldindata.org/food-choice-vs-eating-local). It is already clean, and we just preprocessed it to be easy to use. The raw data can be seen [here](https://github.com/jouvemax/com-480-project-Wizards/blob/main/milestones/datasets/food_emissions.csv).

- Finally, we will have a look at the transportation sector. We found the data on the International Energy Agency [website](https://www.iea.org/data-and-statistics/charts/transport-sector-co2-emissions-by-mode-in-the-sustainable-development-scenario-2000-2030). We preprocessed it to only keep the most recent data (2020). The raw file can be seen [here](https://github.com/jouvemax/com-480-project-Wizards/blob/main/milestones/datasets/transport_emissions.csv).


## Problematic

The goal of our project is to offer a better understanding of Co2 emissions. Indeed, tackling the climate change problem has become a priority, and the young 
generation is taking actions through activism, entrepreneurship or in politics. 
However, it is still important to educate people about emissions. We need to understand where there are coming from, and what can we do to reduce them.


Talk about Bill Gates new book and link.

## Exploratory Data Analysis

You can see all our preprocessing and a first analysis of the data in the following [notebook](https://github.com/jouvemax/com-480-project-Wizards/blob/main/milestones/eda.ipynb). We have't yet saved the preprocessed data, as it might evolve before we build our visualizations and website.

## Related work

• What others have already done with the data?
There are various websites that offer visualization of data related to Co2 emissions. However, usually they do not provide context about emissions, their analysis is either only global (countries and sector) or only focus on one sector. 

• Why is your approach original?
We would like to give a top down approach of Co2 emissions. The user will first see how he compare with people living in other countries in term of emissions. He will then have an overview of emissions, by looking at countries on a map and sectors. Finally we would like to give him insights of each sector taken independently. Where are the agriculture emissions from? Why does the industry is such a big polluter etc... What kind of solutions already exist for each sectors, and what are the ones that still need to be developped.

We hope that by the end of our visualization, the user will have a better understanding of Co2 emissions and, thus, can have a better impact.

• What source of inspiration do you take? Visualizations that you found on other
add some website. breakthrough enery...
