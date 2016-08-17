import React from 'react';
import { connect as Connect } from 'react-redux';
import Quagga from 'quagga';

import HeaderComponent from '../commons/header';
import ScanMenu from '../add-book-page/scan-menu';

class AddBookPageComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        Quagga.init({
            debug: true,
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
                debug: {
                    drawBoundingBox: true,
                    showFrequency: false,
                    drawScanline: true,
                    showPattern: false
                },
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
            console.log("Initialization finished. Ready to start");
            Quagga.start();
        });

        Quagga.onDetected((data) => {
            Quagga.stop();

            function insert(str, index, value) {
                return str.substr(0, index) + value + str.substr(index);
            }

            const test = insert(insert(data.codeResult.code, 1, ' '), 8, ' ');
            alert(test);
            Quagga.start();
        });
    }

    render() {
        return (
            <section className="columns is-marginless">
                <HeaderComponent title="Media Collection" subtitle="Add book" />
                <ScanMenu />
                <div id="scan"></div>
            </section>
        );
    }
}

const mapStateToProps = () => {
    return {};
};

const AddBookPage = Connect(mapStateToProps)(AddBookPageComponent);
export default AddBookPage;
