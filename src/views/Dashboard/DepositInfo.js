import React, { useState, useEffect, useMemo } from 'react';
import { withRouter } from 'react-router-dom';
import InfoTable from '../../components/InfoTable';
import CheckBox from '../../components/CheckBox';
import Button from '../../components/Button';
import { marketData } from '../../utils/constants';

function DepositInfo({ history }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(marketData.slice(0, 5));
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'Your deposits',
        accessor: 'name',
        Cell: row => {
          return (
            <div>
              <img src={row.row.original.img} alt="" width="35" height="35" />
              <span>{row.value}</span>
            </div>
          )
        }
      },
      {
        Header: 'Current balance',
        accessor: 'wallet_balance',
        Cell: row => (
          <div className="value-col-section">
            <div className="value">{row.value} {row.row.original.name}</div>
            <div className="small">$ {row.value * row.row.original.asset_price}</div>
          </div>
        )
      },
      {
        Header: 'APY',
        accessor: 'deposit_apy',
        Cell: row => (
          <div className="value-section">
            <span className="value blue">{row.value}</span> %
          </div>
        )
      },
      {
        Header: 'Collateral',
        accessor: 'collateral',
        Cell: row => (
          <div className="value-section">
            <CheckBox isChecked={row.value} handleChange={() => { history.push(`/collateral/${row.row.original.name}`)}} />
          </div>
        )
      },
      {
        Header: '',
        accessor: 'img',
        Cell: row => (
          <div className="value-section">
            <Button size="sm" variant="primary" onClick={() => history.push(`/deposit/${row.row.original.name}`)}>
              Deposit
            </Button>
            <Button size="sm" variant="outline" onClick={() => history.push(`/withdraw/${row.row.original.name}`)}>
              Withdraw
            </Button>
          </div>
        )
      },
    ],
    []
  );

  return (
    <InfoTable columns={columns} data={data} />
  );
}

export default withRouter(DepositInfo);
