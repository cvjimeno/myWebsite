import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';

export default function InteractiveViolinPlot({ caption }) {
  const plotContainer = useRef(null);
  const [Plotly, setPlotly] = useState(null);
  const [params, setParams] = useState({ mean1: 20, std1: 5, mean2: 30, std2: 8 });

  useEffect(() => {
    import('plotly.js-dist-min').then(plotlyModule => setPlotly(plotlyModule));
  }, []);

  const handleInputChange = (e) => setParams({ ...params, [e.target.id]: parseFloat(e.target.value) });

  useEffect(() => {
    if (!Plotly || !plotContainer.current) return;

    function randomNormal(mean, std) { let u = 0, v = 0; while(u === 0) u = Math.random(); while(v === 0) v = Math.random(); let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v); return num * std + mean; }
    function generateData(mean, std, n = 500) { let data = []; for(let i = 0; i < n; i++) { data.push(randomNormal(mean, std)); } return data; }
    
    const data1 = generateData(params.mean1, params.std1);
    const data2 = generateData(params.mean2, params.std2);
    
    const tealColor = getComputedStyle(document.documentElement).getPropertyValue('--color-accent-primary').trim();
    const roseColor = getComputedStyle(document.documentElement).getPropertyValue('--color-accent-highlight').trim();

    const trace1 = { 
      y: data1, 
      type: 'violin', 
      name: 'Grupo 1',
      // FIX 1: Removed x: ['Grupo 1'] - this was causing the collapse
      box: { visible: true }, 
      meanline: { visible: true }, 
      points: 'none', 
      line: { color: tealColor },
      fillcolor: `${tealColor}40`,
      hoverinfo: 'none',
      width: 0.8, 
    };
    const trace2 = { 
      y: data2, 
      type: 'violin', 
      name: 'Grupo 2',
      // FIX 1: Removed x: ['Grupo 2']
      box: { visible: true }, 
      meanline: { visible: true }, 
      points: 'none', 
      line: { color: roseColor },
      fillcolor: `${roseColor}40`,
      hoverinfo: 'none',
      width: 0.8,
    };
    
    const plotData = [trace1, trace2];
    const layout = {
      yaxis: { zeroline: false, gridcolor: 'var(--color-border-card)', range: [-30, 90] },
      xaxis: { showticklabels: true, zeroline: false, showgrid: false }, // Show group names on X axis
      paper_bgcolor: 'transparent',
      plot_bgcolor: 'transparent',
      margin: { t: 15, b: 30, l: 30, r: 20 },
      showlegend: false,
      font: { family: 'Inter, sans-serif', color: 'var(--color-text-secondary)' },
      violinmode: 'group',
      // FIX 2: Use violingroupgap to control space between groups
      violingroupgap: 0.1, 
    };
    const config = { displayModeBar: false, responsive: true };

    Plotly.react(plotContainer.current, plotData, layout, config);

  }, [params, Plotly]);
// ... (all the code from `import` to the `useEffect` hooks remains the same)

  return (
    <div className="w-full font-sans flex flex-col h-full">
      <div ref={plotContainer} className="w-full flex-grow"></div>
      
      {caption && <p class="text-xs text-text-secondary text-center mt-2">{caption}</p>}
      
      {/* THE MINIMALIST UI REFACTOR */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-4 text-xs items-center">
        {/* Row 1: Labels */}
        <label htmlFor="mean1" className="block font-medium text-text-secondary">Media 1: <span className="font-bold">{params.mean1}</span></label>
        <label htmlFor="mean2" className="block font-medium text-text-secondary">Media 2: <span className="font-bold">{params.mean2}</span></label>
        
        {/* Row 2: Sliders */}
        <input type="range" id="mean1" min="0" max="50" value={params.mean1} step="1" onInput={handleInputChange} className="range-slider w-full h-1 bg-border-card rounded-lg appearance-none cursor-pointer" />
        <input type="range" id="mean2" min="0" max="50" value={params.mean2} step="1" onInput={handleInputChange} className="range-slider w-full h-1 bg-border-card rounded-lg appearance-none cursor-pointer" />
      </div>

      <style>{`
        .range-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px; /* Slightly smaller thumb */
          height: 14px;
          background: var(--color-accent-primary);
          border-radius: 50%;
          cursor: pointer;
          margin-top: -6px; /* Center thumb on the track */
          transition: transform 0.1s ease-in-out;
        }
        .range-slider::-moz-range-thumb {
          width: 14px;
          height: 14px;
          background: var(--color-accent-primary);
          border-radius: 50%;
          cursor: pointer;
        }
        .range-slider:hover::-webkit-slider-thumb {
            transform: scale(1.4);
        }
        .range-slider:hover::-moz-range-thumb {
            transform: scale(1.4);
        }
      `}</style>
    </div>
  );
}