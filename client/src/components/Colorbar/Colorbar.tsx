import React from 'react';
import * as CONSTANTS from '../../data/constants';

interface IColorbar {
  visibleLayer: string;
}

const colorStopsHotspot = [
  {color: CONSTANTS.PSIM_VERY_COLD_COLOR, label: 'Very Cold Spot (99%)'},
  {color: CONSTANTS.PSIM_COLD_COLOR, label: 'Cold Spot (95%)'},
  {color: CONSTANTS.PSIM_NA_COLOR, label: 'Not Significant'},
  {color: CONSTANTS.PSIM_HOT_COLOR, label: 'Hot Spot (95%)'},
  {color: CONSTANTS.PSIM_VERY_HOT_COLOR, label: 'Very Hot Spot (99%)'},
];

const colorStopsAddBurd = [
  {color: CONSTANTS.ADD_1_COLOR, label: 'Low Burdens'},
  {color: CONSTANTS.ADD_6_COLOR, label: 'High Burdens'},
];

const colorStopsAddInd = [
  {color: CONSTANTS.ADD_1_COLOR, label: 'Low Indicators'},
  {color: CONSTANTS.ADD_6_COLOR, label: 'High Indicators'},
];

const additiveGradient = `linear-gradient(to right, ${[
  CONSTANTS.ADD_0_COLOR,
  CONSTANTS.ADD_1_COLOR,
  CONSTANTS.ADD_2_COLOR,
  CONSTANTS.ADD_3_COLOR,
  CONSTANTS.ADD_4_COLOR,
  CONSTANTS.ADD_5_COLOR,
  CONSTANTS.ADD_6_COLOR,
  CONSTANTS.ADD_7_COLOR,
].join(', ')})`;

const Colorbar = ({visibleLayer}: IColorbar) => {
  let colorStops:
    | typeof colorStopsAddBurd
    | typeof colorStopsAddInd
    | typeof colorStopsHotspot
    | null = null;
  let isAdditive = false;

  if (visibleLayer === CONSTANTS.ADD_BURDEN_LAYER_ID) {
    colorStops = colorStopsAddBurd;
    isAdditive = true;
  } else if (visibleLayer === CONSTANTS.ADD_INDICATOR_LAYER_ID) {
    colorStops = colorStopsAddInd;
    isAdditive = true;
  } else if (
    visibleLayer === CONSTANTS.PSIM_BURDEN_LAYER_ID ||
    visibleLayer === CONSTANTS.PSIM_INDICATOR_LAYER_ID
  ) {
    colorStops = colorStopsHotspot;
  } else {
    return null;
  }

  return (
    <div
      style={{
        borderRadius: '4px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        padding: '1rem',
        background: '#fff',
        display: 'block',
      }}
    >
      {/* Color bar */}
      {isAdditive ? (
        <div
          style={{
            height: '20px',
            width: '100%',
            background: additiveGradient,
            borderRadius: '4px',
          }}
        />
      ) : (
        <div style={{display: 'flex', width: '100%'}}>
          {colorStops.map((stop, idx) => (
            <div
              key={idx}
              style={{
                flexGrow: 1,
                height: '20px',
                background: stop.color,
              }}
            />
          ))}
        </div>
      )}

      {/* Labels */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '0.5rem',
        }}
      >
        {colorStops.map((stop, idx) => (
          <span
            key={idx}
            style={{
              fontSize: '1.1em',
              textAlign: 'center',
            }}
          >
            {stop.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Colorbar;
