import React, { useEffect, useState } from 'react';
import { myApi } from '../../helpers/api';
import RevenueChart from '../../components/RevenueChart';

interface DashboardProps {}

interface DashboardData {
  pendapatan: number[];
  user: number;
  order: number;
  product: number;
  totalPendapatan: number;
}

export default function Dashboard(props: DashboardProps) {
  const [revenueData, setRevenueData] = useState<number[]>([]);
  const [user, setUser] = useState<number | undefined>();
  const [order, setOrder] = useState<number | undefined>();
  const [product, setProduct] = useState<number | undefined>();
  const [sumTotal, setSumTotal] = useState<number | undefined>();

  const fetchDashboard = async () => {
    try {
      const response = await myApi.get<DashboardData>('/admin');

      const data = response.data;

      setRevenueData(data.pendapatan);
      setUser(data.user);
      setOrder(data.order);
      setProduct(data.product);
      setSumTotal(data.totalPendapatan);
    } catch (error) {
      console.log('Failed to fetch revenue data:', error);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <>
      <div className="page-heading">
        <h3>Dashboard</h3>
      </div>
      <div className="page-content">
        <section className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-6 col-lg-3 col-md-6">
                <div className="card">
                  <div className="card-body px-4 py-4-5">
                    <div className="row">
                      <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start">
                        <div className="stats-icon purple mb-2">
                          <i className="icon dripicons dripicons-shopping-bag" />
                        </div>
                      </div>
                      <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                        <h6 className="text-muted font-semibold">Pendapatan</h6>
                        <h6 className="font-extrabold mb-0">{sumTotal}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6 col-lg-3 col-md-6">
                <div className="card">
                  <div className="card-body px-4 py-4-5">
                    <div className="row">
                      <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start">
                        <div className="stats-icon blue mb-2">
                          <i className="iconly-boldProfile" />
                        </div>
                      </div>
                      <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                        <h6 className="text-muted font-semibold">User</h6>
                        <h6 className="font-extrabold mb-0">{user}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6 col-lg-3 col-md-6">
                <div className="card">
                  <div className="card-body px-4 py-4-5">
                    <div className="row">
                      <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start">
                        <div className="stats-icon green mb-2">
                          <i className="iconly-boldAdd-User" />
                        </div>
                      </div>
                      <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                        <h6 className="text-muted font-semibold">Product</h6>
                        <h6 className="font-extrabold mb-0">{product}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6 col-lg-3 col-md-6">
                <div className="card">
                  <div className="card-body px-4 py-4-5">
                    <div className="row">
                      <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start">
                        <div className="stats-icon red mb-2">
                          <i className="iconly-boldBookmark" />
                        </div>
                      </div>
                      <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                        <h6 className="text-muted font-semibold">Order</h6>
                        <h6 className="font-extrabold mb-0">{order}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h4>Pendapataan perbulan</h4>
                  </div>
                  <div className="card-body">
                    <RevenueChart monthlyRevenue={revenueData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
