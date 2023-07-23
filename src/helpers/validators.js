/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

import {__, allPass, any, compose, complement, countBy, dissoc, equals, identity, gte, prop, propEq, values} from 'ramda';


const gte2 = gte(__, 2);
const gte3 = gte(__, 3);
const anyGte3 = any(gte3);
const anyValueGte3 = compose(anyGte3, values);
const numOfColors = compose(countBy(identity), values);

const isRed = equals('red');
const isGreen = equals('green');
const isWhite = equals('white');
const isBlue = equals('blue');
const isOrange = equals('orange');
const dissocWhite = dissoc('white');
const greenEq2 = propEq('green', 2);
const greenColorsEq2 = compose(greenEq2, numOfColors);
const redEq1 = propEq('red', 1);
const redColorsEq1 = compose(redEq1, numOfColors);

const getStarShape = prop('star');
const getTriangleShape = prop('triangle');
const getSquareShape = prop('square');
const getCircleShape = prop('circle');

const isRedStar = compose(isRed, getStarShape);
const isGreenSquare = compose(isGreen, getSquareShape);
const isGreenTriangle = compose(isGreen, getTriangleShape);
const isGreenCircle = compose(isGreen, getCircleShape);
const isGreenStar = compose(isGreen, getStarShape);
const isWhiteCircle = compose(isWhite, getCircleShape);
const isWhiteTriangle = compose(isWhite, getTriangleShape);
const isNotWhiteTriangle = complement(isWhiteTriangle);
const isBlueCircle = compose(isBlue, getCircleShape);
const isOrangeSquare = compose(isOrange, getSquareShape);
const isOrangeTriangle = compose(isOrange, getTriangleShape);
const isOrangeCircle = compose(isOrange, getCircleShape);
const isOrangeStar = compose(isOrange, getStarShape);
const getGreen = prop('green');
const isWhiteStar = compose(isWhite, getStarShape);
const isNotRedStar = complement(isRedStar);
const isNotWhiteStar = complement(isWhiteStar);
const isWhiteSquare = compose(isWhite, getSquareShape);
const isNotWhiteSquare = complement(isWhiteSquare);
const numOfGreenColors = compose(getGreen, numOfColors);
const numOfColorsWhitoutWhite = compose(dissocWhite, numOfColors);
const squareColorEqualsTriangleColor = ({square, triangle}) => square === triangle;
const redAmountEqualsBlueAmount = ({blue, red}) => blue === red;


// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([isRedStar, isGreenSquare, isWhiteTriangle, isWhiteCircle]);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = compose(gte2, numOfGreenColors);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = compose(redAmountEqualsBlueAmount, numOfColors);

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([isBlueCircle, isRedStar, isOrangeSquare]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = compose(anyValueGte3, numOfColorsWhitoutWhite);

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = allPass([greenColorsEq2, isGreenTriangle, redColorsEq1]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = allPass([isOrangeSquare, isOrangeTriangle, isOrangeCircle, isOrangeStar]);

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = allPass([isNotRedStar, isNotWhiteStar]);

// 9. Все фигуры зеленые.
export const validateFieldN9 = allPass([isGreenSquare, isGreenTriangle, isGreenCircle, isGreenStar]);

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = allPass([isNotWhiteSquare, isNotWhiteTriangle, squareColorEqualsTriangleColor]);
