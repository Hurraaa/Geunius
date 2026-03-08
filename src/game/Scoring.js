/**
 * Scoring system - calculates stars based on ink usage.
 */
export class Scoring {
  /**
   * Calculate star rating (1-3) based on ink used.
   * @param {number} usedInk - How much ink was used
   * @param {object} thresholds - { one, two, three } max ink for each star
   * @returns {number} 1, 2 or 3 stars
   */
  static calculate(usedInk, thresholds) {
    if (usedInk <= thresholds.three) return 3;
    if (usedInk <= thresholds.two) return 2;
    return 1;
  }
}
