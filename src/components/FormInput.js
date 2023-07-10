// @flow
import React, { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import classNames from 'classnames';

//loading spinner
import Spinner from './Spinner';

/* Password Input */
const PasswordInput = ({ name, placeholder, refCallback, errors, register, className }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <InputGroup className="mb-0">
                <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder}
                    name={name}
                    id={name}
                    as="input"
                    ref={(r) => {
                        if (refCallback) refCallback(r);
                    }}
                    className={className}
                    isInvalid={errors && errors[name] ? true : false}
                    {...(register ? register(name) : {})}
                    autoComplete={name}
                />

                <div
                    className={classNames('input-group-text', 'input-group-password', {
                        'show-password': showPassword,
                    })}
                    data-password={showPassword ? 'true' : 'false'}>
                    <span
                        className="password-eye"
                        onClick={() => {
                            setShowPassword(!showPassword);
                        }}></span>
                </div>
            </InputGroup>
        </>
    );
};

type FormInputProps = {
    label?: string,
    type?: string,
    name?: string,
    placeholder?: string,
    register?: any,
    errors?: any,
    className?: string,
    labelClassName?: string,
    containerClass?: string,
    refCallback?: any,
    children?: any,
    containerStyle?: any,
    emailVerfication?: Boolean,
    isEmailVerifying?: Boolean,
    getVerfiedUserFromFirebase?: any,
    isEmailVerified?: Boolean,
    loading?: Boolean,
};

const FormInput = ({
    label,
    type,
    name,
    placeholder,
    register,
    errors,
    className,
    labelClassName,
    containerClass,
    refCallback,
    children,
    containerStyle,
    emailVerfication,
    isEmailVerifying,
    getVerfiedUserFromFirebase,
    isEmailVerified,
    loading,
    ...otherProps
}: FormInputProps): React$Element<React$FragmentType> => {
    // handle input type
    const comp = type === 'textarea' ? 'textarea' : type === 'select' ? 'select' : 'input';

    return (
        <>
            {type === 'hidden' ? (
                <input type={type} name={name} {...(register ? register(name) : {})} {...otherProps} />
            ) : (
                <>
                    {type === 'password' ? (
                        <>
                            <Form.Group className={containerClass}>
                                {label ? (
                                    <>
                                        {' '}
                                        <Form.Label className={labelClassName}>{label}</Form.Label> {children}{' '}
                                    </>
                                ) : null}
                                <PasswordInput
                                    name={name}
                                    placeholder={placeholder}
                                    refCallback={refCallback}
                                    errors={errors}
                                    register={register}
                                    className={className}
                                    disabled={isEmailVerifying}
                                />

                                {errors && errors[name] ? (
                                    <Form.Control.Feedback type="invalid" className="d-block">
                                        {errors[name]['message']}
                                    </Form.Control.Feedback>
                                ) : null}
                            </Form.Group>
                        </>
                    ) : (
                        <>
                            {type === 'select' ? (
                                <>
                                    <Form.Group className={containerClass}>
                                        {label ? <Form.Label className={labelClassName}>{label}</Form.Label> : null}

                                        <Form.Select
                                            type={type}
                                            label={label}
                                            name={name}
                                            id={name}
                                            ref={(r) => {
                                                if (refCallback) refCallback(r);
                                            }}
                                            comp={comp}
                                            className={className}
                                            isInvalid={errors && errors[name] ? true : false}
                                            {...(register ? register(name) : {})}
                                            {...otherProps}>
                                            {children}
                                        </Form.Select>

                                        {errors && errors[name] ? (
                                            <Form.Control.Feedback type="invalid">
                                                {errors[name]['message']}
                                            </Form.Control.Feedback>
                                        ) : null}
                                    </Form.Group>
                                </>
                            ) : (
                                <>
                                    {type === 'checkbox' || type === 'radio' ? (
                                        <>
                                            <Form.Group className={containerClass}>
                                                <Form.Check
                                                    type={type}
                                                    label={label}
                                                    name={name}
                                                    id={name}
                                                    ref={(r) => {
                                                        if (refCallback) refCallback(r);
                                                    }}
                                                    className={className}
                                                    isInvalid={errors && errors[name] ? true : false}
                                                    {...(register ? register(name) : {})}
                                                    {...otherProps}
                                                />

                                                {errors && errors[name] ? (
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors[name]['message']}
                                                    </Form.Control.Feedback>
                                                ) : null}
                                            </Form.Group>
                                        </>
                                    ) : (
                                        <Form.Group className={containerClass} style={containerStyle}>
                                            <div style={{ width: '100%', marginBottom: '0px' }}>
                                                {label ? (
                                                    <Form.Label className={labelClassName}>{label}</Form.Label>
                                                ) : null}

                                                <div>
                                                    <div className="d-flex">
                                                        <Form.Control
                                                            type={type}
                                                            placeholder={placeholder}
                                                            name={name}
                                                            id={name}
                                                            as={comp}
                                                            ref={(r) => {
                                                                if (refCallback) refCallback(r);
                                                            }}
                                                            className={className}
                                                            isInvalid={errors && errors[name] ? true : false}
                                                            {...(register ? register(name) : {})}
                                                            {...otherProps}
                                                            autoComplete={name}>
                                                            {children ? children : null}
                                                        </Form.Control>
                                                        {emailVerfication && name === 'email' ? (
                                                            <Button
                                                                variant="primary"
                                                                disabled={isEmailVerified || isEmailVerifying}
                                                                isInvalid={errors && errors[name] ? true : false}
                                                                style={{
                                                                    minWidth: '55.71px',
                                                                    padding: '0.3rem 0.45rem',
                                                                }}
                                                                onClick={getVerfiedUserFromFirebase}>
                                                                {loading ? (
                                                                    <Spinner
                                                                        className="me-1"
                                                                        size="sm"
                                                                        color="white"
                                                                        style={{ width: '15px', height: '15px' }}
                                                                    />
                                                                ) : (
                                                                    '인증'
                                                                )}
                                                            </Button>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </div>

                                            {errors && errors[name] ? (
                                                <Form.Control.Feedback type="invalid" className="d-block">
                                                    {errors[name]['message']}
                                                </Form.Control.Feedback>
                                            ) : null}
                                        </Form.Group>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default FormInput;
