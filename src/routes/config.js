export default {
  menus: [ // 菜单相关路由
    { key: '/app/dashboard/index', title: '首页', icon: 'mobile', component: 'Dashboard' },
    {
      key: '/app/ui', title: 'UI', icon: 'scan',
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
            { key: '/app/bookM/bookLib', title: '书目库', component: 'BookLib'},
            { key: '/app/bookM/publisherM', title: '出版社维护', component: 'InfoDetail'},
            { key: '/app/bookM/goodsM', title: '商品管理', component: 'PayO'}, 
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
      key: '/app/form', title: '表单', icon: 'edit',
      subs: [
        { key: '/app/form/basicForm', title: '基础表单', component: 'BasicForm' },
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
    { key: '/app/memberM/xinxiguanli/infodetail/:memberId', title: '查看', component: 'InfoDetail' },
  ] // 非菜单相关路由
}