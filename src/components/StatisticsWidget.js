import React from 'react';
import { Card } from 'react-bootstrap';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const StatisticsWidget = (props) => {
    const textClass = props.textClass || 'text-muted';

    return (
        <Card
            className={classNames({
                'widget-flat': props.border === '',
                'widget-flat border border-primary': props.border === 'primary',
                'border border-danger': props.border === 'danger',
            })}
            style={{ height: props.height }}
        >
            <Card.Body>
                {props.icon && (
                    <div className="float-end">
                        <i className={classNames(props.icon, 'widget-icon')}></i>
                    </div>
                )}
                <h5 className={classNames('fw-normal', 'mt-0', textClass)} title={props.description}>
                    {props.title}
                </h5>
                <h3 className={classNames('mt-3', 'mb-3', props.textClass ? props.textClass : null)}>{props.stats}</h3>
                {props.amountBeforeProductsSales && (
                    <span className={classNames('mb-0')}>{props.amountBeforeProductsSales}</span>
                )}
                {props.trend && (
                    <p className={classNames('mb-0', textClass)}>
                        <span className={classNames(props.trend.textClass, 'me-2')}>
                            <i className={classNames(props.trend.icon)}></i> {props.trend.value}
                        </span>
                        <span className="text-nowrap">{props.trend.time}</span>
                    </p>
                )}
                {props.link && (
                    <Link to={props.link.value} style={{ color: '#fa5c7c' }}>확인하기</Link>
                )}
            </Card.Body>
        </Card>
    );
};

export default StatisticsWidget;
