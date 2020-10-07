'use strict';

(function () {
  const MIN_NUMBER_WIZARD = 4;
  const FIRST_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
  const SECOND_NAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
  const COAT_COLOR = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
  const EYES_COLOR = [`black`, `red`, `blue`, `yellow`, `green`];
  const FIREBALL_COLOR = [`black`, `red`, `blue`, `yellow`, `green`];

  const setup = document.querySelector(`.setup`);
  const setupSimilar = setup.querySelector(`.setup-similar`);
  const wizardElements = {
    coat: {
      elem: setup.querySelector(`.wizard-coat`),
      input: setup.querySelector(`input[name = "coat-color"]`)
    },
    eyes: {
      elem: setup.querySelector(`.wizard-eyes`),
      input: setup.querySelector(`input[name = "eyes-color"]`)
    },
    fireball: {
      elem: setup.querySelector(`.setup-fireball-wrap`),
      input: setup.querySelector(`input[name = "fireball-color"]`)
    }
  };
  const wizards = [];
  const similarListElement = setup.querySelector(`.setup-similar-list`);
  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);

  const getRandomElement = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  const getRandomWizard = () => {
    return {
      name: `${getRandomElement(FIRST_NAMES)} ${getRandomElement(SECOND_NAMES)}`,
      coatColor: getRandomElement(COAT_COLOR),
      eyesColor: getRandomElement(EYES_COLOR)
    };
  };

  const getWizardsList = () => {
    for (let i = 0; i < MIN_NUMBER_WIZARD; i++) {
      wizards.push(getRandomWizard());
    }
    return wizards;
  };

  getWizardsList();

  const renderWizard = (wizard) => {
    const wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardElement.querySelector(`.wizard-coat`).style = `fill: ${wizard.coatColor}`;
    wizardElement.querySelector(`.wizard-eyes`).style = `fill: ${wizard.eyesColor}`;
    return wizardElement;
  };

  const getContent = (render, arr) => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < arr.length; i++) {
      fragment.appendChild(render(arr[i]));
    }

    similarListElement.appendChild(fragment);
  };

  getContent(renderWizard, wizards);

  setupSimilar.classList.remove(`hidden`);

  // Events
  const setupOpen = document.querySelector(`.setup-open`);
  const setupClose = setup.querySelector(`.setup-close`);
  const setupUserName = setup.querySelector(`.setup-user-name`);

  const onPopupEscPress = (evt) => {
    if (evt.keyCode === 27 && setupUserName !== document.activeElement) {
      setup.classList.add(`hidden`);
    }
  };

  const openPopup = () => {
    setup.classList.remove(`hidden`);
    document.addEventListener(`keydown`, onPopupEscPress);
    changeColor(wizardElements.coat, COAT_COLOR, `fill`);
    changeColor(wizardElements.eyes, EYES_COLOR, `fill`);
    changeColor(wizardElements.fireball, FIREBALL_COLOR, `background`);
  };

  const closePopup = () => {
    setup.classList.add(`hidden`);
    document.removeEventListener(`keydown`, onPopupEscPress);
  };

  setupOpen.addEventListener(`click`, function () {
    openPopup();
  });

  setupOpen.addEventListener(`keydown`, function (evt) {
    if (evt.keyCode === 13) {
      evt.preventDefault();
      openPopup();
    }
  });

  setupClose.addEventListener(`click`, function () {
    closePopup();
  });

  setupClose.addEventListener(`keydown`, function (evt) {
    if (evt.keyCode === 13) {
      evt.preventDefault();
      closePopup();
    }
  });

  const changeColor = (obj, arr, property) => {
    obj.elem.addEventListener(`click`, function () {
      const color = getRandomElement(arr);
      const input = obj.input;
      obj.elem.style = `${property}: ${color}`;
      input.value = `${color}`;
    });
  };
})();
