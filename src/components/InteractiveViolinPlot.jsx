// src/components/InteractiveViolinPlot.jsx (DEFINITIVE FIX)
import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';

// We REMOVE the static import from here:
// import Plotly from 'plotly.js-dist-min';

export default function InteractiveViolinPlot() {
  const plotContainer = useRef(null);
  const [params, setParams] = useState({
    mean1: 20,
    std1: 5,
    mean2: 30,
    std2: 8,
  });

  const handleInputChange = (e) => {
    setParams({ ...params, [e.target.id]: parseFloat(e.target.value) });
  };

  useEffect(() => {
    if (!plotContainer.current) return;

    // THE FIX: We use a dynamic import that only runs in the browser.
    import('plotly.js-dist-min').then(Plotly => {

        function randomNormal(mean, std) {
            let u = 0, v = 0;
            while(u === 0) u = Math.random();
            while(v === 0) v = Math.random();
            let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
            return num * std + mean;
        }

        function generateData(mean, std, n = 500) {
            let data = [];
            for(let i = 0; i < n; i++) {
                data.push(randomNormal(mean, std));
            }
            return data;
        }
    
        const data1 = generateData(params.mean1, params.std1);
        const data2 = generateData(params.mean2, params.std2);
        
        const trace1 = { y: data1, type: 'violin', name: 'Group 1', box: { visible: true }, meanline: { visible: true }, points: 'none', line: { color: 'var(--color-accent-primary)' } };
        const trace2 = { y: data2, type: 'violin', name: 'Group 2', box: { visible: true }, meanline: { visible: true }, points: 'none', line: { color: 'var(--color-accent-highlight)' } };
        
        const plotData = [trace1, trace2];

        const layout = {
            title: false,
            yaxis: { zeroline: false, gridcolor: 'rgba(0,0,0,0.1)' },
            violingap: 0,
            violingroupgap: 0,
            violinmode: 'overlay',
            paper_bgcolor: 'transparent',
            plot_bgcolor: 'transparent',
            margin: { t: 5, b: 20, l: 40, r: 20 },
            showlegend: false,
            font: { family: 'Inter, sans-serif', color: 'var(--color-text-secondary)' }
        };

        Plotly.react(plotContainer.current, plotData, layout, {responsive: true});
    });

  }, [params]); // This useEffect will re-run whenever params change, re-drawing the plot.

  return (
    <div className="w-full font-sans">
      <div ref={plotContainer} className="w-full h-64"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs">
        <div className="p-3 bg-bg-secondary rounded-lg border">
          <h3 className="font-semibold mb-2 text-text-primary">Grupo 1</h3>
          <label htmlFor="mean1" className="block font-medium text-text-secondary">Media: <span className="font-bold">{params.mean1}</span></label>
          <input type="range" id="mean1" min="0" max="50" value={params.mean1} step="1" onInput={handleInputChange} className="w-full h-1.5 bg-border-card rounded-lg appearance-none cursor-pointer range-slider" />
          <label htmlFor="std1" className="block font-medium text-text-secondary mt-2">Desv. Estándar: <span className="font-bold">{params.std1}</span></label>
          <input type="range" id="std1" min="1" max="20" value={params.std1} step="0.5" onInput={handleInputChange} className="w-full h-1.5 bg-border-card rounded-lg appearance-none cursor-pointer range-slider" />
        </div>
        <div className="p-3 bg-bg-secondary rounded-lg border">
          <h3 className="font-semibold mb-2 text-text-primary">Grupo 2</h3>
          <label htmlFor="mean2" className="block font-medium text-text-secondary">Media: <span className="font-bold">{params.mean2}</span></label>
          <input type="range" id="mean2" min="0" max="50" value={params.mean2} step="1" onInput={handleInputChange} className="w-full h-1.5 bg-border-card rounded-lg appearance-none cursor-pointer range-slider" />
          <label htmlFor="std2" className="block font-medium text-text-secondary mt-2">Desv. Estándar: <span className="font-bold">{params.std2}</span></label>
          <input type="range" id="std2" min="1" max="20" value={params.std2} step="0.5" onInput={handleInputChange} className="w-full h-1.5 bg-border-card rounded-lg appearance-none cursor-pointer range-slider" />
        </div>
      </div>
    </div>
  );
}