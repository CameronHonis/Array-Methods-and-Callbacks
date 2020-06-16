import { fifaData } from './fifa.js';
console.log(fifaData);

console.log('its working');
// ⚽️ M  V P ⚽️ //

/* Task 1: Investigate the data above. Practice accessing data by console.log-ing the following pieces of data 

(a) Home Team name for 2014 world cup final*/
let wc2014 = fifaData.filter(item => item.Year === 2014 && item.Stage === 'Final')[0];
console.log('home team: ' + wc2014['Home Team Name']);
//(b) Away Team name for 2014 world cup final
console.log('away team: ' + wc2014['Away Team Name']);
//(c) Home Team goals for 2014 world cup final
console.log('home goals: ' + wc2014['Home Team Goals']);
//(d) Away Team goals for 2014 world cup final
console.log('away goals: ' + wc2014['Away Team Goals']);
//(e) Winner of 2014 world cup final */
if (wc2014['Win conditions'].includes(wc2014['Home Team Name'])){
    console.log('winner: ' + wc2014['Home Team Name']);
} else{
    console.log('winner: ' + wc2014['Away Team Name']);
}


/* Task 2: Create a function called  getFinals that takes `data` as an argument and returns an array of objects with only finals data */

function getFinals(data) {
    return data.filter(item => item.Stage === 'Final');
};

/* Task 3: Implement a higher-order function called `getYears` that accepts the callback function `getFinals`, and returns an array called `years` containing all of the years in the dataset */

function getYears(func) {
    let years = func(fifaData).map(v => v.Year);
    return years;
};
console.log(getYears(getFinals));

/* Task 5: Implement a higher-order function called `getWinners`, that accepts the callback function `getFinals()` and determine the winner (home or away) of each `finals` game. Return the name of all winning countries in an array called `winners` */ 

function getWinners(func) {
    return func(fifaData).map(v => {
        if (v['Win conditions'].includes(v['Home Team Name'])){
            return v['Home Team Name'];
        } else{
            return v['Away Team Name'];
        }
    })
};

console.log(getWinners(getFinals));

/* Task 6: Implement a higher-order function called `getWinnersByYear` that accepts the following parameters and returns a set of strings "In {year}, {country} won the world cup!" 

Parameters: 
 * callback function getWinners
 * callback function getYears
 */

function getWinnersByYear(winnersFunc,yearsFunc) {
    let winnersArray = winnersFunc(getFinals);
    let yearsArray = yearsFunc(getFinals);
    let returnArray = [];
    winnersArray.forEach((v,i) => {returnArray.push(`In ${yearsArray[i]}, ${v} won the world cup!`)});
    return returnArray;
};

console.log(getWinnersByYear(getWinners,getYears));

/* Task 7: Write a function called `getAverageGoals` that accepts a parameter `data` and returns the average number of home team goals and away team goals scored per match (Hint: use .reduce and do this in 2 steps) */

function getAverageGoals(data) {
    let avgGoals = data.reduce((c,v,i) => {
        return {
            avgHomeGoals: i/(i+1)*c.avgHomeGoals + v['Home Team Goals']/(i+1),
            avgAwayGoals: i/(i+1)*c.avgAwayGoals + v['Away Team Goals']/(i+1)
        };
    },{avgHomeGoals: 0,avgAwayGoals: 0});
    avgGoals.avgHomeGoals = avgGoals.avgHomeGoals.toFixed(2);
    avgGoals.avgAwayGoals = avgGoals.avgAwayGoals.toFixed(2);
    return avgGoals;
};

console.log(getAverageGoals(fifaData));

/// STRETCH 🥅 //

/* Stretch 1: Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data,teamInitials) {
    return data.reduce((c,v) => {
        if (v['Home Team Initials'] === teamInitials.toUpperCase() && v['Win conditions'].includes(v['Home Team Name'])){
            return ++c;
        } else if (v['Away Team Initials'] === teamInitials.toUpperCase() && v['Win conditions'].includes(v['Away Team Name'])){
            return ++c;
        } else {
            return c;
        }
    },0)
};

console.log('wins: '+ getCountryWins(fifaData,'gEr'));


/* Stretch 3: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(data) {
    let avgGoals = {};
    data.forEach(v => {
        if (!avgGoals[v['Home Team Name']]){
            avgGoals[v['Home Team Name']] = [0,0];
        }
        if (!avgGoals[v['Away Team Name']]){
            avgGoals[v['Away Team Name']] = [0,0];
        }
        avgGoals[v['Home Team Name']][1]++
        avgGoals[v['Home Team Name']][0] = (avgGoals[v['Home Team Name']][1]-1)/avgGoals[v['Home Team Name']][1]*avgGoals[v['Home Team Name']][0] + v['Home Team Goals']/avgGoals[v['Home Team Name']][1];
        avgGoals[v['Away Team Name']][1]++
        avgGoals[v['Away Team Name']][0] = (avgGoals[v['Away Team Name']][1]-1)/avgGoals[v['Away Team Name']][1]*avgGoals[v['Away Team Name']][0] + v['Away Team Goals']/avgGoals[v['Away Team Name']][1];
    });
    return avgGoals;
};

console.log(getGoals(fifaData));


/* Stretch 4: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

};

badDefense();

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */
