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