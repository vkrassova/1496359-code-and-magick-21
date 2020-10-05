'use strict';

(function () {
  const FIRST_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
  const SECOND_NAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
  const COAT_COLOR = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
  const FIREBALL_WRAP = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  const EYES_COLOR = [`black`, `red`, `blue`, `yellow`, `green`];

  const userDialog = document.querySelector(`.setup`);
  userDialog.classList.remove(`hidden`);

  const similarListElement = userDialog.querySelector(`.setup-similar-list`);

  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);

  const getRandomProperty = (array) => {
    return array[Math.floor(array.length * Math.random())];
  };

  const getWizard = () => {
    return {
      name: `${getRandomProperty(FIRST_NAMES)} ${getRandomProperty(SECOND_NAMES)}`,
      coatColor: getRandomProperty(COAT_COLOR),
      eyesColor: getRandomProperty(EYES_COLOR)
    };
  };

  const wizards = [];

  while (wizards.length < 4) {
    wizards.push(getWizard());
  }

  const getRenderWizard = (wizard) => {
    const wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
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
