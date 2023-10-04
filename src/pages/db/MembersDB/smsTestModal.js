import React, { useState } from 'react';

const smsTestModal = () => {
    const [modal, setModal] = useState(false);
    const [size, setSize] = useState(null);
    const [className, setClassName] = useState(null);

    const toggle = () => {
        setModal(!modal);
    };

    return (
        <div>
            <button>sms sending test</button>
        </div>
    );
};
