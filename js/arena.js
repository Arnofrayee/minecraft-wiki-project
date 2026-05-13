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

document.addEventListener("DOMContentLoaded", async () => {
	console.log("loaded");
	const requestselect = await fetch("http://10.69.4.208:3000/v1/entities");
	const requestselectjson = await requestselect.json();

	for (let i = 0; i < requestselectjson.length; i++) {
		createOptionMob(requestselectjson[i].name, requestselectjson[i].id);
	}

	fetchTr();
	checkArena();
	interval();
});

//Create all options
const $selectEntity = document.querySelector("#entity");

function createOptionMob(name, id) {
	const $option = document.createElement("option");
	$option.value = id;
	$option.textContent = name;
	$selectEntity.appendChild($option);
}
const $tbody = document.querySelector("tbody");

async function fetchTr() {
	const request = await fetch("http://10.69.4.208:3000/v1/arena/entities");
	const requestjson = await request.json();

	$tbody.innerHTML = "";

	for (let i = 0; i < requestjson.length; i++) {
		createMobTr(
			requestjson[i].id,
			requestjson[i].entity.icon,
			requestjson[i].entity.name,
			requestjson[i].x,
			requestjson[i].z,
			requestjson[i].entity.strength,
		);
	}
}

//Spawn mobs in the table
const $table = document.querySelector("table");
let onetwo = "white";

function createMobTr(id, icon, name, x, z, strength) {

	const $tr = document.createElement("tr");
	$tr.classList.add("rows");
	if (onetwo == "white") {
		$tr.style.backgroundColor = "#FFFFFF";
		onetwo = "grey"
	} else {
		$tr.style.backgroundColor = "#F4F4F4";
		onetwo = "white"
	}

	const $td1 = document.createElement("td");
	const $img = document.createElement("img");
	$img.setAttribute("src", icon);
	$td1.appendChild($img);
	$tr.appendChild($td1);

	const $td2 = document.createElement("td");
	$td2.textContent = name;
	$tr.appendChild($td2);

	const $td3 = document.createElement("td");
	$td3.textContent = x;
	$tr.appendChild($td3);

	const $td4 = document.createElement("td");
	$td4.textContent = z;
	$tr.appendChild($td4);

	const $td5 = document.createElement("td");
	$td5.textContent = strength;
	$tr.appendChild($td5);

	const $td6 = document.createElement("td");
	const $btn = document.createElement("button");
	$btn.classList.add("btntd");
	$btn.textContent = "DELETE";
	$td6.appendChild($btn);
	$tr.appendChild($td6);

	$btn.addEventListener("click", async () => {
		const request = await fetch(
			`http://10.69.4.208:3000/v1/arena/entities/${id}`,
			{ method: "DELETE" },
		);
		$tr.remove();
	});

	$tbody.appendChild($tr);
}

//Form and post elements
const $form = document.querySelector("form");

$form.addEventListener("submit", async (e) => {
	e.preventDefault();
	const formdata = new FormData($form);
	const request = await fetch("http://10.69.4.208:3000/v1/arena/entities", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			entityId: parseInt(formdata.get("select")),
			x: parseInt(formdata.get("xCoo")),
			z: parseInt(formdata.get("zCoo")),
		}),
	});
	const response = request.json();
	console.log("submited");
});

//Openned arena or closed arena

const $openClose = document.querySelector(".status");
const $xCoo = document.querySelector("#xCoo");
const $zCoo = document.querySelector("#zCoo");
const $spawnbutton = document.querySelector(".spawnButton");

async function checkArena() {
	const request = await fetch("http://10.69.4.208:3000/v1/arena");
	const response = await request.json();

	if (response.status == "open") {
		$openClose.classList.remove("closedArena");
		$openClose.textContent = "OPEN";
		$selectEntity.classList.remove("noSpawn");
		$selectEntity.removeAttribute("disabled");
		$xCoo.classList.remove("noSpawn");
		$xCoo.removeAttribute("disabled");
		$zCoo.classList.remove("noSpawn");
		$zCoo.removeAttribute("disabled");
		$spawnbutton.classList.remove("noSpawn");
	} else {
		$openClose.classList.add("closedArena");
		$openClose.textContent = "CLOSE";
		$selectEntity.classList.add("noSpawn");
		$selectEntity.setAttribute("disabled", "true");
		$xCoo.classList.add("noSpawn");
		$xCoo.setAttribute("disabled", "true");
		$zCoo.classList.add("noSpawn");
		$zCoo.setAttribute("disabled", "true");
		$spawnbutton.classList.add("noSpawn");
	}
}

let timerInterval;

function interval() {
	timerInterval = setInterval(() => {
		checkArena();
		fetchTr();
	}, 10000);
}
