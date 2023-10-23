import React, {useState } from 'react'
import { Checkbox, Collapse } from 'antd';
import '../Landing.css';

const { Panel } = Collapse

function CheckBox(props) {
    const [Checked, setChecked] = useState([])
    const handleToggle = (value) => {
        const currentIndex = Checked.indexOf(value);
        const newChecked = [...Checked];
        if(currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }
        setChecked(newChecked)
        props.handleFilters(newChecked)
    }

    const renderCheckboxLists = () => props.list && props.list.map((value, index) => {
        return (
        <React.Fragment key={index}>
            <Checkbox 
                onChange={() => handleToggle(value._id)}
                type="checkbox"
                checked={Checked.indexOf(value._id) === -1 ? false : true }                     
            />
            <span className='checkName'>{value.name}</span>     
        </React.Fragment>
       
        )
        
        })

  return (
    <div>
        <Collapse defaultActiveKey={['0']}>
            <Panel header="CONTINENTS" key="1">
                {renderCheckboxLists()}
            </Panel>
        </Collapse>
    </div>
  )
}

export default CheckBox
