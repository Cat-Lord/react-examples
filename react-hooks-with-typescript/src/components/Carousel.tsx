import React, { Component } from 'react'

export function Carousel(props: any): JSX.Element {
  return <section className='Carousel'>{props.children}</section>;
}