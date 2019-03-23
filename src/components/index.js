/**
 * 路由组件出口文件
 * yezi 2018年6月24日
 */
import Loadable from 'react-loadable';
import Loading from './widget/Loading';
import ThemeControl from './webC/themeControl/index.js'
import ThemeContent from './webC/themeControl/themeContent.js'
import BannerControl from './webC/bannerC/index.js';
import AdvertiseM from './webC/advertiseM/index.js';
import Dashboard from './dashboard/Dashboard';

import BasicAnimations from './animation/BasicAnimations';
import ExampleAnimations from './animation/ExampleAnimations';
import AuthBasic from './auth/Basic';
import RouterEnter from './auth/RouterEnter';
import Cssmodule from './cssmodule';


import InfoC from './memberM/infoC/index.js';
import PayO from './memberM/payO/payO.js';
import PointC from './memberM/pointC/pointC.js';
import PointRule from './memberM/pointRule/pointRule.js';
import MemberLevel from './memberM/memberLevel/memberLevel.js';
import InfoDetail from './memberM/infodetail';
import BookLib from './bookM/bookLib/index.js';
import AddBookLib from './bookM/bookLib/addBookLib.js';
import ModifyBookLib from './bookM/bookLib/modifyBookLib.js';
import PublisherM from './bookM/publisherM/index.js';
import GoodsM from './bookM/goodsM/index.js';
import CommentM from './fishM/commentM/index.js';
import BorrowO from './orderM/borrowO/index.js';
import DonateO from './orderM/donateO/index.js';
import CheckO from './orderM/checkO/index.js';
import BorrowH from './orderM/borrowH/index.js';
import SensitiveWordsM from './fishM/sensitiveWordsM/index.js';
import OrganizationM from './systemM/organizationM/index.js';
import CabinetM from './systemM/cabinetM/index.js';
import AddCabinet from './systemM/cabinetM/addCabinet.js';
import ChangeCabinet from './systemM/cabinetM/changeCabinet.js';
import WarehouseM from './systemM/warehouseM/index.js';
import AddWarehouse from './systemM/warehouseM/addWarehouse.js';
import ChangeWarehouse from './systemM/warehouseM/changeWarehouse.js';
import StaffM from './systemM/staffM/index.js';
import AddStaff from './systemM/staffM/addStaff.js';
import ChangeStaff from './systemM/staffM/changeStaff.js';
import StoreQuery from './storehouseM/storequery/storequery.js';
import InStoreData from './storehouseM/instoredata/index.js';
import InStoreInfo from './storehouseM/instoredata/inStoreInfo.js';
import OutStoreData from './storehouseM/outStoreData/index.js';
import OutStoreInfo from './storehouseM/outStoreData/outStoreInfo.js';
import MvStoreData from './storehouseM/mvStoreData/index.js';
import MvStoreInfo from './storehouseM/mvStoreData/mvStoreInfo';


export default {
    ThemeControl, ThemeContent, BannerControl, AdvertiseM,
    Dashboard, BasicAnimations,
    ExampleAnimations, AuthBasic, RouterEnter,
    Cssmodule,
    InfoC, PayO, PointC, PointRule, MemberLevel,
    InfoDetail,
    BookLib, AddBookLib, ModifyBookLib, PublisherM, GoodsM,
    BorrowO, DonateO, CheckO, BorrowH,
    CommentM, SensitiveWordsM,

    OrganizationM, CabinetM, AddCabinet, ChangeCabinet, WarehouseM, AddWarehouse, ChangeWarehouse, StaffM, AddStaff, ChangeStaff,
    StoreQuery, InStoreData, InStoreInfo, OutStoreData, OutStoreInfo, MvStoreData, MvStoreInfo

}