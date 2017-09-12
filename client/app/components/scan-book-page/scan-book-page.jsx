import React from 'react';
import { connect as Connect } from 'react-redux';
import Quagga from 'quagga';

import HeaderComponent from '../commons/header';
import { Authentication } from '../../utils/authentication-helper';
import { scanCompletedAction, scanFailedAction, scanResetAction } from './scan-actions';
import LinkButton from '../commons/link-button';

class ScanBookPageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.quaggaInitialization.bind(this);
        this.renderConfirm.bind(this);
        this.renderScanner.bind(this);
    }

    componentWillMount() {
        if (!Authentication.isUserLoggedIn()) {
            Authentication.dropCredentials();
        }
    }

    componentDidMount() {
        this.quaggaInitialization();

        //Mock scan
        // Quagga.stop();
        // this.props.dispatch(scanCompletedAction("9782811216535"));
    }

    componentDidUpdate() {
        if (!this.props.scan.code) {
            this.quaggaInitialization();
        }
    }

    quaggaInitialization() {
        navigator.mediaDevices.enumerateDevices()
            .then((devices) => {
                console.log(devices);
                return devices.filter(device => device.kind === 'videoinput' && device.label.indexOf('back') !== -1);
            })
            .then((backFacingDevices) => {
                const devices = backFacingDevices.map((device) => {
                    return device.deviceId;
                });
                Quagga.init({
                    inputStream : {
                        name : "Live",
                        type : "LiveStream",
                        target: document.querySelector('#scan'),
                        constraints: {
                            width: 1920,
                            height: 1080,
//                                facingMode: { exact: "environment" }
                            deviceId: devices[0]
                        }
                    },
                    decoder : {
                        readers : ["ean_reader"],
                        multiple: false
                    },
                    locator: {
                        halfSample: true,
                        patchSize: "large"
                    },
                    numOfWorkers: 4,
                    locate: false
                }, (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }

                    Quagga.start();
                });

                Quagga.onDetected((data) => {
                    Quagga.stop();
                    this.props.dispatch(scanCompletedAction(data.codeResult.code));
                });
        });
    }

    renderRetryButton(label) {
        return (
            <div className="column">
                <button type="button" className="button linear-grey"
                        onClick={() => {
                                        this.props.dispatch(scanFailedAction());
                                    }}
                >
                    { label }
                </button>
            </div>
        );
    }

    renderConfirm(scannedCode) {
        function insert(str, index, value) {
            return str.substr(0, index) + value + str.substr(index);
        }

        return (
            <section className="spacer has-text-centered">
                <div className="larger-font bottom-spacer">{ 'ISBN: ' + insert(insert(scannedCode, 1, ' '), 8, ' ') }</div>
                <div className="columns is-marginless is-mobile">
                    <div className="column">
                        <LinkButton
                            path={'/add/' + scannedCode}
                            label="OK"
                        />
                    </div>
                    { this.renderRetryButton('Retry') }
                </div>
            </section>
        );
    }

    renderScanner() {
        return (
            <div>
                <div className="columns is-marginless is-mobile has-text-centered">
                    { this.renderRetryButton('Refocus camera') }
                </div>
                <div id="scan"></div>
            </div>
        );
    }

    render() {
        const scannedCode = this.props.scan.code;
        return (
            <section className="columns is-marginless">
                <HeaderComponent title="Media Collection" subtitle="Scan book" />
                { scannedCode ? this.renderConfirm(scannedCode) : this.renderScanner() }
            </section>
        );
    }

    componentWillUnmount() {
        this.props.dispatch(scanResetAction());
    }
}

const mapStateToProps = ({ scan }) => {
    return {
        scan: scan
    };
};

const ScanBookPage = Connect(mapStateToProps)(ScanBookPageComponent);
export default ScanBookPage;
