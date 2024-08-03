const xlsx = require("xlsx");

const filename = "books.xlsx";

const workbook = xlsx.readFile(filename);

const names_booklist = workbook.SheetNames[0];
// const names_manage = workbook.SheetNames[3];

let sheetNames = [];
sheetNames.push(names_booklist);
// sheetNames.push(names_manage);

const sheet_booklist = workbook.Sheets[names_booklist];
// const sheet_manage = workbook.Sheets[names_manage];

let data_booklist = xlsx.utils.sheet_to_json(sheet_booklist);
console.log(data_booklist);
data_booklist = sortBooks(data_booklist);
// let data_manage = xlsx.utils.sheet_to_json(sheet_manage);

function reloadXlsx() {
  const reloadedWorkbook = xlsx.readFile(filename);

  const reloadedData_booklist = xlsx.utils.sheet_to_json(reloadedWorkbook.Sheets[names_booklist]);
  // const reloadedData_manage = xlsx.utils.sheet_to_json(reloadedWorkbook.Sheets[names_manage]);

  data_booklist = sortBooks(reloadedData_booklist);
  // data_manage = reloadedData_manage;
}

function getBookList() {
  return data_booklist;
}

function getManage() {
  return data_manage;
}
function getSheetNames() {
  return sheetNames;
}

function sortBooks(books) {
  const sorted = books.sort((b, a) => {
    return a.책장번호 - b.책장번호 || a.칸번호 - b.칸번호;
  });
  return sorted;
}

function getBookcaseNums(data) {
  // 책장번호를 담을 배열
  const bookcaseNums = [];

  // 데이터 반복문을 돌면서 책장번호 배열에 추가
  data.forEach((book) => {
    const bookcaseNum = parseInt(book.책장번호, 10);
    if (!bookcaseNums.includes(bookcaseNum)) {
      bookcaseNums.push(bookcaseNum);
    }
  });

  // 책장번호를 문자열로 변환하여 반환
  return bookcaseNums;
}

module.exports = {
  getBookList,
  getBookcaseNums,
  reloadXlsx,
  getManage,
  getSheetNames,
};
