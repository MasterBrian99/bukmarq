/* eslint-disable no-console */
const title = 'Welcome ';

/**
 * @description
 * This utility is used to generate random numbers between 0 and 255
 * @example
 * getRandomRGBNumber();
 * @returns {number}
 * @since 1.0.0
 * @version 1.0.0
 *
 */
function getRandomRGBNumber(): number {
  return Math.floor(Math.random() * 256);
}

/**
 * @description
 * This utility is used to generate random colors in rgb format and their inverted colors
 * @example
 * getRandomColor();
 * @returns {string[]}
 * @since 1.0.0
 * @version 1.0.0
 * @see
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/API/console)
 */
function getRandomColor(): string[] {
  const r = getRandomRGBNumber();
  const g = getRandomRGBNumber();
  const b = getRandomRGBNumber();

  return [`rgb(${r}, ${g}, ${b})`, `rgb(${255 - r}, ${255 - g}, ${255 - b})`];
}

// create jsdoc

/**
 * @description
 * This utility is used to welcome users in the console
 * @example
 * welcome();
 * @returns {void}
 * @since 1.0.0
 * @version 1.0.0
 * @see
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/API/console)
 * [Stackoverflow](https://stackoverflow.com/questions/7505623/colors-in-javascript-console)
 * [Stackoverflow](https://stackoverflow.com/questions/1484506/random-color-generator)
 *
 */
function welcome(): void {
  const [color, invertedColor] = getRandomColor();

  const styles = [
    'font-size: 20px',
    `color: ${color}`,
    `border: 1px solid ${invertedColor}`,
    `background-color: ${invertedColor}`,
    'border-radius: 5px',
    'padding: 10px',
  ].join(';');

  console.log(`%c=== ${title} ===`, styles);
}

export default welcome;
