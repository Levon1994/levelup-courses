import React,{ useState,useMemo } from 'react';
import { Paper } from 'components';

import classnames from 'classnames';

import './style.scss';

const Accordion = ({
    data,
    darkMode,
}) => {

    const [isOpen,setIsOpen] = useState(false);

    const content = useMemo(() => {
        if(!data) return null;

        return data.map(item => (
            <Paper  
                className={classnames('accordion',{'darkMode' : darkMode})}
                key={item.id}
            >
                <Paper
                    className={`accordion_title ${isOpen ? "open" : ""}`}
                    onClick = {() => setIsOpen(!isOpen)}
                >
                    {item.title}
                </Paper>
                <Paper
                    className = {`accordion_item ${!isOpen ? "collapsed" : ""}`}
                >
                {item.child && item.child.map((elem,index) => (
                    <Paper 
                        className='accordion_content'
                        key={index}
                    >
                        {elem}
                    </Paper>
                ))}
                </Paper>
            </Paper>
        ));
    },[data]);

    return  <Paper>
                {content}
            </Paper>
                   
};

export default Accordion;

