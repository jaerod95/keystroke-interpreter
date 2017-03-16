//////////////////////////////////////////////////////////////
//  TODO:                                                   //
// 1. Develop Test Cases                                    //
// 2. Format Code                                           //
// 3. Create a real-time authenticator                      //
// 4. Create documentation of the tool                      //
//////////////////////////////////////////////////////////////
const path = require('path');
var getDatabaseResults = false; //set this to true to pull all the data from the database. WARNING!!! It will take a long time so plan on leaving it running for 30 minutes or so.
var databaseAccess = require(path.join(__dirname, "lib", "database-access", "db_access.js"));
databaseAccess(getDatabaseResults);
