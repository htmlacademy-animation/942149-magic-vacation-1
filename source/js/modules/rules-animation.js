export default () => {
  let screenRules = document.querySelector(`.screen--rules`);
  let lastRule = screenRules.querySelector(`.rules__list .rules__item:last-child`);
  lastRule.addEventListener(`transitionend`, function (evt) {
    evt.stopPropagation();
    screenRules.classList.add(`rules-animated`);
  })
};
