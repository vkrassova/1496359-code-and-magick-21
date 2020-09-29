'use strict';

(function () {
  const FIRST_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
  const SECOND_NAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
  const COAT_COLOR = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
  const EYES_COLOR = [`black`, `red`, `blue`, `yellow`, `green`];

  const userDialog = document.querySelector(`.setup`);
  userDialog.classList.remove(`hidden`);

  const similarListElement = userDialog.querySelector(`.setup-similar-list`);

  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);

  const wizards = [];

  for (let i = 0; i < 4; i++) {
    const wizardCreate = {
      firstName: FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)],
      lastName: SECOND_NAMES[Math.floor(Math.random() * SECOND_NAMES.length)],
      coatColor: COAT_COLOR[Math.floor(Math.random() * COAT_COLOR.length)],
      eyesColor: EYES_COLOR[Math.floor(Math.random() * EYES_COLOR.length)]
    };

    wizards.push(wizardCreate);
  }

  const getRenderWizard = (wizard) => {
    const wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.firstName + wizard.lastName;
    wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;
    wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
    return wizardElement;
  };

  const fragment = document.createDocumentFragment();

  for (let wizard of wizards) {
    fragment.appendChild(getRenderWizard(wizard));
  }

  similarListElement.appendChild(fragment);

  userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);

})();
