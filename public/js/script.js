let filter = document.getElementById("filter");
var delay = 0;
var delayTimeout;
filter.addEventListener("keyup", (e) => {
  delay = 0.5 * 1000;
  clearTimeout(delayTimeout);
  delayTimeout = setTimeout(mySearchFunction, delay);
});

function mySearchFunction() {
  let filterValue = document.getElementById("filter").value.toUpperCase();

  let ul = document.getElementById("list-group");
  let li = ul.querySelectorAll("li.list-group-item");

  for (let i = 0; i < li.length; i++) {
    let a = li[i].getElementsByTagName("a")[0];
    console.log(a);
    if (a.innerText.toUpperCase().indexOf(filterValue) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
