import React from 'react';
import { StatChanges } from '../types';
import { Heart, Users, Coins, ShieldAlert, ArrowUp, ArrowDown } from 'lucide-react';

interface StatBarProps {
  people: number;
  nobles: number;
  treasury: number;
  military: number;
  previewChanges?: StatChanges | null;
}

export const StatBar: React.FC<StatBarProps> = ({
  people,
  nobles,
  treasury,
  military,
  previewChanges,
}) => {
  const stats = [
    {
      id: 'people',
      label: '민심',
      value: people,
      delta: previewChanges?.people,
      icon: Heart,
      color: 'bg-rose-500',
      textColor: 'text-rose-400',
      bgColor: 'bg-rose-950/40',
      borderColor: 'border-rose-500/30',
      desc: '백성의 지지와 민생',
    },
    {
      id: 'nobles',
      label: '충성도',
      value: nobles,
      delta: previewChanges?.nobles,
      icon: Users,
      color: 'bg-amber-500',
      textColor: 'text-amber-400',
      bgColor: 'bg-amber-950/40',
      borderColor: 'border-amber-500/30',
      desc: '조정 대신과 붕당의 지지',
    },
    {
      id: 'treasury',
      label: '국고',
      value: treasury,
      delta: previewChanges?.treasury,
      icon: Coins,
      color: 'bg-emerald-500',
      textColor: 'text-emerald-400',
      bgColor: 'bg-emerald-950/40',
      borderColor: 'border-emerald-500/30',
      desc: '왕실 재정과 국가 곳간',
    },
    {
      id: 'military',
      label: '군사력',
      value: military,
      delta: previewChanges?.military,
      icon: ShieldAlert,
      color: 'bg-blue-500',
      textColor: 'text-blue-400',
      bgColor: 'bg-blue-950/40',
      borderColor: 'border-blue-500/30',
      desc: '국방력과 궁궐 호위병',
    },
  ];

  return (
    <div className="w-full bg-stone-900/90 backdrop-blur-md border-b border-amber-900/40 px-3 py-2 shadow-lg">
      <div className="max-w-md mx-auto grid grid-cols-4 gap-2">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const isDanger = stat.value <= 20;
          const isHigh = stat.value >= 85;
          const hasDelta = typeof stat.delta === 'number' && stat.delta !== 0;

          return (
            <div
              key={stat.id}
              className={`relative flex flex-col items-center p-1.5 rounded-xl border transition-all ${stat.bgColor} ${stat.borderColor} ${
                isDanger ? 'ring-2 ring-red-500/80 animate-pulse' : ''
              }`}
              title={`${stat.label}: ${stat.value}/100 (${stat.desc})`}
            >
              {/* Icon & Preview indicator dot */}
              <div className="relative flex items-center justify-center mb-1">
                <Icon
                  size={18}
                  className={`${stat.textColor} transition-transform ${
                    hasDelta ? 'scale-110 drop-shadow' : ''
                  }`}
                />
                
                {/* Delta preview indicator (Reigns-style preview dot/arrow) */}
                {hasDelta && (
                  <span
                    className={`absolute -top-1.5 -right-2 flex items-center justify-center w-3.5 h-3.5 rounded-full text-[9px] font-bold shadow ${
                      stat.delta! > 0
                        ? 'bg-emerald-500 text-black'
                        : 'bg-rose-500 text-white'
                    }`}
                  >
                    {stat.delta! > 0 ? (
                      <ArrowUp size={8} strokeWidth={3} />
                    ) : (
                      <ArrowDown size={8} strokeWidth={3} />
                    )}
                  </span>
                )}
              </div>

              {/* Label & Value */}
              <div className="flex items-center justify-between w-full text-[11px] font-semibold px-0.5">
                <span className="text-stone-300 font-batang tracking-tight truncate">
                  {stat.label}
                </span>
                <span
                  className={`text-[10px] tabular-nums font-mono font-bold ${
                    isDanger ? 'text-rose-400' : isHigh ? 'text-amber-300' : 'text-stone-300'
                  }`}
                >
                  {stat.value}
                </span>
              </div>

              {/* Mini Progress Bar */}
              <div className="w-full h-1.5 bg-stone-950/80 rounded-full mt-1 overflow-hidden relative border border-stone-800">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${stat.color} ${
                    isDanger ? 'bg-red-600' : ''
                  }`}
                  style={{ width: `${Math.min(100, Math.max(0, stat.value))}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
