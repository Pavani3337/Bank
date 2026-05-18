let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
let currentAccount = null;

function saveData() {
    localStorage.setItem("accounts", JSON.stringify(accounts));
}

function generateAccNo() {
    return Math.floor(1000 + Math.random() * 9000);
}

function createAccount() {
    let name = document.getElementById("name").value;
    let balance = parseFloat(document.getElementById("balance").value);

    if (!name || isNaN(balance)) {
        alert("Enter valid details");
        return;
    }

    let account = {
        accNo: generateAccNo(),
        name: name,
        balance: balance,
        history: []
    };

    accounts.push(account);

    saveData();

    alert("Account Created! Your Account No: " + account.accNo);

    document.getElementById("name").value = "";
    document.getElementById("balance").value = "";
}

function searchAccount() {
    let accNo = parseInt(document.getElementById("searchAcc").value);

    currentAccount = accounts.find(acc => acc.accNo === accNo);

    if (!currentAccount) {
        alert("Account not found");
        return;
    }

    updateUI();
}

function deposit() {
    if (!currentAccount) return alert("Search account first");

    let amount = parseFloat(document.getElementById("amount").value);
    if (isNaN(amount) || amount <= 0) return;

    currentAccount.balance += amount;
    currentAccount.history.push(`Deposited: ₹${amount}`);

    saveData();
    updateUI();
}

function withdraw() {
    if (!currentAccount) return alert("Search account first");

    let amount = parseFloat(document.getElementById("amount").value);
    if (isNaN(amount) || amount <= 0) return;

    if (amount > currentAccount.balance) {
        alert("Insufficient Balance");
        return;
    }

    currentAccount.balance -= amount;
    currentAccount.history.push(`Withdrawn: ₹${amount}`);

    saveData();
    updateUI();
}

function updateUI() {
    if (!currentAccount) return;

    document.getElementById("accountInfo").innerText =
        `Account: ${currentAccount.name} (Acc No: ${currentAccount.accNo})`;

    document.getElementById("balanceDisplay").innerText =
        "Balance: ₹" + currentAccount.balance;

    let historyList = document.getElementById("history");
    historyList.innerHTML = "";

    currentAccount.history.slice().reverse().forEach(item => {
        let li = document.createElement("li");
        li.innerText = item;
        historyList.appendChild(li);
    });
}