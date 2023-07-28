import React from 'react';
import { Form } from 'react-bootstrap';

const Checkbox = () => {
    return (
        <>
            <Form.Group>
                <Form.Check type="checkbox" id="default-checkbox" label="마케팅 수신 동의" />
            </Form.Group>
        </>
    );
};

export default Checkbox;