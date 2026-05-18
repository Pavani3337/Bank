let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
let currentAccount = null;

// 💾 Save data
function saveData() {
    localStorage.setItem("accounts", JSON.stringify(accounts));
}

// 🆕 Create account (MANUAL account number)
function createAccount() {
    let accNo = parseInt(document.getElementById("accNo").value);
    let name = document.getElementById("name").value;
    let balance = parseFloat(document.getElementById("balance").value);

    if (isNaN(accNo) || !name || isNaN(balance)) {
        alert("Enter valid details");
        return;
    }

    // check duplicate account number
    let exists = accounts.find(a => a.accNo === accNo);
    if (exists) {
        alert("Account Number already exists!");
        return;
    }

    let account = {
        accNo,
        name,
        balance,
        history: [`Account created with ₹${balance}`]
    };

    accounts.push(account);
    saveData();

    alert("Account Created Successfully!");

    document.getElementById("accNo").value = "";
    document.getElementById("name").value = "";
    document.getElementById("balance").value = "";
}

// 🔍 Search account
function searchAccount() {
    let accNo = parseInt(document.getElementById("searchAcc").value);

    currentAccount = accounts.find(acc => acc.accNo === accNo);

    if (!currentAccount) {
        alert("Account not found");
        return;
    }

    updateUI();
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

// 📊 Show account details
function updateUI() {
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