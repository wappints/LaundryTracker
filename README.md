# CSSWENG Group3

## Laundry Tracker 
A MongoDB-based local software for the business _Dirty Treats_.


## Software Solution (From the SRS)
The software aims to provide a tracker of financial resources of the laundry company such as their transaction entries, stock of inventories, and to prevent any loss of profit due to tedious, manual placements and calculations that led to unbalanced statements. 

The specific objectives of the software are as follows:

- To provide a facility for tracking the flow of money into the business;
- To provide a facility for automation of calculations for certain financial categories;
- To provide a facility for current assets, liabilities, and expenses of the business;
- To provide a facility for monitoring the number of laundry inventories;
- To provide a facility for preventing any miscalculations and unjustified unbalances in the process.

https://github.com/wappints/CSSWENG-G3-LaundryTracker/blob/main/details/logo.jpg
First Term Project | Junior Year | 

Author/s: Yeohan Norona, Jihro Abendano



## INSTALL MONGODB COMPASS BEFORE RUNNING THE SOFTWARE
1. https://www.mongodb.com/try/download/community
2. After installation, connect to the localhost.
3. Create a database called _LaundryTracker_
4. First collection will be named _System_, followed by two collections named _Inventory_ and _Account_
5. Download the initial data of the software here: https://drive.google.com/drive/folders/1OS9EPJZyft3sGGZjHOUFq-NDb3ACPYMA?usp=sharing
6. Import the JSON file to the collection respective to their name. (i.e. Import System.JSON to the collection _System_) 


## Instructions to create the executable file

1. Open your command prompt 
2. run `npm i` for installation of node modules
3. run `npm run postinstall` for installation of extra dependencies
4. run `npm run dist` to build the application in the destination
5. Access folder _release_ then there will be an executable file called _LaundryTracker_


## Running the software via after pull request

1. Open your IDE's command prompt
2. run `npm start` or `electron main.js`
