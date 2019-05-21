import React, { Component } from 'react'
import navigation from '../Common/Navigation'
import classnames from 'classnames';

import './Result.css'

export default function Result(props) {
  return (
    <div className="result-container">
      <h3 className="result-element">{props.id}</h3>
      <ul className="result-list">
      {Object.keys(props.result).map(key => (
        <li key={key}>
          {key}: <span className="result-text">{props.result[key] ? props.result[key] : 'no'}</span>
        </li>
      ))}
      </ul>
    </div>
  )
}
