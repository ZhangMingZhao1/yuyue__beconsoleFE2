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
import InvitationCode from './memberM/invitationCode/index.js';
import AddInvCode from './memberM/invitationCode/addInvCode.js';
import ChangeInvCode from './memberM/invitationCode/changeInvCode.js';
import PointC from './memberM/pointC/pointC.js';
import PointRule from './memberM/pointRule/pointRule.js';
import MemberLevel from './memberM/memberLevel/memberLevel.js';
import InfoDetail from './memberM/infodetail';
import BookLib from './bookM/bookLib/index.js';
import AddBookLib from './bookM/bookLib/addBookLib.js';
import ModifyBookLib from './bookM/bookLib/modifyBookLib.js';
import GeneM from './bookM/geneM/index.js';
import PublisherM from './bookM/publisherM/index.js';
import GoodsM from './bookM/goodsM/index.js';
import CommentM from './fishM/commentM/index.js';
import DynamicCmnt from './fishM/commentM/dynamicCmnt.js';
import BorrowO from './orderM/borrowO/index.js';
import DonateO from './orderM/donateO/index.js';
import CheckO from './orderM/checkO/index.js';
import BorrowH from './orderM/borrowH/index.js';
import SensitiveWordsM from './fishM/sensitiveWordsM/index.js';
import OrganizationM from './systemM/organizationM/index.js';
import CabinetM from './systemM/cabinetM/index.js';
import AddCabinet from './systemM/cabinetM/addCabinet.js';
import ChangeCabinet from './systemM/cabinetM/changeCabinet.js';
import CellM from './systemM/cabinetM/cellM.js';
import WarehouseM from './systemM/warehouseM/index.js';
import AddWarehouse from './systemM/warehouseM/addWarehouse.js';
import ChangeWarehouse from './systemM/warehouseM/changeWarehouse.js';
import StaffM from './systemM/staffM/index.js';
import roleAuth from './systemM/staffM/roleAuth'
import AddStaff from './systemM/staffM/addStaff.js';
import ChangeStaff from './systemM/staffM/changeStaff.js';
import StoreQuery from './storehouseM/storequery/storequery.js';
import InStoreData from './storehouseM/instoredata/index.js';
import InStoreInfo from './storehouseM/instoredata/inStoreInfo.js';
import OutStoreData from './storehouseM/outStoreData/index.js';
import OutStoreInfo from './storehouseM/outStoreData/outStoreInfo.js';
import MvStoreData from './storehouseM/mvStoreData/index.js';
import MvStoreInfo from './storehouseM/mvStoreData/mvStoreInfo';
import AllocateInCase from './storehouseM/allocateInCase/index.js';
import AllocateInCaseG from './storehouseM/allocateInCase/generate.js';
import AllocateInCaseS from './storehouseM/allocateInCase/selectBook.js';
import AllocateInCaseR from './storehouseM/allocateInCase/receiveOrder.js';
import AllocateInCaseP from './storehouseM/allocateInCase/putInCase.js';
import AllocateInCaseC from './storehouseM/allocateInCase/checkList';
import AllocateInCaseF from './storehouseM/allocateInCase/finished';
import AllocateOutCase from './storehouseM/allocateOutCase/index.js';
import AllocateOutCaseG from './storehouseM/allocateOutCase/generate.js';
import AllocateOutCaseS from './storehouseM/allocateOutCase/selectBook.js';
import AllocateOutCaseR from './storehouseM/allocateOutCase/receiveOrder.js';
import AllocateOutCaseP from './storehouseM/allocateOutCase/outCase.js';
import AllocateOutCaseC from './storehouseM/allocateOutCase/checkList';
import AllocateOutCaseF from './storehouseM/allocateOutCase/finished';
import FranRank from './franchisee/franchiseeRank';
import FranInfo from './franchisee/franinfo';
import FranInfoDetail from './franchisee/frandetail';
import FranModify from './franchisee/franmodify';
import AddFranInfo from './franchisee/addfraninfo';
import AddFranRank from './franchisee/addfranrank';
import DataAuth from './systemM/dataAuth';
import LogOperation from './statisticsT/logoperation';

export default {
    ThemeControl, ThemeContent, BannerControl, AdvertiseM,
    Dashboard, BasicAnimations,
    ExampleAnimations, AuthBasic, RouterEnter,
    Cssmodule,
    InfoC, PayO, InvitationCode, AddInvCode, ChangeInvCode, PointC, PointRule, MemberLevel,
    InfoDetail,
    BookLib, AddBookLib, ModifyBookLib, GeneM, PublisherM, GoodsM,
    BorrowO, DonateO, CheckO, BorrowH,
    CommentM, SensitiveWordsM, DynamicCmnt,

    OrganizationM, CabinetM, AddCabinet, ChangeCabinet, CellM, WarehouseM, AddWarehouse, ChangeWarehouse, StaffM, AddStaff, ChangeStaff,
    StoreQuery, InStoreData, InStoreInfo, OutStoreData, OutStoreInfo, MvStoreData, MvStoreInfo,
    AllocateInCase, AllocateInCaseG, AllocateInCaseS, AllocateInCaseR, AllocateInCaseP, AllocateInCaseC, AllocateInCaseF,
    AllocateOutCase, AllocateOutCaseG, AllocateOutCaseS, AllocateOutCaseR, AllocateOutCaseP, AllocateOutCaseC, AllocateOutCaseF,
    roleAuth, DataAuth,
    LogOperation,

    FranRank, FranInfo, FranInfoDetail, FranModify, AddFranInfo, AddFranRank

}