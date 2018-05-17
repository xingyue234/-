class Calc {
  constructor () {
    this.state = {
      init: 0,  //初始状态
      result: 1,  //结果状态
      first_num: 2,   //记录第一个操作数
      second_num: 3   //记录第二个操作数
    }
    this.curState = this.state.init      // 当前所在状态
    this.curResult = 0     // 当前计算结果
    this.opNum1 = '0'      // 操作数1
    this.opNum2 = ''       // 操作数2
    this.op = ''           // 操作符

    this.showNum = ''     // 显示的数字
    this.showOp = ''     // 显示的操作符

  }
  reset () {
    this.curState = this.state.init
    this.curResult = 0
    this.opNum1 = '0'
    this.opNum2 = ''
    this.op = ''
  }
  isOperator (code) {
    return '+-×/%'.indexOf(code) !== -1
  }

  getValues () {
    return {
      opNum1: this.opNum1,
      opNum2: this.opNum2,
      curResult: this.curResult,
      showNum: this.showNum,
      showOp: this.showOp
    }
  }


  calc (op1, op2, code) {
    op1 = parseFloat(op1)
    op2 = parseFloat(op2)
    let result = ''
    switch (code) {
      case '+':
        result = op1 + op2
        break
      case '-':
        result = op1 - op2
        break
      case '×':
        result = op1 * op2
        break
      case '/':
        if (op2 !== 0) {
          result = op1 / op2
        } else {
          this.reset()
          result = 'NaN'
          this.showOp = ''
        }
        break
      case '%':
        if (op2 !== 0) {
          result = op1 % op2
        } else {
          this.reset()
          result = 'NaN'
          this.showOp = ''
        }
        break
    }
    return result
  }

  tryAppend (num, code) {
    if (num.length < 15) {
      num = '' + num + code
    }
    return num
  }
  tryDelete (num, code) {
    num = '' + num
    if (num.length > 0) {
      num = num.slice(0, num.length - 1)
    }
    return num
  }

  addOp (code) {
    switch (this.curState) {
      case this.state.init:
      case this.state.result:
          if (!isNaN(+code) && +code !== '0') {
            this.curState = this.state.first_num
            this.opNum1 = code
          } else if (code === '.') {
            this.curState = this.state.first_num
            this.opNum1 = '0' + code
          } else if (this.isOperator(code)) {
            this.curState = this.state.second_num
            this.opNum1 = this.showNum
            this.opNum2 = ''
            this.op = code
          }
          this.showNum = this.opNum1
          this.showOp = this.op
          break
      case this.state.first_num:
          if (!isNaN(+code)) {
            this.opNum1 = this.tryAppend(this.opNum1, code)
          } else if (code === '.' && this.opNum1.indexOf('.') === -1) {
            this.opNum1 = this.tryAppend(this.opNum1, code)
          } else if (code === 'DEL') {
            this.opNum1 = this.tryDelete(this.opNum1, code)
          } else if (this.isOperator(code)) {
            this.curState = this.state.second_num
            this.opNum2 = ''
            this.op = code
          }
          this.showNum = this.opNum1
          this.showOp = this.op
          break
      case this.state.second_num:
          if (!isNaN(+code)) {
            this.opNum2 = this.tryAppend(this.opNum2, code)
            this.showNum = this.opNum2
          } else if (code === '.' && this.opNum2.indexOf('.') === -1) {
            this.opNum2 = this.tryAppend(this.opNum2, code)
            this.showNum = this.opNum2
          } else if (code === 'DEL') {
            this.opNum2 = this.tryDelete(this.opNum2, code)
            this.showNum = this.opNum2
          } else if (this.isOperator(code)) {
            this.showOp = code
            if (this.opNum2 !== '') {
              this.curResult = this.calc(this.opNum1, this.opNum2, this.op)
              this.opNum1 = this.curResult
              this.showNum = this.curResult
              this.opNum2 = ''
            }
            this.op = code
          } else if (code === '=') {
            if (this.opNum2 !== '') {
              this.curResult = this.calc(this.opNum1, this.opNum2, this.op)
              this.curState = this.state.result
              this.opNum1 = 0
              this.opNum2 = ''
              this.showNum = this.curResult
            }
            this.showOp = code
          }
          break
    }
    if (code === 'AC') {
        this.reset()
        this.showNum = this.opNum1
        this.showOp = ''
    }
  }
}
export default new Calc()