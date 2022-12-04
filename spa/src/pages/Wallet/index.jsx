import React, { useEffect, useState } from 'react';
import { Table, Tag, message,Skeleton } from 'antd';
import APIClient from 'utils/apiClient';
import NumberFormatter from 'utils/numberFormatter';
import moment from 'moment';
import HistoryOfWallet from 'components/HistoryOfWallet'
import './styles.scss';

const Wallet = ({ walletAmount }) => {
  const [walletActions, setWalletActions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getWalletActions();
  }, [walletAmount]);

  const getWalletActions = async () => {
    try {
      let response = await APIClient.request(
        '/api/wallet/get-wallet-actions',
        {},
        'GET'
      );

      setWalletActions(response);
      console.log(response['remaining']);
    } catch (err) {
      message.error("Data fetch failed!");
    } finally {
      setIsLoading(false);
    }

  }

  const columns = [
    {
      title: 'Time',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (value) => {
        return moment(value).format("DD.MM.YYYY HH:mm");
      }
    },
    {
      title: 'Changes',
      dataIndex: 'change',
      key: 'change',
      render: (value) => {
        const change = NumberFormatter.formatMoney(value);

        if (change > 0) {
          return <Tag color="green">{change}</Tag>;
        } else if (parseFloat(change) === 0) {
          return <Tag color="blue">0</Tag>;
        } else {
          return <Tag color="red">{change}</Tag>;
        }
      }
    },
    {
      title: 'Remaining',
      dataIndex: 'remaining',
      key: 'remaining',
      render: (value) => {
        return NumberFormatter.formatMoney(value);
      }
    }
  ];

  return (
    <>
      <HistoryOfWallet walletAmount={walletAmount} />
      <hr className='hr-line' / >
      <Skeleton loading={isLoading}>
      <Table rowKey={"id"} dataSource={walletActions} columns={columns} loading={isLoading} />
      </Skeleton>
    </>
  )
}

export default Wallet;