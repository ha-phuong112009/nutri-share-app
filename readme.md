# 🥗 NutriShare

**Simple meal planning and healthy habit tracking for everyday life.**


<h2 align="center">📱 App Demo</h2>

<p align="center">
  <img
    src="https://raw.githubusercontent.com/ha-phuong112009/nutri-share-app/main/demo.gif"
    alt="NutriShare App Demo"
    width="300"
  />
</p>


NutriShare is a mobile application designed to help people build healthier eating habits without requiring advanced nutrition knowledge. It focuses on practical meal suggestions, easy-to-understand health indicators, and lightweight daily tracking.

Built with **React Native (Expo)** and **Supabase**, NutriShare is intended for beginners, young adults, and busy individuals who want a more structured approach to everyday nutrition.

> **Project status:** In development. The features below describe the planned MVP scope and may not all be available yet.
>
> **Health disclaimer:** NutriShare provides general wellness information and estimates only. It is not a medical device and does not replace advice from qualified healthcare professionals.

## 🎯 The Problem

Building a consistent eating routine can be difficult, especially for people who are new to nutrition or exercise. Common challenges include:

- Uncertainty about what to eat based on personal characteristics and activity levels.
- Difficulty planning simple, balanced meals throughout the week.
- Lack of practical tools for maintaining consistent eating and hydration habits.
- Limited time to research nutrition or prepare complex meal plans.

**NutriShare's goal** is to make everyday nutrition planning more approachable, actionable, and sustainable.

## ✨ Planned MVP Features

### 1. Personal Profile & Health Indicators

- Record basic information: age, sex, height, weight, and activity level.
- View **Body Mass Index (BMI)** and an **estimated daily energy requirement**.
- Understand results through a clear, beginner-friendly interface.

*These calculations are approximate and are not intended for medical assessment.*

### 2. Meal Suggestions & Planning

- Browse sample **daily and weekly meal plans**.
- Explore meal plans organized around general goals, such as:
  - Healthy eating.
  - Weight maintenance.
  - Gradual weight loss.
- Discover simple dishes made with accessible ingredients.
- Choose practical meal ideas suited to busy schedules.

*The MVP provides general suggestions rather than clinical or highly personalized nutrition plans.*

### 3. Health & Nutrition Knowledge Library

- Read concise articles about healthy eating principles.
- Learn practical habits that support everyday well-being.
- Browse educational content by topic for easy discovery.

### 4. Habit & Progress Tracking

- Log meals at a basic level.
- Record weight changes over time.
- Track everyday habits, including water intake and regular meal times.
- Review history and simple progress charts.

### 5. Content Administration

A lightweight administration interface is planned to support:

- Managing educational articles.
- Creating and updating sample meal plans.
- Viewing limited user-related information needed for basic operations, subject to appropriate access controls.

The administration scope is intentionally minimal for the MVP.

## 🛠 Tech Stack

| Technology | Purpose |
| --- | --- |
| [React Native](https://reactnative.dev/) | Cross-platform mobile application development |
| [Expo](https://expo.dev/) | React Native development tooling and app runtime |
| [Supabase](https://supabase.com/) | Backend services and data persistence |
| [PostgreSQL](https://www.postgresql.org/) | Relational database provided through Supabase |

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) and npm.
- [Expo Go](https://expo.dev/go) on a compatible device, or an Android/iOS simulator.
- A [Supabase](https://supabase.com/) project configured for this application.

### 1. Install dependencies

From the project root, run:

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```dotenv
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Get these values from your Supabase project's dashboard. The application must be configured to read the same environment variable names.

> **Security:** `EXPO_PUBLIC_` variables are embedded in the client application. Never put Supabase **secret** or **service-role** keys in these variables. Use appropriate PostgreSQL **Row Level Security (RLS)** policies to protect user data.

### 3. Start the development server

```bash
npx expo start
```

Follow the terminal instructions to open the app with Expo Go or a supported simulator.

> **Note:** Running the app also requires the Supabase schema, access policies, and any other project-specific configuration used by the implementation. Those details should be documented as development progresses.

## 🔒 Privacy & Responsible Use

NutriShare is designed around simple wellness tracking. Because profile and activity information can be sensitive, the implementation should:

- Restrict access to personal records with appropriate authentication and authorization.
- Enforce Supabase Row Level Security policies for user-owned data.
- Limit administrative access to the minimum data required.
- Avoid presenting estimated calorie needs or BMI as medical diagnoses.
- Provide clear explanations of how user data is used and stored.

## 🗺️ Development Roadmap

- [ ] Personal profile and BMI / daily energy estimates.
- [ ] Daily and weekly sample meal plans.
- [ ] Categorized nutrition and wellness articles.
- [ ] Meal, weight, hydration, and routine tracking.
- [ ] Simple history and progress visualization.
- [ ] Basic content administration.
- [ ] Usability testing and MVP refinement.

*This checklist represents the intended scope, not a verified implementation status. Update it as features are completed.*

## 📚 References

- [Expo documentation](https://docs.expo.dev/)
- [Expo environment variables](https://docs.expo.dev/guides/environment-variables/)
- [Supabase with Expo React Native](https://supabase.com/docs/guides/getting-started/quickstarts/expo-react-native)
- [Supabase documentation](https://supabase.com/docs)

---

**NutriShare — Small steps toward healthier everyday habits.**
