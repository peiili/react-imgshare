import React from 'react'
const Divider = function (props) {
    const { border = 10, color = "#00000099" } = props
    return (
        <>
            <div style={{ margin: `${border}px auto ${border}px`, borderTop: `1px solid ${color}` }}></div>
        </>
    )
}

export default Divider;
