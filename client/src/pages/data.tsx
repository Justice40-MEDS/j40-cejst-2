import * as React from 'react';
import J40MainGridContainer from '../components/J40MainGridContainer';
import {Grid} from '@trussworks/react-uswds';
import Layout from '../components/layout';

import InteractiveGraph from '../components/InteractiveGraph';
import ObservableTest from '../components/ObservableTest';
import IndicatorDemGraph from '../components/IndicatorDemGraph';
import HotspotGraph from '../components/HotspotGraph';
import IndHotspotGraph from '../components/IndHotspotGraph';
import HotspotDemGraph from '../components/HotspotDemGraph';

// @ts-ignore
import * as styles from './newStyles.module.scss';

interface IDataPageProps {
  location: Location;
}

export const onRenderBody = ({setHeadComponents}) => {
  setHeadComponents([
    <link
      key="lexend-font"
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Lexend&display=swap"
    />,
  ]);
};

const DataPage = ({location}: IDataPageProps) => {
  return (
    <Layout location={location} title={'Observable'}>
      <J40MainGridContainer fullWidth>
        <div
          style={{
            maxWidth: '90%',
            margin: '0 auto 10px auto',
            padding: '0 1rem',
          }}
        >
          <section className={'page-heading'}>
            <h1>Explore the Data</h1>
          </section>
          <div>
            <p>
              This page houses dynamic and interactive data visualizations of
              the data from the map. With over{' '}
              <strong>73,000 census tracts</strong> and{' '}
              <strong>31 unique indicators</strong>, the CEJST+ tool is a hub of
              data representing climate and economic justice.
            </p>
          </div>
        </div>
      </J40MainGridContainer>

      <J40MainGridContainer fullWidth={true} greenBackground={true}>
        <div className={styles.greenContainer}>
          <p style={{fontSize: '2rem', fontWeight: '500'}}>Demographics</p>
        </div>
      </J40MainGridContainer>

      <J40MainGridContainer fullWidth>
        <div
          style={{
            maxWidth: '90%',
            margin: '0 auto 20px auto',
            padding: '0 1rem',
          }}
        >
          <h3 className={styles.graphTitle}>
            Distribution of Total Thresholds Exceeded by Racial/Ethnic Group
          </h3>
          <Grid row gap={6}>
            {/* First column */}
            <Grid desktop={{col: 6}} col={12}>
              <div id="chart-container-1" className={styles.plotWrapper}>
                <ObservableTest
                  url={
                    'http://localhost:5001/data/data-pipeline/data_pipeline/data/score/geojson/burd_dem_long.json'
                  }
                ></ObservableTest>
              </div>
              <div id="chart-container-6" className={styles.plotWrapper}>
                <HotspotDemGraph
                  url={
                    'http://localhost:5001/data/data-pipeline/data_pipeline/data/score/geojson/cluster_dem_long_burd.json'
                  }
                  threshold="burden"
                  chartContainer="chart-container-6"
                ></HotspotDemGraph>
              </div>
            </Grid>

            {/* Second Column */}
            <Grid desktop={{col: 6}} col={12}>
              <div id="chart-container-2" className={styles.plotWrapper}>
                <IndicatorDemGraph url="http://localhost:5001/data/data-pipeline/data_pipeline/data/score/geojson/ind_dem_long.json"></IndicatorDemGraph>
              </div>
              <div id="chart-container-7" className={styles.plotWrapper}>
                <HotspotDemGraph
                  url={
                    'http://localhost:5001/data/data-pipeline/data_pipeline/data/score/geojson/cluster_dem_long_ind.json'
                  }
                  threshold="indicator"
                  chartContainer="chart-container-7"
                ></HotspotDemGraph>
              </div>
            </Grid>
          </Grid>
        </div>
      </J40MainGridContainer>

      {/* Insights and analyses demographics */}
      <J40MainGridContainer fullWidth={true}>
        <div
          style={{
            maxWidth: '90%',
            margin: '0 auto 20px auto',
            padding: '0 1rem',
          }}
        >
          <h4>Insights and Analyses</h4>
          <p>
            These bar charts show the distribution of racial/ethnic groups
            across the the number of burden or indicator thresholds exceeded.
            One key takeaway is that as exceeded thresholds increase, the
            proportion of people that identify as{' '}
            <span style={{color: '#9BBE5E'}}>Black or African American</span>{' '}
            also increases. Similarly, the proportion of people that identify as{' '}
            <span style={{color: '#FE6100'}}>white</span> decreases as the
            thresholds increase. It is important to note that these numbers are
            percentages, meaning it only represents the proportional breakdown
            across each threshold value.{' '}
          </p>
        </div>
      </J40MainGridContainer>

      <J40MainGridContainer fullWidth={true} greenBackground={true}>
        <div className={styles.greenContainer}>
          <p style={{fontSize: '2rem', fontWeight: '500'}}>
            Hot Spots and Cold Spots
          </p>
        </div>
      </J40MainGridContainer>

      <J40MainGridContainer fullWidth>
        <div
          style={{
            maxWidth: '90%',
            margin: '0 auto 20px auto',
            padding: '0 1rem',
          }}
        >
          <h3 className={styles.graphTitle}>
            Distribution of Hot Spots and Cold Spots Across Census Tracts
          </h3>
          <Grid row gap={6}>
            {/* First column */}
            <Grid desktop={{col: 6}} col={12}>
              <div id="chart-container-3" className={styles.plotWrapper}>
                <HotspotGraph
                  url={
                    'http://localhost:5001/data/data-pipeline/data_pipeline/data/score/geojson/gi_total.json'
                  }
                ></HotspotGraph>
              </div>
            </Grid>

            {/* Second Column */}
            <Grid desktop={{col: 6}} col={12}>
              <div id="chart-container-4" className={styles.plotWrapper}>
                <IndHotspotGraph url="http://localhost:5001/data/data-pipeline/data_pipeline/data/score/geojson/gi_total.json"></IndHotspotGraph>
              </div>
            </Grid>
          </Grid>
        </div>
      </J40MainGridContainer>

      {/* Insights hotspots */}
      <J40MainGridContainer fullWidth={true}>
        <div
          style={{
            maxWidth: '90%',
            margin: '0 auto 20px auto',
            padding: '0 1rem',
          }}
        >
          <h4>Insights and Analyses</h4>
          <p>
            These bar charts show the distribution of cluster categories across
            all U.S. census tracts. About half of all census tracts have no
            cluster classification. Approximately 26,000 census tracts are
            identified as <span style={{color: '#1818ED'}}>cold spots</span>{' '}
            and 10,000 are identified as{' '}
            <span style={{color: '#CF1818'}}>hot spots</span>. Hot spots and
            cold spots at both the 95% and 99% significance level are included
            in this visualization.{' '}
          </p>
        </div>
      </J40MainGridContainer>

      <J40MainGridContainer fullWidth={true} greenBackground={true}>
        <div className={styles.greenContainer}>
          <p style={{fontSize: '2rem', fontWeight: '500'}}>
            Explore the Data
          </p>
        </div>
      </J40MainGridContainer>

      <J40MainGridContainer fullWidth>
        <div
          style={{
            maxWidth: '90%',
            margin: '0 auto 20px auto',
            padding: '0 1rem',
          }}
        >
          <p style={{marginBottom: '0.8rem'}}>
            Use the dropdown menus below to explore the how burden and indicator
            thresholds exceeded vary across state and county. The graph shows
            the distribution of percentile risk for the selected threshold.
          </p>
          <div id="chart-container-int" className={styles.plotWrapper}>
            <InteractiveGraph url="http://localhost:5001/data/data-pipeline/data_pipeline/data/score/geojson/tract_total.json"></InteractiveGraph>
          </div>
        </div>
      </J40MainGridContainer>
    </Layout>
  );
};

export default DataPage;
