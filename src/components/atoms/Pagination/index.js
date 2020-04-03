import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

import {
  Icon,
  Paper
} from 'components';

import './style.scss';

const Pagination = ({
   count,
   maxCount,
   darkMode,
   onPageChange,
  }) => {

  const [page, setPage] = useState(1);

  const generatePagination = () => {
    const paginationData = [];

    for (var i = 0; i < Math.ceil(count/(maxCount || 9)); i++) {
      paginationData.push({ key: i + 1 })
    }

    return paginationData.length && paginationData.map((item) => {
      if((page - 1) === item.key || item.key === (page + 1) || item.key === page){
        return (
          <Paper key={item.key} onClick={() => setPage(item.key)}>
            <span className={classnames('numbers', { 'current' : page === item.key, 'darkMode': darkMode })}>{item.key}</span>
          </Paper>
        )
      } else {
        return null
      }
    })
  };

  useEffect(() => {
    onPageChange(page)
  },[page, onPageChange]);

  return (
    <section>
      <Paper flexName='flexible jCenter aCenter' >
        <Paper className='pagination' flexName='flexible jCenter aCenter'>
          <Paper className='paginationIcon'>
            <Icon
              name='arrowLeft'
              className={classnames('prevPage', { 'disabled' : page < 3 })}
              onClick={() => setPage(page - 1)}
            />
          </Paper>
          { generatePagination() }
          <Paper className='paginationIcon'>
            <Icon
              name='arrowRight'
              className={classnames('nextPage', { 'disabled' : page > Math.ceil(count/9) - 2 })}
              onClick={() => setPage(page + 1)}
            />
          </Paper>
        </Paper>
      </Paper>
    </section>
  )
}

export default Pagination;
