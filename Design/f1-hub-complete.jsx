import React, { useState } from 'react';
import { 
  Search, Trophy, Flag, Calendar, MapPin, Clock, Mountain, Gauge, 
  BarChart3, Filter, Download, Settings, Medal, Star, Globe, Menu, 
  Timer, ThermometerSun, Palette, Layout, Grid3x3, Sidebar as SidebarIcon, 
  Users, Zap, Target, TrendingUp, TrendingDown, Award, ChevronRight,
  PlayCircle, CheckCircle, Circle, User, Home, BarChart2, Map
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, Radar, Cell
} from 'recharts';

const F1HubMockup = () => {
  const [theme, setTheme] = useState('bold');
  const [viewMode, setViewMode] = useState('dashboard');
  const [activePage, setActivePage] = useState('schedule');
  const [sortBy, setSortBy] = useState('points');
  const [filterTeam, setFilterTeam] = useState('all');

  // Data
  const pointsData = [
    { race: 'R16', VER: 315, NOR: 265, LEC: 252, PIA: 222 },
    { race: 'R17', VER: 331, NOR: 279, LEC: 264, PIA: 229 },
    { race: 'R18', VER: 345, NOR: 291, LEC: 275, PIA: 237 },
    { race: 'R19', VER: 362, NOR: 307, LEC: 289, PIA: 247 },
    { race: 'R20', VER: 377, NOR: 318, LEC: 295, PIA: 254 },
    { race: 'R21', VER: 393, NOR: 331, LEC: 307, PIA: 262 },
  ];

  const drivers = [
    { 
      pos: 1, name: 'Max Verstappen', team: 'Red Bull Racing', points: 393, gap: 0, 
      color: '#3671C6', nat: '🇳🇱', wins: 8, podiums: 14, poles: 9, fastestLaps: 5,
      avgPosition: 2.1, nationality: 'Dutch', number: 1, teamColor: '#3671C6'
    },
    { 
      pos: 2, name: 'Lando Norris', team: 'McLaren', points: 331, gap: -62, 
      color: '#FF8000', nat: '🇬🇧', wins: 3, podiums: 12, poles: 4, fastestLaps: 6,
      avgPosition: 3.4, nationality: 'British', number: 4, teamColor: '#FF8000'
    },
    { 
      pos: 3, name: 'Charles Leclerc', team: 'Ferrari', points: 307, gap: -86, 
      color: '#E8002D', nat: '🇲🇨', wins: 2, podiums: 11, poles: 5, fastestLaps: 4,
      avgPosition: 3.8, nationality: 'Monégasque', number: 16, teamColor: '#E8002D'
    },
    { 
      pos: 4, name: 'Oscar Piastri', team: 'McLaren', points: 262, gap: -131, 
      color: '#FF8000', nat: '🇦🇺', wins: 2, podiums: 8, poles: 1, fastestLaps: 2,
      avgPosition: 4.2, nationality: 'Australian', number: 81, teamColor: '#FF8000'
    },
    { 
      pos: 5, name: 'Carlos Sainz', team: 'Ferrari', points: 244, gap: -149, 
      color: '#E8002D', nat: '🇪🇸', wins: 1, podiums: 9, poles: 2, fastestLaps: 3,
      avgPosition: 4.8, nationality: 'Spanish', number: 55, teamColor: '#E8002D'
    },
    { 
      pos: 6, name: 'George Russell', team: 'Mercedes', points: 192, gap: -201, 
      color: '#27F4D2', nat: '🇬🇧', wins: 1, podiums: 6, poles: 3, fastestLaps: 2,
      avgPosition: 5.3, nationality: 'British', number: 63, teamColor: '#27F4D2'
    },
    { 
      pos: 7, name: 'Lewis Hamilton', team: 'Mercedes', points: 190, gap: -203, 
      color: '#27F4D2', nat: '🇬🇧', wins: 2, podiums: 7, poles: 1, fastestLaps: 4,
      avgPosition: 5.6, nationality: 'British', number: 44, teamColor: '#27F4D2'
    },
    { 
      pos: 8, name: 'Sergio Perez', team: 'Red Bull Racing', points: 152, gap: -241, 
      color: '#3671C6', nat: '🇲🇽', wins: 0, podiums: 4, poles: 0, fastestLaps: 1,
      avgPosition: 7.2, nationality: 'Mexican', number: 11, teamColor: '#3671C6'
    },
  ];

  const teams = [
    { 
      pos: 1, name: 'McLaren', points: 593, gap: 0, color: '#FF8000',
      drivers: ['L. Norris', 'O. Piastri'], wins: 5, podiums: 20, poles: 5
    },
    { 
      pos: 2, name: 'Ferrari', points: 551, gap: -42, color: '#E8002D',
      drivers: ['C. Leclerc', 'C. Sainz'], wins: 3, podiums: 20, poles: 7
    },
    { 
      pos: 3, name: 'Red Bull Racing', points: 545, gap: -48, color: '#3671C6',
      drivers: ['M. Verstappen', 'S. Perez'], wins: 8, podiums: 18, poles: 9
    },
    { 
      pos: 4, name: 'Mercedes', points: 382, gap: -211, color: '#27F4D2',
      drivers: ['L. Hamilton', 'G. Russell'], wins: 3, podiums: 13, poles: 4
    },
    { 
      pos: 5, name: 'Aston Martin', points: 86, gap: -507, color: '#229971',
      drivers: ['F. Alonso', 'L. Stroll'], wins: 0, podiums: 1, poles: 0
    },
    { 
      pos: 6, name: 'Alpine', points: 49, gap: -544, color: '#FF87BC',
      drivers: ['P. Gasly', 'E. Ocon'], wins: 0, podiums: 0, poles: 0
    },
  ];

  const upcomingRaces = [
    { 
      round: 22, name: 'Las Vegas GP', date: 'Nov 23-24', 
      circuit: 'Las Vegas Street Circuit', country: 'USA', flag: '🇺🇸',
      trackTime: 'PST (UTC-8)', yourTime: 'EST (UTC-5)',
      fp1: { track: 'Thu 8:30 PM', your: 'Thu 11:30 PM' },
      fp2: { track: 'Fri 12:00 AM', your: 'Fri 3:00 AM' },
      fp3: { track: 'Fri 8:30 PM', your: 'Fri 11:30 PM' },
      qualifying: { track: 'Sat 12:00 AM', your: 'Sat 3:00 AM' },
      race: { track: 'Sat 10:00 PM', your: 'Sun 1:00 AM' },
      distance: '6.120 km', laps: 50, raceDistance: '306.0 km',
      elevation: '620m', corners: 17, drsZones: 2, topSpeed: '342 km/h',
      lapRecord: '1:35.490', recordHolder: 'M. Verstappen',
      weather: '18°C, Clear', difficulty: 3, overtaking: 4,
      countdown: '7d 14h 23m'
    },
    { 
      round: 23, name: 'Qatar GP', date: 'Nov 29 - Dec 1', 
      circuit: 'Lusail International Circuit', country: 'Qatar', flag: '🇶🇦',
      trackTime: 'AST (UTC+3)', yourTime: 'EST (UTC-5)',
      fp1: { track: 'Fri 1:30 PM', your: 'Fri 5:30 AM' },
      fp2: { track: 'Fri 5:00 PM', your: 'Fri 9:00 AM' },
      fp3: { track: 'Sat 2:30 PM', your: 'Sat 6:30 AM' },
      qualifying: { track: 'Sat 6:00 PM', your: 'Sat 10:00 AM' },
      race: { track: 'Sun 3:00 PM', your: 'Sun 7:00 AM' },
      distance: '5.380 km', laps: 57, raceDistance: '306.7 km',
      elevation: '10m', corners: 16, drsZones: 2, topSpeed: '335 km/h',
      lapRecord: '1:24.319', recordHolder: 'M. Verstappen',
      weather: '22°C, Partly Cloudy', difficulty: 2, overtaking: 3,
      countdown: '14d 9h 30m'
    },
    { 
      round: 24, name: 'Abu Dhabi GP', date: 'Dec 6-8', 
      circuit: 'Yas Marina Circuit', country: 'UAE', flag: '🇦🇪',
      trackTime: 'GST (UTC+4)', yourTime: 'EST (UTC-5)',
      fp1: { track: 'Fri 1:30 PM', your: 'Fri 4:30 AM' },
      fp2: { track: 'Fri 5:00 PM', your: 'Fri 8:00 AM' },
      fp3: { track: 'Sat 2:30 PM', your: 'Sat 5:30 AM' },
      qualifying: { track: 'Sat 6:00 PM', your: 'Sat 9:00 AM' },
      race: { track: 'Sun 1:00 PM', your: 'Sun 4:00 AM' },
      distance: '5.281 km', laps: 58, raceDistance: '306.2 km',
      elevation: '5m', corners: 16, drsZones: 2, topSpeed: '340 km/h',
      lapRecord: '1:26.103', recordHolder: 'M. Verstappen',
      weather: '24°C, Clear', difficulty: 2, overtaking: 3,
      countdown: '21d 6h 15m'
    },
  ];

  const pastRaces = [
    { round: 21, name: 'Brazil GP', winner: 'M. Verstappen', team: 'Red Bull', date: 'Nov 3', flag: '🇧🇷' },
    { round: 20, name: 'Mexico GP', winner: 'C. Sainz', team: 'Ferrari', date: 'Oct 27', flag: '🇲🇽' },
    { round: 19, name: 'USA GP', winner: 'C. Leclerc', team: 'Ferrari', date: 'Oct 20', flag: '🇺🇸' },
    { round: 18, name: 'Singapore GP', winner: 'L. Norris', team: 'McLaren', date: 'Sep 22', flag: '🇸🇬' },
  ];

  const circuits = [
    {
      name: 'Las Vegas Street Circuit',
      country: 'USA',
      flag: '🇺🇸',
      length: '6.120 km',
      corners: 17,
      topSpeed: '342 km/h',
      difficulty: 3,
      overtaking: 4,
      lapRecord: '1:35.490',
      recordHolder: 'M. Verstappen',
      firstRace: 2023,
      type: 'Street Circuit'
    },
    {
      name: 'Lusail International Circuit',
      country: 'Qatar',
      flag: '🇶🇦',
      length: '5.380 km',
      corners: 16,
      topSpeed: '335 km/h',
      difficulty: 2,
      overtaking: 3,
      lapRecord: '1:24.319',
      recordHolder: 'M. Verstappen',
      firstRace: 2021,
      type: 'Permanent Circuit'
    },
    {
      name: 'Yas Marina Circuit',
      country: 'UAE',
      flag: '🇦🇪',
      length: '5.281 km',
      corners: 16,
      topSpeed: '340 km/h',
      difficulty: 2,
      overtaking: 3,
      lapRecord: '1:26.103',
      recordHolder: 'M. Verstappen',
      firstRace: 2009,
      type: 'Permanent Circuit'
    },
  ];

  const themes = {
    bold: {
      name: 'Bold & Dramatic',
      bg: 'bg-black',
      cardBg: 'bg-gradient-to-br from-gray-900 to-black',
      headerBg: 'bg-gradient-to-r from-red-600 via-red-700 to-black',
      textPrimary: 'text-white',
      textSecondary: 'text-gray-400',
      cardBorder: 'border-gray-800',
      hoverBg: 'hover:bg-gray-800'
    },
    minimalist: {
      name: 'Minimalist Premium',
      bg: 'bg-gray-50',
      cardBg: 'bg-white',
      headerBg: 'bg-white',
      textPrimary: 'text-gray-900',
      textSecondary: 'text-gray-500',
      cardBorder: 'border-gray-200',
      hoverBg: 'hover:bg-gray-50'
    },
    classic: {
      name: 'Classic Racing',
      bg: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900',
      cardBg: 'bg-gradient-to-br from-yellow-900/20 to-gray-900',
      headerBg: 'bg-gradient-to-r from-yellow-600 to-gray-900',
      textPrimary: 'text-white',
      textSecondary: 'text-yellow-200',
      cardBorder: 'border-yellow-900/50',
      hoverBg: 'hover:bg-yellow-900/10'
    },
    glass: {
      name: 'Glassmorphism',
      bg: 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900',
      cardBg: 'bg-white/10 backdrop-blur-xl',
      headerBg: 'bg-white/10 backdrop-blur-xl',
      textPrimary: 'text-white',
      textSecondary: 'text-purple-200',
      cardBorder: 'border-white/20',
      hoverBg: 'hover:bg-white/20'
    }
  };

  const t = themes[theme];

  const navItems = [
    { id: 'schedule', name: 'Schedule', icon: Calendar },
    { id: 'standings', name: 'Standings', icon: Trophy },
    { id: 'drivers', name: 'Drivers', icon: User },
    { id: 'teams', name: 'Teams', icon: Users },
    { id: 'circuits', name: 'Circuits', icon: Map },
    { id: 'statistics', name: 'Statistics', icon: BarChart2 },
  ];

  const renderSidebar = () => (
    <div className={`w-64 ${t.cardBg} ${t.cardBorder} border-r p-6 flex flex-col h-screen`}>
      <div className="flex items-center gap-3 mb-8">
        <Flag className={`w-8 h-8 ${theme === 'minimalist' ? 'text-gray-900' : 'text-red-500'}`} />
        <div>
          <div className={`text-xl font-black ${t.textPrimary}`}>F1 HUB</div>
          <div className={`text-xs ${t.textSecondary}`}>2024 Season</div>
        </div>
      </div>

      <nav className="space-y-2 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg font-semibold text-sm transition-all flex items-center gap-3 ${
                activePage === item.id 
                  ? 'bg-red-600 text-white' 
                  : `${t.textSecondary} ${t.hoverBg}`
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </button>
          );
        })}
      </nav>

      <div className={`${theme === 'minimalist' ? 'bg-gray-100' : 'bg-white/5'} rounded-lg p-4 mt-4`}>
        <div className={`text-xs ${t.textSecondary} mb-1`}>Next Race</div>
        <div className={`text-2xl font-black ${t.textPrimary}`}>7d 14h</div>
        <div className={`text-xs ${t.textSecondary}`}>Las Vegas GP</div>
      </div>
    </div>
  );

  const renderTabs = () => (
    <div className={`${t.headerBg} ${t.cardBorder} border-b`}>
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center gap-4 mb-6">
          <Flag className={`w-10 h-10 ${theme === 'minimalist' ? 'text-gray-900' : 'text-white'}`} />
          <div>
            <h1 className={`text-3xl font-black ${t.textPrimary}`}>F1 CHAMPIONSHIP HUB</h1>
            <p className={t.textSecondary}>2024 Season • 21/24 Races</p>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`px-6 py-3 rounded-t-lg font-semibold whitespace-nowrap flex items-center gap-2 transition-all ${
                  activePage === item.id 
                    ? `${t.cardBg} ${t.textPrimary} ${t.cardBorder} border-b-0` 
                    : `${t.textSecondary} ${t.hoverBg}`
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  // SCHEDULE PAGE
  const SchedulePage = () => (
    <div className="space-y-6">
      {/* Hero Next Race Card */}
      <div className={`${t.headerBg} ${t.cardBorder} border rounded-3xl p-8 shadow-2xl`}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className={`text-sm ${t.textSecondary} mb-2 flex items-center gap-2`}>
              <Circle className="w-3 h-3 fill-red-500 text-red-500 animate-pulse" />
              NEXT RACE • ROUND 22
            </div>
            <h1 className={`text-5xl font-black ${t.textPrimary} mb-2`}>
              {upcomingRaces[0].flag} {upcomingRaces[0].name}
            </h1>
            <p className={`text-xl ${t.textSecondary}`}>{upcomingRaces[0].circuit}</p>
          </div>
          <div className="text-right">
            <div className={`text-sm ${t.textSecondary} mb-1`}>Race Starts In</div>
            <div className={`text-4xl font-black ${t.textPrimary}`}>{upcomingRaces[0].countdown}</div>
            <div className={`text-sm ${t.textSecondary} mt-2`}>{upcomingRaces[0].date}</div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className={`${theme === 'minimalist' ? 'bg-gray-100' : 'bg-white/5'} rounded-xl p-4`}>
            <Clock className={`w-6 h-6 ${t.textSecondary} mb-2`} />
            <div className={`text-xs ${t.textSecondary}`}>Your Time</div>
            <div className={`text-lg font-bold ${t.textPrimary}`}>{upcomingRaces[0].race.your}</div>
          </div>
          <div className={`${theme === 'minimalist' ? 'bg-gray-100' : 'bg-white/5'} rounded-xl p-4`}>
            <ThermometerSun className={`w-6 h-6 ${t.textSecondary} mb-2`} />
            <div className={`text-xs ${t.textSecondary}`}>Weather</div>
            <div className={`text-lg font-bold ${t.textPrimary}`}>{upcomingRaces[0].weather}</div>
          </div>
          <div className={`${theme === 'minimalist' ? 'bg-gray-100' : 'bg-white/5'} rounded-xl p-4`}>
            <Gauge className={`w-6 h-6 ${t.textSecondary} mb-2`} />
            <div className={`text-xs ${t.textSecondary}`}>Circuit Length</div>
            <div className={`text-lg font-bold ${t.textPrimary}`}>{upcomingRaces[0].distance}</div>
          </div>
          <div className={`${theme === 'minimalist' ? 'bg-gray-100' : 'bg-white/5'} rounded-xl p-4`}>
            <Zap className={`w-6 h-6 ${t.textSecondary} mb-2`} />
            <div className={`text-xs ${t.textSecondary}`}>Top Speed</div>
            <div className={`text-lg font-bold ${t.textPrimary}`}>{upcomingRaces[0].topSpeed}</div>
          </div>
        </div>

        {/* Session Schedule */}
        <div className={`${theme === 'minimalist' ? 'bg-gray-100' : 'bg-white/5'} rounded-xl p-6`}>
          <h3 className={`text-lg font-bold ${t.textPrimary} mb-4`}>Weekend Schedule</h3>
          <div className="space-y-3">
            {[
              { name: 'Free Practice 1', ...upcomingRaces[0].fp1 },
              { name: 'Free Practice 2', ...upcomingRaces[0].fp2 },
              { name: 'Free Practice 3', ...upcomingRaces[0].fp3 },
              { name: 'Qualifying', ...upcomingRaces[0].qualifying },
              { name: 'Race', ...upcomingRaces[0].race },
            ].map((session, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
                <div className={`font-semibold ${t.textPrimary} flex items-center gap-3`}>
                  {idx === 4 ? <PlayCircle className="w-5 h-5 text-red-500" /> : <Circle className="w-4 h-4 text-gray-500" />}
                  {session.name}
                </div>
                <div className="flex gap-8 text-sm">
                  <div>
                    <span className={t.textSecondary}>Track: </span>
                    <span className={t.textPrimary}>{session.track}</span>
                  </div>
                  <div>
                    <span className={t.textSecondary}>Your Time: </span>
                    <span className={`font-bold ${t.textPrimary}`}>{session.your}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 px-4 py-3 bg-red-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2">
            <Download className="w-5 h-5" />
            Export to Calendar
          </button>
        </div>
      </div>

      {/* Upcoming Races */}
      <div className={`${t.cardBg} ${t.cardBorder} border rounded-2xl p-6 shadow-xl`}>
        <h2 className={`text-2xl font-bold ${t.textPrimary} mb-4`}>Remaining Races ({upcomingRaces.length})</h2>
        <div className="space-y-3">
          {upcomingRaces.map((race) => (
            <div key={race.round} className={`${theme === 'minimalist' ? 'bg-gray-50' : 'bg-white/5'} rounded-xl p-5 ${t.hoverBg} transition-all cursor-pointer`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`${theme === 'minimalist' ? 'bg-gray-200' : 'bg-white/10'} rounded-lg px-4 py-3 text-center`}>
                    <div className={`text-xs ${t.textSecondary}`}>R{race.round}</div>
                    <div className={`text-2xl font-black ${t.textPrimary}`}>{race.flag}</div>
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${t.textPrimary}`}>{race.name}</h3>
                    <p className={`text-sm ${t.textSecondary}`}>{race.circuit}</p>
                    <div className="flex items-center gap-4 mt-1 text-xs">
                      <span className={t.textSecondary}>{race.date}</span>
                      <span className={t.textSecondary}>•</span>
                      <span className={t.textSecondary}>{race.laps} laps</span>
                      <span className={t.textSecondary}>•</span>
                      <span className={t.textSecondary}>{race.raceDistance}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm ${t.textSecondary} mb-1`}>Race Time (Your TZ)</div>
                  <div className={`text-lg font-bold ${t.textPrimary}`}>{race.race.your}</div>
                  <div className={`text-xs ${t.textSecondary} mt-1`}>{race.countdown}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Races */}
      <div className={`${t.cardBg} ${t.cardBorder} border rounded-2xl p-6 shadow-xl`}>
        <h2 className={`text-2xl font-bold ${t.textPrimary} mb-4`}>Recent Results</h2>
        <div className="grid grid-cols-2 gap-3">
          {pastRaces.map((race) => (
            <div key={race.round} className={`${theme === 'minimalist' ? 'bg-gray-50' : 'bg-white/5'} rounded-xl p-4`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm ${t.textSecondary}`}>{race.flag} Round {race.round}</span>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <h4 className={`font-bold ${t.textPrimary} mb-1`}>{race.name}</h4>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className={`text-sm ${t.textPrimary}`}>{race.winner}</span>
                <span className={`text-xs ${t.textSecondary}`}>• {race.team}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // STANDINGS PAGE
  const StandingsPage = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className={`text-3xl font-black ${t.textPrimary}`}>Championship Standings</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold">Drivers</button>
          <button className={`px-4 py-2 ${theme === 'minimalist' ? 'bg-gray-100' : 'bg-white/5'} ${t.textPrimary} rounded-lg font-semibold`}>Constructors</button>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-4">
        {drivers.slice(0, 3).map((driver, idx) => (
          <div 
            key={driver.pos}
            className={`${t.cardBg} ${t.cardBorder} border rounded-2xl p-6 shadow-xl text-center ${
              idx === 0 ? 'ring-4 ring-yellow-500 transform scale-105' : ''
            }`}
          >
            {idx === 0 && <Medal className="w-12 h-12 text-yellow-500 mx-auto mb-3" />}
            {idx === 1 && <Medal className="w-10 h-10 text-gray-400 mx-auto mb-3" />}
            {idx === 2 && <Medal className="w-8 h-8 text-orange-600 mx-auto mb-3" />}
            
            <div className={`text-6xl mb-3`}>{driver.nat}</div>
            <h3 className={`text-2xl font-black ${t.textPrimary} mb-1`}>{driver.name}</h3>
            <p className={`text-sm ${t.textSecondary} mb-4`}>{driver.team}</p>
            
            <div className={`text-5xl font-black ${t.textPrimary} mb-2`}>{driver.points}</div>
            <div className={`text-sm ${t.textSecondary}`}>
              {driver.gap === 0 ? 'Championship Leader' : `${Math.abs(driver.gap)} pts behind`}
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/10">
              <div>
                <Trophy className={`w-4 h-4 ${t.textSecondary} mx-auto mb-1`} />
                <div className={`text-lg font-bold ${t.textPrimary}`}>{driver.wins}</div>
                <div className={`text-xs ${t.textSecondary}`}>Wins</div>
              </div>
              <div>
                <Award className={`w-4 h-4 ${t.textSecondary} mx-auto mb-1`} />
                <div className={`text-lg font-bold ${t.textPrimary}`}>{driver.podiums}</div>
                <div className={`text-xs ${t.textSecondary}`}>Podiums</div>
              </div>
              <div>
                <Star className={`w-4 h-4 ${t.textSecondary} mx-auto mb-1`} />
                <div className={`text-lg font-bold ${t.textPrimary}`}>{driver.poles}</div>
                <div className={`text-xs ${t.textSecondary}`}>Poles</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Standings Table */}
      <div className={`${t.cardBg} ${t.cardBorder} border rounded-2xl p-6 shadow-xl`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-xl font-bold ${t.textPrimary}`}>Full Standings</h2>
          <select className={`${theme === 'minimalist' ? 'bg-gray-100' : 'bg-white/5'} ${t.cardBorder} border rounded-lg px-4 py-2 ${t.textPrimary}`}>
            <option>Sort by Points</option>
            <option>Sort by Name</option>
            <option>Sort by Team</option>
          </select>
        </div>

        <div className="space-y-2">
          {drivers.map((driver) => (
            <div key={driver.pos} className={`${theme === 'minimalist' ? 'bg-gray-50' : 'bg-white/5'} rounded-xl p-4 ${t.hoverBg} transition-all`}>
              <div className="flex items-center gap-4">
                <div className={`text-2xl font-black ${driver.pos <= 3 ? 'text-yellow-500' : t.textSecondary} w-8`}>
                  {driver.pos}
                </div>
                <div className="w-1 h-12 rounded-full" style={{ backgroundColor: driver.color }}></div>
                <div className="flex-1">
                  <div className={`font-bold ${t.textPrimary} flex items-center gap-2`}>
                    <span>{driver.nat}</span>
                    <span>{driver.name}</span>
                    <span className={`text-xs ${t.textSecondary}`}>#{driver.number}</span>
                  </div>
                  <div className={`text-sm ${t.textSecondary}`}>{driver.team}</div>
                </div>
                <div className="grid grid-cols-4 gap-6 text-center">
                  <div>
                    <div className={`text-sm ${t.textSecondary}`}>Wins</div>
                    <div className={`text-lg font-bold ${t.textPrimary}`}>{driver.wins}</div>
                  </div>
                  <div>
                    <div className={`text-sm ${t.textSecondary}`}>Podiums</div>
                    <div className={`text-lg font-bold ${t.textPrimary}`}>{driver.podiums}</div>
                  </div>
                  <div>
                    <div className={`text-sm ${t.textSecondary}`}>Avg Pos</div>
                    <div className={`text-lg font-bold ${t.textPrimary}`}>{driver.avgPosition}</div>
                  </div>
                  <div>
                    <div className={`text-sm ${t.textSecondary}`}>Points</div>
                    <div className={`text-2xl font-black ${t.textPrimary}`}>{driver.points}</div>
                  </div>
                </div>
              </div>
              <div className={`mt-3 h-2 ${theme === 'minimalist' ? 'bg-gray-200' : 'bg-white/10'} rounded-full overflow-hidden`}>
                <div 
                  className="h-full rounded-full"
                  style={{ 
                    width: `${(driver.points / drivers[0].points) * 100}%`,
                    backgroundColor: driver.color
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Points Progression Chart */}
      <div className={`${t.cardBg} ${t.cardBorder} border rounded-2xl p-6 shadow-xl`}>
        <h2 className={`text-xl font-bold ${t.textPrimary} mb-4`}>Points Progression</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={pointsData}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme === 'minimalist' ? '#e5e7eb' : '#374151'} />
            <XAxis dataKey="race" stroke={theme === 'minimalist' ? '#6b7280' : '#9ca3af'} />
            <YAxis stroke={theme === 'minimalist' ? '#6b7280' : '#9ca3af'} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: theme === 'minimalist' ? '#fff' : '#1f2937',
                border: `1px solid ${theme === 'minimalist' ? '#e5e7eb' : '#374151'}`,
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="VER" stroke="#3671C6" strokeWidth={3} name="Verstappen" />
            <Line type="monotone" dataKey="NOR" stroke="#FF8000" strokeWidth={3} name="Norris" />
            <Line type="monotone" dataKey="LEC" stroke="#E8002D" strokeWidth={3} name="Leclerc" />
            <Line type="monotone" dataKey="PIA" stroke="#FF8000" strokeWidth={2} strokeDasharray="5 5" name="Piastri" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  // DRIVERS PAGE
  const DriversPage = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className={`text-3xl font-black ${t.textPrimary}`}>Driver Profiles</h1>
        <div className="flex gap-2">
          <select className={`${theme === 'minimalist' ? 'bg-gray-100' : 'bg-white/5'} ${t.cardBorder} border rounded-lg px-4 py-2 ${t.textPrimary}`}>
            <option>All Teams</option>
            <option>Red Bull</option>
            <option>Ferrari</option>
            <option>McLaren</option>
            <option>Mercedes</option>
          </select>
          <select className={`${theme === 'minimalist' ? 'bg-gray-100' : 'bg-white/5'} ${t.cardBorder} border rounded-lg px-4 py-2 ${t.textPrimary}`}>
            <option>All Nationalities</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {drivers.map((driver) => (
          <div key={driver.pos} className={`${t.cardBg} ${t.cardBorder} border rounded-2xl p-6 shadow-xl`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="text-6xl">{driver.nat}</div>
                <div>
                  <div className={`text-xs ${t.textSecondary} mb-1`}>#{driver.number}</div>
                  <h3 className={`text-2xl font-black ${t.textPrimary}`}>{driver.name}</h3>
                  <p className={`text-sm ${t.textSecondary}`}>{driver.nationality}</p>
                </div>
              </div>
              <div className={`text-3xl font-black ${driver.pos <= 3 ? 'text-yellow-500' : t.textSecondary}`}>
                P{driver.pos}
              </div>
            </div>

            <div className={`${theme === 'minimalist' ? 'bg-gray-50' : 'bg-white/5'} rounded-xl p-4 mb-4`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: driver.color }}></div>
                <span className={`font-bold ${t.textPrimary}`}>{driver.team}</span>
              </div>
              <div className={`text-2xl font-black ${t.textPrimary} mb-1`}>{driver.points} pts</div>
              <div className={`text-sm ${t.textSecondary}`}>
                {driver.gap === 0 ? 'Championship Leader' : `${Math.abs(driver.gap)} pts behind leader`}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3">
              <div className="text-center">
                <Trophy className={`w-5 h-5 ${t.textSecondary} mx-auto mb-1`} />
                <div className={`text-xl font-bold ${t.textPrimary}`}>{driver.wins}</div>
                <div className={`text-xs ${t.textSecondary}`}>Wins</div>
              </div>
              <div className="text-center">
                <Award className={`w-5 h-5 ${t.textSecondary} mx-auto mb-1`} />
                <div className={`text-xl font-bold ${t.textPrimary}`}>{driver.podiums}</div>
                <div className={`text-xs ${t.textSecondary}`}>Podiums</div>
              </div>
              <div className="text-center">
                <Star className={`w-5 h-5 ${t.textSecondary} mx-auto mb-1`} />
                <div className={`text-xl font-bold ${t.textPrimary}`}>{driver.poles}</div>
                <div className={`text-xs ${t.textSecondary}`}>Poles</div>
              </div>
              <div className="text-center">
                <Zap className={`w-5 h-5 ${t.textSecondary} mx-auto mb-1`} />
                <div className={`text-xl font-bold ${t.textPrimary}`}>{driver.fastestLaps}</div>
                <div className={`text-xs ${t.textSecondary}`}>FL</div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex justify-between text-sm">
                <span className={t.textSecondary}>Average Position</span>
                <span className={`font-bold ${t.textPrimary}`}>{driver.avgPosition}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // TEAMS PAGE
  const TeamsPage = () => (
    <div className="space-y-6">
      <h1 className={`text-3xl font-black ${t.textPrimary}`}>Constructor Standings</h1>

      <div className="space-y-4">
        {teams.map((team) => (
          <div key={team.pos} className={`${t.cardBg} ${t.cardBorder} border rounded-2xl p-6 shadow-xl`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className={`text-3xl font-black ${team.pos <= 3 ? 'text-yellow-500' : t.textSecondary}`}>
                  {team.pos}
                </div>
                <div className="w-2 h-16 rounded-full" style={{ backgroundColor: team.color }}></div>
                <div>
                  <h3 className={`text-2xl font-black ${t.textPrimary}`}>{team.name}</h3>
                  <p className={`text-sm ${t.textSecondary}`}>{team.drivers.join(' • ')}</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-4xl font-black ${t.textPrimary}`}>{team.points}</div>
                <div className={`text-sm ${t.textSecondary}`}>
                  {team.gap === 0 ? 'Leader' : `${Math.abs(team.gap)} pts behind`}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className={`${theme === 'minimalist' ? 'bg-gray-50' : 'bg-white/5'} rounded-xl p-4 text-center`}>
                <Trophy className={`w-6 h-6 ${t.textSecondary} mx-auto mb-2`} />
                <div className={`text-2xl font-bold ${t.textPrimary}`}>{team.wins}</div>
                <div className={`text-xs ${t.textSecondary}`}>Wins</div>
              </div>
              <div className={`${theme === 'minimalist' ? 'bg-gray-50' : 'bg-white/5'} rounded-xl p-4 text-center`}>
                <Award className={`w-6 h-6 ${t.textSecondary} mx-auto mb-2`} />
                <div className={`text-2xl font-bold ${t.textPrimary}`}>{team.podiums}</div>
                <div className={`text-xs ${t.textSecondary}`}>Podiums</div>
              </div>
              <div className={`${theme === 'minimalist' ? 'bg-gray-50' : 'bg-white/5'} rounded-xl p-4 text-center`}>
                <Star className={`w-6 h-6 ${t.textSecondary} mx-auto mb-2`} />
                <div className={`text-2xl font-bold ${t.textPrimary}`}>{team.poles}</div>
                <div className={`text-xs ${t.textSecondary}`}>Pole Positions</div>
              </div>
            </div>

            <div className={`mt-4 h-3 ${theme === 'minimalist' ? 'bg-gray-200' : 'bg-white/10'} rounded-full overflow-hidden`}>
              <div 
                className="h-full rounded-full"
                style={{ 
                  width: `${(team.points / teams[0].points) * 100}%`,
                  backgroundColor: team.color
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // CIRCUITS PAGE
  const CircuitsPage = () => (
    <div className="space-y-6">
      <h1 className={`text-3xl font-black ${t.textPrimary}`}>Circuit Guide</h1>

      <div className="space-y-4">
        {circuits.map((circuit, idx) => (
          <div key={idx} className={`${t.cardBg} ${t.cardBorder} border rounded-2xl p-6 shadow-xl`}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className={`text-2xl font-black ${t.textPrimary} flex items-center gap-3`}>
                  {circuit.flag} {circuit.name}
                </h3>
                <p className={`text-sm ${t.textSecondary}`}>{circuit.country} • {circuit.type}</p>
                <p className={`text-xs ${t.textSecondary} mt-1`}>First Race: {circuit.firstRace}</p>
              </div>
              <div className={`${theme === 'minimalist' ? 'bg-gray-100' : 'bg-white/5'} rounded-xl p-6`}>
                <div className="text-center">
                  <div className={`text-4xl ${t.textSecondary} opacity-20 mb-2`}>🏁</div>
                  <div className={`text-xs ${t.textSecondary}`}>Track Map</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-4 mb-4">
              <div className={`${theme === 'minimalist' ? 'bg-gray-50' : 'bg-white/5'} rounded-xl p-4 text-center`}>
                <Gauge className={`w-5 h-5 ${t.textSecondary} mx-auto mb-2`} />
                <div className={`text-lg font-bold ${t.textPrimary}`}>{circuit.length}</div>
                <div className={`text-xs ${t.textSecondary}`}>Length</div>
              </div>
              <div className={`${theme === 'minimalist' ? 'bg-gray-50' : 'bg-white/5'} rounded-xl p-4 text-center`}>
                <Target className={`w-5 h-5 ${t.textSecondary} mx-auto mb-2`} />
                <div className={`text-lg font-bold ${t.textPrimary}`}>{circuit.corners}</div>
                <div className={`text-xs ${t.textSecondary}`}>Corners</div>
              </div>
              <div className={`${theme === 'minimalist' ? 'bg-gray-50' : 'bg-white/5'} rounded-xl p-4 text-center`}>
                <Zap className={`w-5 h-5 ${t.textSecondary} mx-auto mb-2`} />
                <div className={`text-lg font-bold ${t.textPrimary}`}>{circuit.topSpeed}</div>
                <div className={`text-xs ${t.textSecondary}`}>Top Speed</div>
              </div>
              <div className={`${theme === 'minimalist' ? 'bg-gray-50' : 'bg-white/5'} rounded-xl p-4 text-center`}>
                <Award className={`w-5 h-5 ${t.textSecondary} mx-auto mb-2`} />
                <div className={`text-lg font-bold ${t.textPrimary}`}>{circuit.lapRecord}</div>
                <div className={`text-xs ${t.textSecondary}`}>Lap Record</div>
              </div>
              <div className={`${theme === 'minimalist' ? 'bg-gray-50' : 'bg-white/5'} rounded-xl p-4 text-center`}>
                <User className={`w-5 h-5 ${t.textSecondary} mx-auto mb-2`} />
                <div className={`text-sm font-bold ${t.textPrimary}`}>{circuit.recordHolder}</div>
                <div className={`text-xs ${t.textSecondary}`}>Record Holder</div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className={`flex-1 ${theme === 'minimalist' ? 'bg-gray-50' : 'bg-white/5'} rounded-xl p-4`}>
                <div className={`text-sm ${t.textSecondary} mb-2`}>Track Difficulty</div>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className={`w-5 h-5 ${star <= circuit.difficulty ? 'fill-yellow-500 text-yellow-500' : t.textSecondary}`} />
                  ))}
                </div>
              </div>
              <div className={`flex-1 ${theme === 'minimalist' ? 'bg-gray-50' : 'bg-white/5'} rounded-xl p-4`}>
                <div className={`text-sm ${t.textSecondary} mb-2`}>Overtaking Opportunities</div>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className={`w-5 h-5 ${star <= circuit.overtaking ? 'fill-green-500 text-green-500' : t.textSecondary}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // STATISTICS PAGE
  const StatisticsPage = () => (
    <div className="space-y-6">
      <h1 className={`text-3xl font-black ${t.textPrimary}`}>Season Statistics</h1>

      <div className="grid grid-cols-4 gap-4">
        <div className={`${t.cardBg} ${t.cardBorder} border rounded-xl p-6 text-center shadow-xl`}>
          <Trophy className={`w-10 h-10 ${t.textSecondary} mx-auto mb-3`} />
          <div className={`text-4xl font-black ${t.textPrimary} mb-2`}>8</div>
          <div className={`text-sm ${t.textSecondary}`}>Most Wins</div>
          <div className={`text-xs ${t.textPrimary} mt-1`}>M. Verstappen</div>
        </div>
        <div className={`${t.cardBg} ${t.cardBorder} border rounded-xl p-6 text-center shadow-xl`}>
          <Star className={`w-10 h-10 ${t.textSecondary} mx-auto mb-3`} />
          <div className={`text-4xl font-black ${t.textPrimary} mb-2`}>9</div>
          <div className={`text-sm ${t.textSecondary}`}>Most Poles</div>
          <div className={`text-xs ${t.textPrimary} mt-1`}>M. Verstappen</div>
        </div>
        <div className={`${t.cardBg} ${t.cardBorder} border rounded-xl p-6 text-center shadow-xl`}>
          <Award className={`w-10 h-10 ${t.textSecondary} mx-auto mb-3`} />
          <div className={`text-4xl font-black ${t.textPrimary} mb-2`}>14</div>
          <div className={`text-sm ${t.textSecondary}`}>Most Podiums</div>
          <div className={`text-xs ${t.textPrimary} mt-1`}>M. Verstappen</div>
        </div>
        <div className={`${t.cardBg} ${t.cardBorder} border rounded-xl p-6 text-center shadow-xl`}>
          <Zap className={`w-10 h-10 ${t.textSecondary} mx-auto mb-3`} />
          <div className={`text-4xl font-black ${t.textPrimary} mb-2`}>6</div>
          <div className={`text-sm ${t.textSecondary}`}>Fastest Laps</div>
          <div className={`text-xs ${t.textPrimary} mt-1`}>L. Norris</div>
        </div>
      </div>

      <div className={`${t.cardBg} ${t.cardBorder} border rounded-2xl p-6 shadow-xl`}>
        <h2 className={`text-xl font-bold ${t.textPrimary} mb-4`}>Points Per Race Comparison</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={pointsData.slice(-6)}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme === 'minimalist' ? '#e5e7eb' : '#374151'} />
            <XAxis dataKey="race" stroke={theme === 'minimalist' ? '#6b7280' : '#9ca3af'} />
            <YAxis stroke={theme === 'minimalist' ? '#6b7280' : '#9ca3af'} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: theme === 'minimalist' ? '#fff' : '#1f2937',
                border: `1px solid ${theme === 'minimalist' ? '#e5e7eb' : '#374151'}`,
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Bar dataKey="VER" fill="#3671C6" name="Verstappen" />
            <Bar dataKey="NOR" fill="#FF8000" name="Norris" />
            <Bar dataKey="LEC" fill="#E8002D" name="Leclerc" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderPage = () => {
    switch(activePage) {
      case 'schedule': return <SchedulePage />;
      case 'standings': return <StandingsPage />;
      case 'drivers': return <DriversPage />;
      case 'teams': return <TeamsPage />;
      case 'circuits': return <CircuitsPage />;
      case 'statistics': return <StatisticsPage />;
      default: return <SchedulePage />;
    }
  };

  return (
    <div className={`min-h-screen ${t.bg} transition-all duration-500`}>
      {/* Theme & Layout Selectors */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <div className={`${t.cardBg} ${t.cardBorder} border rounded-lg p-2 shadow-2xl`}>
          <div className="flex items-center gap-2 mb-2 px-2">
            <Palette className={`w-4 h-4 ${t.textPrimary}`} />
            <span className={`text-xs font-semibold ${t.textPrimary}`}>THEME</span>
          </div>
          <div className="flex flex-col gap-1">
            {Object.entries(themes).map(([key, themeObj]) => (
              <button
                key={key}
                onClick={() => setTheme(key)}
                className={`px-3 py-2 rounded text-xs font-medium transition-all ${
                  theme === key 
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg' 
                    : `${t.textSecondary} hover:bg-white/5`
                }`}
              >
                {themeObj.name}
              </button>
            ))}
          </div>
        </div>

        <div className={`${t.cardBg} ${t.cardBorder} border rounded-lg p-2 shadow-2xl`}>
          <div className="flex items-center gap-2 mb-2 px-2">
            <Layout className={`w-4 h-4 ${t.textPrimary}`} />
            <span className={`text-xs font-semibold ${t.textPrimary}`}>LAYOUT</span>
          </div>
          <div className="flex flex-col gap-1">
            {[
              { key: 'sidebar', name: 'Sidebar', icon: SidebarIcon },
              { key: 'tabs', name: 'Tabs', icon: Menu }
            ].map((layout) => {
              const Icon = layout.icon;
              return (
                <button
                  key={layout.key}
                  onClick={() => setViewMode(layout.key)}
                  className={`px-3 py-2 rounded text-xs font-medium transition-all flex items-center gap-2 ${
                    viewMode === layout.key 
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white' 
                      : `${t.textSecondary} hover:bg-white/5`
                  }`}
                >
                  <Icon className="w-3 h-3" /> {layout.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* SIDEBAR VIEW */}
      {viewMode === 'sidebar' && (
        <div className="flex">
          {renderSidebar()}
          <div className="flex-1 overflow-auto p-6">
            {renderPage()}
          </div>
        </div>
      )}

      {/* TABS VIEW */}
      {viewMode === 'tabs' && (
        <div>
          {renderTabs()}
          <div className="max-w-7xl mx-auto px-6 py-6">
            {renderPage()}
          </div>
        </div>
      )}
    </div>
  );
};

export default F1HubMockup;