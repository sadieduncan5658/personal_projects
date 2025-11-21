import React, { useState } from 'react';
import { 
  Search, Trophy, Flag, Calendar, MapPin, Clock, Mountain, Gauge, 
  BarChart3, Filter, Download, Settings, Medal, Star, Globe, Menu, 
  Timer, ThermometerSun, Palette, Layout, Grid3x3, Sidebar, Users, Zap, Target
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer 
} from 'recharts';

const F1HubMockup = () => {
  const [theme, setTheme] = useState('bold');
  const [viewMode, setViewMode] = useState('dashboard');

  const pointsData = [
    { race: 'R18', VER: 345, NOR: 291, LEC: 275, PIA: 237 },
    { race: 'R19', VER: 362, NOR: 307, LEC: 289, PIA: 247 },
    { race: 'R20', VER: 377, NOR: 318, LEC: 295, PIA: 254 },
    { race: 'R21', VER: 393, NOR: 331, LEC: 307, PIA: 262 },
  ];

  const drivers = [
    { pos: 1, name: 'Max Verstappen', team: 'Red Bull', points: 393, gap: 0, color: '#3671C6', nat: '🇳🇱' },
    { pos: 2, name: 'Lando Norris', team: 'McLaren', points: 331, gap: -62, color: '#FF8000', nat: '🇬🇧' },
    { pos: 3, name: 'Charles Leclerc', team: 'Ferrari', points: 307, gap: -86, color: '#E8002D', nat: '🇲🇨' },
    { pos: 4, name: 'Oscar Piastri', team: 'McLaren', points: 262, gap: -131, color: '#FF8000', nat: '🇦🇺' },
  ];

  const themes = {
    bold: {
      name: 'Bold & Dramatic',
      bg: 'bg-black',
      cardBg: 'bg-gradient-to-br from-gray-900 to-black',
      headerBg: 'bg-gradient-to-r from-red-600 via-red-700 to-black',
      textPrimary: 'text-white',
      textSecondary: 'text-gray-400',
      cardBorder: 'border-gray-800'
    },
    minimalist: {
      name: 'Minimalist Premium',
      bg: 'bg-gray-50',
      cardBg: 'bg-white',
      headerBg: 'bg-white',
      textPrimary: 'text-gray-900',
      textSecondary: 'text-gray-500',
      cardBorder: 'border-gray-200'
    },
    classic: {
      name: 'Classic Racing',
      bg: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900',
      cardBg: 'bg-gradient-to-br from-yellow-900/20 to-gray-900',
      headerBg: 'bg-gradient-to-r from-yellow-600 to-gray-900',
      textPrimary: 'text-white',
      textSecondary: 'text-yellow-200',
      cardBorder: 'border-yellow-900/50'
    },
    glass: {
      name: 'Glassmorphism',
      bg: 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900',
      cardBg: 'bg-white/10 backdrop-blur-xl',
      headerBg: 'bg-white/10 backdrop-blur-xl',
      textPrimary: 'text-white',
      textSecondary: 'text-purple-200',
      cardBorder: 'border-white/20'
    }
  };

  const t = themes[theme];

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
              { key: 'dashboard', name: 'Dashboard', icon: Grid3x3 },
              { key: 'sidebar', name: 'Sidebar', icon: Sidebar },
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

      {/* DASHBOARD VIEW */}
      {viewMode === 'dashboard' && (
        <div className="p-6 pb-12">
          {/* Header */}
          <div className={`${t.headerBg} ${t.cardBorder} border rounded-2xl p-6 mb-6 shadow-2xl`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Flag className={`w-12 h-12 ${theme === 'minimalist' ? 'text-gray-900' : 'text-white'}`} />
                <div>
                  <h1 className={`text-4xl font-black ${t.textPrimary}`}>F1 CHAMPIONSHIP HUB</h1>
                  <p className={`${t.textSecondary} font-semibold`}>2024 Season • 21/24 Races Complete</p>
                </div>
              </div>
              <div className={`${t.cardBg} rounded-xl px-6 py-4 ${t.cardBorder} border`}>
                <div className={`text-sm ${t.textSecondary} mb-1`}>Next Race</div>
                <div className={`text-2xl font-bold ${t.textPrimary}`}>7d 14h 23m</div>
              </div>
            </div>

            <div className="relative">
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${t.textSecondary}`} />
              <input
                type="text"
                placeholder="Search drivers, teams, circuits..."
                className={`w-full ${t.cardBg} ${t.cardBorder} border rounded-xl pl-12 pr-4 py-3 ${t.textPrimary} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500`}
              />
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-12 gap-6">
            {/* Driver Standings */}
            <div className="col-span-4 space-y-4">
              <div className={`${t.cardBg} ${t.cardBorder} border rounded-2xl p-6 shadow-xl`}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className={`text-xl font-bold ${t.textPrimary} flex items-center gap-2`}>
                    <Trophy className="w-5 h-5" />
                    Driver Standings
                  </h2>
                  <Filter className={`w-5 h-5 ${t.textSecondary}`} />
                </div>

                <div className="space-y-3">
                  {drivers.map((driver, idx) => (
                    <div 
                      key={driver.pos}
                      className={`${theme === 'minimalist' ? 'bg-gray-50' : 'bg-white/5'} rounded-xl p-4 ${
                        idx === 0 ? 'ring-2 ring-yellow-500' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`text-2xl font-black ${idx < 3 ? 'text-yellow-500' : t.textSecondary}`}>
                          {driver.pos}
                        </div>
                        <div className="w-1 h-12 rounded-full" style={{ backgroundColor: driver.color }}></div>
                        <div className="flex-1">
                          <div className={`font-bold ${t.textPrimary} flex items-center gap-2`}>
                            <span>{driver.nat}</span>
                            <span>{driver.name}</span>
                          </div>
                          <div className={`text-sm ${t.textSecondary}`}>{driver.team}</div>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-black ${t.textPrimary}`}>{driver.points}</div>
                          <div className={`text-xs ${driver.gap < 0 ? 'text-red-400' : 'text-green-400'}`}>
                            {driver.gap === 0 ? 'Leader' : `${driver.gap} pts`}
                          </div>
                        </div>
                      </div>
                      <div className={`mt-3 h-2 ${theme === 'minimalist' ? 'bg-gray-200' : 'bg-white/10'} rounded-full overflow-hidden`}>
                        <div 
                          className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full"
                          style={{ width: `${(driver.points / drivers[0].points) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Race Info */}
              <div className={`${t.cardBg} ${t.cardBorder} border rounded-2xl p-6 shadow-xl`}>
                <h2 className={`text-xl font-bold ${t.textPrimary} flex items-center gap-2 mb-4`}>
                  <Calendar className="w-5 h-5" />
                  Las Vegas GP
                </h2>
                
                <div className={`${theme === 'minimalist' ? 'bg-gray-100' : 'bg-white/5'} rounded-lg p-3 space-y-2`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className={`w-4 h-4 ${t.textSecondary}`} />
                      <span className={`text-sm ${t.textSecondary}`}>Track Time</span>
                    </div>
                    <span className={`text-sm font-semibold ${t.textPrimary}`}>10:00 PM PST</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className={`w-4 h-4 ${t.textSecondary}`} />
                      <span className={`text-sm ${t.textSecondary}`}>Your Time</span>
                    </div>
                    <span className={`text-sm font-semibold ${t.textPrimary}`}>1:00 AM EST</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ThermometerSun className={`w-4 h-4 ${t.textSecondary}`} />
                      <span className={`text-sm ${t.textSecondary}`}>Weather</span>
                    </div>
                    <span className={`text-sm font-semibold ${t.textPrimary}`}>18°C Clear</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="col-span-5 space-y-6">
              <div className={`${t.cardBg} ${t.cardBorder} border rounded-2xl p-6 shadow-xl`}>
                <h2 className={`text-xl font-bold ${t.textPrimary} flex items-center gap-2 mb-4`}>
                  <BarChart3 className="w-5 h-5" />
                  Points Progression
                </h2>

                <ResponsiveContainer width="100%" height={300}>
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

              <div className={`${t.cardBg} ${t.cardBorder} border rounded-2xl p-6 shadow-xl`}>
                <h2 className={`text-xl font-bold ${t.textPrimary} flex items-center gap-2 mb-4`}>
                  <Users className="w-5 h-5" />
                  Head-to-Head
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <div className={`${theme === 'minimalist' ? 'bg-blue-50' : 'bg-blue-900/20'} rounded-xl p-4 border-2 border-blue-500`}>
                    <div className={`text-sm ${t.textSecondary} mb-1`}>🇳🇱 Red Bull</div>
                    <div className={`text-2xl font-black ${t.textPrimary} mb-3`}>Verstappen</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className={t.textSecondary}>Points</span>
                        <span className={`font-bold ${t.textPrimary}`}>393</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className={t.textSecondary}>Wins</span>
                        <span className={`font-bold ${t.textPrimary}`}>8</span>
                      </div>
                    </div>
                  </div>

                  <div className={`${theme === 'minimalist' ? 'bg-orange-50' : 'bg-orange-900/20'} rounded-xl p-4 border-2 border-orange-500`}>
                    <div className={`text-sm ${t.textSecondary} mb-1`}>🇬🇧 McLaren</div>
                    <div className={`text-2xl font-black ${t.textPrimary} mb-3`}>Norris</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className={t.textSecondary}>Points</span>
                        <span className={`font-bold ${t.textPrimary}`}>331</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className={t.textSecondary}>Wins</span>
                        <span className={`font-bold ${t.textPrimary}`}>3</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className={`${t.cardBg} ${t.cardBorder} border rounded-xl p-4 text-center`}>
                  <Trophy className={`w-8 h-8 mx-auto mb-2 ${t.textSecondary}`} />
                  <div className={`text-2xl font-black ${t.textPrimary}`}>8</div>
                  <div className={`text-xs ${t.textSecondary}`}>VER Wins</div>
                </div>
                <div className={`${t.cardBg} ${t.cardBorder} border rounded-xl p-4 text-center`}>
                  <Zap className={`w-8 h-8 mx-auto mb-2 ${t.textSecondary}`} />
                  <div className={`text-2xl font-black ${t.textPrimary}`}>11</div>
                  <div className={`text-xs ${t.textSecondary}`}>Fastest Laps</div>
                </div>
                <div className={`${t.cardBg} ${t.cardBorder} border rounded-xl p-4 text-center`}>
                  <Star className={`w-8 h-8 mx-auto mb-2 ${t.textSecondary}`} />
                  <div className={`text-2xl font-black ${t.textPrimary}`}>9</div>
                  <div className={`text-xs ${t.textSecondary}`}>VER Poles</div>
                </div>
              </div>
            </div>

            {/* Track Info */}
            <div className="col-span-3">
              <div className={`${t.cardBg} ${t.cardBorder} border rounded-2xl p-6 shadow-xl`}>
                <h2 className={`text-xl font-bold ${t.textPrimary} flex items-center gap-2 mb-4`}>
                  <MapPin className="w-5 h-5" />
                  Circuit Details
                </h2>

                <div className={`${theme === 'minimalist' ? 'bg-gray-100' : 'bg-white/5'} rounded-xl p-6 mb-4`}>
                  <div className="text-center py-8">
                    <div className={`text-6xl ${t.textSecondary} opacity-20 mb-2`}>🏁</div>
                    <div className={`text-sm font-semibold ${t.textPrimary}`}>Track Map</div>
                    <div className={`text-xs ${t.textSecondary}`}>Las Vegas Street Circuit</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className={`${theme === 'minimalist' ? 'bg-gray-50' : 'bg-white/5'} rounded-lg p-3`}>
                    <Gauge className={`w-4 h-4 ${t.textSecondary} mb-1`} />
                    <div className={`text-xs ${t.textSecondary}`}>Length</div>
                    <div className={`text-lg font-bold ${t.textPrimary}`}>6.12 km</div>
                  </div>
                  <div className={`${theme === 'minimalist' ? 'bg-gray-50' : 'bg-white/5'} rounded-lg p-3`}>
                    <Mountain className={`w-4 h-4 ${t.textSecondary} mb-1`} />
                    <div className={`text-xs ${t.textSecondary}`}>Elevation</div>
                    <div className={`text-lg font-bold ${t.textPrimary}`}>620m</div>
                  </div>
                  <div className={`${theme === 'minimalist' ? 'bg-gray-50' : 'bg-white/5'} rounded-lg p-3`}>
                    <Target className={`w-4 h-4 ${t.textSecondary} mb-1`} />
                    <div className={`text-xs ${t.textSecondary}`}>Corners</div>
                    <div className={`text-lg font-bold ${t.textPrimary}`}>17</div>
                  </div>
                  <div className={`${theme === 'minimalist' ? 'bg-gray-50' : 'bg-white/5'} rounded-lg p-3`}>
                    <Zap className={`w-4 h-4 ${t.textSecondary} mb-1`} />
                    <div className={`text-xs ${t.textSecondary}`}>Top Speed</div>
                    <div className={`text-lg font-bold ${t.textPrimary}`}>342 km/h</div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className={`text-sm ${t.textSecondary} mb-2`}>Track Difficulty</div>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className={`w-5 h-5 ${star <= 3 ? 'fill-yellow-500 text-yellow-500' : t.textSecondary}`} />
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Export Schedule
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SIDEBAR VIEW */}
      {viewMode === 'sidebar' && (
        <div className="flex h-screen overflow-hidden">
          <div className={`w-64 ${t.cardBg} ${t.cardBorder} border-r p-6`}>
            <div className="flex items-center gap-3 mb-8">
              <Flag className={`w-8 h-8 ${theme === 'minimalist' ? 'text-gray-900' : 'text-white'}`} />
              <div>
                <div className={`text-xl font-black ${t.textPrimary}`}>F1 HUB</div>
                <div className={`text-xs ${t.textSecondary}`}>2024</div>
              </div>
            </div>

            <nav className="space-y-2">
              {['Dashboard', 'Standings', 'Calendar', 'Drivers', 'Teams'].map((item) => (
                <button
                  key={item}
                  className={`w-full text-left px-4 py-3 rounded-lg font-semibold text-sm ${
                    item === 'Dashboard' ? 'bg-red-600 text-white' : `${t.textSecondary} hover:bg-white/5`
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex-1 overflow-auto p-6">
            <h1 className={`text-3xl font-black ${t.textPrimary} mb-6`}>Dashboard with Sidebar</h1>
            <div className={`${t.cardBg} ${t.cardBorder} border rounded-2xl p-8 text-center`}>
              <p className={t.textSecondary}>Main content area - same dashboard grid would appear here</p>
            </div>
          </div>
        </div>
      )}

      {/* TABS VIEW */}
      {viewMode === 'tabs' && (
        <div>
          <div className={`${t.headerBg} ${t.cardBorder} border-b`}>
            <div className="max-w-7xl mx-auto px-6 py-6">
              <div className="flex items-center gap-4 mb-6">
                <Flag className={`w-10 h-10 ${theme === 'minimalist' ? 'text-gray-900' : 'text-white'}`} />
                <div>
                  <h1 className={`text-3xl font-black ${t.textPrimary}`}>F1 HUB</h1>
                  <p className={t.textSecondary}>2024 Season</p>
                </div>
              </div>

              <div className="flex gap-2">
                {['Dashboard', 'Standings', 'Points Tracker', 'Calendar', 'Circuits'].map((tab) => (
                  <button
                    key={tab}
                    className={`px-6 py-3 rounded-t-lg font-semibold ${
                      tab === 'Dashboard' 
                        ? `${t.cardBg} ${t.textPrimary}` 
                        : `${t.textSecondary} hover:bg-white/5`
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className={`${t.cardBg} ${t.cardBorder} border rounded-2xl p-8 text-center`}>
              <p className={t.textSecondary}>Tabbed interface - same dashboard grid would appear here</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default F1HubMockup;