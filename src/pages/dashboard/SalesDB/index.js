import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { salesData } from './data.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DefaultPagination from '../../../components/DefaultPagination.js';

import EditBtn from './EditBtn.js';
import EditTable from './EditTable.js';
import ReadOnlyTable from './ReadOnlyTable.js';

const SalesDB = () => {
    const [contacts, setContacts] = useState(salesData);
    // 페이지네이션
    const [page, setPage] = useState(1);
    const limit = 20;
    const offset = (page - 1) * limit;

    // 수정하기
    const [editMode, setEditMode] = useState(false);
    const editBtn = () => toast('정보 수정 화면으로 전환됩니다.');
    const saveBtn = () => toast('저장되었습니다.');

    const [editContactId, setEditContactId] = useState(null);
    const handleEditClick = (event, data) => {
        event.preventDefault();
        setEditContactId(data.id);
    };
    return (
        <>
            <Row>
                <Col xs={12}>
                    <div className="page-title-box">
                        <h4 className="page-title">매출DB</h4>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    {editMode ? (
                        <EditTable limit={limit} offset={offset} />
                    ) : (
                        <ReadOnlyTable limit={limit} offset={offset} />
                    )}
                </Col>
            </Row>
            <Row>
                <Col>
                    {salesData?.length > limit && (
                        <DefaultPagination total={salesData.length} limit={limit} page={page} setPage={setPage} />
                    )}
                </Col>
            </Row>

            <EditBtn setEditMode={setEditMode} editMode={editMode} saveBtn={saveBtn} editBtn={editBtn} />

            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
};

export default SalesDB;
