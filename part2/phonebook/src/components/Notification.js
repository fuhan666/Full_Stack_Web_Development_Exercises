const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
}

const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
}

const Notification = ({ notification }) => {
    const notificationStyle = notification.isError ? errorStyle : successStyle
    if (notification.msg) {
        return (
            <div style={notificationStyle}>{notification.msg}</div>
        )
    }
    return null
}

export default Notification