const axios = require('axios');

async function fetchSpreadsheetData() {
  const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQoqrsT1WfzcJGM2VFfuUSP4b0TK4W2H3p43PNKSXhJUKij5uWOfb9Q-Z9rwuzilAFztHv5Y19ikh5X/pub?output=tsv';
  try {
    const response = await axios.get(url);
    const csvData = response.data;
    return csvData;
    // CSV를 JSON으로 변환하는 로직 추가 가능
  } catch (error) {
    throw new Error('Error fetching spreadsheet data:', error);
  }
}

// 장르	제목	권수	완결여부	책장번호	칸번호	비고

async function get_book_list(){
  const csvData = await fetchSpreadsheetData();
  const rows = csvData.split('\n');
  const books = rows.map(row => {
    const [genre, title, volume, isComplete, bookcaseNum, columnNum, note] = row.split('\t');
    return {
      genre,
      title,
      volume,
      isComplete,
      bookcaseNum,
      columnNum,
      note
    };
  });
  // books.shift();
  return books;
  // return sortBooks(books);
}

// function sortBooks(books) {
//   const sorted = books.sort((b, a) => {
//     return a.bookcaseNum - b.bookcaseNum || a.columnNum - b.columnNum;
//   });
//   return sorted;
// }


function get_bookcase_nums(books) {
  const bookcaseSet = new Set();

  books.forEach(book => {
    if (isNaN(book.bookcaseNum)) {
      return;
    }
    else if (book.bookcaseNum === '') {
      return;
    }
    else if (!bookcaseSet.has(book.bookcaseNum)) {
      bookcaseSet.add(book.bookcaseNum);
    }
  });
  return Array.from(bookcaseSet);
}


module.exports = {
  get_book_list,
  get_bookcase_nums,
};
