let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
let currentAccount = null;

// 💾 Save to localStorage
function saveData() {
    localStorage.setItem("accounts", JSON.stringify(accounts));
}

// 🆕 Manual account creation
function createAccountManually() {
    let name = document.getElementById("name").value;
    let balance = parseFloat(document.getElementById("balance").value);

    if (!name || isNaN(balance)) {
        alert("Enter valid details");
        return;
    }

    let accNo = Math.floor(1000 + Math.random() * 9000);

    let account = {
        accNo,
        name,
        balance,
        history: [`Account created with ₹${balance}`]
    };

    accounts.push(account);
    saveData();

    alert("Account Created! Account No: " + accNo);

    document.getElementById("name").value = "";
    document.getElementById("balance").value = "";
}

// 🔍 Smart Search (Load or Create)
function searchAccount() {
    let accNo = parseInt(document.getElementById("searchAcc").value);

    if (isNaN(accNo)) {
        alert("Enter valid account number");
        return;
    }

    let found = accounts.find(acc => acc.accNo === accNo);

    // ✅ If exists
    if (found) {
        currentAccount = found;
        updateUI();
        return;
    }

    // 🆕 If not found → create new
    let name = prompt("Account not found. Enter Account Name:");
    if (!name) return;

    let balance = parseFloat(prompt("Enter Initial Balance:"));
    if (isNaN(balance)) {
        alert("Invalid balance");
        return;
    }

    let newAccount = {
        accNo: accNo,
        name: name,
        balance: balance,
        history: [`Account created with ₹${balance}`]
    };

    accounts.push(newAccount);
    saveData();

    currentAccount = newAccount;
    updateUI();

    alert("Account Created Successfully!");
}

// 💰 Deposit
function deposit() {
    if (!currentAccount) return alert("Search account first");

    let amount = parseFloat(document.getElementById("amount").value);
    if (isNaN(amount) || amount <= 0) return;

    currentAccount.balance += amount;
    currentAccount.history.push(`Deposited ₹${amount}`);

    saveData();
    updateUI();
}

// 💸 Withdraw
function withdraw() {
    if (!currentAccount) return alert("Search account first");

    let amount = parseFloat(document.getElementById("amount").value);
    if (isNaN(amount) || amount <= 0) return;

    if (amount > currentAccount.balance) {
        alert("Insufficient Balance");
        return;
    }

    currentAccount.balance -= amount;
    currentAccount.history.push(`Withdrawn ₹${amount}`);

    saveData();
    updateUI();
}

// 📊 Update UI
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