import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStore } from 'redux'

const ADD_USER = "ADD_USER"
const DELETE_USER = "DELETE_USER"
const UPDATE_USER = "UPDATE_USER"

const usersReducer =(state=[],action)=>{
  switch(action.type){
    case ADD_USER:
      return [...state,action.user]
    case DELETE_USER:
      return[...state.slice(0,action.index),...state.slice(action.index+1)]
    case UPDATE_USER:
      return [...state.map((user, index) => {
        if (index === action.index) {
          return {...user, ...action.user}
        } else {
          return user 
        }
      })]
    default:
      return state
  }
  
}

class User extends Component {
  render () {
    const { user,onDeleteUser,index } = this.props
    return (
      <div>
        <div>Name: {user.username}</div>
        <div>Age: {user.age}</div>
        <div>Gender: {user.gender}</div>
        <button onClick={() =>{onDeleteUser(user,index)}}>删除</button>
      </div>
    )
  }
}

class UsersList extends Component {
constructor(){
  super()
  this.state={
    user:{
      username:"",
      age:"",
      gender:"",
    }
  }
}
handleUserName(event){
  this.setState({
    username:event.target.value
  })
}
handleAge(event){
  this.setState({
    age:event.target.value
  })
}
handleGender(event){
  this.setState({
    gender:event.target.value
  })
}
  render () {
    return (
      <div>
        {/* 输入用户信息，点击“新增”按钮可以增加用户 */}
        <div className='add-user'>
          <div>Username: <input type='text' value={this.state.username} onChange={this.handleUserName.bind(this)}  /></div>
          <div>Age: <input type='number' value={this.state.age} onChange={this.handleAge.bind(this)} /></div>
          <div>Gender:
            <label>Male: <input type='radio' name='gender' value='male'  onChange={this.handleGender.bind(this)} /></label>
            <label>Female: <input type='radio' name='gender' value='female'  onChange={this.handleGender.bind(this)} /></label>
          </div>
          <button onClick={() =>{this.props.onAddUser(this.state.user)}}>增加</button>
        </div>
        {/* 显示用户列表 */}
        <div className='users-list'>{
          this.props.users.map((user,index)=>{
              return <User user={user} onDeleteUser={this.props.onDeleteUser} index={index} key={index} />
          })
        }</div>
      </div>
    )
  }
}

const mapStateToProps=(state)=>{
  return{
    users:state
  }
}
const mapDispatchProps = (dispatch)=>{
  return {
    onDeleteUser:(user,index)=>{
      dispatch({
        type:"DELETE_USER",
        index:index,
        user
      })
      
    },
    onAddUser:(user)=>{
      dispatch({
        type:"ADD_USER",
        user
      })
    },
    onUpdateUser:(user,index)=>{
      dispatch({
        type:"UPDATE_USER",
        index:index,
        user
      })
    }
  }
}
UsersList = connect(mapStateToProps,mapDispatchProps)(UsersList)