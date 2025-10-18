const langBtn = document.getElementById("langBtn");
const title = document.getElementById("title");
const headDiv = document.getElementById("head");
const loginSection = document.getElementById("loginSection");
const sendSection = document.getElementById("sendSection");
const usernameIput = document.getElementById("username");
const loginBtn = document.getElementById("loginBtn");
const welcomeDiv = document.getElementById("welcome");
const balacneDiv = document.getElementById("balance");
const reciverInput = document.getElementById("recevier");
const amountInput = document.getElementById("amount");
const sendBtn = document.getElementById("send");
const container = document.getElementById("rainContainer");
const messageDiv = document.getElementById("message");
const historyDiv = document.getElementById("history");

let balance = 100;
let lang = "en";

// Language toggle
if (lang === "en") {
  document.body.style.fontFamily = "'Poppins', sans-serif";
} else {
  document.body.style.fontFamily = "'Cario', sans-serif";
}
langBtn.addEventListener("click", function () {
  if (lang === "en") {
    lang = "ar";
    title.textContent = "كيّش";
    headDiv.textContent = "كيّش";
    usernameIput.placeholder = "ادخل اسمك";
    loginBtn.textContent = "تسجيل دخول";

    balacneDiv.textContent = "الرصيد: 100 د.ك";
    reciverInput.placeholder = "ادخل اسم المستلم";
    amountInput.placeholder = "ادخل المبلغ";
    sendBtn.textContent = "كيّش";
    langBtn.textContent = "English";
  } else {
    title.textContent = "Kiish";
    headDiv.textContent = "Kiish";
    usernameIput.placeholder = "Enter your username";
    loginBtn.textContent = "Login";

    balacneDiv.textContent = "Balance: 100 KD";
    reciverInput.placeholder = "Enter recevier's username";
    amountInput.placeholder = "Enter amount";
    sendBtn.textContent = "Kiish";
    langBtn.textContent = "عربي";
  }
});
// Login
loginBtn.addEventListener("click", function () {
  const user = usernameIput.value.trim();
  if (!user) {
    alert(lang === "en" ? "Enter a username" : "ادخل اسمك");
    return;
  }
  welcomeDiv.textContent =
    lang === "en" ? `Welcome, ${user} !` : `! هلا, ${user} `;
  loginSection.style.display = "none";
  sendSection.style.display = "block";
});
//MAKE IT RAIN!!!
function makeItRain() {
  const logoCount = 50;
  for (let i = 0; i < logoCount; i++) {
    const logo = document.createElement("img");
    logo.src = "./Logo2.png";
    logo.classList.add("logo");
    logo.style.left =
      (i / logoCount) * window.innerWidth + Math.random() * 50 + "px";
    logo.style.animationDuration = 2 + Math.random() * 2 + "s";
    container.appendChild(logo);

    logo.addEventListener("animationend", () => logo.remove());
  }
}
sendBtn.addEventListener("click", () => {
  makeItRain();
});
//send money
sendBtn.addEventListener("click", function () {
  const recevier = reciverInput.value;
  const amount = parseFloat(amountInput.value);
  messageDiv.style.display = "block";
  if (!recevier || !amount) {
    alert(
      lang === "en"
        ? "Please enter both username and amount!"
        : "الرجاء إدخال اسم المستلم و المبلغ!"
    );
    return;
  }
  //balacne not enough
  if (amount > balance) {
    alert(lang === "en" ? "Not enough balance." : "الرصيد غير كافي.");
    return;
  }

  //subtract from balance
  balance -= amount;

  document.getElementById("balance").textContent =
    lang === "en" ? `balance ${balance} KD` : `الرصيد ${balance} د.ك`;
  messageDiv.textContent =
    lang === "en"
      ? `You sent ${amount} KD to ${recevier}`
      : `لقد ارسلت ${amount} د.ك إلى ${recevier}`;

  const historyTitle = document.getElementById("historyTitle");
  historyTitle.textContent =
    lang === "en" ? "Last Transactions:" : ":آخر المعاملات";

  const p = document.createElement("p");
  p.textContent =
    lang === "en"
      ? `-${amount} KD to ${recevier}`
      : `-${amount} د.ك إلى ${recevier}`;
  historyDiv.insertBefore(p, historyTitle.nextSibling);

  reciverInput.value = "";
  amountInput.value = "";
});
