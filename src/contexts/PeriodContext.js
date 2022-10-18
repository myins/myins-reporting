import React, { useState } from 'react';
import { PERIODS } from '../utils/enums';

export const initialNoRangeValue = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
}

const PeriodContext = React.createContext();
const initialPeriod = localStorage.getItem('lastPeriodUsed')
const initialRange = JSON.parse(localStorage.getItem('lastRangeUsed'))
if (initialRange) {
    initialRange.startDate = new Date(initialRange.startDate)
    initialRange.endDate = new Date(initialRange.endDate)
}

function PeriodProvider(props) {
    const [period, setPeriod] = useState(initialPeriod ? parseInt(initialPeriod) : PERIODS.past24h);
    const [range, setRange] = useState(period === PERIODS.range ? initialRange ?? initialNoRangeValue : null)
    const [loading, setLoading] = useState(true)

    const setPeriodLocal = (newPeriod) => {
        if (newPeriod !== period) {
            setLoading(true)
            setPeriod(newPeriod)
            localStorage.setItem('lastPeriodUsed', newPeriod)
            if (newPeriod !== PERIODS.range) {
                setRange(null)
                localStorage.removeItem('lastRangeUsed')
            }
        }
    }

    const setRangeLocal = (newRange) => {
        setLoading(true)
        setRange(newRange)
        localStorage.setItem('lastRangeUsed', JSON.stringify(newRange))
    }

    const setNoRangePeriod = (newPeriod) => {
      setPeriodLocal(newPeriod)
    }

    return (
        <PeriodContext.Provider value={{ period, setPeriodLocal, range, setRangeLocal, setNoRangePeriod, loading, setLoading }}>
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
