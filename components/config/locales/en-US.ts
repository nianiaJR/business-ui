const enUS = {
  business: {
    warningSimilarity: {
      task: 'Task',
      library: 'Library'
    },
    warningSimilarityList: {
      warningConfirm: 'Confirm',
      listEmpty: 'There is no data showing'
    },
    authorization: {
      login: {
        title: 'Authentication',
        action: 'Login',
        forget: 'Forget password',
        register: 'Sign up',
        forbid: 'No Access to this system',
        sendVerifyCode: 'Send',
        modifyPassword: 'Modify password'
      },
      register: {
        title: 'Sign up',
        byEmail: 'Email',
        byPhone: 'Phone',
        passwordRequirement: 'At least 8 characters, case sensitive',
        confirmPassword: 'Confirm password',
        existing: 'Existing Account?',
        sendVerifyCode: 'Send',
        verifyCodePlaceholder: 'Please enter the verification code',
        differInput: 'Input not same',
        waiting: '{seconds} s'
      },
      placeholder: {
        account: 'Please enter the phone or email',
        password: 'Please enter password',
        email: 'Please enter email',
        id: 'Please enter the user id',
        verifyCode: 'Please enter the verify code',
        phone: 'Please enter the phone'
      },
      alert: {
        long: 'Account is too long',
        account: 'Please enter the right account',
        password: 'At least 8 characters, case sensitive',
        phone: 'Please enter the right phone',
        email: 'Please enter the right email',
        id: 'Please enter the right user id'
      },
      copyright: `copyright @ ${new Date().getFullYear()} Business UI`
    },
    searchTip: {
      description: '{number} items selected. {totalNum} items in total.',
      clear: 'Clear'
    }
  }
}

export {
  enUS
}