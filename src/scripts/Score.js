export default class Score {
  // בנאי עם פרמטרים ברירת מחדל
  constructor(ctx, scaleRatio, highScoreKey = "highScore") {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.scaleRatio = scaleRatio;
    this.highScoreKey = highScoreKey;
    this.score = 0;
  }

  // עדכון הניקוד בהתבסס על דלתת זמן המסגרת
  update(frameTimeDelta) {
    this.score += frameTimeDelta * 0.01;
  }

  // איפוס הניקוד לאפס
  reset() {
    this.score = 0;
  }

  // הגדרת הניקוד הגבוה בזיכרון המקומי
  setHighScore() {
    const highScore = this.getHighScore();

    if (this.score > highScore || isNaN(highScore)) {
      localStorage.setItem(this.highScoreKey, Math.floor(this.score));
    }
  }

  // קבלת הניקוד הגבוה מזיכרון המקומי
  getHighScore() {
    return Number(localStorage.getItem(this.highScoreKey)) || 0;
  }

  // ציור הניקוד הנוכחי והניקוד הגבוה על הקנבס
  draw() {
    // חישוב המיקום וגודל הגופן בהתבסס על יחס הגודל
    const y = 20 * this.scaleRatio;
    const fontSize = 20 * this.scaleRatio;
    this.ctx.font = `bold ${fontSize}px Arial`;
    this.ctx.fillStyle = "#333";

    // מיקום הניקוד והניקוד הגבוה
    const scoreX = this.canvas.width - 75 * this.scaleRatio;
    const highScoreX = scoreX - 125 * this.scaleRatio;

    // הוספת אפסים מובילים לניקוד והניקוד הגבוה
    const scorePadded = Math.floor(this.score).toString().padStart(6, 0);
    const highScorePadded = this.getHighScore().toString().padStart(6, 0);

    // ציור הניקוד והניקוד הגבוה על הקנבס
    this.ctx.fillText(scorePadded, scoreX, y);
    this.ctx.fillText(`HI ${highScorePadded}`, highScoreX, y);
  }
}
