const getWeather_btn = document.getElementById("get_btn");
const col_1 = document.getElementById("col_1");
const col_2 = document.getElementById("col_2");
const col_3 = document.getElementById("col_3");
const col_4 = document.getElementById("col_4");
const search_btn = document.getElementById("search_btn");
const search_field = document.getElementById("search_field");

const table_data = document.getElementById("table_data");
// console.log(col_1.innerText);
const header = table_data.innerHTML;

let api_data = "";
const getApi = async (city_name) => {
  const api = `https://python3-dot-parul-arena-2.appspot.com/test?cityname=${city_name}`;
  try {
    let data = await fetch(api);
    api_data = await data.json();
    return api_data;
    console.log(api_data.description);
  } catch (error) {
    console.log("error" + error);
  }
};
let count = 0;
let arr = [col_1, col_2, col_3, col_4];
getWeather_btn.addEventListener("click", async () => {
  console.log(arr[count].innerText);
  let city = arr[count].innerText;
  if (count == 3) {
    count = 0;
  } else {
    count++;
  }
  const tData = await getApi(city);
  console.log(tData);
  table_data.innerHTML += `<tr><td>${city}</td><td><input value="${api_data.description}"/></td><td>${api_data.temp_in_celsius}</td><td>${api_data.pressure_in_hPa}</td> <td>${api_data.date_and_time}</td><td><Button onclick="deleteRow(this)">Delete</Button></td></tr>`;
});

search_btn.addEventListener("click", async () => {
  const search = search_field.value;
  console.log(search);
  myFunction(search);
});

function myFunction(val) {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("search_field");
  filter = input.value.toUpperCase();
  table = document.getElementById("table_data");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
function deleteRow(r) {
  var i = r.parentNode.parentNode.rowIndex;
  table_data.deleteRow(i);
}
