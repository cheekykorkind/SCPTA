/* 그래프에 쓰이는 데이터의 구조는
 * Array(
 *   Array(
 *    {"x": 값, "y": 값}
 *   )
 * )
 * 형태이다.
 */
export const valueSourceCover = new Array();
export const valueSource = new Array();
  valueSourceCover[0] = valueSource;
    for(let i = 0; i<30; i++){
      valueSource.push({
        "x": i,
        "y": i*12
      });
    }
