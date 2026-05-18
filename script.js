let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
let currentAccount = null;

// 💾 Save
function saveData() {
    localStorage.setItem("accounts", JSON.stringify(accounts));
}

// 🆕 Create Account
function createAccount() {
    let accNo = parseInt(document.getElementById("accNo").value);
    let name = document.getElementById("name").value;
    let pin = document.getElementById("pin").value;
    let balance = parseFloat(document.getElementById("balance").value);

    if (isNaN(accNo) || !name || !pin || isNaN(balance)) {
        alert("Enter valid details");
        return;
    }

    if (accounts.find(a => a.accNo === accNo)) {
        alert("Account already exists");
        return;
    }

    accounts.push({
        accNo,
        name,
        pin,
        balance,
        history: [`Account created with ₹${balance}`]
    });

    saveData();
    alert("Account Created!");
}

// 🔐 LOGIN
function loginAccount() {
    let accNo = parseInt(document.getElementById("loginAccNo").value);
    let pin = document.getElementById("loginPin").value;

    currentAccount = accounts.find(a => a.accNo === accNo && a.pin === pin);

    if (!currentAccount) {
        alert("Invalid login");
        return;
    }

    updateUI();
}

// 💰 Deposit
function deposit() {
    if (!currentAccount) return alert("Login first");

    let amount = parseFloat(document.getElementById("amount").value);
    if (isNaN(amount) || amount <= 0) return;

    currentAccount.balance += amount;
    currentAccount.history.push(`Deposited ₹${amount}`);

    saveData();
    updateUI();
}

// 💸 Withdraw
function withdraw() {
    if (!currentAccount) return alert("Login first");

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

// 🔁 Transfer Money
function transfer() {
    if (!currentAccount) return alert("Login first");

    let toAcc = parseInt(document.getElementById("toAcc").value);
    let amount = parseFloat(document.getElementById("transferAmount").value);

    let receiver = accounts.find(a => a.accNo === toAcc);

    if (!receiver) {
        alert("Receiver not found");
        return;
    }

    if (amount > currentAccount.balance || amount <= 0) {
        alert("Invalid amount");
        return;
    }

    currentAccount.balance -= amount;
    receiver.balance += amount;

    currentAccount.history.push(`Sent ₹${amount} to ${toAcc}`);
    receiver.history.push(`Received ₹${amount} from ${currentAccount.accNo}`);

    saveData();
    updateUI();
}

// 📊 UI Update
function updateUI() {
    document.getElementById("accountInfo").innerText =
        `Account: ${currentAccount.name} (Acc No: ${currentAccount.accNo})`;

    document.getElementById("balanceDisplay").innerText =
        "Balance: ₹" + currentAccount.balance;

    // Summary
    let totalDeposits = currentAccount.history.filter(h => h.includes("Deposited")).length;
    let totalWithdrawals = currentAccount.history.filter(h => h.includes("Withdrawn")).length;

    document.getElementById("summary").innerText =
        `Deposits: ${totalDeposits} | Withdrawals: ${totalWithdrawals}`;

    // History
    let list = document.getElementById("history");
    list.innerHTML = "";

    currentAccount.history.slice().reverse().forEach(h => {
        let li = document.createElement("li");
        li.innerText = h;
        list.appendChild(li);
    });
}