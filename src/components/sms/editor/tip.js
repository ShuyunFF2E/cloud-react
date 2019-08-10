import React, { useState } from 'react';
import './index.less';

const Tips = (props) => {

    const [urlOpened, setUrlOpened] = useState(false);

    const { hasUrl, hasInvalidString, invalidStringClosed, onHandleCloseInvalidString } = props;

    const handleClick = () => {
        setUrlOpened(false);
    }

    return (
        <>
            { 
                (hasUrl && !urlOpened) && 
                <div className="url-tips">
                    输入短链地址时，请在后方加上 #，以确保短链能够正常打开，如 www.shuyun.com#
                    <span className="url-tips-close" onClick={handleClick}></span>
                </div>
            }
            { 
                (hasInvalidString && !invalidStringClosed) &&
                <div className="url-tips">
                    您输入的短信内容中含非法字符，已进行过滤。
                    <span className="url-tips-close" onClick={onHandleCloseInvalidString}></span>
                </div>
            }
        </>
    )
}

export default Tips;