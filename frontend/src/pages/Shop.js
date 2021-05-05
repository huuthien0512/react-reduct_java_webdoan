import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import Paginator from 'react-hooks-paginator';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { connect } from 'react-redux';
import { getSortedProducts } from '../helpers/product';
import Layout from '../layouts/Layout';
import Breadcrumb from '../wrappers/Breadcrumb';
import ShopSidebar from '../wrappers/ShopSidebar';
import ShopTopbar from '../wrappers/ShopTopbar';
import ShopProducts from '../wrappers/ShopProducts';
import {listProducts} from '../redux/actions/productActions';

const Shop = ({location, products, listProducts}) => {
    const [layout, setLayout] = useState('grid three-column');
    const [sortType, setSortType] = useState('');
    const [sortValue, setSortValue] = useState('');
    const [filterSortType, setFilterSortType] = useState('');
    const [filterSortValue, setFilterSortValue] = useState('');
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);

    const [searchedProducts, setSearchedProducts] = useState();
    
    const pageLimit = 9;
    const {pathname} = location;

    useEffect(()=>{
        listProducts();
    },[])

    const getLayout = (layout) => {
        setLayout(layout)
    }

    const getSortParams = (sortType, sortValue) => {
        setSortType(sortType);
        setSortValue(sortValue);
    }

    const getFilterSortParams = (sortType, sortValue) => {
        setFilterSortType(sortType);
        setFilterSortValue(sortValue);
    }

    const getSearchProducts = (products) => {
        setSearchedProducts(products);
    }
    
    useEffect(() => {
        
        let sortedProducts = getSortedProducts(products, sortType, sortValue);
        const filterSortedProducts = getSortedProducts(sortedProducts, filterSortType, filterSortValue);
        
        sortedProducts = filterSortedProducts;
        setSortedProducts(sortedProducts);
        setCurrentData(searchedProducts ? searchedProducts.slice(offset, offset + pageLimit): sortedProducts.slice(offset, offset + pageLimit));

    }, [offset, products, sortType, sortValue, filterSortType, filterSortValue, searchedProducts ]);

    return (
        <Fragment>
            <MetaTags>
                <title>H20 | Trang cửa hàng</title>
                <meta name="description" content="Trang bày đồ ăn." />
            </MetaTags>

            <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Trang Chủ</BreadcrumbsItem>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>Cửa Hàng</BreadcrumbsItem>

            <Layout headerTop="invisible">
                {/* breadcrumb */}
                <Breadcrumb />

                <div className="shop-area pt-95 pb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 order-2 order-lg-1">
                                {/* shop sidebar */}
                                <ShopSidebar products={products} getSortParams={getSortParams} sideSpaceClass="mr-30" getSearchProducts={getSearchProducts}/>
                            </div>
                            <div className="col-lg-9 order-1 order-lg-2">
                                {/* shop topbar default */}
                                <ShopTopbar getLayout={getLayout} getFilterSortParams={getFilterSortParams} productCount={products.length} sortedProductCount={currentData.length} />

                                {/* shop page content default */}
                                <ShopProducts layout={layout} products={currentData} />

                                {/* shop product pagination */}
                                <div className="pro-pagination-style text-center mt-30">
                                    <Paginator
                                        totalRecords={sortedProducts.length}
                                        pageLimit={pageLimit}
                                        pageNeighbours={2}
                                        setOffset={setOffset}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        pageContainerClass="mb-0 mt-0"
                                        pagePrevText="«"
                                        pageNextText="»"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </Fragment>
    )
}

Shop.propTypes = {
  location: PropTypes.object,
  products: PropTypes.array,
}

const mapStateToProps = state => {
    return{
        products: state.productData.products,
    }
}
const mapDispatchToProps = dispatch => {
  
    return {
        listProducts: () => {
        dispatch(listProducts());
      }
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(Shop);