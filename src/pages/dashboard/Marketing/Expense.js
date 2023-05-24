// @flow
import React from 'react';
import { Card } from 'react-bootstrap';
import SpendingChart from './SpendingChart';
import classNames from 'classnames';

const Expense = (props) => {
    const textClass = props.textClass || 'text-muted';

    return (
        <Card>
            <Card.Body>
                <div className="align-items-center d-sm-flex justify-content-sm-between mb-3">
                    <h4 className="header-title mb-0">광고비 지출</h4>
                </div>
                <div>
                    <h2>2,336,254원</h2>
                </div>
                {props.trend && (
                    <p className={classNames('mb-0', textClass)}>
                        <span className={classNames(props.trend.textClass, 'me-2')}>
                            <i className={classNames(props.trend.icon)}></i> {props.trend.value}
                        </span>
                        <span className="text-nowrap">{props.trend.time}전달 대비</span>
                    </p>
                )}
                <p className={classNames('mb-0', textClass)}>
                    <span className="text-nowrap">전달 대비</span>
                </p>
                <SpendingChart />
            </Card.Body>
        </Card>
    );
};

export default Expense;
