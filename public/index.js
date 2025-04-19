const ul = document.querySelector(".users");
window.addEventListener("load", async () => {
  try {
    const response = await fetch("http://127.0.0.1:3000/users");
    const res = await response.json();
    console.log(res.data);

    res.data.forEach((element) => {
      const liElement = document.createElement("li");

      liElement.textContent = `Name ${element.username} Email ${element.email}`;
      console.log(liElement);
      ul.appendChild(liElement);
    });
  } catch (err) {
    console.log(`${err}`);
  }
});

