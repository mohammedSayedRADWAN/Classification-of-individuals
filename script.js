/** @format */

const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

//fetch data from random user api
getUser();
let data = [];
async function getUser() {
  const res = await fetch('https://randomuser.me/api/');
  const data = await res.json();
  const User = data.results[0];
  const newUser = {
    name: `${User.name.first} ${User.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addObj(newUser);
}

function doubleMoney() {
  // use map instade for each because map easy apply new format or changes into array
  data = data.map((user) => {
    //use spread array to copy data from obj
    //use money to access atr of user obj and modyfiy it
    return { ...user, money: user.money * 2 };
  });
  updateDom();
}
//sort users by riches
//note sort fun has default sort strings so must pass num if you need sort numirc value
function sortByRiches() {
  data.sort((a, b) => {
    return b.money - a.money;
  });
  updateDom();
}
// show only million users
function fillter() {
  data = data.filter((user) => {
    return user.money > 1000000;
  });
  updateDom();
}
// calculate total wealth for users
function calculateWealth() {
  const total = data.reduce((acc, user) => (acc += user.money), 0);
  const wealthEle = document.createElement('div');
  wealthEle.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    total
  )}</strong></h3>`;
  main.appendChild(wealthEle);
}
//fun add obj to data
function addObj(user) {
  data.push(user);
  updateDom();
}
function updateDom(provideData = data) {
  //clear main
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
  provideData.forEach((item) => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
addUserBtn.addEventListener('click', getUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRiches);
showMillionairesBtn.addEventListener('click', fillter);
calculateWealthBtn.addEventListener('click', calculateWealth);
