const input = document.getElementById("gif-search");
const btn = document.getElementById("btn");
const imgContainer = document.getElementById("gif-container");

const getImage = async () => {
  const res = await fetch(`/api/gifs?search=${input.value}`);
  const data = await res.json();
  const imgSrc = data.data[0].images.original.webp;

  imgContainer.src = imgSrc;
};

btn.addEventListener("click", () => {
  getImage();
});
