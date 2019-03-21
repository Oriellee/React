import React, { Component } from 'react'
import PropTypes from 'prop-types'

export const connect = (mapStateToProps, mapDispatchTopraos) => (WrappedComponent) => {
  class Connect extends Component {
    static contextTypes = {
      store: PropTypes.object
    }

    constructor() {
      super()
      this.state = { allProps: {} }
    }

    componentWillMount() {
      const { store } = this.context
      this._updateProps()
      store.subscribe(() => this._updateProps())
    }

    _updateProps() {
      const { store } = this.context
      let stateProps = mapStateToProps ? mapStateToProps(store.getState(), this.props) : {}
      // 额外传入 props，让获取数据更加灵活方便
      let dispatchProps = mapDispatchTopraos ? mapDispatchTopraos(store.dispatch, this.props) : {}

      this.setState({
        allProps: { // 整合普通的 props 和从 state 生成的 props
          ...stateProps,
          ...dispatchProps,
          ...this.props
        }
      })
    }

    render() {
      return <WrappedComponent {...this.state.allProps} />
    }
  }

  return Connect
}

export class Provider extends Component{
  static propTypes ={
    store:PropTypes.object,
    children:PropTypes.any
  }
  static childContextTypes = {
    store:PropTypes.object
  }
  getChildContext(){
    return{
      store:this.props.store
    }
  }
  render(){
    return(
      <div>{this.props.children}</div>
    )
  }
}