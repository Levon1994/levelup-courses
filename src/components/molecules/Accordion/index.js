import React,{ useState } from 'react';
import { Paper } from 'components';

import classnames from 'classnames';

import './style.scss';

const Accordion = ({
    title,
    darkMode,
    children,
}) => {

    const [isOpen,setIsOpen] = useState(false);

    const childs = children && children.map(item => (
        <Paper className='accordion_content'>
            {item}
        </Paper>
    ))

    return  <Paper className={classnames('accordion',{'darkMode' : darkMode})}>
                <Paper
                    className={`accordion_title ${isOpen ? "open" : ""}`}
                    onClick = {() => setIsOpen(!isOpen)}
                >
                    {title}
                </Paper>
                <Paper
                    className = {`accordion_item ${!isOpen ? "collapsed" : ""}`}
                >
                    {childs}
                </Paper>
            </Paper>
};

export default Accordion;

// const Accordion = ({ title, children }) => {
//     const [isOpen, setOpen] = React.useState(false);
//     return (
//       <div className="accordion-wrapper">
        
//         <div
//           className={`accordion-title ${isOpen ? "open" : ""}`}
//           onClick={() => setOpen(!isOpen)}
//           >
//           {title}
//         </div>
//         <div className={`accordion-item ${!isOpen ? "collapsed" : ""}`}>
//           <div className="accordion-content">{children}</div>
//         </div>
//       </div>
//     );
//   };