import React,{ useMemo } from 'react';
import classnames from 'classnames';

import { 
    Icon,
    Paper,
} from 'components';

import { useTranslator } from 'utils/translator';

import './style.scss';
 
const CoursesCard = ({
    data,
    darkMode
}) => {

    const { t } = useTranslator();

    const informAboutCourses = useMemo(() => {
        if (!data) return null;

        return data.map(item => (
            <Paper className='inform_content'>
                <Icon name='checked' width={10}/>
                <Paper className='inform'>
                    {t(item)}
                </Paper>
            </Paper>
        ));
    }, [data]);
        
    return  <Paper className={classnames('CoursesCard',{'darkMode' : darkMode })}>
                <h1>{t("_What_Will_You_Learn_")}</h1>
                <Paper className ='Contain_CoursesCard'>
                    {informAboutCourses}
                </Paper>
            </Paper>
};

export default CoursesCard;