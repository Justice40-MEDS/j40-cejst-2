import React, {useEffect, useRef, useState} from 'react';
import IntGraphSidebar from '../IntGraphSidebar';
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import * as Description from '../../data/copy/data';
import * as styles from './InteractiveGraph.module.scss';

interface Datum {
  state: string;
  county: string;
  burden: string;
  indicator: string;
  value: number;
  percentile?: number;
}

interface Props {
  url: string;
}

const InteractiveGraph = ({url}: Props) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [data, setData] = useState<Datum[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the data from the provided URL
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

          setData(jsonData); // Set the fetched data
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setError('Failed to load data. Please check the file path or server.');
        });
  }, [url]);

  // Define states
  const states = Array.from(new Set(data.map((d) => d.state))).sort();
  const [selectedState, setSelectedState] = useState('');
  const [selectedCounty, setSelectedCounty] = useState('');
  const [selectedBurden, setSelectedBurden] = useState('');
  const [selectedIndicator, setSelectedIndicator] = useState('');

  // Dynamically calculate counties and indicators based on current selections
  const counties = Array.from(
      new Set(data.filter((d) => d.state === selectedState).map((d) => d.county)),
  ).sort();

  const burdenCategories = Array.from(
      new Set(data.map((d) => d.burden)),
  ).sort();

  const indicators = Array.from(
      new Set(
          data
              .filter(
                  (d) =>
                    (!selectedState || d.state === selectedState) &&
            (!selectedCounty || d.county === selectedCounty) &&
            (!selectedBurden || d.burden === selectedBurden),
              )
              .map((d) => d.indicator),
      ),
  ).sort();

  const burdenLabelMap: { [key: string]: string } = {
    climate: 'Climate',
    energy: 'Energy',
    health: 'Health',
    housing: 'Housing',
    pollution: 'Pollution',
    transportation: 'Transportation',
    water: 'Water & Wastewater',
    workforce: 'Workforce Development',
  };

  const indicatorLabelMap: { [key: string]: string } = {
    EALR_PFS: 'Expected agriculture loss rate',
    EBLR_PFS: 'Expected building loss rate',
    EPLR_PFS: 'Expected population loss rate',
    FLD_PFS: 'Projected flood risk',
    WFR_PFS: 'Projected wildfire risk',
    EBF_PFS: 'Energy burden',
    PM25F_PFS: 'PM2.5 pollution',
    DSF_PFS: 'Diesel particulate matter',
    TF_PFS: 'Traffic proximity',
    TD_PFS: 'DOT travel barriers score',
    HBF_PFS: 'Housing burden',
    LPF_PFS: 'Lead paint',
    IS_PFS: 'Lack of greenspace',
    KP_PFS: 'Lack of indoor plumbing',
    // HRS_ET: 'Historic redlining',
    TSDF_PFS: 'Proximity to hazardous waste sites',
    NPL_PFS: 'Proximity to NPL sites',
    RMP_PFS: 'Proximity to RMP sites',
    // FUDS_ET: 'Former US Defense Site',
    // AML_ET: 'Abandoned mine present',
    WF_PFS: 'Wastewater discharge',
    UST_PFS: 'Leaky underground storage tanks',
    AF_PFS: 'Asthma among adults',
    DF_PFS: 'Diabetes among adults',
    HDF_PFS: 'Heart disease among adults',
    LLEF_PFS: 'Low life expectancy',
    LMI_PFS: 'Low median household income',
    LIF_PFS: 'Linguistic isolation',
    UF_PFS: 'Unemployment',
    P100_PFS: '% below federal poverty line',
  };

  const indicatorDefinitions: { [key: string]: string } = {
    EALR_PFS: Description.EALR,
    EBLR_PFS: Description.EBLR,
    EPLR_PFS: Description.EPLR,
    FLD_PFS: Description.FLD,
    WFR_PFS: Description.WFR,
    EBF_PFS: Description.EBF,
    PM25F_PFS: Description.PM25F,
    DSF_PFS: Description.DSF,
    TF_PFS: Description.TF,
    TD_PFS: Description.TD,
    HBF_PFS: Description.HBF,
    LPF_PFS: Description.LPF,
    IS_PFS: Description.IS,
    KP_PFS: Description.KP,
    TSDF_PFS: Description.TSDF,
    NPL_PFS: Description.NPL,
    RMP_PFS: Description.RMP,
    WF_PFS: Description.WF,
    UST_PFS: Description.UST,
    AF_PFS: Description.AF,
    DF_PFS: Description.DF,
    HDF_PFS: Description.HDF,
    LLEF_PFS: Description.LLEF,
    LMI_PFS: Description.LMI,
    LIF_PFS: Description.LIF,
    UF_PFS: Description.UF,
    P100_PFS: Description.P100,
  };

  // Update selectedCounty and selectedIndicator when dependencies change
  useEffect(() => {
    if (counties.length > 0) {
      setSelectedCounty('');
    }
  }, [selectedState]);

  useEffect(() => {
    if (indicators.length > 0) {
      setSelectedIndicator('');
    }
  }, [selectedBurden]);

  // Filter and aggregate
  const filteredData = selectedState ?
    data.filter(
        (d) =>
          d.state === selectedState &&
          (!selectedCounty || d.county === selectedCounty) &&
          (!selectedBurden || d.burden === selectedBurden) &&
          (!selectedIndicator || d.indicator === selectedIndicator),
    ) :
    [];
  console.log('Filtered Data:', filteredData);

  const scaledData = filteredData.map((d) => ({
    ...d,
    percentile: d.value * 100,
  }));
  console.log('Scaled Data:', scaledData);

  useEffect(() => {
    const chart = Plot.plot({
      y: {
        label: 'Number of Census Tracts',
        tickFormat: d3.format('~s'),
      },
      x: {
        domain: [0, 100],
        label: 'National Percentile',
        tickFormat: (d) => `${d}th`,
      },
      color: {scheme: 'PuRd'},
      style: {
        fontFamily: 'Lexend, sans-serif',
        fontSize: '16px',
      },
      marginBottom: 45,
      marginTop: 30,
      marginLeft: 50,
      marginRight: 25,
      marks: [
        Plot.rectY(
            scaledData,
            Plot.binX(
                {y: 'count', fill: 'mean'},
                {x: 'percentile', fill: 'percentile'},
            ),
        ),
        Plot.ruleY([0]),
      ],
      width: 850,
      height: 500,
    });

    if (chartRef.current) {
      chartRef.current.innerHTML = '';
      chartRef.current.appendChild(chart);
    }
  }, [scaledData]);

  if (error) {
    return <div style={{color: 'red'}}>{error}</div>;
  }

  if (data.length === 0) {
    return <div>Loading data...</div>;
  }

  return (
    <div className={styles.intGraphFlexContainer}>
      <div className={styles.graphContainer}>
        <label className={styles.stateLabel}>
          State:{' '}
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <option value="">-- Select a State --</option>
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        <label>
          County:{' '}
          <select
            value={selectedCounty}
            onChange={(e) => setSelectedCounty(e.target.value)}
          >
            <option value="">All Counties</option>
            {counties.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <br></br>
        <label className={styles.burdenLabel}>
          Burden:{' '}
          <select
            value={selectedBurden}
            onChange={(e) => setSelectedBurden(e.target.value)}
          >
            <option value="">All Burdens</option>
            {burdenCategories.map((b) => (
              <option key={b} value={b}>
                {burdenLabelMap[b] || b}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.indicatorLabel}>
          Indicator:{' '}
          <select
            value={selectedIndicator}
            onChange={(e) => setSelectedIndicator(e.target.value)}
          >
            <option value="">All Indicators</option>
            {indicators.map((i) => (
              <option key={i} value={i}>
                {indicatorLabelMap[i] || i}
              </option>
            ))}
          </select>
        </label>
        <div style={{position: 'relative'}}>
          {!selectedState && (
            <div className={styles.selectStateNote}>
              Please select a state to view the data
            </div>
          )}
          <div ref={chartRef}></div>
        </div>
      </div>
      {selectedIndicator && (
        <IntGraphSidebar
          indicator={selectedIndicator}
          indicatorLabelMap={indicatorLabelMap}
          indicatorDefinitions={indicatorDefinitions}
        />
      )}
    </div>
  );
};

export default InteractiveGraph;
