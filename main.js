import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "./style.css";

let buildTr = ({ id, username, name, email }, index) => {
  return ` <tr>
  <th scope="row">${id}</th>
  <td>${name}</td>
  <td>${username}</td>
  <td>${email}</td>
  <td>
  <button type="button" class="btn btn-outline-success">Edit</button>
  <button id="${index}" type="button" class="btn btn-outline-danger btn-delete">Delete</button>
  </td>
</tr>`;
};

function buildHandleDelete() {
  let listbtndel = document.getElementsByClassName("btn-delete");
  for (let index = 0; index < listbtndel.length; index++) {
    listbtndel[index].onclick = function () {
      // console.log(this.id);
      fetch(
        `https://fpl-demo-10b41-default-rtdb.firebaseio.com/user/${this.id}.json`,
        {
          method: "DELETE",
        }
      );
      this.parentElement.parentElement.remove();
      alert("Deleted!!!");
    };
  }
}

fetch("https://fpl-demo-10b41-default-rtdb.firebaseio.com/user.json")
  .then((respone) => respone.json())
  .then((datas) => {
    console.log(datas);
    let datasTR = ``;
    datas.forEach((user, index) => {
      if (user) {
        datasTR += buildTr(user, index);
      }

      // console.log(value, index);
    });
    document.getElementById("tbody-user").innerHTML = datasTR;
    buildHandleDelete();
  });

