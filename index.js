import {fifaData} from '/fifa.js';
  
// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note, you may want to filter the data first 😉*/
const team2014 = fifaData.filter((item) =>{
    if(item.Stage === "Final" && item.Year === 2014){
        return item;
    }
})
console.log(team2014);
//(a) Home Team name for 2014 world cup final
const homeTeamName = team2014[0]["Home Team Name"];
console.log(homeTeamName);
//(b) Away Team name for 2014 world cup final
const awayTeamName = team2014[0]["Away Team Name"];
console.log(awayTeamName);
//(c) Home Team goals for 2014 world cup final
const homeTeamGoal = team2014[0]["Home Team Goals"];
console.log(homeTeamGoal);
//(d) Away Team goals for 2014 world cup final
const awayTeamGoal = team2014[0]["Away Team Goals"]
console.log(awayTeamGoal);
//(e) Winner of 2014 world cup final */
if(homeTeamGoal > awayTeamGoal){
    console.log(homeTeamName);
}
if(awayTeamGoal > homeTeamGoal){
    console.log(awayTeamName);
}

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive data as a parameter
2. Return an array of objects with the data of the teams that made it to the final stage

hint - you should be looking at the stage key inside of the objects
*/

function getFinals(data) {
   /* code here */
    const finalTeams = data.filter((item) => {
        if(item.Stage === "Final"){
            return item;
        }
    })
    return finalTeams;
}

console.log(getFinals(fifaData));


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array
2. Receive a callback function getFinals from task 2 
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(data,getFinalsCB) {
    const getData = getFinalsCB(data);
    const years = getData.map(item => item.Year);
    return years;
}

console.log(getYears(fifaData,getFinals));

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receives an array
2. Receives the callback function getFinals from task 2 
3. Determines the winner (home or away) of each `finals` game. 
4. Returns the names of all winning countries in an array called `winners` */ 

function getWinners(data,getFinalsCB) {
    const finalData = getFinalsCB(data);
    const winners = finalData.map((item) => {
        if(item["Home Team Goals"] > item["Away Team Goals"]){
            return item["Home Team Name"]
        }
        if(item["Away Team Goals"] > item["Home Team Goals"]){
            return item["Away Team Name"];
        }
        if(item["Away Team Goals"] == item["Home Team Goals"]){
            if(item["Win conditions"].includes(item["Home Team Name"])){
                return item["Home Team Name"];
            }
            if(item["Win conditions"].includes(item["Away Team Name"])){
                return item["Away Team Name"];
            }
        }
    })
    return winners;
}

console.log(getWinners(fifaData,getFinals));


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array
2. Receive a callback function getYears from task 3
3. Receive a callback function getWinners from task 4
4. Return an array of strings that say "In {year}, {country} won the world cup!" 

hint: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(data,getYearsCB,getWinnersCB) {
    const years = getYearsCB(data,getFinals);
    const winners = getWinnersCB(data,getFinals);
    const returnArray = [];
    for(let i=0; i<years.length; i++){
        const displayString = `In ${years[i]}, ${winners[i]} won the world cup!`;
        returnArray.push(displayString);
    }
    return returnArray;
}
console.log(getWinnersByYear(fifaData,getYears,getWinners));

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following: 
 1. Receive the callback function getFinals from task 2 ensure you pass in the data as an argument
 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place. 
 
 (Hint: use .reduce and do this in 2 steps) 
 
 Example of invocation: getAverageGoals(getFinals(fifaData));
*/

function getAverageGoals(getFinalsCB) {
   const data = getFinalsCB;
   const homeGoalAvg = data.reduce((total,item) => {
       total += parseInt(item["Home Team Goals"]);
       return total/data.length;
   },0)
   const awayGoalAvg = data.reduce((total,item) => {
        total += parseInt(item["Away Team Goals"]);
        return total/data.length;
    },0)
   return Math.round(homeGoalAvg * 100) / 100+" "+Math.round(awayGoalAvg * 100) / 100;
}

console.log(getAverageGoals(getFinals(fifaData)));



/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data,teamInitial,getFinalsCB) {

    const finalData = getFinalsCB(data);
    const homeVisits = finalData.filter(item => {
        if(item["Home Team Initials"] == teamInitial){
            return item;
        }
    })

    const awayVisits = finalData.filter(item => {
        if(item["Away Team Initials"] == teamInitial){
            return item;
        }
    })

    let homeWinCount = 0;
    homeVisits.forEach(element => {
        let homeGoals = element["Home Team Goals"];
        let awayGoals = element["Away Team Goals"];
        let homeTeamName = element["Home Team Name"];
        let winCondition = element["Win conditions"];
        if(homeGoals > awayGoals){
            homeWinCount += 1;
        }
        if(homeGoals == awayGoals){
            if(winCondition != "" && winCondition.includes(homeTeamName)){
                homeWinCount += 1;
            }
        }
    });

    let awayWinCount = 0;
    awayVisits.forEach(element => {
        let homeGoals = element["Home Team Goals"];
        let awayGoals = element["Away Team Goals"];
        let awayTeamName = element["Away Team Name"];
        let winCondition = element["Win conditions"];
        if(awayGoals > homeGoals){
            awayWinCount += 1;
        }
        if(homeGoals == awayGoals){
            if(winCondition != "" && winCondition.includes(awayTeamName)){
                awayWinCount += 1;
            }
        }
    });

    return homeWinCount+awayWinCount;
}

console.log(getCountryWins(fifaData,"FRA",getFinals));

/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals() {

}

/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

}


/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
export default{
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
