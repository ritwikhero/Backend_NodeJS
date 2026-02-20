// function getAnimalData() {
//   //   const response = fetch("https://fakerapi.it/api/v2/persons?_quantity=10");
//   //   console.log(response);

//   fetch("https://fakerapi.it/api/v2/persons?_quantity=10")
//     .then((response) => response.json())
//     .then((data) => console.log(data));
// }

async function getAnimalData() {
  const response = await fetch(
    "https://fakerapi.it/api/v2/persons?_quantity=10",
  );
  const data = await response.json();
  console.log(data);
}
