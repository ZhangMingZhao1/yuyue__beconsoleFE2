export default {
  menus: [ // 菜单相关路由
    { key: '/app/dashboard/index', title: '首页', icon: 'mobile', component: 'Dashboard', login: false },
    {
      key: '/app/ui', title: '网站管理', icon: 'scan',
      subs: [
        { key: '/app/ui/themeControl', title: '专题管理', component: 'ThemeControl' },
        { key: '/app/ui/bannerControl', title: 'banner管理', component: 'BannerControl' },
        { key: '/app/ui/advertiseM', title: '广告管理', component: 'AdvertiseM' }
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
        { key: '/app/storehouseM/query', title: '仓库查询', component: 'StoreQuery' },
        { key: '/app/storehouseM/indata', title: '入库单', component: 'InStoreData' },
        { key: '/app/storehouseM/transferInData', title: '调拨入柜单', component: 'CabinetM' },
        { key: '/app/storehouseM/transferOutData', title: '调拨出柜单', component: 'CabinetM' },
        { key: '/app/storehouseM/outHouseData', title: '出库单', component: 'OutStoreData' },
        { key: '/app/storehouseM/mvHouseData', title: '移库单', component: 'MvStoreData' },
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
  ],
  others: [
    {
      key: '/app/ui', title: '网站管理',
      subs: [
        { key: '/app/ui/themeControl/content', title: '专题设置/专题内容管理', component: 'ThemeContent' },
      ],
    },
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
      key: '/app/storehouseM/outHouseData', title: '仓库管理',
      subs: [
        { key: '/app/storehouseM/outHouseData/:type', title: '出库单:新增|审核|查看', component: 'OutStoreInfo' },
        { key: '/app/storehouseM/mvHouseData/:type', title: '移库单:新增|审核|查看', component: 'MvStoreInfo' },
        { key: '/app/storehouseM/indata/:type', title: '入库单:新增|审核|查看', component: 'InStoreInfo' },
      ],
    },
    {
      key: '/app/systemM/cabinetM', title: '机柜管理',
      subs: [
        { key: '/app/systemM/cabinetM/addCabinet', title: '新增', component: 'AddCabinet' },
        { key: '/app/systemM/cabinetM/changeCabinet/:id', title: '修改', component: 'ChangeCabinet' }
      ]
    },
    {
      key: '/app/systemM/staffM', title: '员工管理',
      subs: [
        { key: '/app/systemM/staffM/addStaff', title: '新增', component: 'AddStaff' },
        { key: '/app/systemM/staffM/changeStaff/:id', title: '修改', component: 'ChangeStaff' },
      ]
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