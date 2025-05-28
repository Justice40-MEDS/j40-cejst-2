import React, {useState, useEffect} from 'react';
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';

import * as CONSTANTS from '../../data/constants';

interface Props {
  url: string;
  threshold: string;
  chartContainer: string;
}

const ObservableTest = ({url, threshold, chartContainer}: Props) => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

  const racialOrder = [
    'White (Non-Hispanic)',
    'Black or African American',
    'Hispanic or Latino',
    'Other Race',
    'Asian',
    'Native Hawaiian and Pacific Islander',
    'American Indian and Alaskan Native',
  ];

  const racialOrderLegend = [
    'American Indian and Alaskan Native',
    'Native Hawaiian and Pacific Islander',
    'Asian',
    'Other Race',
    'Hispanic or Latino',
    'Black or African American',
    'White (Non-Hispanic)',
  ];

  const colorPalette = [
    CONSTANTS.AIAN_COLOR,
    CONSTANTS.HIPI_COLOR,
    CONSTANTS.ASIA_COLOR,
    CONSTANTS.OTHER_RACE_COLOR,
    CONSTANTS.HISP_COLOR,
    CONSTANTS.BLACK_COLOR,
    CONSTANTS.WHITE_COLOR,
  ];

  const sortedData = data.sort(
      (a, b) =>
        racialOrder.indexOf(a.racial_group) - racialOrder.indexOf(b.racial_group),
  );

  const processedData = sortedData.map((d) => {
    // Pick the correct cluster field based on threshold
    const threshfield =
      threshold === 'burden' ? 'total_burdens' : 'total_criteria';
    return {
      ...d,
      thresholdExceeded: d[threshfield],
    };
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      const xAxisLabel =
        threshold === 'burden' ?
          'Burden Thresholds Exceeded' :
          'Indicator Thresholds Exceeded';

      const chart = Plot.plot({
        marks: [
          Plot.barY(processedData, {
            x: 'thresholdExceeded',
            y: 'percentage',
            fill: 'racial_group',
            tip: {
              format: {
                racial_group: (d) => d.replace(' and ', ' and<br>'),
                y: (d) => `${Math.round(d)}%`,
              },
            },
          }),
        ],
        y: {axis: true, label: 'Percentage', tickFormat: (d) => `${d}%`},
        x: {label: xAxisLabel},
        color: {
          range: colorPalette,
          legend: true,
          label: 'Race/Ethnicity',
          domain: racialOrderLegend,
        },
        marginBottom: 60,
        marginTop: 40,
        marginLeft: 60,
        style: {
          fontFamily: 'Lexend, sans-serif',
          fontSize: '18px',
        },
      });

      const container = document.getElementById(chartContainer);
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
          .attr('y', svg.node()?.getBoundingClientRect().height || 300) // use fallback
          .attr('height', 0)
          .transition()
          .duration(800)
          .delay((_, i) => i * 10) // optional stagger
          .attr('y', (_, i, nodes) => {
            return d3.select(nodes[i]).attr('data-final-y');
          })
          .attr('height', (_, i, nodes) => {
            return d3.select(nodes[i]).attr('data-final-height');
          });

      // Manually style legend because I couldn't get it to work inside observable
      const legendSpans = container?.querySelectorAll('span');
      legendSpans?.forEach((span) => {
        span.style.fontSize = '16px';
        span.style.display = 'inline-flex';
        span.style.alignItems = 'center';
        span.style.marginRight = '1em';
        span.style.gap = '0.4em';
        span.style.fontFamily = 'Lexend, sans-serif';

        const svg = span.querySelector('svg');
        if (svg) {
          svg.setAttribute('width', '17');
          svg.setAttribute('height', '17');
        }
      });

      return () => chart.remove();
    }, 300); // Let the browser render layout first

    return () => clearTimeout(timeout);
  }, [sortedData]);

  if (error) {
    return <div style={{color: 'red'}}>{error}</div>;
  }

  if (sortedData.length === 0) {
    return <div>Loading Data...</div>;
  }

  return <div id={chartContainer} />;
};

export default ObservableTest;
