function getLineNumbers(text) {
    // temporarily rendering (and quickly removing) an element to get the height of each line in the textarea, with the same styles, to show TextareaLines jsx

    if (document.querySelector(".divv")) document.querySelector(".divv").remove();

    const div = document.createElement("div");
    div.classList.add("divv");
    div.style.lineHeight = 1;
    div.style.padding = `10px`;
    div.style.border = `1px solid white`;
    div.style.opacity = `0`;
    div.style.visibility = `hidden`;
    div.style.position = `absolute`;
    div.style.width = `1170px`;
    if (window.innerWidth < 1182) div.style.width = `970px`;
    if (window.innerWidth < 993) div.style.width = `750px`;
    if (window.innerWidth < 768) div.style.width = `100%`;

    const content = text
        .split("\n")
        .map((x) => `<span>${x}</span>`)
        .join("<br>");

    div.innerHTML = content;

    document.querySelector("main .container").appendChild(div);

    const heights = [...document.querySelectorAll(".divv span")].map((span) => span.offsetHeight); // reading heights

    document.querySelector(".divv").remove();

    return heights;
}

export default getLineNumbers;
