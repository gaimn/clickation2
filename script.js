const clickButton = document.getElementById("clickButton");
const upgradeButton = document.getElementById("upgradeButton");
const ultraUpgradeButton = document.getElementById("ultraUpgradeButton"); //update acoustic game
const gradualPointsButton = document.getElementById("gradualPointsButton");
const scoreElement = document.getElementById("score"); //Score
const autogainElement = document.getElementById("autogain"); //How many auto upgs you bought
const pointgainElement = document.getElementById("pointgain"); //How many pointgain ups you bought

let score = 0;
let pointGainPerClick = 1;
let upgradeCost = 10;
let ultraUpgradeCost = 50000000;
let gradualUpgradeCost = 2000;
let pgainPerSecond = 0;
let prestigePGPCBoost = 1;
let autosBought = 0;

const pointGainGiver = setInterval(() => {
    pointGainPerClick += pgainPerSecond;
}, 1000);

clickButton.addEventListener("click", () => {
    score += pointGainPerClick;
    scoreElement.textContent = score;
});

upgradeButton.addEventListener("click", () => {
    if (score >= upgradeCost) {
        score -= upgradeCost;
        pointGainPerClick *= 2;
        scoreElement.textContent = score;
        upgradeCost *= Math.round(Math.log(upgradeCost)); 
        upgradeButton.textContent = `Upgrade (Cost: ${upgradeCost}P)`;
        clickButton.textContent = `Click for ${pointGainPerClick}`;
    } else {
        alert(`Not enough points to upgrade! Get ${upgradeCost - score} more points.`);
    }
});

// prestige handler
const prestigeButton = document.getElementById("prestigeButton");
let prestigeRequirement = 2500;
let timesPrestiged = 0;

ultraUpgradeButton.addEventListener("click", () => { //help..?
    if (score >= ultraUpgradeCost) {
        score -= ultraUpgradeCost;
        pointGainPerClick *= Math.pow(timesPrestiged,2)+100; //(prestiges^2)+100, cool right
        scoreElement.textContent = score;
        ultraUpgradeCost *= Math.round(Math.sqrt(ultraUpgradeCost)); 
        ultraUpgradeButton.textContent = `Ultra Upgrade (Cost: ${ultraUpgradeCost}P)`;
        clickButton.textContent = `Click for ${pointGainPerClick}`;
    } else {
        alert(`Not enough points to upgrade! Get ${ultraUpgradeCost - score} more points.`);
    }
});

gradualPointsButton.addEventListener("click", () => {
    if (score >= gradualUpgradeCost && timesPrestiged >= 1) {
        score -= gradualUpgradeCost;
        pgainPerSecond += 1; //probably not balanced, or kinda since its only 1 per second
        scoreElement.textContent = score;
        gradualUpgradeCost *= Math.round(Math.pow(gradualUpgradeCost,0.05)); 
        gradualPointsButton.textContent = `Pointgain Generator (Cost: ${gradualUpgradeCost}P + Requirement: 1 Prestige)`;
        clickButton.textContent = `Click for ${pointGainPerClick}`;
    } else {
        if (timesPrestiged >= 1) {
            alert(`Not enough points to upgrade! Get ${gradualUpgradeCost - score} more points.`);
        } else {
            alert(`Prestige once to use this upgrade!`);
        }
    }
});

prestigeButton.addEventListener("click", () => {
    if (score >= prestigeRequirement) {
        const confirmPrestige = confirm("Are you sure you want to prestige? This will reset your progress, but give you a x5 multi.");

        if (confirmPrestige) {

            score = 0;
            upgradeCost = 10;
            pointGainPerClick = 1;
            prestigeRequirement *= prestigeRequirement/5;
            timesPrestiged += 1; 
            ultraUpgradeCost = 50000000;
            gradualUpgradeCost = 2000;
            pgainPerSecond = 0;
            autosBought = 0;
            clearInterval(automationInterval);

            scoreElement.textContent = score;
            autogainElement.textContent = autosBought;
            pointgainElement.textContent = pgainPerSecond;
            prestigeButton.textContent = ` Prestige (Cost: ${prestigeRequirement}P)`;
            upgradeButton.textContent = `Upgrade (Cost: ${upgradeCost}P)`;
            gradualPointsButton.textContent = `Pointgain Generator (Cost: ${gradualUpgradeCost}P + Requirement: 1 Prestige)`;

            prestigePGPCBoost *= 5;
            pointGainPerClick *= prestigePGPCBoost;

            alert("Congratulations! You've prestiged and gained a permanent x5 boost.");
        }
    } else {
        alert(`You have ${prestigeRequirement - score} points left to prestige.`);
    }
});
// automation handler
const automationButton = document.getElementById("automationButton");
let automationCost = 50; 
let automationInterval; 

automationButton.addEventListener("click", () => {
    if (score >= automationCost) {

        score -= automationCost;
        scoreElement.textContent = score;


        startAutomation();

        autosBought += 1;
        automationCost *= pointGainPerClick+3;
        automationInterval -= 50;
        automationButton.textContent = `Automation (Cost: ${automationCost}P)`;
    } else {
        alert(`You need at least ${automationCost - score} points to purchase automation.`);
    }
});

function startAutomation() {
    automationInterval = setInterval(() => {
        score += pointGainPerClick; 
        scoreElement.textContent = score;
    }, 300); 
}

// achievement handler
const mainGameButton = document.getElementById("mainGameButton");
const achievementsButton = document.getElementById("achievementsButton");
const modalContainer = document.querySelector(".modal-container");
const closeAchievementsButton = document.getElementById("Close");

mainGameButton.addEventListener("click", () => {
    
    modalContainer.style.display = "none";
    document.querySelector(".main-game-menu").style.display = "block";
});

achievementsButton.addEventListener("click", () => {
    
    modalContainer.style.display = "block";
    document.querySelector(".main-game-menu").style.display = "none";
});

closeAchievementsButton.addEventListener("click", () => {
    
    modalContainer.style.display = "none";
});

// achievement giver handler
const pointsAchievement = document.getElementById("pointsAchievement");
const pointsRequirement = 100000000; 
const achievementNotification = document.getElementById("achievementNotification");

let achievementShown = false; 

function checkAchievement() {
    if (!achievementShown && score >= pointsRequirement) {
        
        pointsAchievement.style.display = "block";

        
        achievementNotification.style.display = "block";

        
        achievementShown = true;

        
        setTimeout(() => {
            achievementNotification.style.display = "none";
        }, 3000); 
    }
}


const achievementInterval = setInterval(() => {
    checkAchievement();
    

    if (achievementShown) {
        clearInterval(achievementInterval);
    }
}, 1000);

const prestigeAchievement = document.getElementById("prestigeAchievement");
const achievementNotification2 = achievementNotification.cloneNode(true);
document.body.appendChild(achievementNotification2);

let achievementShown2 = false; 

function checkAchievement2() {
    if (!achievementShown2 && timesPrestiged >= 3) {
        
        prestigeAchievement.style.display = "block";

        
        achievementNotification2.style.display = "block";

        
        achievementShown2 = true;

        
        setTimeout(() => {
            achievementNotification2.style.display = "none";
        }, 3000); 
    }
}


const achievementInterval2 = setInterval(() => {
    checkAchievement2();
    

    if (achievementShown2) {
        clearInterval(achievementInterval2);
    }
}, 1000);
