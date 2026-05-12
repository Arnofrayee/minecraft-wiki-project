//Start of dialog section

const $menuBurgerButton = document.querySelector("#menuBurgerButton");
const $dialog = document.querySelector("dialog");
const $closesvg = document.querySelector("#closesvg");
const $body = document.querySelector("body");
let isDialogOpened = false;
$menuBurgerButton.addEventListener("click", () => {
	if (!isDialogOpened) {
		$dialog.showModal();
		isDialogOpened = true;
		$body.style.overflowY = "hidden";
	} else {
		$dialog.close();
		isDialogOpened = false;
	}
});
$closesvg.addEventListener("click", () => {
	$dialog.close();
	$body.style.overflowY = "visible";
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

	$botPage.innerHTML = "";

	for (let i = 0; i < requestInJson.length; i++) {
		createMobContainer(
			requestInJson[i].name,
			requestInJson[i].image,
			requestInJson[i].isClassification,
			requestInJson[i].type,
		);
	}

	if ($botPage.children.length == 0) {
		$botPage.innerHTML = `<div class="notfounddiv">
					<h3>No entity found</h3>
					<svg
						width="54"
						height="54"
						viewBox="0 0 54 54"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M26.6667 0C11.92 0 0 11.92 0 26.6667C0 41.4133 11.92 53.3333 26.6667 53.3333C33.7391 53.3333 40.5219 50.5238 45.5228 45.5228C50.5238 40.5219 53.3333 33.7391 53.3333 26.6667C53.3333 11.92 41.3333 0 26.6667 0ZM12.6933 18.1867L15.52 15.36L18.3467 18.1867L21.1733 15.36L24 18.1867L21.1733 21.0133L24 23.84L21.1733 26.6667L18.3467 23.84L15.52 26.6667L12.6933 23.84L15.52 21.0133L12.6933 18.1867ZM13.04 41.3333C15.1733 35.8933 20.4533 32 26.6667 32C32.88 32 38.16 35.8933 40.2933 41.3333H13.04ZM40.64 23.84L37.8133 26.6667L34.9867 23.84L32.16 26.6667L29.3333 23.84L32.16 21.0133L29.3333 18.1867L32.16 15.36L34.9867 18.1867L37.8133 15.36L40.64 18.1867L37.8133 21.0133L40.64 23.84Z"
							fill="#8C8C8C"
						/>
					</svg>
				</div>`;
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
	if (type == "neutral") {
		$divContainer.classList.add("mobContainerYellow");
	}
	if (type == "hostile") {
		$divContainer.classList.add("mobContainerRed");
	}

	const $mobContainerBtn = document.createElement("button");
	$mobContainerBtn.classList.add("mobContainerBtn");
	$mobContainerBtn.textContent = name;
	$divContainer.appendChild($mobContainerBtn);
	if (type == "neutral") {
		$mobContainerBtn.classList.add("mobContainerBtnYellow");
	}
	if (type == "hostile") {
		$mobContainerBtn.classList.add("mobContainerBtnRed");
	}

	const $mobimage = document.createElement("img");
	$mobimage.setAttribute("src", `${image}`);
	$divContainer.appendChild($mobimage);
	$mobimage.classList.add("mobimage");

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
	if (type == "neutral") {
		$hr.classList.add("mobContainerHrYellow");
	}
	if (type == "hostile") {
		$hr.classList.add("mobContainerHrRed");
	}

	const $mobContainerBtn2 = document.createElement("button");
	$mobContainerBtn2.classList.add("mobContainerBtn");
	$divContainer.appendChild($mobContainerBtn2);
	if (type == "neutral") {
		$mobContainerBtn2.classList.add("mobContainerBtnYellow");
	}
	if (type == "hostile") {
		$mobContainerBtn2.classList.add("mobContainerBtnRed");
	}

	const $mobContainerBtnA = document.createElement("a");
	$mobContainerBtnA.classList.add("mobContainerBtnA");
	$mobContainerBtnA.textContent = "SEE MORE";
	$mobContainerBtn2.appendChild($mobContainerBtnA);
	$mobContainerBtn2.addEventListener("click", () => {
		localStorage.setItem("name", name);
		window.location.href = "../html/details.html";
	});
	$botPage.appendChild($divContainer);
}
