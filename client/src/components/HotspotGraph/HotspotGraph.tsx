import React, {useState, useEffect} from 'react';
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';

interface Props {
  url: string;
}

const HotspotGraph = ({url}: Props) => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the data
    // const url =
    //   'http://localhost:5001/data/data-pipeline/data_pipeline/data/score/geojson/ind_dem_long.json';
    console.log('Fetching data from:', url);

    fetch(url)
        .then((response) => {
          console.log('Response status:', response.status);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((jsonData) => {
          console.log('Fetched data:', jsonData);

          if (!Array.isArray(jsonData)) {
            throw new Error('The fetched data is not an array.');
          }

          setData(jsonData); // Directly set the row-oriented data
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setError('Failed to load data. Please check the file path or server.');
        });
  }, []);

  const idLabel: { [key: string]: string } = {
    0: 'Not Significant',
    1: 'Hot Spot',
    2: 'Cold Spot',
  };

  const idOrder = [0, 1, 2];

  // OG palette
  const colorPalette = [
    '#FBF8F3', // NA
    '#cf1717', // hot
    '#1818ed', // cold
  ];

  const filteredData = data.filter((d) => d.category === 'burd');

  const sortedData = filteredData.sort(
      (a, b) => idOrder.indexOf(a.ID) - idOrder.indexOf(b.ID),
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      const chart = Plot.plot({
        marks: [
          Plot.barY(sortedData, {
            x: (d) => idLabel[d.ID],
            y: 'num_tracts',
            // fx: 'category',
            fill: (d) => d.ID,
            tip: true,
            title: (d) => `${d.num_tracts} tracts`,
            // tip: {
            //   format: {
            //     num_tracts: (n: number) => `${n} tracts`,
            //   },
            // },
            // tip: {
            //   format: {
            //     num_tracts: (n) => `${n} tracts`,
            //   },
            // },
          }),
        ],
        y: {axis: true, label: 'Number of Census Tracts'},
        x: {label: 'Cluster Classification for Burden Thresholds Exceeded'},
        color: {
          range: colorPalette,
          // legend: true,
          // label: 'Classification',
          domain: idOrder,
        },
        marginBottom: 60,
        marginTop: 40,
        marginLeft: 80,
        style: {
          fontFamily: 'Lexend, sans-serif',
          fontSize: '18px',
        },
      });

      const container = document.getElementById('chart-container-3');
      if (container) {
        container.innerHTML = ''; // Clear any previous chart
        container.appendChild(chart);
      }

      // Animation on load
      const svg = d3.select(chart);
      const bars = svg.selectAll('rect');

      // Store original values
      bars.each((_, i, nodes) => {
        const bar = d3.select(nodes[i]);
        bar.attr('data-final-y', bar.attr('y'));
        bar.attr('data-final-height', bar.attr('height'));
      });

      // Start from base (y = chart height, height = 0)
      bars
          .attr('y', svg.node()?.getBoundingClientRect().height || 300)
          .attr('height', 0)
          .transition()
          .duration(600)
      // Stagger how the bars come up
          .delay((_, i) => i * 8)
          .attr('y', (_, i, nodes) => {
            return d3.select(nodes[i]).attr('data-final-y');
          })
          .attr('height', (_, i, nodes) => {
            return d3.select(nodes[i]).attr('data-final-height');
          });

      // Manually style legend because I couldn't get it to work inside observable
      // The text isn't contained inside p/text tag at all, it's inside a span
      const legendSpans = container?.querySelectorAll('span');
      legendSpans?.forEach((span) => {
        span.style.fontSize = '16px';
        span.style.display = 'inline-flex';
        span.style.alignItems = 'center';
        span.style.marginRight = '1em';
        span.style.gap = '0.4em';
        span.style.fontFamily = 'Lexend, sans-serif';

        // Set the dim for the little square
        const svg = span.querySelector('svg');
        if (svg) {
          svg.setAttribute('width', '17');
          svg.setAttribute('height', '17');
        }
      });

      return () => chart.remove();
    }, 0); // Let the browser render layout first

    return () => clearTimeout(timeout);
  }, [sortedData]);

  if (error) {
    return <div style={{color: 'red'}}>{error}</div>;
  }

  if (sortedData.length === 0) {
    return <div>Loading Data...</div>;
  }

  return <div id="chart-container-3" />;
};

export default HotspotGraph;
