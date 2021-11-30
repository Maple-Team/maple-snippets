/**
 * Match Chinese Characters
 * https://stackoverflow.com/a/21113538
 * @param str
 * @returns
 */
export function chineseRegexp(str: string): boolean {
  return /[\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]/.test(
    str
  );
}
/**
 * Match Chinese Characters
 * Unicode_Property_Escapes
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes
 * @param str
 * @returns
 */
export function matchChineseCharacter(str: string): boolean {
  return /\p{Script=Han}/u.test(str);
}
