# פורטל ביטוח סיעודי - רשות שוק ההון

## 📁 מבנה הפרויקט

```
ltc-portal/
│
├── index.html                 # דף הבית הראשי
├── README.md                  # תיעוד הפרויקט
│
├── assets/                    # כל הנכסים הסטטיים
│   ├── css/
│   │   ├── main.css          # קובץ CSS ראשי
│   │   ├── utilities/        # כלי עזר וסגנונות בסיסיים
│   │   │   ├── variables.css # משתנים גלובליים
│   │   │   ├── reset.css     # איפוס סגנונות דפדפן
│   │   │   ├── typography.css# טיפוגרפיה
│   │   │   └── helpers.css   # מחלקות עזר
│   │   ├── layouts/          # פריסות עמוד
│   │   │   ├── header.css    # סגנונות Header
│   │   │   ├── footer.css    # סגנונות Footer
│   │   │   ├── sidebar.css   # סגנונות Sidebar
│   │   │   └── grid.css      # מערכת Grid
│   │   ├── components/       # רכיבים לשימוש חוזר
│   │   │   ├── buttons.css   # כפתורים
│   │   │   ├── cards.css     # כרטיסים
│   │   │   ├── forms.css     # טפסים
│   │   │   ├── modals.css    # חלונות מודאל
│   │   │   ├── tables.css    # טבלאות
│   │   │   ├── charts.css    # גרפים
│   │   │   └── navigation.css# ניווט
│   │   └── pages/            # סגנונות ספציפיים לדפים
│   │       ├── home.css      # עמוד הבית
│   │       ├── market.css    # מצב השוק
│   │       ├── reform.css    # הרפורמה
│   │       ├── tools.css     # כלים
│   │       └── knowledge.css # מרכז ידע
│   │
│   ├── js/
│   │   ├── main.js           # קובץ JS ראשי
│   │   ├── utils/            # פונקציות עזר
│   │   │   ├── constants.js  # קבועים
│   │   │   ├── helpers.js    # פונקציות עזר
│   │   │   └── api.js        # ממשק API
│   │   ├── components/       # רכיבי JS
│   │   │   ├── navigation.js # לוגיקת ניווט
│   │   │   ├── search.js     # חיפוש
│   │   │   ├── charts.js     # גרפים
│   │   │   ├── calculator.js # מחשבונים
│   │   │   ├── forms.js      # טפסים
│   │   │   └── modals.js     # מודאלים
│   │   ├── pages/            # לוגיקה ספציפית לדפים
│   │   │   ├── home.js       # עמוד הבית
│   │   │   ├── market.js     # מצב השוק
│   │   │   ├── reform.js     # הרפורמה
│   │   │   ├── trees.js      # עצי החלטות
│   │   │   └── tools.js      # כלים
│   │   └── services/         # שירותים
│   │       ├── data.js       # ניהול נתונים
│   │       ├── storage.js    # אחסון מקומי
│   │       └── analytics.js  # אנליטיקס
│   │
│   ├── images/
│   │   ├── logos/            # לוגואים
│   │   ├── icons/            # אייקונים
│   │   ├── backgrounds/      # תמונות רקע
│   │   └── content/          # תמונות תוכן
│   │
│   └── fonts/                # גופנים מותאמים
│
├── pages/                     # דפי HTML
│   ├── market-status/        # מצב השוק
│   │   ├── index.html
│   │   ├── statistics.html
│   │   ├── problems.html
│   │   ├── international.html
│   │   └── products.html
│   │
│   ├── reform/               # הרפורמה
│   │   ├── index.html
│   │   ├── new-model.html
│   │   ├── structure.html
│   │   ├── actuarial.html
│   │   ├── legal.html
│   │   ├── commissions.html
│   │   ├── timeline.html
│   │   └── impact.html
│   │
│   ├── trees/                # עצי החלטות
│   │   ├── index.html
│   │   ├── consumer.html
│   │   ├── regulator.html
│   │   ├── insurer.html
│   │   └── simulator.html
│   │
│   ├── tools/                # כלים ומחשבונים
│   │   ├── index.html
│   │   ├── premium-calc.html
│   │   ├── tax-calc.html
│   │   ├── comparison.html
│   │   └── risk-assessment.html
│   │
│   └── knowledge/            # מרכז ידע
│       ├── index.html
│       ├── documents.html
│       ├── legislation.html
│       ├── research.html
│       ├── faq.html
│       ├── glossary.html
│       └── history.html
│
├── data/                      # קבצי נתונים
│   ├── statistics.json       # נתונים סטטיסטיים
│   ├── products.json         # מוצרים
│   ├── timeline.json         # לוח זמנים
│   └── glossary.json         # מילון מונחים
│
└── docs/                      # תיעוד
    ├── setup.md              # הוראות התקנה
    ├── development.md        # מדריך פיתוח
    └── api.md                # תיעוד API

```

## 🚀 התחלה מהירה

1. **פתח את `index.html`** בדפדפן
2. **נווט בין הדפים** דרך התפריט הראשי
3. **השתמש בכלים** המובנים באתר

## 📋 דפים עיקריים

### דף הבית
- סקירה כללית של הפורטל
- גישה מהירה לנושאים מרכזיים
- עדכונים אחרונים

### מצב השוק
- נתונים סטטיסטיים עדכניים
- ניתוח בעיות וכשלים
- השוואות בינלאומיות

### הרפורמה המוצעת
- פרטי המודל החדש
- לוח זמנים ליישום
- השפעות צפויות

### עצי החלטות
- כלים אינטראקטיביים לקבלת החלטות
- סימולטורים למצבים שונים

### כלים ומחשבונים
- מחשבון פרמיה
- מחשבון החזר מס
- כלי השוואה

### מרכז ידע
- מסמכי מדיניות
- חקיקה ורגולציה
- שאלות נפוצות

## 🎨 עקרונות עיצוב

- **צבעי מותג**: כחול (#2563eb) וציאן (#0ea5e9)
- **טיפוגרפיה**: Heebo (Google Fonts)
- **רספונסיביות**: מותאם לכל המכשירים
- **נגישות**: תומך בתקני WCAG 2.1

## 🛠️ טכנולוגיות

- **HTML5** - מבנה סמנטי
- **CSS3** - עיצוב מודרני עם CSS Variables
- **Vanilla JavaScript** - ללא תלות בספריות חיצוניות
- **Chart.js** - לתצוגת גרפים (אופציונלי)

## 📱 תמיכה בדפדפנים

- Chrome/Edge (90+)
- Firefox (88+)
- Safari (14+)
- Mobile browsers

## 📞 יצירת קשר

רשות שוק ההון, ביטוח וחיסכון
- טלפון: 1-222-3334
- דוא"ל: info@mof.gov.il

---
© 2025 רשות שוק ההון, ביטוח וחיסכון. כל הזכויות שמורות.