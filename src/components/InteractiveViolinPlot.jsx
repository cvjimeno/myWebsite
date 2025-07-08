// src/components/InteractiveViolinPlot.jsx (FINAL - Colors & Caption)
import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';

// We accept a 'caption' prop now
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

    // --- Data generation (unchanged) ---
    function randomNormal(mean, std) { let u = 0, v = 0; while(u === 0) u = Math.random(); while(v === 0) v = Math.random(); let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v); return num * std + mean; }
    function generateData(mean, std, n = 500) { let data = []; for(let i = 0; i < n; i++) { data.push(randomNormal(mean, std)); } return data; }
    
    const data1 = generateData(params.mean1, params.std1);
    const data2 = generateData(params.mean2, params.std2);
    
    // THE FIX: Get brand colors from CSS variables
    const tealColor = getComputedStyle(document.documentElement).getPropertyValue('--color-accent-primary').trim();
    const roseColor = getComputedStyle(document.documentElement).getPropertyValue('--color-accent-highlight').trim();

    const trace1 = { 
      y: data1, type: 'violin', name: 'Grupo 1', 
      box: { visible: true }, meanline: { visible: true }, points: 'none', 
      line: { color: tealColor }, 
      fillcolor: `${tealColor}40`, // Add opacity (e.g., '40' for ~25%)
      hoverinfo: 'none' 
    };
    const trace2 = { 
      y: data2, type: 'violin', name: 'Grupo 2', 
      box: { visible: true }, meanline: { visible: true }, points: 'none', 
      line: { color: roseColor },
      fillcolor: `${roseColor}40`,
      hoverinfo: 'none'
    };
    
    const plotData = [trace1, trace2];
    const layout = { /* layout options unchanged */
      yaxis: { zeroline: false, gridcolor: 'var(--color-border-card)', range: [-10, 60] },
      paper_bgcolor: 'transparent',
      plot_bgcolor: 'transparent',
      margin: { t: 15, b: 20, l: 40, r: 20 },
      showlegend: false,
      font: { family: 'Inter, sans-serif', color: 'var(--color-text-secondary)' }
    };
    const config = { displayModeBar: false, responsive: true };

    Plotly.react(plotContainer.current, plotData, layout, config);

  }, [params, Plotly]);

  return (
    <div className="w-full font-sans flex flex-col h-full">
      <div ref={plotContainer} className="w-full flex-grow"></div>
      
      {/* Optional Caption */}
      {caption && <p class="text-xs text-text-secondary text-center mt-2">{caption}</p>}
      
      <div className="grid grid-cols-2 gap-4 mt-2 text-xs">
        <div className="p-2 bg-bg-secondary rounded-lg border">
          <label htmlFor="mean1" className="block font-medium text-text-secondary">Media 1: <span className="font-bold">{params.mean1}</span></label>
          <input type="range" id="mean1" min="0" max="50" value={params.mean1} step="1" onInput={handleInputChange} className="w-full h-1.5 bg-border-card rounded-lg appearance-none cursor-pointer range-slider" />
        </div>
        <div className="p-2 bg-bg-secondary rounded-lg border">
          <label htmlFor="mean2" className="block font-medium text-text-secondary">Media 2: <span className="font-bold">{params.mean2}</span></label>
          <input type="range" id="mean2" min="0" max="50" value={params.mean2} step="1" onInput={handleInputChange} className="w-full h-1.5 bg-border-card rounded-lg appearance-none cursor-pointer range-slider" />
        </div>
      </div>
    </div>
  );
}