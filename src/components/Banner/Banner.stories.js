import React, { useState } from 'react'
import { text } from '@storybook/addon-knobs'
import { ReactComponent as SunIcon } from '../../assets/svg/Sun.svg'
import { centerDecorator } from '../../utils/storybook/decorators'
import { Button } from '../../index'
import Banner from './Banner'

export default {
  title: 'User Feedback/Banner',
  component: Banner,
  decorators: [centerDecorator],
}

const myButton = <Button variant={'ghost'}>Congrats</Button>

export const Default = () => {
  const [isOpen, setOpenBanner] = useState(false)
  return (
    <React.Fragment>
      <Banner isOpen={isOpen}>{text('text', 'Banner Text')}</Banner>
      <Button onClick={() => setOpenBanner(!isOpen)}>
        Click to toggle Banner
      </Button>
    </React.Fragment>
  )
}

export const withLeadingIcon = () => (
  <React.Fragment>
    <Banner isOpen leadingIcon={<SunIcon />}>
      {text('text', 'Banner Text')}
    </Banner>
  </React.Fragment>
)

export const withTrailingComponent = () => {
  return (
    <React.Fragment>
      <Banner isOpen type={'warning'} trailingComponent={myButton}>
        {text('text', 'Banner Text')}
      </Banner>
    </React.Fragment>
  )
}

export const TypeSuccess = () => {
  return (
    <React.Fragment>
      <Banner isOpen type={'success'} trailingComponent={myButton}>
        {text('text', 'Banner Text')}
      </Banner>
    </React.Fragment>
  )
}

export const TypeInfo = () => {
  return (
    <React.Fragment>
      <Banner isOpen type={'info'} trailingComponent={myButton}>
        {text('text', 'Banner Text')}
      </Banner>
    </React.Fragment>
  )
}

export const TypeWarning = () => {
  return (
    <React.Fragment>
      <Banner isOpen type={'warning'} trailingComponent={myButton}>
        {text('text', 'Banner Text')}
      </Banner>
    </React.Fragment>
  )
}

export const TypeError = () => {
  return (
    <React.Fragment>
      <Banner isOpen type={'error'} trailingComponent={myButton}>
        {text('text', 'Banner Text')}
      </Banner>
    </React.Fragment>
  )
}

export const PlayGround = args => <Banner {...args} />

PlayGround.args = { children: 'Banner Text' }
