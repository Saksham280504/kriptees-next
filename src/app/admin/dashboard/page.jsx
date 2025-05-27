'use client';

import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Highcharts3D from 'highcharts/highcharts-3d';
import { useSelector, useDispatch } from 'react-redux';
import { getAdminProducts, clearErrors } from '@/redux/actions/productAction';
import { getAllOrders } from '@/redux/actions/orderAction';
import { getAllUsers } from '@/redux/actions/userAction';
import Sidebar from '@/components/Admin/Sidebar';
import MetaData from '@/components/Layouts/MetaData/MetaData';
import Loader from '@/components/Layouts/Loader/Loader';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

Highcharts3D(Highcharts);

const Dashboard = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [toggle, setToggle] = useState(false);

  const { products, loading, error } = useSelector((state) => state.products);
  const { orders, error: ordersError } = useSelector((state) => state.allOrders);
  const { users, error: usersError } = useSelector((state) => state.allUsers);

  let outOfStock = 0;
  products?.forEach((item) => {
    if (item.stock === 0) outOfStock++;
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (ordersError) {
      toast.error(ordersError);
      dispatch(clearErrors());
    }
    if (usersError) {
      toast.error(usersError);
      dispatch(clearErrors());
    }

    dispatch(getAdminProducts());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch, error, ordersError, usersError]);

  const totalAmount = orders?.reduce((acc, item) => acc + item.totalPrice, 0) || 0;

  const lineOptions = {
    chart: {
      type: 'line',
    },
    title: { text: 'Revenue Analysis' },
    xAxis: {
      categories: ['Initial Amount', 'Amount Earned'],
    },
    yAxis: {
      title: { text: 'Amount' },
    },
    series: [
      {
        name: 'Amount',
        data: [0, totalAmount],
      },
    ],
  };

  const pieOptions = {
    chart: {
      type: 'pie',
    },
    title: { text: 'Stock Analysis' },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: { enabled: true },
      },
    },
    series: [
      {
        name: 'Stock',
        colorByPoint: true,
        data: [
          {
            name: 'Out of Stock',
            y: outOfStock,
            sliced: true,
            selected: true,
          },
          {
            name: 'In Stock',
            y: products?.length - outOfStock,
          },
        ],
      },
    ],
  };

  return (
    <>
      <MetaData title="Dashboard - Admin Panel" />
      <div style={{ display: 'flex', width: '100%' }}>
        <Sidebar toggle={toggle} toggleHandler={() => setToggle(!toggle)} />
        <div style={{ flexGrow: 1, padding: '1rem' }}>
          {loading ? (
            <Loader />
          ) : (
            <>
              <h2 style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Dashboard</h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                <div style={{ backgroundColor: '#414141', color: 'white', padding: '1rem', borderRadius: '8px', width: '30%' }}>
                  <h4>Total Amount</h4>
                  <p>&#8377;{totalAmount}</p>
                </div>
                <div style={{ backgroundColor: '#414141', color: 'white', padding: '1rem', borderRadius: '8px', width: '30%' }}>
                  <h4>Products</h4>
                  <p>{products?.length}</p>
                </div>
                <div style={{ backgroundColor: '#414141', color: 'white', padding: '1rem', borderRadius: '8px', width: '30%' }}>
                  <h4>Orders</h4>
                  <p>{orders?.length}</p>
                </div>
                <div style={{ backgroundColor: '#414141', color: 'white', padding: '1rem', borderRadius: '8px', width: '30%' }}>
                  <h4>Users</h4>
                  <p>{users?.length}</p>
                </div>
              </div>

              <div style={{ display: 'flex', marginTop: '2rem', gap: '2rem' }}>
                <div style={{ width: '50%' }}>
                  <HighchartsReact highcharts={Highcharts} options={lineOptions} />
                </div>
                <div style={{ width: '50%' }}>
                  <HighchartsReact highcharts={Highcharts} options={pieOptions} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
