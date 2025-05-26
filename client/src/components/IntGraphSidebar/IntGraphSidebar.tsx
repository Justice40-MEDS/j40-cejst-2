import React from 'react';
// import * as styles from './IntGraphSidebar.module.scss';

interface Props {
  indicator: string;
  indicatorLabelMap: { [key: string]: string };
  indicatorDefinitions: { [key: string]: string };
}

const IntGraphSidebar: React.FC<Props> = ({
  indicator,
  indicatorLabelMap,
  indicatorDefinitions,
}) => {
  if (!indicator) return null;

  return (
    <aside>
      {/* <aside className={styles.columnSidebar}> */}
      <h3 style={{marginTop: 0}}>
        {indicatorLabelMap[indicator] || indicator}
      </h3>
      <p>{indicatorDefinitions[indicator] || 'No definition available.'}</p>
    </aside>
  );
};

export default IntGraphSidebar;
