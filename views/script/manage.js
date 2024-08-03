// 서버로 수정된 데이터 전송
const updateData = (title, bookcaseNum, finalCount) => {
  fetch("your_server_address", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      title: title,
      bookcaseNum: bookcaseNum,
      finalCount: finalCount,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
};

// 검색 필터링
function applyFilters() {
  const bookList = document.querySelectorAll("#bookList > tr");
  const searchKeyword = document.querySelector("#searchInput").value.toLowerCase();
  const selectedGenre = document.querySelector("#dropbtn-genre").textContent.split(" ")[1];
  const selectedBookcase = document.querySelector("#dropbtn-bookcase").textContent.split(" ")[1];
  let filteredBooks = [];

  bookList.forEach((book) => {
    // 필터링 조건을 먼저 검사한다.
    const bookGenre = book.querySelector(".genre-name").textContent;
    const bookcaseNum = book.querySelector(".bookcase-num").textContent;

    const genreMatch = selectedGenre === "전체" || selectedGenre === bookGenre;
    const bookcaseMatch = selectedBookcase === "전체" || selectedBookcase === bookcaseNum;
    const keywordMatch = book.querySelector("td:nth-child(2)").textContent.toLowerCase().includes(searchKeyword);

    if (genreMatch && bookcaseMatch && keywordMatch) {
      filteredBooks.push(book);
    } else {
      book.style.display = "none";
    }
  });

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
const genreItems = document.querySelectorAll(".genre-item");
genreItems.forEach((item) => {
  item.addEventListener("click", () => {
    const clickedCode = item.dataset.code;
    document.getElementById("dropbtn-genre").innerText = `장르: ${clickedCode}`;
    applyFilters();
  });
});

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

// 클릭한 요소 수정
// TODO: 수정한 데이터를 서버로 전송
// TODO: 다른 요소 클릭하면 수정모드 해제
const tdList = document.querySelectorAll("#bookList > tr > td");
tdList.forEach((td) => {
  td.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = td.textContent;

    td.appendChild(input);
    input.focus();

    input.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        const userInput = input.value;
        updateData();
        td.removeChild(input);
      }
    });
  });
});
