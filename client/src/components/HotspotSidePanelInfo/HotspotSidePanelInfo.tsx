import React from 'react';
// import {useIntl} from 'gatsby-plugin-intl';
// import {useWindowSize} from 'react-use';

import * as styles from './HotspotSidePanelInfo.module.scss';
// import * as constants from '../../data/constants';
// import * as EXPLORE_COPY from '../../data/copy/explore';
import {PAGES_ENDPOINTS} from '../../data/constants';

const HotspotSidePanelInfo = () => {
  // const intl = useIntl();
  // const {width: windowWidth} = useWindowSize();

  return (
    <aside className={styles.sidePanelInfoContainer}>
      {/* Heading 1 */}
      <header tabIndex={0} className={styles.sidePanelInfoTitle}>
        Hot Spots & Cold Spots
      </header>

      {/* Paragraph 1 */}
      <p tabIndex={0}>
        Hotspots are found using the{' '}
        <a
          className="usa-link"
          href="https://pro.arcgis.com/en/pro-app/latest/tool-reference/spatial-statistics/h-how-hot-spot-analysis-getis-ord-gi-spatial-stati.htm"
        >
          Getis-Ord Gi*
        </a>{' '}
        statistic to identify spatial clusters of similar values. Specifically,
        this statistic looks for unusually high or low values and assigns them
        hot spots or cold spots using{' '}
        <a
          className="usa-link"
          href="https://pro.arcgis.com/en/pro-app/latest/tool-reference/spatial-statistics/what-is-a-z-score-what-is-a-p-value.htm"
        >
          p-values
        </a>
        . More information can be found on the{' '}
        <a className="usa-link" href={PAGES_ENDPOINTS.METHODOLOGY}>
          methodology
        </a>{' '}
        page.
      </p>

      <ul style={{paddingLeft: '10px'}}>
        <li>
          <p style={{marginTop: '10px'}}>
            <strong>Hot Spots:</strong> Areas where burdens or indicators are
            significantly higher than the national average.
          </p>
        </li>
        <li>
          <p style={{marginTop: '5px'}}>
            <strong>Cold Spots:</strong>Areas where burdens or indicators are
            significantly lower than the national average.
          </p>
        </li>
        <li>
          <p style={{marginTop: '5px'}}>
            <strong>No Color:</strong> Areas with no statistically significant
            clustering.
          </p>
        </li>
      </ul>
    </aside>
  );
};

export default HotspotSidePanelInfo;
