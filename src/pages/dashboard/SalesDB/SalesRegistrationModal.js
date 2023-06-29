// @flow
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Row, Col, Button, Modal, Alert, Card, Form } from 'react-bootstrap';

import { FormInput } from '../../../components/';
import HyperDatepicker from '../../../components/Datepicker';
import classNames from 'classnames';

import { firestoreDB } from '../../../firebase/firebase';
import {
    firestoreSalesFieldSchema,
    firestoreSalesProductSchema,
    firestoreProductsFieldSchema,
} from '../../../firebase/firestoreDbSchema';

import { collection, query, where, doc, getDocs, updateDoc, onSnapshot } from 'firebase/firestore';

import * as Hangul from 'hangul-js';
import { disassemble } from 'hangul-js';

import salesRegistrationStep1 from '../../../assets/images/icons/png/salesRegistrationStep1.png';
import salesRegistrationStep2 from '../../../assets/images/icons/png/salesRegistrationStep2.png';
import salesRegistrationStep3 from '../../../assets/images/icons/png/salesRegistrationStep3.png';
import salesRegistrationStep4 from '../../../assets/images/icons/png/salesRegistrationStep4.png';

//loading spinner
import Spinner from '../../../components/Spinner';

const SalesRegistrationModal = ({ modal, setModal }) => {
    const [registrationStep, setRegistrationStep] = useState(1);

    const [registrationSalesProducts, setRegistrationSalesProducts] = useState(Array.from({ length: 5 }, () => ({})));

    console.log(registrationSalesProducts);
    //step 1 =================================================================
    //선택 회원
    const [isSelectedMember, setIsSelectedMember] = useState(false);

    // 회원 이름 , 전화번호 검색
    const [searchingName, setSearchingName] = useState('');
    const [searchingPhone, setSearchingPhone] = useState('');
    const [searchedMembersList, setSearchedMembersList] = useState([]);

    // fetching data
    const [membersList, setMembersList] = useState([]);

    const [isHoveredCard, setIsHoveredCard] = useState(false);

    //step 2 ==================================================================
    // fetching data
    const [productsList, setProductsList] = useState([]);

    //selected product
    const [selectedProduct, setSelectedProduct] = useState(false);

    // discount rate
    const [productDiscountRate, setProductDiscountRate] = useState(0);

    // picked date
    const [productStartDate, setProductStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [productEndDate, setProductEndDate] = useState(new Date().toISOString().split('T')[0]);

    const [productSelectIndexValue, setProductSelectIndexValue] = useState(false);

    const [isHoverDeleteIcon, setIsHoverDeleteIcon] = useState(false);

    //step 3 =================================================================
    const [isHoverModifiyButton, setIsHoverModifiyButton] = useState(false);

    const [priceEditMode, setPriceEditMode] = useState(false);

    const [modifyPriceList, setModifyPriceList] = useState([0, 0, 0, 0, 0]);

    const [size, setSize] = useState('lg');

    const createFirestoreRegistrationSalesProducts = () => {
        const registrationSalesProductsArray = [...registrationSalesProducts];

        const calculateProductDuration = (startDate, periodString) => {
            let calculatedDate = new Date(startDate);
            if (periodString.includes('개월')) {
                calculatedDate.setMonth(calculatedDate.getMonth() + ~~periodString.replace('개월', ''));
                calculatedDate.setDate(calculatedDate.getDate() - 1);
                console.log(~~periodString.replace('개월', ''));
            } else if (periodString.includes('일')) {
                calculatedDate.setDate(calculatedDate.getDate() + ~~periodString.replace('일', '') - 1);
            }

            return calculatedDate.toISOString().split('T')[0];
        };

        const salesProductData = {
            ...firestoreSalesProductSchema,
            productCode: selectedProduct?.productCode,
            product: selectedProduct?.product,
            productType: selectedProduct?.type,
            regularPrice: selectedProduct?.regularPrice,
            discountRate: productDiscountRate,
            discountPrice: selectedProduct?.regularPrice - selectedProduct?.regularPrice * (productDiscountRate / 100),
            startDate: productStartDate,
            endDate: calculateProductDuration(productStartDate, selectedProduct.expirationPeriod),
        };

        console.log(salesProductData);

        registrationSalesProductsArray.unshift(salesProductData);
        registrationSalesProductsArray.pop();

        setRegistrationSalesProducts(registrationSalesProductsArray);

        // registrationSalesProducts 리스트 업 후 항목별 값 초기화
        setSelectedProduct(false);
        setProductDiscountRate(0);
        setProductStartDate(new Date().toISOString().split('T')[0]);
        setProductEndDate(new Date().toISOString().split('T')[0]);
        setProductSelectIndexValue(false);
    };
    console.log('productsList', productsList);
    console.log('selectedProduct', selectedProduct);

    const toggle = () => {
        setModal(!modal);
    };

    const email = useSelector((state) => {
        return state.Auth?.user?.email;
    });
    const switchRegistrationStepImg = (registrationStep) => {
        switch (registrationStep) {
            case 1:
                return salesRegistrationStep1;
                break;
            case 2:
                return salesRegistrationStep2;
                break;
            case 3:
                return salesRegistrationStep3;
                break;
            case 4:
                return salesRegistrationStep4;
                break;

            default:
                return salesRegistrationStep1;
        }
    };

    const swithRegistrationStepForm = (registrationStep) => {
        switch (registrationStep) {
            case 1:
                return salesRegistrationStep1;
                break;
            case 2:
                return salesRegistrationStep2;
                break;
            case 3:
                return salesRegistrationStep3;
                break;
            case 4:
                return salesRegistrationStep4;
                break;

            default:
                return salesRegistrationStep1;
        }
    };

    const applyRegistartionProducts = (e) => {
        const registrationSalesProducts = [...registrationSalesProducts];
    };
    const handleRegistrationStep = (event) => {
        console.log(event.target.textContent);
        return event.target.textContent === '다음'
            ? setRegistrationStep(registrationStep + 1)
            : setRegistrationStep(registrationStep - 1);
    };

    const removeRegistrationSalesProductsElement = (index) => {
        const registrationSalesProductsArray = [...registrationSalesProducts];

        registrationSalesProductsArray.splice(index, 1);
        console.log(registrationSalesProductsArray);
        registrationSalesProductsArray.push({});

        setRegistrationSalesProducts(registrationSalesProductsArray);
    };

    const getProductDiscountRate = (event) => {
        let rate = Number(event.target.value);
        if (rate < 0) {
            rate = 0;
        } else if (rate > 100) {
            rate = 100;
        }

        setProductDiscountRate(rate);
    };

    const getSelectedMember = (searchedMembersList, idx) => {
        if (!isSelectedMember) {
            setIsSelectedMember(searchedMembersList[idx]);
        } else {
            setIsSelectedMember(false);
        }

        console.log(isSelectedMember);
    };

    const getSearchingName = (event) => {
        // event.persist(); // event pooling , event 객체 null 값 방지
        console.log(event.target.value);
        setSearchingName(event.target.value);
    };

    const getSearchingPhone = (event) => {
        setSearchingPhone(event.target.value);
    };

    const searchMembers = (membersList) => {
        if (searchingName.length || searchingPhone.length) {
            let members =
                membersList.length > 0
                    ? [...membersList].filter((member) => {
                          if (member && typeof member.name === 'string') {
                              let memberCho = disassemble(member.name, true)
                                  .map((ele) => ele[0])
                                  .join('');
                              return (
                                  ([...searchingName].every((element, idx) => {
                                      return element === memberCho[idx];
                                  }) || member.name?.includes(searchingName)
                                      ? true
                                      : false) && member.phone?.includes(searchingPhone)
                              );
                          }
                      })
                    : [];
            console.log(members);
            setSearchedMembersList(members);
        } else if (searchingName.length < 1 && searchingPhone.length < 1) {
            setSearchedMembersList([]);
        }
    };

    const getSelectedProduct = (event) => {
        const index = event.target.value;
        const product = productsList.length > 0 ? productsList[index] : { ...firestoreProductsFieldSchema };

        setSelectedProduct(product);
        setProductSelectIndexValue(index);
    };

    const getProductStartDate = (event) => {
        console.log(event.target.value);
        setProductStartDate(event.target.value);
    };

    const getFirestoreMembersList = async () => {
        try {
            const memebersCollectionRef = collection(firestoreDB, 'Users', email, 'Members');
            onSnapshot(memebersCollectionRef, (querySnapshot) => {
                const membersArray = [];
                querySnapshot.forEach((member) => {
                    membersArray.push(member.data());
                });
                console.log(membersArray);
                setMembersList(membersArray);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const getFiresotreProductsList = async () => {
        try {
            const productsCollectionRef = collection(firestoreDB, 'Users', email, 'Products');
            onSnapshot(productsCollectionRef, (querySnapshot) => {
                const productArray = [];
                querySnapshot.forEach((product) => {
                    productArray.push(product.data());
                });
                console.log(productArray);
                setProductsList(productArray);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const createSearchedMembersCard = (searchedMembersList, isSelectedMember) => {
        const handleMouseEnter = (e, idx) => {
            e.preventDefault();

            setIsHoveredCard(idx);
            console.log(isHoveredCard);
        };

        const handleMouseLeave = () => {
            setIsHoveredCard(false);
        };

        if (isSelectedMember) {
            return (
                <div
                    className="mb-2 "
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '49%',
                        minWidth: '162px',
                        height: '80px',
                        border: '2px solid #03C780',
                        borderRadius: '6px',
                        padding: '9px 15px',
                        cursor: 'pointer',
                    }}
                    onClick={(event) => {
                        getSelectedMember();
                    }}>
                    <div>
                        {' '}
                        <div
                            style={{
                                color: '#313A46',
                                fontSize: '15px',
                                fontWeight: '700',
                            }}>
                            {isSelectedMember.name}
                        </div>
                        <div style={{ color: '#6C757D', fontSize: '14px' }}>{isSelectedMember.phone}</div>
                    </div>

                    <div>
                        <i className="mdi mdi-radiobox-marked" style={{ color: '#03C780', fontSize: '24px' }}></i>
                    </div>
                </div>
            );
        } else if (searchedMembersList.length) {
            return searchedMembersList.map((member, idx) => {
                return (
                    <div
                        key={member.memberNumber + idx}
                        className="mb-2 "
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '49%',
                            minWidth: '162px',
                            height: '80px',
                            border: isHoveredCard === idx ? '2px solid #03C780' : '1px solid #EEF2F7',
                            borderRadius: '6px',
                            padding: isHoveredCard === idx ? '9px 15px' : '10px 16px',
                            cursor: 'pointer',
                        }}
                        onClick={(event) => {
                            getSelectedMember(searchedMembersList, idx);
                        }}
                        onMouseEnter={(event) => {
                            handleMouseEnter(event, idx);
                        }}
                        onMouseLeave={handleMouseLeave}>
                        <div>
                            {' '}
                            <div
                                style={{
                                    color: '#313A46',
                                    fontSize: '15px',
                                    fontWeight: '700',
                                }}>
                                {member.name}
                            </div>
                            <div style={{ color: '#6C757D', fontSize: '14px' }}>{member.phone}</div>
                        </div>

                        <div>
                            <i
                                className="mdi mdi-radiobox-blank"
                                style={{ color: isHoveredCard === idx ? '#03C780' : '#EEF2F7', fontSize: '24px' }}></i>
                        </div>
                    </div>
                );
            });
        }
    };

    const handleHoverDeleteIcon = (index) => {
        setIsHoverDeleteIcon(index);
    };

    const handleHoverModifyButton = (boolean) => {
        setIsHoverModifiyButton(boolean);
    };

    const togglePriceEditMode = () => {
        setPriceEditMode(!priceEditMode);
    };

    const calculateModifiyPrice = (event, idx, maxPrice) => {
        const modifyPriceArray = [...modifyPriceList];
        if (event.target.value > maxPrice) {
            modifyPriceArray[idx] = maxPrice;
        } else if (event.target.value === '') {
            modifyPriceArray[idx] = 0;
        } else {
            modifyPriceArray[idx] = Number(event.target.value);
        }

        setModifyPriceList(modifyPriceArray);
    };

    const handleResitrationProductsAdujestPrice = () => {
        const registerArray = [...registrationSalesProducts];
        modifyPriceList.forEach((subtract, idx) => {
            if (subtract > 0) {
                registerArray[idx].adjustedPrice = registerArray[idx].discountPrice - subtract;
            }
        });
        setRegistrationSalesProducts(registerArray);
    };
    console.log(modifyPriceList);
    const handleRenderingBodyContent = (registrationStep) => {
        const resitrationProductsTotalPrice = registrationSalesProducts.reduce((acc, curr) => {
            return curr.discountPrice ? acc + curr.discountPrice : acc;
        }, 0);
        let isModifiedPrice =
            [...modifyPriceList].reduce((acc, curr) => acc + curr, 0) > 0 && !priceEditMode ? true : false;

        const handleReneringRegistrationProducts = () => {
            return [...registrationSalesProducts].map((product, idx) => {
                const productName = product.product;
                const regularPrice = product.regularPrice;
                const discountRate = product.discountRate;
                const startDate = product.startDate;
                const endDate = product.endDate;
                const discountPrice = product.discountPrice;
                const adjustedPrice = product.discountPrice - modifyPriceList[idx];

                return (
                    <div
                        style={{
                            display: registrationStep === 3 && !productName ? 'none' : 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '12px',
                            fontSize: '12px',
                            placeItems: 'center',
                        }}>
                        <div
                            style={{
                                display: 'flex',
                                width: '60%',
                                placeItems: 'center',
                            }}>
                            {idx + 1}. {productName && productName + ' / '}
                            {discountRate > 0 ? discountRate + '%' + ' / ' : ' '}
                            {startDate
                                ? endDate &&
                                  startDate.substring(2).replace(/-/g, '.') +
                                      ' ~ ' +
                                      endDate.substring(2).replace(/-/g, '.')
                                : ' '}
                            {registrationStep === 3 && productName ? (
                                <div style={{ color: '#03C780', marginLeft: '4px' }}>
                                    {discountRate > 0 ? discountRate + '% 할인 적용' : ''}
                                </div>
                            ) : null}
                        </div>

                        <div style={{ display: 'flex', width: '40%', justifyContent: 'end', placeItems: 'center' }}>
                            <div
                                style={{
                                    display: 'flex',
                                    width: '100%',
                                    justifyContent: priceEditMode && registrationStep === 3 ? 'space-between' : 'end',
                                    placeItems: 'center',
                                }}>
                                {productName && priceEditMode && registrationStep === 3 ? (
                                    <div
                                        style={{
                                            display: 'flex',
                                            borderRadius: '2px',
                                            border: '1px solid #EEF2F7',
                                            justifyContent: 'end',
                                            placeItems: 'center',
                                            padding: '0px 4px',
                                        }}>
                                        <FormInput
                                            type="text"
                                            name="productDiscountRate"
                                            placeholder="-"
                                            containerClass={''}
                                            key="productDiscountRate"
                                            min={0}
                                            max={100}
                                            style={{
                                                minWidth: '80px',
                                                border: '0px',
                                                textAlign: 'right',
                                                fontSize: '12px',
                                                padding: '2px 2px',
                                            }}
                                            value={modifyPriceList[idx]}
                                            onChange={(e) => {
                                                calculateModifiyPrice(e, idx, discountPrice);
                                            }}
                                        />
                                        <div>원</div>
                                    </div>
                                ) : null}{' '}
                                {registrationStep === 3 && modifyPriceList[idx] > 0 && !priceEditMode ? (
                                    <div style={{ marginRight: '70px', color: '#FA5C7C' }}>
                                        -{modifyPriceList[idx].toLocaleString()}원
                                    </div>
                                ) : null}
                                <span>
                                    {regularPrice && discountRate
                                        ? adjustedPrice.toLocaleString() + '원'
                                        : discountRate === 0
                                        ? adjustedPrice.toLocaleString() + '원'
                                        : '-'}
                                </span>
                                {productName && registrationStep < 3 ? (
                                    <div
                                        onClick={() => {
                                            removeRegistrationSalesProductsElement(idx);
                                        }}
                                        onMouseEnter={() => {
                                            handleHoverDeleteIcon(idx);
                                        }}
                                        onMouseLeave={() => {
                                            handleHoverDeleteIcon(false);
                                        }}>
                                        <i
                                            className="mdi mdi-delete-outline xl"
                                            style={{
                                                fontSize: '20px',
                                                cursor: 'pointer',
                                                color: isHoverDeleteIcon === idx ? '#03C780' : '#98A6AD',
                                            }}
                                        />
                                    </div>
                                ) : registrationStep > 2 ? null : (
                                    <div style={{ width: '10px' }}></div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            });
        };

        switch (registrationStep) {
            case 1:
                return (
                    <div className="container" style={{ padding: '0' }}>
                        <h3 className="modal-title mb-2">회원 검색</h3>
                        <div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
                                {' '}
                                <div className="mb-2">
                                    <div>회원성함</div>
                                    <div style={{ display: 'flex', border: '1px solid #EEF2F7', borderRadius: '6px' }}>
                                        <div className="font-24" style={{ marginLeft: '3px' }}>
                                            <i className="mdi mdi-magnify" />
                                        </div>
                                        <input
                                            onChange={getSearchingName}
                                            type="text"
                                            className="form-control"
                                            style={{ border: 'none', padding: 0 }}
                                        />
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <div>전화번호</div>
                                    <div style={{ display: 'flex', border: '1px solid #EEF2F7', borderRadius: '6px' }}>
                                        <div className="font-24" style={{ marginLeft: '3px' }}>
                                            <i className="mdi mdi-magnify" />
                                        </div>
                                        <input
                                            onChange={getSearchingPhone}
                                            type="text"
                                            className="form-control"
                                            style={{ border: 'none', padding: 0 }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* <div className="mb-2">
                        <div>오디언스</div>
                        <div style={{ display: 'flex', border: '1px solid #EEF2F7', borderRadius: '6px' }}>
                            <select
                                className="w-100 p-1"
                                style={{
                                    height: '40px',
                                    border: '1px solid #DEE2E6',
                                    borderRadius: ' 2px',
                                    cursor: 'pointer',
                                }}>
                                <option value={true}>신규</option>
                                <option value={false}>재등록</option>
                            </select>
                        </div>
                    </div> */}
                            <div
                                className="p-2"
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    justifyContent: 'space-between',
                                    overflowY: 'auto',
                                    maxHeight: '300px',
                                }}>
                                {' '}
                                {createSearchedMembersCard(searchedMembersList, isSelectedMember)}
                            </div>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="container" style={{ display: 'flex', width: '100%', padding: '0' }}>
                        <div style={{ width: '50%' }}>
                            <h3 className="modal-title mb-2">
                                {isSelectedMember.name ? isSelectedMember.name + ' ' : ''}회원 상품 적용
                            </h3>
                            <div className="mb-2">
                                <Form.Label>상품</Form.Label>
                                <Form.Select value={productSelectIndexValue} onChange={getSelectedProduct}>
                                    <option value={false} disabled>
                                        상품을 선택해주세요
                                    </option>
                                    {productsList.map((product, idx) => {
                                        if (product.activation && product.product.length) {
                                            return (
                                                <option key={product.product + '_' + idx} value={idx}>
                                                    {product.product}
                                                </option>
                                            );
                                        }
                                    })}
                                </Form.Select>
                            </div>

                            <div className="mb-2">
                                <div style={{ position: 'relative' }}>
                                    <FormInput
                                        type="text"
                                        label="할인율"
                                        name="productDiscountRate"
                                        placeholder="-"
                                        containerClass={''}
                                        key="productsNumber"
                                        min={0}
                                        max={100}
                                        onChange={getProductDiscountRate}
                                        value={productDiscountRate}
                                    />
                                    <div style={{ position: 'absolute', right: '16px', bottom: '8px' }}>%</div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <div>
                                    {' '}
                                    <FormInput
                                        label="시작일"
                                        type="date"
                                        name="productStartDate"
                                        containerClass={''}
                                        key="productStartDate"
                                        onChange={getProductStartDate}
                                        disabled={selectedProduct ? false : true}
                                        value={productStartDate}
                                    />
                                </div>
                            </div>
                            <div className="mb-2">
                                <Button
                                    variant="primary"
                                    style={{ width: '100%' }}
                                    disabled={!selectedProduct}
                                    onClick={createFirestoreRegistrationSalesProducts}>
                                    적용하기
                                </Button>
                            </div>
                        </div>
                        <div style={{ width: '50%', paddingLeft: '24px' }}>
                            <div style={{ borderBottom: '1px solid #EEF2F7', marginBottom: '16px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                    <span>정상가</span>
                                    <span>
                                        {selectedProduct.regularPrice
                                            ? selectedProduct.regularPrice.toLocaleString() + '원'
                                            : '-'}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                    <span>할인율</span>
                                    <span>
                                        {' '}
                                        {productDiscountRate > 0 ? productDiscountRate.toLocaleString() + '%' : '-'}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                    <span>할인액</span>
                                    <span>
                                        {selectedProduct.regularPrice && productDiscountRate > 0
                                            ? (
                                                  selectedProduct.regularPrice *
                                                  (productDiscountRate / 100)
                                              ).toLocaleString() + '원'
                                            : '-'}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                    <span>할인가</span>

                                    {selectedProduct.regularPrice && productDiscountRate > 0 ? (
                                        <span style={{ color: '#03C780' }}>
                                            {(
                                                selectedProduct.regularPrice -
                                                selectedProduct.regularPrice * (productDiscountRate / 100)
                                            ).toLocaleString() + '원'}
                                        </span>
                                    ) : (
                                        <span>-</span>
                                    )}
                                </div>
                            </div>
                            <div
                                style={{
                                    borderBottom: '1px solid #EEF2F7',
                                    marginBottom: '16px',
                                }}>
                                <div style={{ marginBottom: '8px' }}>적용상품</div>
                                <div style={{ padding: '0px' }}>{handleReneringRegistrationProducts()}</div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>최종금액</div>

                                {resitrationProductsTotalPrice > 0 ? (
                                    <span style={{ color: '#03C780' }}>
                                        {resitrationProductsTotalPrice.toLocaleString() + '원'}
                                    </span>
                                ) : (
                                    <span>-</span>
                                )}
                            </div>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="container" style={{ padding: '0' }}>
                        <h3 className="modal-title mb-2">
                            {isSelectedMember.name ? isSelectedMember.name + ' ' : ''}회원 최종금액조정
                        </h3>
                        <div className="mb-3">
                            {priceEditMode ? (
                                <div style={{ display: 'flex' }}>
                                    <div style={{ width: '60%', marginBottom: '16px' }}>적용상품</div>
                                    <div style={{ width: '40%', display: 'flex', justifyContent: 'space-between' }}>
                                        <div style={{ minWidth: '100px', textAlign: 'right' }}>조정금액</div>
                                        <div>상품금액</div>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                                    <div>적용상품</div>
                                    <div>상품금액</div>
                                </div>
                            )}

                            <div style={{ padding: '4px', borderBottom: '1px solid #EEF2F7' }}>
                                {handleReneringRegistrationProducts()}
                            </div>
                        </div>
                        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                            <div>최종 금액</div>
                            {resitrationProductsTotalPrice > 0 ? (
                                <span style={{ color: '#03C780' }}>
                                    {resitrationProductsTotalPrice.toLocaleString() + '원'}
                                </span>
                            ) : (
                                <span>-</span>
                            )}
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                width: '100%',
                                justifyContent: 'end',
                                padding: '16px 0px',
                                borderBottom: isModifiedPrice ? '1px solid #EEF2F7' : '0px',
                            }}>
                            <Button
                                style={{
                                    padding: '10px 13px',
                                    border: '1px solid #6C757D',
                                    borderRadius: '8px',
                                    backgroundColor: isHoverModifiyButton ? '#DFDFDF' : '#FFFFFF',
                                    boxShadow: 'none',
                                    color: '#6C757D',
                                }}
                                onClick={togglePriceEditMode}
                                onMouseEnter={() => {
                                    handleHoverModifyButton(true);
                                }}
                                onMouseLeave={() => {
                                    handleHoverModifyButton(false);
                                }}>
                                {priceEditMode ? '조정 완료' : '최종금액 조정하기'}
                            </Button>
                        </div>

                        {isModifiedPrice && (
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    placeItems: 'center',
                                    paddingTop: '28px',
                                }}>
                                <div>최종 조정금액</div>
                                <div style={{ color: '#03C780', fontSize: '24px', fontWeight: '700' }}>
                                    {(
                                        resitrationProductsTotalPrice -
                                        modifyPriceList.reduce((acc, curr) => acc + curr, 0)
                                    ).toLocaleString() + '원'}
                                </div>
                            </div>
                        )}
                    </div>
                );
            case 4:
                return (
                    <div className="container" style={{ padding: '0' }}>
                        <h3 className="modal-title mb-2">
                            {isSelectedMember.name ? isSelectedMember.name + ' ' : ''}회원 결제정보 입력
                        </h3>
                        <div className="mb-3">
                            <Row>
                                <div style={{ marginBottom: '16px', fontSize: '12px' }}>결제정보 1</div>
                                <Col>
                                    <Form.Select name="paymentType">
                                        <option value="" selected disabled>
                                            결제수단을 선택해주세요
                                        </option>
                                        <option>카드</option>
                                        <option>현금</option>
                                    </Form.Select>
                                </Col>
                                <Col style={{ position: 'relative' }}>
                                    <FormInput
                                        type="text"
                                        name="paymentPrice"
                                        placeholder="결제 금액을 입력해주세요."></FormInput>
                                    <div style={{ position: 'absolute', right: '20px', bottom: '8px' }}>원</div>
                                </Col>
                                <Col>
                                    <FormInput
                                        type="text"
                                        name="recieptNumber"
                                        placeholder="영수증 번호를 입력해주세요."
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <div style={{ margin: '16px 0px', fontSize: '12px' }}>결제정보 2</div>
                                <Col>
                                    <Form.Select name="paymentType">
                                        <option value="" selected disabled>
                                            결제수단을 선택해주세요
                                        </option>
                                        <option>카드</option>
                                        <option>현금</option>
                                    </Form.Select>
                                </Col>
                                <Col style={{ position: 'relative' }}>
                                    <FormInput
                                        type="text"
                                        name="paymentPrice"
                                        placeholder="결제 금액을 입력해주세요."></FormInput>
                                    <div style={{ position: 'absolute', right: '20px', bottom: '8px' }}>원</div>
                                </Col>
                                <Col>
                                    <FormInput
                                        type="text"
                                        name="recieptNumber"
                                        placeholder="영수증 번호를 입력해주세요."
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <div style={{ margin: '16px 0px', fontSize: '12px' }}>결제정보 3</div>
                                <Col>
                                    <Form.Select name="paymentType">
                                        <option value="" selected disabled>
                                            결제수단을 선택해주세요
                                        </option>
                                        <option>카드</option>
                                        <option>현금</option>
                                    </Form.Select>
                                </Col>
                                <Col style={{ position: 'relative' }}>
                                    <FormInput
                                        type="text"
                                        name="paymentPrice"
                                        placeholder="결제 금액을 입력해주세요."></FormInput>
                                    <div style={{ position: 'absolute', right: '20px', bottom: '8px' }}>원</div>
                                </Col>
                                <Col>
                                    <FormInput
                                        type="text"
                                        name="recieptNumber"
                                        placeholder="영수증 번호를 입력해주세요."
                                    />
                                </Col>
                            </Row>
                            <Row style={{ fontSize: '12px' }}>
                                <Col>
                                    <div style={{ margin: '16px 0px', fontSize: '12px' }}>결제일</div>
                                    <FormInput
                                        type="date"
                                        name="paymentPrice"
                                        placeholder="결제 금액을 입력해주세요."></FormInput>
                                </Col>
                                <Col>
                                    <div style={{ margin: '16px 0px', fontSize: '12px' }}>결제시간</div>
                                    <FormInput
                                        type="time"
                                        name="recieptNumber"
                                        placeholder="영수증 번호를 입력해주세요."
                                    />
                                </Col>
                            </Row>
                        </div>
                    </div>
                );
        }
    };

    const handleRenderingFooterContent = (registrationStep) => {
        switch (registrationStep) {
            case 1:
                return (
                    <Button
                        variant="primary"
                        onClick={(event) => {
                            handleRegistrationStep(event);
                        }}
                        disabled={!isSelectedMember}
                        style={{ width: '200px' }}>
                        다음
                    </Button>
                );
            case 2:
                return (
                    <>
                        <Button
                            variant="secondary"
                            onClick={(event) => {
                                handleRegistrationStep(event);
                            }}
                            style={{ width: '200px' }}>
                            이전
                        </Button>
                        <Button
                            variant="primary"
                            onClick={(event) => {
                                handleRegistrationStep(event);
                            }}
                            disabled={!registrationSalesProducts[0].hasOwnProperty('product')}
                            style={{ width: '200px' }}>
                            다음
                        </Button>
                    </>
                );
            case 3:
                return (
                    <>
                        <Button
                            variant="secondary"
                            onClick={(event) => {
                                handleRegistrationStep(event);
                            }}
                            style={{ width: '200px' }}>
                            이전
                        </Button>
                        <Button
                            variant="primary"
                            onClick={(event) => {
                                handleRegistrationStep(event);
                            }}
                            style={{ width: '200px' }}
                            disabled={priceEditMode}>
                            다음
                        </Button>
                    </>
                );
            case 4:
                return (
                    <>
                        <Button
                            variant="secondary"
                            onClick={(event) => {
                                handleRegistrationStep(event);
                            }}
                            style={{ width: '200px' }}>
                            이전
                        </Button>
                        <Button
                            variant="primary"
                            onClick={(event) => {
                                handleRegistrationStep(event);
                            }}
                            style={{ width: '200px' }}>
                            다음
                        </Button>
                    </>
                );
        }
    };

    useEffect(() => {
        searchMembers(membersList);
    }, [searchingName, searchingPhone]);

    useEffect(() => {
        getFirestoreMembersList();
        getFiresotreProductsList();
    }, []);

    useEffect(() => {
        handleResitrationProductsAdujestPrice();
    }, [modifyPriceList]);

    return (
        <>
            <Modal show={modal} onHide={toggle} size={size} centered={true}>
                <Modal.Header
                    className="border-bottom-0"
                    onHide={toggle}
                    style={{ margin: '12px 0px' }}
                    closeButton></Modal.Header>
                <Modal.Body style={{ width: '100%', height: '570px', padding: '0px 60px' }}>
                    <div style={{ width: '100%', paddingBottom: '32px' }}>
                        <img src={switchRegistrationStepImg(registrationStep)} style={{ width: '100%' }} />
                    </div>
                    {handleRenderingBodyContent(registrationStep)}
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center border-top-0" style={{ paddingBottom: '48px' }}>
                    {handleRenderingFooterContent(registrationStep)}
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SalesRegistrationModal;
