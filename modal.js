//
// VARIABLES
//

let modal = {
  container: document.getElementById('global-modal'),
  exit: document.getElementById('global-modal__exit'),
  overlay: document.getElementById('modal-overlay')
}

//
//FUNCTION(S)
//

/** ACCESSIBLE MODAL
 * 
 * // based off of tips/code in https://youtu.be/JS68faEUduk
 * // (a11y casts with Rob Dodson)
 * 
 * Inits click events to handle modal popup
 * - modal opens after time specified by param
 * - keyboard also locked in
 * - can exit via escape key or click event
 *
 * @param exitButton {Elem} - Element that, when clicked, should close the modal
 * @param modal {Elem} - The modal display element
 * @param bodyOverlay {String} - Name of the class applied to an overlay div (overlay style controlled by CSS)
 *
 * TIP: HTML for div should include a container marked up as follows to correctly alert all users:
 * <div id="global-modal" class="global-modal" role="alertdialog" aria-labelledby="global-modal__title">
 *   <!-- MODAL CONTENT, WHICH SHOULD INCLUDE: -->
 *   <h2 id="global-modal-title"><!-- Title here --></h2>
 * </div>
 */

var initModal = function(exitButton, modal, bodyOverlay) {

	//set keycodes for keyboard management
	var KEYCODE = {
		ESC: 27,
		TAB: 9,
		SHIFT: 16,
		ENTER: 13
	}

	//find focuseable elemets for focus management
	var elFocusable = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), object, embed, *[contenteditable]",
    	modalFocusableNodes = modal.querySelectorAll(elFocusable),
		modalFocusable = Array.prototype.slice.call(modalFocusableNodes);

		let firstFocusableEl = modalFocusable[0];
    let lastFocusableEl = modalFocusable[ modalFocusable.length - 1 ];
    let previousActiveElement;

	var openModal = function() {
		previousActiveElement = document.activeElement;
		modal.classList.add(modal.id + '--active');
		bodyOverlay.classList.add(bodyOverlay.id + '--active');

		firstFocusableEl.focus();

		createExitListener();
		activateKeyCheck();
	}

	initModal.openModal = openModal;

	var createExitListener = function() {
		exitButton.addEventListener('click', closeModal);
		document.addEventListener('keydown', function(e) {
		  if (e.which === KEYCODE.ESC) {
			closeModal();
		  }
		})
	  }


	var activateKeyCheck = function() {
		document.addEventListener('keydown', function(e) {
		if (e.which == KEYCODE.TAB) {
		var currentFocus = document.activeElement,
			modalFocusableNum = modalFocusable.length,
			focusedIndex = modalFocusable.indexOf(currentFocus);
			if (e.shiftKey) {
				if (focusedIndex === 0) {
					modalFocusable[(modalFocusableNum - 1)].focus();
					e.preventDefault();
				}
				} else {
				if (focusedIndex == modalFocusableNum - 1) {
					modalFocusable[0].focus();
					e.preventDefault();
				}
			}
		}
		})
	}

	var closeModal = function() {
		bodyOverlay.classList.remove(bodyOverlay.id + '--active');
		modal.classList.remove(modal.id + '--active');
		previousActiveElement.focus();
	}

	bodyOverlay.addEventListener('click', closeModal);
}


//
// APPLY
//

initModal(modal.exit, modal.container, modal.overlay);

//
// OPTIONAL TIME DELAY POPUP
// if you would like this modal to be user-activated only (instead of time-activated), remove the timer and 	'role="alertdialog"' from the HTML. 
//

document.addEventListener("DOMContentLoaded", function(e) {
  setTimeout(initModal.openModal, 5000);
});
