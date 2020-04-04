import React from 'react';
import classnames from 'classnames';

import { 
    Paper,
    Button
} from 'components';

import { useTranslator } from 'utils/translator';


import './style.scss';

const GoToCourseCard = ({ darkMode }) => {

    const { t } = useTranslator();

    return  <Paper className={classnames('go_To_Course',{'darkMode': darkMode})}>
                <Paper className='CourseCard_Video'>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/6qfhLaHeI4o" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </Paper>
                <Paper className='Buttons'>
                    <Button className='toGoButton'>{t('_Go_To_Course_')}</Button>
                    <Button className='shareButton'>{t('_Share_This_Course_')}</Button>
                </Paper>
                <Paper className='Inform_GoTo'>
                    <h2>{t('_This_Course_Includes_')}</h2>
                </Paper>
            </Paper>
};

export default GoToCourseCard;