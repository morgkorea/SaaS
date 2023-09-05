import React from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const NaverSens = () => {
    const accessKeyId = 'WTlBOp72V6od7TbG7MB9';
    const secretKeyId = 'H71CpdEs8jCqKQ4JdBk7beElAnRmNLYPQvVmWwsZ';
    const serviceId = 'ncp:sms:kr:309772756413:morg-test';
    const subAccount = 'morgsens';

    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKeyId);
    const hash = hmac.finalize();
    const signature = hash.toString(CryptoJS.enc.Base64);

    const sensRequestHeaders = {
        'Content-Type': 'application/json',
        'x-ncp-apigw-timestamp': new Date().toISOString(),
        'x-ncp-iam-access-key': subAccount,
        'x-ncp-apigw-signature-v2': signature,
    };

    const sensRequestBody = {
        type: 'SMS', //SMS LMS
        contentType: 'COMM', // optional
        countryCode: '82',
        from: '01071781117',
        subject: '기본메시지 제목 TEST',
        content: '기본메시지 내용 TEST',
        messages: [
            {
                to: '01071781117',
                subject: '개별 메시지 제목 TEST',
                content: '개별 메시지 내용 TEST',
            },
        ],
        // reserveTime: 'yyyy-MM-dd HH:mm',
        // reserveTimeZone: 'string',
    };

    const sendingSms = async () => {
        console.log('SMS Sending clicked');
        try {
            await axios(`https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`, {
                method: 'POST',
                headers: sensRequestHeaders,
                data: sensRequestBody,
            }).then((response) => console.log(JSON(response.data)));
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

export default NaverSens;
