/**
 * 日期选择器
 * 可选：年（isMonthDisabled: true, isDateDisabled: true）、年月(isDateDisabled: true)、年月日选择器
 * 默认为年月日选择器
 * Created by raganyayoung on 2018/01/09.
 */
import PropTypes from 'prop-types'

import React, { Component } from 'react'
import moment from 'moment'
import _ from 'lodash'
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Keyboard,
  PixelRatio
} from 'react-native'
import { PopupStub } from '@unpourtous/react-native-popup-stub'
import Picker from 'react-native-wheel-picker'
import WeTouchable from './touchable/WeTouchable'

const longTimeYear = 9999

export default class DatePicker extends Component {
  static _id

  static propTypes = {
    year: PropTypes.number, // init year, default will be the current year
    month: PropTypes.number, // init month, default will be the current month, !!! start from 0 !!!
    date: PropTypes.number, // init date, default will be the current date
    minYear: PropTypes.number.isRequired,
    minMonth: PropTypes.number, // 最前一年显示的最前一个月
    minDate: PropTypes.number, // 最前一年显示的最前一天
    maxYear: PropTypes.number.isRequired,
    lastMonth: PropTypes.number, // 最后一年显示的最后一个月
    lastDate: PropTypes.number, // 最后一年显示的最后一天
    isMonthDisabled: PropTypes.bool, // 不显示月份
    isDateDisabled: PropTypes.bool, // 不显示日期
    isDisplayDateFirst: PropTypes.bool, // display as d/m/y, default is y/m/d
    supportLongTime: PropTypes.bool, // 是否支持长期
    onSelectYear: PropTypes.func, // 年份选择器回调事件 返回：{year: ''}
    onSelectMonth: PropTypes.func, // 月份选择器回调事件 返回：{year: '', month: ''}
    onSelectDate: PropTypes.func,  // 日期选择器回调事件 返回：{year: '', month: '', date: ''}
    // 点击确定的回调事件
    // (date: Date) => void
    onComplete: PropTypes.func
  }

  static PropTypes = {
    onComplete: _.noop
  }

  static show (option = {}) {
    let keyframes = {
      from: {translateY: 250},
      to: {translateY: 0}
    }

    Keyboard.dismiss()
    DatePicker._id = PopupStub.stub.addPopup(
      <DatePicker
        year={option.year}
        month={option.month}
        date={option.date}
        minYear={option.minYear}
        minMonth={option.minMonth}
        minDate={option.minDate}
        maxYear={option.maxYear}
        lastMonth={option.lastMonth}
        lastDate={option.lastDate}
        isDateDisabled={option.isDateDisabled}
        isMonthDisabled={option.isMonthDisabled}
        isDisplayDateFirst={option.isDisplayDateFirst}
        supportLongTime={option.supportLongTime}
        onSelectDate={(value) => { option.onSelectDate && option.onSelectDate(value) }}
        onSelectMonth={(value) => { option.onSelectMonth && option.onSelectMonth(value) }}
        onSelectYear={(value) => { option.onSelectYear && option.onSelectYear(value) }}
        onComplete={(date) => { option.onComplete && option.onComplete(date) }}
      />,
      {
        zIndex: 400,
        delay: 0,
        duration: 200,
        animation: keyframes,
        easing: 'ease-in-out',
        position: 'bottom',
        wrapperStyle: {alignSelf: 'stretch', minHeight: 250}
      }
    )
  }

  static hide () {
    PopupStub.stub.removePopup(DatePicker._id)
  }

  constructor (props) {
    super(props)

    let curYear = moment().year()
    let curMonth = moment().month() + 1
    let curDate = moment().date()
    let yearList = []
    let monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    let dateList = this.getDateList(props.year || curYear, props.month ? props.month + 1 : curMonth)

    for (let i = props.minYear; i <= props.maxYear; i++) {
      yearList.push(i)
    }

    if (props.supportLongTime) {
      yearList.push(longTimeYear)
    }

    let lastMonthList = props.lastMonth !== undefined ? monthList.slice(0, props.lastMonth + 1) : monthList
    let lastDateList = props.lastDate !== undefined ? this.getDateList(props.maxYear, props.lastMonth + 1).slice(0, props.lastDate) : []
    let minMonthList = props.minMonth !== undefined ? monthList.slice(props.minMonth) : monthList
    let minDateList = props.minDate !== undefined ? this.getDateList(props.minYear, props.minMonth + 1).slice(props.minDate - 1) : dateList

    this.state = {
      year: props.year || curYear,
      month: props.month + 1 || curMonth,
      date: props.date || curDate,
      yearList: yearList.length > 0 ? yearList : [curYear],
      monthList,
      dateList,
      lastMonthList,
      lastDateList,
      minMonthList,
      minDateList,
      isMonthDisabled: props.isMonthDisabled || false,
      isDateDisabled: props.isDateDisabled || false,
      isDisplayDateFirst: props.isDisplayDateFirst || false,
      supportLongTime: props.supportLongTime || false
    }
  }

  handleYearChange = (year) => {
    const {maxYear, lastMonth, minYear, minMonth, minDate} = this.props

    if (year === maxYear && this.state.month > (lastMonth + 1)) {
      this.setState({
        year,
        month: lastMonth + 1,
        date: 1,
        dateList: this.getDateList(year, lastMonth + 1)
      })
    } else if (year === minYear && this.state.month < (minMonth + 1)) {
      this.setState({
        year,
        month: minMonth + 1,
        date: minDate,
        dateList: this.getDateList(year, minMonth + 1)
      })
    } else {
      this.setState({
        year,
        dateList: this.getDateList(year, this.state.month)
      })
    }
  }

  handleMonthChange = (month) => {
    this.setState({
      month,
      dateList: this.getDateList(this.state.year, month)
    })
  }

  getDateList = (year, month) => {
    month = parseInt(month, 10)
    let days = new Date(year, month, 0).getDate()
    return Array.from(new Array(days).keys())
  }

  render () {
    const {onComplete} = this.props
    const {year, month, date} = this.state

    return (
      <View style={{
        alignSelf: 'stretch',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        height: 250
      }}>
        <View style={{
          flexDirection: 'row',
          height: 44,
          backgroundColor: '#FFF',
          alignItems: 'center',
          paddingHorizontal: 10,
          borderBottomWidth: 1 / PixelRatio.get(),
          borderColor: '#E5E5E5'
        }}>
          <WeTouchable onPress={() => {
            DatePicker.hide()
          }}><Text style={{
            fontSize: 16,
            color: '#000000'
          }}>{'取消'}</Text>
          </WeTouchable>
          <View style={{flex: 1}} />
          <WeTouchable onPress={() => {
            DatePicker.hide()
            this.props.onSelectDate && this.props.onSelectDate({
              year: this.state.year,
              month: this.state.month,
              date: this.state.date
            })
            this.props.onSelectMonth && this.props.onSelectMonth({
              year: this.state.year,
              month: this.state.month
            })
            this.props.onSelectYear && this.props.onSelectYear({
              year: this.state.year
            })
            _.isFunction(onComplete) && onComplete(new Date(year, month - 1, date))
          }} hitSlop={{top: 10, left: 20, bottom: 10, right: 20}}
          ><Text style={{
            fontSize: 16,
            color: '#000000'
          }}>{'确定'}</Text>
          </WeTouchable>
        </View>
        <View style={{
          alignSelf: 'stretch',
          flexDirection: 'row',
          backgroundColor: '#FFFFFF'
        }}>
          { this._renderYear() }
          { this._renderMonth() }
          { this._renderDate() }
        </View>
      </View>
    )
  }

  _renderYear = () => {
    return (
      <InnerPicker selectedValue={this.state.year} onValueChange={(year) => this.handleYearChange(year)}>
        {
          this.state.yearList.map(year => {
            return (
              <Picker.Item
                key={year}
                label={year === longTimeYear ? `长期` : `${year}年`}
                value={year} />
            )
          })
        }
      </InnerPicker>
    )
  }

  _renderMonth = () => {
    let monthes = this.state.monthList
    if (this.state.year === this.props.maxYear) {
      monthes = this.state.lastMonthList
    } else if (this.state.year === this.props.minYear) {
      monthes = this.state.minMonthList
    }
    return (
      <InnerPicker selectedValue={this.state.month} onValueChange={(month) => this.handleMonthChange(month)}>
        {
          monthes.map(month => <Picker.Item
            key={month}
            label={this.state.year === longTimeYear ? `` : `${month}月`}
            value={this.state.year === longTimeYear ? 11 : month} />)
        }
      </InnerPicker>
    )
  }

  _renderDate = () => {
    let dates = []
    if (this.state.year === this.props.maxYear && this.state.month === this.props.lastMonth + 1) {
      dates = this.state.lastDateList
    } else if (this.state.year === this.props.minYear && this.state.month === this.props.minMonth + 1) {
      dates = this.state.minDateList
    } else {
      dates = this.getDateList(this.state.year, this.state.month)
    }
    return (
      <InnerPicker selectedValue={this.state.date} onValueChange={(date) => { this.setState({date}) }}>
        {
          dates.map(date => <Picker.Item
            key={date + 1}
            label={this.state.year === longTimeYear ? `` : `${date + 1}日`}
            value={this.state.year === longTimeYear ? 31 : date + 1} />)
        }
      </InnerPicker>
    )
  }
}

class InnerPicker extends Component {
  static propTypes = {
    onValueChange: PropTypes.func,
    selectedValue: PropTypes.string
  }

  render () {
    return <Picker
      style={styles.pickerStyle}
      itemStyle={styles.pickerTextStyle}
      indicatorStyle={{color: '#e5e5e5'}}
      selectedValue={this.props.selectedValue}
      onValueChange={this.props.onValueChange}>
      {this.props.children}
    </Picker>
  }
}

const styles = StyleSheet.create({
  pickerTextStyle: {
    fontSize: 14,
    color: '#000000'
  },
  pickerStyle: {
    ...Platform.select({
      android: {
        height: 200,
        backgroundColor: '#FFFFFF',
      }
    }),
    flex: 1
  }
})
