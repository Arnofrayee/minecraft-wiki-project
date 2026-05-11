const $description = document.querySelector("#descripton");
const $h1 = document.querySelector("h1");
const $mobContainerBtn1 = document.querySelector("#mobContainerBtn1");
const $image = document.querySelector("#image");
const $health = document.querySelector("#health");
const $armor = document.querySelector("#armor");
const $classi = document.querySelector("#classi");
const $behavior = document.querySelector("#behavior");
const $height = document.querySelector("#height");
const $width = document.querySelector("#width");

document.addEventListener("DOMContentLoaded", async () => {
	const name = localStorage.getItem("name");
	localStorage.clear();
	const request = await fetch(
		`http://10.69.4.208:3000/v1/entities?name=${name}`,
	);
	const requestjson = await request.json();
	$h1.textContent = requestjson[0].name;
	$description.textContent = requestjson[0].description;
	$mobContainerBtn1.innerHTML = `<img src="${requestjson[0].icon}" alt="mob-icon" class="iconImage"> ${name}`;
    $image.setAttribute("src", requestjson[0].image);
    $health.textContent = requestjson[0].health;
    $armor.textContent = requestjson[0].armor;
    $classi.textContent = requestjson[0].classification;
    $behavior.textContent = requestjson[0].type;
    $height.textContent ="Height: " + requestjson[0].height + " blocks";
    $width.textContent = "Width: " + requestjson[0].width + " blocks";
});

//Start of dialog section

const $menuBurgerButton = document.querySelector("#menuBurgerButton");
const $dialog = document.querySelector("dialog");
const $closesvg = document.querySelector("#closesvg");
let isDialogOpened = false;
$menuBurgerButton.addEventListener("click", () => {
	if (!isDialogOpened) {
		$dialog.showModal();
		isDialogOpened = true;
	} else {
		$dialog.close();
		isDialogOpened = false;
	}
});
$closesvg.addEventListener("click", () => {
	$dialog.close();
});

//End of dialog section
