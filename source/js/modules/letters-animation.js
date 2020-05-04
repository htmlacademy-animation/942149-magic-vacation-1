export default () => {
  class AccentTypographyBuild {
    constructor(
        elementSelector,
        timer,
        classForActivate,
        property,
        timeOffset,
        isLineByLine,
    ) {
      this._TIME_SPACE = 100;
      this._timeOffset = timeOffset;
      this._isLineByLine = isLineByLine;
      this._elementSelector = elementSelector;
      this._timer = timer;
      this._classForActivate = classForActivate;
      this._property = property;
      this._element = document.querySelector(this._elementSelector);
      this._letterIndex = 0;
      this._stringIndex = 0;

      this.prePareText();
    }

    createElement(letter) {
      const span = document.createElement(`span`);
      span.textContent = letter;
      span.classList.add(`text__letter`);
      let i = ``;
      if (this._letterIndex % 3 === 0) {
        i = 0;
      } else {
        if (this._letterIndex % 2 === 0) {
          i = 1;
        } else {
          i = 2;
        }
      }
      this._letterIndex += 1;
      span.style.transition = `${this._property} ${this._timer}ms ease ${this._timeOffset * i + this._stringIndex * this._isLineByLine}ms`;
      return span;
    }

    prePareText() {
      if (!this._element) {
        return;
      }

      let strings = this._element.textContent.split(`\n`);
      let textElement = this;
      let textBlock = ``;
      strings.forEach(function (el) {
        textBlock = textBlock + `<span class=text__string>` + el + `</span>`;
      });
      this._element.innerHTML = ``;
      this._element.innerHTML = textBlock;

      let childBlocks = this._element.querySelectorAll(`span.text__string`);

      childBlocks.forEach(function (child) {
        const text = child.textContent.trim().split(` `).filter((latter)=>latter !== ``);

        const content = text.reduce((fragmentParent, word) => {
          textElement._letterIndex = 1;

          const wordElement = Array.from(word).reduce((fragment, latter) => {
            fragment.appendChild(textElement.createElement(latter));
            return fragment;
          }, document.createDocumentFragment());
          const wordContainer = document.createElement(`span`);
          wordContainer.classList.add(`text__word`);
          wordContainer.appendChild(wordElement);
          fragmentParent.appendChild(wordContainer);
          textElement._stringIndex += 800;
          return fragmentParent;
        }, document.createDocumentFragment());

        child.innerHTML = ``;
        child.appendChild(content);
      });
    }

    runAnimation() {
      if (!this._element) {
        return;
      }
      this._element.classList.add(this._classForActivate);
    }

    destroyAnimation() {
      this._element.classList.remove(this._classForActivate);
    }
  }

  const animationTopScreenTextLine = new AccentTypographyBuild(`.intro__title`, 1000, `active`, `transform`, 150, 1);
  setTimeout(()=>{
    animationTopScreenTextLine.runAnimation();
  }, 500);
  const animationTopScreenDate = new AccentTypographyBuild(`.intro__date`, 1000, `active`, `transform`, 150, 0);
  setTimeout(()=>{
    animationTopScreenDate.runAnimation();
  }, 500);
};
