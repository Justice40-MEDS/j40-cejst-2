import React from 'react';
import {useIntl} from 'gatsby-plugin-intl';
import {useWindowSize} from 'react-use';

// @ts-ignore
import puzzleIcon from '../../images/sidePanelIcons/puzzle.svg';
// @ts-ignore
import peopleIcon from '/node_modules/uswds/dist/img/usa-icons/people.svg';
// @ts-ignore
import bellCurveIcon from '../../images/sidePanelIcons/bell-curve.svg';
// @ts-ignore
import fileUpIcon from '/node_modules/uswds/dist/img/usa-icons/file_upload.svg';
// @ts-ignore
import pieChartIcon from '../../images/sidePanelIcons/pie-chart.svg';
// @ts-ignore
import checkIcon from '/node_modules/uswds/dist/img/usa-icons/check.svg';

import * as styles from './AdditiveSidePanelInfo.module.scss';
import * as constants from '../../data/constants';
import * as EXPLORE_COPY from '../../data/copy/explore';

interface IAdditiveSidePanelInfoProps {
  visibleLayer: string;
}

const AdditiveSidePanelInfo = ({
  visibleLayer,
}: IAdditiveSidePanelInfoProps) => {
  const intl = useIntl();
  const {width: windowWidth} = useWindowSize();
  const isBurdenLayer = visibleLayer === constants.ADD_BURDEN_LAYER_ID;
  const isIndicatorLayer = visibleLayer === constants.ADD_INDICATOR_LAYER_ID;

  return (
    <aside className={styles.sidePanelInfoContainer}>
      {/* Heading 1 */}
      <header tabIndex={0} className={styles.sidePanelInfoTitle}>
        {isBurdenLayer && 'Burden'}
        {isIndicatorLayer && 'Indicator'} Thresholds Exceeded
      </header>

      {/* Paragraph 1 */}
      <p tabIndex={0}>
        This layer explores total {isBurdenLayer && 'burdens'}
        {isIndicatorLayer && 'indicators'} in a census tract. A count of the
        thresholds exceeded can be found by selecting a specific census tract.
      </p>

      {/* Heading */}
      <p tabIndex={0} className={styles.sidePanelInfoHeading}>
        Interpreting the Map
      </p>
      <p tabIndex={0}>
        Light colors represent a small number of thresholds exceeded while
        darker colors represent a high number of thresholds exceeded.{' '}
      </p>

      {/* Heading 2 */}
      <p tabIndex={0} className={styles.sidePanelInfoHeading}>
        {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.HEADING2)}
      </p>

      {/* Paragraph 2 */}
      <p tabIndex={0}>
        {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA2_PART1)}
        {windowWidth > constants.USWDS_BREAKPOINTS.MOBILE_LG && (
          <img
            tabIndex={0}
            className={styles.sidePanelInfoIcon}
            src={puzzleIcon}
            alt={intl.formatMessage(
                EXPLORE_COPY.SIDE_PANEL_INIT_STATE_ICON_ALT_TEXT.TRACT,
            )}
          />
        )}
        {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA2_PART2)}
        {windowWidth > constants.USWDS_BREAKPOINTS.MOBILE_LG && (
          <img
            tabIndex={0}
            className={styles.sidePanelInfoIcon}
            src={peopleIcon}
            alt={intl.formatMessage(
                EXPLORE_COPY.SIDE_PANEL_INIT_STATE_ICON_ALT_TEXT.PEOPLE,
            )}
          />
        )}
        {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA2_PART3)}
      </p>

      {/* Paragraph 3 */}
      {windowWidth > constants.USWDS_BREAKPOINTS.MOBILE_LG && (
        <p tabIndex={0}>
          {intl.formatMessage(
              EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA4_PART1,
          )}
          <img
            tabIndex={0}
            className={styles.sidePanelInfoIcon}
            src={bellCurveIcon}
            alt={intl.formatMessage(
                EXPLORE_COPY.SIDE_PANEL_INIT_STATE_ICON_ALT_TEXT.BELL_CURVE,
            )}
          />
          {intl.formatMessage(
              EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA4_PART2,
          )}
        </p>
      )}

      {/* Paragraph 4 */}
      {windowWidth > constants.USWDS_BREAKPOINTS.MOBILE_LG && (
        <p tabIndex={0}>
          {intl.formatMessage(
              EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA5_PART1,
          )}
          <img
            tabIndex={0}
            className={styles.sidePanelInfoIcon}
            src={fileUpIcon}
            alt={intl.formatMessage(
                EXPLORE_COPY.SIDE_PANEL_INIT_STATE_ICON_ALT_TEXT.FILE_UP,
            )}
          />
          {intl.formatMessage(
              EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA5_PART2,
          )}
          <img
            tabIndex={0}
            className={styles.sidePanelInfoIcon}
            src={pieChartIcon}
            alt={intl.formatMessage(
                EXPLORE_COPY.SIDE_PANEL_INIT_STATE_ICON_ALT_TEXT.PIE_CHART,
            )}
          />
          {intl.formatMessage(
              EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA5_PART3,
          )}
          <img
            tabIndex={0}
            className={styles.sidePanelInfoIcon}
            src={checkIcon}
            alt={intl.formatMessage(
                EXPLORE_COPY.SIDE_PANEL_INIT_STATE_ICON_ALT_TEXT.CHECK,
            )}
          />
          {intl.formatMessage(
              EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA5_PART4,
          )}
        </p>
      )}
    </aside>
  );
};

export default AdditiveSidePanelInfo;
