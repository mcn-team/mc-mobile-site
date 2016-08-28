import React from 'react';
import { connect as Connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Quagga from 'quagga';

import HeaderComponent from '../commons/header';
import { Authentication } from '../../utils/authentication-helper';
import { scanCompletedAction, scanFailedAction } from './scan-actions';
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
            browserHistory.push('/');
        }
    }

    componentDidMount() {
        this.quaggaInitialization();

        //Mock scan
        Quagga.stop();
        this.props.dispatch(scanCompletedAction("9782811205218"));
    }

    componentDidUpdate() {
        if (!this.props.scan.code) {
            this.quaggaInitialization();
        }
    }

    quaggaInitialization() {
        Quagga.init({
            inputStream : {
                name : "Live",
                type : "LiveStream",
                target: document.querySelector('#scan'),
                constraints: {
                    width: 1920,
                    height: 1080,
                    facingMode: "environment"
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
            locate: true
        }, (err) => {
            if (err) {
                console.log(err);
                return;
            }

            Quagga.start();
        });

        Quagga.onDetected((data) => {
            Quagga.stop();
            this.props.dispatch(scanCompletedAction(data.codeResult.code));
        });
    }

    renderConfirm(scannedCode) {
        function insert(str, index, value) {
            return str.substr(0, index) + value + str.substr(index);
        }

        return (
            <section className="spacer has-text-centered">
                ISBN:
                <span>{ insert(insert(scannedCode, 1, ' '), 8, ' ') }</span>
                    <div className="columns is-marginless is-mobile">
                        <div className="column">
                            <LinkButton
                                path={'/add/' + scannedCode}
                                label="OK"
                            />
                        </div>
                        <div className="column">
                            <button type="button" className="button linear-grey"
                                    onClick={() => {
                                        this.props.dispatch(scanFailedAction());
                                    }}
                            >
                                Retry
                            </button>
                        </div>
                    </div>
            </section>
        );
    }

    renderScanner() {
        return (
            <section>
                <div id="scan"></div>
            </section>
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
}

const mapStateToProps = ({ scan }) => {
    return {
        scan: scan
    };
};

const ScanBookPage = Connect(mapStateToProps)(ScanBookPageComponent);
export default ScanBookPage;
