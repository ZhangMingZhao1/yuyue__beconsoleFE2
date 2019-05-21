export default {
  menus: [ // 菜单相关路由
    { key: '/app/dashboard/index', title: '首页', icon: 'dashboard', component: 'Dashboard', login: false },
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
        { key: '/app/memberM/invitationCode', title: '邀请码', component: 'InvitationCode' },
        { key: '/app/memberM/jifenguanli', title: '积分管理', component: 'PointC' },
        { key: '/app/memberM/jifenguize', title: '积分规则设置', component: 'PointRule' },
        { key: '/app/memberM/huiyuandengji', title: '会员等级设置', component: 'MemberLevel' },
      ],
    },
    {
      key: '/app/fishM', title: '鱼群管理', icon: 'car',
      subs: [
        { key: '/app/fishM/sensitiveWordsM', title: '敏感词库', component: 'SensitiveWordsM' },
        { key: '/app/fishM/commentM', title: '评论管理', component: 'CommentM' },
      ],
    },
    {
      key: '/app/bookM', title: '书籍管理', icon: 'cloud',
      subs: [
        { key: '/app/bookM/bookLib', title: '书目库', component: 'BookLib' },
        { key: '/app/bookM/geneM', title: '基因维护', component: 'GeneM' },
        { key: '/app/bookM/publisherM', title: '出版社维护', component: 'PublisherM' },
        { key: '/app/bookM/goodsM', title: '商品管理', component: 'GoodsM' },
      ],
    },
    {
      key: '/app/storehouseM', title: '仓库管理', icon: 'project',
      subs: [
        { key: '/app/storehouseM/query', title: '仓库查询', component: 'StoreQuery' },
        { key: '/app/storehouseM/indata', title: '入库单', component: 'InStoreData' },
        { key: '/app/storehouseM/transferInData', title: '调拨入柜单', component: 'AllocateInCase' },
        { key: '/app/storehouseM/transferOutData', title: '调拨出柜单', component: 'AllocateOutCase' },
        { key: '/app/storehouseM/outHouseData', title: '出库单', component: 'OutStoreData' },
        { key: '/app/storehouseM/mvHouseData', title: '移库单', component: 'MvStoreData' },
      ],
    },
    {
      key: '/app/orderM', title: '订单管理', icon: 'code',
      subs: [
        { key: '/app/orderM/borrowO', title: '借阅订单', component: 'BorrowO' },
        { key: '/app/orderM/donateO', title: '捐书订单', component: 'DonateO' },
        { key: '/app/orderM/checkO', title: '还捐审单', component: 'CheckO' },
        { key: '/app/orderM/borrowH', title: '历史借阅', component: 'BorrowH' },
      ]
    },
    {
      key: '/app/franchiseeM', title: '加盟商管理', icon: 'wallet',
      subs: [
        { key: '/app/franchiseeM/level', title: '加盟商等级', component: 'FranRank' },
        { key: '/app/franchiseeM/info', title: '加盟商资料', component: 'FranInfo' },
      ],
    },
    {
      key: '/app/bookCaseM', title: '书柜管理', icon: 'tool',
      subs: [
        { key: '/app/bookCaseM/caseState', title: '机柜状态跟踪', component: 'BannerControl' },
        { key: '/app/bookCaseM/monitorB', title: '监控回放', component: 'BannerControl' },
        { key: '/app/bookCaseM/dailyReport', title: '日常检查报告', component: 'BannerControl' },
        { key: '/app/bookCaseM/warrantyR', title: '保修记录', component: 'BannerControl' },
      ],
    },
    {
      key: '/app/statisticsT', title: '统计报表', icon: 'number',
      subs: [
        { key: '/app/statisticsT/member', title: '会员统计表', component: 'BannerControl' },
        { key: '/app/statisticsT/borrow', title: '借阅统计表', component: 'BannerControl' },
        { key: '/app/statisticsT/donate', title: '捐书统计表', component: 'BannerControl' },
        { key: '/app/statisticsT/book', title: '书籍统计表', component: 'BannerControl' },
        { key: '/app/statisticsT/finance', title: '资金统计表', component: 'BannerControl' },
      ],
    },
    {
      key: '/app/systemM', title: '系统管理', icon: 'security-scan',
      subs: [
        { key: '/app/systemM/organizationM', title: '机构管理', component: 'OrganizationM' },
        { key: '/app/systemM/warehouseM', title: '仓库维护', component: 'WarehouseM' },
        { key: '/app/systemM/cabinetM', title: '机柜管理', component: 'CabinetM' },
        { key: '/app/systemM/staffM', title: '员工管理', component: 'StaffM' },
        { key: '/app/systemM/roleAuth', title: '角色权限', component: 'roleAuth' },
      ],
    },
  ],
  others: [
    {
      key: '/app/ui', title: '网站管理',
      subs: [
        { key: '/app/ui/themeControl/content/:id', title: '专题设置/专题内容管理', component: 'ThemeContent' },
      ],
    },
    {
      key: '/app/memberM', title: '会员管理',
      subs: [
        { key: '/app/memberM/xinxiguanli/infodetail/:memberId', title: '查看', component: 'InfoDetail' },
      ],
    },
    {
      key: '/app/memberM/invitationCode', title: '会员管理/邀请码',
      subs: [
        { key: '/app/memberM/invitationCode/addInvCode', title: '新增', component: 'AddInvCode' },
        { key: '/app/memberM/invitationCode/changeInvCode/:id', title: '修改', component: 'ChangeInvCode' },
      ],
    },
    {
      key: '/app/fishM/commentM', title: '鱼群管理/动态评论管理',
      subs: [
        { key: '/app/fishM/commentM/dynamicCmnt/:id', title: '动态评论管理', component: 'DynamicCmnt' },
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
        { key: '/app/storehouseM/transferInData/generate', title: '调拨入库单:生成', component: 'AllocateInCaseG' },
        { key: '/app/storehouseM/transferInData/select', title: '调拨入库单:选书', component: 'AllocateInCaseS' },
        { key: '/app/storehouseM/transferInData/receive', title: '调拨入库单:接单', component: 'AllocateInCaseR' },
        { key: '/app/storehouseM/transferInData/put', title: '调拨入库单:上柜', component: 'AllocateInCaseP' },
        { key: '/app/storehouseM/transferInData/check', title: '调拨入库单:审核差异', component: 'AllocateInCaseC' },
        { key: '/app/storehouseM/transferInData/finished', title: '调拨入库单:完成', component: 'AllocateInCaseF' },
        { key: '/app/storehouseM/transferOutData/generate', title: '调拨出库单:生成', component: 'AllocateOutCaseG' },
        { key: '/app/storehouseM/transferOutData/select', title: '调拨出库单:选书', component: 'AllocateOutCaseS' },
        { key: '/app/storehouseM/transferOutData/receive', title: '调拨出库单:接单', component: 'AllocateOutCaseR' },
        { key: '/app/storehouseM/transferOutData/put', title: '调拨出库单:上柜', component: 'AllocateOutCaseP' },
        { key: '/app/storehouseM/transferOutData/check', title: '调拨出库单:审核差异', component: 'AllocateOutCaseC' },
        { key: '/app/storehouseM/transferOutData/finished', title: '调拨出库单:完成', component: 'AllocateOutCaseF' },
      ],
    },
    {
      key: '/app/systemM/warehouseM', title: '系统管理/仓库维护',
      subs: [
        { key: '/app/systemM/warehouseM/addWarehouse', title: '新增', component: 'AddWarehouse' },
        { key: '/app/systemM/warehouseM/changeWarehouse/:id', title: '修改', component: 'ChangeWarehouse' }
      ]
    },
    {
      key: '/app/systemM/cabinetM', title: '系统管理/机柜管理',
      subs: [
        { key: '/app/systemM/cabinetM/addCabinet', title: '新增', component: 'AddCabinet' },
        { key: '/app/systemM/cabinetM/changeCabinet/:id', title: '修改', component: 'ChangeCabinet' }
      ]
    },
    {
      key: '/app/systemM/staffM', title: '系统管理/员工管理',
      subs: [
        { key: '/app/systemM/staffM/addStaff', title: '新增', component: 'AddStaff' },
        { key: '/app/systemM/staffM/changeStaff/:id', title: '修改', component: 'ChangeStaff' },
      ]
    }, {
      key: '/app/franchiseeM/info', title: '加盟商信息',
      subs: [
        { key: '/app/franchiseeM/info/franinfodetail/:id', title: '加盟商查看', component: 'FranInfoDetail' },
        { key: '/app/franchiseeM/info/franmodify/:id', title: '加盟商修改', component: 'FranModify' },
        { key: '/app/franchiseeM/info/addFranInfo', title: '加盟商新增', component: 'AddFranInfo' },
        { key: '/app/franchiseeM/info/addFranRank', title: '加盟商新增', component: 'AddFranRank' },
      ]
    },
    {
      key: '/app/franchiseeM/level', title: '加盟商等级',
      subs: [
        { key: '/app/franchiseeM/level/addFranRank', title: '加盟商新增', component: 'AddFranRank' },
      ]
    },
    // {
    //   key: '/app/franchiseeM/tables', title: '加盟商管理/统计专表',
    //   subs: [
    //     { key: '/app/franchiseeM/tables/summary', title: '总表', component: 'BannerControl' },
    //     { key: '/app/franchiseeM/tables/business', title: '业绩报表', component: 'BannerControl' },
    //     { key: '/app/franchiseeM/tables/expenses', title: '费用报表', component: 'BannerControl' },
    //     { key: '/app/franchiseeM/tables/stock', title: '库存统计表', component: 'BannerControl' },
    //   ]
    // }
  ] // 非菜单相关路由
}