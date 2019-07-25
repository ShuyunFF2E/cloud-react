---
order: 1
title: AreaSelector
desc: 地址选择器演示
---

````javascript
import React, { useState } from 'react';
import AreaSelector from 'ccms-components-react/area-selector';
import Button from 'ccms-components-react/button';
import Icon from 'ccms-components-react/icon';
import Checkbox from 'ccms-components-react/checkbox';

const platMap = {
    'top': '淘宝',
    'unification': '全平台',
    'jos': '京东'
};

export default function AreaSelectorDemo() {

    // hooks
    const [visible, setVisible] = useState(false);
    const [result, setResult] = useState([]);
    const [platform, setPlatform] = useState('unification');


    // common helpers
    function preHandler(data) {
        // return data.slice(0, 2);
    }


    // handlers
    function openSelector() {
        setVisible(true);
    }

    function closeSelector() {
        setVisible(false);
    }

    function handleOk(result) {
        setVisible(false);
        console.log('地区选择器输出结果：', result);
        setResult(result);
    }

    function removeResult(item) {
        return e => {
            const newResult = result.filter(rs => rs.id !== item.id);
            setResult(newResult);
        }
    }

    function changePlat(checked, value) {
        if (checked) {
            setPlatform(value);
        }
    }


    // renders
    function renderResult() {
        return (
            <>
                <span>当前选择的地址数据：</span>
                <div className="selector-result-list">
                    { result.map(item => 
                        <span key={item.id} className="result-item">
                            {item.name}
                            <Icon type='close' className="close-icon" onClick={removeResult(item)} />
                        </span>
                    )}
                </div>
            </>
        );
    }


    return (
        <>
            <Checkbox value='unification' checked={platform === 'unification'} onChange={changePlat}>全渠道</Checkbox>
            <Checkbox value='top' checked={platform === 'top'} onChange={changePlat}>淘宝平台</Checkbox>
            <Checkbox value='jos' checked={platform === 'jos'} onChange={changePlat}>京东平台</Checkbox>

            <div>-</div>

            <Button onClick={openSelector} type="primary">打开{platMap[platform]}地址选择器</Button>
            
            <div>-</div>
            
            { renderResult() }

            <AreaSelector
                server="https://ual.shuyun.com/shuyun-searchapi/1.0/area"
                platform={platform}
                selectedData={result}
                visible={visible}
                dataHandler={preHandler}
                onOk={handleOk}
                onClose={closeSelector}
                onCancel={closeSelector}/>
        </>
    );
}
````

````less
.selector-result-list {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    font-size: 12px;
    .result-item {
        padding-left: 5px;
        padding-right: 5px;
        margin: 5px;
        line-height: 20px;
        color: #0183ba;
        border: 4px solid #e7f3ff;
        border-radius: 1px;
        background: #eff7ff;
    }

    &:hover {
        .close-icon {
            font-weight: bold;
            color: #333;
        }
    }

    .close-icon {
        font-size: 12px;
        cursor: pointer;
        padding-left: 5px;
        color: #666;
    }
}

````
