import React from 'react';
import axios from 'axios';

const naverSensSms = () => {
    const accessKeyId = 'WTlBOp72V6od7TbG7MB9';
    const secretKeyId = 'H71CpdEs8jCqKQ4JdBk7beElAnRmNLYPQvVmWwsZ';
    const serviceId = 'ncp:sms:kr:309772756413:morg-test';
    const subAccount = 'morgsens';

    const sensRequestHeaders = {
        'Content-Type': 'application/json',
        'x-ncp-apigw-timestamp': new Date().toISOString(),
        'x-ncp-iam-access-key': subAccount,
    };

    const sensRequestBody = {
        type: 'LMS',
        contentType: '(COMM | AD)',
        countryCode: 'string',
        from: 'string',
        subject: 'string',
        content: 'string',
        messages: [
            {
                to: 'string',
                subject: 'string',
                content: 'string',
            },
        ],
        files: [
            {
                fileId: 'string',
            },
        ],
        reserveTime: 'yyyy-MM-dd HH:mm',
        reserveTimeZone: 'string',
    };

    const sendingSms = async () => {
        try {
            await axios(`https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`, {
                method: 'POST',
                headers: sensRequestHeaders,
                data: sensRequestBody,
            }).then((response) => console.log(response.data));
        } catch (error) {
            console.log(error);
            console.log('error message :', error.message);
        }
    };

    return (
        <>
            <button onClick={sendingSms}>SMS Sending</button>
        </>
    );
};

export default naverSensSms;
