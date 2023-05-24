import React from 'react';
import { Card, Table } from 'react-bootstrap';
import { salesData } from './data';
import Select from 'react-select';

const EditTable = ({ offset, limit }) => {
    return (
        <Card>
            <Card.Body>
                <div className="fixed-table-body">
                    <Table className="mb-0">
                        <thead>
                            <tr>
                                <th>회원번호</th>
                                <th>생성날짜</th>
                                <th>성함</th>
                                <th>유형</th>
                                <th>연령</th>
                                <th>휴대전화번호</th>
                                <th>위치</th>
                                <th>골프경력</th>
                                <th>골프목적</th>
                                <th>관심상품</th>
                                <th>이용시간대</th>
                                <th>부상전적</th>
                                <th>부상부위</th>
                                <th>유입경로</th>
                                <th>마케팅수신동의</th>
                                <th>개인정보수집동의</th>
                                <th>누적결제수</th>
                                <th>LTV(누적결제금액)</th>
                                <th>평균결제금액</th>
                                <th>활성여부</th>
                            </tr>
                        </thead>
                        <tbody>
                            {salesData?.slice(offset, offset + limit).map((data, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="text-center">{data.회원번호}</td>
                                        <td>{data.생성날짜}</td>
                                        <td>
                                            <input
                                                style={{ width: '42px' }}
                                                className="editInput"
                                                type="text"
                                                name="placeholder"
                                                placeholder={data.성함}
                                                // register={register}
                                                // key="placeholder"
                                                // errors={errors}
                                                // control={control}
                                            />
                                        </td>
                                        <td>
                                            <Select
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                placeholder={data.유형}
                                                options={[
                                                    { value: '신규', label: '신규' },
                                                    { value: '재등록', label: '재등록' },
                                                ]}></Select>
                                        </td>
                                        <td>
                                            <Select
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                placeholder={data.연령}
                                                options={[
                                                    { value: '10대', label: '10대' },
                                                    { value: '20대', label: '20대' },
                                                    { value: '30대', label: '30대' },
                                                    { value: '40대', label: '40대' },
                                                    { value: '50대', label: '50대' },
                                                    { value: '60대 이상', label: '60대 이상' },
                                                ]}></Select>
                                        </td>
                                        <td>
                                            <input
                                                style={{ width: '110px' }}
                                                className="editInput"
                                                type="tel"
                                                pattern="[0-9]*"
                                                name="placeholder"
                                                placeholder={data.휴대전화번호}
                                            />
                                        </td>
                                        <td>
                                            <Select
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                placeholder={data.위치}
                                                options={[
                                                    { value: '자택', label: '자택' },
                                                    { value: '직장', label: '직장' },
                                                    { value: '기타', label: '기타' },
                                                ]}></Select>
                                        </td>
                                        <td>
                                            <Select
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                placeholder={data.경력}
                                                options={[
                                                    { value: '비기너', label: '비기너' },
                                                    { value: '1~3년', label: '1~3년' },
                                                    { value: '3~5년', label: '3~5년' },
                                                    { value: '5년 이상', label: '5년 이상' },
                                                ]}></Select>
                                        </td>
                                        <td>
                                            <Select
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                placeholder={data.목적}
                                                options={[
                                                    { value: '골프 입문', label: '골프 입문' },
                                                    { value: '스윙 교정', label: '스윙 교정' },
                                                    { value: '비거리 향상', label: '비거리 향상' },
                                                    { value: '백돌이 탈출', label: '백돌이 탈출' },
                                                    { value: '숏게임', label: '숏게임' },
                                                    { value: '퍼팅', label: '퍼팅' },
                                                    { value: '기타', label: '기타' },
                                                ]}></Select>
                                        </td>
                                        <td>
                                            <Select
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                placeholder={data.관심상품}
                                                options={[
                                                    { value: '타석권', label: '타석권' },
                                                    { value: '레슨', label: '레슨' },
                                                    { value: '레슨 + 타석권', label: '레슨 + 타석권' },
                                                ]}></Select>
                                        </td>
                                        <td>
                                            <Select
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                placeholder={data.이용시간대}
                                                options={[
                                                    { value: '오전', label: '오전' },
                                                    { value: '낮', label: '낮' },
                                                    { value: '저녁', label: '저녁' },
                                                    { value: '밤', label: '밤' },
                                                ]}></Select>
                                        </td>
                                        <td>
                                            <Select
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                placeholder={data.부상전적}
                                                options={[
                                                    { value: '유', label: '유' },
                                                    { value: '무', label: '무' },
                                                ]}></Select>
                                        </td>
                                        <td>
                                            <Select
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                placeholder={data.부상부위}
                                                options={[
                                                    { value: '팔꿈치', label: '팔꿈치' },
                                                    { value: '허리', label: '허리' },
                                                    { value: '무릎', label: '무릎' },
                                                    { value: '손목', label: '손목' },
                                                    { value: '어깨', label: '어깨' },
                                                    { value: '등', label: '등' },
                                                    { value: '손가락', label: '손가락' },
                                                    { value: '기타', label: '기타' },
                                                ]}></Select>
                                        </td>
                                        <td>
                                            <Select
                                                data-width="100%"
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                placeholder={data.유입경로}
                                                options={[
                                                    { value: '네이버', label: '네이버' },
                                                    { value: '지인추천', label: '지인추천' },
                                                    { value: '인스타그램', label: '인스타그램' },
                                                    { value: '입주사', label: '입주사' },
                                                    { value: '제휴사', label: '제휴사' },
                                                    { value: '카카오톡 채널', label: '카카오톡 채널' },
                                                    { value: '당근마켓', label: '당근마켓' },
                                                    { value: '전단지', label: '전단지' },
                                                    { value: '외부간판 및 현수막', label: '외부간판 및 현수막' },
                                                    { value: '기타', label: '기타' },
                                                ]}></Select>
                                        </td>
                                        <td className="text-center">
                                            <input type="checkbox" checked={data.marketingAgreements} />
                                        </td>
                                        <td className="text-center">
                                            <input type="checkbox" checked={data.개인정보동의} />
                                        </td>
                                        <td>{data.누적결제수}</td>
                                        <td>{data.LTV}</td>
                                        <td>{data.평균결제금액}</td>
                                        <td className="text-center">
                                            <Select
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                placeholder={data.활성}
                                                options={[
                                                    { value: '활성', label: '활성' },
                                                    { value: '이탈', label: '이탈' },
                                                    { value: '일시중지', label: '일시중지' },
                                                ]}></Select>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
            </Card.Body>
        </Card>
    );
};

export default EditTable;
