import React from 'react';

import { Row, Col, Card, Button, ButtonGroup, DropdownButton, Dropdown } from 'react-bootstrap';

export const ButtonsGroup = ({ selectedPeriod, setSelectedPeriod }) => {
    const handleSelectedStateChange = (e) => {
        setSelectedPeriod(e.target.value);
        console.log(e.tartget.value);
    };
    return (
        <ButtonGroup className="mb-2">
            <Button onClick={handleSelectedStateChange} variant="primary">
                월간
            </Button>
            <Button onClick={handleSelectedStateChange} variant="primary">
                주간
            </Button>
            <Button value="일간" onClick={handleSelectedStateChange} variant="primary">
                일간
            </Button>
        </ButtonGroup>
    );
};
