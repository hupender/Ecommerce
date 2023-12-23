const Option = document.querySelector("#category");
const otherOption = document.querySelector("#other");

Option.onchange = function () {
    // console.log(Option.value);
    if (Option.value == "other") {
        otherOption.style.display = "block";
    }
    else {
        otherOption.style.display = "none";
    }
}