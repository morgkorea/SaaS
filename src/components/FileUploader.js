// @flow
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import Dropzone from 'react-dropzone';

type FileUploaderProps = {
    onFileUpload?: (files: any) => void,
    showPreview?: boolean,
    dropzoneText?: string,
    maxSize: number,
    filenameMaxLength: number,
    maxFiles: number,
};

const FileUploader = (props: FileUploaderProps): React$Element<any> => {
    const [selectedFiles, setSelectedFiles] = useState([]);

    /**
     * Handled the accepted number of files
     */

    if (props.maxFiles && selectedFiles.length > props.maxFiles) {
        const allFiles = [...selectedFiles].slice(0, props.maxFiles);
        alert('파일은 최대 ' + props.maxFiles + '개 까지 첨부가능합니다.');
        setSelectedFiles(allFiles);
    }

    /**
     * Handled the accepted files and shows the preview
     */
    const handleAcceptedFiles = (files) => {
        var allFiles = files;

        if (props.showPreview) {
            files.map((file) =>
                Object.assign(file, {
                    preview: file['type'].split('/')[0] === 'image' ? URL.createObjectURL(file) : null,
                    formattedSize: formatBytes(file.size),
                })
            );
            allFiles = [...selectedFiles];
            allFiles.push(...files);
            setSelectedFiles(allFiles);
        }

        /**
         * Handled the limited filename length
         */

        if (props.filenameMaxLength) {
            const isAllow = allFiles.every((file) => {
                return file.name.length <= props.filenameMaxLength;
            });

            if (!isAllow) {
                allFiles = [...selectedFiles];
                setSelectedFiles(allFiles);
                alert('파일 이름의 최대 길이(' + props.filenameMaxLength + '자)를 초과 했습니다.');
            }
        }

        if (props.onFileUpload) props.onFileUpload(allFiles);
    };

    /**
     * Formats the size
     */
    const formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };

    /*
     * Removes the selected file
     */
    const removeFile = (file) => {
        const newFiles = [...selectedFiles];
        newFiles.splice(newFiles.indexOf(file), 1);
        setSelectedFiles(newFiles);
    };

    /**
     * limited files sizes
     */

    return (
        <>
            <Dropzone {...props} onDrop={(acceptedFiles) => handleAcceptedFiles(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                    <div className="dropzone">
                        <div className="dz-message needsclick" {...getRootProps()}>
                            <input {...getInputProps()} />
                            {props.dropzoneText ? (
                                <div>{props.dropzoneText}</div>
                            ) : (
                                <div>
                                    <i className="h3 text-muted dripicons-cloud-upload"></i>
                                    <h5>Drop files here or click to upload.</h5>
                                    <span className="text-muted font-13">
                                        (This is just a demo dropzone. Selected files are <strong>not</strong> actually
                                        uploaded.)
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Dropzone>

            {props.showPreview && selectedFiles.length > 0 && (
                <div className="dropzone-previews mt-3" id="uploadPreviewTemplate">
                    {(selectedFiles || []).map((f, i) => {
                        return (
                            <Card className="mt-1 mb-0 shadow-none border" key={i + '-file'}>
                                <div className="p-2">
                                    <Row className="align-items-center">
                                        {f.preview && (
                                            <Col className="col-auto">
                                                <img
                                                    data-dz-thumbnail=""
                                                    className="avatar-sm rounded bg-light"
                                                    alt={f.name}
                                                    src={f.preview}
                                                />
                                            </Col>
                                        )}
                                        {!f.preview && (
                                            <Col className="col-auto">
                                                <div className="avatar-sm">
                                                    <span className="avatar-title bg-primary rounded">
                                                        {f.type.split('/')[0]}
                                                    </span>
                                                </div>
                                            </Col>
                                        )}
                                        <Col className="ps-0">
                                            <Link to="#" className="text-muted fw-bold">
                                                {f.name}
                                            </Link>
                                            <p className="mb-0">
                                                <strong>{f.formattedSize}</strong>
                                            </p>
                                        </Col>
                                        <Col className="text-end">
                                            <Link to="#" className="btn btn-link btn-lg text-muted shadow-none">
                                                <i className="dripicons-cross" onClick={() => removeFile(i)}></i>
                                            </Link>
                                        </Col>
                                    </Row>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            )}
        </>
    );
};

FileUploader.defaultProps = {
    showPreview: true,
};

export default FileUploader;
