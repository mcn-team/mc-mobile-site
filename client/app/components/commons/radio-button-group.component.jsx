import React from 'react';

export class RadioButtonGroup extends React.Component {
    constructor(props) {
        super(props);

        this.state = { active: props.selected || 0 };
        this.updateStatus = this.updateStatus.bind(this);
    }

    updateStatus(id) {
        this.setState({ active: id });
    }

    render() {
        let classes = [ 'radio-button-group ' ];

        if (this.props.containerStyle) {
            classes = [
                ...classes,
                this.props.containerStyle.split(' ')
            ]
        }

        const childrenWithProps = React.Children.map(this.props.children, (child, index) => {
            const childProps = {
                onChange: this.props.onChange,
                updateStatus: this.updateStatus,
                id: index,
                isActive: child.props.name ? this.state.active === child.props.name : this.state.active === index
            };

            return React.cloneElement(child, childProps);
        });

        return (
            <section className={ classes.join(' ') }>
                { childrenWithProps }
            </section>
        );
    }
}

export class RadioButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = { isActive: props.isActive };

        this.onClick = this.onClick.bind(this);
        this.buildClasses = this.buildClasses.bind(this);
    }

    buildClasses() {
        const { containerStyle, inheritedStyle } = this.props;

        let classes = [ 'radio-button' ]

        if (containerStyle) {
            classes = [
                ...classes,
                ...containerStyle.split(' ')
            ];
        }

        return classes;
    }

    componentWillReceiveProps({ isActive }) {
        this.setState({ isActive });
    }

    componentDidMount() {
        if (this.state.isActive) {
            this.props.onChange(this.props.value);
        }
    }

    onClick() {
        if (!this.state.isActive) {
            this.props.updateStatus(this.props.name || this.props.id);
            this.props.onChange(this.props.value);
        }
    }

    render() {
        const classes = this.buildClasses();

        this.state.isActive ? classes.push('radio-selected') : classes.push('radio-not-selected');

        return (
            <div className={ classes.join(' ') } onClick={ this.onClick }>
                { this.props.children }
            </div>
        );
    }
}