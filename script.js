// Game Variables
let xp = 0;
let hp = 100;
let level = 1;
let nextLevelXp = 100;

// Load saved data
if(localStorage.getItem('studentRPG_v2')) {
    const data = JSON.parse(localStorage.getItem('studentRPG_v2'));
    xp = data.xp;
    hp = data.hp;
    level = data.level;
    nextLevelXp = data.nextLevelXp;
    updateStatsUI();
}

function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value;

    if (taskText === "") return;

    const ul = document.getElementById("taskList");
    const li = document.createElement("li");

    li.innerHTML = `
        <span>${taskText}</span>
        <div class="buttons">
            <button class="complete-btn" onclick="completeTask(this)">✔</button>
            <button class="giveup-btn" onclick="failTask(this)">✖</button>
        </div>
    `;

    ul.appendChild(li);
    input.value = ""; 
}

function completeTask(btn) {
    const li = btn.parentElement.parentElement;
    li.classList.add("completed");
    btn.parentElement.remove(); // Remove buttons
    gainXp(20);
}

function failTask(btn) {
    const li = btn.parentElement.parentElement;
    
    // Visual shake effect or simply remove
    if(confirm("Are you sure you want to give up? You will lose 20 HP!")) {
        li.remove();
        takeDamage(20);
    }
}

function gainXp(amount) {
    xp += amount;
    if (xp >= nextLevelXp) {
        level++;
        xp = xp - nextLevelXp; 
        nextLevelXp = Math.floor(nextLevelXp * 1.5);
        hp = 100; // Heal on level up!
        alert(`🎉 LEVEL UP! Welcome to Level ${level}. HP Fully Restored!`);
    }
    saveAndRender();
}

function takeDamage(amount) {
    hp -= amount;
    if (hp <= 0) {
        hp = 0;
        alert("💀 GAME OVER! You lost all your health. Level resetting...");
        resetGame();
    }
    saveAndRender();
}

function resetGame() {
    level = 1;
    xp = 0;
    hp = 100;
    nextLevelXp = 100;
    document.getElementById("taskList").innerHTML = ""; // Clear tasks
}

function updateStatsUI() {
    document.getElementById("level").innerText = level;
    document.getElementById("xp-text").innerText = xp;
    document.getElementById("max-xp").innerText = nextLevelXp;
    document.getElementById("hp-text").innerText = hp;
    
    const xpPercent = (xp / nextLevelXp) * 100;
    document.getElementById("xp-bar").style.width = xpPercent + "%";

    const hpPercent = hp; // Since max HP is always 100
    document.getElementById("hp-bar").style.width = hpPercent + "%";
}

function saveAndRender() {
    updateStatsUI();
    const data = { xp, hp, level, nextLevelXp };
    localStorage.setItem('studentRPG_v2', JSON.stringify(data));
}

// Initial render
updateStatsUI();