import React, { useState, useEffect, useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import { theme, LightThemeItemKey, BaseThemeItemKey } from 'themes'
import { Icon } from 'components'
import * as Switch from '@radix-ui/react-switch'
import { logger, supabase, awaitTimeout, isDev } from 'utils'
import { Stripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { useQuery } from '@tanstack/react-query'
import type { Price } from 'types'
import * as Const from 'consts'
import { useUserContext } from 'context'
import { Subscribe } from '../Subscribe'
import { fetchProducts } from '../../../../context/UserContext/subscriptions'
import { loadStripe } from '@stripe/stripe-js/pure'

const PlansSectionStyled = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  gap: 16px;
  margin-bottom: 40px;
`

interface PlanStyledProps {
  bgColor?: string
  textColor?: string
  isActive?: boolean
}

const PlanStyled = styled.div<PlanStyledProps>`
  display: flex;
  flex-direction: column;
  min-width: 160px;
  gap: 16px;
  background-color: ${(props) => (props.bgColor ? props.bgColor : 'transparent')};
  color: ${(props) => (props.textColor ? props.textColor : theme('color.popper.main'))};
  border-radius: 12px;
  padding: 16px;
  ${(props) => (props.isActive ? 'grid-column: 1;' : '')};
`

const PlanTitleStyled = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: -0.03em;
  & sub {
    display: block;
    font-style: normal;
    letter-spacing: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    opacity: 0.8;
  }
`

const PlansLimitsBoxStyled = styled.div`
  display: flex;
  gap: 0;
  flex-direction: column;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  padding: 8px 12px 12px 12px;
  border-radius: 8px;
  background-color: ${theme('color.pure', 0.3)};
`

interface PlansProgressBarStyledProps {
  progress?: string
}

const PlansProgressBarStyled = styled.div<PlansProgressBarStyledProps>`
  margin-top: 8px;
  background-color: ${theme('color.primary.surface')};
  height: 3px;
  border-radius: 3px;
  & div {
    width: ${(props) => (props.progress ? props.progress : '0')};
    background-color: ${theme('color.popper.main')};
    height: 3px;
    border-radius: 3px;
  }
`

const Infinity = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  margin-bottom: -4px;
`

const PriceContainerStyled = styled.div`
  display: flex;
  align-items: center;
`

const PriceStyled = styled.div`
  flex-grow: 1;
  font-weight: 500;
  font-size: 14px;
  line-height: 28px;
  letter-spacing: -0.03em;
`

interface SwitchStyledProps {
  turnedOn: boolean
}

const SwitchStyled = styled.div<SwitchStyledProps>`
  display: flex;
  cursor: pointer;
  font-size: 12px;
  line-height: 18px;
  gap: 6px;
  align-items: center;
  padding: 2px 6px;
  height: fit-content;
  border-radius: 100px;
  color: ${(props) =>
    props.turnedOn ? theme('color.productWriter.main') : theme('color.productWriter.main', 0.5)};
  transition: all ${theme('animation.time.normal')};
  &:hover {
    background-color: ${theme('color.productWriter.main', 0.05)};
  }
  & label {
    cursor: pointer;
  }
`

const SwitchBgStyled = styled(Switch.Root)`
  all: unset;
  width: 16px;
  height: 10px;
  background-color: ${theme('color.productWriter.main', 0.3)};
  border-radius: 100px;
  position: relative;
  &[data-state='checked'] {
    background-color: ${theme('color.productWriter.main')};
  }
`

const SwitchThumbStyled = styled(Switch.Thumb)`
  display: block;
  width: 6px;
  height: 6px;
  background-color: ${theme('color.productWriter.popper', 0.5)};
  border-radius: 100px;
  transition: transform 100ms;
  transform: translateX(2px);
  will-change: transform;
  &[data-state='checked'] {
    transform: translateX(8px);
    background-color: ${theme('color.productWriter.popper')};
  }
`

interface PrimaryButtonStyledProps {
  bgColor?: LightThemeItemKey | BaseThemeItemKey
  textColor?: LightThemeItemKey | BaseThemeItemKey
}

const PrimaryButtonStyled = styled.button<PrimaryButtonStyledProps>`
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  cursor: pointer;
  color: ${(props) => (props.textColor ? theme(props.textColor) : theme(`color.popper.inverted`))};
  background-color: ${(props) =>
    props.bgColor ? theme(props.bgColor) : theme('color.popper.main')};
  display: flex;
  padding: 8px 12px;
  border-radius: 6px;
  width: fit-content;
  border: 0;
  outline: 0;
  transition: box-shadow ${theme('animation.time.normal')} ease;
  &:hover {
    box-shadow: 0 0 0 4px
      ${(props) => (props.bgColor ? theme(props.bgColor, 0.15) : theme('color.popper.main', 0.15))};
  }
  &:focus {
    box-shadow: 0 0 0 2px
      ${(props) => (props.bgColor ? theme(props.bgColor, 0.15) : theme('color.popper.main', 0.15))};
  }
`

interface SecondaryButtonStyledProps {
  textColor?: LightThemeItemKey | BaseThemeItemKey
}

const SecondaryButtonStyled = styled.button<SecondaryButtonStyledProps>`
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: ${(props) => (props.textColor ? theme(props.textColor) : theme('color.popper.main'))};
  background-color: transparent;
  display: flex;
  align-items: flex-end;
  gap: 4px;
  padding: 8px 12px;
  border-radius: 6px;
  width: fit-content;
  border: ${(props) =>
    props.textColor
      ? `1px solid ${theme(props.textColor)}`
      : `1px solid ${theme('color.popper.main')}`};
  outline: 0;
  transition: box-shadow ${theme('animation.time.normal')} ease;
  opacity: 0.8;
  &:disabled {
    opacity: 0.6;
    border: ${(props) =>
      props.textColor
        ? `1px solid ${theme(props.textColor, 0.6)}`
        : `1px solid ${theme('color.popper.main', 0.6)}`};
    cursor: default;
  }
`

function calcPercentage(limit: number, current: number, min = 0, max = 100) {
  if (current == 0) {
    return 100
  } else {
    let val = Math.round((current / limit) * 100)
    return val < min ? min : val > max ? max : val
  }
}

const UsedEntries = () => {
  const { session } = useUserContext()
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['entriesCount'],
    queryFn: async () => {
      return await window.electronAPI.cache.getEntriesCount(session.user.id)
    },
  })

  if (isLoading || isError) {
    return <></>
  }

  return (
    <PlansLimitsBoxStyled>
      {Const.entriesLimit} entries ({data} used)
      <PlansProgressBarStyled progress={`${calcPercentage(Const.entriesLimit, data)}%`}>
        <div></div>
      </PlansProgressBarStyled>
    </PlansLimitsBoxStyled>
  )
}

const Products = () => {
  const [billingInterval, setBillingInterval] = useState<'year' | 'month'>('year')
  const [stripePromise, setStripePromise] = useState<any | null>(null)
  const { session, subscription } = useUserContext()

  useQuery({
    queryKey: ['stripePromise'],
    queryFn: async () => {
      const url = isDev() ? 'https://s.journal.local' : 'https://s.journal.do'
      const { publishableKey } = await fetch(`${url}/api/v1/config`).then((r) => r.json())
      setStripePromise(() => loadStripe(publishableKey))
      return publishableKey
    },
  })

  const {
    isLoading,
    isError,
    data: prices,
    error,
  } = useQuery({
    queryKey: ['prices'],
    queryFn: fetchProducts,
  })

  const displayWriterPrice = () => {
    if (billingInterval == 'year') {
      let amount = prices.filter(
        (price) => price.product_id == Const.productWriterId && price.interval == 'year'
      )[0]?.unit_amount
      return `$${amount / 100} / year`
    } else {
      let amount = prices.filter(
        (price) => price.product_id == Const.productWriterId && price.interval == 'month'
      )[0]?.unit_amount
      return `$${amount / 100} / month`
    }
  }

  return (
    <PlansSectionStyled>
      <SkeletonTheme baseColor={theme('color.popper.pure', 0.6)} enableAnimation={false}>
        <PlanStyled
          bgColor={theme('color.productFree.surface')}
          textColor={theme('color.productFree.main')}
        >
          <PlanTitleStyled>
            {isLoading || isError ? <Skeleton width='25%' /> : 'Free'}
            <sub>{isLoading || isError ? <Skeleton width='40%' /> : 'Try it out'}</sub>
          </PlanTitleStyled>
          <UsedEntries />
          {subscription == null && (
            <PriceContainerStyled>
              <PriceStyled>$0</PriceStyled>
            </PriceContainerStyled>
          )}
          {subscription == null ? (
            <SecondaryButtonStyled disabled>
              <Icon name='Check' size={16} />
              Current plan
            </SecondaryButtonStyled>
          ) : (
            <SecondaryButtonStyled disabled>Not active</SecondaryButtonStyled>
          )}
        </PlanStyled>
      </SkeletonTheme>
      <SkeletonTheme baseColor={theme('color.popper.pure', 0.6)} enableAnimation={false}>
        <PlanStyled
          isActive={subscription != null}
          bgColor={theme('color.productWriter.surface')}
          textColor={theme('color.productWriter.main')}
        >
          <PlanTitleStyled>
            {isLoading || isError ? (
              <Skeleton width='25%' />
            ) : (
              prices.filter((price) => price.product_id == Const.productWriterId)[0]?.products.name
            )}
            <sub>
              {isLoading || isError ? (
                <Skeleton width='40%' />
              ) : (
                prices.filter((price) => price.product_id == Const.productWriterId)[0]?.products
                  .description
              )}
            </sub>
          </PlanTitleStyled>
          <PlansLimitsBoxStyled>
            Unlimited entries<Infinity>∞</Infinity>
          </PlansLimitsBoxStyled>
          {subscription == null && (
            <PriceContainerStyled>
              <PriceStyled>
                {isLoading || isError ? <Skeleton width='25%' /> : displayWriterPrice()}
              </PriceStyled>
              <SwitchStyled turnedOn={billingInterval == 'year'}>
                <SwitchBgStyled
                  id='s1'
                  checked={billingInterval == 'year'}
                  onCheckedChange={(checked) => {
                    checked ? setBillingInterval('year') : setBillingInterval('month')
                    window.electronAPI.capture({
                      distinctId: session.user.id,
                      event: 'settings upgrade toggle-billing-interval',
                    })
                  }}
                >
                  <SwitchThumbStyled />
                </SwitchBgStyled>
                <label htmlFor='s1'>Billed yearly</label>
              </SwitchStyled>
            </PriceContainerStyled>
          )}
          <Elements stripe={stripePromise}>
            <Subscribe
              billingInterval={billingInterval}
              prices={prices}
              renderTrigger={({ open, ...rest }: any) =>
                subscription == null ? (
                  <PrimaryButtonStyled
                    bgColor={'color.productWriter.main'}
                    textColor={'color.productWriter.popper'}
                    onClick={open}
                    {...rest}
                  >
                    Upgrade
                  </PrimaryButtonStyled>
                ) : (
                  <SecondaryButtonStyled disabled textColor={'color.productWriter.main'}>
                    <Icon name='Check' size={16} tintColor={theme('color.productWriter.main')} />
                    Current plan
                  </SecondaryButtonStyled>
                )
              }
            />
          </Elements>
        </PlanStyled>
      </SkeletonTheme>
    </PlansSectionStyled>
  )
}

export { Products }
