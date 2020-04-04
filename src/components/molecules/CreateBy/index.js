import React from 'react';
import classnames from 'classnames';

import { Paper } from 'components';

import { useTranslator } from 'utils/translator';

import './style.scss';

const CreateBy = ({ 
    title,
    creator,
    subTitle,
    darkMode,
}) => {

    const { t } = useTranslator(); 
    
    return  <Paper className={classnames('Create_By',{'darkMode': darkMode})}>
                <Paper>
                    <h1>{t(title)}: {t(subTitle)}</h1>
                </Paper>
                <Paper>
                    <h2>{t('_Created_By_')}: {creator}</h2>
                </Paper>
            </Paper>
};

export default CreateBy;