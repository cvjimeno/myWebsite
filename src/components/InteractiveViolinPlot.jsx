import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';

// --- Component Configuration ---
const VIOLIN_WIDTH = 0.4; 
const DEFAULTS = { mean1: 20, std1: 5, mean2: 30, std2: 8 };

const generateNormalData = (mean, std, n = 500) => {
  let data = [];
  for(let i = 0; i < n; i++) {
    let u = 0, v = 0;
    while(u === 0) u = Math.random();
    while(v === 0) v = Math.random();
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    data.push(num * std + mean);
  }
  return data;
};

// THE FIX: Accept a 'caption' prop
export default function InteractiveViolinPlot({ caption }) {
  const plotContainer = useRef(null);
  const [Plotly, setPlotly] = useState(null);
  const [params, setParams] = useState(DEFAULTS);

  useEffect(() => {
    import('plotly.js-dist-min').then(plotlyModule => setPlotly(plotlyModule));
  }, []);

  const handleInputChange = (e) => setParams({ ...params, [e.target.id]: parseFloat(e.target.value) });

  useEffect(() => {
    if (!Plotly || !plotContainer.current) return;

    const data1 = generateNormalData(params.mean1, params.std1);
    const data2 = generateNormalData(params.mean2, params.std2);
    
    const tealColor = getComputedStyle(document.documentElement).getPropertyValue('--color-accent-primary').trim();
    const roseColor = getComputedStyle(document.documentElement).getPropertyValue('--color-accent-highlight').trim();

    const trace1 = { y: data1, type: 'violin', name: 'Grupo 1', box: { visible: true }, meanline: { visible: true }, points: 'none', line: { color: tealColor }, fillcolor: `${tealColor}40`, width: VIOLIN_WIDTH, x0: 0 };
    const trace2 = { y: data2, type: 'violin', name: 'Grupo 2', box: { visible: true }, meanline: { visible: true }, points: 'none', line: { color: roseColor }, fillcolor: `${roseColor}40`, width: VIOLIN_WIDTH, x0: 1 };
    
    const plotData = [trace1, trace2];
    const layout = {
      yaxis: { zeroline: false, gridcolor: 'var(--color-border-card)', range: [0, 85], showline: true, linecolor: 'var(--color-border-card)', linewidth: 2, mirror: false, tick0: 0, dtick: 20, tickvals: [0, 20, 40, 60, 80] },
      xaxis: { showticklabels: true, zeroline: false, showgrid: false, showline: true, linecolor: 'var(--color-border-card)', linewidth: 2, mirror: false, tickvals: [0, 1], ticktext: ['Grupo 1', 'Grupo 2'], range: [-0.5, 1.5] },
      paper_bgcolor: 'transparent',
      plot_bgcolor: 'transparent',
      margin: { t: 15, b: 30, l: 30, r: 20 },
      showlegend: false,
      font: { family: 'Inter, sans-serif', color: 'var(--color-text-secondary)' },
      violinmode: 'group',
      violingroupgap: 0.0,
    };
    
    const config = { responsive: true, displayModeBar: false, staticPlot: true };

    Plotly.react(plotContainer.current, plotData, layout, config);

  }, [params, Plotly]);

  return (
    <div className="w-full font-sans flex flex-col h-full">
      <div ref={plotContainer} className="w-full flex-grow min-h-[150px]"></div>
      
      {/* THE FIX: Added margin-bottom (mb-2) to the controls container */}
      <div className="flex-shrink-0 grid grid-cols-2 gap-x-6 gap-y-2 mt-2 mb-2 text-xs items-center">
        <label htmlFor="mean1" className="block font-medium text-text-secondary">Media 1: <span className="font-bold">{params.mean1}</span></label>
        <label htmlFor="mean2" className="block font-medium text-text-secondary">Media 2: <span className="font-bold">{params.mean2}</span></label>
        
        <input type="range" id="mean1" min="20" max="60" value={params.mean1} step="1" onInput={handleInputChange} className="range-slider w-full h-1 bg-border-card rounded-lg appearance-none cursor-pointer" />
        <input type="range" id="mean2" min="20" max="60" value={params.mean2} step="1" onInput={handleInputChange} className="range-slider w-full h-1 bg-border-card rounded-lg appearance-none cursor-pointer" />
      </div>

      {/* THE FIX: Render the caption if it exists */}
      {caption && <p class="text-xs text-text-secondary text-center">{caption}</p>}

      <style>{`
        .range-slider::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none;
          width: 14px; height: 14px;
          background: var(--color-accent-primary);
          border-radius: 50%; cursor: pointer;
          margin-top: -6px; border: 2px solid var(--color-bg-card);
          transition: transform 0.1s ease-in-out;
        }
        .range-slider::-moz-range-thumb {
          width: 14px; height: 14px;
          background: var(--color-accent-primary);
          border-radius: 50%; cursor: pointer;
          border: 2px solid var(--color-bg-card);
        }
        .range-slider:hover::-webkit-slider-thumb { transform: scale(1.2); }
        .range-slider:hover::-moz-range-thumb { transform: scale(1.2); }
      `}</style>
    </div>
  );
}