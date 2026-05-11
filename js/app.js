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
		createMobContainer(
			requestInJson[i].name,
			requestInJson[i].image,
			requestInJson[i].isClassification,
			requestInJson[i].type,
		);
	}
});

function createMobContainer(name, image, classi, type) {
	// `<div class="mobContainer">
	// 		<button class="mobContainerBtn">${name}</button>
	// 		<img
	// 		    src=${image}
	// 			alt="mobimage"
	// 		/>
	// 		<div class="mobContainerDivP">
	// 			<p class="mobContainerClassification">${classi}</p>
	// 			<p class="mobContainerType">${type}</p>
	// 		</div>
	//          <hr class="mobContainerHr">
	// 		<button class="mobContainerBtn"><a class="mobContainerBtnA" href="../html/details.html">SEE MORE</a></button>
	// </div>`;
    
	const $divContainer = document.createElement("div");
	$divContainer.classList.add("mobContainer");

	const $mobContainerBtn = document.createElement("button");
	$mobContainerBtn.classList.add("mobContainerBtn");
	$mobContainerBtn.textContent = name;
	$divContainer.appendChild($mobContainerBtn);

	const $mobimage = document.createElement("img");
	$mobimage.setAttribute("src", `${image}`);
	$divContainer.appendChild($mobimage);

	const $mobContainerDivP = document.createElement("div");
	$mobContainerDivP.classList.add("mobContainerDivP");
	$divContainer.appendChild($mobContainerDivP);

	const $mobContainerClassification = document.createElement("p");
	$mobContainerClassification.textContent = classi;
	$mobContainerDivP.appendChild($mobContainerClassification);

	const $mobContainerType = document.createElement("p");
	$mobContainerType.classList.add("mobContainerType");
	$mobContainerDivP.appendChild($mobContainerType);

	const $hr = document.createElement("hr");
	$hr.classList.add("mobContainerHr");
	$divContainer.appendChild($hr);

	const $mobContainerBtn2 = document.createElement("button");
	$mobContainerBtn2.classList.add("mobContainerBtn");
	$divContainer.appendChild($mobContainerBtn2);

	const $mobContainerBtnA = document.createElement("a");
	$mobContainerBtnA.classList.add("mobContainerBtnA");
	$mobContainerBtnA.setAttribute("href", "../html/details.html");
	$mobContainerBtn2.appendChild($mobContainerBtnA);

	$botPage.appendChild($divContainer);
}
