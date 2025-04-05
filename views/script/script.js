const trList = document.querySelectorAll("tbody#bookList tr");
let previousClickedRow = null;

const CHO = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ",
  "ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];

function getChosung(str) {
let result = '';
for (let i = 0; i < str.length; i++) {
const code = str.charCodeAt(i);
if (code >= 0xAC00 && code <= 0xD7A3) {
const uniIndex = code - 0xAC00;
const choIndex = Math.floor(uniIndex / (21 * 28));
result += CHO[choIndex];
} else {
result += str[i]; // 한글이 아니면 그대로
}
}
return result;
}


// 검색 필터링
function applyFilters() {
  const bookList = document.querySelectorAll("#bookList > tr");
  const searchKeyword = document.querySelector("#searchInput").value.toLowerCase();
  // const selectedGenre = document.querySelector("#dropbtn-genre").textContent.split(" ")[1];
  const selectedBookcase = document.querySelector("#dropbtn-bookcase").textContent.split(" ")[1];
  let filteredBooks = [];

  bookList.forEach((book) => {
    // 필터링 조건을 먼저 검사한다.
    // const bookGenre = book.querySelector(".genre-name").textContent;
    const bookcaseNum = book.querySelector(".bookcase-num").textContent;

    // const genreMatch = selectedGenre === "전체" || selectedGenre === bookGenre;
    const bookcaseMatch = selectedBookcase === "전체" || selectedBookcase === bookcaseNum;
    const keywordMatch = book.querySelector("td:nth-child(3)").textContent.toLowerCase().includes(searchKeyword);
    const chosungMatch = getChosung(book.querySelector("td:nth-child(3)").textContent.toLowerCase()).includes(searchKeyword);

    if (bookcaseMatch && keywordMatch || chosungMatch) {
      filteredBooks.push(book);
    } else {
      book.style.display = "none";
    }
  });

  // 필터가 전체가 아니면서 검색 결과가 없을 경우
  if (filteredBooks.length === 0) {
    if (selectedBookcase != "전체") {
      // 필터 전체로 초기화
      // document.querySelector("#dropbtn-genre").innerText = "장르: 전체";
      document.querySelector("#dropbtn-bookcase").innerText = "책장: 전체";
    }
  }

  // 홀수번째 책과 짝수번째 책에 다른 스타일을 적용한다.
  filteredBooks.forEach((book, index) => {
    if (index % 2 === 0) {
      book.classList.remove("odd");
      book.classList.add("even");
    } else {
      book.classList.remove("even");
      book.classList.add("odd");
    }
    book.style.display = "table-row";
  });
}

// 도서명 검색
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", () => {
  applyFilters();
});

// 장르 선택
// const genreItems = document.querySelectorAll(".genre-item");
// genreItems.forEach((item) => {
//   item.addEventListener("click", () => {
//     const clickedCode = item.dataset.code;
//     document.getElementById("dropbtn-genre").innerText = `장르: ${clickedCode}`;
//     applyFilters();
//   });
// });

// 책장 선택
const bookcaseItems = document.querySelectorAll(".bookcase-item");
bookcaseItems.forEach((item) => {
  item.addEventListener("click", () => {
    const clickedCode = item.dataset.code;
    document.getElementById("dropbtn-bookcase").innerText = `책장: ${clickedCode}`;
    applyFilters();
  });
});

applyFilters();
