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