import _ from "lodash";

const letters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const symbols = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "&",
  "+",
  "=",
  "*",
  "[",
  "]",
  "{",
  "}",
  "?",
  "<",
  ">",
  ":",
];

const uppercase = (arr) => {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push(arr[i].toUpperCase());
  }
  return newArr;
};

const uppercaseLetters = uppercase(letters);

export const generator = () => {
  let password = "";

  for (let i = 1; i < 9; i++) {
    password += letters[_.random(letters.length - 1)];
    password += nums[_.random(nums.length - 1)];
    password += symbols[_.random(symbols.length - 1)];
    password += uppercaseLetters[_.random(uppercaseLetters.length - 1)];
    console.log(password);
  }

  let arr = _.shuffle(password.split(""));

  return arr.join("");
};
