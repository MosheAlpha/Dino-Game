// קובץ זה מכיל את ההגדרות של המשחק

// הגדרות של המשחק
const GAME_CONFIG = {
    CACTUS_INTERVAL_MIN: 500,
    CACTUS_INTERVAL_MAX: 2000,

    //צבע רקע של המשחק
    SCREEN_COLOR: "white",

    // מהירות התחלתית של המשחק
    GAME_SPEED_START: 1,

    // עליית המהירות של הדינוזאור
    GAME_SPEED_INCREMENT: 0.00001,

    // רוחב שטח המשחק
    GAME_WIDTH: 800,

    // גובה שטח המשחק
    GAME_HEIGHT: 200,

    // יחס הרוחב של השחקן לגודלו המקורי
    PLAYER_WIDTH_RATIO: 88 / 1.5,

    // יחס הגובה של השחקן לגודלו המקורי
    PLAYER_HEIGHT_RATIO: 94 / 1.5,

    // יחס הגובה המרבי של הקפיצה לגובה המשחק
    MAX_JUMP_HEIGHT_RATIO: 1,

    // יחס הגובה המינימלי של הקפיצה לגובה המשחק
    MIN_JUMP_HEIGHT_RATIO: 150 / 200,

    // רוחב הקרקע יחסית לרוחב המשחק
    GROUND_WIDTH_RATIO: 2400 / 800,

    // גובה הקרקע יחסית לגובה המשחק
    GROUND_HEIGHT_RATIO: 24 / 200,

    // מהירות תנועת הקרקע והקקטוסים
    GROUND_AND_CACTUS_SPEED: 0.5,

    // הגדרות לסוגי קקטוסים שונים
    CACTI_CONFIG: [
        { widthRatio: 48 / 1.5, heightRatio: 100 / 1.5, image: "src/images/cactus_1.png" },
        { widthRatio: 98 / 1.5, heightRatio: 100 / 1.5, image: "src/images/cactus_2.png" },
        { widthRatio: 68 / 1.5, heightRatio: 70 / 1.5, image: "src/images/cactus_3.png" }
    ],
};

// הגדרות התמונות במשחק
const imageSettings = {
    dino1ImageSrc: "src/images/dino_run1.png", // תשנו את זה לתמונה שלכם
    dino2ImageSrc: "src/images/dino_run2.png", // תשנו את זה לתמונה שלכם
    dinoJumpImageSrc: "src/images/standing_still.png", // תשנו את זה לתמונה שלכם
};


export { GAME_CONFIG, imageSettings };
