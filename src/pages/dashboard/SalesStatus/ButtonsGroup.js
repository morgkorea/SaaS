import React from 'react';

import { Button, ButtonGroup, DropdownButton, Dropdown } from 'react-bootstrap';

export const ButtonsGroup = ({ selectedPeriod, setSelectedPeriod }) => {
    const handleSelectedStateChange = (e) => {
        setSelectedPeriod(e.target.value);
    };
    return (
        <ButtonGroup style={{ background: '#EEF2F7', marginRight: '9px', fontSize: '14px' }}>
            <Button
                style={{
                    minWidth: '55.71px',
                    padding: '10px,13px,10px,13px',
                }}
                onClick={handleSelectedStateChange}
                value="month"
                variant={selectedPeriod === 'month' ? 'primary' : 'disabled'}>
                월간
            </Button>
            <Button
                style={{
                    minWidth: '55.71px',
                    padding: '10px,13px,10px,13px',
                }}
                onClick={handleSelectedStateChange}
                value="week"
                variant={selectedPeriod === 'week' ? 'primary' : 'disabled'}>
                주간
            </Button>
            <Button
                style={{
                    minWidth: '55.71px',
                    padding: '10px,13px,10px,13px',
                }}
                onClick={handleSelectedStateChange}
                value="day"
                variant={selectedPeriod === 'day' ? 'primary' : 'disabled'}>
                일간
            </Button>
        </ButtonGroup>
    );
};
