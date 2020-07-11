import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

const alert = (alerts) => {
    if(alerts !== null && alerts.length > 0) {
        return alerts.map(alert => 
            <div className={`alert alert--${alert.alertType}`} key={alert.id}>
                {alert.msg}
            </div>
        )
    }
}

const Alert = ({ alerts }) => {
    return (
        <Fragment>
            {alert(alerts)}
        </Fragment>
    )
}

Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    alerts: state.alert
})

export default connect(mapStateToProps)(Alert)
