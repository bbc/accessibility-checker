import React, { Component } from 'react'
import Result from './Result'
import classnames from 'classnames';

import './Result.css'

export default function ResultList (props) {
  return (
    <div className="node-list">
      {Object.keys(props.results).map(key => (
        <Result
          key={key}
          id={key}
          result={props.results[key]}
        />
      ))}
    </div>
  )
}
