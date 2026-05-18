let account = JSON.parse(localStorage.getItem("account")) || null;

function saveData() {
    localStorage.setItem("account", JSON.stringify(account));
}

function createAccount() {
    let name = document.getElementById("name").value;
    let balance = parseFloat(document.getElementById("balance").value);

    if (!name || isNaN(balance)) {
        alert("Enter valid details");
        return;
    }

    account = {
        name: name,
        balance: balance,
        history: []
    };

    saveData();
    updateUI();
}

function deposit() {
    if (!account) return alert("Create account first");

    let amount = parseFloat(document.getElementById("amount").value);
    if (isNaN(amount) || amount <= 0) return;

    account.balance += amount;
    account.history.push(`Deposited: ₹${amount}`);

    saveData();
    updateUI();
}

function withdraw() {
    if (!account) return alert("Create account first");

    let amount = parseFloat(document.getElementById("amount").value);
    if (isNaN(amount) || amount <= 0) return;

    if (amount > account.balance) {
        alert("Insufficient Balance");
        return;
    }

    account.balance -= amount;
    account.history.push(`Withdrawn: ₹${amount}`);

    saveData();
    updateUI();
}

function updateUI() {
    if (!account) return;

    document.getElementById("accountInfo").innerText =
        "Account: " + account.name;

    document.getElementById("balanceDisplay").innerText =
        "Balance: ₹" + account.balance;

    let historyList = document.getElementById("history");
    historyList.innerHTML = "";

    account.history.slice().reverse().forEach(item => {
        let li = document.createElement("li");
        li.innerText = item;
        historyList.appendChild(li);
    });
}

updateUI();