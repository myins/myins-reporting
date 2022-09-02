import React, { useState } from 'react';
import { PERIODS } from '../utils/enums';

const PeriodContext = React.createContext();
const initialPeriod = localStorage.getItem('lastPeriodUsed')

function PeriodProvider(props) {
    const [period, setPeriod] = useState(parseInt(initialPeriod) ?? PERIODS.past24h);

    const setPeriodLocal = (period) => {
        setPeriod(period)
        localStorage.setItem('lastPeriodUsed', period)
    }

    return (
        <PeriodContext.Provider value={{ period, setPeriodLocal }}>
            {props.children}
        </PeriodContext.Provider>
    );
}

function usePeriodContext() {
    const periodContext = React.useContext(PeriodContext);
    if (!periodContext) {
        throw new Error('usePeriodContext must be used within a PeriodProvider');
    }
    return periodContext;
}

export { PeriodProvider, usePeriodContext };
