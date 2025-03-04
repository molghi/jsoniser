function getLineNumbers(text) {
    return;
    if (document.querySelector(".divv")) document.querySelector(".divv").remove();
    const div = document.createElement("div");
    div.classList.add("divv");
    div.style.lineHeight = 1;
    div.style.padding = `10px`;
    div.style.opacity = `0`;
    div.style.visibility = `hidden`;
    const content = text
        .split("\n")
        .map((x) => `<span>${x}</span>`)
        .join("<br>");
    div.innerHTML = content;
    document.querySelector("main .container").appendChild(div);
    const heights = [...document.querySelectorAll(".divv span")].map((span) => span.offsetHeight);
    document.querySelector(".divv").remove();

    if (document.querySelector(".line-numbers")) document.querySelector(".line-numbers").remove();
    const divNums = document.createElement("div");
    divNums.classList.add("line-numbers");
    const lineNumbers = heights.map((height, i) => {
        return `<span style="min-width: 30px; min-height: ${height}px; line-height: 1; font-size: 16px;${
            i === 0 ? "margin: 9px 0 0;" : "margin-top: -2px;"
        }">${i + 1}</span>`;
    });
    divNums.innerHTML = lineNumbers.join("");
    document.querySelector(".form__input-box:nth-child(2)").appendChild(divNums);

    document.querySelector(".form__textarea").addEventListener("scroll", function () {
        document.querySelector(".line-numbers").scrollTop = document.querySelector(".form__textarea").scrollTop;
    });
}

export default getLineNumbers;
