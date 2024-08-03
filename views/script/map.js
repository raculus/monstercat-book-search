function drawCircle(findNum) {
  const elements = document.querySelectorAll("#_번호 > g > text > tspan");
  elements.forEach((element) => {
    const num = parseInt(element.textContent, 10);
    if (num === findNum) {
      const textNode = element.parentNode;
      const transform = textNode.getAttribute("transform");
      const [x, y] = transform.substring(transform.indexOf("(") + 1, transform.indexOf(")")).split(" ");

      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", parseFloat(x) + 4.0);
      circle.setAttribute("cy", parseFloat(y) - 2.27);
      circle.setAttribute("r", 18);
      circle.setAttribute("fill", "none");
      circle.setAttribute("stroke", "red");
      circle.setAttribute("stroke-width", 4);

      element.parentNode.parentNode.parentNode.appendChild(circle);
    }
  });
}
