import React, { useState } from 'react';
import { 
  User, Users, Trophy, Award, Star, Zap, TrendingUp, TrendingDown, 
  Filter, Search, X, BarChart3, Target, Flag, Medal, CheckCircle
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer 
} from 'recharts';

const F1DriversPageOption1 = () => {
  const [selectedDrivers, setSelectedDrivers] = useState(['Max Verstappen', 'Lando Norris']);
  const [sortBy, setSortBy] = useState('points');
  const [filterTeam, setFilterTeam] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Points progression data for all drivers across the season
  const pointsProgression = [
    { race: 'R1', VER: 25, NOR: 18, LEC: 15, PIA: 12, SAI: 10, RUS: 8, HAM: 6, PER: 4 },
    { race: 'R3', VER: 51, NOR: 33, LEC: 47, PIA: 24, SAI: 20, RUS: 18, HAM: 22, PER: 15 },
    { race: 'R5', VER: 110, NOR: 58, LEC: 76, PIA: 38, SAI: 42, RUS: 32, HAM: 42, PER: 51 },
    { race: 'R7', VER: 169, NOR: 83, LEC: 98, PIA: 63, SAI: 68, RUS: 54, HAM: 70, PER: 87 },
    { race: 'R9', VER: 219, NOR: 113, LEC: 135, PIA: 88, SAI: 93, RUS: 81, HAM: 96, PER: 118 },
    { race: 'R11', VER: 265, NOR: 153, LEC: 162, PIA: 112, SAI: 120, RUS: 111, HAM: 125, PER: 131 },
    { race: 'R13', VER: 295, NOR: 199, LEC: 192, PIA: 149, SAI: 162, RUS: 143, HAM: 150, PER: 139 },
    { race: 'R15', VER: 331, NOR: 241, LEC: 217, PIA: 179, SAI: 190, RUS: 162, HAM: 174, PER: 143 },
    { race: 'R17', VER: 345, NOR: 279, LEC: 252, PIA: 222, SAI: 215, RUS: 177, HAM: 180, PER: 150 },
    { race: 'R19', VER: 362, NOR: 307, LEC: 289, PIA: 247, SAI: 238, RUS: 185, HAM: 183, PER: 150 },
    { race: 'R21', VER: 393, NOR: 331, LEC: 307, PIA: 262, SAI: 244, RUS: 192, HAM: 190, PER: 152 },
  ];

  const drivers = [
    { 
      id: 1, position: 1, name: 'Max Verstappen', shortName: 'VER', team: 'Red Bull Racing', 
      nationality: 'Dutch', flag: '🇳🇱', number: 1, points: 393, 
      wins: 8, podiums: 14, poles: 9, fastestLaps: 5, dnfs: 1, avgPosition: 2.1,
      prevPosition: 1, posChange: 0, color: '#3671C6', pointsGained: 16, avgPoints: 18.7
    },
    { 
      id: 2, position: 2, name: 'Lando Norris', shortName: 'NOR', team: 'McLaren', 
      nationality: 'British', flag: '🇬🇧', number: 4, points: 331, 
      wins: 3, podiums: 12, poles: 4, fastestLaps: 6, dnfs: 0, avgPosition: 3.4,
      prevPosition: 3, posChange: 1, color: '#FF8000', pointsGained: 24, avgPoints: 15.8
    },
    { 
      id: 3, position: 3, name: 'Charles Leclerc', shortName: 'LEC', team: 'Ferrari', 
      nationality: 'Monégasque', flag: '🇲🇨', number: 16, points: 307, 
      wins: 2, podiums: 11, poles: 5, fastestLaps: 4, dnfs: 2, avgPosition: 3.8,
      prevPosition: 2, posChange: -1, color: '#E8002D', pointsGained: 18, avgPoints: 14.6
    },
    { 
      id: 4, position: 4, name: 'Oscar Piastri', shortName: 'PIA', team: 'McLaren', 
      nationality: 'Australian', flag: '🇦🇺', number: 81, points: 262, 
      wins: 2, podiums: 8, poles: 1, fastestLaps: 2, dnfs: 1, avgPosition: 4.2,
      prevPosition: 4, posChange: 0, color: '#FF8000', pointsGained: 15, avgPoints: 12.5
    },
    { 
      id: 5, position: 5, name: 'Carlos Sainz', shortName: 'SAI', team: 'Ferrari', 
      nationality: 'Spanish', flag: '🇪🇸', number: 55, points: 244, 
      wins: 1, podiums: 9, poles: 2, fastestLaps: 3, dnfs: 1, avgPosition: 4.8,
      prevPosition: 5, posChange: 0, color: '#E8002D', pointsGained: 6, avgPoints: 11.6
    },
    { 
      id: 6, position: 6, name: 'George Russell', shortName: 'RUS', team: 'Mercedes', 
      nationality: 'British', flag: '🇬🇧', number: 63, points: 192, 
      wins: 1, podiums: 6, poles: 3, fastestLaps: 2, dnfs: 0, avgPosition: 5.3,
      prevPosition: 7, posChange: 1, color: '#27F4D2', pointsGained: 7, avgPoints: 9.1
    },
    { 
      id: 7, position: 7, name: 'Lewis Hamilton', shortName: 'HAM', team: 'Mercedes', 
      nationality: 'British', flag: '🇬🇧', number: 44, points: 190, 
      wins: 2, podiums: 7, poles: 1, fastestLaps: 4, dnfs: 1, avgPosition: 5.6,
      prevPosition: 6, posChange: -1, color: '#27F4D2', pointsGained: 7, avgPoints: 9.0
    },
    { 
      id: 8, position: 8, name: 'Sergio Perez', shortName: 'PER', team: 'Red Bull Racing', 
      nationality: 'Mexican', flag: '🇲🇽', number: 11, points: 152, 
      wins: 0, podiums: 4, poles: 0, fastestLaps: 1, dnfs: 3, avgPosition: 7.2,
      prevPosition: 8, posChange: 0, color: '#3671C6', pointsGained: 2, avgPoints: 7.2
    },
  ];

  const teams = ['all', 'Red Bull Racing', 'Ferrari', 'McLaren', 'Mercedes', 'Aston Martin', 'Alpine'];

  // Filter and sort drivers
  const filteredDrivers = drivers
    .filter(driver => {
      const matchesTeam = filterTeam === 'all' || driver.team === filterTeam;
      const matchesSearch = driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           driver.team.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTeam && matchesSearch;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'points': return b.points - a.points;
        case 'name': return a.name.localeCompare(b.name);
        case 'team': return a.team.localeCompare(b.team);
        case 'wins': return b.wins - a.wins;
        case 'podiums': return b.podiums - a.podiums;
        default: return b.points - a.points;
      }
    });

  const toggleDriverSelection = (driverName) => {
    if (selectedDrivers.includes(driverName)) {
      setSelectedDrivers(selectedDrivers.filter(d => d !== driverName));
    } else if (selectedDrivers.length < 3) {
      setSelectedDrivers([...selectedDrivers, driverName]);
    }
  };

  const getPositionChange = (change) => {
    if (change > 0) return <div className="flex items-center gap-1 text-green-500"><TrendingUp className="w-4 h-4" /><span>+{change}</span></div>;
    if (change < 0) return <div className="flex items-center gap-1 text-red-500"><TrendingDown className="w-4 h-4" /><span>{change}</span></div>;
    return <div className="flex items-center gap-1 text-gray-500"><span>—</span></div>;
  };

  // Classic Racing theme
  const t = {
    bg: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900',
    cardBg: 'bg-gradient-to-br from-yellow-900/20 to-gray-900',
    textPrimary: 'text-white',
    textSecondary: 'text-yellow-200',
    cardBorder: 'border-yellow-900/50',
    accentBg: 'bg-yellow-900/10',
    hoverBg: 'hover:bg-yellow-900/20'
  };

  return (
    <div className={`min-h-screen ${t.bg} p-6`}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-4xl font-black ${t.textPrimary} flex items-center gap-3`}>
              <User className="w-10 h-10 text-yellow-500" />
              Driver Standings
            </h1>
            <p className={`${t.textSecondary} mt-1`}>2024 Season • 21 Races Complete</p>
          </div>
          <div className={`${t.cardBg} ${t.cardBorder} border rounded-xl px-6 py-4`}>
            <div className={`text-sm ${t.textSecondary} mb-1`}>Total Drivers</div>
            <div className={`text-3xl font-black ${t.textPrimary}`}>{drivers.length}</div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className={`${t.cardBg} ${t.cardBorder} border rounded-2xl p-6 shadow-xl`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label className={`text-sm ${t.textSecondary} mb-2 block`}>Search Drivers</label>
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${t.textSecondary}`} />
                <input
                  type="text"
                  placeholder="Search by name or team..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full ${t.accentBg} border ${t.cardBorder} rounded-lg pl-10 pr-4 py-2 ${t.textPrimary} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                />
              </div>
            </div>

            {/* Team Filter */}
            <div>
              <label className={`text-sm ${t.textSecondary} mb-2 block`}>Filter by Team</label>
              <select
                value={filterTeam}
                onChange={(e) => setFilterTeam(e.target.value)}
                className={`w-full ${t.accentBg} border ${t.cardBorder} rounded-lg px-4 py-2 ${t.textPrimary} focus:outline-none focus:ring-2 focus:ring-yellow-500`}
              >
                {teams.map(team => (
                  <option key={team} value={team}>
                    {team === 'all' ? 'All Teams' : team}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className={`text-sm ${t.textSecondary} mb-2 block`}>Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`w-full ${t.accentBg} border ${t.cardBorder} rounded-lg px-4 py-2 ${t.textPrimary} focus:outline-none focus:ring-2 focus:ring-yellow-500`}
              >
                <option value="points">Points</option>
                <option value="name">Name</option>
                <option value="team">Team</option>
                <option value="wins">Wins</option>
                <option value="podiums">Podiums</option>
              </select>
            </div>
          </div>

          {/* Selected Drivers for Comparison */}
          {selectedDrivers.length > 0 && (
            <div className="mt-4 pt-4 border-t border-yellow-900/30">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm ${t.textSecondary} font-semibold`}>
                  Selected for Comparison ({selectedDrivers.length}/3)
                </span>
                {selectedDrivers.length > 0 && (
                  <button
                    onClick={() => setSelectedDrivers([])}
                    className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
                  >
                    <X className="w-3 h-3" />
                    Clear All
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                {selectedDrivers.map(driverName => {
                  const driver = drivers.find(d => d.name === driverName);
                  return (
                    <div
                      key={driverName}
                      className={`${t.accentBg} border border-yellow-500 rounded-lg px-3 py-2 flex items-center gap-2`}
                    >
                      <span className="text-2xl">{driver.flag}</span>
                      <span className={`font-semibold ${t.textPrimary}`}>{driver.shortName}</span>
                      <button
                        onClick={() => toggleDriverSelection(driverName)}
                        className="ml-1 text-yellow-500 hover:text-yellow-300"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Championship Points Progression Chart */}
        <div className={`${t.cardBg} ${t.cardBorder} border rounded-2xl p-6 shadow-xl`}>
          <h2 className={`text-2xl font-bold ${t.textPrimary} mb-4 flex items-center gap-2`}>
            <BarChart3 className="w-6 h-6 text-yellow-500" />
            Championship Points Progression
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={pointsProgression}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="race" stroke="#fef08a" />
              <YAxis stroke="#fef08a" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937',
                  border: '1px solid rgba(161, 98, 7, 0.5)',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              {selectedDrivers.map(driverName => {
                const driver = drivers.find(d => d.name === driverName);
                return (
                  <Line 
                    key={driver.shortName}
                    type="monotone" 
                    dataKey={driver.shortName} 
                    stroke={driver.color} 
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    name={driver.name}
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Driver Comparison Cards (if 2-3 selected) */}
        {selectedDrivers.length >= 2 && (
          <div className={`${t.cardBg} ${t.cardBorder} border rounded-2xl p-6 shadow-xl`}>
            <h2 className={`text-2xl font-bold ${t.textPrimary} mb-4 flex items-center gap-2`}>
              <Users className="w-6 h-6 text-yellow-500" />
              Head-to-Head Comparison
            </h2>
            <div className={`grid grid-cols-${selectedDrivers.length} gap-4`}>
              {selectedDrivers.map(driverName => {
                const driver = drivers.find(d => d.name === driverName);
                return (
                  <div
                    key={driver.name}
                    className={`${t.accentBg} rounded-xl p-5 border-2`}
                    style={{ borderColor: driver.color }}
                  >
                    <div className="text-center mb-4">
                      <div className="text-5xl mb-2">{driver.flag}</div>
                      <div className={`text-2xl font-black ${t.textPrimary} mb-1`}>{driver.name}</div>
                      <div className={`text-sm ${t.textSecondary}`}>{driver.team}</div>
                      <div className={`text-xs ${t.textSecondary} mt-1`}>#{driver.number}</div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center pb-2 border-b border-yellow-900/30">
                        <span className={`text-sm ${t.textSecondary}`}>Position</span>
                        <span className={`text-2xl font-black ${t.textPrimary}`}>P{driver.position}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-yellow-900/30">
                        <span className={`text-sm ${t.textSecondary}`}>Points</span>
                        <span className={`text-xl font-bold ${t.textPrimary}`}>{driver.points}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`text-sm ${t.textSecondary}`}>Wins</span>
                        <span className={`text-lg font-bold ${t.textPrimary}`}>{driver.wins}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`text-sm ${t.textSecondary}`}>Podiums</span>
                        <span className={`text-lg font-bold ${t.textPrimary}`}>{driver.podiums}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`text-sm ${t.textSecondary}`}>Poles</span>
                        <span className={`text-lg font-bold ${t.textPrimary}`}>{driver.poles}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`text-sm ${t.textSecondary}`}>Fastest Laps</span>
                        <span className={`text-lg font-bold ${t.textPrimary}`}>{driver.fastestLaps}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`text-sm ${t.textSecondary}`}>Avg Position</span>
                        <span className={`text-lg font-bold ${t.textPrimary}`}>{driver.avgPosition}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`text-sm ${t.textSecondary}`}>Avg Points</span>
                        <span className={`text-lg font-bold ${t.textPrimary}`}>{driver.avgPoints}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`text-sm ${t.textSecondary}`}>DNFs</span>
                        <span className={`text-lg font-bold ${t.textPrimary}`}>{driver.dnfs}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Drivers Table */}
        <div className={`${t.cardBg} ${t.cardBorder} border rounded-2xl p-6 shadow-xl`}>
          <h2 className={`text-2xl font-bold ${t.textPrimary} mb-4 flex items-center gap-2`}>
            <Trophy className="w-6 h-6 text-yellow-500" />
            All Drivers
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-yellow-900/30">
                  <th className={`text-left py-3 px-4 ${t.textSecondary} text-sm font-semibold`}>
                    <input type="checkbox" className="mr-2" disabled />
                    Pos
                  </th>
                  <th className={`text-left py-3 px-4 ${t.textSecondary} text-sm font-semibold`}>Driver</th>
                  <th className={`text-left py-3 px-4 ${t.textSecondary} text-sm font-semibold`}>Team</th>
                  <th className={`text-center py-3 px-4 ${t.textSecondary} text-sm font-semibold`}>Points</th>
                  <th className={`text-center py-3 px-4 ${t.textSecondary} text-sm font-semibold`}>Change</th>
                  <th className={`text-center py-3 px-4 ${t.textSecondary} text-sm font-semibold`}>Wins</th>
                  <th className={`text-center py-3 px-4 ${t.textSecondary} text-sm font-semibold`}>Podiums</th>
                  <th className={`text-center py-3 px-4 ${t.textSecondary} text-sm font-semibold`}>Poles</th>
                  <th className={`text-center py-3 px-4 ${t.textSecondary} text-sm font-semibold`}>FL</th>
                  <th className={`text-center py-3 px-4 ${t.textSecondary} text-sm font-semibold`}>Avg Pos</th>
                  <th className={`text-center py-3 px-4 ${t.textSecondary} text-sm font-semibold`}>Avg Pts</th>
                </tr>
              </thead>
              <tbody>
                {filteredDrivers.map((driver, idx) => (
                  <tr 
                    key={driver.id} 
                    className={`border-b border-yellow-900/20 ${t.hoverBg} transition-colors ${
                      selectedDrivers.includes(driver.name) ? 'ring-2 ring-yellow-500' : ''
                    }`}
                  >
                    <td className={`py-4 px-4`}>
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedDrivers.includes(driver.name)}
                          onChange={() => toggleDriverSelection(driver.name)}
                          disabled={!selectedDrivers.includes(driver.name) && selectedDrivers.length >= 3}
                          className="cursor-pointer"
                        />
                        <span className={`text-2xl font-black ${idx < 3 ? 'text-yellow-500' : t.textSecondary}`}>
                          {driver.position}
                        </span>
                      </div>
                    </td>
                    <td className={`py-4 px-4`}>
                      <div className="flex items-center gap-3">
                        <div className="w-1 h-12 rounded-full" style={{ backgroundColor: driver.color }}></div>
                        <div className="text-3xl">{driver.flag}</div>
                        <div>
                          <div className={`font-bold ${t.textPrimary} text-lg`}>{driver.name}</div>
                          <div className={`text-xs ${t.textSecondary}`}>{driver.nationality} • #{driver.number}</div>
                        </div>
                      </div>
                    </td>
                    <td className={`py-4 px-4 ${t.textPrimary} font-semibold`}>{driver.team}</td>
                    <td className={`py-4 px-4 text-center`}>
                      <div className={`text-2xl font-black ${t.textPrimary}`}>{driver.points}</div>
                      <div className={`text-xs ${t.textSecondary}`}>+{driver.pointsGained} last race</div>
                    </td>
                    <td className={`py-4 px-4 text-center`}>{getPositionChange(driver.posChange)}</td>
                    <td className={`py-4 px-4 text-center`}>
                      <div className="flex items-center justify-center gap-1">
                        <Trophy className="w-4 h-4 text-yellow-500" />
                        <span className={`font-bold ${t.textPrimary}`}>{driver.wins}</span>
                      </div>
                    </td>
                    <td className={`py-4 px-4 text-center`}>
                      <div className="flex items-center justify-center gap-1">
                        <Award className="w-4 h-4 text-gray-400" />
                        <span className={`font-bold ${t.textPrimary}`}>{driver.podiums}</span>
                      </div>
                    </td>
                    <td className={`py-4 px-4 text-center`}>
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className={`font-bold ${t.textPrimary}`}>{driver.poles}</span>
                      </div>
                    </td>
                    <td className={`py-4 px-4 text-center`}>
                      <div className="flex items-center justify-center gap-1">
                        <Zap className="w-4 h-4 text-purple-400" />
                        <span className={`font-bold ${t.textPrimary}`}>{driver.fastestLaps}</span>
                      </div>
                    </td>
                    <td className={`py-4 px-4 text-center ${t.textPrimary} font-semibold`}>{driver.avgPosition}</td>
                    <td className={`py-4 px-4 text-center ${t.textPrimary} font-semibold`}>{driver.avgPoints}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default F1DriversPageOption1;