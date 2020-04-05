import React,{ useMemo } from 'react';
import classnames from 'classnames';

import { Paper } from 'components';

import { useTranslator } from 'utils/translator';

import './style.scss';

const CreateBy = ({ 
    data,
    darkMode,
}) => {

    const { t } = useTranslator(); 

    const information = useMemo(() => {
        if(!data) return null;

        return data.map((item,index) => (
            <Paper 
                className={classnames('Create_By',{'darkMode': darkMode})}
                key={index}
            >
                <Paper>
                    <h1>{t(item.title)}: {t(item.subTitle)}</h1>
                </Paper>
                <Paper>
                    <h2>{t('_Created_By_')}: {item.creator}</h2>
                </Paper>
            </Paper>
        ));
    },[data]);
    
    return  <Paper>
                {information}
            </Paper>
};

export default CreateBy;