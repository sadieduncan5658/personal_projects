# F1 Hub Drivers Page - Technical Specification Document

**Version:** 1.0  
**Date:** November 16, 2024  
**Target Stack:** React/TypeScript Frontend, Java Spring Boot Backend  
**Theme:** Classic Racing

---

## Table of Contents
1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Design System](#design-system)
4. [Component Architecture](#component-architecture)
5. [Layout Specifications](#layout-specifications)
6. [Data Models](#data-models)
7. [API Endpoints](#api-endpoints)
8. [State Management](#state-management)
9. [Interactive Features](#interactive-features)
10. [Performance Optimizations](#performance-optimizations)

---

## 1. Overview

The F1 Hub Drivers page displays comprehensive driver standings and statistics for the 2024 Formula 1 season, featuring:
- Sortable and filterable driver table with detailed statistics
- Form guide showing last 5 race results
- Driver comparison (up to 3 drivers)
- Championship points progression chart
- Average qualifying and finishing position metrics
- Team-based filtering
- Multiple view modes (table and cards)

---

## 2. Technology Stack

### Frontend
- **Framework:** React 18+ with TypeScript 5+
- **Build Tool:** Vite or Next.js
- **Styling:** Tailwind CSS 3.4+
- **Icons:** Lucide React
- **Charts:** Recharts 2.10+
- **State Management:** React Hooks (useState, useEffect, useMemo)
- **Data Fetching:** Axios or Fetch API

### Backend
- **Framework:** Java 21 + Spring Boot 3.2+
- **Database:** PostgreSQL 15+ or MySQL 8+
- **API:** RESTful with Spring Web
- **Caching:** Redis for driver statistics
- **Validation:** Spring Validation
- **Data Processing:** Stream API for statistics calculation

---

## 3. Design System

### 3.1 Color Palette (Classic Racing Theme)

```typescript
// colors.ts
export const colors = {
  // Background
  primary: {
    bg: 'linear-gradient(135deg, #1f2937 0%, #111827 50%, #1f2937 100%)',
    cardBg: 'linear-gradient(135deg, rgba(161, 98, 7, 0.2) 0%, #1f2937 100%)',
  },
  
  // Accents
  accent: {
    yellow: '#eab308',
    yellowDark: '#a16207',
    yellowLight: '#fef08a',
  },
  
  // Team Colors
  teams: {
    redBull: '#3671C6',
    ferrari: '#E8002D',
    mclaren: '#FF8000',
    mercedes: '#27F4D2',
    astonMartin: '#229971',
    alpine: '#FF87BC',
    williams: '#37BEDD',
    alphaTauri: '#5E8FAA',
    alfaRomeo: '#C92D4B',
    haas: '#B6BABD',
  },
  
  // Status Colors
  status: {
    win: '#22c55e',        // Green
    podium: '#3b82f6',     // Blue
    points: '#eab308',     // Yellow
    dnf: '#ef4444',        // Red
    dsq: '#dc2626',        // Dark red
  },
  
  // Position Change
  change: {
    up: '#22c55e',         // Green
    down: '#ef4444',       // Red
    neutral: '#6b7280',    // Gray
  },
  
  // Text
  text: {
    primary: '#ffffff',
    secondary: '#fef08a',
    tertiary: '#9ca3af',
  },
  
  // Borders
  border: {
    primary: 'rgba(161, 98, 7, 0.5)',
    accent: '#eab308',
  },
};
```

### 3.2 Typography

```typescript
// typography.ts
export const typography = {
  fontFamily: {
    base: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  
  fontSize: {
    xs: '0.625rem',    // 10px
    sm: '0.75rem',     // 12px
    base: '0.875rem',  // 14px
    lg: '1rem',        // 16px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
  },
  
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    black: 900,
  },
};
```

### 3.3 Spacing & Layout

```typescript
// spacing.ts
export const spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '0.75rem',   // 12px
  lg: '1rem',      // 16px
  xl: '1.5rem',    // 24px
  '2xl': '2rem',   // 32px
  '3xl': '3rem',   // 48px
};

export const borderRadius = {
  sm: '0.375rem',    // 6px
  md: '0.5rem',      // 8px
  lg: '0.75rem',     // 12px
  xl: '1rem',        // 16px
  '2xl': '1.5rem',   // 24px
};
```

---

## 4. Component Architecture

### 4.1 Component Tree

```
DriversPage (Container)
├── PageHeader
├── FiltersSection
│   ├── SearchInput
│   ├── TeamFilter
│   ├── SortByDropdown
│   └── SelectedDriversChips
├── PointsProgressionChart
├── DriverComparisonCards (conditional - when 2-3 selected)
│   └── ComparisonCard (x2 or x3)
├── ViewModeToggle
└── DriversDisplay (conditional based on viewMode)
    ├── DriversTable (when viewMode === 'table')
    │   ├── TableHeader
    │   └── DriverRow (xN)
    │       ├── PositionCell
    │       ├── DriverInfoCell
    │       ├── TeamCell
    │       ├── PointsCell
    │       ├── FormGuideCell
    │       ├── StatsCell (Wins, Podiums, Poles, FL)
    │       ├── AvgQualifyingCell
    │       └── AvgFinishingCell
    └── DriversCards (when viewMode === 'cards')
        └── DriverCard (xN)
```

### 4.2 TypeScript Interfaces

```typescript
// types/driver.ts

export interface FormGuideRace {
  round: number;
  position: number | 'DNF' | 'DSQ' | 'DNS';
  points: number;
  circuitShort: string;
}

export interface Driver {
  id: number;
  position: number;
  prevPosition: number;
  posChange: number;
  
  // Basic Info
  name: string;
  shortName: string;      // e.g., "VER", "HAM"
  number: number;
  nationality: string;
  flag: string;           // Emoji flag
  team: string;
  teamColor: string;      // Hex color
  
  // Points
  points: number;
  pointsGained: number;   // Last race
  gap: number;            // To leader (negative if behind)
  
  // Performance Stats
  wins: number;
  podiums: number;
  poles: number;
  fastestLaps: number;
  dnfs: number;
  
  // Averages
  avgPosition: number;           // Average finishing position
  avgPoints: number;             // Average points per race
  avgQualifying: number;         // Average qualifying position
  avgRacePosition: number;       // Average race finish position
  
  // Form Guide
  formGuide: FormGuideRace[];    // Last 5 races
  
  // Additional Metrics
  pointsFinishes: number;        // Number of top-10 finishes
  racesCompleted: number;
  finishRate: number;            // Percentage of races finished
}

export interface DriverStatistics {
  driverId: number;
  season: number;
  totalRaces: number;
  
  // Calculated fields
  consistency: number;           // Standard deviation of finishing positions
  qualifyingGapToTeammate: number;
  racePositionChange: number;    // Avg positions gained in race
}

export interface DriverComparison {
  drivers: Driver[];
  metrics: ComparisonMetric[];
}

export interface ComparisonMetric {
  name: string;
  values: { [driverId: number]: number | string };
  unit?: string;
  highlight?: 'highest' | 'lowest';
}

export interface PointsProgressionData {
  race: string;              // e.g., "R1", "R5"
  [driverShortName: string]: number | string;  // Points for each driver
}

export interface DriversPageState {
  selectedDrivers: string[];     // Driver names
  sortBy: SortOption;
  filterTeam: string;
  searchQuery: string;
  viewMode: 'table' | 'cards';
}

export type SortOption = 'points' | 'name' | 'team' | 'wins' | 'podiums' | 'avgQualifying' | 'avgFinishing';
```

---

## 5. Layout Specifications

### 5.1 Page Container

```typescript
const pageContainer = {
  maxWidth: '1280px',
  padding: '1.5rem',
  margin: '0 auto',
  backgroundColor: colors.primary.bg,
  minHeight: '100vh',
  spacing: {
    sectionGap: '1.5rem',
  },
};
```

### 5.2 Page Header

```typescript
const pageHeaderSpec = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  
  title: {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.black,
    color: colors.text.primary,
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
  },
  
  icon: {
    size: '2.5rem',
    color: colors.accent.yellow,
  },
  
  subtitle: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  
  statCard: {
    backgroundColor: colors.primary.cardBg,
    border: `1px solid ${colors.border.primary}`,
    borderRadius: borderRadius.xl,
    padding: '1rem 1.5rem',
  },
  
  statLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  
  statValue: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.black,
    color: colors.text.primary,
  },
};
```

### 5.3 Filters Section

```typescript
const filtersSectionSpec = {
  container: {
    backgroundColor: colors.primary.cardBg,
    border: `1px solid ${colors.border.primary}`,
    borderRadius: borderRadius['2xl'],
    padding: '1.5rem',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  
  grid: {
    display: 'grid',
    gridTemplateColumns: {
      mobile: '1fr',
      tablet: 'repeat(2, 1fr)',
      desktop: 'repeat(4, 1fr)',
    },
    gap: '1rem',
  },
  
  // Search Input
  searchInput: {
    container: {
      gridColumn: {
        mobile: 'span 1',
        desktop: 'span 2',
      },
    },
    
    label: {
      fontSize: typography.fontSize.sm,
      color: colors.text.secondary,
      marginBottom: spacing.sm,
      display: 'block',
    },
    
    inputWrapper: {
      position: 'relative',
    },
    
    icon: {
      position: 'absolute',
      left: '0.75rem',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '1.25rem',
      height: '1.25rem',
      color: colors.text.secondary,
    },
    
    input: {
      width: '100%',
      backgroundColor: 'rgba(161, 98, 7, 0.1)',
      border: `1px solid ${colors.border.primary}`,
      borderRadius: borderRadius.lg,
      paddingLeft: '2.5rem',
      paddingRight: '1rem',
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
      color: colors.text.primary,
      fontSize: typography.fontSize.base,
      
      placeholder: {
        color: '#6b7280',
      },
      
      focus: {
        outline: 'none',
        ring: `2px solid ${colors.accent.yellow}`,
        ringOffset: '0',
      },
    },
  },
  
  // Select Dropdowns (Team Filter, Sort By)
  selectDropdown: {
    label: {
      fontSize: typography.fontSize.sm,
      color: colors.text.secondary,
      marginBottom: spacing.sm,
      display: 'block',
    },
    
    select: {
      width: '100%',
      backgroundColor: 'rgba(161, 98, 7, 0.1)',
      border: `1px solid ${colors.border.primary}`,
      borderRadius: borderRadius.lg,
      padding: '0.5rem 1rem',
      color: colors.text.primary,
      fontSize: typography.fontSize.base,
      
      focus: {
        outline: 'none',
        ring: `2px solid ${colors.accent.yellow}`,
      },
    },
  },
  
  // Selected Drivers Chips
  selectedDriversSection: {
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid rgba(161, 98, 7, 0.3)',
  },
  
  selectedDriversHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  
  selectedDriversLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    fontWeight: typography.fontWeight.semibold,
  },
  
  clearButton: {
    fontSize: typography.fontSize.xs,
    color: '#ef4444',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    cursor: 'pointer',
    
    hover: {
      color: '#dc2626',
    },
  },
  
  chipsContainer: {
    display: 'flex',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  
  chip: {
    backgroundColor: 'rgba(161, 98, 7, 0.1)',
    border: `1px solid ${colors.accent.yellow}`,
    borderRadius: borderRadius.lg,
    padding: '0.5rem 0.75rem',
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
  },
  
  chipFlag: {
    fontSize: typography.fontSize['2xl'],
  },
  
  chipText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
  },
  
  chipRemoveButton: {
    marginLeft: spacing.xs,
    color: colors.accent.yellow,
    cursor: 'pointer',
    
    hover: {
      color: colors.accent.yellowLight,
    },
  },
};
```

### 5.4 Points Progression Chart

```typescript
const pointsProgressionChartSpec = {
  container: {
    backgroundColor: colors.primary.cardBg,
    border: `1px solid ${colors.border.primary}`,
    borderRadius: borderRadius['2xl'],
    padding: '1.5rem',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: '1rem',
  },
  
  titleIcon: {
    width: '1.5rem',
    height: '1.5rem',
    color: colors.accent.yellow,
  },
  
  chart: {
    width: '100%',
    height: '400px',
  },
  
  // Recharts styling
  chartConfig: {
    cartesianGrid: {
      strokeDasharray: '3 3',
      stroke: '#374151',
    },
    
    xAxis: {
      stroke: colors.text.secondary,
      fontSize: typography.fontSize.sm,
    },
    
    yAxis: {
      stroke: colors.text.secondary,
      fontSize: typography.fontSize.sm,
    },
    
    tooltip: {
      contentStyle: {
        backgroundColor: '#1f2937',
        border: `1px solid ${colors.border.primary}`,
        borderRadius: borderRadius.lg,
        color: colors.text.primary,
      },
    },
    
    legend: {
      fontSize: typography.fontSize.sm,
      color: colors.text.primary,
    },
    
    line: {
      strokeWidth: 3,
      dot: {
        r: 4,
      },
    },
  },
};
```

### 5.5 Driver Comparison Cards

```typescript
const comparisonCardsSpec = {
  container: {
    backgroundColor: colors.primary.cardBg,
    border: `1px solid ${colors.border.primary}`,
    borderRadius: borderRadius['2xl'],
    padding: '1.5rem',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
  },
  
  grid: {
    display: 'grid',
    gridTemplateColumns: (numDrivers: number) => `repeat(${numDrivers}, 1fr)`,
    gap: '1rem',
  },
  
  // Individual Comparison Card
  card: {
    backgroundColor: 'rgba(161, 98, 7, 0.1)',
    borderRadius: borderRadius.xl,
    padding: '1.25rem',
    border: '2px solid',
    // borderColor set dynamically to driver.teamColor
  },
  
  cardHeader: {
    textAlign: 'center',
    marginBottom: '1rem',
  },
  
  flag: {
    fontSize: typography.fontSize['5xl'],
    marginBottom: spacing.sm,
  },
  
  driverName: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.black,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  
  team: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  
  number: {
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  
  // Stats Section
  statsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
  },
  
  statRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: spacing.sm,
    borderBottom: '1px solid rgba(161, 98, 7, 0.3)',
    
    last: {
      borderBottom: 'none',
    },
  },
  
  statLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  
  statValue: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  
  // Special row for position
  positionRow: {
    statValue: {
      fontSize: typography.fontSize['2xl'],
      fontWeight: typography.fontWeight.black,
    },
  },
};
```

### 5.6 Drivers Table

```typescript
const driversTableSpec = {
  container: {
    backgroundColor: colors.primary.cardBg,
    border: `1px solid ${colors.border.primary}`,
    borderRadius: borderRadius['2xl'],
    padding: '1.5rem',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    overflowX: 'auto',
  },
  
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
  },
  
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: 0,
  },
  
  // Table Header
  thead: {
    row: {
      borderBottom: '1px solid rgba(161, 98, 7, 0.3)',
    },
    
    cell: {
      textAlign: 'left',
      padding: '0.75rem 1rem',
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.semibold,
      color: colors.text.secondary,
    },
    
    cellCenter: {
      textAlign: 'center',
    },
  },
  
  // Table Body
  tbody: {
    row: {
      borderBottom: '1px solid rgba(161, 98, 7, 0.2)',
      transition: 'background-color 0.2s',
      
      hover: {
        backgroundColor: 'rgba(161, 98, 7, 0.2)',
      },
      
      selected: {
        ring: `2px solid ${colors.accent.yellow}`,
      },
    },
    
    cell: {
      padding: '1rem',
    },
  },
  
  // Position Cell
  positionCell: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
  },
  
  checkbox: {
    cursor: 'pointer',
    width: '1rem',
    height: '1rem',
  },
  
  positionNumber: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.black,
    
    // Top 3 get yellow color
    podium: {
      color: colors.accent.yellow,
    },
    
    normal: {
      color: colors.text.secondary,
    },
  },
  
  // Driver Info Cell
  driverInfoCell: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
  },
  
  teamColorBar: {
    width: '0.25rem',
    height: '3rem',
    borderRadius: '9999px',
    // backgroundColor set to driver.teamColor
  },
  
  flag: {
    fontSize: typography.fontSize['3xl'],
  },
  
  driverInfo: {
    name: {
      fontSize: typography.fontSize.lg,
      fontWeight: typography.fontWeight.bold,
      color: colors.text.primary,
    },
    
    meta: {
      fontSize: typography.fontSize.xs,
      color: colors.text.secondary,
    },
  },
  
  // Team Cell
  teamCell: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
  },
  
  // Points Cell
  pointsCell: {
    textAlign: 'center',
  },
  
  pointsValue: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.black,
    color: colors.text.primary,
  },
  
  pointsGained: {
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
  },
  
  // Position Change Cell
  changeCell: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.25rem',
  },
  
  changeIcon: {
    width: '1rem',
    height: '1rem',
  },
  
  changeUp: {
    color: colors.change.up,
  },
  
  changeDown: {
    color: colors.change.down,
  },
  
  changeNeutral: {
    color: colors.change.neutral,
  },
  
  // Form Guide Cell
  formGuideCell: {
    display: 'flex',
    gap: '0.25rem',
    justifyContent: 'center',
  },
  
  formBadge: {
    width: '2rem',
    height: '2rem',
    borderRadius: borderRadius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    
    // Colors based on result
    win: {
      backgroundColor: colors.status.win,
      color: '#ffffff',
    },
    
    podium: {
      backgroundColor: colors.status.podium,
      color: '#ffffff',
    },
    
    points: {
      backgroundColor: colors.status.points,
      color: '#000000',
    },
    
    noPoints: {
      backgroundColor: '#4b5563',
      color: '#ffffff',
    },
    
    dnf: {
      backgroundColor: colors.status.dnf,
      color: '#ffffff',
      text: 'DNF',
    },
    
    dsq: {
      backgroundColor: colors.status.dsq,
      color: '#ffffff',
      text: 'DSQ',
    },
  },
  
  // Stats Cells (Wins, Podiums, Poles, FL)
  statsCell: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.25rem',
  },
  
  statsIcon: {
    width: '1rem',
    height: '1rem',
    
    trophy: colors.accent.yellow,
    award: '#9ca3af',
    star: colors.accent.yellow,
    zap: '#a78bfa',
  },
  
  statsValue: {
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  
  // Average Cells (Qualifying, Finishing)
  avgCell: {
    textAlign: 'center',
  },
  
  avgValue: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
  },
  
  avgLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
    marginTop: '0.125rem',
  },
};
```

### 5.7 Form Guide Badge Logic

```typescript
// Helper function to determine form badge style
export const getFormBadgeStyle = (position: number | string): FormBadgeStyle => {
  if (position === 'DNF') {
    return {
      backgroundColor: colors.status.dnf,
      color: '#ffffff',
      text: 'DNF',
    };
  }
  
  if (position === 'DSQ') {
    return {
      backgroundColor: colors.status.dsq,
      color: '#ffffff',
      text: 'DSQ',
    };
  }
  
  if (position === 'DNS') {
    return {
      backgroundColor: '#6b7280',
      color: '#ffffff',
      text: 'DNS',
    };
  }
  
  const pos = Number(position);
  
  if (pos === 1) {
    return {
      backgroundColor: colors.status.win,
      color: '#ffffff',
      text: '1',
    };
  }
  
  if (pos <= 3) {
    return {
      backgroundColor: colors.status.podium,
      color: '#ffffff',
      text: pos.toString(),
    };
  }
  
  if (pos <= 10) {
    return {
      backgroundColor: colors.status.points,
      color: '#000000',
      text: pos.toString(),
    };
  }
  
  return {
    backgroundColor: '#4b5563',
    color: '#ffffff',
    text: pos.toString(),
  };
};

interface FormBadgeStyle {
  backgroundColor: string;
  color: string;
  text: string;
}
```

---

## 6. Data Models

### 6.1 Java Backend Models

```java
// Driver.java
package com.f1hub.model;

import lombok.Data;
import lombok.Builder;
import java.util.List;

@Data
@Builder
public class Driver {
    private Long id;
    private Integer position;
    private Integer prevPosition;
    private Integer posChange;
    
    // Basic Info
    private String name;
    private String shortName;
    private Integer number;
    private String nationality;
    private String flag;
    private String team;
    private String teamColor;
    
    // Points
    private Integer points;
    private Integer pointsGained;
    private Integer gap;
    
    // Performance Stats
    private Integer wins;
    private Integer podiums;
    private Integer poles;
    private Integer fastestLaps;
    private Integer dnfs;
    
    // Averages
    private Double avgPosition;
    private Double avgPoints;
    private Double avgQualifying;
    private Double avgRacePosition;
    
    // Form Guide
    private List<FormGuideRace> formGuide;
    
    // Additional Metrics
    private Integer pointsFinishes;
    private Integer racesCompleted;
    private Double finishRate;
}

// FormGuideRace.java
package com.f1hub.model;

import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class FormGuideRace {
    private Integer round;
    private String position;  // Can be number, "DNF", "DSQ", "DNS"
    private Integer points;
    private String circuitShort;
}

// PointsProgressionData.java
package com.f1hub.model;

import lombok.Data;
import lombok.Builder;
import java.util.Map;

@Data
@Builder
public class PointsProgressionData {
    private String race;  // e.g., "R1", "R5"
    private Map<String, Integer> driverPoints;  // shortName -> points
}

// DriverStatistics.java
package com.f1hub.model;

import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class DriverStatistics {
    private Long driverId;
    private Integer season;
    private Integer totalRaces;
    private Double consistency;
    private Double qualifyingGapToTeammate;
    private Double racePositionChange;
}

// DriverFilters.java
package com.f1hub.model;

import lombok.Data;

@Data
public class DriverFilters {
    private String team;
    private String sortBy;
    private String searchQuery;
}
```

### 6.2 TypeScript Frontend Models

```typescript
// models/driver.model.ts

export interface FormGuideRace {
  round: number;
  position: number | 'DNF' | 'DSQ' | 'DNS';
  points: number;
  circuitShort: string;
}

export interface Driver {
  id: number;
  position: number;
  prevPosition: number;
  posChange: number;
  
  // Basic Info
  name: string;
  shortName: string;
  number: number;
  nationality: string;
  flag: string;
  team: string;
  teamColor: string;
  
  // Points
  points: number;
  pointsGained: number;
  gap: number;
  
  // Performance Stats
  wins: number;
  podiums: number;
  poles: number;
  fastestLaps: number;
  dnfs: number;
  
  // Averages
  avgPosition: number;
  avgPoints: number;
  avgQualifying: number;
  avgRacePosition: number;
  
  // Form Guide
  formGuide: FormGuideRace[];
  
  // Additional Metrics
  pointsFinishes: number;
  racesCompleted: number;
  finishRate: number;
}

export interface PointsProgressionData {
  race: string;
  [driverShortName: string]: number | string;
}

export interface DriverStatistics {
  driverId: number;
  season: number;
  totalRaces: number;
  consistency: number;
  qualifyingGapToTeammate: number;
  racePositionChange: number;
}

export type SortOption = 
  | 'points' 
  | 'name' 
  | 'team' 
  | 'wins' 
  | 'podiums' 
  | 'avgQualifying' 
  | 'avgFinishing';

export type ViewMode = 'table' | 'cards';

export interface DriversPageState {
  drivers: Driver[];
  pointsProgression: PointsProgressionData[];
  selectedDrivers: string[];
  sortBy: SortOption;
  filterTeam: string;
  searchQuery: string;
  viewMode: ViewMode;
  loading: boolean;
  error: string | null;
}
```

---

## 7. API Endpoints

### 7.1 Backend API Specification

```java
// DriversController.java
package com.f1hub.controller;

import com.f1hub.model.*;
import com.f1hub.service.DriversService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/drivers")
@RequiredArgsConstructor
@CrossOrigin(origins = "${app.cors.allowed-origins}")
public class DriversController {
    
    private final DriversService driversService;
    
    /**
     * Get all drivers with current season statistics
     * @param team Optional team filter
     * @param sortBy Optional sort field
     * @return List of drivers with stats
     */
    @GetMapping
    public List<Driver> getAllDrivers(
        @RequestParam(required = false) String team,
        @RequestParam(required = false, defaultValue = "points") String sortBy
    ) {
        return driversService.getAllDrivers(team, sortBy);
    }
    
    /**
     * Get specific driver by ID
     * @param id Driver ID
     * @return Driver details
     */
    @GetMapping("/{id}")
    public Driver getDriverById(@PathVariable Long id) {
        return driversService.getDriverById(id);
    }
    
    /**
     * Get points progression data for all drivers
     * @return Points progression by race
     */
    @GetMapping("/points-progression")
    public List<PointsProgressionData> getPointsProgression() {
        return driversService.getPointsProgression();
    }
    
    /**
     * Get form guide (last 5 races) for a specific driver
     * @param id Driver ID
     * @param numRaces Number of recent races (default 5)
     * @return Form guide data
     */
    @GetMapping("/{id}/form-guide")
    public List<FormGuideRace> getFormGuide(
        @PathVariable Long id,
        @RequestParam(required = false, defaultValue = "5") Integer numRaces
    ) {
        return driversService.getFormGuide(id, numRaces);
    }
    
    /**
     * Get detailed statistics for a driver
     * @param id Driver ID
     * @return Driver statistics
     */
    @GetMapping("/{id}/statistics")
    public DriverStatistics getDriverStatistics(@PathVariable Long id) {
        return driversService.getDriverStatistics(id);
    }
    
    /**
     * Compare multiple drivers
     * @param driverIds Comma-separated driver IDs
     * @return Comparison data
     */
    @GetMapping("/compare")
    public List<Driver> compareDrivers(@RequestParam String driverIds) {
        List<Long> ids = parseDriverIds(driverIds);
        return driversService.compareDrivers(ids);
    }
    
    private List<Long> parseDriverIds(String driverIds) {
        // Parse comma-separated IDs
        // Implementation...
        return List.of();
    }
}
```

### 7.2 Service Layer

```java
// DriversService.java
package com.f1hub.service;

import com.f1hub.model.*;
import com.f1hub.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DriversService {
    
    private final DriverRepository driverRepository;
    private final RaceResultRepository raceResultRepository;
    private final QualifyingResultRepository qualifyingResultRepository;
    
    @Cacheable(value = "drivers", key = "#team + '_' + #sortBy")
    public List<Driver> getAllDrivers(String team, String sortBy) {
        List<Driver> drivers = driverRepository.findAllBySeason(2024);
        
        // Calculate statistics for each driver
        drivers.forEach(this::enrichDriverWithStats);
        
        // Filter by team if specified
        if (team != null && !team.equals("all")) {
            drivers = drivers.stream()
                .filter(d -> d.getTeam().equals(team))
                .collect(Collectors.toList());
        }
        
        // Sort
        return sortDrivers(drivers, sortBy);
    }
    
    public Driver getDriverById(Long id) {
        Driver driver = driverRepository.findById(id)
            .orElseThrow(() -> new DriverNotFoundException(id));
        enrichDriverWithStats(driver);
        return driver;
    }
    
    @Cacheable("pointsProgression")
    public List<PointsProgressionData> getPointsProgression() {
        // Get all race results grouped by round
        Map<Integer, List<RaceResult>> resultsByRound = 
            raceResultRepository.findAllBySeason(2024)
                .stream()
                .collect(Collectors.groupingBy(RaceResult::getRound));
        
        // Calculate cumulative points for each driver after each race
        return calculateProgressionData(resultsByRound);
    }
    
    public List<FormGuideRace> getFormGuide(Long driverId, Integer numRaces) {
        return raceResultRepository
            .findRecentResultsByDriverId(driverId, numRaces)
            .stream()
            .map(this::convertToFormGuideRace)
            .collect(Collectors.toList());
    }
    
    public DriverStatistics getDriverStatistics(Long driverId) {
        Driver driver = getDriverById(driverId);
        return calculateDetailedStatistics(driver);
    }
    
    public List<Driver> compareDrivers(List<Long> driverIds) {
        return driverIds.stream()
            .map(this::getDriverById)
            .collect(Collectors.toList());
    }
    
    // Private helper methods
    
    private void enrichDriverWithStats(Driver driver) {
        // Calculate averages
        driver.setAvgPosition(calculateAveragePosition(driver.getId()));
        driver.setAvgPoints(calculateAveragePoints(driver.getId()));
        driver.setAvgQualifying(calculateAverageQualifying(driver.getId()));
        driver.setAvgRacePosition(calculateAverageRacePosition(driver.getId()));
        
        // Get form guide
        driver.setFormGuide(getFormGuide(driver.getId(), 5));
        
        // Calculate additional metrics
        driver.setPointsFinishes(countPointsFinishes(driver.getId()));
        driver.setRacesCompleted(countRacesCompleted(driver.getId()));
        driver.setFinishRate(calculateFinishRate(driver.getId()));
    }
    
    private Double calculateAveragePosition(Long driverId) {
        List<RaceResult> results = raceResultRepository.findByDriverId(driverId);
        return results.stream()
            .filter(r -> r.getPosition() != null)  // Exclude DNFs
            .mapToInt(RaceResult::getPosition)
            .average()
            .orElse(0.0);
    }
    
    private Double calculateAveragePoints(Long driverId) {
        List<RaceResult> results = raceResultRepository.findByDriverId(driverId);
        return results.stream()
            .mapToInt(RaceResult::getPoints)
            .average()
            .orElse(0.0);
    }
    
    private Double calculateAverageQualifying(Long driverId) {
        List<QualifyingResult> results = qualifyingResultRepository.findByDriverId(driverId);
        return results.stream()
            .mapToInt(QualifyingResult::getPosition)
            .average()
            .orElse(0.0);
    }
    
    private Double calculateAverageRacePosition(Long driverId) {
        // Same as calculateAveragePosition in this context
        return calculateAveragePosition(driverId);
    }
    
    private Integer countPointsFinishes(Long driverId) {
        return (int) raceResultRepository.findByDriverId(driverId)
            .stream()
            .filter(r -> r.getPosition() != null && r.getPosition() <= 10)
            .count();
    }
    
    private Integer countRacesCompleted(Long driverId) {
        return (int) raceResultRepository.findByDriverId(driverId)
            .stream()
            .filter(r -> r.getPosition() != null)
            .count();
    }
    
    private Double calculateFinishRate(Long driverId) {
        List<RaceResult> results = raceResultRepository.findByDriverId(driverId);
        int totalRaces = results.size();
        int completed = countRacesCompleted(driverId);
        return totalRaces > 0 ? (completed * 100.0 / totalRaces) : 0.0;
    }
    
    private FormGuideRace convertToFormGuideRace(RaceResult result) {
        return FormGuideRace.builder()
            .round(result.getRound())
            .position(result.getPositionString())  // "1", "DNF", etc.
            .points(result.getPoints())
            .circuitShort(result.getCircuitShortName())
            .build();
    }
    
    private List<PointsProgressionData> calculateProgressionData(
        Map<Integer, List<RaceResult>> resultsByRound
    ) {
        // Implementation for cumulative points calculation
        // Returns list of PointsProgressionData sorted by round
        return new ArrayList<>();
    }
    
    private DriverStatistics calculateDetailedStatistics(Driver driver) {
        // Calculate advanced metrics
        return DriverStatistics.builder()
            .driverId(driver.getId())
            .season(2024)
            .totalRaces(driver.getRacesCompleted())
            .consistency(calculateConsistency(driver.getId()))
            .qualifyingGapToTeammate(calculateQualifyingGap(driver.getId()))
            .racePositionChange(calculateAvgPositionChange(driver.getId()))
            .build();
    }
    
    private Double calculateConsistency(Long driverId) {
        // Calculate standard deviation of finishing positions
        // Lower is more consistent
        return 0.0;
    }
    
    private Double calculateQualifyingGap(Long driverId) {
        // Average qualifying position gap to teammate
        return 0.0;
    }
    
    private Double calculateAvgPositionChange(Long driverId) {
        // Average positions gained/lost from quali to race
        return 0.0;
    }
    
    private List<Driver> sortDrivers(List<Driver> drivers, String sortBy) {
        Comparator<Driver> comparator = switch (sortBy) {
            case "name" -> Comparator.comparing(Driver::getName);
            case "team" -> Comparator.comparing(Driver::getTeam);
            case "wins" -> Comparator.comparing(Driver::getWins).reversed();
            case "podiums" -> Comparator.comparing(Driver::getPodiums).reversed();
            case "avgQualifying" -> Comparator.comparing(Driver::getAvgQualifying);
            case "avgFinishing" -> Comparator.comparing(Driver::getAvgRacePosition);
            default -> Comparator.comparing(Driver::getPoints).reversed();
        };
        
        return drivers.stream()
            .sorted(comparator)
            .collect(Collectors.toList());
    }
}
```

### 7.3 Frontend API Service

```typescript
// services/drivers.service.ts

import axios from 'axios';
import { Driver, PointsProgressionData, FormGuideRace, DriverStatistics } from '../models/driver.model';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1';

class DriversService {
  
  /**
   * Get all drivers with optional filters
   */
  async getAllDrivers(team?: string, sortBy?: string): Promise<Driver[]> {
    const params: any = {};
    if (team && team !== 'all') params.team = team;
    if (sortBy) params.sortBy = sortBy;
    
    const response = await axios.get<Driver[]>(`${API_BASE_URL}/drivers`, { params });
    return response.data;
  }
  
  /**
   * Get specific driver by ID
   */
  async getDriverById(id: number): Promise<Driver> {
    const response = await axios.get<Driver>(`${API_BASE_URL}/drivers/${id}`);
    return response.data;
  }
  
  /**
   * Get points progression for all drivers
   */
  async getPointsProgression(): Promise<PointsProgressionData[]> {
    const response = await axios.get<PointsProgressionData[]>(`${API_BASE_URL}/drivers/points-progression`);
    return response.data;
  }
  
  /**
   * Get form guide for a driver
   */
  async getFormGuide(id: number, numRaces: number = 5): Promise<FormGuideRace[]> {
    const response = await axios.get<FormGuideRace[]>(
      `${API_BASE_URL}/drivers/${id}/form-guide`,
      { params: { numRaces } }
    );
    return response.data;
  }
  
  /**
   * Get detailed statistics for a driver
   */
  async getDriverStatistics(id: number): Promise<DriverStatistics> {
    const response = await axios.get<DriverStatistics>(`${API_BASE_URL}/drivers/${id}/statistics`);
    return response.data;
  }
  
  /**
   * Compare multiple drivers
   */
  async compareDrivers(driverIds: number[]): Promise<Driver[]> {
    const idsParam = driverIds.join(',');
    const response = await axios.get<Driver[]>(`${API_BASE_URL}/drivers/compare`, {
      params: { driverIds: idsParam }
    });
    return response.data;
  }
}

export default new DriversService();
```

---

## 8. State Management

### 8.1 React State Hook

```typescript
// hooks/useDriversState.ts

import { useState, useEffect, useMemo } from 'react';
import { Driver, PointsProgressionData, SortOption, ViewMode } from '../models/driver.model';
import driversService from '../services/drivers.service';

export const useDriversState = () => {
  // State
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [pointsProgression, setPointsProgression] = useState<PointsProgressionData[]>([]);
  const [selectedDrivers, setSelectedDrivers] = useState<string[]>(['Max Verstappen', 'Lando Norris']);
  const [sortBy, setSortBy] = useState<SortOption>('points');
  const [filterTeam, setFilterTeam] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        const [driversData, progressionData] = await Promise.all([
          driversService.getAllDrivers(),
          driversService.getPointsProgression(),
        ]);
        
        setDrivers(driversData);
        setPointsProgression(progressionData);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load drivers data');
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  // Filtered and sorted drivers (memoized)
  const filteredDrivers = useMemo(() => {
    let result = [...drivers];
    
    // Filter by team
    if (filterTeam !== 'all') {
      result = result.filter(d => d.team === filterTeam);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(d => 
        d.name.toLowerCase().includes(query) ||
        d.team.toLowerCase().includes(query) ||
        d.nationality.toLowerCase().includes(query)
      );
    }
    
    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'team':
          return a.team.localeCompare(b.team);
        case 'wins':
          return b.wins - a.wins;
        case 'podiums':
          return b.podiums - a.podiums;
        case 'avgQualifying':
          return a.avgQualifying - b.avgQualifying;
        case 'avgFinishing':
          return a.avgRacePosition - b.avgRacePosition;
        case 'points':
        default:
          return b.points - a.points;
      }
    });
    
    return result;
  }, [drivers, filterTeam, searchQuery, sortBy]);
  
  // Toggle driver selection
  const toggleDriverSelection = (driverName: string) => {
    setSelectedDrivers(prev => {
      if (prev.includes(driverName)) {
        return prev.filter(d => d !== driverName);
      } else if (prev.length < 3) {
        return [...prev, driverName];
      }
      return prev;
    });
  };
  
  // Clear all selections
  const clearSelections = () => {
    setSelectedDrivers([]);
  };
  
  return {
    // Data
    drivers: filteredDrivers,
    pointsProgression,
    allDrivers: drivers,
    
    // Filters & Selection
    selectedDrivers,
    sortBy,
    filterTeam,
    searchQuery,
    viewMode,
    
    // Status
    loading,
    error,
    
    // Actions
    toggleDriverSelection,
    clearSelections,
    setSortBy,
    setFilterTeam,
    setSearchQuery,
    setViewMode,
  };
};
```

### 8.2 Component Implementation

```typescript
// pages/DriversPage.tsx

import React from 'react';
import { useDriversState } from '../hooks/useDriversState';
import PageHeader from '../components/drivers/PageHeader';
import FiltersSection from '../components/drivers/FiltersSection';
import PointsProgressionChart from '../components/drivers/PointsProgressionChart';
import DriverComparisonCards from '../components/drivers/DriverComparisonCards';
import DriversTable from '../components/drivers/DriversTable';
import DriversCards from '../components/drivers/DriversCards';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const DriversPage: React.FC = () => {
  const {
    drivers,
    pointsProgression,
    allDrivers,
    selectedDrivers,
    sortBy,
    filterTeam,
    searchQuery,
    viewMode,
    loading,
    error,
    toggleDriverSelection,
    clearSelections,
    setSortBy,
    setFilterTeam,
    setSearchQuery,
    setViewMode,
  } = useDriversState();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (error) {
    return <ErrorMessage message={error} />;
  }
  
  const teams = ['all', ...new Set(allDrivers.map(d => d.team))];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <PageHeader totalDrivers={allDrivers.length} />
        
        <FiltersSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filterTeam={filterTeam}
          onTeamChange={setFilterTeam}
          teams={teams}
          sortBy={sortBy}
          onSortChange={setSortBy}
          selectedDrivers={selectedDrivers}
          onClearSelections={clearSelections}
          onRemoveDriver={toggleDriverSelection}
          drivers={allDrivers}
        />
        
        {selectedDrivers.length > 0 && (
          <PointsProgressionChart
            data={pointsProgression}
            selectedDrivers={selectedDrivers}
            drivers={allDrivers}
          />
        )}
        
        {selectedDrivers.length >= 2 && (
          <DriverComparisonCards
            selectedDrivers={selectedDrivers}
            drivers={allDrivers}
          />
        )}
        
        <div className="flex justify-end gap-2 mb-4">
          <button
            onClick={() => setViewMode('table')}
            className={`px-4 py-2 rounded-lg font-semibold ${
              viewMode === 'table' ? 'bg-yellow-600 text-black' : 'bg-yellow-900/30 text-white'
            }`}
          >
            Table
          </button>
          <button
            onClick={() => setViewMode('cards')}
            className={`px-4 py-2 rounded-lg font-semibold ${
              viewMode === 'cards' ? 'bg-yellow-600 text-black' : 'bg-yellow-900/30 text-white'
            }`}
          >
            Cards
          </button>
        </div>
        
        {viewMode === 'table' ? (
          <DriversTable
            drivers={drivers}
            selectedDrivers={selectedDrivers}
            onToggleSelection={toggleDriverSelection}
          />
        ) : (
          <DriversCards
            drivers={drivers}
            selectedDrivers={selectedDrivers}
            onToggleSelection={toggleDriverSelection}
          />
        )}
      </div>
    </div>
  );
};

export default DriversPage;
```

---

## 9. Interactive Features

### 9.1 Driver Selection Logic

```typescript
// Maximum 3 drivers can be selected
const MAX_SELECTED_DRIVERS = 3;

interface DriverSelectionProps {
  driverName: string;
  selectedDrivers: string[];
  onToggle: (name: string) => void;
}

const handleDriverSelection = (
  driverName: string,
  selectedDrivers: string[],
  setSelectedDrivers: (drivers: string[]) => void
) => {
  if (selectedDrivers.includes(driverName)) {
    // Remove if already selected
    setSelectedDrivers(selectedDrivers.filter(d => d !== driverName));
  } else if (selectedDrivers.length < MAX_SELECTED_DRIVERS) {
    // Add if under limit
    setSelectedDrivers([...selectedDrivers, driverName]);
  } else {
    // Optional: Show toast notification that limit reached
    console.warn('Maximum 3 drivers can be selected');
  }
};
```

### 9.2 Checkbox Behavior

```typescript
// Checkbox should be:
// - Checked if driver is selected
// - Disabled if driver is not selected AND limit (3) is reached

interface CheckboxProps {
  checked: boolean;
  disabled: boolean;
  onChange: () => void;
}

const isCheckboxDisabled = (
  driverName: string,
  selectedDrivers: string[]
): boolean => {
  return !selectedDrivers.includes(driverName) && 
         selectedDrivers.length >= MAX_SELECTED_DRIVERS;
};
```

### 9.3 Form Guide Tooltip

```typescript
// Optional: Show circuit name on hover

interface FormGuideBadgeProps {
  race: FormGuideRace;
}

const FormGuideBadge: React.FC<FormGuideBadgeProps> = ({ race }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const style = getFormBadgeStyle(race.position);
  
  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div
        className="w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold cursor-pointer"
        style={{ backgroundColor: style.backgroundColor, color: style.color }}
      >
        {style.text}
      </div>
      
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap z-10">
          R{race.round}: {race.circuitShort}
        </div>
      )}
    </div>
  );
};
```

### 9.4 Sorting Animation

```typescript
// Add smooth transition when sorting changes

const tableRowStyle = {
  transition: 'all 0.3s ease-in-out',
};

// When sortBy changes, rows will smoothly reorder
```

---

## 10. Performance Optimizations

### 10.1 Memoization

```typescript
// Memoize expensive calculations

import { useMemo } from 'react';

// Memoize filtered/sorted drivers
const filteredDrivers = useMemo(() => {
  // Filtering and sorting logic
}, [drivers, filterTeam, searchQuery, sortBy]);

// Memoize comparison data
const comparisonData = useMemo(() => {
  return selectedDrivers.map(name => 
    drivers.find(d => d.name === name)
  );
}, [selectedDrivers, drivers]);
```

### 10.2 Virtualization (for large datasets)

```typescript
// If driver list becomes very large (20+), consider virtualization

import { FixedSizeList } from 'react-window';

const VirtualizedDriverTable: React.FC<Props> = ({ drivers }) => {
  const Row = ({ index, style }: any) => (
    <div style={style}>
      <DriverRow driver={drivers[index]} />
    </div>
  );
  
  return (
    <FixedSizeList
      height={600}
      itemCount={drivers.length}
      itemSize={80}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
};
```

### 10.3 Lazy Loading Chart

```typescript
// Only load Recharts when needed

import { lazy, Suspense } from 'react';

const PointsProgressionChart = lazy(() => 
  import('../components/drivers/PointsProgressionChart')
);

// In component:
{selectedDrivers.length > 0 && (
  <Suspense fallback={<ChartLoadingSpinner />}>
    <PointsProgressionChart {...props} />
  </Suspense>
)}
```

### 10.4 Backend Caching

```java
// Redis caching configuration

@Configuration
@EnableCaching
public class CacheConfig {
    
    @Bean
    public RedisCacheManager cacheManager(RedisConnectionFactory connectionFactory) {
        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
            .entryTtl(Duration.ofMinutes(10))  // Cache for 10 minutes
            .serializeValuesWith(
                RedisSerializationContext.SerializationPair.fromSerializer(
                    new GenericJackson2JsonRedisSerializer()
                )
            );
        
        return RedisCacheManager.builder(connectionFactory)
            .cacheDefaults(config)
            .build();
    }
}
```

---

## 11. Responsive Design

### 11.1 Mobile Breakpoints

```typescript
// Tailwind breakpoints
const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
};
```

### 11.2 Mobile Table Adaptation

```typescript
// On mobile, convert table to cards

const mobileTableSpec = {
  // Hide table below md breakpoint
  table: {
    display: {
      mobile: 'none',
      desktop: 'table',
    },
  },
  
  // Show cards on mobile
  mobileCards: {
    display: {
      mobile: 'grid',
      desktop: 'none',
    },
    gridTemplateColumns: '1fr',
    gap: '1rem',
  },
};
```

### 11.3 Mobile Filters

```typescript
// Stack filters vertically on mobile

const mobileFiltersSpec = {
  grid: {
    gridTemplateColumns: {
      mobile: '1fr',
      tablet: 'repeat(2, 1fr)',
      desktop: 'repeat(4, 1fr)',
    },
  },
};
```

---

## 12. Accessibility

### 12.1 ARIA Labels

```typescript
// All interactive elements need ARIA labels

<button
  onClick={() => toggleDriverSelection(driver.name)}
  aria-label={`Select ${driver.name} for comparison`}
  aria-pressed={selectedDrivers.includes(driver.name)}
>
  {/* Button content */}
</button>

<input
  type="checkbox"
  checked={selectedDrivers.includes(driver.name)}
  onChange={() => toggleDriverSelection(driver.name)}
  aria-label={`Compare ${driver.name}`}
  disabled={isCheckboxDisabled(driver.name, selectedDrivers)}
/>
```

### 12.2 Keyboard Navigation

```typescript
// Ensure all interactive elements are keyboard accessible

const handleKeyPress = (event: React.KeyboardEvent, driver: Driver) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    toggleDriverSelection(driver.name);
  }
};

<tr
  onClick={() => toggleDriverSelection(driver.name)}
  onKeyPress={(e) => handleKeyPress(e, driver)}
  tabIndex={0}
  role="button"
>
  {/* Row content */}
</tr>
```

### 12.3 Color Contrast

```typescript
// Ensure WCAG AA compliance (4.5:1 ratio)

// Text on dark background
const textContrast = {
  primary: '#ffffff',    // White on dark gray: ~14:1 ✓
  secondary: '#fef08a',  // Light yellow on dark gray: ~9:1 ✓
  tertiary: '#9ca3af',   // Medium gray on dark gray: ~4.7:1 ✓
};

// Form badges
const badgeContrast = {
  win: { bg: '#22c55e', text: '#ffffff' },     // 4.8:1 ✓
  podium: { bg: '#3b82f6', text: '#ffffff' },  // 5.2:1 ✓
  points: { bg: '#eab308', text: '#000000' },  // 11.1:1 ✓
  dnf: { bg: '#ef4444', text: '#ffffff' },     // 5.9:1 ✓
};
```

---

## 13. Testing Requirements

### 13.1 Unit Tests

```typescript
// Example unit tests

describe('Driver Selection Logic', () => {
  it('should add driver when under limit', () => {
    const selected = ['Driver A'];
    const result = toggleSelection('Driver B', selected);
    expect(result).toEqual(['Driver A', 'Driver B']);
  });
  
  it('should not add driver when at limit', () => {
    const selected = ['Driver A', 'Driver B', 'Driver C'];
    const result = toggleSelection('Driver D', selected);
    expect(result).toEqual(['Driver A', 'Driver B', 'Driver C']);
  });
  
  it('should remove driver when already selected', () => {
    const selected = ['Driver A', 'Driver B'];
    const result = toggleSelection('Driver A', selected);
    expect(result).toEqual(['Driver B']);
  });
});

describe('Form Badge Style', () => {
  it('should return win style for position 1', () => {
    const style = getFormBadgeStyle(1);
    expect(style.backgroundColor).toBe(colors.status.win);
  });
  
  it('should return DNF style for DNF position', () => {
    const style = getFormBadgeStyle('DNF');
    expect(style.text).toBe('DNF');
  });
});
```

### 13.2 Integration Tests

```java
// Example integration test

@SpringBootTest
@AutoConfigureMockMvc
class DriversControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @Test
    void getAllDrivers_ShouldReturnDriversList() throws Exception {
        mockMvc.perform(get("/api/v1/drivers"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$[0].name").exists())
            .andExpect(jsonPath("$[0].points").exists());
    }
    
    @Test
    void getAllDrivers_WithTeamFilter_ShouldReturnFilteredList() throws Exception {
        mockMvc.perform(get("/api/v1/drivers")
                .param("team", "Ferrari"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[*].team", everyItem(is("Ferrari"))));
    }
}
```

### 13.3 E2E Tests

```typescript
// Example Playwright test

test('should select up to 3 drivers for comparison', async ({ page }) => {
  await page.goto('/drivers');
  
  // Select first driver
  await page.click('[data-testid="driver-checkbox-0"]');
  await expect(page.locator('[data-testid="selected-count"]')).toHaveText('1/3');
  
  // Select second driver
  await page.click('[data-testid="driver-checkbox-1"]');
  await expect(page.locator('[data-testid="selected-count"]')).toHaveText('2/3');
  
  // Select third driver
  await page.click('[data-testid="driver-checkbox-2"]');
  await expect(page.locator('[data-testid="selected-count"]')).toHaveText('3/3');
  
  // Verify 4th checkbox is disabled
  await expect(page.locator('[data-testid="driver-checkbox-3"]')).toBeDisabled();
  
  // Verify comparison chart is visible
  await expect(page.locator('[data-testid="points-progression-chart"]')).toBeVisible();
});
```

---

## 14. Deployment Checklist

- [ ] Environment variables configured
- [ ] API endpoints secured
- [ ] CORS configured
- [ ] Database migrations run
- [ ] Redis cache configured
- [ ] Static assets optimized
- [ ] Error monitoring (Sentry) configured
- [ ] Analytics integrated
- [ ] Performance monitoring enabled
- [ ] Accessibility audit passed
- [ ] Cross-browser testing completed
- [ ] Mobile responsiveness verified
- [ ] Load testing completed
- [ ] API rate limiting configured

---

## 15. Future Enhancements

### Phase 2 Features
1. **Driver Detail Modal** - Click driver row for deep dive
2. **Export Comparison** - Download as PDF/CSV
3. **Share Links** - Generate shareable comparison URLs
4. **Advanced Filters** - Nationality, rookie status, etc.
5. **Historical Comparison** - Compare to previous seasons

### Phase 3 Features
1. **Live Updates** - Real-time during race weekends
2. **Notifications** - Alerts for milestone achievements
3. **Custom Metrics** - User-defined stat calculations
4. **Social Integration** - Share to social media
5. **Mobile App** - Native iOS/Android version

---

**Document End**

For questions or clarifications, contact the product team.