import IMask from 'imask'

document.addEventListener('DOMContentLoaded', () => {

	const fileGroup = document.querySelectorAll('.form-file-label');
	const forms = document.querySelectorAll('form');
	const phones = document.querySelectorAll('.phone-mask');
	const openMobMenuBtn = document.querySelector('.header-menu-btn');
	const closeMobMenuBtn = document.querySelector('.mob-menu-close');
	const mobMenu = document.querySelector('.header-menu');
	const timeSelect = document.querySelectorAll('.callback-fixed-time-item');

	function getCurrentInnerHeight () {
		const vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	}

	getCurrentInnerHeight();

	window.addEventListener('resize', getCurrentInnerHeight);

	fileGroup.forEach(file => {
		const input = file.querySelector('input');
		const visibleTitle = file.querySelector('.form-file-name');

		input.addEventListener('change', e => {
			const uploadedFile = e.target.files[0];
			visibleTitle.innerText = uploadedFile.name;
		})
	});
	
	forms.forEach(form => {
		form.addEventListener('submit', e => {
			e.preventDefault();
			e.stopPropagation();
			
			const requiredFields = form.querySelectorAll('.is-required');
			const success = form.querySelector('.form-success');
			let canSubmit = true;
			
			requiredFields.forEach(field => {
				const isCheckbox = field.getAttribute('type') === 'checkbox';
				const value = field.value;
				
				if (isCheckbox) {
					if (!field.checked) {
						canSubmit = false;
						field.classList.add('invalid');
					}
				} else {
					if (value.trim().length === 0) {
						canSubmit = false;
						field.classList.add('invalid');
					}
				}

				if (field.classList.contains('invalid')) {
					setTimeout(() => {
						field.classList.remove('invalid');
					}, 3000)
				}
			})
			
			if (canSubmit && success) {
				success.classList.add('opened');
				setTimeout(() => {
					success.classList.remove('opened');
				}, 1500)
			}
		})
	});

	phones.forEach(phone => {
		IMask(phone, {
			mask: '+{34} 00 000 00 00'
		});
	});
	
	if (openMobMenuBtn) {
		openMobMenuBtn.addEventListener('click', e => {
			e.preventDefault();
			mobMenu.classList.add('opened');
		});
	}

	if (closeMobMenuBtn) {
		closeMobMenuBtn.addEventListener('click', e => {
			e.preventDefault();
			mobMenu.classList.remove('opened');
		});
	}
	
	document.addEventListener('click', e => {
		const tg = e.target;
		
		if (!tg.closest('.header-menu') && !tg.closest('.header-menu-btn')) {
			mobMenu.classList.remove('opened');
		}
	});

	const socCallback = document.querySelector('.soc-callback');
	
	if (socCallback) {
		const socCallbackOpenBtn = socCallback.querySelector('.soc-callback-button');
		const socCallbackCloseBtn = socCallback.querySelector('.soc-callback-close');

		socCallbackOpenBtn.addEventListener('click', () => {
			socCallback.classList.add('opened');
		})

		socCallbackCloseBtn.addEventListener('click', () => {
			socCallback.classList.remove('opened');
		})
	}

	timeSelect.forEach(timeSelectParent => {
		const timeSelectInput = timeSelectParent.querySelector('.callback-fixed-time-item-select');
		const timeSelectInputOptions = timeSelectInput.querySelectorAll('option');
		const timeSelectedElement = timeSelectParent.querySelector('.callback-fixed-time-item-selected');
		const timeSelectedDropdown = timeSelectParent.querySelector('.callback-fixed-time-item-dropdown');
		const timeSelectedDropdownList = timeSelectedDropdown.querySelector('ul');

		timeSelectedElement.innerHTML = timeSelectInput.value;

		timeSelectInput.addEventListener('change', e => {
			const val = e.target.value;
			timeSelectedElement.innerHTML = val;
		})

		timeSelectInputOptions.forEach(option => {
			const listItem = document.createElement('li');
			const optionValue = option.value;

			listItem.dataset.value = optionValue;
			listItem.innerText = optionValue;

			timeSelectedDropdownList.append(listItem);

			listItem.addEventListener('click', () => {
				const listItems = timeSelectedDropdownList.querySelectorAll('li');
				const value = listItem.getAttribute('data-value');
				
				listItems.forEach(listItemsElement => {
					listItemsElement.classList.remove('active');
					listItem.classList.add('active');
					timeSelectInput.value = value;
					timeSelectInput.dispatchEvent(new Event('change'));
				});
			});
		});
	});

});
