/**
 * 路由组件出口文件
 * yezi 2018年6月24日
 */
import Loadable from 'react-loadable';
import Loading from './widget/Loading';
import BasicForm from './forms/BasicForm';
import BasicTable from './tables/BasicTables';
import AdvancedTable from './tables/AdvancedTables';
import AsynchronousTable from './tables/AsynchronousTable';
import Echarts from './charts/Echarts';
import Recharts from './charts/Recharts';
import ThemeControl from './ui/webcontrol/ThemeControl.js'
import BannerControl from './ui/webcontrol/BannerControl.js';
import Icons from './ui/Icons';
import Buttons from './ui/Buttons';
import Spins from './ui/Spins';
import Modals from './ui/Modals';
import Notifications from './ui/Notifications';
import Tabs from './ui/Tabs';
import Banners from './ui/banners';
import Drags from './ui/Draggable';
import Dashboard from './dashboard/Dashboard';
import Gallery from './ui/Gallery';
import BasicAnimations from './animation/BasicAnimations';
import ExampleAnimations from './animation/ExampleAnimations';
import AuthBasic from './auth/Basic';
import RouterEnter from './auth/RouterEnter';
import Cssmodule from './cssmodule';
import MapUi from './ui/map';

import InfoC from './memberM/infoC/index.js';
import PayO from './memberM/payO.js';
import PointC from './memberM/pointC.js';
import PointRule from './memberM/pointRule.js';
import MemberLevel from './memberM/memberLevel.js';
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
import WarehouseM from './systemM/warehouseM/index.js';
import StaffM from './systemM/staffM/index.js';

import StoreQuery from './storehouseM/storequery/storequery.js';
import InStoreData from './storehouseM/instoredata/instoredata.js';
const WysiwygBundle = Loadable({ // 按需加载富文本配置
    loader: () => import('./ui/Wysiwyg'),
    loading: Loading,
});

export default {
    ThemeControl, BannerControl,
    BasicForm, BasicTable, AdvancedTable, AsynchronousTable,
    Echarts, Recharts, Icons, Buttons, Spins, Modals, Notifications,
    Tabs, Banners, Drags, Dashboard, Gallery, BasicAnimations,
    ExampleAnimations, AuthBasic, RouterEnter, WysiwygBundle,
    Cssmodule, MapUi,
    InfoC, PayO, PointC, PointRule, MemberLevel,
    InfoDetail,
    BookLib,AddBookLib,ModifyBookLib,PublisherM,GoodsM,
    BorrowO,DonateO,CheckO,BorrowH,
    CommentM,SensitiveWordsM,
    OrganizationM, CabinetM, WarehouseM, StaffM,
    StoreQuery,InStoreData
}