const zhCN = {
  business: {
    warningSimilarity: {
      task: '任务',
      library: '库名'
    },
    warningSimilarityList: {
      warningConfirm: '报警确认',
      listEmpty: '当前无可展示数据'
    },
    authorization: {
      login: {
        title: '账户登录',
        action: '登录',
        forget: '忘记密码',
        register: '立即注册',
        forbid: '无权限登录该系统',
        sendVerifyCode: '发送验证码',
        modifyPassword: '修改密码'
      },
      register: {
        title: '注册',
        byEmail: '邮箱注册',
        byPhone: '手机注册',
        passwordRequirement: '至少8位密码，区分大小写',
        confirmPassword: '确认密码',
        existing: '已有账号？',
        sendVerifyCode: '发送验证码',
        verifyCodePlaceholder: '请输入验证码',
        waiting: '等待 {seconds} 秒',
        differInput: '两次输入不一致'
      },
      placeholder: {
        account: '请输入手机号或邮箱',
        password: '请输入密码',
        email: '请输入邮箱',
        id: '请输入用户ID',
        verifyCode: '请输入验证码',
        phone: '请输入手机号'
      },
      alert: {
        long: '邮箱长度超过限制',
        account: '请输入正确的手机号或邮箱',
        password: '至少8位密码，区分大小写',
        phone: '请输入正确手机号',
        email: '请输入正确邮箱',
        id: '请输入正确用户ID'
      },
      copyright: `copyright @ ${new Date().getFullYear()} `
    },
    searchTip: {
      description: '已经选择 {number} 项， 共 {totalNum} 项',
      clear: '清空'
    }
  }
}

export {
  zhCN
}