import React from 'react';
import classnames from 'classnames';

import { Paper } from 'components';

import { useTranslator } from 'utils/translator';

import './style.scss';

const CreateBy = ({ 
    data,
    darkMode
}) => {

    const { t } = useTranslator() 
    

    return  <Paper className={classnames('Create_By',{'darkMode': darkMode})}>
                <Paper>
                    <h1>{t(data.title)}: {t(data.subTitle)}</h1>
                </Paper>
                <Paper>
                    <h2>{t('_Created_By_')}: {data.creator}</h2>
                </Paper>
            </Paper>
};

export default CreateBy;