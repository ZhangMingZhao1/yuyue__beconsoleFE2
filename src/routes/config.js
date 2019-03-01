export default {
  menus: [ // 菜单相关路由
    { key: '/app/dashboard/index', title: '首页', icon: 'mobile', component: 'Dashboard' },
    {
      key: '/app/ui', title: '网站管理', icon: 'scan',
      subs: [
        { key: '/app/ui/themeControl', title: '专题管理', component: 'ThemeControl' },
        { key: '/app/ui/bannerControl', title: 'banner管理', component: 'BannerControl' },
        { key: '/app/ui/buttons', title: '按钮', component: 'Buttons' },
        { key: '/app/ui/icons', title: '图标', component: 'Icons' },
        { key: '/app/ui/spins', title: '加载中', component: 'Spins' },
        { key: '/app/ui/modals', title: '对话框', component: 'Modals' },
        { key: '/app/ui/notifications', title: '通知提醒框', component: 'Notifications' },
        { key: '/app/ui/tabs', title: '标签页', component: 'Tabs' },
        { key: '/app/ui/banners', title: '轮播图', component: 'Banners' },
        { key: '/app/ui/wysiwyg', title: '富文本', component: 'WysiwygBundle' },
        { key: '/app/ui/drags', title: '拖拽', component: 'Drags' },
        { key: '/app/ui/gallery', title: '画廊', component: 'Gallery' },
        { key: '/app/ui/map', title: '地图', component: 'MapUi' },
      ],
    },
    {
      key: '/app/memberM', title: '会员管理', icon: 'rocket',
      subs: [
        { key: '/app/memberM/xinxiguanli', title: '信息管理', component: 'InfoC' },
        { key: '/app/memberM/zhifudingdan', title: '支付订单', component: 'PayO' },
        { key: '/app/memberM/yaoqingma', title: '邀请码', component: 'BannerControl' },
        { key: '/app/memberM/jifenguanli', title: '积分管理', component: 'PointC' },
        { key: '/app/memberM/jifenguize', title: '积分规则设置', component: 'PointRule' },
        { key: '/app/memberM/huiyuandengji', title: '会员等级设置', component: 'MemberLevel' },
      ],
    },
    {
      key: '/app/fishM', title: '鱼群管理', icon: 'rocket',
      subs: [
        { key: '/app/fishM/sensitiveWordsM', title: '敏感词库', component: 'SensitiveWordsM' },
        { key: '/app/fishM/commentM', title: '评论管理', component: 'CommentM' },
      ],
    },
    {
      key: '/app/bookM', title: '书籍管理', icon: 'rocket',
      subs: [
        { key: '/app/bookM/bookLib', title: '书目库', component: 'BookLib' },
        { key: '/app/bookM/publisherM', title: '出版社维护', component: 'PublisherM' },
        { key: '/app/bookM/goodsM', title: '商品管理', component: 'GoodsM' },
      ],
    },
    {
      key: '/app/storehouseM', title: '仓库管理', icon: 'rocket',
      subs: [
        { key: '/app/storehouseM/query', title: '机构管理', component: 'StoreQuery' },
        { key: '/app/storehouseM/indata', title: '仓库维护', component: 'InStoreData' },
        { key: '/app/storehouseM/transferInData', title: '机柜管理', component: 'CabinetM' },
        { key: '/app/storehouseM/transferOutData', title: '机柜管理', component: 'CabinetM' },
        { key: '/app/storehouseM/outHouseData', title: '机柜管理', component: 'CabinetM' },
        { key: '/app/storehouseM/inHouseData', title: '机柜管理', component: 'CabinetM' },
        {
          key: '/app/systemM/staffM', title: '员工管理',
          subs: [
            { key: '/app/systemM/staffM/addStaff', title: '新增', component: 'AddStaff' },
            { key: '/app/systemM/staffM/editStaff', title: '修改', component: 'EditStaff' },
          ]
        }
      ],
    },
    {
      key: '/app/orderM', title: '订单管理', icon: 'rocket',
      subs: [
        { key: '/app/orderM/borrowO', title: '借阅订单', component: 'BorrowO' },
        { key: '/app/orderM/donateO', title: '捐书订单', component: 'DonateO' },
        { key: '/app/orderM/checkO', title: '还捐审单', component: 'CheckO' },
        { key: '/app/orderM/borrowH', title: '历史借阅', component: 'BorrowH' },
      ]
    },
    {
      key: '/app/franchiseeM', title: '加盟商管理', icon: 'rocket',
      subs: [
        { key: '/app/franchiseeM/level', title: '等级维护', component: 'BannerControl' },
        { key: '/app/franchiseeM/info', title: '信息管理', component: 'BannerControl' },
        { key: '/app/franchiseeM/financial', title: '财务结算', component: 'BannerControl' },
        { key: '/app/franchiseeM/tables', title: '统计专表', component: 'BannerControl' },
      ],
    },
    {
      key: '/app/bookCaseM', title: '书柜管理', icon: 'rocket',
      subs: [
        { key: '/app/bookCaseM/caseState', title: '机柜状态跟踪', component: 'BannerControl' },
        { key: '/app/bookCaseM/monitorB', title: '监控回放', component: 'BannerControl' },
        { key: '/app/bookCaseM/dailyReport', title: '日常检查报告', component: 'BannerControl' },
        { key: '/app/bookCaseM/warrantyR', title: '保修记录', component: 'BannerControl' },
      ],
    },
    {
      key: '/app/statisticsT', title: '统计报表', icon: 'rocket',
      subs: [
        { key: '/app/statisticsT/member', title: '会员统计表', component: 'BannerControl' },
        { key: '/app/statisticsT/borrow', title: '借阅统计表', component: 'BannerControl' },
        { key: '/app/statisticsT/donate', title: '捐书统计表', component: 'BannerControl' },
        { key: '/app/statisticsT/book', title: '书籍统计表', component: 'BannerControl' },
        { key: '/app/statisticsT/finance', title: '资金统计表', component: 'BannerControl' },
      ],
    },
    {
      key: '/app/systemM', title: '系统管理', icon: 'rocket',
      subs: [
        { key: '/app/systemM/organizationM', title: '机构管理', component: 'OrganizationM' },
        { key: '/app/systemM/warehouseM', title: '仓库维护', component: 'WarehouseM' },
        { key: '/app/systemM/cabinetM', title: '机柜管理', component: 'CabinetM' },
        { key: '/app/systemM/staffM', title: '员工管理', component: 'StaffM' }
      ],
    },
    {
      key: '/app/table', title: '表格', icon: 'copy',
      subs: [
        { key: '/app/table/basicTable', title: '基础表格', component: 'BasicTable' },
        { key: '/app/table/advancedTable', title: '高级表格', component: 'AdvancedTable' },
        { key: '/app/table/asynchronousTable', title: '异步表格', component: 'AsynchronousTable' },
      ],
    },
    {
      key: '/app/chart', title: '图表', icon: 'area-chart',
      subs: [
        { key: '/app/chart/echarts', title: 'echarts', component: 'Echarts' },
        { key: '/app/chart/recharts', title: 'recharts', component: 'Recharts' },
      ],
    },
    {
      key: '/subs4', title: '页面', icon: 'switcher',
      subs: [
        { key: '/login', title: '登录' },
        { key: '/404', title: '404' },
      ],
    },
    {
      key: '/app/auth', title: '权限管理', icon: 'safety',
      subs: [
        { key: '/app/auth/basic', title: '基础演示', component: 'AuthBasic' },
        { key: '/app/auth/routerEnter', title: '路由拦截', component: 'RouterEnter', auth: 'auth/testPage' },
      ],
    },
    {
      key: '/app/cssModule', title: 'cssModule', icon: 'star', component: 'Cssmodule'
    },
  ],
  others: [
    {
      key: '/app/memberM', title: '会员管理',
      subs: [
        { key: '/app/memberM/xinxiguanli/infodetail/:memberId', title: '查看', component: 'InfoDetail' },
      ],
    },
    {
      key: '/app/bookM/bookLib', title: '书籍管理/书目库',
      subs: [
        { key: '/app/bookM/bookLib/addBookLib', title: '新增', component: 'AddBookLib' },
        { key: '/app/bookM/bookLib/modifyBookLib/:id', title: '修改', component: 'ModifyBookLib' },
      ],
    },
    {
      key: '/app/franchiseeM/tables', title: '加盟商管理/统计专表',
      subs: [
        { key: '/app/franchiseeM/tables/summary', title: '总表', component: 'BannerControl' },
        { key: '/app/franchiseeM/tables/business', title: '业绩报表', component: 'BannerControl' },
        { key: '/app/franchiseeM/tables/expenses', title: '费用报表', component: 'BannerControl' },
        { key: '/app/franchiseeM/tables/stock', title: '库存统计表', component: 'BannerControl' },
      ]
    }
  ] // 非菜单相关路由
}