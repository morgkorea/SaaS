import React from 'react';
import { Card, Table, ProgressBar } from 'react-bootstrap';
import CardTitle from '../../../components/CardTitle';

const Location = ({ members }) => {
    const allRegions = members.map((m) => m.region);

    let regions = allRegions.filter((element) => element !== undefined && element.trim() !== '');

    function mergeDuplicatesWithCount(regions) {
        const counts = {};

        regions.forEach((item) => {
            if (counts[item]) {
                counts[item]++; // 존재하는 경우 개수를 증가
            } else {
                counts[item] = 1; // 새로운 값이면 1로 초기화
            }
        });

        const merged = Object.entries(counts).map(([item, count]) => [item, count]);

        return merged;
    }

    const mergedDuplicates = mergeDuplicatesWithCount(regions);
    // console.log('regions:', regions);
    // console.log('중복 합치기:', mergedDuplicates);

    return (
        <Card>
            <Card.Body style={{ height: '450px' }}>
                <CardTitle
                    containerClass="d-flex align-items-center justify-content-between mb-3 pt-1"
                    title="지역"
                    // menuItems={[
                    //     { label: 'Weekly Report' },
                    //     { label: 'Monthly Report' },
                    //     { label: 'Action' },
                    //     { label: 'Settings' },
                    // ]}
                />
                <div style={{ height: '370px', overflowY: 'scroll' }}>
                    <Table responsive className="table table-sm table-centered mb-0 font-14">
                        <thead className="table-light">
                            <tr>
                                <th style={{ width: '25%' }}>지역</th>
                                <th style={{ width: '25%' }}>인원</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                                {mergedDuplicates.map((region) => (
                                    <tr key={region.index}>
                                        <td>{region[0]}</td>
                                        <td>{region[1]}명</td>
                                        <td>
                                            <ProgressBar
                                                now={Math.floor((region[1] / members.length) * 100)}
                                                style={{ height: '3px' }}
                                                variant=""
                                            />
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </div>
            </Card.Body>
        </Card>
    );
};

export default Location;
