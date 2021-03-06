import React, { useState } from 'react'
import classNames from 'classnames'
import { text } from '@storybook/addon-knobs'
import { ReactComponent as SunIcon } from '../../assets/svg/Sun.svg'
import { centerDecorator } from '../../utils/storybook/decorators'
import { Button } from '../../index'
import Banner from './Banner'
import styles from '../../storybook/index.module.scss'

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
      <Banner isOpen trailingComponent={myButton}>
        {text('text', 'Banner Text')}
      </Banner>
    </React.Fragment>
  )
}

export const types = () => {
  return (
    <div className={classNames(styles.flexMultipleRows, styles.fullWidth)}>
      <Banner isOpen type={'success'}>
        success
      </Banner>
      <Banner isOpen type={'info'}>
        info
      </Banner>
      <Banner isOpen type={'warning'}>
        warning
      </Banner>
      <Banner isOpen type={'error'}>
        error
      </Banner>
    </div>
  )
}

export const PlayGround = args => <Banner {...args} />

PlayGround.args = { children: 'Banner Text' }
