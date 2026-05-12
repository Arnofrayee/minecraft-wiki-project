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

const $form = document.querySelector("form");
const $botPage = document.querySelector("#botPage");

$form.addEventListener("submit", async (e) => {
	e.preventDefault();

	let url = "http://10.69.4.208:3000/v1/entities?";

	let isSearch = "";
	let isClassification = "";
	let isType = "";
	let isHealth = "";
	let isArmor = "";
	let isDamage = "";
	const formdatas = new FormData($form);
	if (formdatas.get("search")) {
		isSearch = formdatas.get("search").toLowerCase();
		url += `&name=${isSearch}`;
	}
	if (formdatas.get("ClassificationSelect")) {
		isClassification = formdatas.get("ClassificationSelect");
		url += `&classification=${isClassification}`;
	}
	if (formdatas.get("type")) {
		isType = formdatas.get("type");
		url += `&type=${isType}`;
	}
	if (formdatas.get("health")) {
		isHealth = formdatas.get("health");
		url += `&health=${isHealth}`;
	}

	if (formdatas.get("armor")) {
		isArmor = formdatas.get("armor");
		url += `&armor=${isArmor}`;
	}
	if (formdatas.get("damage")) {
		isDamage = formdatas.get("damage");
	}
	const request = await fetch(url);
	const requestInJson = await request.json();
	for (let i = 0; i < requestInJson.length; i++) {
		getFormdatas(
			requestInJson[i].name,
			requestInJson[i].image,
			requestInJson[i].isClassification,
			requestInJson[i].type,
		);
	}
});

function getFormdatas(name, image, classi, type) {
	$botPage.innerHTML = "";
}
