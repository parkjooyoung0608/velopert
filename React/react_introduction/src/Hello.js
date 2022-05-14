import React from 'react';

function Hello({color, name, isSpecial}){
    return (
        <div style={{ color }}>
            {/* false일땐 false이고, true일때 <b>*<b>가 된다. */}
            { isSpecial && <b>*</b> }
            안녕하세요 { name }
        </div>
    )
}

Hello.defaultProps = {
    name: '이름없음'
}

export default Hello;