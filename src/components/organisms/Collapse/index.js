import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

import {
  Text,
  Icon,
  Paper,
  Button
} from 'components';

import { useTranslator } from 'utils/translator';

import './style.scss';

const Collapse = ({ data, darkMode, keyLabel = 'id' }) => {
  const [expand, setExpand] = useState(true);
  const [open, setOpend] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const { t } = useTranslator();

  const toggleContent = (id) => {
    (open !== id) ? setOpend(id) : setOpend(false);
    setExpand(!expand);
  }

  const modalToggle = () => {
    document.body.style.overflowY = openModal ? 'auto' : 'hidden';
    setOpenModal(!openModal);
  };

  useEffect(() => {
    setExpand(false);
  }, []);

  return <>
    {data.length && data.map(({ 
        name, 
        respo = [], 
        joining = [],
        description,
        neededSkills = [],
        [keyLabel]: id,
        niceToHaveSkills = [],
       }) => <Paper key={id} className="Collapse">
      <Paper className={classnames("collapse-item", { "bg-collapse": open === id })} flexName="flexible jBetween aCenter">
        <Paper className="title-content" flexName="flexible aCenter">
          <Icon onClick={() => toggleContent(id)}
            className={classnames("plus-icon", { "plus-icon-2": open === id })} name="plus" />
          <Text darkMode={darkMode}>{name}</Text>
        </Paper>
        <Paper onClick={() => toggleContent(id)} className="btn-container">
          <Button bgColor="green">
            {t("_ViewMore_")}
          </Button>
        </Paper>
      </Paper>
      <Paper
        flexName="flexible jCenter vertical"
        className={classnames('collapse-body', { "content-opened": id === open })}
        >
        <Paper className="title text-left">
          <Text darkMode={darkMode}> {t("_Respo_")} </Text>
        </Paper>
        <Paper className="Respo  text-left">
          <Paper className="text-left">
            {respo.map((item, index) => (<Paper key={index}>
              <Icon name="oval" />
              <Text darkMode={darkMode}>
                {item}
              </Text>
            </Paper>
            ))}
          </Paper>
        </Paper>
        <Paper className="WeExpect title text-left title">
          <Text darkMode={darkMode}>{t("_WeExpect_")}</Text>
        </Paper>
        <Text className="knowledgeOf  text-left" darkMode={darkMode}>
          {t("_KnowledgeOf_")}
        </Text>
        <Paper className="needSkills-content text-left">
          {neededSkills.map((item, index) => (<Paper key={index}>
            <Icon name="checked" />
            <Text darkMode={darkMode}>
              {item}
            </Text>
          </Paper>
          ))}
        </Paper>
        <Text className="niceToHave-title  text-left" darkMode={darkMode}>
          {t("_NiceToHave_")}
        </Text>
        <Paper className="niceToHave-content text-left">
          {niceToHaveSkills.map((item, index) => (<Paper key={index}>
            <Icon name="checked" />
            <Text darkMode={darkMode}>
              {item}
            </Text>
          </Paper>
          ))}
        </Paper>
        <Text className="text-left" darkMode={darkMode}>
          {description}
        </Text>
        <Paper className="title text-left">
          <Text darkMode={darkMode}>
            {t("_Joining_")}
          </Text>
        </Paper>
        <Paper className="joining-content text-left">
          {joining.map((item, index) => (<Paper key={index}>
            <Icon name="oval" />
            <Text darkMode={darkMode}>
              {item}
            </Text>
          </Paper>
          ))}
        </Paper>
        <Paper flexName="flexible jCenter">
          <Button onClick={modalToggle}>
            {t("_ApplyNow_")}
          </Button>
        </Paper>
      </Paper>
    </Paper>
    )}
  </>
};

export default Collapse;

