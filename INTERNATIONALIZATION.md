# Internationalization (i18n) Implementation Guide

This document explains how to use the internationalization system implemented in the Candivet application using react-i18next.

## Overview

The application supports multiple languages:

- English (en) - Default
- French (fr)
- Spanish (es)
- German (de)
- Arabic (ar)
- Portuguese (pt)
- Chinese (zh) - Mandarin

## Architecture

### Core Files

1. **`src/lib/i18n.ts`** - Main i18n configuration with all translations
2. **`src/types/i18next.d.ts`** - TypeScript declarations for type safety
3. **`src/components/language-selector-dropdown.tsx`** - Language selector component
4. **`src/pages/_app.tsx`** - Imports i18n initialization

### Language Selector Component

The `LanguageSelectorDropDown` component has dual functionality:

```tsx
// For full page translation (dashboard header)
<LanguageSelectorDropDown fullPageTranslation={true} />

// For specific tool translations (other components)
<LanguageSelectorDropDown onSelect={handleSelect} value={selectedLang} />
```

**Key prop:**

- `fullPageTranslation={true}` - Enables i18next language switching for entire application
- When `false` or omitted - Used for specific tool translations (existing functionality)

## Usage in Components

### 1. Import the hook

```tsx
import { useTranslation } from "react-i18next";
```

### 2. Use translations in your component

```tsx
const MyComponent = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("nav.dashboard")}</h1>
      <p>{t("dashboard.welcome")}</p>
    </div>
  );
};
```

### 3. Available translation keys

Navigate through the nested structure using dot notation:

```tsx
// Navigation items
t("nav.dashboard"); // "Dashboard" / "Tableau de bord"
t("nav.jobs"); // "Jobs" / "Emplois"
t("nav.candidates"); // "Candidates" / "Candidats"
t("nav.settings"); // "Settings" / "Paramètres"

// Dashboard content
t("dashboard.welcome"); // "Welcome to your dashboard"
t("dashboard.recentActivity"); // "Recent Activity"
t("dashboard.stats"); // "Statistics"

// Jobs section
t("jobs.title"); // "Job Postings" / "Offres d'emploi"
t("jobs.createNew"); // "Create New Job"
t("jobs.applications"); // "Applications"

// Common actions
t("common.save"); // "Save" / "Enregistrer"
t("common.cancel"); // "Cancel" / "Annuler"
t("common.edit"); // "Edit" / "Modifier"

// Forms
t("forms.email"); // "Email"
t("forms.password"); // "Password" / "Mot de passe"
t("forms.required"); // "This field is required"

// Language selector
t("language.selectLanguage"); // "Select Language"
t("language.english"); // "English" / "Anglais"
```

## Examples

### Dashboard Header Implementation

```tsx
// src/components/dashboard-header.tsx
import { useTranslation } from "react-i18next";

const DashboardHeader = () => {
  const { t } = useTranslation();

  return (
    <div>
      {/* Language selector for full page translation */}
      <LanguageSelectorDropDown fullPageTranslation={true} />

      {/* Translated button text */}
      <button>{t("jobs.createNew")}</button>
    </div>
  );
};
```

### Dashboard Page Implementation

```tsx
// src/pages/dashboard/index.tsx
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("nav.dashboard")}</h1>
      <h2>{t("dashboard.recentActivity")}</h2>
    </div>
  );
};
```

### Sidebar Navigation Implementation

```tsx
// src/components/left-side-bar.tsx
import { useTranslation } from "react-i18next";

const LeftSideBar = () => {
  const { t } = useTranslation();

  const navigationItems = [
    {
      title: t("nav.dashboard"),
      link: "/dashboard",
    },
    {
      title: t("nav.settings"),
      link: "/dashboard/settings",
    },
  ];

  return (
    <nav>
      {navigationItems.map((item) => (
        <a href={item.link}>{item.title}</a>
      ))}
    </nav>
  );
};
```

## Adding New Translations

### 1. Add to TypeScript definitions

Update `src/types/i18next.d.ts` with new keys:

```tsx
interface CustomTypeOptions {
  resources: {
    common: {
      // Add new section
      newSection: {
        newKey: string;
      };
    };
  };
}
```

### 2. Add translations to all languages

Update `src/lib/i18n.ts` for each language:

```tsx
const resources = {
  en: {
    common: {
      newSection: {
        newKey: "English text",
      },
    },
  },
  fr: {
    common: {
      newSection: {
        newKey: "Texte français",
      },
    },
  },
  // Add for all other languages...
};
```

### 3. Use in components

```tsx
const { t } = useTranslation();
return <div>{t("newSection.newKey")}</div>;
```

## Language Persistence

- User language preference is stored in `localStorage`
- Language detection order: localStorage → browser preference → default (English)
- Language changes are applied immediately across the entire application

## Features

### Language Selector Behavior

- **Dashboard Header**: Changes entire application language
- **Tool Components**: Only affects specific tool translations
- Visual feedback shows current selected language
- Persists selection across sessions

### Type Safety

- Full TypeScript support with autocompletion
- Compile-time validation of translation keys
- IntelliSense support for nested keys

### Performance

- Lazy loading of translation resources
- Client-side language switching
- No server requests for language changes

## Best Practices

1. **Use semantic keys**: `nav.dashboard` instead of `dashboardTitle`
2. **Group related translations**: Organize by feature/section
3. **Consistent naming**: Use camelCase for nested keys
4. **Type safety**: Always use TypeScript declarations
5. **Fallback handling**: English is the fallback language

## Browser Support

- All modern browsers with localStorage support
- Progressive enhancement for older browsers
- Graceful fallback to English if translations fail

## Testing Language Changes

1. Open the dashboard
2. Click the language selector in the header
3. Select a different language
4. Verify that translated text updates immediately
5. Refresh the page to confirm persistence

This implementation provides a robust, type-safe internationalization solution that scales with the application's growth.
