export default class Cactus {
  constructor(ctx, x, y, width, height, image) {
    this.ctx = ctx; // הקשר לקנווס
    this.x = x; // נקודת התחלה בציר X
    this.y = y; // נקודת התחלה בציר Y
    this.width = width; // רוחב הקקטוס
    this.height = height; // גובה הקקטוס
    this.image = image; // התמונה של הקקטוס
  }

  // עדכון מיקום הקקטוס במשחק
  update(speed, gameSpeed, frameTimeDelta, scaleRatio) {
    this.x -= speed * gameSpeed * frameTimeDelta * scaleRatio; // עדכון מיקום הקקטוס על פי מהירות המשחק
  }

  // ציור הקקטוס על הקנווס
  draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  // בדיקת התנגשות עם עצם אחר במשחק
  collideWith(sprite) {
    const adjustBy = 1.4;
    // בדיקת התנגשות בין הקקטוס והעצם הנתון
    if (
      sprite.x < this.x + this.width / adjustBy &&
      sprite.x + sprite.width / adjustBy > this.x &&
      sprite.y < this.y + this.height / adjustBy &&
      sprite.height + sprite.y / adjustBy > this.y
    ) {
      return true; // התנגשות
    } else {
      return false; // אין התנגשות
    }
  }
}
